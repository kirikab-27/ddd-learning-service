import { Quiz } from '@/domain/content/models/Quiz';
import { QuizId } from '../QuizId';
import { LessonId } from '../LessonId';

export interface IQuizRepository {
  findById(id: QuizId): Promise<Quiz | null>;
  findByLessonId(lessonId: LessonId): Promise<Quiz | null>;
}
