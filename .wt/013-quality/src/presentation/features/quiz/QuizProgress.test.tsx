import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuizProgress } from './QuizProgress';

vi.mock('./QuizProgress.module.css', () => ({
  default: {
    container: 'container',
    header: 'header',
    text: 'text',
    current: 'current',
    percentage: 'percentage',
    progressBar: 'progressBar',
    progressFill: 'progressFill',
  },
}));

describe('QuizProgress', () => {
  it('現在の問題番号と合計が表示される', () => {
    render(<QuizProgress current={3} total={10} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/問題/)).toBeInTheDocument();
    // aria-labelで合計を確認
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', '10問中3問目');
  });

  it('進捗率が表示される', () => {
    render(<QuizProgress current={5} total={10} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('プログレスバーが正しいaria属性を持つ', () => {
    render(<QuizProgress current={3} total={10} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '3');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '10');
    expect(progressBar).toHaveAttribute('aria-label', '10問中3問目');
  });

  it('進捗率が正しく計算される（端数切り捨て）', () => {
    render(<QuizProgress current={1} total={3} />);

    // 1/3 = 33.33... -> 33%
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('100%の場合も正しく表示される', () => {
    render(<QuizProgress current={10} total={10} />);

    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('data-testidが設定されている', () => {
    render(<QuizProgress current={1} total={5} />);

    expect(screen.getByTestId('quiz-progress')).toBeInTheDocument();
  });
});
