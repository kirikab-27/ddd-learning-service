'use client';

import { useState } from 'react';

interface QuizOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: QuizOption[];
}

interface QuizQuestionProps {
  question: Question;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  correctOptionId?: string;
  explanation?: string;
}

export function QuizQuestion({
  question,
  selectedOptionId,
  onSelect,
  disabled = false,
  showResult = false,
  correctOptionId,
  explanation,
}: QuizQuestionProps) {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const getOptionClassName = (optionId: string) => {
    const baseClasses = 'flex items-center gap-4 px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-lg cursor-pointer transition-all max-sm:px-4 max-sm:py-3';
    const classes = [baseClasses];

    if (selectedOptionId === optionId) {
      classes.push('border-blue-600 bg-slate-700');
    }

    if (showResult) {
      if (optionId === correctOptionId) {
        classes.push('border-green-400 bg-green-400/10');
      } else if (selectedOptionId === optionId && optionId !== correctOptionId) {
        classes.push('border-red-400 bg-red-400/10');
      }
    }

    if (disabled) {
      classes.push('cursor-not-allowed opacity-70');
    } else {
      classes.push('hover:border-blue-600 hover:bg-slate-700');
    }

    return classes.join(' ');
  };

  const isCorrectAnswer = showResult && selectedOptionId === correctOptionId;

  return (
    <div className="p-6 max-sm:p-4" data-testid="quiz-question">
      <h2 className="text-xl font-semibold text-slate-50 mb-6 leading-relaxed max-sm:text-lg">{question.text}</h2>

      <fieldset
        className="flex flex-col gap-4 border-none p-0 m-0"
        disabled={disabled}
        aria-describedby={showResult ? 'quiz-result' : undefined}
      >
        <legend className="sr-only">選択肢</legend>
        {question.options.map((option) => (
          <label
            key={option.id}
            className={getOptionClassName(option.id)}
            data-testid={`quiz-option-${option.id}`}
          >
            <input
              type="radio"
              name={`quiz-${question.id}`}
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => onSelect(option.id)}
              disabled={disabled}
              className="w-5 h-5 accent-blue-600 cursor-inherit"
              aria-label={option.text}
            />
            <span className="flex-1 text-base text-slate-50">{option.text}</span>
            {showResult && option.id === correctOptionId && (
              <span className="text-green-400 font-bold text-xl" aria-hidden="true">✓</span>
            )}
            {showResult && selectedOptionId === option.id && option.id !== correctOptionId && (
              <span className="text-red-400 font-bold text-xl" aria-hidden="true">✗</span>
            )}
          </label>
        ))}
      </fieldset>

      {showResult && (
        <div
          id="quiz-result"
          className="mt-6 p-4 rounded-lg text-center"
          role="status"
          aria-live="polite"
          data-testid="quiz-result"
        >
          <p className={`font-semibold text-lg ${isCorrectAnswer ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrectAnswer ? '正解です！' : '不正解です'}
          </p>
        </div>
      )}

      {showResult && explanation && (
        <div className="mt-6">
          <button
            type="button"
            className="flex items-center gap-2 bg-transparent border-none text-slate-400 text-sm cursor-pointer p-2 hover:text-slate-50"
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
            aria-expanded={isExplanationOpen}
            aria-controls="quiz-explanation"
            data-testid="explanation-toggle"
          >
            <span>{isExplanationOpen ? '▼' : '▶'}</span>
            <span>解説を{isExplanationOpen ? '閉じる' : '見る'}</span>
          </button>
          {isExplanationOpen && (
            <div
              id="quiz-explanation"
              className="mt-4 p-4 bg-slate-800 rounded-lg text-slate-400 leading-relaxed"
              data-testid="quiz-explanation"
            >
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
