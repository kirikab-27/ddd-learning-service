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
