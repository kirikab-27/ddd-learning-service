import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LessonContent } from './LessonContent';

describe('LessonContent', () => {
  const defaultProps = {
    lesson: {
      id: 'lesson-1',
      title: 'Introduction to DDD',
      content: '# DDD\n\nDomain-Driven Design is a software design approach.',
      order: 1,
    },
    chapter: {
      id: 'ch-1',
      title: 'Chapter 1: Basics',
    },
    navigation: {
      previous: null,
      next: { chapterId: 'ch-1', lessonId: 'lesson-2' },
    },
    courseId: 'course-1',
    isCompleted: false,
  };

  it('renders lesson header with title', () => {
    render(<LessonContent {...defaultProps} />);
    expect(screen.getByText('Introduction to DDD')).toBeInTheDocument();
  });

  it('renders chapter title', () => {
    render(<LessonContent {...defaultProps} />);
    expect(screen.getByText('Chapter 1: Basics')).toBeInTheDocument();
  });

  it('renders lesson order', () => {
    render(<LessonContent {...defaultProps} />);
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    render(<LessonContent {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 1, name: 'DDD' })).toBeInTheDocument();
  });

  it('renders next navigation when available', () => {
    render(<LessonContent {...defaultProps} />);
    expect(screen.getByText('次のレッスン →')).toBeInTheDocument();
  });

  it('does not render previous navigation when not available', () => {
    render(<LessonContent {...defaultProps} />);
    expect(screen.queryByText('← 前のレッスン')).not.toBeInTheDocument();
  });

  it('renders previous navigation when available', () => {
    render(
      <LessonContent
        {...defaultProps}
        navigation={{
          previous: { chapterId: 'ch-1', lessonId: 'lesson-0' },
          next: null,
        }}
      />
    );
    expect(screen.getByText('← 前のレッスン')).toBeInTheDocument();
  });

  it('shows completed badge when lesson is completed', () => {
    render(<LessonContent {...defaultProps} isCompleted={true} />);
    expect(screen.getByText('✓ 完了')).toBeInTheDocument();
  });
});
