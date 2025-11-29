import { IQuizRepository } from '@/domain/shared/repositories/IQuizRepository';
import { Quiz } from '@/domain/content/models/Quiz';
import { QuizId, LessonId } from '@/domain/shared';

export class InMemoryQuizRepository implements IQuizRepository {
  private quizzes: Map<string, Quiz> = new Map();
  private quizzesByLesson: Map<string, Quiz> = new Map();

  constructor(initialQuizzes: Quiz[] = []) {
    initialQuizzes.forEach(quiz => {
      this.quizzes.set(quiz.id.toString(), quiz);
      this.quizzesByLesson.set(quiz.lessonId.toString(), quiz);
    });
  }

  async findById(id: QuizId): Promise<Quiz | null> {
    return this.quizzes.get(id.toString()) ?? null;
  }

  async findByLessonId(lessonId: LessonId): Promise<Quiz | null> {
    return this.quizzesByLesson.get(lessonId.toString()) ?? null;
  }
}
