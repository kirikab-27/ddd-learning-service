/**
 * レッスンの識別子を表す値オブジェクト
 */
export class LessonId {
  private constructor(private readonly value: string) {}

  static create(value: string): LessonId {
    if (!value || value.trim() === '') {
      throw new Error('LessonId cannot be empty');
    }
    return new LessonId(value.trim());
  }

  equals(other: LessonId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
