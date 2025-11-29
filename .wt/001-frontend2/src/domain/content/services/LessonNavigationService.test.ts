import { CourseId, ChapterId, LessonId } from '@/domain/shared';
import { LessonNavigationService } from './LessonNavigationService';
import { LessonCompletionChecker } from '../specifications/LessonUnlockSpecification';
import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonTitle } from '../models/LessonTitle';
import { MarkdownContent } from '../models/MarkdownContent';

describe('LessonNavigationService', () => {
  const createLesson = (id: string, order: number): Lesson => {
    return Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`Lesson ${id}`),
      content: MarkdownContent.create(`Content for ${id}`),
      order,
    });
  };

  const createChapter = (id: string, order: number, lessonIds: string[]): Chapter => {
    const lessons = lessonIds.map((lessonId, index) =>
      createLesson(lessonId, index + 1)
    );
    return Chapter.create({
      id: ChapterId.create(id),
      title: `Chapter ${id}`,
      order,
      lessons,
    });
  };

  const createCourse = (): Course => {
    return Course.create({
      id: CourseId.create('course-1'),
      title: 'Test Course',
      description: 'Test Description',
      chapters: [
        createChapter('ch-1', 1, ['lesson-1', 'lesson-2']),
        createChapter('ch-2', 2, ['lesson-3', 'lesson-4']),
      ],
    });
  };

  const createMockProgress = (completedLessonIds: string[]): LessonCompletionChecker => {
    return {
      hasCompletedLesson: (lessonId: LessonId) =>
        completedLessonIds.includes(lessonId.toString()),
    };
  };

  let service: LessonNavigationService;
  let course: Course;

  beforeEach(() => {
    service = new LessonNavigationService();
    course = createCourse();
  });

  describe('getNavigationState', () => {
    it('should return null for non-existent lesson', () => {
      const progress = createMockProgress([]);
      const state = service.getNavigationState(
        LessonId.create('non-existent'),
        course,
        progress
      );

      expect(state).toBeNull();
    });

    it('should return correct state for first lesson', () => {
      const progress = createMockProgress([]);
      const state = service.getNavigationState(
        LessonId.create('lesson-1'),
        course,
        progress
      );

      expect(state).not.toBeNull();
      expect(state!.currentLesson.id.toString()).toBe('lesson-1');
      expect(state!.currentChapter.id.toString()).toBe('ch-1');
      expect(state!.previousLesson).toBeNull();
      expect(state!.nextLesson?.id.toString()).toBe('lesson-2');
      expect(state!.canNavigatePrevious).toBe(false);
      expect(state!.canNavigateNext).toBe(false); // lesson-1 not completed
      expect(state!.isFirstLesson).toBe(true);
      expect(state!.isLastLesson).toBe(false);
      expect(state!.courseProgress.currentLessonIndex).toBe(0);
      expect(state!.courseProgress.totalLessons).toBe(4);
    });

    it('should allow navigation to next when previous is completed', () => {
      const progress = createMockProgress(['lesson-1']);
      const state = service.getNavigationState(
        LessonId.create('lesson-1'),
        course,
        progress
      );

      expect(state!.canNavigateNext).toBe(true);
    });

    it('should return correct state for middle lesson', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2']);
      const state = service.getNavigationState(
        LessonId.create('lesson-2'),
        course,
        progress
      );

      expect(state!.previousLesson?.id.toString()).toBe('lesson-1');
      expect(state!.nextLesson?.id.toString()).toBe('lesson-3');
      expect(state!.canNavigatePrevious).toBe(true);
      expect(state!.canNavigateNext).toBe(true);
      expect(state!.isFirstLesson).toBe(false);
      expect(state!.isLastLesson).toBe(false);
    });

    it('should return correct state for last lesson', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2', 'lesson-3']);
      const state = service.getNavigationState(
        LessonId.create('lesson-4'),
        course,
        progress
      );

      expect(state!.nextLesson).toBeNull();
      expect(state!.canNavigateNext).toBe(false);
      expect(state!.isLastLesson).toBe(true);
    });
  });

  describe('getNextAccessibleLesson', () => {
    it('should return null when no next lesson exists', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4']);
      const next = service.getNextAccessibleLesson(
        LessonId.create('lesson-4'),
        course,
        progress
      );

      expect(next).toBeNull();
    });

    it('should return null when next lesson is locked', () => {
      const progress = createMockProgress([]);
      const next = service.getNextAccessibleLesson(
        LessonId.create('lesson-1'),
        course,
        progress
      );

      expect(next).toBeNull();
    });

    it('should return next lesson when unlocked', () => {
      const progress = createMockProgress(['lesson-1']);
      const next = service.getNextAccessibleLesson(
        LessonId.create('lesson-1'),
        course,
        progress
      );

      expect(next).not.toBeNull();
      expect(next!.id.toString()).toBe('lesson-2');
    });
  });

  describe('getStartingLesson', () => {
    it('should return first lesson for new user', () => {
      const progress = createMockProgress([]);
      const starting = service.getStartingLesson(course, progress);

      expect(starting).not.toBeNull();
      expect(starting!.id.toString()).toBe('lesson-1');
    });

    it('should return first incomplete lesson', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2']);
      const starting = service.getStartingLesson(course, progress);

      expect(starting).not.toBeNull();
      expect(starting!.id.toString()).toBe('lesson-3');
    });

    it('should return first lesson when all completed', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4']);
      const starting = service.getStartingLesson(course, progress);

      expect(starting).not.toBeNull();
      expect(starting!.id.toString()).toBe('lesson-1');
    });

    it('should return null for empty course', () => {
      const emptyCourse = Course.create({
        id: CourseId.create('empty'),
        title: 'Empty Course',
        description: '',
        chapters: [],
      });
      const progress = createMockProgress([]);
      const starting = service.getStartingLesson(emptyCourse, progress);

      expect(starting).toBeNull();
    });
  });

  describe('canAccessLesson', () => {
    it('should return false for non-existent lesson', () => {
      const progress = createMockProgress([]);
      const canAccess = service.canAccessLesson(
        LessonId.create('non-existent'),
        course,
        progress
      );

      expect(canAccess).toBe(false);
    });

    it('should return true for first lesson', () => {
      const progress = createMockProgress([]);
      const canAccess = service.canAccessLesson(
        LessonId.create('lesson-1'),
        course,
        progress
      );

      expect(canAccess).toBe(true);
    });

    it('should return false for locked lesson', () => {
      const progress = createMockProgress([]);
      const canAccess = service.canAccessLesson(
        LessonId.create('lesson-2'),
        course,
        progress
      );

      expect(canAccess).toBe(false);
    });

    it('should return true for unlocked lesson', () => {
      const progress = createMockProgress(['lesson-1']);
      const canAccess = service.canAccessLesson(
        LessonId.create('lesson-2'),
        course,
        progress
      );

      expect(canAccess).toBe(true);
    });
  });
});
