import { ChapterId } from './ChapterId';

describe('ChapterId', () => {
  describe('create', () => {
    it('should create with valid value', () => {
      const id = ChapterId.create('chapter-1');
      expect(id.toString()).toBe('chapter-1');
    });

    it('should trim whitespace', () => {
      const id = ChapterId.create('  chapter-1  ');
      expect(id.toString()).toBe('chapter-1');
    });

    it('should throw for empty string', () => {
      expect(() => ChapterId.create('')).toThrow('cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => ChapterId.create('   ')).toThrow('cannot be empty');
    });
  });

  describe('equals', () => {
    it('should be equal with same value', () => {
      const a = ChapterId.create('chapter-1');
      const b = ChapterId.create('chapter-1');
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal with different value', () => {
      const a = ChapterId.create('chapter-1');
      const b = ChapterId.create('chapter-2');
      expect(a.equals(b)).toBe(false);
    });
  });
});
