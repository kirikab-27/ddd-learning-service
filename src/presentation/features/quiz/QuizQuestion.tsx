'use client';

import { useState } from 'react';
import styles from './QuizQuestion.module.css';

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
    const classNames = [styles.option];

    if (selectedOptionId === optionId) {
      classNames.push(styles.selected);
    }

    if (showResult) {
      if (optionId === correctOptionId) {
        classNames.push(styles.correct);
      } else if (selectedOptionId === optionId && optionId !== correctOptionId) {
        classNames.push(styles.incorrect);
      }
    }

    if (disabled) {
      classNames.push(styles.disabled);
    }

    return classNames.join(' ');
  };

  const isCorrectAnswer = showResult && selectedOptionId === correctOptionId;

  return (
    <div className={styles.container} data-testid="quiz-question">
      <h2 className={styles.questionText}>{question.text}</h2>

      <fieldset
        className={styles.options}
        disabled={disabled}
        aria-describedby={showResult ? 'quiz-result' : undefined}
      >
        <legend className={styles.srOnly}>選択肢</legend>
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
              className={styles.radio}
              aria-label={option.text}
            />
            <span className={styles.optionText}>{option.text}</span>
            {showResult && option.id === correctOptionId && (
              <span className={styles.correctBadge} aria-hidden="true">✓</span>
            )}
            {showResult && selectedOptionId === option.id && option.id !== correctOptionId && (
              <span className={styles.incorrectBadge} aria-hidden="true">✗</span>
            )}
          </label>
        ))}
      </fieldset>

      {showResult && (
        <div
          id="quiz-result"
          className={styles.result}
          role="status"
          aria-live="polite"
          data-testid="quiz-result"
        >
          <p className={isCorrectAnswer ? styles.resultCorrect : styles.resultIncorrect}>
            {isCorrectAnswer ? '正解です！' : '不正解です'}
          </p>
        </div>
      )}

      {showResult && explanation && (
        <div className={styles.explanationContainer}>
          <button
            type="button"
            className={styles.explanationToggle}
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
              className={styles.explanation}
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
