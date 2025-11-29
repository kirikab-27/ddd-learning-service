import { Chapter } from './Chapter';
import { Lesson } from './Lesson';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';
import { ChapterId, LessonId } from '@/domain/shared';

describe('Chapter', () => {
  const createTestLesson = (id: string, order: number) =>
    Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`レッスン ${order}`),
      content: MarkdownContent.create(`# レッスン ${order}`),
      order,
    });

  describe('create', () => {
    it('正常なパラメータでインスタンスを作成できる', () => {
      const chapter = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [createTestLesson('lesson-1', 1)],
      });

      expect(chapter.id.toString()).toBe('chapter-1');
      expect(chapter.title).toBe('DDDの基礎');
      expect(chapter.order).toBe(1);
      expect(chapter.lessonCount).toBe(1);
    });

    it('レッスンがorderでソートされる', () => {
      const chapter = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [
          createTestLesson('lesson-3', 3),
          createTestLesson('lesson-1', 1),
          createTestLesson('lesson-2', 2),
        ],
      });

      expect(chapter.lessons[0].id.toString()).toBe('lesson-1');
      expect(chapter.lessons[1].id.toString()).toBe('lesson-2');
      expect(chapter.lessons[2].id.toString()).toBe('lesson-3');
    });

    it('空のタイトルはエラー', () => {
      expect(() =>
        Chapter.create({
          id: ChapterId.create('chapter-1'),
          title: '',
          order: 1,
          lessons: [],
        })
      ).toThrow('Chapter title cannot be empty');
    });

    it('空白のみのタイトルはエラー', () => {
      expect(() =>
        Chapter.create({
          id: ChapterId.create('chapter-1'),
          title: '   ',
          order: 1,
          lessons: [],
        })
      ).toThrow('Chapter title cannot be empty');
    });

    it('orderが0以下の場合はエラー', () => {
      expect(() =>
        Chapter.create({
          id: ChapterId.create('chapter-1'),
          title: 'DDDの基礎',
          order: 0,
          lessons: [],
        })
      ).toThrow('Chapter order must be positive');
    });

    it('タイトルの前後の空白がトリムされる', () => {
      const chapter = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: '  DDDの基礎  ',
        order: 1,
        lessons: [],
      });

      expect(chapter.title).toBe('DDDの基礎');
    });
  });

  describe('findLesson', () => {
    it('存在するレッスンを見つけられる', () => {
      const chapter = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [
          createTestLesson('lesson-1', 1),
          createTestLesson('lesson-2', 2),
        ],
      });

      const found = chapter.findLesson(LessonId.create('lesson-2'));
      expect(found?.id.toString()).toBe('lesson-2');
    });

    it('存在しないレッスンはundefinedを返す', () => {
      const chapter = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [createTestLesson('lesson-1', 1)],
      });

      const found = chapter.findLesson(LessonId.create('lesson-999'));
      expect(found).toBeUndefined();
    });
  });

  describe('equals', () => {
    it('同じIDのチャプターは等しい', () => {
      const chapter1 = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [],
      });
      const chapter2 = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: '異なるタイトル',
        order: 2,
        lessons: [],
      });

      expect(chapter1.equals(chapter2)).toBe(true);
    });

    it('異なるIDのチャプターは等しくない', () => {
      const chapter1 = Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [],
      });
      const chapter2 = Chapter.create({
        id: ChapterId.create('chapter-2'),
        title: 'DDDの基礎',
        order: 1,
        lessons: [],
      });

      expect(chapter1.equals(chapter2)).toBe(false);
    });
  });
});
