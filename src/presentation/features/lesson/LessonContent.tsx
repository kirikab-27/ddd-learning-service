'use client';

import { LessonHeader } from './LessonHeader';
import { MarkdownRenderer } from './MarkdownRenderer';
import { LessonNavigation } from './LessonNavigation';
import { LessonCompleteButton } from './LessonCompleteButton';
import styles from './LessonContent.module.css';

interface LessonContentProps {
  lesson: {
    id: string;
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
  onComplete?: () => void;
}

export function LessonContent({
  lesson,
  chapter,
  navigation,
  courseId,
  isCompleted,
  onComplete,
}: LessonContentProps) {
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

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

      <div className={styles.actions}>
        <LessonCompleteButton
          courseId={courseId}
          lessonId={lesson.id}
          isCompleted={isCompleted}
          onComplete={handleComplete}
        />
      </div>

      <LessonNavigation
        courseId={courseId}
        previous={navigation.previous}
        next={navigation.next}
      />
    </article>
  );
}
