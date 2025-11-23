'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/presentation/hooks/useQuiz';
import { SubmitQuizOutput } from '@/application/usecases';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

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
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-8 text-center">
        <p className="text-slate-400">クイズを読み込んでいます...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-8 text-center">
        <p className="text-red-400">エラーが発生しました: {error.message}</p>
        <button onClick={handleBack} className="px-8 py-3 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg text-sm cursor-pointer transition-colors hover:bg-slate-600">
          レッスンに戻る
        </button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-8 text-center">
        <p className="text-slate-400">このレッスンにはクイズがありません。</p>
        <button onClick={handleBack} className="px-8 py-3 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg text-sm cursor-pointer transition-colors hover:bg-slate-600">
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
    <div className="max-w-3xl mx-auto">
      <header className="p-6 text-center border-b border-slate-700">
        <h1 className="text-2xl font-semibold text-slate-50 mb-2">{quiz.title}</h1>
        {quiz.description && <p className="text-sm text-slate-400">{quiz.description}</p>}
      </header>

      <QuizProgress current={currentQuestionIndex + 1} total={quiz.questions.length} />

      <div className="min-h-[300px]">
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

      <div className="flex justify-between gap-4 p-6 border-t border-slate-700 max-sm:flex-col">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-8 py-3 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg text-sm cursor-pointer transition-colors hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full"
        >
          前の問題
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || isSubmitting}
            className="px-8 py-3 bg-blue-600 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-colors hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full"
          >
            {isSubmitting ? '送信中...' : '回答を送信'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOptionId}
            className="px-8 py-3 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg text-sm cursor-pointer transition-colors hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full"
          >
            次の問題
          </button>
        )}
      </div>

      <div className="flex justify-center gap-2 p-6 flex-wrap">
        {quiz.questions.map((q, index) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors ${
              index === currentQuestionIndex
                ? 'bg-blue-600 border-blue-600 text-white'
                : answers.has(q.id)
                ? 'bg-slate-700 border-green-500 text-green-400 border-2'
                : 'bg-slate-700 border-slate-600 text-slate-400 border-2 hover:border-blue-500 hover:text-blue-400'
            }`}
            aria-label={`問題 ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
