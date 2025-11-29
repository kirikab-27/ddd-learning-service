export class LessonTitle {
  private static readonly MAX_LENGTH = 100;

  private constructor(private readonly value: string) {}

  static create(value: string): LessonTitle {
    const trimmed = value?.trim() ?? '';
    if (trimmed === '') {
      throw new Error('LessonTitle cannot be empty');
    }
    if (trimmed.length > LessonTitle.MAX_LENGTH) {
      throw new Error(`LessonTitle cannot exceed ${LessonTitle.MAX_LENGTH} characters`);
    }
    return new LessonTitle(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: LessonTitle): boolean {
    return this.value === other.value;
  }
}
