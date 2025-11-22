import { Lesson } from '../models/Lesson';
import { Course } from '../models/Course';
import { Progress } from '@/domain/progress/models/Progress';

export class LessonUnlockSpecification {
  isSatisfiedBy(lesson: Lesson, course: Course, progress: Progress): boolean {
    // 最初のレッスンは常にアンロック
    if (lesson.order === 1) {
      const chapter = course.chapters.find(c => c.id.toString() === lesson.chapterId);
      if (chapter && chapter.order === 1) {
        return true;
      }
    }

    // 前のレッスンが完了していればアンロック
    const previousLesson = this.findPreviousLesson(lesson, course);
    if (!previousLesson) {
      return true; // 前のレッスンがなければアンロック
    }

    return progress.hasCompletedLesson(previousLesson.id);
  }

  private findPreviousLesson(currentLesson: Lesson, course: Course): Lesson | null {
    const currentChapter = course.chapters.find(c => c.id.toString() === currentLesson.chapterId);
    if (!currentChapter) return null;

    // 同じチャプター内で前のレッスンを探す
    const lessonInSameChapter = currentChapter.lessons.find(
      l => l.order === currentLesson.order - 1
    );
    if (lessonInSameChapter) return lessonInSameChapter;

    // 前のチャプターの最後のレッスンを探す
    const previousChapter = course.chapters.find(c => c.order === currentChapter.order - 1);
    if (!previousChapter || previousChapter.lessons.length === 0) return null;

    const sortedLessons = [...previousChapter.lessons].sort((a, b) => b.order - a.order);
    return sortedLessons[0];
  }
}
