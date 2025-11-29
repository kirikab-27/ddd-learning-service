import { ChapterId, LessonId } from '@/domain/shared';
import { ChapterCompletionSpecification, LessonCompletionChecker } from './ChapterCompletionSpecification';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonTitle } from '../models/LessonTitle';
import { MarkdownContent } from '../models/MarkdownContent';

describe('ChapterCompletionSpecification', () => {
  const createLesson = (id: string, order: number): Lesson => {
    return Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`Lesson ${id}`),
      content: MarkdownContent.create(`Content for ${id}`),
      order,
    });
  };

  const createChapter = (lessonIds: string[]): Chapter => {
    const lessons = lessonIds.map((id, index) => createLesson(id, index + 1));
    return Chapter.create({
      id: ChapterId.create('chapter-1'),
      title: 'Test Chapter',
      order: 1,
      lessons,
    });
  };

  const createMockProgress = (completedLessonIds: string[]): LessonCompletionChecker => {
    return {
      hasCompletedLesson: (lessonId: LessonId) =>
        completedLessonIds.includes(lessonId.toString()),
    };
  };

  let specification: ChapterCompletionSpecification;

  beforeEach(() => {
    specification = new ChapterCompletionSpecification();
  });

  describe('isSatisfiedBy', () => {
    it('should return true for empty chapter', () => {
      const chapter = createChapter([]);
      const progress = createMockProgress([]);

      expect(specification.isSatisfiedBy(chapter, progress)).toBe(true);
    });

    it('should return false when no lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress([]);

      expect(specification.isSatisfiedBy(chapter, progress)).toBe(false);
    });

    it('should return false when some lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2', 'lesson-3']);
      const progress = createMockProgress(['lesson-1', 'lesson-2']);

      expect(specification.isSatisfiedBy(chapter, progress)).toBe(false);
    });

    it('should return true when all lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress(['lesson-1', 'lesson-2']);

      expect(specification.isSatisfiedBy(chapter, progress)).toBe(true);
    });

    it('should return true for single lesson chapter when completed', () => {
      const chapter = createChapter(['lesson-1']);
      const progress = createMockProgress(['lesson-1']);

      expect(specification.isSatisfiedBy(chapter, progress)).toBe(true);
    });
  });

  describe('getCompletionPercentage', () => {
    it('should return 100 for empty chapter', () => {
      const chapter = createChapter([]);
      const progress = createMockProgress([]);

      expect(specification.getCompletionPercentage(chapter, progress)).toBe(100);
    });

    it('should return 0 when no lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress([]);

      expect(specification.getCompletionPercentage(chapter, progress)).toBe(0);
    });

    it('should return 50 when half lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress(['lesson-1']);

      expect(specification.getCompletionPercentage(chapter, progress)).toBe(50);
    });

    it('should return 100 when all lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress(['lesson-1', 'lesson-2']);

      expect(specification.getCompletionPercentage(chapter, progress)).toBe(100);
    });

    it('should round to nearest integer', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2', 'lesson-3']);
      const progress = createMockProgress(['lesson-1']);

      expect(specification.getCompletionPercentage(chapter, progress)).toBe(33);
    });
  });

  describe('getCompletedLessonCount', () => {
    it('should return 0 for empty chapter', () => {
      const chapter = createChapter([]);
      const progress = createMockProgress([]);

      expect(specification.getCompletedLessonCount(chapter, progress)).toBe(0);
    });

    it('should return 0 when no lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress([]);

      expect(specification.getCompletedLessonCount(chapter, progress)).toBe(0);
    });

    it('should return correct count of completed lessons', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2', 'lesson-3']);
      const progress = createMockProgress(['lesson-1', 'lesson-3']);

      expect(specification.getCompletedLessonCount(chapter, progress)).toBe(2);
    });

    it('should return total when all lessons completed', () => {
      const chapter = createChapter(['lesson-1', 'lesson-2']);
      const progress = createMockProgress(['lesson-1', 'lesson-2']);

      expect(specification.getCompletedLessonCount(chapter, progress)).toBe(2);
    });
  });
});
