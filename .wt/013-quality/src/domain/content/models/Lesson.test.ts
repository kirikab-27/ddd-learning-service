import { LessonId, QuizId } from '@/domain/shared';
import { Lesson } from './Lesson';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';

describe('Lesson', () => {
  const createValidLesson = (overrides: Partial<{
    id: LessonId;
    title: LessonTitle;
    content: MarkdownContent;
    order: number;
    quizId: QuizId;
  }> = {}) => {
    return Lesson.create({
      id: overrides.id ?? LessonId.create('lesson-1'),
      title: overrides.title ?? LessonTitle.create('Introduction'),
      content: overrides.content ?? MarkdownContent.create('# Content'),
      order: overrides.order ?? 1,
      quizId: overrides.quizId,
    });
  };

  describe('create', () => {
    it('should create a valid Lesson', () => {
      const lesson = createValidLesson();

      expect(lesson.id.toString()).toBe('lesson-1');
      expect(lesson.title.toString()).toBe('Introduction');
      expect(lesson.content.raw).toBe('# Content');
      expect(lesson.order).toBe(1);
      expect(lesson.quizId).toBeNull();
    });

    it('should create Lesson with quizId', () => {
      const quizId = QuizId.create('quiz-1');
      const lesson = createValidLesson({ quizId });

      expect(lesson.quizId).not.toBeNull();
      expect(lesson.quizId!.toString()).toBe('quiz-1');
    });

    it('should throw error for order less than 1', () => {
      expect(() => createValidLesson({ order: 0 })).toThrow('Lesson order must be positive');
      expect(() => createValidLesson({ order: -1 })).toThrow('Lesson order must be positive');
    });

    it('should accept order of 1', () => {
      const lesson = createValidLesson({ order: 1 });
      expect(lesson.order).toBe(1);
    });
  });

  describe('hasQuiz', () => {
    it('should return false when no quiz is assigned', () => {
      const lesson = createValidLesson();
      expect(lesson.hasQuiz()).toBe(false);
    });

    it('should return true when quiz is assigned', () => {
      const quizId = QuizId.create('quiz-1');
      const lesson = createValidLesson({ quizId });
      expect(lesson.hasQuiz()).toBe(true);
    });
  });

  describe('equals', () => {
    it('should return true for lessons with same id', () => {
      const lesson1 = createValidLesson({ id: LessonId.create('lesson-1') });
      const lesson2 = createValidLesson({
        id: LessonId.create('lesson-1'),
        title: LessonTitle.create('Different Title'),
      });
      expect(lesson1.equals(lesson2)).toBe(true);
    });

    it('should return false for lessons with different ids', () => {
      const lesson1 = createValidLesson({ id: LessonId.create('lesson-1') });
      const lesson2 = createValidLesson({ id: LessonId.create('lesson-2') });
      expect(lesson1.equals(lesson2)).toBe(false);
    });
  });
});
