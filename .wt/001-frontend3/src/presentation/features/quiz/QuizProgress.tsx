'use client';

import styles from './QuizProgress.module.css';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={styles.container} data-testid="quiz-progress">
      <div className={styles.header}>
        <span className={styles.text}>
          問題 <span className={styles.current}>{current}</span> / {total}
        </span>
        <span className={styles.percentage} aria-hidden="true">
          {percentage}%
        </span>
      </div>
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`${total}問中${current}問目`}
      >
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
