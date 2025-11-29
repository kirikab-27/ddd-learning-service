import { ChapterCompletionSpecification } from './ChapterCompletionSpecification';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { LessonTitle } from '../models/LessonTitle';
import { MarkdownContent } from '../models/MarkdownContent';
import { Progress } from '@/domain/progress';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('ChapterCompletionSpecification', () => {
  const spec = new ChapterCompletionSpecification();

  const createTestLesson = (id: string, order: number) =>
    Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`レッスン ${order}`),
      content: MarkdownContent.create(`# レッスン ${order}`),
      order,
    });

  it('全レッスン完了でチャプター完了', () => {
    const chapter = Chapter.create({
      id: ChapterId.create('chapter-1'),
      title: 'チャプター1',
      order: 1,
      lessons: [
        createTestLesson('lesson-1', 1),
        createTestLesson('lesson-2', 2),
      ],
    });

    let progress = Progress.create(CourseId.create('course-1'));
    progress = progress.markLessonAsCompleted(LessonId.create('lesson-1'));
    progress = progress.markLessonAsCompleted(LessonId.create('lesson-2'));

    expect(spec.isSatisfiedBy(chapter, progress)).toBe(true);
  });

  it('一部のレッスンのみ完了では未完了', () => {
    const chapter = Chapter.create({
      id: ChapterId.create('chapter-1'),
      title: 'チャプター1',
      order: 1,
      lessons: [
        createTestLesson('lesson-1', 1),
        createTestLesson('lesson-2', 2),
      ],
    });

    let progress = Progress.create(CourseId.create('course-1'));
    progress = progress.markLessonAsCompleted(LessonId.create('lesson-1'));

    expect(spec.isSatisfiedBy(chapter, progress)).toBe(false);
  });

  it('レッスンがないチャプターは完了', () => {
    const chapter = Chapter.create({
      id: ChapterId.create('chapter-1'),
      title: 'チャプター1',
      order: 1,
      lessons: [],
    });

    const progress = Progress.create(CourseId.create('course-1'));

    expect(spec.isSatisfiedBy(chapter, progress)).toBe(true);
  });

  it('進捗がない場合は未完了', () => {
    const chapter = Chapter.create({
      id: ChapterId.create('chapter-1'),
      title: 'チャプター1',
      order: 1,
      lessons: [
        createTestLesson('lesson-1', 1),
      ],
    });

    const progress = Progress.create(CourseId.create('course-1'));

    expect(spec.isSatisfiedBy(chapter, progress)).toBe(false);
  });
});
