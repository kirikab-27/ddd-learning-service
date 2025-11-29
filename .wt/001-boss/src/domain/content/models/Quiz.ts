import { QuizId, LessonId } from '@/domain/shared';
import { Question } from './Question';

export interface QuizCreateParams {
  id: QuizId;
  lessonId: LessonId;
  title: string;
  description?: string;
  questions: Question[];
}

export class Quiz {
  private constructor(
    private readonly _id: QuizId,
    private readonly _lessonId: LessonId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _questions: readonly Question[]
  ) {}

  static create(params: QuizCreateParams): Quiz {
    if (!params.title || params.title.trim() === '') {
      throw new Error('Quiz title cannot be empty');
    }
    if (!params.questions || params.questions.length === 0) {
      throw new Error('Quiz must have at least one question');
    }

    return new Quiz(
      params.id,
      params.lessonId,
      params.title.trim(),
      params.description?.trim() ?? '',
      [...params.questions]
    );
  }

  get id(): QuizId {
    return this._id;
  }

  get lessonId(): LessonId {
    return this._lessonId;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get questions(): readonly Question[] {
    return this._questions;
  }

  get questionCount(): number {
    return this._questions.length;
  }

  calculateScore(answers: Map<string, string>): number {
    if (this._questions.length === 0) {
      return 0;
    }

    let correctCount = 0;
    for (const question of this._questions) {
      const selectedOptionId = answers.get(question.id);
      if (selectedOptionId && question.isCorrect(selectedOptionId)) {
        correctCount++;
      }
    }

    return Math.round((correctCount / this._questions.length) * 100);
  }
}
