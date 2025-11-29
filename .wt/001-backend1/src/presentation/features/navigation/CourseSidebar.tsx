'use client';

import { useParams } from 'next/navigation';
import { useCourseNavigation } from '@/presentation/hooks/useCourseNavigation';
import { ChapterNav } from './ChapterNav';

interface CourseSidebarProps {
  courseId: string;
}

export function CourseSidebar({ courseId }: CourseSidebarProps) {
  const params = useParams();
  const currentLessonId = params?.lessonId as string | undefined;

  const { data, isLoading, error } = useCourseNavigation({
    courseId,
    currentLessonId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-slate-400">
        読み込み中...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-red-400">
        ナビゲーションを読み込めませんでした
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-800 border-r border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <h2 className="m-0 mb-3 text-lg font-semibold text-slate-50">{data.courseTitle}</h2>
        <div className="h-2 bg-slate-700 rounded overflow-hidden mb-2">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${data.completionRate}%` }}
          />
        </div>
        <span className="text-xs text-slate-400">{data.completionRate}% 完了</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {data.chapters.map(chapter => (
          <ChapterNav
            key={chapter.id}
            courseId={courseId}
            chapter={chapter}
          />
        ))}
      </nav>
    </div>
  );
}
