import { LessonUnlockSpecification } from './LessonUnlockSpecification';
import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonTitle } from '../models/LessonTitle';
import { MarkdownContent } from '../models/MarkdownContent';
import { Progress } from '@/domain/progress';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('LessonUnlockSpecification', () => {
  const spec = new LessonUnlockSpecification();

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

  it('最初のレッスンは常にアンロック', () => {
    const course = createTestCourse();
    const progress = Progress.create(course.id);
    const firstLesson = course.chapters[0].lessons[0];

    expect(spec.isSatisfiedBy(firstLesson, course, progress)).toBe(true);
  });

  it('前のレッスン未完了なら2番目はロック', () => {
    const course = createTestCourse();
    const progress = Progress.create(course.id);
    const secondLesson = course.chapters[0].lessons[1];

    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(false);
  });

  it('前のレッスン完了なら2番目はアンロック', () => {
    const course = createTestCourse();
    const firstLesson = course.chapters[0].lessons[0];
    const secondLesson = course.chapters[0].lessons[1];
    const progress = Progress.create(course.id).markLessonAsCompleted(firstLesson.id);

    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(true);
  });

  it('チャプターをまたいでも前のレッスン完了が必要', () => {
    const course = createTestCourse();
    const secondLesson = course.chapters[0].lessons[1];
    const thirdLesson = course.chapters[1].lessons[0];

    // 最初のレッスンのみ完了
    let progress = Progress.create(course.id);
    progress = progress.markLessonAsCompleted(course.chapters[0].lessons[0].id);

    // 2番目はアンロック、3番目はロック
    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(true);
    expect(spec.isSatisfiedBy(thirdLesson, course, progress)).toBe(false);

    // 2番目も完了すると3番目がアンロック
    progress = progress.markLessonAsCompleted(secondLesson.id);
    expect(spec.isSatisfiedBy(thirdLesson, course, progress)).toBe(true);
  });

  it('存在しないレッスンはfalseを返す', () => {
    const course = createTestCourse();
    const progress = Progress.create(course.id);
    const unknownLesson = createTestLesson('unknown-lesson', 99);

    expect(spec.isSatisfiedBy(unknownLesson, course, progress)).toBe(false);
  });
});
