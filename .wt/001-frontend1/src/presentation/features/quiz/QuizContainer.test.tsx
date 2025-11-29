import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QuizContainer } from './QuizContainer';

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the useQuiz hook
vi.mock('@/presentation/hooks/useQuiz', () => ({
  useQuiz: vi.fn(),
}));

import { useQuiz } from '@/presentation/hooks/useQuiz';

const mockUseQuiz = useQuiz as unknown as ReturnType<typeof vi.fn>;

describe('QuizContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    mockUseQuiz.mockReturnValue({
      quiz: null,
      isLoading: true,
      error: null,
      submitQuiz: vi.fn(),
      isSubmitting: false,
    });

    render(<QuizContainer lessonId="lesson-1" courseId="course-1" chapterId="chapter-1" />);
    expect(screen.getByText('クイズを読み込んでいます...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseQuiz.mockReturnValue({
      quiz: null,
      isLoading: false,
      error: new Error('Failed to load'),
      submitQuiz: vi.fn(),
      isSubmitting: false,
    });

    render(<QuizContainer lessonId="lesson-1" courseId="course-1" chapterId="chapter-1" />);
    expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
  });

  it('shows not found state when no quiz', () => {
    mockUseQuiz.mockReturnValue({
      quiz: null,
      isLoading: false,
      error: null,
      submitQuiz: vi.fn(),
      isSubmitting: false,
    });

    render(<QuizContainer lessonId="lesson-1" courseId="course-1" chapterId="chapter-1" />);
    expect(screen.getByText('このレッスンにはクイズがありません。')).toBeInTheDocument();
  });

  it('renders quiz when loaded', async () => {
    const mockQuiz = {
      id: { toString: () => 'quiz-1' },
      title: 'Test Quiz',
      description: 'A test quiz',
      questions: [
        {
          id: 'q1',
          text: 'What is DDD?',
          options: [
            { id: 'a', text: 'Option A', isCorrect: false },
            { id: 'b', text: 'Option B', isCorrect: true },
          ],
          explanation: 'Explanation here',
        },
      ],
    };

    mockUseQuiz.mockReturnValue({
      quiz: mockQuiz,
      isLoading: false,
      error: null,
      submitQuiz: vi.fn(),
      isSubmitting: false,
    });

    render(<QuizContainer lessonId="lesson-1" courseId="course-1" chapterId="chapter-1" />);

    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    expect(screen.getByText('A test quiz')).toBeInTheDocument();
    expect(screen.getByText('What is DDD?')).toBeInTheDocument();
  });

  it('shows progress indicator', () => {
    const mockQuiz = {
      id: { toString: () => 'quiz-1' },
      title: 'Test Quiz',
      description: '',
      questions: [
        {
          id: 'q1',
          text: 'Question 1',
          options: [
            { id: 'a', text: 'Option A', isCorrect: true },
          ],
          explanation: '',
        },
        {
          id: 'q2',
          text: 'Question 2',
          options: [
            { id: 'a', text: 'Option A', isCorrect: true },
          ],
          explanation: '',
        },
      ],
    };

    mockUseQuiz.mockReturnValue({
      quiz: mockQuiz,
      isLoading: false,
      error: null,
      submitQuiz: vi.fn(),
      isSubmitting: false,
    });

    render(<QuizContainer lessonId="lesson-1" courseId="course-1" chapterId="chapter-1" />);

    expect(screen.getByTestId('quiz-progress')).toBeInTheDocument();
  });
});
