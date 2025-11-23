'use client';

import Link from 'next/link';

interface LessonNavigationProps {
  courseId: string;
  previous: { chapterId: string; lessonId: string } | null;
  next: { chapterId: string; lessonId: string } | null;
}

export function LessonNavigation({ courseId, previous, next }: LessonNavigationProps) {
  return (
    <nav className="flex justify-between items-center p-4 mt-8 border-t border-slate-700">
      {previous ? (
        <Link
          href={`/courses/${courseId}/chapters/${previous.chapterId}/lessons/${previous.lessonId}`}
          className="inline-flex items-center px-4 py-2 text-blue-400 no-underline rounded transition-colors hover:bg-slate-800"
        >
          ← 前のレッスン
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/courses/${courseId}/chapters/${next.chapterId}/lessons/${next.lessonId}`}
          className="inline-flex items-center px-4 py-2 text-blue-400 no-underline rounded transition-colors hover:bg-slate-800"
        >
          次のレッスン →
        </Link>
      ) : (
        <span className="text-lg text-green-400">🎉 コース完了！</span>
      )}
    </nav>
  );
}
