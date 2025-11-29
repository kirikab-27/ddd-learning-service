import { LessonTitle } from './LessonTitle';

describe('LessonTitle', () => {
  describe('create', () => {
    it('should create a valid LessonTitle', () => {
      const title = LessonTitle.create('Introduction to DDD');
      expect(title.toString()).toBe('Introduction to DDD');
    });

    it('should trim whitespace', () => {
      const title = LessonTitle.create('  Hello World  ');
      expect(title.toString()).toBe('Hello World');
    });

    it('should throw error for empty string', () => {
      expect(() => LessonTitle.create('')).toThrow('LessonTitle cannot be empty');
    });

    it('should throw error for whitespace-only string', () => {
      expect(() => LessonTitle.create('   ')).toThrow('LessonTitle cannot be empty');
    });

    it('should throw error for null/undefined', () => {
      expect(() => LessonTitle.create(null as unknown as string)).toThrow('LessonTitle cannot be empty');
      expect(() => LessonTitle.create(undefined as unknown as string)).toThrow('LessonTitle cannot be empty');
    });

    it('should throw error when exceeding max length', () => {
      const longTitle = 'a'.repeat(101);
      expect(() => LessonTitle.create(longTitle)).toThrow('LessonTitle cannot exceed 100 characters');
    });

    it('should allow exactly max length', () => {
      const maxTitle = 'a'.repeat(100);
      const title = LessonTitle.create(maxTitle);
      expect(title.toString()).toBe(maxTitle);
    });
  });

  describe('equals', () => {
    it('should return true for equal titles', () => {
      const title1 = LessonTitle.create('Test Title');
      const title2 = LessonTitle.create('Test Title');
      expect(title1.equals(title2)).toBe(true);
    });

    it('should return false for different titles', () => {
      const title1 = LessonTitle.create('Title One');
      const title2 = LessonTitle.create('Title Two');
      expect(title1.equals(title2)).toBe(false);
    });
  });
});
