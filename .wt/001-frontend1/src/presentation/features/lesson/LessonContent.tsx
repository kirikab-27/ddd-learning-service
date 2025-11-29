'use client';

import Link from 'next/link';
import { LessonHeader } from './LessonHeader';
import { MarkdownRenderer } from './MarkdownRenderer';
import { LessonNavigation } from './LessonNavigation';
import { LessonCompleteButton } from './LessonCompleteButton';

interface LessonContentProps {
  lesson: {
    id: string;
    title: string;
    content: string;
    order: number;
  };
  chapter: {
    id: string;
    title: string;
  };
  navigation: {
    previous: { chapterId: string; lessonId: string } | null;
    next: { chapterId: string; lessonId: string } | null;
  };
  courseId: string;
  isCompleted: boolean;
  onComplete?: () => void;
  hasQuiz?: boolean;
}

export function LessonContent({
  lesson,
  chapter,
  navigation,
  courseId,
  isCompleted,
  onComplete,
  hasQuiz = false,
}: LessonContentProps) {
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const quizUrl = `/courses/${courseId}/chapters/${chapter.id}/lessons/${lesson.id}/quiz`;

  return (
    <article className="max-w-3xl mx-auto p-8">
      <LessonHeader
        chapterTitle={chapter.title}
        lessonTitle={lesson.title}
        lessonOrder={lesson.order}
        isCompleted={isCompleted}
      />

      <div className="min-h-[400px]">
        <MarkdownRenderer content={lesson.content} />
      </div>

      <div className="flex justify-center items-center gap-4 my-8 py-6 border-t border-slate-700 flex-wrap">
        <LessonCompleteButton
          courseId={courseId}
          lessonId={lesson.id}
          isCompleted={isCompleted}
          onComplete={handleComplete}
        />
        {isCompleted && hasQuiz && (
          <Link
            href={quizUrl}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium no-underline transition-colors hover:bg-emerald-500"
          >
            理解度チェック
          </Link>
        )}
      </div>

      <LessonNavigation
        courseId={courseId}
        previous={navigation.previous}
        next={navigation.next}
      />
    </article>
  );
}
