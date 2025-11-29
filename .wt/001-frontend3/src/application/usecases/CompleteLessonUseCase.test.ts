import { describe, it, expect, beforeEach } from 'vitest';
import { CompleteLessonUseCase } from './CompleteLessonUseCase';
import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { Course, Chapter, Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { Progress } from '@/domain/progress/models';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('CompleteLessonUseCase', () => {
  let courseRepository: ICourseRepository;
  let progressRepository: IProgressRepository;
  let savedProgress: Progress | null;
  let useCase: CompleteLessonUseCase;
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

    const lesson3 = Lesson.create({
      id: LessonId.create('lesson-3'),
      title: LessonTitle.create('Lesson 3'),
      content: MarkdownContent.create('# Lesson 3 content'),
      order: 1,
    });

    const lesson4 = Lesson.create({
      id: LessonId.create('lesson-4'),
      title: LessonTitle.create('Lesson 4'),
      content: MarkdownContent.create('# Lesson 4 content'),
      order: 2,
    });

    const chapter1 = Chapter.create({
      id: ChapterId.create('ch-1'),
      title: 'Chapter 1',
      order: 1,
      lessons: [lesson1, lesson2],
    });

    const chapter2 = Chapter.create({
      id: ChapterId.create('ch-2'),
      title: 'Chapter 2',
      order: 2,
      lessons: [lesson3, lesson4],
    });

    testCourse = Course.create({
      id: CourseId.create('course-1'),
      title: 'Test Course',
      description: 'Test description',
      chapters: [chapter1, chapter2],
    });

    savedProgress = null;

    courseRepository = {
      findById: async (id: CourseId) =>
        id.toString() === 'course-1' ? testCourse : null,
      findAll: async () => [testCourse],
    };

    progressRepository = {
      findByCourseId: async () => null,
      save: async (progress: Progress) => {
        savedProgress = progress;
      },
    };

    useCase = new CompleteLessonUseCase(courseRepository, progressRepository);
  });

  it('should complete a lesson and return progress', async () => {
    const result = await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-1',
    });

    expect(result.success).toBe(true);
    expect(result.progress.completedCount).toBe(1);
    expect(result.progress.totalLessons).toBe(4);
    expect(result.progress.completionRate).toBe(25);
    expect(savedProgress).not.toBeNull();
  });

  it('should be idempotent - completing same lesson twice returns success', async () => {
    const existingProgress = Progress.create(CourseId.create('course-1'))
      .markLessonAsCompleted(LessonId.create('lesson-1'));

    progressRepository = {
      findByCourseId: async () => existingProgress,
      save: async (progress: Progress) => {
        savedProgress = progress;
      },
    };

    useCase = new CompleteLessonUseCase(courseRepository, progressRepository);

    const result = await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-1',
    });

    expect(result.success).toBe(true);
    expect(result.progress.completedCount).toBe(1);
    expect(result.progress.completionRate).toBe(25);
  });

  it('should accumulate progress when completing multiple lessons', async () => {
    const existingProgress = Progress.create(CourseId.create('course-1'))
      .markLessonAsCompleted(LessonId.create('lesson-1'));

    progressRepository = {
      findByCourseId: async () => existingProgress,
      save: async (progress: Progress) => {
        savedProgress = progress;
      },
    };

    useCase = new CompleteLessonUseCase(courseRepository, progressRepository);

    const result = await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-2',
    });

    expect(result.success).toBe(true);
    expect(result.progress.completedCount).toBe(2);
    expect(result.progress.totalLessons).toBe(4);
    expect(result.progress.completionRate).toBe(50);
  });

  it('should throw error when course not found', async () => {
    await expect(
      useCase.execute({
        courseId: 'non-existent',
        lessonId: 'lesson-1',
      })
    ).rejects.toThrow('Course not found');
  });

  it('should throw error when lesson not found in course', async () => {
    await expect(
      useCase.execute({
        courseId: 'course-1',
        lessonId: 'non-existent-lesson',
      })
    ).rejects.toThrow('Lesson not found in course');
  });

  it('should return 100% completion when all lessons completed', async () => {
    const existingProgress = Progress.create(CourseId.create('course-1'))
      .markLessonAsCompleted(LessonId.create('lesson-1'))
      .markLessonAsCompleted(LessonId.create('lesson-2'))
      .markLessonAsCompleted(LessonId.create('lesson-3'));

    progressRepository = {
      findByCourseId: async () => existingProgress,
      save: async (progress: Progress) => {
        savedProgress = progress;
      },
    };

    useCase = new CompleteLessonUseCase(courseRepository, progressRepository);

    const result = await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-4',
    });

    expect(result.success).toBe(true);
    expect(result.progress.completedCount).toBe(4);
    expect(result.progress.totalLessons).toBe(4);
    expect(result.progress.completionRate).toBe(100);
  });

  it('should save updated progress to repository', async () => {
    await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-1',
    });

    expect(savedProgress).not.toBeNull();
    expect(savedProgress!.hasCompletedLesson(LessonId.create('lesson-1'))).toBe(true);
  });
});
