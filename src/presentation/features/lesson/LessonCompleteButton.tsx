'use client';

import { useState } from 'react';

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
        className="inline-flex items-center justify-center gap-2 px-6 py-2 text-base font-medium rounded-lg min-w-[180px] bg-green-500 text-slate-900 cursor-default focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2 max-sm:w-full max-sm:min-w-0"
        role="status"
        aria-label={`レッスン ${lessonId} は完了済みです`}
        data-testid="lesson-complete-status"
      >
        <span className="font-bold">✓</span>
        <span>完了済み</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 px-6 py-2 text-base font-medium rounded-lg min-w-[180px] bg-blue-600 text-slate-50 border-none cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2 max-sm:w-full max-sm:min-w-0"
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
          <span className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" aria-hidden="true" />
          <span>処理中...</span>
        </>
      ) : (
        <span>レッスンを完了する</span>
      )}
    </button>
  );
}
