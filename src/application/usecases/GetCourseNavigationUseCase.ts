import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { CourseId } from '@/domain/shared';
import { LessonUnlockSpecification } from '@/domain/content/specifications/LessonUnlockSpecification';
import { Progress } from '@/domain/progress/models/Progress';

export interface GetCourseNavigationInput {
  courseId: string;
  currentLessonId?: string;
}

export interface NavigationLesson {
  id: string;
  title: string;
  order: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
}

export interface NavigationChapter {
  id: string;
  title: string;
  order: number;
  lessons: NavigationLesson[];
  isExpanded: boolean;
}

export interface GetCourseNavigationOutput {
  courseId: string;
  courseTitle: string;
  chapters: NavigationChapter[];
  completionRate: number;
}

export class GetCourseNavigationUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository
  ) {}

  async execute(input: GetCourseNavigationInput): Promise<GetCourseNavigationOutput> {
    const courseId = CourseId.create(input.courseId);

    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const progress = await this.progressRepository.findByCourseId(courseId)
      ?? Progress.create(courseId);

    const unlockSpec = new LessonUnlockSpecification();

    const chapters: NavigationChapter[] = course.chapters.map(chapter => {
      const containsCurrentLesson = chapter.lessons.some(
        l => l.id.toString() === input.currentLessonId
      );

      const lessons: NavigationLesson[] = chapter.lessons.map(lesson => ({
        id: lesson.id.toString(),
        title: lesson.title.toString(),
        order: lesson.order,
        isCompleted: progress.hasCompletedLesson(lesson.id),
        isUnlocked: unlockSpec.isSatisfiedBy(lesson, course, progress),
        isCurrent: lesson.id.toString() === input.currentLessonId,
      }));

      return {
        id: chapter.id.toString(),
        title: chapter.title,
        order: chapter.order,
        lessons,
        isExpanded: containsCurrentLesson,
      };
    });

    const completionRate = progress.calculateCompletionRate(course.totalLessons);

    return {
      courseId: course.id.toString(),
      courseTitle: course.title,
      chapters,
      completionRate,
    };
  }
}
