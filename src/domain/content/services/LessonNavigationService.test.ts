import { LessonNavigationService } from './LessonNavigationService';
import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonTitle } from '../models/LessonTitle';
import { MarkdownContent } from '../models/MarkdownContent';
import { Progress } from '@/domain/progress';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('LessonNavigationService', () => {
  const service = new LessonNavigationService();

  const createTestLesson = (id: string, order: number) =>
    Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`レッスン ${order}`),
      content: MarkdownContent.create(`# レッスン ${order}`),
      order,
    });

  const createTestCourse = () =>
    Course.create({
      id: CourseId.create('course-1'),
      title: 'DDD入門',
      description: '',
      chapters: [
        Chapter.create({
          id: ChapterId.create('chapter-1'),
          title: 'チャプター1',
          order: 1,
          lessons: [
            createTestLesson('lesson-1', 1),
            createTestLesson('lesson-2', 2),
          ],
        }),
        Chapter.create({
          id: ChapterId.create('chapter-2'),
          title: 'チャプター2',
          order: 2,
          lessons: [
            createTestLesson('lesson-3', 1),
          ],
        }),
      ],
    });

  describe('findNextLessonToStudy', () => {
    it('進捗がない場合は最初のレッスンを返す', () => {
      const course = createTestCourse();
      const progress = Progress.create(course.id);

      const result = service.findNextLessonToStudy(course, progress);

      expect(result?.lesson.id.toString()).toBe('lesson-1');
      expect(result?.chapter.id.toString()).toBe('chapter-1');
    });

    it('最初のレッスン完了後は2番目を返す', () => {
      const course = createTestCourse();
      let progress = Progress.create(course.id);
      progress = progress.markLessonAsCompleted(LessonId.create('lesson-1'));

      const result = service.findNextLessonToStudy(course, progress);

      expect(result?.lesson.id.toString()).toBe('lesson-2');
      expect(result?.chapter.id.toString()).toBe('chapter-1');
    });

    it('チャプター1完了後はチャプター2の最初を返す', () => {
      const course = createTestCourse();
      let progress = Progress.create(course.id);
      progress = progress.markLessonAsCompleted(LessonId.create('lesson-1'));
      progress = progress.markLessonAsCompleted(LessonId.create('lesson-2'));

      const result = service.findNextLessonToStudy(course, progress);

      expect(result?.lesson.id.toString()).toBe('lesson-3');
      expect(result?.chapter.id.toString()).toBe('chapter-2');
    });

    it('全レッスン完了後は最後のレッスンを返す', () => {
      const course = createTestCourse();
      let progress = Progress.create(course.id);
      progress = progress.markLessonAsCompleted(LessonId.create('lesson-1'));
      progress = progress.markLessonAsCompleted(LessonId.create('lesson-2'));
      progress = progress.markLessonAsCompleted(LessonId.create('lesson-3'));

      const result = service.findNextLessonToStudy(course, progress);

      expect(result?.lesson.id.toString()).toBe('lesson-3');
      expect(result?.chapter.id.toString()).toBe('chapter-2');
    });

    it('チャプターがない場合はnullを返す', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [],
      });
      const progress = Progress.create(course.id);

      const result = service.findNextLessonToStudy(course, progress);

      expect(result).toBeNull();
    });

    it('レッスンがないチャプターのみの場合はnullを返す', () => {
      const course = Course.create({
        id: CourseId.create('course-1'),
        title: 'DDD入門',
        description: '',
        chapters: [
          Chapter.create({
            id: ChapterId.create('chapter-1'),
            title: 'チャプター1',
            order: 1,
            lessons: [],
          }),
        ],
      });
      const progress = Progress.create(course.id);

      const result = service.findNextLessonToStudy(course, progress);

      expect(result).toBeNull();
    });
  });
});
