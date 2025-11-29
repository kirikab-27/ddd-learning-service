import { describe, it, expect } from 'vitest';
import { Question, Option } from './Question';

describe('Question', () => {
  const createValidOptions = (): Option[] => [
    { id: 'opt-1', text: 'Option A', isCorrect: true },
    { id: 'opt-2', text: 'Option B', isCorrect: false },
    { id: 'opt-3', text: 'Option C', isCorrect: false },
  ];

  describe('create', () => {
    it('should create with valid params', () => {
      const question = Question.create({
        id: 'q-1',
        text: 'What is DDD?',
        options: createValidOptions(),
        explanation: 'DDD stands for Domain-Driven Design',
      });

      expect(question.id).toBe('q-1');
      expect(question.text).toBe('What is DDD?');
      expect(question.options).toHaveLength(3);
      expect(question.explanation).toBe('DDD stands for Domain-Driven Design');
    });

    it('should trim whitespace', () => {
      const question = Question.create({
        id: '  q-1  ',
        text: '  What is DDD?  ',
        options: createValidOptions(),
        explanation: '  DDD explanation  ',
      });

      expect(question.id).toBe('q-1');
      expect(question.text).toBe('What is DDD?');
      expect(question.explanation).toBe('DDD explanation');
    });

    it('should throw for empty id', () => {
      expect(() =>
        Question.create({
          id: '',
          text: 'What is DDD?',
          options: createValidOptions(),
          explanation: 'Explanation',
        })
      ).toThrow('Question id cannot be empty');
    });

    it('should throw for empty text', () => {
      expect(() =>
        Question.create({
          id: 'q-1',
          text: '',
          options: createValidOptions(),
          explanation: 'Explanation',
        })
      ).toThrow('Question text cannot be empty');
    });

    it('should throw for less than 2 options', () => {
      expect(() =>
        Question.create({
          id: 'q-1',
          text: 'What is DDD?',
          options: [{ id: 'opt-1', text: 'Only option', isCorrect: true }],
          explanation: 'Explanation',
        })
      ).toThrow('Question must have at least 2 options');
    });

    it('should throw for no correct option', () => {
      expect(() =>
        Question.create({
          id: 'q-1',
          text: 'What is DDD?',
          options: [
            { id: 'opt-1', text: 'Option A', isCorrect: false },
            { id: 'opt-2', text: 'Option B', isCorrect: false },
          ],
          explanation: 'Explanation',
        })
      ).toThrow('Question must have exactly one correct option');
    });

    it('should throw for multiple correct options', () => {
      expect(() =>
        Question.create({
          id: 'q-1',
          text: 'What is DDD?',
          options: [
            { id: 'opt-1', text: 'Option A', isCorrect: true },
            { id: 'opt-2', text: 'Option B', isCorrect: true },
          ],
          explanation: 'Explanation',
        })
      ).toThrow('Question must have exactly one correct option');
    });

    it('should throw for empty explanation', () => {
      expect(() =>
        Question.create({
          id: 'q-1',
          text: 'What is DDD?',
          options: createValidOptions(),
          explanation: '',
        })
      ).toThrow('Question explanation cannot be empty');
    });
  });

  describe('correctOptionId', () => {
    it('should return the correct option id', () => {
      const question = Question.create({
        id: 'q-1',
        text: 'What is DDD?',
        options: createValidOptions(),
        explanation: 'Explanation',
      });

      expect(question.correctOptionId).toBe('opt-1');
    });
  });

  describe('isCorrect', () => {
    it('should return true for correct answer', () => {
      const question = Question.create({
        id: 'q-1',
        text: 'What is DDD?',
        options: createValidOptions(),
        explanation: 'Explanation',
      });

      expect(question.isCorrect('opt-1')).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      const question = Question.create({
        id: 'q-1',
        text: 'What is DDD?',
        options: createValidOptions(),
        explanation: 'Explanation',
      });

      expect(question.isCorrect('opt-2')).toBe(false);
      expect(question.isCorrect('opt-3')).toBe(false);
    });

    it('should return false for non-existent option', () => {
      const question = Question.create({
        id: 'q-1',
        text: 'What is DDD?',
        options: createValidOptions(),
        explanation: 'Explanation',
      });

      expect(question.isCorrect('non-existent')).toBe(false);
    });
  });
});
