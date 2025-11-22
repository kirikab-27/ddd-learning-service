# Worker6 Instructions: Ticket 001

## Task: ナビゲーションコンポーネントの実装

### Prerequisites
- Worker2 の Content BC 完了を待つ

### Goal
コースナビゲーション（サイドバー）とレッスン間ナビゲーションを実装する。

### Deliverables

```
src/application/
├── usecases/
│   ├── GetCourseNavigationUseCase.ts
│   ├── GetCourseNavigationUseCase.test.ts
│   └── index.ts (update)
└── index.ts

src/presentation/
├── features/
│   └── navigation/
│       ├── CourseSidebar.tsx
│       ├── CourseSidebar.test.tsx
│       ├── ChapterNav.tsx
│       ├── ChapterNav.test.tsx
│       ├── LessonNav.tsx
│       ├── LessonNav.test.tsx
│       ├── LessonNavigation.tsx
│       ├── LessonNavigation.test.tsx
│       └── index.ts
└── hooks/
    ├── useCourseNavigation.ts
    └── index.ts (update)
```

### Implementation: UseCase

```typescript
// src/application/usecases/GetCourseNavigationUseCase.ts
import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { CourseId } from '@/domain/shared';
import { LessonUnlockSpecification } from '@/domain/content/specifications/LessonUnlockSpecification';
import { Progress } from '@/domain/progress/models/Progress';

export interface GetCourseNavigationInput {
  courseId: string;
  currentLessonId?: string;
}

export interface NavigationLesson {
  id: string;
  title: string;
  order: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
}

export interface NavigationChapter {
  id: string;
  title: string;
  order: number;
  lessons: NavigationLesson[];
  isExpanded: boolean;
}

export interface GetCourseNavigationOutput {
  courseId: string;
  courseTitle: string;
  chapters: NavigationChapter[];
  completionRate: number;
}

export class GetCourseNavigationUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository
  ) {}

  async execute(input: GetCourseNavigationInput): Promise<GetCourseNavigationOutput> {
    const courseId = CourseId.create(input.courseId);

    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const progress = await this.progressRepository.findByCourseId(courseId)
      ?? Progress.create(courseId);

    const unlockSpec = new LessonUnlockSpecification();

    const chapters: NavigationChapter[] = course.chapters.map(chapter => {
      const containsCurrentLesson = chapter.lessons.some(
        l => l.id.toString() === input.currentLessonId
      );

      const lessons: NavigationLesson[] = chapter.lessons.map(lesson => ({
        id: lesson.id.toString(),
        title: lesson.title.toString(),
        order: lesson.order,
        isCompleted: progress.hasCompletedLesson(lesson.id),
        isUnlocked: unlockSpec.isSatisfiedBy(lesson, course, progress),
        isCurrent: lesson.id.toString() === input.currentLessonId,
      }));

      return {
        id: chapter.id.toString(),
        title: chapter.title,
        order: chapter.order,
        lessons,
        isExpanded: containsCurrentLesson,
      };
    });

    const completionRate = progress.calculateCompletionRate(course.totalLessons);

    return {
      courseId: course.id.toString(),
      courseTitle: course.title,
      chapters,
      completionRate,
    };
  }
}
```

### Implementation: Hook

```typescript
// src/presentation/hooks/useCourseNavigation.ts
'use client';

import { useState, useEffect } from 'react';
import {
  GetCourseNavigationUseCase,
  GetCourseNavigationOutput,
} from '@/application/usecases/GetCourseNavigationUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';

interface UseCourseNavigationParams {
  courseId: string;
  currentLessonId?: string;
}

interface UseCourseNavigationResult {
  data: GetCourseNavigationOutput | null;
  isLoading: boolean;
  error: Error | null;
}

export function useCourseNavigation({
  courseId,
  currentLessonId,
}: UseCourseNavigationParams): UseCourseNavigationResult {
  const [data, setData] = useState<GetCourseNavigationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const courseRepo = new InMemoryCourseRepository(sampleCourses);
        const progressRepo = new LocalStorageProgressRepository();
        const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

        const result = await useCase.execute({ courseId, currentLessonId });
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavigation();
  }, [courseId, currentLessonId]);

  return { data, isLoading, error };
}
```

### Implementation: Components

```typescript
// src/presentation/features/navigation/LessonNav.tsx
'use client';

import Link from 'next/link';
import styles from './LessonNav.module.css';

interface LessonNavProps {
  courseId: string;
  chapterId: string;
  lesson: {
    id: string;
    title: string;
    order: number;
    isCompleted: boolean;
    isUnlocked: boolean;
    isCurrent: boolean;
  };
}

export function LessonNav({ courseId, chapterId, lesson }: LessonNavProps) {
  const className = [
    styles.lesson,
    lesson.isCurrent && styles.current,
    lesson.isCompleted && styles.completed,
    !lesson.isUnlocked && styles.locked,
  ]
    .filter(Boolean)
    .join(' ');

  const href = `/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`;

  if (!lesson.isUnlocked) {
    return (
      <div className={className}>
        <span className={styles.lockIcon}>🔒</span>
        <span className={styles.title}>{lesson.title}</span>
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {lesson.isCompleted && <span className={styles.checkIcon}>✓</span>}
      <span className={styles.order}>{lesson.order}.</span>
      <span className={styles.title}>{lesson.title}</span>
    </Link>
  );
}
```

