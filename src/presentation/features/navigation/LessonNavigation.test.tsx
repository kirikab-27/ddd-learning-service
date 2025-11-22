import React from 'react';
import { render, screen } from '@testing-library/react';
import { LessonNavigation } from './LessonNavigation';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('LessonNavigation', () => {
  it('renders both previous and next links', () => {
    render(
      <LessonNavigation
        courseId="course-1"
        previous={{ chapterId: 'chapter-1', lessonId: 'lesson-1' }}
        next={{ chapterId: 'chapter-1', lessonId: 'lesson-3' }}
      />
    );

    expect(screen.getByText('← 前のレッスン')).toBeInTheDocument();
    expect(screen.getByText('次のレッスン →')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute(
      'href',
      '/courses/course-1/chapters/chapter-1/lessons/lesson-1'
    );
    expect(links[1]).toHaveAttribute(
      'href',
      '/courses/course-1/chapters/chapter-1/lessons/lesson-3'
    );
  });

  it('renders only next link when no previous', () => {
    render(
      <LessonNavigation
        courseId="course-1"
        previous={null}
        next={{ chapterId: 'chapter-1', lessonId: 'lesson-2' }}
      />
    );

    expect(screen.queryByText('← 前のレッスン')).not.toBeInTheDocument();
    expect(screen.getByText('次のレッスン →')).toBeInTheDocument();
  });

  it('renders only previous link when no next', () => {
    render(
      <LessonNavigation
        courseId="course-1"
        previous={{ chapterId: 'chapter-1', lessonId: 'lesson-1' }}
        next={null}
      />
    );

    expect(screen.getByText('← 前のレッスン')).toBeInTheDocument();
    expect(screen.queryByText('次のレッスン →')).not.toBeInTheDocument();
  });

  it('renders completion message when no next lesson', () => {
    render(
      <LessonNavigation
        courseId="course-1"
        previous={{ chapterId: 'chapter-1', lessonId: 'lesson-1' }}
        next={null}
      />
    );

    expect(screen.getByText('🎉 コース完了！')).toBeInTheDocument();
  });

  it('handles cross-chapter navigation', () => {
    render(
      <LessonNavigation
        courseId="course-1"
        previous={{ chapterId: 'chapter-1', lessonId: 'lesson-3' }}
        next={{ chapterId: 'chapter-2', lessonId: 'lesson-1' }}
      />
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute(
      'href',
      '/courses/course-1/chapters/chapter-1/lessons/lesson-3'
    );
    expect(links[1]).toHaveAttribute(
      'href',
      '/courses/course-1/chapters/chapter-2/lessons/lesson-1'
    );
  });
});
