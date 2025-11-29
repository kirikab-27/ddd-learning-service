import { Lesson } from '../models/Lesson';
import { Course } from '../models/Course';
import { Progress } from '@/domain/progress';

/**
 * レッスンがアンロック（学習可能）かどうかを判定する仕様
 * ルール: 最初のレッスンは常に解放、それ以外は前のレッスン完了が必要
 */
export class LessonUnlockSpecification {
  isSatisfiedBy(lesson: Lesson, course: Course, progress: Progress): boolean {
    const allLessons = course.chapters.flatMap(ch => [...ch.lessons]);
    const lessonIndex = allLessons.findIndex(l => l.id.equals(lesson.id));

    // レッスンが見つからない場合
    if (lessonIndex === -1) return false;

    // 最初のレッスンは常にアンロック
    if (lessonIndex === 0) return true;

    // 前のレッスンが完了しているか確認
    const previousLesson = allLessons[lessonIndex - 1];
    return progress.hasCompletedLesson(previousLesson.id);
  }
}
