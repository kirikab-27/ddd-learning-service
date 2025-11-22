import { describe, it, expect, vi } from 'vitest';
import { GetCourseNavigationUseCase } from './GetCourseNavigationUseCase';
import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { Course } from '@/domain/content/models/Course';
import { Chapter } from '@/domain/content/models/Chapter';
import { Lesson } from '@/domain/content/models/Lesson';
import { LessonTitle } from '@/domain/content/models/LessonTitle';
import { MarkdownContent } from '@/domain/content/models/MarkdownContent';
import { Progress } from '@/domain/progress/models/Progress';
import { LessonProgress } from '@/domain/progress/models/LessonProgress';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

describe('GetCourseNavigationUseCase', () => {
  const createMockCourse = (): Course => {
    const chapters: Chapter[] = [
      Chapter.create({
        id: ChapterId.create('chapter-1'),
        title: 'Chapter 1',
        order: 1,
        lessons: [
          Lesson.create({
            id: LessonId.create('lesson-1-1'),
            title: LessonTitle.create('Lesson 1.1'),
            content: MarkdownContent.create('Content 1.1'),
            order: 1,
          }),
          Lesson.create({
            id: LessonId.create('lesson-1-2'),
            title: LessonTitle.create('Lesson 1.2'),
            content: MarkdownContent.create('Content 1.2'),
            order: 2,
          }),
        ],
      }),
      Chapter.create({
        id: ChapterId.create('chapter-2'),
        title: 'Chapter 2',
        order: 2,
        lessons: [
          Lesson.create({
            id: LessonId.create('lesson-2-1'),
            title: LessonTitle.create('Lesson 2.1'),
            content: MarkdownContent.create('Content 2.1'),
            order: 1,
          }),
        ],
      }),
    ];

    return Course.create({
      id: CourseId.create('course-1'),
      title: 'Test Course',
      description: 'Test Description',
      chapters,
    });
  };

  const createMockCourseRepository = (course: Course | null): ICourseRepository => ({
    findById: vi.fn().mockResolvedValue(course),
    findAll: vi.fn().mockResolvedValue(course ? [course] : []),
  });

  const createMockProgressRepository = (progress: Progress | null): IProgressRepository => ({
    findByCourseId: vi.fn().mockResolvedValue(progress),
    save: vi.fn().mockResolvedValue(undefined),
  });

  it('should return navigation data with correct structure', async () => {
    const course = createMockCourse();
    const courseRepo = createMockCourseRepository(course);
    const progressRepo = createMockProgressRepository(null);

    const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);
    const result = await useCase.execute({ courseId: 'course-1' });

    expect(result.courseId).toBe('course-1');
    expect(result.courseTitle).toBe('Test Course');
    expect(result.chapters).toHaveLength(2);
    expect(result.chapters[0].lessons).toHaveLength(2);
    expect(result.chapters[1].lessons).toHaveLength(1);
  });

  it('should mark first lesson as unlocked', async () => {
    const course = createMockCourse();
    const courseRepo = createMockCourseRepository(course);
    const progressRepo = createMockProgressRepository(null);

    const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);
    const result = await useCase.execute({ courseId: 'course-1' });

    expect(result.chapters[0].lessons[0].isUnlocked).toBe(true);
  });

  it('should mark current lesson correctly', async () => {
    const course = createMockCourse();
    const courseRepo = createMockCourseRepository(course);
    const progressRepo = createMockProgressRepository(null);

    const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);
    const result = await useCase.execute({
      courseId: 'course-1',
      currentLessonId: 'lesson-1-2',
    });

    expect(result.chapters[0].lessons[0].isCurrent).toBe(false);
    expect(result.chapters[0].lessons[1].isCurrent).toBe(true);
    expect(result.chapters[0].isExpanded).toBe(true);
    expect(result.chapters[1].isExpanded).toBe(false);
  });

  it('should calculate completion rate correctly', async () => {
    const course = createMockCourse();
    const courseRepo = createMockCourseRepository(course);
    const courseId = CourseId.create('course-1');
    const progress = Progress.restore(courseId, [
      LessonProgress.create(LessonId.create('lesson-1-1')),
      LessonProgress.create(LessonId.create('lesson-1-2')),
    ]);
    const progressRepo = createMockProgressRepository(progress);

    const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);
    const result = await useCase.execute({ courseId: 'course-1' });

    // 2 out of 3 lessons completed = 67%
    expect(result.completionRate).toBe(67);
  });

  it('should throw error when course not found', async () => {
    const courseRepo = createMockCourseRepository(null);
    const progressRepo = createMockProgressRepository(null);

    const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

    await expect(useCase.execute({ courseId: 'nonexistent' })).rejects.toThrow('Course not found');
  });

  it('should mark completed lessons correctly', async () => {
    const course = createMockCourse();
    const courseRepo = createMockCourseRepository(course);
    const courseId = CourseId.create('course-1');
    const progress = Progress.restore(courseId, [
      LessonProgress.create(LessonId.create('lesson-1-1')),
    ]);
    const progressRepo = createMockProgressRepository(progress);

    const useCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);
    const result = await useCase.execute({ courseId: 'course-1' });

    expect(result.chapters[0].lessons[0].isCompleted).toBe(true);
    expect(result.chapters[0].lessons[1].isCompleted).toBe(false);
  });
});
