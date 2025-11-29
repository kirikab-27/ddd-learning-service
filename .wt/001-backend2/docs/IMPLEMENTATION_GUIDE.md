# DDD実装ガイド: DDD Learning Service

このドキュメントは、DDDの知識を本プロジェクトに落とし込む際の設計・実装指針を定めたものです。

---

## 0. 設計方針

### 0.1 エラーハンドリング方針

本プロジェクトでは、**ドメインオブジェクトのバリデーション違反は例外（throw）で表現する**方針とします。

```typescript
// ✅ 本プロジェクトの方針: 例外を使用
static create(value: string): LessonId {
  if (!value || value.trim() === '') {
    throw new Error('LessonId cannot be empty');
  }
  return new LessonId(value);
}
```

**理由:**
- 学習教材としてのシンプルさを優先
- Result型は関数型的エラー管理として有用だが、学習コストが上がる
- 将来的にResult型を導入する場合は、別途ドキュメント化する

> **Note:** Result型（`Result<T, Error>`）を使わないため、`src/domain/shared/` に Result型は配置しません。

### 0.2 アプリケーション層のエラーハンドリング

ユースケースはドメイン層からの例外をキャッチせず、そのままスローし、**プレゼンテーション層（hooks/components）でキャッチしてUIに反映する**方針とします。

| 層 | 責務 |
|---|---|
| **ドメイン層** | ビジネスルール違反を `Error`（またはカスタム例外）としてスロー |
| **アプリケーション層** | 原則キャッチしない。必要に応じてログ出力のみ行う |
| **プレゼンテーション層** | `try/catch` でラップし、ユーザーへのフィードバック（トースト通知、エラーメッセージ表示）に変換する |

```typescript
// src/presentation/hooks/useLessonDetail.ts
useEffect(() => {
  const fetchLesson = async () => {
    try {
      const useCase = createGetLessonUseCase();
      const result = await useCase.execute({ courseId, lessonId });
      setLesson(result);
    } catch (e) {
      // プレゼンテーション層でキャッチし、UIに反映
      setError(e instanceof Error ? e : new Error('Unknown error'));
      // 必要に応じてトースト通知など
    }
  };
  fetchLesson();
}, [courseId, lessonId]);
```

---

## 1. アーキテクチャ概要

### 1.1 レイヤード構成

```
src/
├── app/                # Next.js App Router（最外周・ルーティング）
│   ├── (public)/       # 公開ページ群
│   │   ├── page.tsx
│   │   └── courses/
│   └── layout.tsx
├── presentation/       # プレゼンテーション層（純粋なUI）
│   ├── components/     # UIコンポーネント
│   └── hooks/          # カスタムフック（use client）
├── application/        # アプリケーション層
│   ├── usecases/       # ユースケース（アプリケーションサービス）
│   └── dto/            # データ転送オブジェクト
├── domain/             # ドメイン層（核心）
│   ├── content/        # Learning Content BC
│   │   ├── models/     # Course, Chapter, Lesson, Quiz
│   │   ├── services/
│   │   └── specifications/
│   ├── progress/       # Learning Progress BC
│   │   ├── models/     # Progress, QuizResult
│   │   ├── services/
│   │   └── specifications/
│   ├── shared/         # 共有カーネル（識別子など）
│   └── repositories/   # リポジトリインターフェース
└── infrastructure/     # インフラストラクチャ層
    ├── repositories/   # リポジトリ実装
    └── di/             # 依存性注入
```

### 1.2 Next.js App Router との整合性

| ディレクトリ | 役割 | 備考 |
|-------------|------|------|
| `src/app/` | ルーティング専用 | Next.js の規約に従う。DDDレイヤーではない |
| `src/presentation/` | 純粋なUIコンポーネント＆hooks | `app/` から呼び出される |

**ポイント:**
- `app/` の page.tsx / layout.tsx は「最外周」として扱い、DDDレイヤー図には含めない
- `presentation/` に `pages/` は置かない（App Router と名前が紛らわしいため）
- `app/` から `presentation/components` を呼び、そこから `application/usecases` を呼ぶ流れ

### 1.3 依存関係の原則

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation                         │
│              (React Components, Pages)                   │
└─────────────────────────┬───────────────────────────────┘
                          ↓ 依存
┌─────────────────────────────────────────────────────────┐
│                     Application                          │
│           (UseCases, DTOs, Orchestration)               │
└─────────────────────────┬───────────────────────────────┘
                          ↓ 依存
┌─────────────────────────────────────────────────────────┐
│                       Domain                             │
│    (Entities, Value Objects, Repository Interfaces)     │
│              ★ 他のどの層にも依存しない ★                  │
└─────────────────────────────────────────────────────────┘
                          ↑ 実装（依存性逆転）
