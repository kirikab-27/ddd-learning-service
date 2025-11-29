/**
 * Markdownコンテンツを表す値オブジェクト
 */
export class MarkdownContent {
  private constructor(private readonly value: string) {}

  static create(value: string): MarkdownContent {
    return new MarkdownContent(value || '');
  }

  get raw(): string {
    return this.value;
  }

  isEmpty(): boolean {
    return this.value.trim() === '';
  }

  equals(other: MarkdownContent): boolean {
    return this.value === other.value;
  }
}
