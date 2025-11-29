import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';
import { Lesson } from '../models/Lesson';
import { Progress } from '@/domain/progress';

/**
 * レッスンナビゲーションのドメインサービス
 */
export class LessonNavigationService {
  /**
   * 次に学習すべきレッスンを特定する
   * - 未完了の最初のレッスンを返す
   * - すべて完了している場合は最後のレッスンを返す
   *
   * 戻り値は { chapter, lesson } のペアを返す（Course.findLesson と一貫性を持たせる）
   */
  findNextLessonToStudy(
    course: Course,
    progress: Progress
  ): { chapter: Chapter; lesson: Lesson } | null {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (!progress.hasCompletedLesson(lesson.id)) {
          return { chapter, lesson };
        }
      }
    }

    // すべて完了 → 最後のチャプターの最後のレッスン
    const lastChapter = course.chapters[course.chapters.length - 1];
    if (!lastChapter || lastChapter.lessons.length === 0) {
      return null;
    }
    const lastLesson = lastChapter.lessons[lastChapter.lessons.length - 1];
    return { chapter: lastChapter, lesson: lastLesson };
  }
}