┌─────────────────────────────────────────────────────────┐
│                   Infrastructure                         │
│        (Repository Implementations, Storage)            │
└─────────────────────────────────────────────────────────┘
```

**重要な原則:**
- ドメイン層は他のどの層にも依存しない（純粋なTypeScript）
- 外側の層が内側の層に依存する（依存性逆転原則 DIP）
- リポジトリのインターフェースはドメイン層、実装はインフラ層

### 1.4 技術的な制約と将来のロードマップ

#### クライアントサイド実行の許容（v1）

v1では学習コンテンツがテキスト主体であり軽量であるため、`CourseRepository` はクライアントサイド（ブラウザ）でJSONデータを読み込む構成を許容します。

```
現在の構成:
┌─────────────┐      ┌──────────────────────┐
│   Browser   │ ───► │ courses.json (静的)   │
│  (Client)   │      │ ※ バンドルに含まれる   │
└─────────────┘      └──────────────────────┘
```

#### 将来の拡張（コンテンツ増大時）

コンテンツ量が増大した場合、または機密性が求められるようになった場合は、リポジトリの実装を「Server Actions」または「API Route」経由に変更し、クライアントバンドルサイズを削減します。

```
将来の構成:
┌─────────────┐      ┌──────────────────────┐      ┌─────────────┐
│   Browser   │ ───► │  Server Actions /    │ ───► │ courses.json│
│  (Client)   │      │  API Route           │      │ (サーバー側) │
└─────────────┘      └──────────────────────┘      └─────────────┘
```

> **Note:** リポジトリインターフェースが `Promise` ベースであるため、この変更によるドメイン層・アプリケーション層への影響はありません。

---

## 2. 境界づけられたコンテキスト

本プロジェクトは2つのコンテキストで構成されます：

### 2.1 学習コンテンツコンテキスト（Learning Content BC）

**責務**: コース、チャプター、レッスン、クイズの構造と内容の管理

```
主要概念:
- Course（コース）: 学習の最上位単位
- Chapter（チャプター）: コースを構成する部
- Lesson（レッスン）: 実際の学習コンテンツ
- Quiz（クイズ）: 理解度確認
- Question（問題）: クイズの個別問題
```

### 2.2 学習進捗コンテキスト（Learning Progress BC）

**責務**: ユーザーの学習状態、進捗、クイズ結果の追跡

```
主要概念:
- Progress（進捗）: ユーザーのコース進捗
- LessonCompletion（レッスン完了）: 完了状態
- QuizResult（クイズ結果）: スコアと回答履歴
```

### 2.3 コンテキスト間の関係

```
┌─────────────────────┐        ┌─────────────────────┐
│  Learning Content   │        │  Learning Progress  │
│      Context        │◄──────►│      Context        │
│                     │        │                     │
│  Course, Chapter,   │ 参照   │  Progress,          │
│  Lesson, Quiz       │───────►│  QuizResult         │
└─────────────────────┘        └─────────────────────┘
         │
         │ CourseId, LessonId などのIDで疎結合に参照
         ▼
  Progress は CourseId, LessonId を持つが
  Course エンティティ自体は持たない
```

---

## 3. ドメインモデル詳細設計

### 3.1 値オブジェクト（Value Objects）

値オブジェクトは**不変**で、**属性によって等価性が判断**されます。

#### 3.1.1 識別子系

```typescript
// src/domain/shared/CourseId.ts
export class CourseId {
  private constructor(private readonly value: string) {}

  static create(value: string): CourseId {
    if (!value || value.trim() === '') {
      throw new Error('CourseId cannot be empty');
    }
    return new CourseId(value);
  }

