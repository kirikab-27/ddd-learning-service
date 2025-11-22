# Context Map: DDD Learning Service

## 1. Bounded Contexts Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                       DDD Learning Service                          │
├───────────────────────────┬─────────────────────────────────────────┤
│                           │                                         │
│   Learning Content BC     │         Learning Progress BC            │
│   (学習コンテンツ)          │         (学習進捗)                       │
│                           │                                         │
│   ┌─────────────────┐     │     ┌─────────────────┐                 │
│   │     Course      │     │     │    Progress     │                 │
│   │   (集約ルート)    │     │     │   (集約ルート)   │                 │
│   │       │         │     │     │       │         │                 │
│   │   Chapter[]     │     │     │  CompletedIds   │                 │
│   │       │         │     │     │  QuizResults    │                 │
│   │   Lesson[]      │────────────►  (CourseId参照) │                 │
│   │       │         │     │     │  (LessonId参照) │                 │
│   │   Quiz (0..1)   │     │     └─────────────────┘                 │
│   └─────────────────┘     │                                         │
│                           │                                         │
├───────────────────────────┴─────────────────────────────────────────┤
│   Shared Kernel (共有カーネル): CourseId, ChapterId, LessonId, QuizId │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Context Responsibilities

### Learning Content BC (学習コンテンツコンテキスト)
**Owner:** Backend Workers (Worker1-3)

| 概念 | 型 | 責務 |
|------|-----|------|
| Course | 集約ルート | コース全体の構造管理、レッスン検索 |
| Chapter | エンティティ | チャプター情報、レッスンのグループ化 |
| Lesson | エンティティ | 学習コンテンツ、コード例の保持 |
| Quiz | エンティティ | 理解度確認問題 |
| LessonUnlockSpecification | 仕様 | レッスン解放条件の判定 |
| ChapterCompletionSpecification | 仕様 | チャプター完了条件の判定 |

### Learning Progress BC (学習進捗コンテキスト)
**Owner:** Backend Workers (Worker1-3)

| 概念 | 型 | 責務 |
|------|-----|------|
| Progress | 集約ルート | ユーザーの進捗状態管理 |
| QuizResult | エンティティ | クイズ結果の記録 |
| Score | 値オブジェクト | 正解数/総問題数、合格判定 |
| QuizPassSpecification | 仕様 | クイズ合格条件の判定 |

## 3. Context Relationships

```
┌──────────────────────┐          ┌──────────────────────┐
│  Learning Content    │          │  Learning Progress   │
│       Context        │          │       Context        │
└──────────┬───────────┘          └──────────┬───────────┘
           │                                  │
           │  Upstream                        │  Downstream
           │  (データ提供側)                    │  (データ利用側)
           │                                  │
           └──────────────┬───────────────────┘
                          │
                          ▼
                  Shared Kernel
              (CourseId, LessonId等)
```

**関係性: Customer-Supplier**
- Learning Content BC が **Upstream（上流）** として構造を定義
- Learning Progress BC が **Downstream（下流）** としてIDを参照
- 直接的なエンティティ参照はせず、**IDによる疎結合**を維持

## 4. Anti-Corruption Layer

Progress が Course の内部構造に依存しないよう、以下を遵守:

```typescript
// ❌ NG: Progress が Course を直接参照
class Progress {
  course: Course;  // 別集約への直接参照
}

// ✅ OK: ID のみを保持
class Progress {
  private _courseId: CourseId;  // ID参照のみ

  // 進捗率計算時は外部から totalLessons を受け取る
  calculateProgressRate(totalLessons: number): number { ... }
}
```

## 5. Directory Mapping

```
src/domain/
├── shared/              # Shared Kernel
│   ├── CourseId.ts
│   ├── ChapterId.ts
│   ├── LessonId.ts
│   └── QuizId.ts
├── content/             # Learning Content BC
│   ├── models/
│   │   ├── Course.ts
│   │   ├── Chapter.ts
│   │   ├── Lesson.ts
│   │   └── Quiz.ts
│   ├── services/
│   │   └── LessonNavigationService.ts
│   └── specifications/
│       ├── LessonUnlockSpecification.ts
│       └── ChapterCompletionSpecification.ts
├── progress/            # Learning Progress BC
│   ├── models/
│   │   ├── Progress.ts
│   │   ├── QuizResult.ts
│   │   └── Score.ts
│   └── specifications/
│       └── QuizPassSpecification.ts
└── repositories/        # Repository Interfaces (BC横断)
    ├── ICourseRepository.ts
    └── IProgressRepository.ts
```

## 6. Integration Points

### UseCase での統合

アプリケーション層（UseCase）が両BCを協調させる:

```typescript
// GetLessonUseCase: 両コンテキストを統合
class GetLessonUseCase {
  constructor(
    private courseRepo: ICourseRepository,    // Content BC
    private progressRepo: IProgressRepository, // Progress BC
    private unlockSpec: LessonUnlockSpecification
  ) {}

  async execute(params): Promise<LessonDetailDto> {
    const course = await this.courseRepo.findById(courseId);
    const progress = await this.progressRepo.findByCourseId(courseId);

    // 仕様パターンで解放条件を判定
    const isUnlocked = this.unlockSpec.isSatisfiedBy(lesson, course, progress);

    return { ...lessonData, isUnlocked };
  }
}
```
