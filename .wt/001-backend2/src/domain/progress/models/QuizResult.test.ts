import { describe, it, expect } from 'vitest';
import { QuizResult } from './QuizResult';
import { QuizId, CourseId } from '@/domain/shared';
import { createAnswer } from './Answer';

describe('QuizResult', () => {
  const createTestAnswers = (correctCount: number, totalCount: number) => {
    const answers = [];
    for (let i = 0; i < totalCount; i++) {
      answers.push(
        createAnswer(`q${i + 1}`, `opt${i + 1}`, i < correctCount)
      );
    }
    return answers;
  };

  describe('create', () => {
    it('should create a QuizResult with valid params', () => {
      const answers = createTestAnswers(3, 5);

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.quizId.toString()).toBe('quiz-1');
      expect(result.courseId.toString()).toBe('course-1');
      expect(result.answers).toHaveLength(5);
      expect(result.id).toBeDefined();
      expect(result.completedAt).toBeInstanceOf(Date);
    });

    it('should throw error when no answers provided', () => {
      expect(() =>
        QuizResult.create({
          quizId: QuizId.create('quiz-1'),
          courseId: CourseId.create('course-1'),
          answers: [],
        })
      ).toThrow('QuizResult must have at least one answer');
    });

    it('should generate unique ids', () => {
      const answers = createTestAnswers(1, 1);
      const params = {
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      };

      const result1 = QuizResult.create(params);
      const result2 = QuizResult.create(params);

      expect(result1.id).not.toBe(result2.id);
    });
  });

  describe('score calculation', () => {
    it('should calculate score as percentage of correct answers', () => {
      const answers = createTestAnswers(3, 5); // 60%

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.score).toBe(60);
    });

    it('should return 0 for all incorrect answers', () => {
      const answers = createTestAnswers(0, 5);

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.score).toBe(0);
    });

    it('should return 100 for all correct answers', () => {
      const answers = createTestAnswers(5, 5);

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.score).toBe(100);
    });

    it('should round score to nearest integer', () => {
      const answers = createTestAnswers(1, 3); // 33.33...%

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.score).toBe(33);
    });
  });

  describe('isPassed', () => {
    it('should return true for score >= 60', () => {
      const answers = createTestAnswers(3, 5); // 60%

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.isPassed).toBe(true);
    });

    it('should return true for score > 60', () => {
      const answers = createTestAnswers(4, 5); // 80%

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.isPassed).toBe(true);
    });

    it('should return false for score < 60', () => {
      const answers = createTestAnswers(2, 5); // 40%

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.isPassed).toBe(false);
    });

    it('should return true for 100% score', () => {
      const answers = createTestAnswers(5, 5);

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.isPassed).toBe(true);
    });
  });

  describe('getters', () => {
    it('should return correctCount', () => {
      const answers = createTestAnswers(3, 5);

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.correctCount).toBe(3);
    });

    it('should return totalQuestions', () => {
      const answers = createTestAnswers(3, 5);

      const result = QuizResult.create({
        quizId: QuizId.create('quiz-1'),
        courseId: CourseId.create('course-1'),
        answers,
      });

      expect(result.totalQuestions).toBe(5);
    });
  });
});