  equals(other: CourseId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
```

```typescript
// src/domain/shared/LessonId.ts
export class LessonId {
  private constructor(private readonly value: string) {}

  static create(value: string): LessonId {
    if (!value || value.trim() === '') {
      throw new Error('LessonId cannot be empty');
    }
    return new LessonId(value);
  }

  equals(other: LessonId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
```

同様に `ChapterId`, `QuizId` も作成。

#### 3.1.2 ドメイン固有の値オブジェクト

```typescript
// src/domain/progress/models/Score.ts
export class Score {
  private constructor(
    private readonly _correct: number,
    private readonly _total: number
  ) {}

  static create(correct: number, total: number): Score {
    if (correct < 0) {
      throw new Error('Correct answers cannot be negative');
    }
    if (total <= 0) {
      throw new Error('Total questions must be positive');
    }
    if (correct > total) {
      throw new Error('Correct answers cannot exceed total');
    }
    return new Score(correct, total);
  }

  get correct(): number {
    return this._correct;
  }

  get total(): number {
    return this._total;
  }

  get percentage(): number {
    return Math.round((this._correct / this._total) * 100);
  }

  isPassing(threshold: number = 70): boolean {
    return this.percentage >= threshold;
  }

  equals(other: Score): boolean {
    return this._correct === other._correct && this._total === other._total;
  }
}
```

```typescript
// src/domain/content/models/MarkdownContent.ts
export class MarkdownContent {
  private constructor(private readonly value: string) {}

  static create(value: string): MarkdownContent {
    // 空でも許容（下書き状態など）
    return new MarkdownContent(value || '');
  }

  get raw(): string {
    return this.value;
  }

  isEmpty(): boolean {
    return this.value.trim() === '';
  }

  equals(other: MarkdownContent): boolean {
    return this.value === other.value;
  }
}
```

```typescript
// src/domain/content/models/LessonTitle.ts
export class LessonTitle {
  private static readonly MAX_LENGTH = 100;

  private constructor(private readonly value: string) {}

  static create(value: string): LessonTitle {
    const trimmed = value?.trim() ?? '';
    if (trimmed === '') {
      throw new Error('LessonTitle cannot be empty');
    }
    if (trimmed.length > LessonTitle.MAX_LENGTH) {
      throw new Error(`LessonTitle cannot exceed ${LessonTitle.MAX_LENGTH} characters`);
    }
    return new LessonTitle(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: LessonTitle): boolean {
    return this.value === other.value;
  }
}
```

#### 3.1.3 なぜ値オブジェクトにするのか

| プリミティブ型 | 値オブジェクト | 理由 |
|---------------|---------------|------|
| `number` (score) | `Score` | 0-100の範囲制約、パーセンテージ計算、合格判定ロジック |
| `string` (lessonId) | `LessonId` | 空文字禁止、型による取り違え防止 |
| `string` (content) | `MarkdownContent` | 将来的な変換ロジックのカプセル化 |
| `string` (title) | `LessonTitle` | 長さ制約、空文字禁止 |

### 3.2 エンティティ（Entities）

エンティティは**IDによって同一性が識別**され、**ライフサイクルを通じて状態が変化**します。

```typescript
// src/domain/content/models/Lesson.ts
export class Lesson {
  private constructor(
    private readonly _id: LessonId,
    private readonly _title: LessonTitle,
    private readonly _content: MarkdownContent,
    private readonly _order: number,
    private readonly _quizId: QuizId | null
  ) {}

  static create(params: {
    id: LessonId;
    title: LessonTitle;
    content: MarkdownContent;
    order: number;
    quizId?: QuizId;
  }): Lesson {
    if (params.order < 1) {
      throw new Error('Lesson order must be positive');
    }
    return new Lesson(
      params.id,
      params.title,
      params.content,
      params.order,
      params.quizId ?? null
    );
  }

  get id(): LessonId {
    return this._id;
  }

  get title(): LessonTitle {
    return this._title;
  }

  get content(): MarkdownContent {
    return this._content;
  }

  get order(): number {
    return this._order;
  }

  get quizId(): QuizId | null {
    return this._quizId;
  }

  hasQuiz(): boolean {
    return this._quizId !== null;
  }

  equals(other: Lesson): boolean {
    return this._id.equals(other._id);
  }
}
```

```typescript
// src/domain/content/models/Chapter.ts
export class Chapter {
  private constructor(
    private readonly _id: ChapterId,
    private readonly _title: string,
    private readonly _order: number,
    private readonly _lessons: Lesson[]
  ) {}

  static create(params: {
    id: ChapterId;
    title: string;
    order: number;
    lessons: Lesson[];
  }): Chapter {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Chapter title cannot be empty');
    }
    if (params.order < 1) {
      throw new Error('Chapter order must be positive');
    }
    // レッスンを順序でソート
    const sortedLessons = [...params.lessons].sort((a, b) => a.order - b.order);
    return new Chapter(params.id, params.title.trim(), params.order, sortedLessons);
  }

  get id(): ChapterId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get order(): number {
    return this._order;
  }

  get lessons(): readonly Lesson[] {
    return this._lessons;
  }

  get lessonCount(): number {
    return this._lessons.length;
  }

  findLesson(lessonId: LessonId): Lesson | undefined {
    return this._lessons.find(lesson => lesson.id.equals(lessonId));
  }

  equals(other: Chapter): boolean {
    return this._id.equals(other._id);
  }
}
```

### 3.3 集約（Aggregates）

集約は**整合性の境界**であり、**集約ルートを通じてのみ操作**されます。

```typescript
// src/domain/content/models/Course.ts
export class Course {
  private constructor(
    private readonly _id: CourseId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _chapters: Chapter[]
  ) {}

  static create(params: {
    id: CourseId;
    title: string;
    description: string;
    chapters: Chapter[];
  }): Course {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Course title cannot be empty');
    }
    // チャプターを順序でソート
    const sortedChapters = [...params.chapters].sort((a, b) => a.order - b.order);
    return new Course(
      params.id,
      params.title.trim(),
      params.description?.trim() ?? '',
      sortedChapters
    );
  }

  get id(): CourseId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get chapters(): readonly Chapter[] {
    return this._chapters;
  }

  get totalLessons(): number {
    return this._chapters.reduce((sum, ch) => sum + ch.lessonCount, 0);
  }

  // ========================================
  // ドメインロジック: レッスン検索
  // ========================================
  findLesson(lessonId: LessonId): { chapter: Chapter; lesson: Lesson } | undefined {
    for (const chapter of this._chapters) {
      const lesson = chapter.findLesson(lessonId);
      if (lesson) {
        return { chapter, lesson };
      }
    }
    return undefined;
  }

  // ========================================
  // ドメインロジック: 前後のレッスン取得
  // ========================================
  getAdjacentLessons(lessonId: LessonId): {
    previous: Lesson | null;
    next: Lesson | null;
  } {
    const allLessons = this._chapters.flatMap(ch => ch.lessons);
    const currentIndex = allLessons.findIndex(l => l.id.equals(lessonId));

    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    return {
      previous: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
    };
  }

  // ========================================
  // ドメインロジック: レッスン順序の取得
  // ========================================
  getLessonOrder(lessonId: LessonId): number | undefined {
    const allLessons = this._chapters.flatMap(ch => ch.lessons);
    const index = allLessons.findIndex(l => l.id.equals(lessonId));
    return index === -1 ? undefined : index + 1;
  }

  equals(other: Course): boolean {
    return this._id.equals(other._id);
  }
}
```

```typescript
// src/domain/progress/models/Progress.ts
export class Progress {
  private constructor(
    private readonly _courseId: CourseId,
    private _completedLessonIds: Set<string>,
    private _quizResults: Map<string, QuizResult>,
    private _lastAccessedAt: Date
  ) {}

  static create(courseId: CourseId): Progress {
    return new Progress(courseId, new Set(), new Map(), new Date());
  }

  static restore(params: {
    courseId: CourseId;
    completedLessonIds: LessonId[];
    quizResults: QuizResult[];
    lastAccessedAt: Date;
  }): Progress {
    const lessonSet = new Set(params.completedLessonIds.map(id => id.toString()));
    const quizMap = new Map(params.quizResults.map(qr => [qr.quizId.toString(), qr]));
    return new Progress(params.courseId, lessonSet, quizMap, params.lastAccessedAt);
  }

  get courseId(): CourseId {
    return this._courseId;
  }

  get completedLessonCount(): number {
    return this._completedLessonIds.size;
  }

  get lastAccessedAt(): Date {
    return this._lastAccessedAt;
  }

  // ========================================
  // コマンド: レッスン完了をマーク
  // ========================================
  markLessonAsCompleted(lessonId: LessonId): void {
    this._completedLessonIds.add(lessonId.toString());
    this._lastAccessedAt = new Date();
  }

  // ========================================
  // コマンド: クイズ結果を記録
  // ========================================
  recordQuizResult(quizResult: QuizResult): void {
    this._quizResults.set(quizResult.quizId.toString(), quizResult);
    this._lastAccessedAt = new Date();
  }

  // ========================================
  // クエリ: レッスン完了状態の確認
  // ========================================
  hasCompletedLesson(lessonId: LessonId): boolean {
    return this._completedLessonIds.has(lessonId.toString());
  }

  // ========================================
  // クエリ: クイズ結果の取得
  // ========================================
  getQuizResult(quizId: QuizId): QuizResult | undefined {
    return this._quizResults.get(quizId.toString());
  }

  // ========================================
  // クエリ: 進捗率の計算（外部からtotalを受け取る）
  // ========================================
  calculateProgressRate(totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((this._completedLessonIds.size / totalLessons) * 100);
  }

  // ========================================
  // 永続化用: 完了レッスンIDのリスト取得
  // ========================================
  getCompletedLessonIds(): LessonId[] {
    return Array.from(this._completedLessonIds).map(id => LessonId.create(id));
  }

  // ========================================
  // 永続化用: クイズ結果のリスト取得
  // ========================================
  getQuizResults(): QuizResult[] {
    return Array.from(this._quizResults.values());
  }
}
```

### 3.4 ドメインサービス

**単一のエンティティに属さないドメインロジック**をドメインサービスに配置します。

```typescript
// src/domain/content/services/LessonNavigationService.ts
export class LessonNavigationService {
  /**
   * 次に学習すべきレッスンを特定する
   * - 未完了の最初のレッスンを返す
   * - すべて完了している場合は最後のレッスンを返す
   *
   * 戻り値は { chapter, lesson } のペアを返す（Course.findLesson と一貫性を持たせる）
   */
  findNextLessonToStudy(
    course: Course,
    progress: Progress
  ): { chapter: Chapter; lesson: Lesson } | null {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (!progress.hasCompletedLesson(lesson.id)) {
          return { chapter, lesson };
        }
      }
    }

    // すべて完了 → 最後のチャプターの最後のレッスン
    const lastChapter = course.chapters[course.chapters.length - 1];
    if (!lastChapter || lastChapter.lessons.length === 0) {
      return null;
    }
    const lastLesson = lastChapter.lessons[lastChapter.lessons.length - 1];
    return { chapter: lastChapter, lesson: lastLesson };
  }
}
```

> **設計意図:** 戻り値を `{ chapter, lesson }` とすることで、呼び出し元が「どのチャプターのレッスンか」を再検索する必要がなくなります。これは `Course.findLesson()` の戻り値と一貫性があります。

### 3.5 仕様パターン（Specifications）

**複雑なビジネスルール**を仕様オブジェクトとしてカプセル化します。

```typescript
// src/domain/content/specifications/LessonUnlockSpecification.ts
export class LessonUnlockSpecification {
  /**
   * レッスンがアンロック（学習可能）かどうかを判定
   * ルール: 最初のレッスンは常に解放、それ以外は前のレッスン完了が必要
   */
  isSatisfiedBy(lesson: Lesson, course: Course, progress: Progress): boolean {
    const allLessons = course.chapters.flatMap(ch => ch.lessons);
    const lessonIndex = allLessons.findIndex(l => l.id.equals(lesson.id));

    // レッスンが見つからない場合
    if (lessonIndex === -1) return false;

    // 最初のレッスンは常にアンロック
    if (lessonIndex === 0) return true;

    // 前のレッスンが完了しているか確認
    const previousLesson = allLessons[lessonIndex - 1];
    return progress.hasCompletedLesson(previousLesson.id);
  }
}
```

```typescript
// src/domain/content/specifications/ChapterCompletionSpecification.ts
export class ChapterCompletionSpecification {
  /**
   * チャプターが完了しているかを判定
   * ルール: 全レッスンが完了していれば完了
   */
  isSatisfiedBy(chapter: Chapter, progress: Progress): boolean {
    return chapter.lessons.every(lesson =>
      progress.hasCompletedLesson(lesson.id)
    );
  }
}
```

```typescript
// src/domain/progress/specifications/QuizPassSpecification.ts
export class QuizPassSpecification {
  private readonly passingThreshold: number;

