import { Course } from './Course';
import { Chapter } from './Chapter';
import { Lesson } from './Lesson';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('Course', () => {
  const createTestLesson = (id: string, order: number) =>
    Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`レッスン ${order}`),
      content: MarkdownContent.create(`# レッスン ${order}`),
      order,
    });

  const createTestChapter = (id: string, order: number, lessons: Lesson[]) =>
    Chapter.create({
      id: ChapterId.create(id),
      title: `チャプター ${order}`,
      order,
      lessons,
    });

  describe('create', () => {
    it('正常なパラメータでインスタンスを作成できる', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: 'DDDの基礎を学ぶコース',
        chapters: [],
      });

      expect(course.id.toString()).toBe('course-1');
      expect(course.title).toBe('DDD入門');
      expect(course.description).toBe('DDDの基礎を学ぶコース');
    });

    it('チャプターがorderでソートされる', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [
          createTestChapter('chapter-3', 3, []),
          createTestChapter('chapter-1', 1, []),
          createTestChapter('chapter-2', 2, []),
        ],
      });

      expect(course.chapters[0].id.toString()).toBe('chapter-1');
      expect(course.chapters[1].id.toString()).toBe('chapter-2');
      expect(course.chapters[2].id.toString()).toBe('chapter-3');
    });

    it('空のタイトルはエラー', () => {
      expect(() =>
        Course.create({
          id: CourseId.create('course-1'),
          title: '',
          description: '',
          chapters: [],
        })
      ).toThrow('Course title cannot be empty');
    });

    it('タイトルの前後の空白がトリムされる', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: '  DDD入門  ',
        description: '  説明  ',
        chapters: [],
      });

      expect(course.title).toBe('DDD入門');
      expect(course.description).toBe('説明');
    });
  });

  describe('totalLessons', () => {
    it('全チャプターのレッスン数を合計する', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [
          createTestChapter('chapter-1', 1, [
            createTestLesson('lesson-1', 1),
            createTestLesson('lesson-2', 2),
          ]),
          createTestChapter('chapter-2', 2, [
            createTestLesson('lesson-3', 1),
          ]),
        ],
      });

      expect(course.totalLessons).toBe(3);
    });

    it('チャプターがない場合は0', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [],
      });

      expect(course.totalLessons).toBe(0);
    });
  });

  describe('findLesson', () => {
    it('存在するレッスンを見つけられる', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [
          createTestChapter('chapter-1', 1, [
            createTestLesson('lesson-1', 1),
          ]),
          createTestChapter('chapter-2', 2, [
            createTestLesson('lesson-2', 1),
          ]),
        ],
      });

      const found = course.findLesson(LessonId.create('lesson-2'));
      expect(found?.lesson.id.toString()).toBe('lesson-2');
      expect(found?.chapter.id.toString()).toBe('chapter-2');
    });

    it('存在しないレッスンはundefinedを返す', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [
          createTestChapter('chapter-1', 1, [
            createTestLesson('lesson-1', 1),
          ]),
        ],
      });

      const found = course.findLesson(LessonId.create('lesson-999'));
      expect(found).toBeUndefined();
    });
  });

  describe('getAdjacentLessons', () => {
    const course = Course.create({
      id: CourseId.create('course-1'),
      title: 'DDD入門',
      description: '',
      chapters: [
        createTestChapter('chapter-1', 1, [
          createTestLesson('lesson-1', 1),
          createTestLesson('lesson-2', 2),
        ]),
        createTestChapter('chapter-2', 2, [
          createTestLesson('lesson-3', 1),
        ]),
      ],
    });

    it('最初のレッスンはpreviousがnull', () => {
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-1'));
      expect(adjacent.previous).toBeNull();
      expect(adjacent.next?.id.toString()).toBe('lesson-2');
    });

    it('中間のレッスンは前後両方を取得できる', () => {
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-2'));
      expect(adjacent.previous?.id.toString()).toBe('lesson-1');
      expect(adjacent.next?.id.toString()).toBe('lesson-3');
    });

    it('最後のレッスンはnextがnull', () => {
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-3'));
      expect(adjacent.previous?.id.toString()).toBe('lesson-2');
      expect(adjacent.next).toBeNull();
    });

    it('存在しないレッスンは両方null', () => {
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-999'));
      expect(adjacent.previous).toBeNull();
      expect(adjacent.next).toBeNull();
    });
  });

  describe('getLessonOrder', () => {
    const course = Course.create({
      id: CourseId.create('course-1'),
      title: 'DDD入門',
      description: '',
      chapters: [
        createTestChapter('chapter-1', 1, [
          createTestLesson('lesson-1', 1),
          createTestLesson('lesson-2', 2),
        ]),
        createTestChapter('chapter-2', 2, [
          createTestLesson('lesson-3', 1),
        ]),
      ],
    });

    it('レッスンの順序を取得できる（1始まり）', () => {
      expect(course.getLessonOrder(LessonId.create('lesson-1'))).toBe(1);
      expect(course.getLessonOrder(LessonId.create('lesson-2'))).toBe(2);
      expect(course.getLessonOrder(LessonId.create('lesson-3'))).toBe(3);
    });

    it('存在しないレッスンはundefined', () => {
      expect(course.getLessonOrder(LessonId.create('lesson-999'))).toBeUndefined();
    });
  });

  describe('equals', () => {
    it('同じIDのコースは等しい', () => {
      const course1 = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [],
      });
      const course2 = Course.create({
        id: CourseId.create('course-1'),
        title: '異なるタイトル',
        description: '異なる説明',
        chapters: [],
      });

      expect(course1.equals(course2)).toBe(true);
    });

    it('異なるIDのコースは等しくない', () => {
      const course1 = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [],
      });
      const course2 = Course.create({
        id: CourseId.create('course-2'),
        title: 'DDD入門',
        description: '',
        chapters: [],
      });

      expect(course1.equals(course2)).toBe(false);
    });
  });
});
