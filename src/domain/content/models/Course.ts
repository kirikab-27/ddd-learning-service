import { CourseId, LessonId } from '@/domain/shared';
import { Chapter } from './Chapter';
import { Lesson } from './Lesson';

/**
 * コースを表す集約ルート
 */
export class Course {
  private constructor(
    private readonly _id: CourseId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _chapters: Chapter[]
  ) {}

  static create(params: {
    id: CourseId;
    title: string;
    description: string;
    chapters: Chapter[];
  }): Course {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Course title cannot be empty');
    }
    // チャプターを順序でソート
    const sortedChapters = [...params.chapters].sort((a, b) => a.order - b.order);
    return new Course(
      params.id,
      params.title.trim(),
      params.description?.trim() ?? '',
      sortedChapters
    );
  }

  get id(): CourseId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get chapters(): readonly Chapter[] {
    return this._chapters;
  }

  get totalLessons(): number {
    return this._chapters.reduce((sum, ch) => sum + ch.lessonCount, 0);
  }

  /**
   * レッスンIDからレッスンとそのチャプターを検索
   */
  findLesson(lessonId: LessonId): { chapter: Chapter; lesson: Lesson } | undefined {
    for (const chapter of this._chapters) {
      const lesson = chapter.findLesson(lessonId);
      if (lesson) {
        return { chapter, lesson };
      }
    }
    return undefined;
  }

  /**
   * 指定したレッスンの前後のレッスンを取得
   */
  getAdjacentLessons(lessonId: LessonId): {
    previous: Lesson | null;
    next: Lesson | null;
  } {
    const allLessons = this._chapters.flatMap(ch => [...ch.lessons]);
    const currentIndex = allLessons.findIndex(l => l.id.equals(lessonId));

    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    return {
      previous: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
    };
  }

  /**
   * レッスンの順序（1始まり）を取得
   */
  getLessonOrder(lessonId: LessonId): number | undefined {
    const allLessons = this._chapters.flatMap(ch => [...ch.lessons]);
    const index = allLessons.findIndex(l => l.id.equals(lessonId));
    return index === -1 ? undefined : index + 1;
  }

  equals(other: Course): boolean {
    return this._id.equals(other._id);
  }
}
