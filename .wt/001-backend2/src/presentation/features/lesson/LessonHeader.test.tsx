import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LessonHeader } from './LessonHeader';

describe('LessonHeader', () => {
  const defaultProps = {
    chapterTitle: 'Chapter 1',
    lessonTitle: 'Introduction to DDD',
    lessonOrder: 1,
    isCompleted: false,
  };

  it('renders chapter title', () => {
    render(<LessonHeader {...defaultProps} />);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });

  it('renders lesson title', () => {
    render(<LessonHeader {...defaultProps} />);
    expect(screen.getByText('Introduction to DDD')).toBeInTheDocument();
  });

  it('renders lesson order', () => {
    render(<LessonHeader {...defaultProps} />);
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
  });

  it('shows completed badge when lesson is completed', () => {
    render(<LessonHeader {...defaultProps} isCompleted={true} />);
    expect(screen.getByText('✓ 完了')).toBeInTheDocument();
  });

  it('does not show completed badge when lesson is not completed', () => {
    render(<LessonHeader {...defaultProps} isCompleted={false} />);
    expect(screen.queryByText('✓ 完了')).not.toBeInTheDocument();
  });

  it('renders separator between chapter and lesson', () => {
    render(<LessonHeader {...defaultProps} />);
    expect(screen.getByText('/')).toBeInTheDocument();
  });
});
