import { LessonTitle } from './LessonTitle';

describe('LessonTitle', () => {
  describe('create', () => {
    it('正常な値でインスタンスを作成できる', () => {
      const title = LessonTitle.create('DDDの基礎');
      expect(title.toString()).toBe('DDDの基礎');
    });

    it('前後の空白がトリムされる', () => {
      const title = LessonTitle.create('  DDDの基礎  ');
      expect(title.toString()).toBe('DDDの基礎');
    });

    it('空文字列はエラー', () => {
      expect(() => LessonTitle.create('')).toThrow('LessonTitle cannot be empty');
    });

    it('空白のみはエラー', () => {
      expect(() => LessonTitle.create('   ')).toThrow('LessonTitle cannot be empty');
    });

    it('nullはエラー', () => {
      expect(() => LessonTitle.create(null as unknown as string)).toThrow('LessonTitle cannot be empty');
    });

    it('undefinedはエラー', () => {
      expect(() => LessonTitle.create(undefined as unknown as string)).toThrow('LessonTitle cannot be empty');
    });

    it('100文字以下は許容される', () => {
      const title = LessonTitle.create('a'.repeat(100));
      expect(title.toString().length).toBe(100);
    });

    it('100文字を超えるとエラー', () => {
      expect(() => LessonTitle.create('a'.repeat(101))).toThrow('LessonTitle cannot exceed 100 characters');
    });
  });

  describe('equals', () => {
    it('同じ値のタイトルは等しい', () => {
      const title1 = LessonTitle.create('DDDの基礎');
      const title2 = LessonTitle.create('DDDの基礎');
      expect(title1.equals(title2)).toBe(true);
    });

    it('異なる値のタイトルは等しくない', () => {
      const title1 = LessonTitle.create('DDDの基礎');
      const title2 = LessonTitle.create('DDDの応用');
      expect(title1.equals(title2)).toBe(false);
    });
  });
});