  constructor(passingThreshold: number = 70) {
    this.passingThreshold = passingThreshold;
  }

  isSatisfiedBy(quizResult: QuizResult): boolean {
    return quizResult.score.isPassing(this.passingThreshold);
  }
}
```

---

## 4. リポジトリ設計

### 4.1 リポジトリインターフェース（ドメイン層）

```typescript
// src/domain/repositories/ICourseRepository.ts
export interface ICourseRepository {
  findById(id: CourseId): Promise<Course | null>;
  findAll(): Promise<Course[]>;
}
```

```typescript
// src/domain/repositories/IProgressRepository.ts
export interface IProgressRepository {
  findByCourseId(courseId: CourseId): Promise<Progress | null>;
  save(progress: Progress): Promise<void>;
}
```

### 4.2 リポジトリ実装（インフラストラクチャ層）

```typescript
// src/infrastructure/repositories/JsonCourseRepository.ts
import courseData from '@/data/courses.json';

export class JsonCourseRepository implements ICourseRepository {
  async findById(id: CourseId): Promise<Course | null> {
    const data = courseData.courses.find(c => c.id === id.toString());
    if (!data) return null;
    return this.toDomain(data);
  }

  async findAll(): Promise<Course[]> {
    return courseData.courses.map(data => this.toDomain(data));
  }

