import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { CourseId } from '@/domain/shared';
import { Course } from '@/domain/content/models/Course';

export class InMemoryCourseRepository implements ICourseRepository {
  constructor(private readonly courses: Course[]) {}

  async findById(courseId: CourseId): Promise<Course | null> {
    return this.courses.find(c => c.id.toString() === courseId.toString()) ?? null;
  }

  async findAll(): Promise<Course[]> {
    return [...this.courses];
  }
}
