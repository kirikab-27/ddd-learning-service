import { LocalStorageProgressRepository } from './LocalStorageProgressRepository';
import { Progress } from '@/domain/progress/models/Progress';
import { LessonProgress } from '@/domain/progress/models/LessonProgress';
import { CourseId, LessonId } from '@/domain/shared';

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Set up global mocks
Object.defineProperty(global, 'window', {
  value: {},
  writable: true,
});

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('LocalStorageProgressRepository', () => {
  let repository: LocalStorageProgressRepository;

  beforeEach(() => {
    localStorageMock.clear();
    repository = new LocalStorageProgressRepository();
  });

  describe('findByCourseId', () => {
    it('should return null for non-existent progress', async () => {
      const courseId = CourseId.create('course-1');
      const result = await repository.findByCourseId(courseId);

      expect(result).toBeNull();
    });

    it('should return saved progress', async () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'));

      await repository.save(progress);
      const result = await repository.findByCourseId(courseId);

      expect(result).not.toBeNull();
      expect(result!.courseId.equals(courseId)).toBe(true);
      expect(result!.completedCount).toBe(1);
    });
  });

  describe('save', () => {
    it('should save progress to localStorage', async () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'))
        .markLessonAsCompleted(LessonId.create('lesson-2'));

      await repository.save(progress);

      const stored = localStorageMock.getItem('ddd-learning-progress-course-1');
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed.courseId).toBe('course-1');
      expect(parsed.completedLessons).toHaveLength(2);
    });

    it('should overwrite existing progress', async () => {
      const courseId = CourseId.create('course-1');
      const progress1 = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'));

      await repository.save(progress1);

      const progress2 = progress1.markLessonAsCompleted(LessonId.create('lesson-2'));
      await repository.save(progress2);

      const result = await repository.findByCourseId(courseId);
      expect(result!.completedCount).toBe(2);
    });
  });
});
