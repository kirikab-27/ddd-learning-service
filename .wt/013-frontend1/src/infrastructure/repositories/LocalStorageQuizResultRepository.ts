import { IQuizResultRepository } from '@/domain/shared/repositories/IQuizResultRepository';
import { QuizResult } from '@/domain/progress/models/QuizResult';
import { createAnswer } from '@/domain/progress/models/Answer';
import { QuizId, CourseId } from '@/domain/shared';

const STORAGE_KEY_PREFIX = 'ddd-learning-quiz-result-';

interface StoredAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

interface StoredQuizResult {
  id: string;
  quizId: string;
  courseId: string;
  answers: StoredAnswer[];
  score: number;
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
      id: result.id,
      quizId: result.quizId.toString(),
      courseId: result.courseId.toString(),
      answers: result.answers.map(a => ({
        questionId: a.questionId,
        selectedOptionId: a.selectedOptionId,
        isCorrect: a.isCorrect,
      })),
      score: result.score,
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

    return QuizResult.reconstruct({
      id: stored.id,
      quizId: QuizId.create(stored.quizId),
      courseId: CourseId.create(stored.courseId),
      answers: stored.answers.map(a => createAnswer(
        a.questionId,
        a.selectedOptionId,
        a.isCorrect,
      )),
      score: stored.score,
      completedAt: new Date(stored.completedAt),
    });
  }

  async findByCourseId(courseId: CourseId): Promise<QuizResult[]> {
    const storedResults = this.getAllResults(courseId);

    return storedResults.map(stored =>
      QuizResult.reconstruct({
        id: stored.id,
        quizId: QuizId.create(stored.quizId),
        courseId: CourseId.create(stored.courseId),
        answers: stored.answers.map(a => createAnswer(
          a.questionId,
          a.selectedOptionId,
          a.isCorrect,
        )),
        score: stored.score,
        completedAt: new Date(stored.completedAt),
      })
    );
  }
}
