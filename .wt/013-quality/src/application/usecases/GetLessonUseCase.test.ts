import { describe, it, expect, beforeEach } from 'vitest';
import { GetLessonUseCase } from './GetLessonUseCase';
import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { Course, Chapter, Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { Progress } from '@/domain/progress/models';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('GetLessonUseCase', () => {
  let courseRepository: ICourseRepository;
  let progressRepository: IProgressRepository;
  let useCase: GetLessonUseCase;
  let testCourse: Course;

  beforeEach(() => {
    const lesson1 = Lesson.create({
      id: LessonId.create('lesson-1'),
      title: LessonTitle.create('Lesson 1'),
      content: MarkdownContent.create('# Lesson 1 content'),
      order: 1,
    });

    const lesson2 = Lesson.create({
      id: LessonId.create('lesson-2'),
      title: LessonTitle.create('Lesson 2'),
      content: MarkdownContent.create('# Lesson 2 content'),
      order: 2,
    });

    const chapter = Chapter.create({
      id: ChapterId.create('chapter-1'),
      title: 'Chapter 1',
      order: 1,
      lessons: [lesson1, lesson2],
    });

    testCourse = Course.create({
      id: CourseId.create('course-1'),
      title: 'Test Course',
      description: 'Test description',
      chapters: [chapter],
    });

    courseRepository = {
      findById: async (id: CourseId) =>
        id.toString() === 'course-1' ? testCourse : null,
      findAll: async () => [testCourse],
    };

    progressRepository = {
      findByCourseId: async () => null,
      save: async () => {},
    };

    useCase = new GetLessonUseCase(courseRepository, progressRepository);
  });

  it('should return lesson data successfully', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });

    expect(result.lesson.id).toBe('lesson-1');
    expect(result.lesson.title).toBe('Lesson 1');
    expect(result.lesson.content).toBe('# Lesson 1 content');
    expect(result.lesson.order).toBe(1);
  });

  it('should return chapter info', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });

    expect(result.chapter.id).toBe('chapter-1');
    expect(result.chapter.title).toBe('Chapter 1');
  });

  it('should return course info', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });

    expect(result.course.id).toBe('course-1');
    expect(result.course.title).toBe('Test Course');
  });

  it('should return navigation for first lesson', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });

    expect(result.navigation.previous).toBeNull();
    expect(result.navigation.next).not.toBeNull();
    expect(result.navigation.next?.lessonId).toBe('lesson-2');
  });

  it('should return navigation for second lesson', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-2',
    });

    expect(result.navigation.previous).not.toBeNull();
    expect(result.navigation.previous?.lessonId).toBe('lesson-1');
    expect(result.navigation.next).toBeNull();
  });

  it('should unlock first lesson without progress', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });

    expect(result.isUnlocked).toBe(true);
    expect(result.isCompleted).toBe(false);
  });

  it('should lock second lesson without progress', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-2',
    });

    expect(result.isUnlocked).toBe(false);
  });

  it('should unlock second lesson when first is completed', async () => {
    const progress = Progress.create(CourseId.create('course-1'));
    const completedProgress = progress.markLessonAsCompleted(LessonId.create('lesson-1'));

    progressRepository = {
      findByCourseId: async () => completedProgress,
      save: async () => {},
    };

    useCase = new GetLessonUseCase(courseRepository, progressRepository);

    const result = await useCase.execute({
      courseId: 'course-1',
      chapterId: 'chapter-1',
      lessonId: 'lesson-2',
    });

    expect(result.isUnlocked).toBe(true);
  });

  it('should throw error when course not found', async () => {
    await expect(
      useCase.execute({
        courseId: 'non-existent',
        chapterId: 'chapter-1',
        lessonId: 'lesson-1',
      })
    ).rejects.toThrow('Course not found');
  });

  it('should throw error when lesson not found', async () => {
    await expect(
      useCase.execute({
        courseId: 'course-1',
        chapterId: 'chapter-1',
        lessonId: 'non-existent',
      })
    ).rejects.toThrow('Lesson not found');
  });
});
