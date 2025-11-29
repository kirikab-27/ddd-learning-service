import { LessonId, QuizId } from '@/domain/shared';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';

/**
 * レッスンを表すエンティティ
 */
export class Lesson {
  private constructor(
    private readonly _id: LessonId,
    private readonly _title: LessonTitle,
    private readonly _content: MarkdownContent,
    private readonly _order: number,
    private readonly _quizId: QuizId | null
  ) {}

  static create(params: {
    id: LessonId;
    title: LessonTitle;
    content: MarkdownContent;
    order: number;
    quizId?: QuizId;
  }): Lesson {
    if (params.order < 1) {
      throw new Error('Lesson order must be positive');
    }
    return new Lesson(
      params.id,
      params.title,
      params.content,
      params.order,
      params.quizId ?? null
    );
  }

  get id(): LessonId {
    return this._id;
  }

  get title(): LessonTitle {
    return this._title;
  }

  get content(): MarkdownContent {
    return this._content;
  }

  get order(): number {
    return this._order;
  }

  get quizId(): QuizId | null {
    return this._quizId;
  }

  hasQuiz(): boolean {
    return this._quizId !== null;
  }

  equals(other: Lesson): boolean {
    return this._id.equals(other._id);
  }
}