```typescript
// src/presentation/features/navigation/ChapterNav.tsx
'use client';

import { useState } from 'react';
import { LessonNav } from './LessonNav';
import styles from './ChapterNav.module.css';

interface ChapterNavProps {
  courseId: string;
  chapter: {
    id: string;
    title: string;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
      isCompleted: boolean;
      isUnlocked: boolean;
      isCurrent: boolean;
    }>;
    isExpanded: boolean;
  };
}

export function ChapterNav({ courseId, chapter }: ChapterNavProps) {
  const [isExpanded, setIsExpanded] = useState(chapter.isExpanded);

  const completedCount = chapter.lessons.filter(l => l.isCompleted).length;
  const totalCount = chapter.lessons.length;

  return (
    <div className={styles.chapter}>
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</span>
        <span className={styles.title}>
          {chapter.order}. {chapter.title}
        </span>
        <span className={styles.progress}>
          {completedCount}/{totalCount}
        </span>
      </button>

      {isExpanded && (
        <div className={styles.lessons}>
          {chapter.lessons.map(lesson => (
            <LessonNav
              key={lesson.id}
              courseId={courseId}
              chapterId={chapter.id}
              lesson={lesson}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

```typescript
// src/presentation/features/navigation/CourseSidebar.tsx
'use client';

import { useParams } from 'next/navigation';
import { useCourseNavigation } from '@/presentation/hooks/useCourseNavigation';
import { ChapterNav } from './ChapterNav';
import styles from './CourseSidebar.module.css';

interface CourseSidebarProps {
  courseId: string;
}

export function CourseSidebar({ courseId }: CourseSidebarProps) {
  const params = useParams();
  const currentLessonId = params?.lessonId as string | undefined;

  const { data, isLoading, error } = useCourseNavigation({
    courseId,
    currentLessonId,
  });

  if (isLoading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (error || !data) {
    return <div className={styles.error}>ナビゲーションを読み込めませんでした</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.courseHeader}>
        <h2 className={styles.courseTitle}>{data.courseTitle}</h2>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${data.completionRate}%` }}
          />
        </div>
        <span className={styles.progressText}>{data.completionRate}% 完了</span>
      </div>

      <nav className={styles.nav}>
        {data.chapters.map(chapter => (
          <ChapterNav
            key={chapter.id}
            courseId={courseId}
            chapter={chapter}
          />
        ))}
      </nav>
    </div>
  );
}
```

```typescript
// src/presentation/features/navigation/LessonNavigation.tsx
'use client';

import Link from 'next/link';
import styles from './LessonNavigation.module.css';

interface LessonNavigationProps {
  courseId: string;
  previous: { chapterId: string; lessonId: string } | null;
  next: { chapterId: string; lessonId: string } | null;
}

export function LessonNavigation({ courseId, previous, next }: LessonNavigationProps) {
  return (
    <nav className={styles.nav}>
      {previous ? (
        <Link
          href={`/courses/${courseId}/chapters/${previous.chapterId}/lessons/${previous.lessonId}`}
          className={styles.link}
        >
          ← 前のレッスン
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/courses/${courseId}/chapters/${next.chapterId}/lessons/${next.lessonId}`}
          className={styles.link}
        >
          次のレッスン →
        </Link>
      ) : (
        <span className={styles.complete}>🎉 コース完了！</span>
      )}
    </nav>
  );
}
```

### Definition of Done

- [ ] GetCourseNavigationUseCase 実装・テスト
- [ ] useCourseNavigation フック
- [ ] LessonNav コンポーネント
- [ ] ChapterNav コンポーネント
- [ ] CourseSidebar コンポーネント
- [ ] LessonNavigation コンポーネント
- [ ] git commit & push
- [ ] Boss1 に完了報告

### Commands

```bash
# 開発サーバー起動
npm run dev

# テスト実行
npm run test src/application/usecases/GetCourseNavigationUseCase
npm run test src/presentation/features/navigation/

# 型チェック
npm run typecheck

# コミット
git add src/application/ src/presentation/features/navigation/ src/presentation/hooks/
git commit -m "feat(presentation): add navigation components"
git push origin agent/001/frontend6
```

### Report Template

```
[DONE] Worker6 ナビゲーション完了

作成ファイル:
- src/application/usecases/GetCourseNavigationUseCase.ts
- src/presentation/features/navigation/CourseSidebar.tsx
- src/presentation/features/navigation/ChapterNav.tsx
- src/presentation/features/navigation/LessonNav.tsx
- src/presentation/features/navigation/LessonNavigation.tsx
- src/presentation/hooks/useCourseNavigation.ts
- 各テストファイル

テスト結果: 全パス
PR: agent/001/frontend6
```
