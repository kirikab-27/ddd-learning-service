import { LessonId } from './LessonId';

describe('LessonId', () => {
  describe('create', () => {
    it('should create with valid value', () => {
      const id = LessonId.create('lesson-1');
      expect(id.toString()).toBe('lesson-1');
    });

    it('should trim whitespace', () => {
      const id = LessonId.create('  lesson-1  ');
      expect(id.toString()).toBe('lesson-1');
    });

    it('should throw for empty string', () => {
      expect(() => LessonId.create('')).toThrow('cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => LessonId.create('   ')).toThrow('cannot be empty');
    });
  });

  describe('equals', () => {
    it('should be equal with same value', () => {
      const a = LessonId.create('lesson-1');
      const b = LessonId.create('lesson-1');
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal with different value', () => {
      const a = LessonId.create('lesson-1');
      const b = LessonId.create('lesson-2');
      expect(a.equals(b)).toBe(false);
    });
  });
});
