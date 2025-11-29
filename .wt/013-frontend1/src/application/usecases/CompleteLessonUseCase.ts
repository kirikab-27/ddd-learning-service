import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { CourseId, LessonId } from '@/domain/shared';
import { Progress } from '@/domain/progress/models/Progress';

export interface CompleteLessonInput {
  courseId: string;
  lessonId: string;
}

export interface CompleteLessonOutput {
  success: boolean;
  progress: {
    completedCount: number;
    totalLessons: number;
    completionRate: number;
  };
}

/**
 * Use case for marking a lesson as completed.
 *
 * This use case is idempotent - completing an already completed lesson
 * will return success with the current progress state.
 */
export class CompleteLessonUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository
  ) {}

  async execute(input: CompleteLessonInput): Promise<CompleteLessonOutput> {
    const courseId = CourseId.create(input.courseId);
    const lessonId = LessonId.create(input.lessonId);

    // Fetch the course to validate and get total lessons
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // Validate that the lesson exists in the course
    const lessonLocation = course.findLesson(lessonId);
    if (!lessonLocation) {
      throw new Error('Lesson not found in course');
    }

    // Get or create progress
    let progress = await this.progressRepository.findByCourseId(courseId);
    if (!progress) {
      progress = Progress.create(courseId);
    }

    // Mark lesson as completed (idempotent - returns same if already completed)
    const updatedProgress = progress.markLessonAsCompleted(lessonId);

    // Save progress
    await this.progressRepository.save(updatedProgress);

    // Calculate completion stats
    const totalLessons = course.totalLessons;
    const completedCount = updatedProgress.completedCount;
    const completionRate = updatedProgress.calculateCompletionRate(totalLessons);

    return {
      success: true,
      progress: {
        completedCount,
        totalLessons,
        completionRate,
      },
    };
  }
}
