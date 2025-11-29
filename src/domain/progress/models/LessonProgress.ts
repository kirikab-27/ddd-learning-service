import { LessonId } from '@/domain/shared';

/**
 * レッスン完了情報を表す値オブジェクト
 * 完了したレッスンIDと完了日時を保持する
 */
export class LessonProgress {
  private constructor(
    private readonly _lessonId: LessonId,
    private readonly _completedAt: Date
  ) {}

  static create(lessonId: LessonId, completedAt: Date = new Date()): LessonProgress {
    return new LessonProgress(lessonId, completedAt);
  }

  get lessonId(): LessonId {
    return this._lessonId;
  }

  get completedAt(): Date {
    return this._completedAt;
  }

  equals(other: LessonProgress): boolean {
    return this._lessonId.equals(other._lessonId);
  }
}
