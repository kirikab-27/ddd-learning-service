import React from 'react';
import { render, screen } from '@testing-library/react';
import { LessonNav } from './LessonNav';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('LessonNav', () => {
  const defaultProps = {
    courseId: 'course-1',
    chapterId: 'chapter-1',
    lesson: {
      id: 'lesson-1',
      title: 'Test Lesson',
      order: 1,
      isCompleted: false,
      isUnlocked: true,
      isCurrent: false,
    },
  };

  it('renders lesson title', () => {
    render(<LessonNav {...defaultProps} />);
    expect(screen.getByText('Test Lesson')).toBeInTheDocument();
  });

  it('renders as link when unlocked', () => {
    render(<LessonNav {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      '/courses/course-1/chapters/chapter-1/lessons/lesson-1'
    );
  });

  it('renders lock icon when locked', () => {
    render(
      <LessonNav
        {...defaultProps}
        lesson={{ ...defaultProps.lesson, isUnlocked: false }}
      />
    );
    expect(screen.getByText('🔒')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders check icon when completed', () => {
    render(
      <LessonNav
        {...defaultProps}
        lesson={{ ...defaultProps.lesson, isCompleted: true }}
      />
    );
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders lesson order', () => {
    render(<LessonNav {...defaultProps} />);
    expect(screen.getByText('1.')).toBeInTheDocument();
  });
});
