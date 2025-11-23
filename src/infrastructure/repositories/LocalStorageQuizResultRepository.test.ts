import { LocalStorageQuizResultRepository } from './LocalStorageQuizResultRepository';
import { QuizResult } from '@/domain/progress/models/QuizResult';
import { QuizId, CourseId } from '@/domain/shared';

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

describe('LocalStorageQuizResultRepository', () => {
  let repository: LocalStorageQuizResultRepository;
  const courseId = CourseId.create('course-1');
  const quizId = QuizId.create('quiz-1');

  beforeEach(() => {
    localStorageMock.clear();
    repository = new LocalStorageQuizResultRepository();
  });

  describe('save', () => {
    it('should save quiz result', async () => {
      const result = QuizResult.create({
        quizId,
        courseId,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
      });

      await repository.save(result);

      const stored = localStorageMock.getItem('ddd-learning-quiz-result-course-1');
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].quizId).toBe('quiz-1');
      expect(parsed[0].score).toBe(80);
    });

    it('should overwrite existing result for same quiz', async () => {
      const result1 = QuizResult.create({
        quizId,
        courseId,
        score: 60,
        totalQuestions: 5,
        correctAnswers: 3,
      });

      const result2 = QuizResult.create({
        quizId,
        courseId,
        score: 100,
        totalQuestions: 5,
        correctAnswers: 5,
      });

      await repository.save(result1);
      await repository.save(result2);

      const results = await repository.findByCourseId(courseId);
      expect(results).toHaveLength(1);
      expect(results[0].score).toBe(100);
    });
  });

  describe('findByQuizId', () => {
    it('should return saved quiz result', async () => {
      const result = QuizResult.create({
        quizId,
        courseId,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
      });

      await repository.save(result);
      const found = await repository.findByQuizId(quizId, courseId);

      expect(found).not.toBeNull();
      expect(found!.score).toBe(80);
      expect(found!.quizId.equals(quizId)).toBe(true);
    });

    it('should return null for non-existent quiz result', async () => {
      const result = await repository.findByQuizId(quizId, courseId);
      expect(result).toBeNull();
    });
  });

  describe('findByCourseId', () => {
    it('should return all quiz results for course', async () => {
      const result1 = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
      });

      const result2 = QuizResult.create({
        quizId: QuizId.create('quiz-2'),
        courseId,
        score: 90,
        totalQuestions: 5,
        correctAnswers: 4,
      });

      await repository.save(result1);
      await repository.save(result2);

      const results = await repository.findByCourseId(courseId);
      expect(results).toHaveLength(2);
    });

    it('should return empty array for course with no results', async () => {
      const results = await repository.findByCourseId(courseId);
      expect(results).toEqual([]);
    });
  });
});
