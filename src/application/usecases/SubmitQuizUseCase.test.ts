import { describe, it, expect, beforeEach } from 'vitest';
import { SubmitQuizUseCase } from './SubmitQuizUseCase';
import { IQuizRepository } from '@/domain/shared/repositories/IQuizRepository';
import { Quiz, Question } from '@/domain/content/models';
import { QuizId, LessonId } from '@/domain/shared';

describe('SubmitQuizUseCase', () => {
  let quizRepository: IQuizRepository;
  let useCase: SubmitQuizUseCase;
  let testQuiz: Quiz;

  const createQuestion = (id: string, correctOptionId: string): Question => {
    return Question.create({
      id,
      text: `Question ${id}?`,
      options: [
        { id: 'opt-a', text: 'Option A', isCorrect: correctOptionId === 'opt-a' },
        { id: 'opt-b', text: 'Option B', isCorrect: correctOptionId === 'opt-b' },
        { id: 'opt-c', text: 'Option C', isCorrect: correctOptionId === 'opt-c' },
      ],
      explanation: `The correct answer is ${correctOptionId}`,
    });
  };

  beforeEach(() => {
    testQuiz = Quiz.create({
      id: QuizId.create('quiz-1'),
      lessonId: LessonId.create('lesson-1'),
      title: 'Test Quiz',
      description: 'A test quiz',
      questions: [
        createQuestion('q1', 'opt-a'),
        createQuestion('q2', 'opt-b'),
        createQuestion('q3', 'opt-c'),
        createQuestion('q4', 'opt-a'),
        createQuestion('q5', 'opt-b'),
      ],
    });

    quizRepository = {
      findById: async (id: QuizId) =>
        id.toString() === 'quiz-1' ? testQuiz : null,
    };

    useCase = new SubmitQuizUseCase(quizRepository);
  });

  describe('execute', () => {
    it('should calculate score and return results', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' }, // correct
          { questionId: 'q2', selectedOptionId: 'opt-b' }, // correct
          { questionId: 'q3', selectedOptionId: 'opt-c' }, // correct
          { questionId: 'q4', selectedOptionId: 'opt-b' }, // wrong
          { questionId: 'q5', selectedOptionId: 'opt-c' }, // wrong
        ],
      });

      expect(result.score).toBe(60);
      expect(result.isPassed).toBe(true);
      expect(result.results).toHaveLength(5);
    });

    it('should return isPassed=true for score >= 60', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' },
          { questionId: 'q2', selectedOptionId: 'opt-b' },
          { questionId: 'q3', selectedOptionId: 'opt-c' },
          { questionId: 'q4', selectedOptionId: 'opt-a' },
          { questionId: 'q5', selectedOptionId: 'opt-c' }, // wrong (1 wrong out of 5 = 80%)
        ],
      });

      expect(result.score).toBe(80);
      expect(result.isPassed).toBe(true);
    });

    it('should return isPassed=false for score < 60', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' }, // correct
          { questionId: 'q2', selectedOptionId: 'opt-a' }, // wrong
          { questionId: 'q3', selectedOptionId: 'opt-a' }, // wrong
          { questionId: 'q4', selectedOptionId: 'opt-b' }, // wrong
          { questionId: 'q5', selectedOptionId: 'opt-c' }, // wrong (1 correct out of 5 = 20%)
        ],
      });

      expect(result.score).toBe(20);
      expect(result.isPassed).toBe(false);
    });

    it('should return 100% for all correct answers', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' },
          { questionId: 'q2', selectedOptionId: 'opt-b' },
          { questionId: 'q3', selectedOptionId: 'opt-c' },
          { questionId: 'q4', selectedOptionId: 'opt-a' },
          { questionId: 'q5', selectedOptionId: 'opt-b' },
        ],
      });

      expect(result.score).toBe(100);
      expect(result.isPassed).toBe(true);
    });

    it('should return 0% for all wrong answers', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-b' },
          { questionId: 'q2', selectedOptionId: 'opt-a' },
          { questionId: 'q3', selectedOptionId: 'opt-a' },
          { questionId: 'q4', selectedOptionId: 'opt-b' },
          { questionId: 'q5', selectedOptionId: 'opt-c' },
        ],
      });

      expect(result.score).toBe(0);
      expect(result.isPassed).toBe(false);
    });

    it('should return correct/incorrect info for each question', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' }, // correct
          { questionId: 'q2', selectedOptionId: 'opt-a' }, // wrong
          { questionId: 'q3', selectedOptionId: 'opt-c' }, // correct
          { questionId: 'q4', selectedOptionId: 'opt-a' }, // correct
          { questionId: 'q5', selectedOptionId: 'opt-c' }, // wrong
        ],
      });

      expect(result.results[0].isCorrect).toBe(true);
      expect(result.results[0].correctOptionId).toBe('opt-a');

      expect(result.results[1].isCorrect).toBe(false);
      expect(result.results[1].correctOptionId).toBe('opt-b');

      expect(result.results[2].isCorrect).toBe(true);
      expect(result.results[3].isCorrect).toBe(true);
      expect(result.results[4].isCorrect).toBe(false);
    });

    it('should include explanation in results', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' },
          { questionId: 'q2', selectedOptionId: 'opt-b' },
          { questionId: 'q3', selectedOptionId: 'opt-c' },
          { questionId: 'q4', selectedOptionId: 'opt-a' },
          { questionId: 'q5', selectedOptionId: 'opt-b' },
        ],
      });

      expect(result.results[0].explanation).toBe('The correct answer is opt-a');
    });

    it('should throw error when quiz not found', async () => {
      await expect(
        useCase.execute({
          courseId: 'course-1',
          lessonId: 'lesson-1',
          quizId: 'non-existent',
          answers: [],
        })
      ).rejects.toThrow('Quiz not found');
    });

    it('should treat unanswered questions as wrong', async () => {
      const result = await useCase.execute({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        quizId: 'quiz-1',
        answers: [
          { questionId: 'q1', selectedOptionId: 'opt-a' }, // correct
          // q2-q5 not answered
        ],
      });

      expect(result.score).toBe(20); // 1 out of 5
      expect(result.isPassed).toBe(false);
      expect(result.results[0].isCorrect).toBe(true);
      expect(result.results[1].isCorrect).toBe(false);
      expect(result.results[2].isCorrect).toBe(false);
      expect(result.results[3].isCorrect).toBe(false);
      expect(result.results[4].isCorrect).toBe(false);
    });
  });
});
