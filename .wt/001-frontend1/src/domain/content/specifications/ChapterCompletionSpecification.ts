import { LessonId } from '@/domain/shared';
import { Chapter } from '../models/Chapter';

/**
 * Interface for progress checking - allows decoupling from Progress BC
 */
export interface LessonCompletionChecker {
  hasCompletedLesson(lessonId: LessonId): boolean;
}

/**
 * Specification that determines if a chapter is completed.
 *
 * Business Rules:
 * - A chapter is complete when all its lessons are completed
 * - An empty chapter is considered complete
 */
export class ChapterCompletionSpecification {
  isSatisfiedBy(chapter: Chapter, progress: LessonCompletionChecker): boolean {
    const lessons = chapter.lessons;

    // Empty chapter is considered complete
    if (lessons.length === 0) {
      return true;
    }

    // All lessons must be completed
    return lessons.every(lesson => progress.hasCompletedLesson(lesson.id));
  }

  /**
   * Returns the completion percentage of a chapter (0-100)
   */
  getCompletionPercentage(chapter: Chapter, progress: LessonCompletionChecker): number {
    const lessons = chapter.lessons;

    if (lessons.length === 0) {
      return 100;
    }

    const completedCount = lessons.filter(lesson =>
      progress.hasCompletedLesson(lesson.id)
    ).length;

    return Math.round((completedCount / lessons.length) * 100);
  }

  /**
   * Returns the number of completed lessons in a chapter
   */
  getCompletedLessonCount(chapter: Chapter, progress: LessonCompletionChecker): number {
    return chapter.lessons.filter(lesson =>
      progress.hasCompletedLesson(lesson.id)
    ).length;
  }
}
