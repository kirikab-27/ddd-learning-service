import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { Progress } from '@/domain/progress/models/Progress';
import { CourseId, LessonId } from '@/domain/shared';
import { LessonProgress } from '@/domain/progress/models/LessonProgress';

const STORAGE_KEY_PREFIX = 'ddd-learning-progress-';

interface StoredProgress {
  courseId: string;
  completedLessons: Array<{
    lessonId: string;
    completedAt: string;
  }>;
}

export class LocalStorageProgressRepository implements IProgressRepository {
  async findByCourseId(courseId: CourseId): Promise<Progress | null> {
    if (typeof window === 'undefined') {
      return null;
    }

    const key = STORAGE_KEY_PREFIX + courseId.toString();
    const stored = localStorage.getItem(key);

    if (!stored) {
      return null;
    }

    try {
      const data: StoredProgress = JSON.parse(stored);
      const completedLessons = data.completedLessons.map(lp =>
        LessonProgress.create(
          LessonId.create(lp.lessonId),
          new Date(lp.completedAt)
        )
      );
      return Progress.restore(courseId, completedLessons);
    } catch {
      return null;
    }
  }

  async save(progress: Progress): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    const key = STORAGE_KEY_PREFIX + progress.courseId.toString();
    const data: StoredProgress = {
      courseId: progress.courseId.toString(),
      completedLessons: progress.completedLessons.map(lp => ({
        lessonId: lp.lessonId.toString(),
        completedAt: lp.completedAt.toISOString(),
      })),
    };

    localStorage.setItem(key, JSON.stringify(data));
  }
}
