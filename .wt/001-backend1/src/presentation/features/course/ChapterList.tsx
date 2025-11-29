'use client';

import { useState } from 'react';
import { LessonListItem } from './LessonListItem';
import { NavigationChapter } from '@/application/usecases/GetCourseNavigationUseCase';

interface ChapterListProps {
  chapters: NavigationChapter[];
  courseId: string;
}

export function ChapterList({ chapters, courseId }: ChapterListProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    // Initially expand chapters that contain the current lesson or are first incomplete
    const expanded = new Set<string>();
    chapters.forEach(chapter => {
      if (chapter.isExpanded) {
        expanded.add(chapter.id);
      }
    });
    // If nothing is expanded, expand the first chapter
    if (expanded.size === 0 && chapters.length > 0) {
      expanded.add(chapters[0].id);
    }
    return expanded;
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {chapters.map(chapter => {
        const completedCount = chapter.lessons.filter(l => l.isCompleted).length;
        const totalCount = chapter.lessons.length;
        const isChapterComplete = completedCount === totalCount;
        const isExpanded = expandedChapters.has(chapter.id);

        return (
          <div
            key={chapter.id}
            className="border border-slate-700 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              className="w-full bg-slate-800 px-4 py-3 flex justify-between items-center hover:bg-slate-700/50 transition-colors"
              onClick={() => toggleChapter(chapter.id)}
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">
                  {isExpanded ? '▼' : '▶'}
                </span>
                <h2 className="font-semibold text-slate-50">{chapter.title}</h2>
              </div>
              <span className="text-sm text-slate-400">
                {completedCount}/{totalCount}
                {isChapterComplete && (
                  <span className="ml-2 text-green-400">✓</span>
                )}
              </span>
            </button>
            {isExpanded && (
              <ul className="divide-y divide-slate-700/50 bg-slate-800/50">
                {chapter.lessons.map(lesson => (
                  <LessonListItem
                    key={lesson.id}
                    lessonId={lesson.id}
                    title={lesson.title}
                    isCompleted={lesson.isCompleted}
                    isUnlocked={lesson.isUnlocked}
                    courseId={courseId}
                    chapterId={chapter.id}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
