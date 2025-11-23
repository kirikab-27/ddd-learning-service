'use client';

import { useState, useEffect, useCallback } from 'react';
import { Quiz } from '@/domain/content/models';
import { SubmitQuizUseCase, SubmitQuizOutput } from '@/application/usecases';
import { InMemoryQuizRepository } from '@/infrastructure/repositories';

export interface UseQuizResult {
  quiz: Quiz | null;
  isLoading: boolean;
  error: Error | null;
  submitQuiz: (answers: Map<string, string>) => Promise<SubmitQuizOutput>;
  isSubmitting: boolean;
}

export function useQuiz(lessonId: string, courseId: string): UseQuizResult {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const quizRepository = new InMemoryQuizRepository();
        const foundQuiz = await quizRepository.findByLessonId(lessonId);

        setQuiz(foundQuiz);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch quiz'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [lessonId]);

  const submitQuiz = useCallback(async (answers: Map<string, string>): Promise<SubmitQuizOutput> => {
    if (!quiz) {
      throw new Error('Quiz not loaded');
    }

    setIsSubmitting(true);
    try {
      const quizRepository = new InMemoryQuizRepository();
      const submitQuizUseCase = new SubmitQuizUseCase(quizRepository);

      const answersArray = Array.from(answers.entries()).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      }));

      const result = await submitQuizUseCase.execute({
        courseId,
        lessonId,
        quizId: quiz.id.toString(),
        answers: answersArray,
      });

      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quiz, courseId, lessonId]);

  return {
    quiz,
    isLoading,
    error,
    submitQuiz,
    isSubmitting,
  };
}
