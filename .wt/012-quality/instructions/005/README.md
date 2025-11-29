# Ticket 005: コース詳細ページ実装

## Goal
要件定義書（§7.1 COURSE-001）で必須とされているコース詳細ページを実装する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §4.1.1: チャプター一覧表示
- §7.1: COURSE-001 コース詳細画面

## Scope

### In Scope
- `/courses/[courseId]/page.tsx` の作成
- コース情報表示（タイトル、説明）
- チャプター一覧表示
- 各チャプターのレッスン一覧表示
- 進捗率表示（チャプター・全体）
- 最初のレッスンへの導線

### Out of Scope
- コース一覧ページ（/courses）
- 新規コース追加機能

## UI要件

```
┌─────────────────────────────────────────────┐
│ DDD基礎コース                               │
│ ドメイン駆動設計の基礎を学ぶコースです。      │
│                                             │
│ 全体進捗: ████░░░░░░ 40%                    │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 第1章: DDD入門                    3/3 ✓ │ │
│ │ ├── DDDとは何か              ✓          │ │
│ │ ├── 値オブジェクト           ✓          │ │
│ │ └── エンティティ             ✓          │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ 第2章: 戦術的設計                 0/1   │ │
│ │ └── 集約とは                 ○          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [学習を始める] or [続きから学習する]          │
└─────────────────────────────────────────────┘
```

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 005-frontend1 | コース詳細ページ・コンポーネント | なし |
| Quality | 005-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: コース詳細ページ

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Technical Requirements

### ページ構造
```typescript
// app/courses/[courseId]/page.tsx
interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  // ...
}
```

### コンポーネント
```typescript
// src/presentation/features/course/CourseDetail.tsx
interface CourseDetailProps {
  course: Course;
  progress: Progress | null;
}

// src/presentation/features/course/ChapterList.tsx
interface ChapterListProps {
  chapters: Chapter[];
  progress: Progress | null;
}

// src/presentation/features/course/LessonListItem.tsx
interface LessonListItemProps {
  lesson: Lesson;
  isCompleted: boolean;
  courseId: string;
  chapterId: string;
}
```

## Definition of Done

- [ ] `/courses/[courseId]` でコース詳細が表示される
- [ ] チャプター一覧が表示される
- [ ] 各チャプターのレッスン一覧が表示される
- [ ] 進捗率が表示される（LocalStorageから取得）
- [ ] レッスンへのリンクが機能する
- [ ] Tailwind CSSでスタイリングされている
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- 既存のGetCourseUseCaseを活用
- Boss1は完了後に `runs/005/REPORT.md` を作成すること
