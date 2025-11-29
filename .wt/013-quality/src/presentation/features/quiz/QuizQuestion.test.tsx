import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizQuestion } from './QuizQuestion';

vi.mock('./QuizQuestion.module.css', () => ({
  default: {
    container: 'container',
    questionText: 'questionText',
    options: 'options',
    srOnly: 'srOnly',
    option: 'option',
    selected: 'selected',
    correct: 'correct',
    incorrect: 'incorrect',
    disabled: 'disabled',
    radio: 'radio',
    optionText: 'optionText',
    correctBadge: 'correctBadge',
    incorrectBadge: 'incorrectBadge',
    result: 'result',
    resultCorrect: 'resultCorrect',
    resultIncorrect: 'resultIncorrect',
    explanationContainer: 'explanationContainer',
    explanationToggle: 'explanationToggle',
    explanation: 'explanation',
  },
}));

describe('QuizQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    text: 'DDDにおけるエンティティの特徴は？',
    options: [
      { id: 'opt1', text: '一意の識別子を持つ' },
      { id: 'opt2', text: '不変である' },
      { id: 'opt3', text: '値のみで比較される' },
    ],
  };

  const defaultProps = {
    question: mockQuestion,
    selectedOptionId: null,
    onSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本表示', () => {
    it('問題文が表示される', () => {
      render(<QuizQuestion {...defaultProps} />);
      expect(screen.getByText('DDDにおけるエンティティの特徴は？')).toBeInTheDocument();
    });

    it('全ての選択肢が表示される', () => {
      render(<QuizQuestion {...defaultProps} />);
      expect(screen.getByText('一意の識別子を持つ')).toBeInTheDocument();
      expect(screen.getByText('不変である')).toBeInTheDocument();
      expect(screen.getByText('値のみで比較される')).toBeInTheDocument();
    });

    it('ラジオボタンが表示される', () => {
      render(<QuizQuestion {...defaultProps} />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });
  });

  describe('選択操作', () => {
    it('選択肢をクリックするとonSelectが呼ばれる', () => {
      const onSelect = vi.fn();
      render(<QuizQuestion {...defaultProps} onSelect={onSelect} />);

      const firstOption = screen.getByTestId('quiz-option-opt1');
      fireEvent.click(firstOption);

      expect(onSelect).toHaveBeenCalledWith('opt1');
    });

    it('選択状態が正しく反映される', () => {
      render(<QuizQuestion {...defaultProps} selectedOptionId="opt1" />);

      const firstRadio = screen.getByRole('radio', { name: '一意の識別子を持つ' });
      expect(firstRadio).toBeChecked();
    });
  });

  describe('無効状態', () => {
    it('disabled=trueの場合、選択できない', () => {
      const onSelect = vi.fn();
      render(<QuizQuestion {...defaultProps} onSelect={onSelect} disabled={true} />);

      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toBeDisabled();
      });
    });
  });

  describe('結果表示', () => {
    it('正解時に「正解です！」が表示される', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt1"
          showResult={true}
          correctOptionId="opt1"
        />
      );

      expect(screen.getByText('正解です！')).toBeInTheDocument();
    });

    it('不正解時に「不正解です」が表示される', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt2"
          showResult={true}
          correctOptionId="opt1"
        />
      );

      expect(screen.getByText('不正解です')).toBeInTheDocument();
    });

    it('正解の選択肢にチェックマークが表示される', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt1"
          showResult={true}
          correctOptionId="opt1"
        />
      );

      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('不正解の選択肢にバツマークが表示される', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt2"
          showResult={true}
          correctOptionId="opt1"
        />
      );

      expect(screen.getByText('✗')).toBeInTheDocument();
    });
  });

  describe('解説表示', () => {
    it('解説ボタンをクリックすると解説が表示される', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt1"
          showResult={true}
          correctOptionId="opt1"
          explanation="エンティティは一意の識別子によって区別されます。"
        />
      );

      const toggleButton = screen.getByTestId('explanation-toggle');
      expect(screen.queryByTestId('quiz-explanation')).not.toBeInTheDocument();

      fireEvent.click(toggleButton);

      expect(screen.getByTestId('quiz-explanation')).toBeInTheDocument();
      expect(screen.getByText('エンティティは一意の識別子によって区別されます。')).toBeInTheDocument();
    });

    it('解説ボタンの状態が切り替わる', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt1"
          showResult={true}
          correctOptionId="opt1"
          explanation="解説テキスト"
        />
      );

      const toggleButton = screen.getByTestId('explanation-toggle');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('アクセシビリティ', () => {
    it('結果表示時にrole="status"を持つ要素がある', () => {
      render(
        <QuizQuestion
          {...defaultProps}
          selectedOptionId="opt1"
          showResult={true}
          correctOptionId="opt1"
        />
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
