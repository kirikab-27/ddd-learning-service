'use client';

import Link from 'next/link';

interface LessonListItemProps {
  lessonId: string;
  title: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  courseId: string;
  chapterId: string;
}

export function LessonListItem({
  lessonId,
  title,
  isCompleted,
  isUnlocked,
  courseId,
  chapterId,
}: LessonListItemProps) {
  const href = `/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`;

  if (!isUnlocked) {
    return (
      <li className="flex items-center px-4 py-3 text-slate-500 cursor-not-allowed">
        <span className="mr-3 text-slate-600">🔒</span>
        <span>{title}</span>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className="flex items-center px-4 py-3 hover:bg-slate-700/50 transition-colors"
      >
        <span className={`mr-3 ${isCompleted ? 'text-green-400' : 'text-slate-500'}`}>
          {isCompleted ? '✓' : '○'}
        </span>
        <span className={isCompleted ? 'text-slate-400' : 'text-slate-50'}>
          {title}
        </span>
      </Link>
    </li>
  );
}
