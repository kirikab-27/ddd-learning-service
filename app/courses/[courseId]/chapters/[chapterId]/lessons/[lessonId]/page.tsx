'use client';

import { use } from 'react';
import { useLesson } from '@/presentation/hooks/useLesson';
import { LessonContent } from '@/presentation/features/lesson/LessonContent';

interface PageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
    lessonId: string;
  }>;
}

export default function LessonPage({ params }: PageProps) {
  const { courseId, chapterId, lessonId } = use(params);
  const { data, isLoading, error } = useLesson({ courseId, chapterId, lessonId });

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error.message}</div>;
  }

  if (!data) {
    return <div>レッスンが見つかりません</div>;
  }

  if (!data.isUnlocked) {
    return <div>このレッスンはまだロックされています</div>;
  }

  return (
    <LessonContent
      lesson={data.lesson}
      chapter={data.chapter}
      navigation={data.navigation}
      courseId={data.course.id}
      isCompleted={data.isCompleted}
    />
  );
}
