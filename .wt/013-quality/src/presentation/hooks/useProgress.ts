'use client';

import { useState, useEffect, useCallback } from 'react';
import { Progress } from '@/domain/progress/models/Progress';
import { CompleteLessonUseCase } from '@/application/usecases/CompleteLessonUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';
import { CourseId } from '@/domain/shared';

export interface UseProgressResult {
  progress: Progress | null;
  isCompleted: (lessonId: string) => boolean;
  completeLesson: (lessonId: string) => Promise<void>;
  completionRate: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useProgress(courseId: string): UseProgressResult {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [completionRate, setCompletionRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const courseRepo = new InMemoryCourseRepository(sampleCourses);
  const progressRepo = new LocalStorageProgressRepository();

  const fetchProgress = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const courseIdObj = CourseId.create(courseId);
      const course = await courseRepo.findById(courseIdObj);
      const currentProgress = await progressRepo.findByCourseId(courseIdObj);

      setProgress(currentProgress);

      if (currentProgress && course) {
        setCompletionRate(currentProgress.calculateCompletionRate(course.totalLessons));
      } else {
        setCompletionRate(0);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const isCompleted = useCallback(
    (lessonId: string): boolean => {
      if (!progress) return false;
      return progress.hasCompletedLesson({ toString: () => lessonId } as any);
    },
    [progress]
  );

  const completeLesson = useCallback(
    async (lessonId: string): Promise<void> => {
      setError(null);

      try {
        const useCase = new CompleteLessonUseCase(courseRepo, progressRepo);
        const result = await useCase.execute({ courseId, lessonId });

        setCompletionRate(result.progress.completionRate);

        // Refresh progress to get updated state
        await fetchProgress();
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to complete lesson'));
        throw e;
      }
    },
    [courseId, fetchProgress]
  );

  return {
    progress,
    isCompleted,
    completeLesson,
    completionRate,
    loading,
    error,
    refresh: fetchProgress,
  };
}
