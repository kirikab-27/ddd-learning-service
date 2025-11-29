import { LessonProgress } from './LessonProgress';
import { LessonId } from '@/domain/shared';

describe('LessonProgress', () => {
  describe('create', () => {
    it('should create a LessonProgress with given lessonId', () => {
      const lessonId = LessonId.create('lesson-1');
      const progress = LessonProgress.create(lessonId);

      expect(progress.lessonId.equals(lessonId)).toBe(true);
      expect(progress.completedAt).toBeInstanceOf(Date);
    });

    it('should create a LessonProgress with custom completedAt date', () => {
      const lessonId = LessonId.create('lesson-1');
      const completedAt = new Date('2024-01-01T00:00:00Z');
      const progress = LessonProgress.create(lessonId, completedAt);

      expect(progress.lessonId.equals(lessonId)).toBe(true);
      expect(progress.completedAt).toEqual(completedAt);
    });
  });

  describe('equals', () => {
    it('should return true for same lessonId', () => {
      const lessonId = LessonId.create('lesson-1');
      const progress1 = LessonProgress.create(lessonId);
      const progress2 = LessonProgress.create(lessonId);

      expect(progress1.equals(progress2)).toBe(true);
    });

    it('should return false for different lessonId', () => {
      const progress1 = LessonProgress.create(LessonId.create('lesson-1'));
      const progress2 = LessonProgress.create(LessonId.create('lesson-2'));

      expect(progress1.equals(progress2)).toBe(false);
    });
  });
});
