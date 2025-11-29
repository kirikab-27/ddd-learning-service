'use client';

import Link from 'next/link';
import styles from './LessonNavigation.module.css';

interface LessonNavigationProps {
  courseId: string;
  previous: { chapterId: string; lessonId: string } | null;
  next: { chapterId: string; lessonId: string } | null;
}

export function LessonNavigation({
  courseId,
  previous,
  next,
}: LessonNavigationProps) {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navItem}>
        {previous && (
          <Link
            href={`/courses/${courseId}/chapters/${previous.chapterId}/lessons/${previous.lessonId}`}
            className={styles.navLink}
          >
            <span className={styles.navLabel}>← 前のレッスン</span>
          </Link>
        )}
      </div>
      <div className={styles.navItem}>
        {next && (
          <Link
            href={`/courses/${courseId}/chapters/${next.chapterId}/lessons/${next.lessonId}`}
            className={styles.navLink}
          >
            <span className={styles.navLabel}>次のレッスン →</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
