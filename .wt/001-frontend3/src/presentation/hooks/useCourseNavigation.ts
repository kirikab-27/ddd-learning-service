'use client';

import { useState, useEffect } from 'react';
import {
  GetCourseNavigationUseCase,
  GetCourseNavigationOutput,
} from '@/application/usecases/GetCourseNavigationUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';

interface UseCourseNavigationParams {
  courseId: string;
  currentLessonId?: string;
}

interface UseCourseNavigationResult {
  data: GetCourseNavigationOutput | null;
  isLoading: boolean;
  error: Error | null;
}

export function useCourseNavigation({
  courseId,
  currentLessonId,
}: UseCourseNavigationParams): UseCourseNavigationResult {
  const [data, setData] = useState<GetCourseNavigationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const courseRepo = new InMemoryCourseRepository(sampleCourses);
        const progressRepo = new LocalStorageProgressRepository();
        const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

        const result = await useCase.execute({ courseId, currentLessonId });
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavigation();
  }, [courseId, currentLessonId]);

  return { data, isLoading, error };
}
