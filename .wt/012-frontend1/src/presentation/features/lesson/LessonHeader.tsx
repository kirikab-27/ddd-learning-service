'use client';

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
    <header className="mb-8 pb-4 border-b border-slate-700">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        <span className="text-blue-400">{chapterTitle}</span>
        <span className="text-slate-500">/</span>
        <span className="text-slate-400">Lesson {lessonOrder}</span>
      </div>
      <h1 className="flex items-center gap-4 text-2xl font-semibold text-slate-50 m-0">
        {lessonTitle}
        {isCompleted && (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-400 bg-green-900/30 rounded-full">
            ✓ 完了
          </span>
        )}
      </h1>
    </header>
  );
}
