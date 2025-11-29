import { QuizResult } from '@/domain/progress/models/QuizResult';
import { QuizId } from '../QuizId';
import { CourseId } from '../CourseId';

export interface IQuizResultRepository {
  save(result: QuizResult): Promise<void>;
  findByQuizId(quizId: QuizId, courseId: CourseId): Promise<QuizResult | null>;
  findByCourseId(courseId: CourseId): Promise<QuizResult[]>;
}
