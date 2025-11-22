import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LessonCompleteButton } from './LessonCompleteButton';

// Mock CSS module
jest.mock('./LessonCompleteButton.module.css', () => ({
  button: 'button',
  primary: 'primary',
  completed: 'completed',
  checkIcon: 'checkIcon',
  spinner: 'spinner',
}));

describe('LessonCompleteButton', () => {
  const defaultProps = {
    courseId: 'course-1',
    lessonId: 'lesson-1',
    isCompleted: false,
    onComplete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('未完了状態', () => {
    it('「レッスンを完了する」ボタンが表示される', () => {
      render(<LessonCompleteButton {...defaultProps} />);
      expect(screen.getByText('レッスンを完了する')).toBeInTheDocument();
    });

    it('ボタンがクリック可能である', () => {
      render(<LessonCompleteButton {...defaultProps} />);
      const button = screen.getByTestId('lesson-complete-button');
      expect(button).not.toBeDisabled();
    });

    it('クリック時にonCompleteが呼ばれる', async () => {
      const onComplete = jest.fn().mockResolvedValue(undefined);
      render(<LessonCompleteButton {...defaultProps} onComplete={onComplete} />);

      const button = screen.getByTestId('lesson-complete-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
    });

    it('適切なaria-label属性を持つ', () => {
      render(<LessonCompleteButton {...defaultProps} />);
      const button = screen.getByTestId('lesson-complete-button');
      expect(button).toHaveAttribute('aria-label', 'レッスン lesson-1 を完了する');
    });

    it('data属性にcourseIdとlessonIdが含まれる', () => {
      render(<LessonCompleteButton {...defaultProps} />);
      const button = screen.getByTestId('lesson-complete-button');
      expect(button).toHaveAttribute('data-course-id', 'course-1');
      expect(button).toHaveAttribute('data-lesson-id', 'lesson-1');
    });
  });

  describe('完了状態', () => {
    it('「✓ 完了済み」が表示される', () => {
      render(<LessonCompleteButton {...defaultProps} isCompleted={true} />);
      expect(screen.getByText('完了済み')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('ボタンではなくステータス表示になる', () => {
      render(<LessonCompleteButton {...defaultProps} isCompleted={true} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('適切なaria-labelを持つ', () => {
      render(<LessonCompleteButton {...defaultProps} isCompleted={true} />);
      const status = screen.getByTestId('lesson-complete-status');
      expect(status).toHaveAttribute('aria-label', 'レッスン lesson-1 は完了済みです');
    });
  });

  describe('無効状態', () => {
    it('disabled=trueの場合、ボタンが無効になる', () => {
      render(<LessonCompleteButton {...defaultProps} disabled={true} />);
      const button = screen.getByTestId('lesson-complete-button');
      expect(button).toBeDisabled();
    });

    it('disabled=trueの場合、クリックしてもonCompleteが呼ばれない', () => {
      const onComplete = jest.fn();
      render(<LessonCompleteButton {...defaultProps} disabled={true} onComplete={onComplete} />);

      const button = screen.getByTestId('lesson-complete-button');
      fireEvent.click(button);

      expect(onComplete).not.toHaveBeenCalled();
    });
  });

  describe('ローディング状態', () => {
    it('処理中に「処理中...」が表示される', async () => {
      const onComplete = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<LessonCompleteButton {...defaultProps} onComplete={onComplete} />);

      const button = screen.getByTestId('lesson-complete-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('処理中...')).toBeInTheDocument();
      });
    });

    it('処理中はaria-busy=trueになる', async () => {
      const onComplete = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
      render(<LessonCompleteButton {...defaultProps} onComplete={onComplete} />);

      const button = screen.getByTestId('lesson-complete-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-busy', 'true');
      });
    });
  });
});
