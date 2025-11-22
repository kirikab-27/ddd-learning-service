import { IQuizResultRepository } from '@/domain/shared/repositories/IQuizResultRepository';
import { QuizResult } from '@/domain/progress/models/QuizResult';
import { QuizId, CourseId } from '@/domain/shared';

const STORAGE_KEY_PREFIX = 'ddd-learning-quiz-result-';

interface StoredQuizResult {
  quizId: string;
  courseId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
}

export class LocalStorageQuizResultRepository implements IQuizResultRepository {
  private getStorageKey(courseId: CourseId): string {
    return STORAGE_KEY_PREFIX + courseId.toString();
  }

  private getAllResults(courseId: CourseId): StoredQuizResult[] {
    if (typeof window === 'undefined') {
      return [];
    }

    const key = this.getStorageKey(courseId);
    const stored = localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  private saveAllResults(courseId: CourseId, results: StoredQuizResult[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    const key = this.getStorageKey(courseId);
    localStorage.setItem(key, JSON.stringify(results));
  }

  async save(result: QuizResult): Promise<void> {
    const results = this.getAllResults(result.courseId);

    // Remove existing result for same quiz if exists
    const filteredResults = results.filter(r => r.quizId !== result.quizId.toString());

    // Add new result
    filteredResults.push({
      quizId: result.quizId.toString(),
      courseId: result.courseId.toString(),
      score: result.score,
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      completedAt: result.completedAt.toISOString(),
    });

    this.saveAllResults(result.courseId, filteredResults);
  }

  async findByQuizId(quizId: QuizId, courseId: CourseId): Promise<QuizResult | null> {
    const results = this.getAllResults(courseId);
    const stored = results.find(r => r.quizId === quizId.toString());

    if (!stored) {
      return null;
    }

    return QuizResult.create({
      quizId: QuizId.create(stored.quizId),
      courseId: CourseId.create(stored.courseId),
      score: stored.score,
      totalQuestions: stored.totalQuestions,
      correctAnswers: stored.correctAnswers,
      completedAt: new Date(stored.completedAt),
    });
  }

  async findByCourseId(courseId: CourseId): Promise<QuizResult[]> {
    const storedResults = this.getAllResults(courseId);

    return storedResults.map(stored =>
      QuizResult.create({
        quizId: QuizId.create(stored.quizId),
        courseId: CourseId.create(stored.courseId),
        score: stored.score,
        totalQuestions: stored.totalQuestions,
        correctAnswers: stored.correctAnswers,
        completedAt: new Date(stored.completedAt),
      })
    );
  }
}