  private toDomain(data: CourseJson): Course {
    // JSONからドメインモデルへの変換
    const chapters = data.chapters.map(chData =>
      Chapter.create({
        id: ChapterId.create(chData.id),
        title: chData.title,
        order: chData.order,
        lessons: chData.lessons.map(lData =>
          Lesson.create({
            id: LessonId.create(lData.id),
            title: LessonTitle.create(lData.title),
            content: MarkdownContent.create(lData.content),
            order: lData.order,
            quizId: lData.quizId ? QuizId.create(lData.quizId) : undefined,
          })
        ),
      })
    );

    return Course.create({
      id: CourseId.create(data.id),
      title: data.title,
      description: data.description,
      chapters,
    });
  }
}
```

```typescript
// src/infrastructure/repositories/LocalStorageProgressRepository.ts
const STORAGE_KEY = 'ddd-learning-progress';

export class LocalStorageProgressRepository implements IProgressRepository {
  async findByCourseId(courseId: CourseId): Promise<Progress | null> {
    if (typeof window === 'undefined') return null;

    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return null;

    const data = JSON.parse(json);
    const progressData = data[courseId.toString()];
    if (!progressData) return null;

    return Progress.restore({
      courseId,
      completedLessonIds: progressData.completedLessonIds.map(
        (id: string) => LessonId.create(id)
      ),
      quizResults: progressData.quizResults.map((qr: QuizResultJson) =>
        QuizResult.create({
          quizId: QuizId.create(qr.quizId),
          score: Score.create(qr.correct, qr.total),
          completedAt: new Date(qr.completedAt),
        })
      ),
      lastAccessedAt: new Date(progressData.lastAccessedAt),
    });
  }

