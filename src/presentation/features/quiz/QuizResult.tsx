'use client';

import styles from './QuizResult.module.css';

interface QuestionResultDetail {
  questionId: string;
  questionText: string;
  isCorrect: boolean;
  selectedOptionText: string;
  correctOptionText: string;
  explanation: string;
}

interface QuizResultProps {
  score: number;
  isPassed: boolean;
  results: QuestionResultDetail[];
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResult({
  score,
  isPassed,
  results,
  onRetry,
  onBack,
}: QuizResultProps) {
  const correctCount = results.filter(r => r.isCorrect).length;

  return (
    <div className={styles.container} data-testid="quiz-result">
      <div className={styles.header}>
        <div className={`${styles.scoreCard} ${isPassed ? styles.passed : styles.failed}`}>
          <div className={styles.scoreLabel}>スコア</div>
          <div className={styles.scoreValue}>{score}%</div>
          <div className={styles.scoreDetail}>
            {correctCount} / {results.length} 問正解
          </div>
          <div className={styles.passStatus}>
            {isPassed ? '合格' : '不合格'}
          </div>
        </div>
      </div>

      <div className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>回答結果</h2>
        <div className={styles.resultsList}>
          {results.map((result, index) => (
            <div
              key={result.questionId}
              className={`${styles.resultItem} ${result.isCorrect ? styles.correct : styles.incorrect}`}
            >
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>問{index + 1}</span>
                <span className={result.isCorrect ? styles.correctBadge : styles.incorrectBadge}>
                  {result.isCorrect ? '正解' : '不正解'}
                </span>
              </div>
              <p className={styles.questionText}>{result.questionText}</p>

              <div className={styles.answerSection}>
                <div className={styles.answerRow}>
                  <span className={styles.answerLabel}>あなたの回答:</span>
                  <span className={`${styles.answerValue} ${!result.isCorrect ? styles.wrongAnswer : ''}`}>
                    {result.selectedOptionText}
                  </span>
                </div>
                {!result.isCorrect && (
                  <div className={styles.answerRow}>
                    <span className={styles.answerLabel}>正解:</span>
                    <span className={`${styles.answerValue} ${styles.correctAnswer}`}>
                      {result.correctOptionText}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.explanation}>
                <span className={styles.explanationLabel}>解説:</span>
                <p className={styles.explanationText}>{result.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onRetry}
          className={styles.retryButton}
        >
          もう一度挑戦
        </button>
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
        >
          レッスンに戻る
        </button>
      </div>
    </div>
  );
}
