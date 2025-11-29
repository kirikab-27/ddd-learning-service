# Worker5 Instructions: Ticket 001

## Task: レッスン表示コンポーネントの実装

### Prerequisites
- Worker2 の Content BC 完了を待つ
- Worker4 のレイアウト基盤完了を待つ

### Goal
レッスンコンテンツを表示するコンポーネントとユースケースを実装する。

### Deliverables

```
src/application/
├── usecases/
│   ├── GetLessonUseCase.ts
│   ├── GetLessonUseCase.test.ts
│   └── index.ts
└── index.ts

src/presentation/
├── features/
│   └── lesson/
│       ├── LessonContent.tsx
│       ├── LessonContent.test.tsx
│       ├── LessonHeader.tsx
│       ├── LessonHeader.test.tsx
│       ├── MarkdownRenderer.tsx
│       ├── MarkdownRenderer.test.tsx
│       └── index.ts
└── hooks/
    ├── useLesson.ts
    └── index.ts

app/
└── courses/
    └── [courseId]/
        └── chapters/
            └── [chapterId]/
                └── lessons/
                    └── [lessonId]/
                        └── page.tsx
```

### Implementation: UseCase

```typescript
// src/application/usecases/GetLessonUseCase.ts
import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { CourseId, LessonId, ChapterId } from '@/domain/shared';
import { LessonUnlockSpecification } from '@/domain/content/specifications/LessonUnlockSpecification';

export interface GetLessonInput {
  courseId: string;
  chapterId: string;
  lessonId: string;
}

export interface GetLessonOutput {
  lesson: {
    id: string;
    title: string;
    content: string;
    order: number;
    hasQuiz: boolean;
  };
  chapter: {
    id: string;
    title: string;
  };
  course: {
    id: string;
    title: string;
  };
  navigation: {
    previous: { chapterId: string; lessonId: string } | null;
    next: { chapterId: string; lessonId: string } | null;
  };
  isCompleted: boolean;
  isUnlocked: boolean;
}

export class GetLessonUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository
  ) {}

  async execute(input: GetLessonInput): Promise<GetLessonOutput> {
    const courseId = CourseId.create(input.courseId);
    const lessonId = LessonId.create(input.lessonId);

    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const found = course.findLesson(lessonId);
    if (!found) {
      throw new Error('Lesson not found');
    }

    const { chapter, lesson } = found;

    const progress = await this.progressRepository.findByCourseId(courseId);
    const unlockSpec = new LessonUnlockSpecification();
    const isUnlocked = progress
      ? unlockSpec.isSatisfiedBy(lesson, course, progress)
      : lesson.order === 1;

    const adjacent = course.getAdjacentLessons(lessonId);

    return {
      lesson: {
        id: lesson.id.toString(),
        title: lesson.title.toString(),
        content: lesson.content.raw,
        order: lesson.order,
        hasQuiz: lesson.hasQuiz(),
      },
      chapter: {
        id: chapter.id.toString(),
        title: chapter.title,
      },
      course: {
        id: course.id.toString(),
        title: course.title,
      },
      navigation: {
        previous: adjacent.previous
          ? {
              chapterId: this.findChapterForLesson(course, adjacent.previous.id)!,
              lessonId: adjacent.previous.id.toString(),
            }
          : null,
        next: adjacent.next
          ? {
              chapterId: this.findChapterForLesson(course, adjacent.next.id)!,
              lessonId: adjacent.next.id.toString(),
            }
          : null,
      },
      isCompleted: progress?.hasCompletedLesson(lessonId) ?? false,
      isUnlocked,
    };
  }

  private findChapterForLesson(course: Course, lessonId: LessonId): string | null {
    for (const chapter of course.chapters) {
      if (chapter.lessons.some(l => l.id.equals(lessonId))) {
        return chapter.id.toString();
      }
    }
    return null;
  }
}
```

### Implementation: Presentation Components

```typescript
// src/presentation/features/lesson/LessonHeader.tsx
'use client';

import styles from './LessonHeader.module.css';

interface LessonHeaderProps {
  chapterTitle: string;
  lessonTitle: string;
  lessonOrder: number;
  isCompleted: boolean;
}

export function LessonHeader({
  chapterTitle,
  lessonTitle,
  lessonOrder,
  isCompleted,
}: LessonHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <span className={styles.chapter}>{chapterTitle}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.lessonNumber}>Lesson {lessonOrder}</span>
      </div>
      <h1 className={styles.title}>
        {lessonTitle}
        {isCompleted && <span className={styles.completedBadge}>✓ 完了</span>}
      </h1>
    </header>
  );
}
```

