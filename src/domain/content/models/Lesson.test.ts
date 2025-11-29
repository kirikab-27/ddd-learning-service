import { Lesson } from './Lesson';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';
import { LessonId, QuizId } from '@/domain/shared';

describe('Lesson', () => {
  describe('create', () => {
    it('正常なパラメータでインスタンスを作成できる', () => {
      const lesson = Lesson.create({
        id: LessonId.create('lesson-1'),
        title: LessonTitle.create('DDDの基礎'),
        content: MarkdownContent.create('# DDDの基礎\n\nこれは基礎です。'),
        order: 1,
      });

      expect(lesson.id.toString()).toBe('lesson-1');
      expect(lesson.title.toString()).toBe('DDDの基礎');
      expect(lesson.order).toBe(1);
      expect(lesson.quizId).toBeNull();
      expect(lesson.hasQuiz()).toBe(false);
    });

    it('クイズIDを指定できる', () => {
      const lesson = Lesson.create({
        id: LessonId.create('lesson-1'),
        title: LessonTitle.create('DDDの基礎'),
        content: MarkdownContent.create('# DDDの基礎'),
        order: 1,
        quizId: QuizId.create('quiz-1'),
      });

      expect(lesson.quizId?.toString()).toBe('quiz-1');
      expect(lesson.hasQuiz()).toBe(true);
    });

    it('orderが0以下の場合はエラー', () => {
      expect(() =>
        Lesson.create({
          id: LessonId.create('lesson-1'),
          title: LessonTitle.create('DDDの基礎'),
          content: MarkdownContent.create('# DDDの基礎'),
          order: 0,
        })
      ).toThrow('Lesson order must be positive');
    });

    it('orderが負の値の場合はエラー', () => {
      expect(() =>
        Lesson.create({
          id: LessonId.create('lesson-1'),
          title: LessonTitle.create('DDDの基礎'),
          content: MarkdownContent.create('# DDDの基礎'),
          order: -1,
        })
      ).toThrow('Lesson order must be positive');
    });
  });

  describe('equals', () => {
    it('同じIDのレッスンは等しい', () => {
      const lesson1 = Lesson.create({
        id: LessonId.create('lesson-1'),
        title: LessonTitle.create('DDDの基礎'),
        content: MarkdownContent.create('# DDDの基礎'),
        order: 1,
      });
      const lesson2 = Lesson.create({
        id: LessonId.create('lesson-1'),
        title: LessonTitle.create('異なるタイトル'),
        content: MarkdownContent.create('異なる内容'),
        order: 2,
      });

      expect(lesson1.equals(lesson2)).toBe(true);
    });

    it('異なるIDのレッスンは等しくない', () => {
      const lesson1 = Lesson.create({
        id: LessonId.create('lesson-1'),
        title: LessonTitle.create('DDDの基礎'),
        content: MarkdownContent.create('# DDDの基礎'),
        order: 1,
      });
      const lesson2 = Lesson.create({
        id: LessonId.create('lesson-2'),
        title: LessonTitle.create('DDDの基礎'),
        content: MarkdownContent.create('# DDDの基礎'),
        order: 1,
      });

      expect(lesson1.equals(lesson2)).toBe(false);
    });
  });
});
