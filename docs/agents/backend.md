# Backend Workers Guide (Worker 1-3)

## 1. Your Mission

ドメイン層、アプリケーション層、インフラストラクチャ層の実装を担当します。
**DDDの原則を厳格に守り、ビジネスロジックをドメイン層に集約する**ことが最重要です。

## 2. Scope of Work

```
src/
├── domain/           ★ 最重要 ★
│   ├── shared/       # 共有カーネル（識別子）
│   ├── content/      # Learning Content BC
│   └── progress/     # Learning Progress BC
├── application/      ★ 重要 ★
│   ├── usecases/     # ユースケース
│   └── dto/          # データ転送オブジェクト
└── infrastructure/   ★ 実装詳細 ★
    ├── repositories/ # リポジトリ実装
    └── di/           # 依存性注入
```

## 3. Implementation Rules

### ドメイン層 (CRITICAL)

```typescript
// ✅ DO: 純粋なTypeScriptのみ
export class Score {
  private constructor(
    private readonly _correct: number,
    private readonly _total: number
  ) {}

  static create(correct: number, total: number): Score {
    if (correct < 0) throw new Error('Correct cannot be negative');
    return new Score(correct, total);
  }
}

// ❌ DO NOT: 外部依存
import { useEffect } from 'react';  // 禁止
import prisma from '@/lib/prisma';   // 禁止
```

### 値オブジェクト (Value Objects)

```typescript
// パターン: private constructor + static create
export class LessonId {
  private constructor(private readonly value: string) {}

  static create(value: string): LessonId {
    if (!value?.trim()) throw new Error('LessonId cannot be empty');
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

### エンティティ (Entities)

```typescript
// パターン: IDで同一性を判断、ドメインロジックを内包
export class Lesson {
  private constructor(
    private readonly _id: LessonId,
    private readonly _title: LessonTitle,
    private readonly _content: MarkdownContent,
    private readonly _quizId: QuizId | null
  ) {}

  static create(params: {...}): Lesson {
    // バリデーション
    return new Lesson(...);
  }

  // ドメインロジックをメソッドとして持つ
  hasQuiz(): boolean {
    return this._quizId !== null;
  }

  equals(other: Lesson): boolean {
    return this._id.equals(other._id);
  }
}
```

### 集約 (Aggregates)

```typescript
// パターン: 集約ルートが整合性を保証
export class Course {
  // 内部エンティティへの直接アクセスは禁止
  get chapters(): readonly Chapter[] {
    return this._chapters;  // readonly で防御
  }

  // 集約ルート経由でのみ操作
  findLesson(lessonId: LessonId): { chapter: Chapter; lesson: Lesson } | null {
    // 検索ロジック
  }
}
```

### 仕様パターン (Specifications)

```typescript
// パターン: 複雑なビジネスルールをカプセル化
export class LessonUnlockSpecification {
  isSatisfiedBy(lesson: Lesson, course: Course, progress: Progress): boolean {
    // 判定ロジック
  }
}
```

### リポジトリ (Repositories)

```typescript
// ドメイン層: インターフェースのみ
export interface ICourseRepository {
  findById(id: CourseId): Promise<Course | null>;
  findAll(): Promise<Course[]>;
}

// インフラ層: 実装
export class JsonCourseRepository implements ICourseRepository {
  async findById(id: CourseId): Promise<Course | null> {
    // JSON読み込み → ドメインモデル変換
  }
}
```

### ユースケース (UseCases)

```typescript
// パターン: ドメインとインフラの調整役
export class GetLessonUseCase {
  constructor(
    private readonly courseRepo: ICourseRepository,
    private readonly progressRepo: IProgressRepository,
    private readonly unlockSpec: LessonUnlockSpecification
  ) {}

  async execute(params: {...}): Promise<LessonDetailDto> {
    // 1. リポジトリからエンティティ取得
    // 2. ドメインロジック実行
    // 3. DTOに変換して返却
  }
}
```

## 4. File Naming Convention

```
src/domain/
├── shared/
│   ├── CourseId.ts          # 値オブジェクト: PascalCase
│   └── CourseId.test.ts     # テスト: *.test.ts
├── content/
│   ├── models/
│   │   ├── Course.ts        # 集約ルート
│   │   ├── Chapter.ts       # エンティティ
│   │   └── Lesson.ts        # エンティティ
│   ├── services/
│   │   └── LessonNavigationService.ts
│   └── specifications/
│       └── LessonUnlockSpecification.ts
```

## 5. Testing Requirements

ドメインロジックは**必ず**ユニットテストを書く:

```typescript
// src/domain/progress/models/Score.test.ts
import { describe, it, expect } from 'vitest';
import { Score } from './Score';

describe('Score', () => {
  describe('create', () => {
    it('正常値でインスタンス作成', () => {
      const score = Score.create(8, 10);
      expect(score.correct).toBe(8);
    });

    it('負の値はエラー', () => {
      expect(() => Score.create(-1, 10)).toThrow();
    });
  });

  describe('isPassing', () => {
    it('70%以上で合格', () => {
      expect(Score.create(7, 10).isPassing()).toBe(true);
    });
  });
});
```

## 6. Common Mistakes to Avoid

### ❌ ドメインモデル貧血症

```typescript
// ❌ NG: ロジックが外部に漏れている
class Progress {
  completedLessonIds: string[];  // publicフィールド
}

function markCompleted(progress: Progress, lessonId: string) {
  progress.completedLessonIds.push(lessonId);  // 外部でミューテート
}

// ✅ OK: ロジックをモデル内に持つ
class Progress {
  private _completedLessonIds: Set<string>;

  markLessonAsCompleted(lessonId: LessonId): void {
    this._completedLessonIds.add(lessonId.toString());
  }
}
```

### ❌ 集約境界の侵害

```typescript
// ❌ NG: 別集約を直接保持
class Progress {
  course: Course;  // 別集約への直接参照
}

// ✅ OK: IDのみで参照
class Progress {
  private _courseId: CourseId;
}
```

### ❌ 値オブジェクトの可変性

```typescript
// ❌ NG: ミュータブル
class Score {
  public correct: number;
}

// ✅ OK: イミュータブル
class Score {
  private readonly _correct: number;
}
```

## 7. Reference Documents

詳細な実装パターンは以下を参照:
- `docs/IMPLEMENTATION_GUIDE.md` - 完全な実装ガイド
- `docs/CONTEXT_MAP.md` - BC間の関係
