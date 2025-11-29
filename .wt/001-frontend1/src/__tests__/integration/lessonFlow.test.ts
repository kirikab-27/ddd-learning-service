import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetLessonUseCase } from '@/application/usecases/GetLessonUseCase';
import { GetCourseNavigationUseCase } from '@/application/usecases/GetCourseNavigationUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';
import { CourseId, LessonId } from '@/domain/shared';
import { Progress } from '@/domain/progress/models/Progress';
import { LessonProgress } from '@/domain/progress/models/LessonProgress';

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('Lesson Flow Integration', () => {
  let courseRepo: InMemoryCourseRepository;
  let progressRepo: LocalStorageProgressRepository;

  beforeEach(() => {
    courseRepo = new InMemoryCourseRepository(sampleCourses);
    progressRepo = new LocalStorageProgressRepository();
    localStorageMock.clear();
  });

  it('should load first lesson successfully', async () => {
    const useCase = new GetLessonUseCase(courseRepo, progressRepo);

    const result = await useCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1-1',
    });

    expect(result.lesson.title).toBe('なぜDDDが必要なのか');
    expect(result.isUnlocked).toBe(true);
  });

  it('should lock second lesson when first is not completed', async () => {
    const useCase = new GetLessonUseCase(courseRepo, progressRepo);

    const result = await useCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1-2',
    });

    expect(result.isUnlocked).toBe(false);
  });

  it('should unlock second lesson when first is completed', async () => {
    // Set up progress with first lesson completed
    const courseId = CourseId.create('ddd-practice');
    const progress = Progress.create(courseId).markLessonAsCompleted(
      LessonId.create('lesson-1-1')
    );
    await progressRepo.save(progress);

    const useCase = new GetLessonUseCase(courseRepo, progressRepo);

    const result = await useCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1-2',
    });

    expect(result.isUnlocked).toBe(true);
  });

  it('should show correct navigation with progress', async () => {
    const navUseCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

    const result = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-1-1',
    });

    expect(result.chapters.length).toBeGreaterThan(0);
    expect(result.completionRate).toBe(0);

    const firstLesson = result.chapters[0].lessons[0];
    expect(firstLesson.isUnlocked).toBe(true);
    expect(firstLesson.isCurrent).toBe(true);
  });

  it('should calculate completion rate correctly', async () => {
    // Complete 2 out of 14 lessons (14%)
    const courseId = CourseId.create('ddd-practice');
    const progress = Progress.create(courseId)
      .markLessonAsCompleted(LessonId.create('lesson-1-1'))
      .markLessonAsCompleted(LessonId.create('lesson-1-2'));
    await progressRepo.save(progress);

    const navUseCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

    const result = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-1-3',
    });

    expect(result.completionRate).toBe(14);
  });

  it('should provide correct navigation links', async () => {
    const useCase = new GetLessonUseCase(courseRepo, progressRepo);

    const result = await useCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1-2',
    });

    expect(result.navigation.previous).not.toBeNull();
    expect(result.navigation.previous?.lessonId).toBe('lesson-1-1');
    expect(result.navigation.next).not.toBeNull();
    expect(result.navigation.next?.lessonId).toBe('lesson-1-3');
  });
});
