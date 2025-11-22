import { CourseId, LessonId } from '@/domain/shared';
import { LessonProgress } from './LessonProgress';

export class Progress {
  private constructor(
    private readonly _courseId: CourseId,
    private readonly _completedLessons: Map<string, LessonProgress>
  ) {}

  static create(courseId: CourseId): Progress {
    return new Progress(courseId, new Map());
  }

  static restore(
    courseId: CourseId,
    completedLessons: LessonProgress[]
  ): Progress {
    const map = new Map<string, LessonProgress>();
    completedLessons.forEach(lp => {
      map.set(lp.lessonId.toString(), lp);
    });
    return new Progress(courseId, map);
  }

  get courseId(): CourseId { return this._courseId; }

  get completedLessons(): readonly LessonProgress[] {
    return Array.from(this._completedLessons.values());
  }

  get completedCount(): number {
    return this._completedLessons.size;
  }

  hasCompletedLesson(lessonId: LessonId): boolean {
    return this._completedLessons.has(lessonId.toString());
  }

  markLessonAsCompleted(lessonId: LessonId): Progress {
    if (this.hasCompletedLesson(lessonId)) {
      return this;
    }
    const newMap = new Map(this._completedLessons);
    newMap.set(lessonId.toString(), LessonProgress.create(lessonId));
    return new Progress(this._courseId, newMap);
  }

  calculateCompletionRate(totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((this.completedCount / totalLessons) * 100);
  }
}
