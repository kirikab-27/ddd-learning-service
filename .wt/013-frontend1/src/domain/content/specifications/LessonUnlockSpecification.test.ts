import { CourseId, ChapterId, LessonId } from '@/domain/shared';
import { LessonUnlockSpecification, LessonCompletionChecker } from './LessonUnlockSpecification';
import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonTitle } from '../models/LessonTitle';
import { MarkdownContent } from '../models/MarkdownContent';

describe('LessonUnlockSpecification', () => {
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

  let specification: LessonUnlockSpecification;
  let course: Course;

  beforeEach(() => {
    specification = new LessonUnlockSpecification();
    course = createCourse();
  });

  describe('isSatisfiedBy', () => {
    it('should unlock first lesson without any progress', () => {
      const progress = createMockProgress([]);
      const firstLesson = course.getAllLessons()[0];

      expect(specification.isSatisfiedBy(firstLesson, course, progress)).toBe(true);
    });

    // TEMPORARY: Skipped due to HOTFIX unlock all lessons
    it.skip('should not unlock second lesson without completing first', () => {
      const progress = createMockProgress([]);
      const secondLesson = course.getAllLessons()[1];

      expect(specification.isSatisfiedBy(secondLesson, course, progress)).toBe(false);
    });

    it('should unlock second lesson after completing first', () => {
      const progress = createMockProgress(['lesson-1']);
      const secondLesson = course.getAllLessons()[1];

      expect(specification.isSatisfiedBy(secondLesson, course, progress)).toBe(true);
    });

    it('should unlock lesson across chapters', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2']);
      // lesson-3 is first lesson of chapter 2
      const thirdLesson = course.getAllLessons()[2];

      expect(specification.isSatisfiedBy(thirdLesson, course, progress)).toBe(true);
    });

    // TEMPORARY: Skipped due to HOTFIX unlock all lessons
    it.skip('should not unlock lesson when previous is not completed', () => {
      const progress = createMockProgress(['lesson-1']); // lesson-2 not completed
      const thirdLesson = course.getAllLessons()[2];

      expect(specification.isSatisfiedBy(thirdLesson, course, progress)).toBe(false);
    });

    // TEMPORARY: Skipped due to HOTFIX unlock all lessons
    it.skip('should return false for lesson not in course', () => {
      const progress = createMockProgress([]);
      const outsideLesson = createLesson('outside-lesson', 1);

      expect(specification.isSatisfiedBy(outsideLesson, course, progress)).toBe(false);
    });

    it('should allow unlocking last lesson with all previous completed', () => {
      const progress = createMockProgress(['lesson-1', 'lesson-2', 'lesson-3']);
      const lastLesson = course.getAllLessons()[3];

      expect(specification.isSatisfiedBy(lastLesson, course, progress)).toBe(true);
    });
  });
});
