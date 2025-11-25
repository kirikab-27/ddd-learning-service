import { LessonId } from '@/domain/shared';
import { Lesson } from '../models/Lesson';
import { Course } from '../models/Course';

/**
 * Interface for progress checking - allows decoupling from Progress BC
 */
export interface LessonCompletionChecker {
  hasCompletedLesson(lessonId: LessonId): boolean;
}

/**
 * Specification that determines if a lesson is unlocked for a user.
 *
 * Business Rules:
 * - TEMPORARY: All lessons are unlocked for content review
 * - Original: The first lesson in a course is always unlocked
 * - Original: Subsequent lessons require the previous lesson to be completed
 */
export class LessonUnlockSpecification {
  isSatisfiedBy(
    lesson: Lesson,
    course: Course,
    progress: LessonCompletionChecker
  ): boolean {
    // TEMPORARY HOTFIX: Unlock all lessons for content review
    return true;

    // Original logic (commented out temporarily):
    // const allLessons = course.getAllLessons();
    // const lessonIndex = allLessons.findIndex(l => l.id.equals(lesson.id));

    // // Lesson not found in course
    // if (lessonIndex === -1) {
    //   return false;
    // }

    // // First lesson is always unlocked
    // if (lessonIndex === 0) {
    //   return true;
    // }

    // // Check if previous lesson is completed
    // const previousLesson = allLessons[lessonIndex - 1];
    // return progress.hasCompletedLesson(previousLesson.id);
  }
}
