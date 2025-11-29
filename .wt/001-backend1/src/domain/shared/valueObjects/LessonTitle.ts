export class LessonTitle {
  private constructor(private readonly value: string) {}

  static create(value: string): LessonTitle {
    if (!value || value.trim() === '') {
      throw new Error('LessonTitle cannot be empty');
    }
    if (value.length > 200) {
      throw new Error('LessonTitle cannot exceed 200 characters');
    }
    return new LessonTitle(value.trim());
  }

  toString(): string {
    return this.value;
  }

  equals(other: LessonTitle): boolean {
    return this.value === other.value;
  }
}
