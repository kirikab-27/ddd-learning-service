import { LessonProgress } from './LessonProgress';
import { LessonId } from '@/domain/shared';

describe('LessonProgress', () => {
  describe('create', () => {
    it('LessonIdと完了日時でインスタンスを作成できる', () => {
      const lessonId = LessonId.create('lesson-1');
      const completedAt = new Date('2024-01-15T10:00:00Z');

      const progress = LessonProgress.create(lessonId, completedAt);

      expect(progress.lessonId.equals(lessonId)).toBe(true);
      expect(progress.completedAt).toEqual(completedAt);
    });

    it('完了日時を省略すると現在時刻が設定される', () => {
      const lessonId = LessonId.create('lesson-1');
      const before = new Date();

      const progress = LessonProgress.create(lessonId);

      const after = new Date();
      expect(progress.completedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(progress.completedAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('equals', () => {
    it('同じLessonIdなら等価', () => {
      const lessonId = LessonId.create('lesson-1');
      const progress1 = LessonProgress.create(lessonId, new Date('2024-01-15'));
      const progress2 = LessonProgress.create(lessonId, new Date('2024-01-16'));

      expect(progress1.equals(progress2)).toBe(true);
    });

    it('異なるLessonIdなら非等価', () => {
      const progress1 = LessonProgress.create(LessonId.create('lesson-1'));
      const progress2 = LessonProgress.create(LessonId.create('lesson-2'));

      expect(progress1.equals(progress2)).toBe(false);
    });
  });
});
