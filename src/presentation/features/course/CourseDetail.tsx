'use client';

import Link from 'next/link';
import { ChapterList } from './ChapterList';
import { GetCourseNavigationOutput } from '@/application/usecases/GetCourseNavigationUseCase';

interface CourseDetailProps {
  data: GetCourseNavigationOutput;
  description?: string;
}

export function CourseDetail({ data, description }: CourseDetailProps) {
  const { courseId, courseTitle, chapters, completionRate } = data;
  const progressPercentage = Math.round(completionRate * 100);
  const hasProgress = completionRate > 0;

  // Find the first incomplete lesson for CTA
  const getFirstIncompleteLessonUrl = (): string => {
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        if (!lesson.isCompleted && lesson.isUnlocked) {
          return `/courses/${courseId}/chapters/${chapter.id}/lessons/${lesson.id}`;
        }
      }
    }
    // If all complete, return first lesson
    if (chapters.length > 0 && chapters[0].lessons.length > 0) {
      const firstChapter = chapters[0];
      const firstLesson = firstChapter.lessons[0];
      return `/courses/${courseId}/chapters/${firstChapter.id}/lessons/${firstLesson.id}`;
    }
    return `/courses/${courseId}`;
  };

  const ctaUrl = getFirstIncompleteLessonUrl();
  const ctaText = hasProgress ? '続きから学習する' : '学習を始める';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-50 mb-4">{courseTitle}</h1>
      {description && (
        <p className="text-slate-400 mb-8">{description}</p>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>全体進捗</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Chapter List */}
      <ChapterList chapters={chapters} courseId={courseId} />

      {/* CTA Button */}
      <Link
        href={ctaUrl}
        className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  );
}
