import { IQuizRepository } from '@/domain/shared/repositories/IQuizRepository';
import { QuizId, CourseId } from '@/domain/shared';

export interface SubmitQuizInput {
  courseId: string;
  lessonId: string;
  quizId: string;
  answers: Array<{ questionId: string; selectedOptionId: string }>;
}

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  correctOptionId: string;
  explanation: string;
}

export interface SubmitQuizOutput {
  score: number;
  isPassed: boolean;
  results: QuestionResult[];
}

const PASSING_SCORE = 60;

/**
 * Use case for submitting quiz answers and calculating results.
 */
export class SubmitQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(input: SubmitQuizInput): Promise<SubmitQuizOutput> {
    const quizId = QuizId.create(input.quizId);

    // Fetch the quiz
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Build answers map from user input
    const answersMap = new Map<string, string>();
    for (const answer of input.answers) {
      answersMap.set(answer.questionId, answer.selectedOptionId);
    }

    // Process each question and build results
    const results: QuestionResult[] = [];

    for (const question of quiz.questions) {
      const selectedOptionId = answersMap.get(question.id);
      const isCorrect = selectedOptionId ? question.isCorrect(selectedOptionId) : false;

      results.push({
        questionId: question.id,
        isCorrect,
        correctOptionId: question.correctOptionId,
        explanation: question.explanation,
      });
    }

    // Calculate score using Quiz's method
    const score = quiz.calculateScore(answersMap);
    const isPassed = score >= PASSING_SCORE;

    return {
      score,
      isPassed,
      results,
    };
  }
}
