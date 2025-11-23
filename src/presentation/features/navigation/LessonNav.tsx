'use client';

import Link from 'next/link';

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
  const baseClasses = 'flex items-center gap-2 py-2 px-3 pl-6 no-underline rounded transition-colors';

  const getClassName = () => {
    const classes = [baseClasses];

    if (lesson.isCurrent) {
      classes.push('bg-blue-900/50 font-semibold text-slate-50');
    } else if (lesson.isCompleted) {
      classes.push('text-slate-400 hover:bg-slate-800');
    } else if (!lesson.isUnlocked) {
      classes.push('text-slate-600 cursor-not-allowed');
    } else {
      classes.push('text-slate-300 hover:bg-slate-800');
    }

    return classes.join(' ');
  };

  const href = `/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`;

  if (!lesson.isUnlocked) {
    return (
      <div className={getClassName()}>
        <span className="text-sm">🔒</span>
        <span className="flex-1 text-sm">{lesson.title}</span>
      </div>
    );
  }

  return (
    <Link href={href} className={getClassName()}>
      {lesson.isCompleted && <span className="text-green-400 font-bold">✓</span>}
      <span className="text-slate-500 text-sm">{lesson.order}.</span>
      <span className="flex-1 text-sm">{lesson.title}</span>
    </Link>
  );
}
