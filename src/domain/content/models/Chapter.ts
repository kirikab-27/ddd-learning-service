import { ChapterId } from '@/domain/shared';
import { LessonId } from '@/domain/shared';
import { Lesson } from './Lesson';

/**
 * チャプターを表すエンティティ
 */
export class Chapter {
  private constructor(
    private readonly _id: ChapterId,
    private readonly _title: string,
    private readonly _order: number,
    private readonly _lessons: Lesson[]
  ) {}

  static create(params: {
    id: ChapterId;
    title: string;
    order: number;
    lessons: Lesson[];
  }): Chapter {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Chapter title cannot be empty');
    }
    if (params.order < 1) {
      throw new Error('Chapter order must be positive');
    }
    // レッスンを順序でソート
    const sortedLessons = [...params.lessons].sort((a, b) => a.order - b.order);
    return new Chapter(params.id, params.title.trim(), params.order, sortedLessons);
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

  equals(other: Chapter): boolean {
    return this._id.equals(other._id);
  }
}
