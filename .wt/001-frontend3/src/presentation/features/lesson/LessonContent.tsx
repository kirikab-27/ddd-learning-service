'use client';

import Link from 'next/link';
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
    id: string;
    title: string;
  };
  navigation: {
    previous: { chapterId: string; lessonId: string } | null;
    next: { chapterId: string; lessonId: string } | null;
  };
  courseId: string;
  isCompleted: boolean;
  onComplete?: () => void;
  hasQuiz?: boolean;
}

export function LessonContent({
  lesson,
  chapter,
  navigation,
  courseId,
  isCompleted,
  onComplete,
  hasQuiz = false,
}: LessonContentProps) {
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const quizUrl = `/courses/${courseId}/chapters/${chapter.id}/lessons/${lesson.id}/quiz`;

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
        {isCompleted && hasQuiz && (
          <Link href={quizUrl} className={styles.quizLink}>
            理解度チェック
          </Link>
        )}
      </div>

      <LessonNavigation
        courseId={courseId}
        previous={navigation.previous}
        next={navigation.next}
      />
    </article>
  );
}
