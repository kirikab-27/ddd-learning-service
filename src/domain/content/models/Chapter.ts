import { ChapterId, LessonId } from '@/domain/shared';
import { Lesson } from './Lesson';

export interface ChapterCreateParams {
  id: ChapterId;
  title: string;
  order: number;
  lessons: Lesson[];
}

export class Chapter {
  private constructor(
    private readonly _id: ChapterId,
    private readonly _title: string,
    private readonly _order: number,
    private readonly _lessons: Lesson[]
  ) {}

  static create(params: ChapterCreateParams): Chapter {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Chapter title cannot be empty');
    }
    if (params.order < 1) {
      throw new Error('Chapter order must be positive');
    }

    const sortedLessons = [...params.lessons].sort((a, b) => a.order - b.order);

    return new Chapter(
      params.id,
      params.title.trim(),
      params.order,
      sortedLessons
    );
  }

  get id(): ChapterId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get order(): number {
    return this._order;
  }

  get lessons(): readonly Lesson[] {
    return this._lessons;
  }

  get lessonCount(): number {
    return this._lessons.length;
  }

  findLesson(lessonId: LessonId): Lesson | undefined {
    return this._lessons.find(lesson => lesson.id.equals(lessonId));
  }

  hasLesson(lessonId: LessonId): boolean {
    return this._lessons.some(lesson => lesson.id.equals(lessonId));
  }

  getFirstLesson(): Lesson | undefined {
    return this._lessons[0];
  }

  getLastLesson(): Lesson | undefined {
    return this._lessons[this._lessons.length - 1];
  }

  equals(other: Chapter): boolean {
    return this._id.equals(other._id);
  }
}