  async save(progress: Progress): Promise<void> {
    if (typeof window === 'undefined') return;

    const json = localStorage.getItem(STORAGE_KEY);
    const data = json ? JSON.parse(json) : {};

    data[progress.courseId.toString()] = {
      completedLessonIds: progress.getCompletedLessonIds().map(id => id.toString()),
      quizResults: progress.getQuizResults().map(qr => ({
        quizId: qr.quizId.toString(),
        correct: qr.score.correct,
        total: qr.score.total,
        completedAt: qr.completedAt.toISOString(),
      })),
      lastAccessedAt: progress.lastAccessedAt.toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}
```

### 4.3 LocalStorageProgressRepository の利用制約

> **重要:** `LocalStorageProgressRepository` はクライアント専用です。

Next.js App Router の仕様上、`localStorage` はクライアントコンポーネントからのみ利用可能です。

| 利用可能 | 利用不可 |
|---------|---------|
| `'use client'` なコンポーネント | Server Components |
| `src/presentation/hooks/` | `src/app/` の page.tsx（RSC） |
| クライアントサイドのuseEffect内 | Server Actions |

**実装上の注意点:**
- DIコンテナから `LocalStorageProgressRepository` を取得するのは、必ず `'use client'` な層に限定する
- サーバーコンポーネントから進捗を扱う必要が出た場合は、別途サーバーサイド用リポジトリを追加する（Phase 2以降）
- `typeof window === 'undefined'` チェックは保険として残すが、そもそもサーバーから呼ばれないアーキテクチャにする

```typescript
// src/infrastructure/di/container.ts

// ⚠️ LocalStorageProgressRepository はクライアント専用。
// サーバーコンポーネントからは呼ばないこと。
export const createProgressRepository = (): IProgressRepository => {
  return new LocalStorageProgressRepository();
};
```

---

## 5. アプリケーション層

### 5.1 ユースケース（アプリケーションサービス）

```typescript
// src/application/usecases/GetLessonUseCase.ts
export class GetLessonUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository,
    private readonly lessonUnlockSpec: LessonUnlockSpecification
  ) {}

  async execute(params: {
    courseId: string;
    lessonId: string;
  }): Promise<LessonDetailDto | null> {
    const courseId = CourseId.create(params.courseId);
    const lessonId = LessonId.create(params.lessonId);

    // 1. コース取得
    const course = await this.courseRepository.findById(courseId);
    if (!course) return null;

    // 2. レッスン検索
    const found = course.findLesson(lessonId);
    if (!found) return null;

    // 3. 進捗取得
    const progress = await this.progressRepository.findByCourseId(courseId)
      ?? Progress.create(courseId);

    // 4. アンロック状態確認
    const isUnlocked = this.lessonUnlockSpec.isSatisfiedBy(
      found.lesson, course, progress
    );

    // 5. 前後のレッスン取得
    const adjacent = course.getAdjacentLessons(lessonId);

    // 6. DTOに変換して返す
    return {
      id: found.lesson.id.toString(),
      title: found.lesson.title.toString(),
      content: found.lesson.content.raw,
      chapterTitle: found.chapter.title,
      isCompleted: progress.hasCompletedLesson(lessonId),
      isUnlocked,
      previousLessonId: adjacent.previous?.id.toString() ?? null,
      nextLessonId: adjacent.next?.id.toString() ?? null,
      hasQuiz: found.lesson.hasQuiz(),
    };
  }
}
```

```typescript
// src/application/usecases/CompleteLessonUseCase.ts
export class CompleteLessonUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository
  ) {}

  async execute(params: { courseId: string; lessonId: string }): Promise<void> {
    const courseId = CourseId.create(params.courseId);
    const lessonId = LessonId.create(params.lessonId);

    // 1. コースの存在確認
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // 2. レッスンの存在確認
    const found = course.findLesson(lessonId);
    if (!found) {
      throw new Error('Lesson not found');
    }

    // 3. 進捗取得または新規作成
    let progress = await this.progressRepository.findByCourseId(courseId);
    if (!progress) {
      progress = Progress.create(courseId);
    }

    // 4. レッスン完了をマーク（ドメインロジック）
    progress.markLessonAsCompleted(lessonId);

    // 5. 保存
    await this.progressRepository.save(progress);
  }
}
```

### 5.2 DTO（データ転送オブジェクト）

```typescript
// src/application/dto/LessonDetailDto.ts
export interface LessonDetailDto {
  id: string;
  title: string;
  content: string;
  chapterTitle: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  previousLessonId: string | null;
  nextLessonId: string | null;
  hasQuiz: boolean;
}
```

```typescript
// src/application/dto/CourseProgressDto.ts
export interface CourseProgressDto {
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  progressRate: number;
  chapters: ChapterProgressDto[];
}

