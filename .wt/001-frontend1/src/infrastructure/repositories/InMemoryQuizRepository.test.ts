import { InMemoryQuizRepository } from './InMemoryQuizRepository';
import { Quiz } from '@/domain/content/models/Quiz';
import { Question } from '@/domain/content/models/Question';
import { QuizId, LessonId } from '@/domain/shared';

describe('InMemoryQuizRepository', () => {
  const createSampleQuiz = (id: string, lessonId: string): Quiz => {
    const question = Question.create({
      id: 'q1',
      text: 'Sample question?',
      options: [
        { id: 'a', text: 'Option A', isCorrect: true },
        { id: 'b', text: 'Option B', isCorrect: false },
      ],
      explanation: 'Sample explanation',
    });

    return Quiz.create({
      id: QuizId.create(id),
      lessonId: LessonId.create(lessonId),
      title: 'Sample Quiz',
      questions: [question],
    });
  };

  describe('findById', () => {
    it('should return quiz by id', async () => {
      const quiz = createSampleQuiz('quiz-1', 'lesson-1');
      const repository = new InMemoryQuizRepository([quiz]);

      const result = await repository.findById(QuizId.create('quiz-1'));

      expect(result).not.toBeNull();
      expect(result!.id.toString()).toBe('quiz-1');
    });

    it('should return null for non-existent quiz', async () => {
      const repository = new InMemoryQuizRepository();
      const result = await repository.findById(QuizId.create('non-existent'));

      expect(result).toBeNull();
    });
  });

  describe('findByLessonId', () => {
    it('should return quiz by lesson id', async () => {
      const quiz = createSampleQuiz('quiz-1', 'lesson-1');
      const repository = new InMemoryQuizRepository([quiz]);

      const result = await repository.findByLessonId(LessonId.create('lesson-1'));

      expect(result).not.toBeNull();
      expect(result!.lessonId.toString()).toBe('lesson-1');
    });

    it('should return null for non-existent lesson', async () => {
      const repository = new InMemoryQuizRepository();
      const result = await repository.findByLessonId(LessonId.create('non-existent'));

      expect(result).toBeNull();
    });
  });
});
