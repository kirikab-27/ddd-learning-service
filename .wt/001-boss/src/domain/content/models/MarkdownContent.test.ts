import { MarkdownContent } from './MarkdownContent';

describe('MarkdownContent', () => {
  describe('create', () => {
    it('should create MarkdownContent with valid content', () => {
      const content = MarkdownContent.create('# Hello World');
      expect(content.raw).toBe('# Hello World');
    });

    it('should handle empty string', () => {
      const content = MarkdownContent.create('');
      expect(content.raw).toBe('');
    });

    it('should handle null/undefined by returning empty string', () => {
      const content1 = MarkdownContent.create(null as unknown as string);
      const content2 = MarkdownContent.create(undefined as unknown as string);
      expect(content1.raw).toBe('');
      expect(content2.raw).toBe('');
    });

    it('should preserve markdown formatting', () => {
      const markdown = `# Title

## Section 1

- Item 1
- Item 2

\`\`\`typescript
const x = 1;
\`\`\`
`;
      const content = MarkdownContent.create(markdown);
      expect(content.raw).toBe(markdown);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty content', () => {
      const content = MarkdownContent.create('');
      expect(content.isEmpty()).toBe(true);
    });

    it('should return true for whitespace-only content', () => {
      const content = MarkdownContent.create('   \n\t  ');
      expect(content.isEmpty()).toBe(true);
    });

    it('should return false for non-empty content', () => {
      const content = MarkdownContent.create('# Title');
      expect(content.isEmpty()).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true for equal content', () => {
      const content1 = MarkdownContent.create('# Test');
      const content2 = MarkdownContent.create('# Test');
      expect(content1.equals(content2)).toBe(true);
    });

    it('should return false for different content', () => {
      const content1 = MarkdownContent.create('# Test 1');
      const content2 = MarkdownContent.create('# Test 2');
      expect(content1.equals(content2)).toBe(false);
    });

    it('should consider whitespace in equality', () => {
      const content1 = MarkdownContent.create('# Test');
      const content2 = MarkdownContent.create('# Test ');
      expect(content1.equals(content2)).toBe(false);
    });
  });
});
