'use client';

import { useState } from 'react';
import styles from './LessonCompleteButton.module.css';

interface LessonCompleteButtonProps {
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  onComplete: () => void;
  disabled?: boolean;
}

export function LessonCompleteButton({
  courseId,
  lessonId,
  isCompleted,
  onComplete,
  disabled = false,
}: LessonCompleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isCompleted || disabled || isLoading) return;

    setIsLoading(true);
    try {
      await onComplete();
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <div
        className={`${styles.button} ${styles.completed}`}
        role="status"
        aria-label={`レッスン ${lessonId} は完了済みです`}
        data-testid="lesson-complete-status"
      >
        <span className={styles.checkIcon}>✓</span>
        <span>完了済み</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${styles.primary}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={`レッスン ${lessonId} を完了する`}
      data-testid="lesson-complete-button"
      data-course-id={courseId}
      data-lesson-id={lessonId}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span>処理中...</span>
        </>
      ) : (
        <span>レッスンを完了する</span>
      )}
    </button>
  );
}
