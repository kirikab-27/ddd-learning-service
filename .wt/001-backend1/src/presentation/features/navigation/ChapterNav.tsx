'use client';

import { useState } from 'react';
import { LessonNav } from './LessonNav';

interface ChapterNavProps {
  courseId: string;
  chapter: {
    id: string;
    title: string;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
      isCompleted: boolean;
      isUnlocked: boolean;
      isCurrent: boolean;
    }>;
    isExpanded: boolean;
  };
}

export function ChapterNav({ courseId, chapter }: ChapterNavProps) {
  const [isExpanded, setIsExpanded] = useState(chapter.isExpanded);

  const completedCount = chapter.lessons.filter(l => l.isCompleted).length;
  const totalCount = chapter.lessons.length;

  return (
    <div className="border-b border-slate-700">
      <button
        className="flex items-center gap-2 w-full p-3 bg-transparent border-none cursor-pointer text-left transition-colors hover:bg-slate-800"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="text-xs text-slate-400">{isExpanded ? '▼' : '▶'}</span>
        <span className="flex-1 font-medium text-slate-50">
          {chapter.order}. {chapter.title}
        </span>
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
          {completedCount}/{totalCount}
        </span>
      </button>

      {isExpanded && (
        <div className="pb-2">
          {chapter.lessons.map(lesson => (
            <LessonNav
              key={lesson.id}
              courseId={courseId}
              chapterId={chapter.id}
              lesson={lesson}
            />
          ))}
        </div>
      )}
    </div>
  );
}
