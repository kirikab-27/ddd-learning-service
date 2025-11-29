import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CompleteLessonUseCase } from '@/application/usecases/CompleteLessonUseCase';
import { GetLessonUseCase } from '@/application/usecases/GetLessonUseCase';
import { GetCourseNavigationUseCase } from '@/application/usecases/GetCourseNavigationUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { sampleCourses } from '@/infrastructure/data/sampleCourses';

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

describe('Progress Flow Integration', () => {
  let courseRepo: InMemoryCourseRepository;
  let progressRepo: LocalStorageProgressRepository;

  beforeEach(() => {
    courseRepo = new InMemoryCourseRepository(sampleCourses);
    progressRepo = new LocalStorageProgressRepository();
    localStorageMock.clear();
  });

  it('should complete lesson and persist progress', async () => {
    const completeUseCase = new CompleteLessonUseCase(courseRepo, progressRepo);
    const getLessonUseCase = new GetLessonUseCase(courseRepo, progressRepo);

    // Initially lesson is not completed
    const beforeComplete = await getLessonUseCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });
    expect(beforeComplete.isCompleted).toBe(false);

    // Complete the lesson
    await completeUseCase.execute({
      courseId: 'ddd-practice',
      lessonId: 'lesson-1',
    });

    // Verify lesson is now completed
    const afterComplete = await getLessonUseCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });
    expect(afterComplete.isCompleted).toBe(true);
  });

  it('should unlock next lesson after completing current', async () => {
    const completeUseCase = new CompleteLessonUseCase(courseRepo, progressRepo);
    const getLessonUseCase = new GetLessonUseCase(courseRepo, progressRepo);

    // Second lesson is initially locked
    const beforeComplete = await getLessonUseCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-2',
    });
    expect(beforeComplete.isUnlocked).toBe(false);

    // Complete first lesson
    await completeUseCase.execute({
      courseId: 'ddd-practice',
      lessonId: 'lesson-1',
    });

    // Second lesson should now be unlocked
    const afterComplete = await getLessonUseCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-2',
    });
    expect(afterComplete.isUnlocked).toBe(true);
  });

  it('should update completion rate in navigation', async () => {
    const completeUseCase = new CompleteLessonUseCase(courseRepo, progressRepo);
    const navUseCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

    // Initially 0% completion
    const beforeNav = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-1',
    });
    expect(beforeNav.completionRate).toBe(0);

    // Complete first lesson (1 of 4 = 25%)
    await completeUseCase.execute({
      courseId: 'ddd-practice',
      lessonId: 'lesson-1',
    });

    const afterOneLesson = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-2',
    });
    expect(afterOneLesson.completionRate).toBe(25);

    // Complete second lesson (2 of 4 = 50%)
    await completeUseCase.execute({
      courseId: 'ddd-practice',
      lessonId: 'lesson-2',
    });

    const afterTwoLessons = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-3',
    });
    expect(afterTwoLessons.completionRate).toBe(50);
  });

  it('should mark completed lessons in sidebar navigation', async () => {
    const completeUseCase = new CompleteLessonUseCase(courseRepo, progressRepo);
    const navUseCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

    // Complete first lesson
    await completeUseCase.execute({
      courseId: 'ddd-practice',
      lessonId: 'lesson-1',
    });

    const nav = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-2',
    });

    // First lesson should be marked as completed
    expect(nav.chapters[0].lessons[0].isCompleted).toBe(true);
    // Second lesson should not be completed yet
    expect(nav.chapters[0].lessons[1].isCompleted).toBe(false);
  });

  it('should persist progress across repository instances', async () => {
    const completeUseCase = new CompleteLessonUseCase(courseRepo, progressRepo);

    // Complete lesson with first repository instance
    await completeUseCase.execute({
      courseId: 'ddd-practice',
      lessonId: 'lesson-1',
    });

    // Create new repository instance (simulates page reload)
    const newProgressRepo = new LocalStorageProgressRepository();
    const getLessonUseCase = new GetLessonUseCase(courseRepo, newProgressRepo);

    // Progress should be persisted
    const result = await getLessonUseCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });
    expect(result.isCompleted).toBe(true);
  });
});
