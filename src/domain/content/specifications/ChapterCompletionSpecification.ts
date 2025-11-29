import { Chapter } from '../models/Chapter';
import { Progress } from '@/domain/progress';

/**
 * チャプターが完了しているかを判定する仕様
 * ルール: 全レッスンが完了していれば完了
 */
export class ChapterCompletionSpecification {
  isSatisfiedBy(chapter: Chapter, progress: Progress): boolean {
    if (chapter.lessonCount === 0) {
      return true;
    }
    return chapter.lessons.every(lesson =>
      progress.hasCompletedLesson(lesson.id)
    );
  }
}
