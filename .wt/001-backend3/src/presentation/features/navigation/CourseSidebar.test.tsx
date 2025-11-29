import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CourseSidebar } from './CourseSidebar';
import { useCourseNavigation } from '@/presentation/hooks/useCourseNavigation';

vi.mock('next/navigation', () => ({
  useParams: () => ({ lessonId: 'lesson-1' }),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/presentation/hooks/useCourseNavigation');

const mockUseCourseNavigation = useCourseNavigation as Mock;

describe('CourseSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseCourseNavigation.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CourseSidebar courseId="course-1" />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseCourseNavigation.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Test error'),
    });

    render(<CourseSidebar courseId="course-1" />);
    expect(screen.getByText('ナビゲーションを読み込めませんでした')).toBeInTheDocument();
  });

  it('renders course navigation data', () => {
    mockUseCourseNavigation.mockReturnValue({
      data: {
        courseId: 'course-1',
        courseTitle: 'Test Course',
        chapters: [
          {
            id: 'chapter-1',
            title: 'Chapter 1',
            order: 1,
            lessons: [
              {
                id: 'lesson-1',
                title: 'Lesson 1',
                order: 1,
                isCompleted: false,
                isUnlocked: true,
                isCurrent: true,
              },
            ],
            isExpanded: true,
          },
        ],
        completionRate: 50,
      },
      isLoading: false,
      error: null,
    });

    render(<CourseSidebar courseId="course-1" />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('50% 完了')).toBeInTheDocument();
    expect(screen.getByText('1. Chapter 1')).toBeInTheDocument();
  });

  it('passes correct params to useCourseNavigation', () => {
    mockUseCourseNavigation.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CourseSidebar courseId="course-1" />);

    expect(mockUseCourseNavigation).toHaveBeenCalledWith({
      courseId: 'course-1',
      currentLessonId: 'lesson-1',
    });
  });
});
