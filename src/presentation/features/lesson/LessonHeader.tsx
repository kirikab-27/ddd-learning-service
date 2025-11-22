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
