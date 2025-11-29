import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the modules before importing
vi.mock('@/infrastructure/repositories/InMemoryCourseRepository', () => ({
  InMemoryCourseRepository: class MockInMemoryCourseRepository {
    async findById() {
      return {
        id: { toString: () => 'course-1' },
        totalLessons: 3,
        findLesson: () => ({ chapter: {}, lesson: {} }),
      };
    }
    async findAll() {
      return [];
    }
  },
}));

vi.mock('@/infrastructure/repositories/LocalStorageProgressRepository', () => ({
  LocalStorageProgressRepository: class MockLocalStorageProgressRepository {
    async findByCourseId() {
      return null;
    }
    async save() {}
  },
}));

vi.mock('@/infrastructure/data/sampleCourses', () => ({
  sampleCourses: [],
}));

vi.mock('@/domain/shared', () => ({
  CourseId: {
    create: (value: string) => ({ toString: () => value }),
  },
}));

// Import after mocking
import { renderHook, waitFor } from '@testing-library/react';
import { useProgress } from './useProgress';

describe('useProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useProgress('course-1'));
    expect(result.current.loading).toBe(true);
  });

  it('should have isCompleted function', async () => {
    const { result } = renderHook(() => useProgress('course-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.isCompleted).toBe('function');
  });

  it('should have completeLesson function', async () => {
    const { result } = renderHook(() => useProgress('course-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.completeLesson).toBe('function');
  });

  it('should have completionRate initialized to 0', async () => {
    const { result } = renderHook(() => useProgress('course-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.completionRate).toBe(0);
  });

  it('should return false for isCompleted when no progress', async () => {
    const { result } = renderHook(() => useProgress('course-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isCompleted('lesson-1')).toBe(false);
  });

  it('should have refresh function', async () => {
    const { result } = renderHook(() => useProgress('course-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.refresh).toBe('function');
  });
});
