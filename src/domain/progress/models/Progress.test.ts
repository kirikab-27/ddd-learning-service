import { Progress } from './Progress';
import { LessonProgress } from './LessonProgress';
import { CourseId, LessonId } from '@/domain/shared';

describe('Progress', () => {
  describe('create', () => {
    it('新規の進捗を作成できる', () => {
      const courseId = CourseId.create('course-1');

      const progress = Progress.create(courseId);

      expect(progress.courseId.equals(courseId)).toBe(true);
      expect(progress.completedCount).toBe(0);
      expect(progress.completedLessons).toHaveLength(0);
    });
  });

  describe('restore', () => {
    it('永続化データから進捗を復元できる', () => {
      const courseId = CourseId.create('course-1');
      const lessonProgress1 = LessonProgress.create(LessonId.create('lesson-1'));
      const lessonProgress2 = LessonProgress.create(LessonId.create('lesson-2'));

      const progress = Progress.restore(courseId, [lessonProgress1, lessonProgress2]);

      expect(progress.courseId.equals(courseId)).toBe(true);
      expect(progress.completedCount).toBe(2);
      expect(progress.hasCompletedLesson(LessonId.create('lesson-1'))).toBe(true);
      expect(progress.hasCompletedLesson(LessonId.create('lesson-2'))).toBe(true);
    });
  });

  describe('hasCompletedLesson', () => {
    it('完了済みレッスンに対してtrueを返す', () => {
      const courseId = CourseId.create('course-1');
      const lessonId = LessonId.create('lesson-1');
      const progress = Progress.create(courseId).markLessonAsCompleted(lessonId);

      expect(progress.hasCompletedLesson(lessonId)).toBe(true);
    });

    it('未完了レッスンに対してfalseを返す', () => {
      const courseId = CourseId.create('course-1');
      const lessonId = LessonId.create('lesson-1');
      const progress = Progress.create(courseId);

      expect(progress.hasCompletedLesson(lessonId)).toBe(false);
    });
  });

  describe('markLessonAsCompleted', () => {
    it('レッスンを完了としてマークできる', () => {
      const courseId = CourseId.create('course-1');
      const lessonId = LessonId.create('lesson-1');
      const progress = Progress.create(courseId);

      const updated = progress.markLessonAsCompleted(lessonId);

      expect(updated.hasCompletedLesson(lessonId)).toBe(true);
      expect(updated.completedCount).toBe(1);
    });

    it('既に完了済みの場合は同じインスタンスを返す', () => {
      const courseId = CourseId.create('course-1');
      const lessonId = LessonId.create('lesson-1');
      const progress = Progress.create(courseId).markLessonAsCompleted(lessonId);

      const updated = progress.markLessonAsCompleted(lessonId);

      expect(updated).toBe(progress);
      expect(updated.completedCount).toBe(1);
    });

    it('元のProgressインスタンスは変更されない（不変性）', () => {
      const courseId = CourseId.create('course-1');
      const lessonId = LessonId.create('lesson-1');
      const original = Progress.create(courseId);

      const updated = original.markLessonAsCompleted(lessonId);

      expect(original.completedCount).toBe(0);
      expect(updated.completedCount).toBe(1);
    });
  });

  describe('calculateCompletionRate', () => {
    it('進捗率を正しく計算する', () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'))
        .markLessonAsCompleted(LessonId.create('lesson-2'));

      expect(progress.calculateCompletionRate(10)).toBe(20);
    });

    it('totalLessonsが0の場合は0を返す', () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId);

      expect(progress.calculateCompletionRate(0)).toBe(0);
    });

    it('小数点以下は四捨五入される', () => {
      const courseId = CourseId.create('course-1');
      const progress = Progress.create(courseId)
        .markLessonAsCompleted(LessonId.create('lesson-1'));

      expect(progress.calculateCompletionRate(3)).toBe(33); // 33.33... -> 33
    });
  });
});
