'use client';

import Link from 'next/link';

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
    <nav className="flex justify-between mt-12 pt-8 border-t border-slate-700">
      <div className="flex-1">
        {previous && (
          <Link
            href={`/courses/${courseId}/chapters/${previous.chapterId}/lessons/${previous.lessonId}`}
            className="inline-flex items-center px-6 py-3 text-blue-400 no-underline rounded-lg transition-colors hover:bg-slate-800"
          >
            <span className="font-medium">← 前のレッスン</span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`/courses/${courseId}/chapters/${next.chapterId}/lessons/${next.lessonId}`}
            className="inline-flex items-center px-6 py-3 text-blue-400 no-underline rounded-lg transition-colors hover:bg-slate-800"
          >
            <span className="font-medium">次のレッスン →</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
