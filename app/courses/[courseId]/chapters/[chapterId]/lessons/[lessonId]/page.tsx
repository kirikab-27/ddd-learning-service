'use client';

import { use, useState, useCallback, useEffect } from 'react';
import { useLesson } from '@/presentation/hooks/useLesson';
import { useProgress } from '@/presentation/hooks/useProgress';
import { LessonContent } from '@/presentation/features/lesson/LessonContent';
import { InMemoryQuizRepository } from '@/infrastructure/repositories';
import { LessonId } from '@/domain/shared';

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
  const { completeLesson, isCompleted: checkCompleted } = useProgress(courseId);
  const [localCompleted, setLocalCompleted] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);

  useEffect(() => {
    const checkQuiz = async () => {
      const quizRepository = new InMemoryQuizRepository();
      const quiz = await quizRepository.findByLessonId(LessonId.create(lessonId));
      setHasQuiz(quiz !== null);
    };
    checkQuiz();
  }, [lessonId]);

  const handleComplete = useCallback(async () => {
    try {
      await completeLesson(lessonId);
      setLocalCompleted(true);
    } catch (e) {
      console.error('Failed to complete lesson:', e);
    }
  }, [completeLesson, lessonId]);

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

  // Use local state or data from server
  const isCompleted = localCompleted || data.isCompleted || checkCompleted(lessonId);

  return (
    <LessonContent
      lesson={data.lesson}
      chapter={{ id: chapterId, title: data.chapter.title }}
      navigation={data.navigation}
      courseId={data.course.id}
      isCompleted={isCompleted}
      onComplete={handleComplete}
      hasQuiz={hasQuiz}
    />
  );
}
