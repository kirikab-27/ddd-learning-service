import { InMemoryCourseRepository } from './InMemoryCourseRepository';
import { Course } from '@/domain/content/models/Course';
import { Chapter } from '@/domain/content/models/Chapter';
import { Lesson } from '@/domain/content/models/Lesson';
import { LessonTitle } from '@/domain/content/models/LessonTitle';
import { MarkdownContent } from '@/domain/content/models/MarkdownContent';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('InMemoryCourseRepository', () => {
  let repository: InMemoryCourseRepository;

  const createTestCourse = (id: string, title: string): Course => {
    const lesson = Lesson.create({
      id: LessonId.create(`${id}-lesson-1`),
      title: LessonTitle.create('Test Lesson'),
      content: MarkdownContent.create('Test content'),
      order: 1,
    });

    const chapter = Chapter.create({
      id: ChapterId.create(`${id}-chapter-1`),
      title: 'Test Chapter',
      order: 1,
      lessons: [lesson],
    });

    return Course.create({
      id: CourseId.create(id),
      title,
      description: 'Test description',
      chapters: [chapter],
    });
  };

  beforeEach(() => {
    repository = new InMemoryCourseRepository();
  });

  describe('findById', () => {
    it('存在するIDでコースを取得できる', async () => {
      const course = createTestCourse('course-1', 'Test Course');
      repository.addCourse(course);

      const result = await repository.findById(CourseId.create('course-1'));

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Test Course');
    });

    it('存在しないIDでnullを返す', async () => {
      const result = await repository.findById(CourseId.create('non-existent'));

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('全コースを取得できる', async () => {
      const course1 = createTestCourse('course-1', 'Course 1');
      const course2 = createTestCourse('course-2', 'Course 2');
      repository.addCourse(course1);
      repository.addCourse(course2);

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
    });

    it('コースがない場合は空配列を返す', async () => {
      const result = await repository.findAll();

      expect(result).toHaveLength(0);
    });
  });

  describe('constructor with initial courses', () => {
    it('初期コースを受け取れる', async () => {
      const course = createTestCourse('course-1', 'Initial Course');
      const repo = new InMemoryCourseRepository([course]);

      const result = await repo.findById(CourseId.create('course-1'));

      expect(result).not.toBeNull();
    });
  });

  describe('clear', () => {
    it('全コースをクリアできる', async () => {
      const course = createTestCourse('course-1', 'Test Course');
      repository.addCourse(course);
      repository.clear();

      const result = await repository.findAll();

      expect(result).toHaveLength(0);
    });
  });
});
