import { Progress } from './Progress';
import { LessonProgress } from './LessonProgress';
import { CourseId, LessonId } from '@/domain/shared';

describe('Progress', () => {
  const courseId = CourseId.create('course-1');

  describe('create', () => {
    it('should create empty progress for a course', () => {
      const progress = Progress.create(courseId);

      expect(progress.courseId.equals(courseId)).toBe(true);
      expect(progress.completedCount).toBe(0);
      expect(progress.completedLessons).toHaveLength(0);
    });
  });

  describe('restore', () => {
    it('should restore progress with completed lessons', () => {
      const lessonProgress1 = LessonProgress.create(LessonId.create('lesson-1'));
      const lessonProgress2 = LessonProgress.create(LessonId.create('lesson-2'));

      const progress = Progress.restore(courseId, [lessonProgress1, lessonProgress2]);

      expect(progress.completedCount).toBe(2);
      expect(progress.completedLessons).toHaveLength(2);
    });
  });

  describe('markLessonAsCompleted', () => {
    it('should mark a lesson as completed', () => {
      const progress = Progress.create(courseId);
      const lessonId = LessonId.create('lesson-1');

      const updatedProgress = progress.markLessonAsCompleted(lessonId);

      expect(updatedProgress.completedCount).toBe(1);
      expect(updatedProgress.hasCompletedLesson(lessonId)).toBe(true);
    });

    it('should not duplicate if lesson already completed', () => {
      const progress = Progress.create(courseId);
      const lessonId = LessonId.create('lesson-1');

      const updatedOnce = progress.markLessonAsCompleted(lessonId);
      const updatedTwice = updatedOnce.markLessonAsCompleted(lessonId);

      expect(updatedTwice.completedCount).toBe(1);
      expect(updatedOnce).toBe(updatedTwice);
    });

    it('should be immutable', () => {
      const progress = Progress.create(courseId);
      const lessonId = LessonId.create('lesson-1');

      const updatedProgress = progress.markLessonAsCompleted(lessonId);

      expect(progress.completedCount).toBe(0);
      expect(updatedProgress.completedCount).toBe(1);
    });
  });

  describe('hasCompletedLesson', () => {
    it('should return true for completed lesson', () => {
      const lessonId = LessonId.create('lesson-1');
      const progress = Progress.create(courseId).markLessonAsCompleted(lessonId);

      expect(progress.hasCompletedLesson(lessonId)).toBe(true);
    });

    it('should return false for uncompleted lesson', () => {
      const progress = Progress.create(courseId);
      const lessonId = LessonId.create('lesson-1');

      expect(progress.hasCompletedLesson(lessonId)).toBe(false);
    });
  });

  describe('calculateCompletionRate', () => {
    it('should calculate completion rate correctly', () => {
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'))
        .markLessonAsCompleted(LessonId.create('lesson-2'));

      expect(progress.calculateCompletionRate(10)).toBe(20);
    });

    it('should return 0 when total lessons is 0', () => {
      const progress = Progress.create(courseId);

      expect(progress.calculateCompletionRate(0)).toBe(0);
    });

    it('should return 100 when all lessons completed', () => {
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'))
        .markLessonAsCompleted(LessonId.create('lesson-2'));

      expect(progress.calculateCompletionRate(2)).toBe(100);
    });
  });
});
