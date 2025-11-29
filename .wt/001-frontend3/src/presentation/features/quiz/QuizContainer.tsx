'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/presentation/hooks/useQuiz';
import { SubmitQuizOutput } from '@/application/usecases';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import styles from './QuizContainer.module.css';

interface QuizContainerProps {
  lessonId: string;
  courseId: string;
  chapterId: string;
}

type QuizState = 'answering' | 'submitted';

interface QuestionResultDetail {
  questionId: string;
  questionText: string;
  isCorrect: boolean;
  selectedOptionText: string;
  correctOptionText: string;
  explanation: string;
}

export function QuizContainer({ lessonId, courseId, chapterId }: QuizContainerProps) {
  const router = useRouter();
  const { quiz, isLoading, error, submitQuiz, isSubmitting } = useQuiz(lessonId, courseId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [quizState, setQuizState] = useState<QuizState>('answering');
  const [result, setResult] = useState<SubmitQuizOutput | null>(null);

  const handleSelectOption = useCallback((optionId: string) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    setAnswers(prev => {
      const next = new Map(prev);
      next.set(currentQuestion.id, optionId);
      return next;
    });
  }, [quiz, currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [quiz, currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    if (!quiz) return;

    try {
      const submitResult = await submitQuiz(answers);
      setResult(submitResult);
      setQuizState('submitted');
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    }
  }, [quiz, answers, submitQuiz]);

  const handleRetry = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setResult(null);
    setQuizState('answering');
  }, []);

  const handleBack = useCallback(() => {
    router.push(`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`);
  }, [router, courseId, chapterId, lessonId]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>クイズを読み込んでいます...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>エラーが発生しました: {error.message}</p>
        <button onClick={handleBack} className={styles.backButton}>
          レッスンに戻る
        </button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className={styles.notFound}>
        <p>このレッスンにはクイズがありません。</p>
        <button onClick={handleBack} className={styles.backButton}>
          レッスンに戻る
        </button>
      </div>
    );
  }

  if (quizState === 'submitted' && result) {
    const resultsWithDetails: QuestionResultDetail[] = result.results.map(r => {
      const question = quiz.questions.find(q => q.id === r.questionId);
      const selectedOption = question?.options.find(o => o.id === answers.get(r.questionId));
      const correctOption = question?.options.find(o => o.id === r.correctOptionId);

      return {
        questionId: r.questionId,
        questionText: question?.text ?? '',
        isCorrect: r.isCorrect,
        selectedOptionText: selectedOption?.text ?? '',
        correctOptionText: correctOption?.text ?? '',
        explanation: r.explanation,
      };
    });

    return (
      <QuizResult
        score={result.score}
        isPassed={result.isPassed}
        results={resultsWithDetails}
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOptionId = answers.get(currentQuestion.id) ?? null;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const allQuestionsAnswered = quiz.questions.every(q => answers.has(q.id));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{quiz.title}</h1>
        {quiz.description && <p className={styles.description}>{quiz.description}</p>}
      </header>

      <QuizProgress current={currentQuestionIndex + 1} total={quiz.questions.length} />

      <div className={styles.questionContainer}>
        <QuizQuestion
          question={{
            id: currentQuestion.id,
            text: currentQuestion.text,
            options: currentQuestion.options.map(o => ({ id: o.id, text: o.text })),
          }}
          selectedOptionId={selectedOptionId}
          onSelect={handleSelectOption}
        />
      </div>

      <div className={styles.navigation}>
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={styles.navButton}
        >
          前の問題
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? '送信中...' : '回答を送信'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={styles.navButton}
          >
            次の問題
          </button>
        )}
      </div>

      <div className={styles.questionIndicators}>
        {quiz.questions.map((q, index) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setCurrentQuestionIndex(index)}
            className={`${styles.indicator} ${
              index === currentQuestionIndex ? styles.current : ''
            } ${answers.has(q.id) ? styles.answered : ''}`}
            aria-label={`問題 ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
