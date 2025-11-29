import { LocalStorageQuizResultRepository } from './LocalStorageQuizResultRepository';
import { QuizResult } from '@/domain/progress/models/QuizResult';
import { createAnswer } from '@/domain/progress/models/Answer';
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

  // Helper to create answers with specified correct count
  const createAnswers = (totalQuestions: number, correctCount: number) => {
    return Array.from({ length: totalQuestions }, (_, i) =>
      createAnswer(`q${i + 1}`, `opt-${i + 1}`, i < correctCount)
    );
  };

  beforeEach(() => {
    localStorageMock.clear();
    repository = new LocalStorageQuizResultRepository();
  });

  describe('save', () => {
    it('should save quiz result', async () => {
      const result = QuizResult.create({
        quizId,
        courseId,
        answers: createAnswers(5, 4), // 80%
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
        answers: createAnswers(5, 3), // 60%
      });

      const result2 = QuizResult.create({
        quizId,
        courseId,
        answers: createAnswers(5, 5), // 100%
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
        answers: createAnswers(5, 4), // 80%
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
        answers: createAnswers(5, 4), // 80%
      });

      const result2 = QuizResult.create({
        quizId: QuizId.create('quiz-2'),
        courseId,
        answers: createAnswers(5, 5), // 100%
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
