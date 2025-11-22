import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { CourseId } from '@/domain/shared';
import { Progress } from '@/domain/progress/models/Progress';

const STORAGE_KEY_PREFIX = 'ddd-learning-progress-';

export class LocalStorageProgressRepository implements IProgressRepository {
  async findByCourseId(courseId: CourseId): Promise<Progress | null> {
    if (typeof window === 'undefined') {
      return null;
    }

    const key = `${STORAGE_KEY_PREFIX}${courseId.toString()}`;
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    try {
      const parsed = JSON.parse(data) as { completedLessonIds: string[] };
      return Progress.restore(courseId, parsed.completedLessonIds);
    } catch {
      return null;
    }
  }

  async save(progress: Progress): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    const key = `${STORAGE_KEY_PREFIX}${progress.courseId.toString()}`;
    const data = {
      completedLessonIds: progress.getCompletedLessonIds(),
    };
    localStorage.setItem(key, JSON.stringify(data));
  }
}
