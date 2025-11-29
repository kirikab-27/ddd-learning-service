import { QuizId } from './QuizId';

describe('QuizId', () => {
  describe('create', () => {
    it('should create with valid value', () => {
      const id = QuizId.create('quiz-1');
      expect(id.toString()).toBe('quiz-1');
    });

    it('should trim whitespace', () => {
      const id = QuizId.create('  quiz-1  ');
      expect(id.toString()).toBe('quiz-1');
    });

    it('should throw for empty string', () => {
      expect(() => QuizId.create('')).toThrow('cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => QuizId.create('   ')).toThrow('cannot be empty');
    });
  });

  describe('equals', () => {
    it('should be equal with same value', () => {
      const a = QuizId.create('quiz-1');
      const b = QuizId.create('quiz-1');
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal with different value', () => {
      const a = QuizId.create('quiz-1');
      const b = QuizId.create('quiz-2');
      expect(a.equals(b)).toBe(false);
    });
  });
});
