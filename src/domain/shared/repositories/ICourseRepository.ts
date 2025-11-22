import { CourseId } from '../valueObjects/CourseId';
import { Course } from '@/domain/content/models/Course';

export interface ICourseRepository {
  findById(courseId: CourseId): Promise<Course | null>;
  findAll(): Promise<Course[]>;
}
