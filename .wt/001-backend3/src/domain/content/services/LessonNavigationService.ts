import { LessonId } from '@/domain/shared';
import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonUnlockSpecification, LessonCompletionChecker } from '../specifications/LessonUnlockSpecification';

export interface NavigationState {
  currentLesson: Lesson;
  currentChapter: Chapter;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  isFirstLesson: boolean;
  isLastLesson: boolean;
  courseProgress: {
    currentLessonIndex: number;
    totalLessons: number;
  };
}

/**
 * Domain service for handling lesson navigation within a course.
 */
export class LessonNavigationService {
  constructor(
    private readonly unlockSpecification: LessonUnlockSpecification = new LessonUnlockSpecification()
  ) {}

  /**
   * Gets the navigation state for a given lesson in a course.
   */
  getNavigationState(
    lessonId: LessonId,
    course: Course,
    progress: LessonCompletionChecker
  ): NavigationState | null {
    const location = course.findLesson(lessonId);
    if (!location) {
      return null;
    }

    const { chapter, lesson } = location;
    const allLessons = course.getAllLessons();
    const currentIndex = allLessons.findIndex(l => l.id.equals(lessonId));
    const adjacent = course.getAdjacentLessons(lessonId);

    const canNavigateNext = adjacent.next
      ? this.unlockSpecification.isSatisfiedBy(adjacent.next, course, progress)
      : false;

    return {
      currentLesson: lesson,
      currentChapter: chapter,
      previousLesson: adjacent.previous,
      nextLesson: adjacent.next,
      canNavigatePrevious: adjacent.previous !== null,
      canNavigateNext,
      isFirstLesson: currentIndex === 0,
      isLastLesson: currentIndex === allLessons.length - 1,
      courseProgress: {
        currentLessonIndex: currentIndex,
        totalLessons: allLessons.length,
      },
    };
  }

  /**
   * Gets the next accessible lesson from the current position.
   * Returns null if there's no next lesson or it's locked.
   */
  getNextAccessibleLesson(
    currentLessonId: LessonId,
    course: Course,
    progress: LessonCompletionChecker
  ): Lesson | null {
    const adjacent = course.getAdjacentLessons(currentLessonId);

    if (!adjacent.next) {
      return null;
    }

    if (this.unlockSpecification.isSatisfiedBy(adjacent.next, course, progress)) {
      return adjacent.next;
    }

    return null;
  }

  /**
   * Gets the starting lesson for a course.
   * This is either the first incomplete lesson or the first lesson.
   */
  getStartingLesson(course: Course, progress: LessonCompletionChecker): Lesson | null {
    const allLessons = course.getAllLessons();

    if (allLessons.length === 0) {
      return null;
    }

    // Find first incomplete lesson
    for (const lesson of allLessons) {
      if (!progress.hasCompletedLesson(lesson.id)) {
        return lesson;
      }
    }

    // All completed, return first lesson
    return allLessons[0];
  }

  /**
   * Checks if the user can access a specific lesson.
   */
  canAccessLesson(
    lessonId: LessonId,
    course: Course,
    progress: LessonCompletionChecker
  ): boolean {
    const location = course.findLesson(lessonId);
    if (!location) {
      return false;
    }

    return this.unlockSpecification.isSatisfiedBy(location.lesson, course, progress);
  }
}
