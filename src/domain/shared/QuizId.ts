/**
 * クイズの識別子を表す値オブジェクト
 */
export class QuizId {
  private constructor(private readonly value: string) {}

  static create(value: string): QuizId {
    if (!value || value.trim() === '') {
      throw new Error('QuizId cannot be empty');
    }
    return new QuizId(value.trim());
  }

  equals(other: QuizId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
