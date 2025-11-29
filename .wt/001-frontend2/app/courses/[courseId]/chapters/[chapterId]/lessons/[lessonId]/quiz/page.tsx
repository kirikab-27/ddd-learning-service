'use client';

import { use } from 'react';
import { QuizContainer } from '@/presentation/features/quiz';

interface QuizPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
    lessonId: string;
  }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { courseId, chapterId, lessonId } = use(params);

  return (
    <main>
      <QuizContainer
        lessonId={lessonId}
        courseId={courseId}
        chapterId={chapterId}
      />
    </main>
  );
}
