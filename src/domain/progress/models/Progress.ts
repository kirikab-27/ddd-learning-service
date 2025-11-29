import { CourseId, LessonId } from '@/domain/shared';
import { LessonProgress } from './LessonProgress';

/**
 * 学習進捗を表す集約ルート
 * コースに対する完了済みレッスンを管理する
 */
export class Progress {
  private constructor(
    private readonly _courseId: CourseId,
    private readonly _completedLessons: Map<string, LessonProgress>
  ) {}

  /**
   * 新規の進捗を作成する
   */
  static create(courseId: CourseId): Progress {
    return new Progress(courseId, new Map());
  }

  /**
   * 永続化データから進捗を復元する
   */
  static restore(
    courseId: CourseId,
    completedLessons: LessonProgress[]
  ): Progress {
    const map = new Map<string, LessonProgress>();
    completedLessons.forEach(lp => {
      map.set(lp.lessonId.toString(), lp);
    });
    return new Progress(courseId, map);
  }

  get courseId(): CourseId {
    return this._courseId;
  }

  get completedLessons(): readonly LessonProgress[] {
    return Array.from(this._completedLessons.values());
  }

  get completedCount(): number {
    return this._completedLessons.size;
  }

  /**
   * 指定したレッスンが完了済みかどうかを判定する
   */
  hasCompletedLesson(lessonId: LessonId): boolean {
    return this._completedLessons.has(lessonId.toString());
  }

  /**
   * レッスンを完了としてマークする
   * 不変性を保つため、新しいProgressインスタンスを返す
   */
  markLessonAsCompleted(lessonId: LessonId): Progress {
    if (this.hasCompletedLesson(lessonId)) {
      return this;
    }
    const newMap = new Map(this._completedLessons);
    newMap.set(lessonId.toString(), LessonProgress.create(lessonId));
    return new Progress(this._courseId, newMap);
  }

  /**
   * 進捗率を計算する（0-100の整数）
   */
  calculateCompletionRate(totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((this.completedCount / totalLessons) * 100);
  }
}
