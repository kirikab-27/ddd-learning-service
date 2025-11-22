import { Progress } from '@/domain/progress/models/Progress';
import { CourseId } from '../CourseId';

export interface IProgressRepository {
  findByCourseId(courseId: CourseId): Promise<Progress | null>;
  save(progress: Progress): Promise<void>;
}
