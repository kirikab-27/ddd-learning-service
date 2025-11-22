import { QuizResult } from './QuizResult';
import { QuizId, CourseId } from '@/domain/shared';

describe('QuizResult', () => {
  const quizId = QuizId.create('quiz-1');
  const courseId = CourseId.create('course-1');

  describe('create', () => {
    it('should create a QuizResult with valid params', () => {
      const result = QuizResult.create({
        quizId,
        courseId,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
      });

      expect(result.quizId.equals(quizId)).toBe(true);
      expect(result.courseId.equals(courseId)).toBe(true);
      expect(result.score).toBe(80);
      expect(result.totalQuestions).toBe(5);
      expect(result.correctAnswers).toBe(4);
      expect(result.completedAt).toBeInstanceOf(Date);
    });

    it('should create with custom completedAt', () => {
      const completedAt = new Date('2024-01-01T00:00:00Z');
      const result = QuizResult.create({
        quizId,
        courseId,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        completedAt,
      });

      expect(result.completedAt).toEqual(completedAt);
    });

    it('should throw error for invalid score (negative)', () => {
      expect(() => QuizResult.create({
        quizId,
        courseId,
        score: -1,
        totalQuestions: 5,
        correctAnswers: 0,
      })).toThrow('Score must be between 0 and 100');
    });

    it('should throw error for invalid score (over 100)', () => {
      expect(() => QuizResult.create({
        quizId,
        courseId,
        score: 101,
        totalQuestions: 5,
        correctAnswers: 5,
      })).toThrow('Score must be between 0 and 100');
    });

    it('should throw error for invalid totalQuestions', () => {
      expect(() => QuizResult.create({
        quizId,
        courseId,
        score: 80,
        totalQuestions: 0,
        correctAnswers: 0,
      })).toThrow('Total questions must be at least 1');
    });

    it('should throw error for invalid correctAnswers (negative)', () => {
      expect(() => QuizResult.create({
        quizId,
        courseId,
        score: 80,
        totalQuestions: 5,
        correctAnswers: -1,
      })).toThrow('Correct answers must be between 0 and total questions');
    });

    it('should throw error for invalid correctAnswers (exceeds total)', () => {
      expect(() => QuizResult.create({
        quizId,
        courseId,
        score: 100,
        totalQuestions: 5,
        correctAnswers: 6,
      })).toThrow('Correct answers must be between 0 and total questions');
    });
  });

  describe('isPassing', () => {
    it('should return true for score >= 70', () => {
      const result = QuizResult.create({
        quizId,
        courseId,
        score: 70,
        totalQuestions: 10,
        correctAnswers: 7,
      });

      expect(result.isPassing).toBe(true);
    });

    it('should return false for score < 70', () => {
      const result = QuizResult.create({
        quizId,
        courseId,
        score: 60,
        totalQuestions: 10,
        correctAnswers: 6,
      });

      expect(result.isPassing).toBe(false);
    });
  });
});
