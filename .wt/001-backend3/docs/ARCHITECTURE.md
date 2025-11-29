# DDD Learning Service - アーキテクチャガイド

## 概要

本プロジェクトは **Clean Architecture + DDD（ドメイン駆動設計）** を採用しています。

---

## ディレクトリ構造

```
ddd-learning-service/
├── app/                    # Presentation層（Next.js App Router）
│   ├── api/               # API Routes
│   ├── (routes)/          # ページコンポーネント
│   └── layout.tsx
├── src/
│   ├── domain/            # ドメイン層（ビジネスロジックの中心）
│   │   ├── entities/      # エンティティ
│   │   ├── valueObjects/  # 値オブジェクト
│   │   ├── repositories/  # リポジトリインターフェース
│   │   └── services/      # ドメインサービス
│   ├── application/       # アプリケーション層
│   │   ├── usecases/      # ユースケース
│   │   └── dto/           # データ転送オブジェクト
│   └── infrastructure/    # インフラストラクチャ層
│       ├── repositories/  # リポジトリ実装
│       └── external/      # 外部サービス連携
├── .wt/                   # マルチエージェントフレームワーク
└── docs/                  # ドキュメント
```

---

## レイヤー責務

### Domain層（ドメイン層）
**責務**: ビジネスルールの表現

```typescript
// エンティティ例
class Course {
  constructor(
    private readonly id: CourseId,
    private title: CourseTitle,
    private chapters: Chapter[]
  ) {}

  addChapter(chapter: Chapter): void {
    // ビジネスルール: 章の追加ロジック
  }
}

// 値オブジェクト例
class Score {
  private constructor(private readonly value: number) {}

  static create(value: number): Score {
    if (value < 0 || value > 100) {
      throw new Error('Score must be between 0 and 100');
    }
    return new Score(value);
  }

  isPassing(): boolean {
    return this.value >= 60;
  }
}
```

### Application層（アプリケーション層）
**責務**: ユースケースの調整

```typescript
// ユースケース例
class CompleteLessonUseCase {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly progressRepository: ProgressRepository
  ) {}

  async execute(studentId: string, lessonId: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.findByStudentId(studentId);
    enrollment.completeLesson(lessonId);
    await this.progressRepository.save(enrollment.progress);
  }
}
```

### Infrastructure層（インフラストラクチャ層）
**責務**: 技術的詳細の実装

```typescript
// リポジトリ実装例
class JsonEnrollmentRepository implements EnrollmentRepository {
  async findByStudentId(studentId: string): Promise<Enrollment> {
    const data = await fs.readFile(`data/enrollments/${studentId}.json`);
    return this.toDomain(JSON.parse(data));
  }
}
```

### Presentation層（プレゼンテーション層）
**責務**: UIとAPI

```typescript
// API Route例
export async function POST(request: Request) {
  const body = await request.json();
  const useCase = new CompleteLessonUseCase(/* dependencies */);
  await useCase.execute(body.studentId, body.lessonId);
  return Response.json({ success: true });
}
```

---

## 依存関係ルール

```
Presentation → Application → Domain ← Infrastructure
                    ↓
              Domain層は他に依存しない
```

- **Domain層**: 何にも依存しない（純粋）
- **Application層**: Domain層のみに依存
- **Infrastructure層**: Domain層のインターフェースを実装
- **Presentation層**: Application層を呼び出す

---

## DDDパターン適用ガイド

### 値オブジェクト
- 不変（immutable）
- 属性で等価性を判定
- 例: Score, Email, CourseTitle

### エンティティ
- IDで同一性を判定
- ライフサイクルを持つ
- 例: Course, Student, Enrollment

### 集約
- 整合性境界
- 集約ルートを通じてアクセス
- 例: Course（Lessonを内包）

### リポジトリ
- ドメイン層にインターフェース
- Infrastructure層に実装

### ドメインサービス
- エンティティに属さない操作
- 例: 成績計算、修了判定

### Specification
- 複雑な条件判定を独立化
- 例: CourseCompletionSpecification
