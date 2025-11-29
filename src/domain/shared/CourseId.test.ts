import { CourseId } from './CourseId';

describe('CourseId', () => {
  describe('create', () => {
    it('should create with valid value', () => {
      const id = CourseId.create('course-1');
      expect(id.toString()).toBe('course-1');
    });

    it('should trim whitespace', () => {
      const id = CourseId.create('  course-1  ');
      expect(id.toString()).toBe('course-1');
    });

    it('should throw for empty string', () => {
      expect(() => CourseId.create('')).toThrow('cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => CourseId.create('   ')).toThrow('cannot be empty');
    });
  });

  describe('equals', () => {
    it('should be equal with same value', () => {
      const a = CourseId.create('course-1');
      const b = CourseId.create('course-1');
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal with different value', () => {
      const a = CourseId.create('course-1');
      const b = CourseId.create('course-2');
      expect(a.equals(b)).toBe(false);
    });
  });
});
