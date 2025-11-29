import { MarkdownContent } from './MarkdownContent';

describe('MarkdownContent', () => {
  describe('create', () => {
    it('正常な値でインスタンスを作成できる', () => {
      const content = MarkdownContent.create('# Hello World');
      expect(content.raw).toBe('# Hello World');
    });

    it('空文字列でもインスタンスを作成できる', () => {
      const content = MarkdownContent.create('');
      expect(content.raw).toBe('');
    });

    it('nullは空文字列として扱われる', () => {
      const content = MarkdownContent.create(null as unknown as string);
      expect(content.raw).toBe('');
    });

    it('undefinedは空文字列として扱われる', () => {
      const content = MarkdownContent.create(undefined as unknown as string);
      expect(content.raw).toBe('');
    });
  });

  describe('isEmpty', () => {
    it('空文字列は空と判定される', () => {
      const content = MarkdownContent.create('');
      expect(content.isEmpty()).toBe(true);
    });

    it('空白のみは空と判定される', () => {
      const content = MarkdownContent.create('   ');
      expect(content.isEmpty()).toBe(true);
    });

    it('内容があれば空ではない', () => {
      const content = MarkdownContent.create('# Hello');
      expect(content.isEmpty()).toBe(false);
    });
  });

  describe('equals', () => {
    it('同じ内容のコンテンツは等しい', () => {
      const content1 = MarkdownContent.create('# Hello');
      const content2 = MarkdownContent.create('# Hello');
      expect(content1.equals(content2)).toBe(true);
    });

    it('異なる内容のコンテンツは等しくない', () => {
      const content1 = MarkdownContent.create('# Hello');
      const content2 = MarkdownContent.create('# World');
      expect(content1.equals(content2)).toBe(false);
    });
  });
});
