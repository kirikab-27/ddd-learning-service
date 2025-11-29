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
