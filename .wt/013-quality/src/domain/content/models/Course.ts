import { CourseId, LessonId } from '@/domain/shared';
import { Chapter } from './Chapter';
import { Lesson } from './Lesson';

export interface CourseCreateParams {
  id: CourseId;
  title: string;
  description: string;
  chapters: Chapter[];
}

export interface LessonLocation {
  chapter: Chapter;
  lesson: Lesson;
}

export interface AdjacentLessons {
  previous: Lesson | null;
  next: Lesson | null;
}

export class Course {
  private constructor(
    private readonly _id: CourseId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _chapters: Chapter[]
  ) {}

  static create(params: CourseCreateParams): Course {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Course title cannot be empty');
    }

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

  get chapterCount(): number {
    return this._chapters.length;
  }

  get totalLessons(): number {
    return this._chapters.reduce((sum, chapter) => sum + chapter.lessonCount, 0);
  }

  getAllLessons(): Lesson[] {
    return this._chapters.flatMap(chapter => [...chapter.lessons]);
  }

  findLesson(lessonId: LessonId): LessonLocation | undefined {
    for (const chapter of this._chapters) {
      const lesson = chapter.findLesson(lessonId);
      if (lesson) {
        return { chapter, lesson };
      }
    }
    return undefined;
  }

  getAdjacentLessons(lessonId: LessonId): AdjacentLessons {
    const allLessons = this.getAllLessons();
    const lessonIndex = allLessons.findIndex(l => l.id.equals(lessonId));

    if (lessonIndex === -1) {
      return { previous: null, next: null };
    }

    return {
      previous: lessonIndex > 0 ? allLessons[lessonIndex - 1] : null,
      next: lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null,
    };
  }

  getFirstLesson(): Lesson | undefined {
    const firstChapter = this._chapters[0];
    return firstChapter?.getFirstLesson();
  }

  getLastLesson(): Lesson | undefined {
    const lastChapter = this._chapters[this._chapters.length - 1];
    return lastChapter?.getLastLesson();
  }

  equals(other: Course): boolean {
    return this._id.equals(other._id);
  }
}
