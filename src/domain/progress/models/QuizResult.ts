import { QuizId, CourseId } from '@/domain/shared';

export interface QuizResultCreateParams {
  quizId: QuizId;
  courseId: CourseId;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt?: Date;
}

export class QuizResult {
  private constructor(
    private readonly _quizId: QuizId,
    private readonly _courseId: CourseId,
    private readonly _score: number,
    private readonly _totalQuestions: number,
    private readonly _correctAnswers: number,
    private readonly _completedAt: Date
  ) {}

  static create(params: QuizResultCreateParams): QuizResult {
    if (params.score < 0 || params.score > 100) {
      throw new Error('Score must be between 0 and 100');
    }
    if (params.totalQuestions < 1) {
      throw new Error('Total questions must be at least 1');
    }
    if (params.correctAnswers < 0 || params.correctAnswers > params.totalQuestions) {
      throw new Error('Correct answers must be between 0 and total questions');
    }

    return new QuizResult(
      params.quizId,
      params.courseId,
      params.score,
      params.totalQuestions,
      params.correctAnswers,
      params.completedAt ?? new Date()
    );
  }

  get quizId(): QuizId {
    return this._quizId;
  }

  get courseId(): CourseId {
    return this._courseId;
  }

  get score(): number {
    return this._score;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  get correctAnswers(): number {
    return this._correctAnswers;
  }

  get completedAt(): Date {
    return this._completedAt;
  }

  get isPassing(): boolean {
    return this._score >= 70;
  }
}
