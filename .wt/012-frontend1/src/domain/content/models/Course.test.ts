import { CourseId, ChapterId, LessonId } from '@/domain/shared';
import { Course } from './Course';
import { Chapter } from './Chapter';
import { Lesson } from './Lesson';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';

describe('Course', () => {
  const createLesson = (id: string, order: number): Lesson => {
    return Lesson.create({
      id: LessonId.create(id),
      title: LessonTitle.create(`Lesson ${id}`),
      content: MarkdownContent.create(`Content for ${id}`),
      order,
    });
  };

  const createChapter = (id: string, order: number, lessonIds: string[]): Chapter => {
    const lessons = lessonIds.map((lessonId, index) =>
      createLesson(lessonId, index + 1)
    );
    return Chapter.create({
      id: ChapterId.create(id),
      title: `Chapter ${id}`,
      order,
      lessons,
    });
  };

  const createValidCourse = (overrides: Partial<{
    id: CourseId;
    title: string;
    description: string;
    chapters: Chapter[];
  }> = {}) => {
    return Course.create({
      id: overrides.id ?? CourseId.create('course-1'),
      title: overrides.title ?? 'DDD Fundamentals',
      description: overrides.description ?? 'Learn Domain-Driven Design',
      chapters: overrides.chapters ?? [
        createChapter('ch-1', 1, ['lesson-1', 'lesson-2']),
        createChapter('ch-2', 2, ['lesson-3', 'lesson-4']),
      ],
    });
  };

  describe('create', () => {
    it('should create a valid Course', () => {
      const course = createValidCourse();

      expect(course.id.toString()).toBe('course-1');
      expect(course.title).toBe('DDD Fundamentals');
      expect(course.description).toBe('Learn Domain-Driven Design');
      expect(course.chapterCount).toBe(2);
    });

    it('should trim title and description', () => {
      const course = createValidCourse({
        title: '  Trimmed Title  ',
        description: '  Trimmed Description  ',
      });
      expect(course.title).toBe('Trimmed Title');
      expect(course.description).toBe('Trimmed Description');
    });

    it('should throw error for empty title', () => {
      expect(() => createValidCourse({ title: '' })).toThrow('Course title cannot be empty');
      expect(() => createValidCourse({ title: '   ' })).toThrow('Course title cannot be empty');
    });

    it('should handle empty description', () => {
      const course = createValidCourse({ description: '' });
      expect(course.description).toBe('');
    });

    it('should sort chapters by order', () => {
      const chapters = [
        createChapter('ch-3', 3, ['lesson-5']),
        createChapter('ch-1', 1, ['lesson-1']),
        createChapter('ch-2', 2, ['lesson-3']),
      ];
      const course = createValidCourse({ chapters });

      expect(course.chapters[0].order).toBe(1);
      expect(course.chapters[1].order).toBe(2);
      expect(course.chapters[2].order).toBe(3);
    });
  });

  describe('totalLessons', () => {
    it('should return total lesson count', () => {
      const course = createValidCourse();
      expect(course.totalLessons).toBe(4);
    });

    it('should return 0 for course with no chapters', () => {
      const course = createValidCourse({ chapters: [] });
      expect(course.totalLessons).toBe(0);
    });
  });

  describe('getAllLessons', () => {
    it('should return all lessons in order', () => {
      const course = createValidCourse();
      const allLessons = course.getAllLessons();

      expect(allLessons.length).toBe(4);
      expect(allLessons[0].id.toString()).toBe('lesson-1');
      expect(allLessons[1].id.toString()).toBe('lesson-2');
      expect(allLessons[2].id.toString()).toBe('lesson-3');
      expect(allLessons[3].id.toString()).toBe('lesson-4');
    });
  });

  describe('findLesson', () => {
    it('should find existing lesson with its chapter', () => {
      const course = createValidCourse();
      const result = course.findLesson(LessonId.create('lesson-3'));

      expect(result).toBeDefined();
      expect(result!.lesson.id.toString()).toBe('lesson-3');
      expect(result!.chapter.id.toString()).toBe('ch-2');
    });

    it('should return undefined for non-existing lesson', () => {
      const course = createValidCourse();
      const result = course.findLesson(LessonId.create('non-existing'));
      expect(result).toBeUndefined();
    });
  });

  describe('getAdjacentLessons', () => {
    it('should return adjacent lessons for middle lesson', () => {
      const course = createValidCourse();
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-2'));

      expect(adjacent.previous).toBeDefined();
      expect(adjacent.previous!.id.toString()).toBe('lesson-1');
      expect(adjacent.next).toBeDefined();
      expect(adjacent.next!.id.toString()).toBe('lesson-3');
    });

    it('should return null previous for first lesson', () => {
      const course = createValidCourse();
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-1'));

      expect(adjacent.previous).toBeNull();
      expect(adjacent.next).toBeDefined();
      expect(adjacent.next!.id.toString()).toBe('lesson-2');
    });

    it('should return null next for last lesson', () => {
      const course = createValidCourse();
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-4'));

      expect(adjacent.previous).toBeDefined();
      expect(adjacent.previous!.id.toString()).toBe('lesson-3');
      expect(adjacent.next).toBeNull();
    });

    it('should return null for both when lesson not found', () => {
      const course = createValidCourse();
      const adjacent = course.getAdjacentLessons(LessonId.create('non-existing'));

      expect(adjacent.previous).toBeNull();
      expect(adjacent.next).toBeNull();
    });

    it('should navigate across chapters', () => {
      const course = createValidCourse();

      // lesson-2 is last in ch-1, lesson-3 is first in ch-2
      const adjacent = course.getAdjacentLessons(LessonId.create('lesson-2'));
      expect(adjacent.next!.id.toString()).toBe('lesson-3');
    });
  });

  describe('getFirstLesson', () => {
    it('should return first lesson of the course', () => {
      const course = createValidCourse();
      const first = course.getFirstLesson();

      expect(first).toBeDefined();
      expect(first!.id.toString()).toBe('lesson-1');
    });

    it('should return undefined for empty course', () => {
      const course = createValidCourse({ chapters: [] });
      expect(course.getFirstLesson()).toBeUndefined();
    });
  });

  describe('getLastLesson', () => {
    it('should return last lesson of the course', () => {
      const course = createValidCourse();
      const last = course.getLastLesson();

      expect(last).toBeDefined();
      expect(last!.id.toString()).toBe('lesson-4');
    });

    it('should return undefined for empty course', () => {
      const course = createValidCourse({ chapters: [] });
      expect(course.getLastLesson()).toBeUndefined();
    });
  });

  describe('equals', () => {
    it('should return true for courses with same id', () => {
      const course1 = createValidCourse({ id: CourseId.create('course-1') });
      const course2 = createValidCourse({
        id: CourseId.create('course-1'),
        title: 'Different Title',
      });
      expect(course1.equals(course2)).toBe(true);
    });

    it('should return false for courses with different ids', () => {
      const course1 = createValidCourse({ id: CourseId.create('course-1') });
      const course2 = createValidCourse({ id: CourseId.create('course-2') });
      expect(course1.equals(course2)).toBe(false);
    });
  });
});
