/**
 * コースの識別子を表す値オブジェクト
 */
export class CourseId {
  private constructor(private readonly value: string) {}

  static create(value: string): CourseId {
    if (!value || value.trim() === '') {
      throw new Error('CourseId cannot be empty');
    }
    return new CourseId(value.trim());
  }

  equals(other: CourseId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
