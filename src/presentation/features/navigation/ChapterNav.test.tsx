import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChapterNav } from './ChapterNav';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('ChapterNav', () => {
  const defaultProps = {
    courseId: 'course-1',
    chapter: {
      id: 'chapter-1',
      title: 'Test Chapter',
      order: 1,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Lesson 1',
          order: 1,
          isCompleted: true,
          isUnlocked: true,
          isCurrent: false,
        },
        {
          id: 'lesson-2',
          title: 'Lesson 2',
          order: 2,
          isCompleted: false,
          isUnlocked: true,
          isCurrent: true,
        },
      ],
      isExpanded: false,
    },
  };

  it('renders chapter title with order', () => {
    render(<ChapterNav {...defaultProps} />);
    expect(screen.getByText('1. Test Chapter')).toBeInTheDocument();
  });

  it('renders progress indicator', () => {
    render(<ChapterNav {...defaultProps} />);
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('does not show lessons when collapsed', () => {
    render(<ChapterNav {...defaultProps} />);
    expect(screen.queryByText('Lesson 1')).not.toBeInTheDocument();
  });

  it('shows lessons when expanded', () => {
    render(
      <ChapterNav
        {...defaultProps}
        chapter={{ ...defaultProps.chapter, isExpanded: true }}
      />
    );
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.getByText('Lesson 2')).toBeInTheDocument();
  });

  it('toggles expansion on header click', () => {
    render(<ChapterNav {...defaultProps} />);

    const header = screen.getByRole('button');
    expect(screen.queryByText('Lesson 1')).not.toBeInTheDocument();

    fireEvent.click(header);
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();

    fireEvent.click(header);
    expect(screen.queryByText('Lesson 1')).not.toBeInTheDocument();
  });

  it('shows collapsed icon when initially collapsed', () => {
    render(<ChapterNav {...defaultProps} />);
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('shows expanded icon when initially expanded', () => {
    render(
      <ChapterNav
        {...defaultProps}
        chapter={{ ...defaultProps.chapter, isExpanded: true }}
      />
    );
    expect(screen.getByText('▼')).toBeInTheDocument();
  });
});