```typescript
// src/presentation/features/lesson/MarkdownRenderer.tsx
'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

```typescript
// src/presentation/features/lesson/LessonContent.tsx
'use client';

import { LessonHeader } from './LessonHeader';
import { MarkdownRenderer } from './MarkdownRenderer';
import { LessonNavigation } from './LessonNavigation';
import styles from './LessonContent.module.css';

interface LessonContentProps {
  lesson: {
    title: string;
    content: string;
    order: number;
  };
  chapter: {
    title: string;
  };
  navigation: {
    previous: { chapterId: string; lessonId: string } | null;
    next: { chapterId: string; lessonId: string } | null;
  };
  courseId: string;
  isCompleted: boolean;
}

export function LessonContent({
  lesson,
  chapter,
  navigation,
  courseId,
  isCompleted,
}: LessonContentProps) {
  return (
    <article className={styles.article}>
      <LessonHeader
        chapterTitle={chapter.title}
        lessonTitle={lesson.title}
        lessonOrder={lesson.order}
        isCompleted={isCompleted}
      />

      <div className={styles.body}>
        <MarkdownRenderer content={lesson.content} />
      </div>

      <LessonNavigation
        courseId={courseId}
        previous={navigation.previous}
        next={navigation.next}
      />
    </article>
  );
}
```

### Implementation: Hook

```typescript
// src/presentation/hooks/useLesson.ts
'use client';

import { useState, useEffect } from 'react';
import { GetLessonUseCase, GetLessonOutput } from '@/application/usecases/GetLessonUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';

interface UseLessonParams {
  courseId: string;
  chapterId: string;
  lessonId: string;
}

interface UseLessonResult {
  data: GetLessonOutput | null;
  isLoading: boolean;
  error: Error | null;
}

export function useLesson({ courseId, chapterId, lessonId }: UseLessonParams): UseLessonResult {
  const [data, setData] = useState<GetLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const courseRepo = new InMemoryCourseRepository(sampleCourses);
        const progressRepo = new LocalStorageProgressRepository();
        const useCase = new GetLessonUseCase(courseRepo, progressRepo);

        const result = await useCase.execute({ courseId, chapterId, lessonId });
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, chapterId, lessonId]);

  return { data, isLoading, error };
}
```

### App Router Page

```typescript
// app/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]/page.tsx
'use client';

import { useLesson } from '@/presentation/hooks/useLesson';
import { LessonContent } from '@/presentation/features/lesson/LessonContent';

interface PageProps {
  params: {
    courseId: string;
    chapterId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: PageProps) {
  const { data, isLoading, error } = useLesson(params);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error.message}</div>;
  }

  if (!data) {
    return <div>レッスンが見つかりません</div>;
  }

  if (!data.isUnlocked) {
    return <div>このレッスンはまだロックされています</div>;
  }

  return (
    <LessonContent
      lesson={data.lesson}
      chapter={data.chapter}
      navigation={data.navigation}
      courseId={data.course.id}
      isCompleted={data.isCompleted}
    />
  );
}
```

### Definition of Done

- [ ] GetLessonUseCase 実装・テスト
- [ ] LessonHeader コンポーネント
- [ ] MarkdownRenderer コンポーネント
- [ ] LessonContent コンポーネント
- [ ] useLesson フック
- [ ] App Router ページ（page.tsx）
- [ ] git commit & push
- [ ] Boss1 に完了報告

### Commands

```bash
# 依存パッケージインストール
npm install react-markdown react-syntax-highlighter
npm install -D @types/react-syntax-highlighter

# 開発サーバー起動
npm run dev

# テスト実行
npm run test src/application/
npm run test src/presentation/features/lesson/

# 型チェック
npm run typecheck

# コミット
git add src/application/ src/presentation/features/lesson/ src/presentation/hooks/ app/
git commit -m "feat(presentation): add lesson display components"
git push origin agent/001/frontend2
```

### Communication

Boss1 への報告は `agent-send.sh` を使用:

```bash
# 完了報告
./scripts/agent-send.sh boss1 "[DONE] Frontend2 レッスン表示完了。PR: agent/001/frontend2"

# 問題発生時
./scripts/agent-send.sh boss1 "[BLOCKED] Frontend2: 〇〇の問題が発生。支援が必要です。"
```

### Report Template

```
[DONE] Frontend2 レッスン表示完了

作成ファイル:
- src/application/usecases/GetLessonUseCase.ts
- src/presentation/features/lesson/LessonContent.tsx
- src/presentation/features/lesson/LessonHeader.tsx
- src/presentation/features/lesson/MarkdownRenderer.tsx
- src/presentation/hooks/useLesson.ts
- app/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]/page.tsx
- 各テストファイル

テスト結果: 全パス
PR: agent/001/frontend5
```
