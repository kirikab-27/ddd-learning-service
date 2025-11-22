import { CourseId } from '../valueObjects/CourseId';
import { Progress } from '@/domain/progress/models/Progress';

export interface IProgressRepository {
  findByCourseId(courseId: CourseId): Promise<Progress | null>;
  save(progress: Progress): Promise<void>;
}