export interface ChapterProgressDto {
  id: string;
  title: string;
  isCompleted: boolean;
  lessons: LessonSummaryDto[];
}

export interface LessonSummaryDto {
  id: string;
  title: string;
  isCompleted: boolean;
  isUnlocked: boolean;
}
```

---

## 6. 依存性注入（DI）

### 6.1 DIコンテナの設計

```typescript
// src/infrastructure/di/container.ts
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/repositories/IProgressRepository';
import { JsonCourseRepository } from '@/infrastructure/repositories/JsonCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { LessonUnlockSpecification } from '@/domain/specifications/LessonUnlockSpecification';
import { GetLessonUseCase } from '@/application/usecases/GetLessonUseCase';

// シンプルなファクトリパターン
export const createCourseRepository = (): ICourseRepository => {
  return new JsonCourseRepository();
};

export const createProgressRepository = (): IProgressRepository => {
  return new LocalStorageProgressRepository();
};

export const createGetLessonUseCase = (): GetLessonUseCase => {
  return new GetLessonUseCase(
    createCourseRepository(),
    createProgressRepository(),
    new LessonUnlockSpecification()
  );
};
```

### 6.2 Reactからの利用

```typescript
// src/presentation/hooks/useLessonDetail.ts
'use client';

import { useState, useEffect } from 'react';
import { createGetLessonUseCase } from '@/infrastructure/di/container';
import type { LessonDetailDto } from '@/application/dto/LessonDetailDto';

export function useLessonDetail(courseId: string, lessonId: string) {
  const [lesson, setLesson] = useState<LessonDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const useCase = createGetLessonUseCase();
        const result = await useCase.execute({ courseId, lessonId });
        setLesson(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  return { lesson, loading, error };
}
```

---

## 7. テスト戦略

### 7.1 ドメイン層のテスト

ドメイン層は純粋なTypeScriptなので、外部依存なくテスト可能です。

```typescript
// src/domain/progress/models/Score.test.ts
import { describe, it, expect } from 'vitest';
import { Score } from './Score';

describe('Score', () => {
  describe('create', () => {
    it('正常な値でインスタンスを作成できる', () => {
      const score = Score.create(8, 10);
      expect(score.correct).toBe(8);
      expect(score.total).toBe(10);
    });

    it('負の正解数はエラー', () => {
      expect(() => Score.create(-1, 10)).toThrow();
    });

    it('正解数が総数を超えるとエラー', () => {
      expect(() => Score.create(11, 10)).toThrow();
    });
  });

  describe('percentage', () => {
    it('パーセンテージを正しく計算する', () => {
      const score = Score.create(7, 10);
      expect(score.percentage).toBe(70);
    });
  });

  describe('isPassing', () => {
    it('70%以上で合格', () => {
      expect(Score.create(7, 10).isPassing()).toBe(true);
      expect(Score.create(6, 10).isPassing()).toBe(false);
    });

    it('閾値を指定できる', () => {
      expect(Score.create(8, 10).isPassing(80)).toBe(true);
      expect(Score.create(7, 10).isPassing(80)).toBe(false);
    });
  });
});
```

### 7.2 仕様パターンのテスト

```typescript
// src/domain/content/specifications/LessonUnlockSpecification.test.ts
describe('LessonUnlockSpecification', () => {
  const spec = new LessonUnlockSpecification();

  it('最初のレッスンは常にアンロック', () => {
    const course = createTestCourse();
    const progress = Progress.create(course.id);
    const firstLesson = course.chapters[0].lessons[0];

    expect(spec.isSatisfiedBy(firstLesson, course, progress)).toBe(true);
  });

  it('前のレッスン未完了なら2番目はロック', () => {
    const course = createTestCourse();
    const progress = Progress.create(course.id);
    const secondLesson = course.chapters[0].lessons[1];

    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(false);
  });

  it('前のレッスン完了なら2番目はアンロック', () => {
    const course = createTestCourse();
    const progress = Progress.create(course.id);
    const firstLesson = course.chapters[0].lessons[0];
    const secondLesson = course.chapters[0].lessons[1];

    progress.markLessonAsCompleted(firstLesson.id);

    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(true);
  });
});
```

### 7.3 ユースケースのテスト

```typescript
// src/application/usecases/CompleteLessonUseCase.test.ts
describe('CompleteLessonUseCase', () => {
  it('レッスンを完了としてマークできる', async () => {
    // Arrange
    const mockCourseRepo = new MockCourseRepository();
    const mockProgressRepo = new MockProgressRepository();
    const useCase = new CompleteLessonUseCase(mockCourseRepo, mockProgressRepo);

    // Act
    await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-1',
    });

    // Assert
    const saved = await mockProgressRepo.findByCourseId(CourseId.create('course-1'));
    expect(saved?.hasCompletedLesson(LessonId.create('lesson-1'))).toBe(true);
  });
});
```

---

## 8. 実装順序（MVP Phase 1）

以下の順序で実装を進めます：

### Step 1: ドメイン層の基盤

1. 共有カーネル（`src/domain/shared/`）
   - 識別子の値オブジェクト: CourseId, ChapterId, LessonId, QuizId

### Step 2: 境界づけられたコンテキスト

2. Learning Content BC（`src/domain/content/`）
   - models/: Lesson, Chapter, Course（集約ルート）
   - specifications/: LessonUnlockSpecification, ChapterCompletionSpecification
   - services/: LessonNavigationService

3. Learning Progress BC（`src/domain/progress/`）
   - models/: Score, QuizResult, Progress（集約ルート）
   - specifications/: QuizPassSpecification

### Step 3: リポジトリインターフェース

4. リポジトリインターフェース（`src/domain/repositories/`）
   - ICourseRepository
   - IProgressRepository

### Step 4: インフラストラクチャ層

5. データソース
   - 静的JSONファイル（コンテンツ）
   - LocalStorageアダプタ

6. リポジトリ実装（`src/infrastructure/repositories/`）
   - JsonCourseRepository
   - LocalStorageProgressRepository（クライアント専用）

### Step 5: アプリケーション層

7. DTO定義（`src/application/dto/`）
8. ユースケース実装（`src/application/usecases/`）
   - GetCourseUseCase
   - GetLessonUseCase
   - CompleteLessonUseCase
   - SubmitQuizUseCase

### Step 6: プレゼンテーション層

9. DIコンテナ設定（`src/infrastructure/di/`）
10. カスタムフック（`src/presentation/hooks/`）
11. UIコンポーネント（`src/presentation/components/`）
12. ページ実装（`src/app/`）

---

## 9. アンチパターン回避

### 9.1 ドメインモデル貧血症を避ける

```typescript
// ❌ 悪い例: 貧血ドメインモデル
class Progress {
  courseId: string;
  completedLessonIds: string[];
}

