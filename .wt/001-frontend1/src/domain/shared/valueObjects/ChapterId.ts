export class ChapterId {
  private constructor(private readonly value: string) {}

  static create(value: string): ChapterId {
    if (!value || value.trim() === '') {
      throw new Error('ChapterId cannot be empty');
    }
    return new ChapterId(value.trim());
  }

  toString(): string {
    return this.value;
  }

  equals(other: ChapterId): boolean {
    return this.value === other.value;
  }
}
