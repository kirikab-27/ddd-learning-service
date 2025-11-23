import { Quiz } from '@/domain/content/models/Quiz';
import { QuizId } from '../QuizId';

export interface IQuizRepository {
  findById(id: QuizId): Promise<Quiz | null>;
  findByLessonId(lessonId: string): Promise<Quiz | null>;
}
