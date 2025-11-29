import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { Course } from '@/domain/content/models/Course';
import { CourseId } from '@/domain/shared';

export class InMemoryCourseRepository implements ICourseRepository {
  private courses: Map<string, Course> = new Map();

  constructor(initialCourses: Course[] = []) {
    initialCourses.forEach(course => {
      this.courses.set(course.id.toString(), course);
    });
  }

  async findById(id: CourseId): Promise<Course | null> {
    return this.courses.get(id.toString()) ?? null;
  }

  async findAll(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
}
