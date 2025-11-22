import { CourseId, LessonId } from '@/domain/shared';

export class Progress {
  private constructor(
    public readonly courseId: CourseId,
    private readonly completedLessonIds: Set<string>
  ) {}

  static create(courseId: CourseId): Progress {
    return new Progress(courseId, new Set());
  }

  static restore(courseId: CourseId, completedLessonIds: string[]): Progress {
    return new Progress(courseId, new Set(completedLessonIds));
  }

  hasCompletedLesson(lessonId: LessonId): boolean {
    return this.completedLessonIds.has(lessonId.toString());
  }

  completeLesson(lessonId: LessonId): Progress {
    const newCompleted = new Set(this.completedLessonIds);
    newCompleted.add(lessonId.toString());
    return new Progress(this.courseId, newCompleted);
  }

  calculateCompletionRate(totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((this.completedLessonIds.size / totalLessons) * 100);
  }

  getCompletedLessonIds(): string[] {
    return Array.from(this.completedLessonIds);
  }
}
