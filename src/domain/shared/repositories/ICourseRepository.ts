import { Course } from '@/domain/content/models/Course';
import { CourseId } from '../CourseId';

export interface ICourseRepository {
  findById(id: CourseId): Promise<Course | null>;
  findAll(): Promise<Course[]>;
}