// ロジックが外部に漏れる
function markLessonCompleted(progress: Progress, lessonId: string) {
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
  }
}

// ✅ 良い例: リッチドメインモデル
class Progress {
  private _completedLessonIds: Set<string>;

  markLessonAsCompleted(lessonId: LessonId): void {
    this._completedLessonIds.add(lessonId.toString());
    this._lastAccessedAt = new Date();
  }
}
```

### 9.2 集約境界を超えた直接参照を避ける

```typescript
// ❌ 悪い例: Progress が Course を直接持つ
class Progress {
  course: Course; // 別集約への直接参照

  getProgressRate(): number {
    return this.completedCount / this.course.totalLessons;
  }
}

// ✅ 良い例: IDで参照、計算時に外部から渡す
class Progress {
  private _courseId: CourseId; // IDのみ保持

  calculateProgressRate(totalLessons: number): number {
    return Math.round((this.completedLessonCount / totalLessons) * 100);
  }
}
```

### 9.3 値オブジェクトの不変性を保つ

```typescript
// ❌ 悪い例: ミュータブルな値オブジェクト
class Score {
  correct: number; // 変更可能

  increment(): void {
    this.correct++; // ミューテーション
  }
}

// ✅ 良い例: イミュータブルな値オブジェクト
class Score {
  private constructor(
    private readonly _correct: number,
    private readonly _total: number
  ) {}

  addCorrect(): Score {
    return Score.create(this._correct + 1, this._total); // 新しいインスタンス
  }
}
```

---

## 10. 用語集（ユビキタス言語）

コードとビジネスで同じ用語を使います：

| ビジネス用語 | コード上の表現 | 説明 |
|-------------|---------------|------|
| コース | `Course` | 学習の最上位単位 |
| チャプター | `Chapter` | コースを構成する部 |
| レッスン | `Lesson` | 1つの学習単位 |
| クイズ | `Quiz` | 理解度確認問題 |
| 進捗 | `Progress` | 学習の進み具合 |
| スコア | `Score` | クイズの得点 |
| 完了 | `markAsCompleted` | レッスンを終えた状態にする |
| アンロック | `isUnlocked` | 学習可能な状態 |
| 合格 | `isPassing` | 閾値以上のスコアを獲得 |

---

このガイドに従って実装を進めることで、DDDの原則に沿った保守性の高いコードベースを構築できます。
