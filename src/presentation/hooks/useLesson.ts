'use client';

import { useState, useEffect } from 'react';
import { GetLessonUseCase, GetLessonOutput } from '@/application/usecases/GetLessonUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';

interface UseLessonParams {
  courseId: string;
  chapterId: string;
  lessonId: string;
}

interface UseLessonResult {
  data: GetLessonOutput | null;
  isLoading: boolean;
  error: Error | null;
}

export function useLesson({ courseId, chapterId, lessonId }: UseLessonParams): UseLessonResult {
  const [data, setData] = useState<GetLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const courseRepo = new InMemoryCourseRepository(sampleCourses);
        const progressRepo = new LocalStorageProgressRepository();
        const useCase = new GetLessonUseCase(courseRepo, progressRepo);

        const result = await useCase.execute({ courseId, chapterId, lessonId });
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, chapterId, lessonId]);

  return { data, isLoading, error };
}
