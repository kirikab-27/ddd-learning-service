import { describe, it, expect } from 'vitest';
import { Quiz } from './Quiz';
import { Question, Option } from './Question';
import { QuizId, LessonId } from '@/domain/shared';

describe('Quiz', () => {
  const createValidOptions = (): Option[] => [
    { id: 'opt-1', text: 'Option A', isCorrect: true },
    { id: 'opt-2', text: 'Option B', isCorrect: false },
    { id: 'opt-3', text: 'Option C', isCorrect: false },
  ];

  const createQuestion = (id: string, correctOptionId: string = 'opt-1'): Question => {
    const options: Option[] = [
      { id: 'opt-1', text: 'Option A', isCorrect: correctOptionId === 'opt-1' },
      { id: 'opt-2', text: 'Option B', isCorrect: correctOptionId === 'opt-2' },
      { id: 'opt-3', text: 'Option C', isCorrect: correctOptionId === 'opt-3' },
    ];
    return Question.create({
      id,
      text: `Question ${id}`,
      options,
      explanation: `Explanation for ${id}`,
    });
  };

  describe('create', () => {
    it('should create with valid params', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'DDD Basics Quiz',
        description: 'Test your knowledge of DDD',
        questions: [createQuestion('q-1')],
      });

      expect(quiz.id.toString()).toBe('quiz-1');
      expect(quiz.lessonId.toString()).toBe('lesson-1');
      expect(quiz.title).toBe('DDD Basics Quiz');
      expect(quiz.description).toBe('Test your knowledge of DDD');
      expect(quiz.questions).toHaveLength(1);
      expect(quiz.questionCount).toBe(1);
    });

    it('should create with empty description', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'DDD Basics Quiz',
        questions: [createQuestion('q-1')],
      });

      expect(quiz.description).toBe('');
    });

    it('should trim title and description', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: '  DDD Basics Quiz  ',
        description: '  Test your knowledge  ',
        questions: [createQuestion('q-1')],
      });

      expect(quiz.title).toBe('DDD Basics Quiz');
      expect(quiz.description).toBe('Test your knowledge');
    });

    it('should throw for empty title', () => {
      expect(() =>
        Quiz.create({
          id: QuizId.create('quiz-1'),
          lessonId: LessonId.create('lesson-1'),
          title: '',
          questions: [createQuestion('q-1')],
        })
      ).toThrow('Quiz title cannot be empty');
    });

    it('should throw for no questions', () => {
      expect(() =>
        Quiz.create({
          id: QuizId.create('quiz-1'),
          lessonId: LessonId.create('lesson-1'),
          title: 'DDD Basics Quiz',
          questions: [],
        })
      ).toThrow('Quiz must have at least one question');
    });
  });

  describe('calculateScore', () => {
    it('should return 100 for all correct answers', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'Quiz',
        questions: [
          createQuestion('q-1', 'opt-1'),
          createQuestion('q-2', 'opt-2'),
        ],
      });

      const answers = new Map([
        ['q-1', 'opt-1'],
        ['q-2', 'opt-2'],
      ]);

      expect(quiz.calculateScore(answers)).toBe(100);
    });

    it('should return 0 for all incorrect answers', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'Quiz',
        questions: [
          createQuestion('q-1', 'opt-1'),
          createQuestion('q-2', 'opt-2'),
        ],
      });

      const answers = new Map([
        ['q-1', 'opt-2'],
        ['q-2', 'opt-1'],
      ]);

      expect(quiz.calculateScore(answers)).toBe(0);
    });

    it('should return 50 for half correct answers', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'Quiz',
        questions: [
          createQuestion('q-1', 'opt-1'),
          createQuestion('q-2', 'opt-2'),
        ],
      });

      const answers = new Map([
        ['q-1', 'opt-1'],
        ['q-2', 'opt-1'],
      ]);

      expect(quiz.calculateScore(answers)).toBe(50);
    });

    it('should handle unanswered questions as incorrect', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'Quiz',
        questions: [
          createQuestion('q-1', 'opt-1'),
          createQuestion('q-2', 'opt-2'),
        ],
      });

      const answers = new Map([['q-1', 'opt-1']]);

      expect(quiz.calculateScore(answers)).toBe(50);
    });

    it('should handle empty answers', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'Quiz',
        questions: [createQuestion('q-1', 'opt-1')],
      });

      const answers = new Map<string, string>();

      expect(quiz.calculateScore(answers)).toBe(0);
    });

    it('should round score to nearest integer', () => {
      const quiz = Quiz.create({
        id: QuizId.create('quiz-1'),
        lessonId: LessonId.create('lesson-1'),
        title: 'Quiz',
        questions: [
          createQuestion('q-1', 'opt-1'),
          createQuestion('q-2', 'opt-2'),
          createQuestion('q-3', 'opt-3'),
        ],
      });

      const answers = new Map([['q-1', 'opt-1']]);

      expect(quiz.calculateScore(answers)).toBe(33); // 1/3 = 33.33... rounds to 33
    });
  });
});
