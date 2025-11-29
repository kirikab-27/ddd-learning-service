import { ChapterId, LessonId, QuizId } from '@/domain/shared';
import { Chapter } from './Chapter';
import { Lesson } from './Lesson';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';

describe('Chapter', () => {
  const createLesson = (id: string, order: number): Lesson => {
    return Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`Lesson ${id}`),
      content: MarkdownContent.create(`Content for ${id}`),
      order,
    });
  };

  const createValidChapter = (overrides: Partial<{
    id: ChapterId;
    title: string;
    order: number;
    lessons: Lesson[];
  }> = {}) => {
    return Chapter.create({
      id: overrides.id ?? ChapterId.create('chapter-1'),
      title: overrides.title ?? 'Getting Started',
      order: overrides.order ?? 1,
      lessons: overrides.lessons ?? [createLesson('lesson-1', 1)],
    });
  };

  describe('create', () => {
    it('should create a valid Chapter', () => {
      const chapter = createValidChapter();

      expect(chapter.id.toString()).toBe('chapter-1');
      expect(chapter.title).toBe('Getting Started');
      expect(chapter.order).toBe(1);
      expect(chapter.lessonCount).toBe(1);
    });

    it('should trim chapter title', () => {
      const chapter = createValidChapter({ title: '  Trimmed Title  ' });
      expect(chapter.title).toBe('Trimmed Title');
    });

    it('should throw error for empty title', () => {
      expect(() => createValidChapter({ title: '' })).toThrow('Chapter title cannot be empty');
      expect(() => createValidChapter({ title: '   ' })).toThrow('Chapter title cannot be empty');
    });

    it('should throw error for order less than 1', () => {
      expect(() => createValidChapter({ order: 0 })).toThrow('Chapter order must be positive');
      expect(() => createValidChapter({ order: -1 })).toThrow('Chapter order must be positive');
    });

    it('should sort lessons by order', () => {
      const lessons = [
        createLesson('lesson-3', 3),
        createLesson('lesson-1', 1),
        createLesson('lesson-2', 2),
      ];
      const chapter = createValidChapter({ lessons });

      expect(chapter.lessons[0].order).toBe(1);
      expect(chapter.lessons[1].order).toBe(2);
      expect(chapter.lessons[2].order).toBe(3);
    });

    it('should handle empty lessons array', () => {
      const chapter = createValidChapter({ lessons: [] });
      expect(chapter.lessonCount).toBe(0);
    });
  });

  describe('findLesson', () => {
    it('should find existing lesson', () => {
      const lessons = [
        createLesson('lesson-1', 1),
        createLesson('lesson-2', 2),
      ];
      const chapter = createValidChapter({ lessons });

      const found = chapter.findLesson(LessonId.create('lesson-2'));
      expect(found).toBeDefined();
      expect(found!.id.toString()).toBe('lesson-2');
    });

    it('should return undefined for non-existing lesson', () => {
      const chapter = createValidChapter();
      const found = chapter.findLesson(LessonId.create('non-existing'));
      expect(found).toBeUndefined();
    });
  });

  describe('hasLesson', () => {
    it('should return true for existing lesson', () => {
      const chapter = createValidChapter();
      expect(chapter.hasLesson(LessonId.create('lesson-1'))).toBe(true);
    });

    it('should return false for non-existing lesson', () => {
      const chapter = createValidChapter();
      expect(chapter.hasLesson(LessonId.create('non-existing'))).toBe(false);
    });
  });

  describe('getFirstLesson', () => {
    it('should return first lesson', () => {
      const lessons = [
        createLesson('lesson-1', 1),
        createLesson('lesson-2', 2),
      ];
      const chapter = createValidChapter({ lessons });

      const first = chapter.getFirstLesson();
      expect(first).toBeDefined();
      expect(first!.id.toString()).toBe('lesson-1');
    });

    it('should return undefined for empty chapter', () => {
      const chapter = createValidChapter({ lessons: [] });
      expect(chapter.getFirstLesson()).toBeUndefined();
    });
  });

  describe('getLastLesson', () => {
    it('should return last lesson', () => {
      const lessons = [
        createLesson('lesson-1', 1),
        createLesson('lesson-2', 2),
      ];
      const chapter = createValidChapter({ lessons });

      const last = chapter.getLastLesson();
      expect(last).toBeDefined();
      expect(last!.id.toString()).toBe('lesson-2');
    });

    it('should return undefined for empty chapter', () => {
      const chapter = createValidChapter({ lessons: [] });
      expect(chapter.getLastLesson()).toBeUndefined();
    });
  });

  describe('equals', () => {
    it('should return true for chapters with same id', () => {
      const chapter1 = createValidChapter({ id: ChapterId.create('chapter-1') });
      const chapter2 = createValidChapter({
        id: ChapterId.create('chapter-1'),
        title: 'Different Title',
      });
      expect(chapter1.equals(chapter2)).toBe(true);
    });

    it('should return false for chapters with different ids', () => {
      const chapter1 = createValidChapter({ id: ChapterId.create('chapter-1') });
      const chapter2 = createValidChapter({ id: ChapterId.create('chapter-2') });
      expect(chapter1.equals(chapter2)).toBe(false);
    });
  });
});
