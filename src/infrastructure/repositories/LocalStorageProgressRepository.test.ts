import { LocalStorageProgressRepository } from './LocalStorageProgressRepository';
import { Progress } from '@/domain/progress/models/Progress';
import { CourseId, LessonId } from '@/domain/shared';

describe('LocalStorageProgressRepository', () => {
  let repository: LocalStorageProgressRepository;
  let mockStorage: Record<string, string>;
  let mockLocalStorage: Storage;

  beforeEach(() => {
    mockStorage = {};

    mockLocalStorage = {
      getItem: jest.fn((key: string) => mockStorage[key] ?? null),
      setItem: jest.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: jest.fn(() => {
        mockStorage = {};
      }),
      length: 0,
      key: jest.fn(() => null),
    };

    // windowオブジェクトのlocalStorageをモック
    Object.defineProperty(global, 'window', {
      value: { localStorage: mockLocalStorage },
      writable: true,
    });
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    repository = new LocalStorageProgressRepository();
  });

  describe('findByCourseId', () => {
    it('保存済みの進捗を取得できる', async () => {
      const courseId = CourseId.create('course-1');
      mockStorage['ddd-learning-progress-course-1'] = JSON.stringify({
        courseId: 'course-1',
        completedLessons: [
          { lessonId: 'lesson-1', completedAt: '2024-01-15T10:00:00.000Z' },
        ],
      });

      const result = await repository.findByCourseId(courseId);

      expect(result).not.toBeNull();
      expect(result?.completedCount).toBe(1);
      expect(result?.hasCompletedLesson(LessonId.create('lesson-1'))).toBe(true);
    });

    it('未保存の場合はnullを返す', async () => {
      const courseId = CourseId.create('course-1');

      const result = await repository.findByCourseId(courseId);

      expect(result).toBeNull();
    });

    it('不正なJSONの場合はnullを返す', async () => {
      const courseId = CourseId.create('course-1');
      mockStorage['ddd-learning-progress-course-1'] = 'invalid json';

      const result = await repository.findByCourseId(courseId);

      expect(result).toBeNull();
    });
  });

  describe('save', () => {
    it('進捗を保存できる', async () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'));

      await repository.save(progress);

      const stored = JSON.parse(mockStorage['ddd-learning-progress-course-1']);
      expect(stored.courseId).toBe('course-1');
      expect(stored.completedLessons).toHaveLength(1);
      expect(stored.completedLessons[0].lessonId).toBe('lesson-1');
    });

    it('保存した進捗を再度取得できる', async () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'))
        .markLessonAsCompleted(LessonId.create('lesson-2'));

      await repository.save(progress);
      const result = await repository.findByCourseId(courseId);

      expect(result?.completedCount).toBe(2);
      expect(result?.hasCompletedLesson(LessonId.create('lesson-1'))).toBe(true);
      expect(result?.hasCompletedLesson(LessonId.create('lesson-2'))).toBe(true);
    });
  });
});
