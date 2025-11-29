# Ticket 005: Frontend1 - コース詳細ページ実装

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当ファイル

### 新規作成
1. `app/courses/[courseId]/page.tsx` - コース詳細ページ
2. `src/presentation/features/course/CourseDetail.tsx` - コース詳細コンポーネント
3. `src/presentation/features/course/ChapterList.tsx` - チャプター一覧
4. `src/presentation/features/course/LessonListItem.tsx` - レッスン一覧アイテム
5. `src/presentation/features/course/index.ts` - エクスポート

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

## 実装詳細

### page.tsx
```tsx
'use client';

import { use } from 'react';
import { CourseDetail } from '@/presentation/features/course';
import { useProgress } from '@/presentation/hooks/useProgress';
// GetCourseUseCase を使用してコース情報取得

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = use(params);
  // コース情報と進捗を取得して CourseDetail に渡す
}
```

### CourseDetail.tsx
```tsx
interface CourseDetailProps {
  course: Course;
  progress: Progress | null;
}

// Tailwindクラス例
<div className="max-w-4xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
  <p className="text-gray-600 mb-8">{course.description}</p>

  {/* 進捗バー */}
  <div className="mb-8">
    <div className="flex justify-between text-sm text-gray-600 mb-2">
      <span>全体進捗</span>
      <span>{progressPercentage}%</span>
    </div>
    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  </div>

  <ChapterList chapters={course.chapters} progress={progress} />

  {/* CTAボタン */}
  <Link
    href={firstLessonUrl}
    className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
  >
    {hasProgress ? '続きから学習する' : '学習を始める'}
  </Link>
</div>
```

### ChapterList.tsx
```tsx
interface ChapterListProps {
  chapters: Chapter[];
  progress: Progress | null;
  courseId: string;
}

// チャプターごとにアコーディオン形式で表示
<div className="space-y-4">
  {chapters.map(chapter => (
    <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">{chapter.title}</h2>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalCount} {isChapterComplete && '✓'}
        </span>
      </div>
      <ul className="divide-y divide-gray-100">
        {chapter.lessons.map(lesson => (
          <LessonListItem key={lesson.id} ... />
        ))}
      </ul>
    </div>
  ))}
</div>
```

### LessonListItem.tsx
```tsx
interface LessonListItemProps {
  lesson: Lesson;
  isCompleted: boolean;
  courseId: string;
  chapterId: string;
}

<li>
  <Link
    href={`/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`}
    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
  >
    <span className={`mr-3 ${isCompleted ? 'text-green-500' : 'text-gray-300'}`}>
      {isCompleted ? '✓' : '○'}
    </span>
    <span className={isCompleted ? 'text-gray-500' : 'text-gray-900'}>
      {lesson.title}
    </span>
  </Link>
</li>
```

## Definition of Done
- [ ] `/courses/[courseId]` でコース詳細が表示される
- [ ] チャプター一覧が表示される
- [ ] 各チャプターのレッスン一覧が表示される
- [ ] 進捗率が表示される
- [ ] レッスンへのリンクが機能する
- [ ] Tailwind CSSでスタイリングされている（CSS Modules禁止）
- [ ] TypeScriptエラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 005 - コース詳細ページ実装完了。PR #XX を作成しました。"
```
