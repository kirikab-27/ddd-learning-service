import { QuizId, CourseId } from '@/domain/shared';
import { Answer } from './Answer';

export interface QuizResultCreateParams {
  quizId: QuizId;
  courseId: CourseId;
  answers: Answer[];
}

/**
 * Aggregate root representing the result of a quiz attempt.
 *
 * Business Rules:
 * - Score is calculated as percentage of correct answers (0-100)
 * - A quiz is passed if score >= 60%
 */
export class QuizResult {
  private static readonly PASSING_SCORE = 60;

  private constructor(
    private readonly _id: string,
    private readonly _quizId: QuizId,
    private readonly _courseId: CourseId,
    private readonly _answers: readonly Answer[],
    private readonly _score: number,
    private readonly _completedAt: Date
  ) {}

  static create(params: QuizResultCreateParams): QuizResult {
    if (!params.answers || params.answers.length === 0) {
      throw new Error('QuizResult must have at least one answer');
    }

    const score = QuizResult.calculateScore(params.answers);
    const id = QuizResult.generateId();

    return new QuizResult(
      id,
      params.quizId,
      params.courseId,
      [...params.answers],
      score,
      new Date()
    );
  }

  private static calculateScore(answers: Answer[]): number {
    if (answers.length === 0) {
      return 0;
    }

    const correctCount = answers.filter(a => a.isCorrect).length;
    return Math.round((correctCount / answers.length) * 100);
  }

  private static generateId(): string {
    // Simple UUID v4 generation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  get id(): string {
    return this._id;
  }

  get quizId(): QuizId {
    return this._quizId;
  }

  get courseId(): CourseId {
    return this._courseId;
  }

  get answers(): readonly Answer[] {
    return this._answers;
  }

  get score(): number {
    return this._score;
  }

  get isPassed(): boolean {
    return this._score >= QuizResult.PASSING_SCORE;
  }

  get completedAt(): Date {
    return this._completedAt;
  }

  get correctCount(): number {
    return this._answers.filter(a => a.isCorrect).length;
  }

  get totalQuestions(): number {
    return this._answers.length;
  }
}
