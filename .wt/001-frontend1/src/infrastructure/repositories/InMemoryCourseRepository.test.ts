import { InMemoryCourseRepository } from './InMemoryCourseRepository';
import { CourseId } from '@/domain/shared';

// Note: Course class is not yet implemented, so we use a mock
// This test will be fully functional once Content BC is implemented

describe('InMemoryCourseRepository', () => {
  describe('findById', () => {
    it('should return null for non-existent course', async () => {
      const repository = new InMemoryCourseRepository();
      const result = await repository.findById(CourseId.create('non-existent'));

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return empty array when no courses', async () => {
      const repository = new InMemoryCourseRepository();
      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });
});
