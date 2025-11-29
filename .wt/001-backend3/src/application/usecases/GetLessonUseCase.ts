import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { CourseId, LessonId } from '@/domain/shared';
import { Course } from '@/domain/content/models/Course';
import { LessonUnlockSpecification } from '@/domain/content/specifications/LessonUnlockSpecification';

export interface GetLessonInput {
  courseId: string;
  chapterId: string;
  lessonId: string;
}

export interface GetLessonOutput {
  lesson: {
    id: string;
    title: string;
    content: string;
    order: number;
    hasQuiz: boolean;
  };
  chapter: {
    id: string;
    title: string;
  };
  course: {
    id: string;
    title: string;
  };
  navigation: {
    previous: { chapterId: string; lessonId: string } | null;
    next: { chapterId: string; lessonId: string } | null;
  };
  isCompleted: boolean;
  isUnlocked: boolean;
}

export class GetLessonUseCase {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly progressRepository: IProgressRepository
  ) {}

  async execute(input: GetLessonInput): Promise<GetLessonOutput> {
    const courseId = CourseId.create(input.courseId);
    const lessonId = LessonId.create(input.lessonId);

    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const found = course.findLesson(lessonId);
    if (!found) {
      throw new Error('Lesson not found');
    }

    const { chapter, lesson } = found;

    const progress = await this.progressRepository.findByCourseId(courseId);
    const unlockSpec = new LessonUnlockSpecification();
    const isUnlocked = progress
      ? unlockSpec.isSatisfiedBy(lesson, course, progress)
      : lesson.order === 1;

    const adjacent = course.getAdjacentLessons(lessonId);

    return {
      lesson: {
        id: lesson.id.toString(),
        title: lesson.title.toString(),
        content: lesson.content.raw,
        order: lesson.order,
        hasQuiz: lesson.hasQuiz(),
      },
      chapter: {
        id: chapter.id.toString(),
        title: chapter.title,
      },
      course: {
        id: course.id.toString(),
        title: course.title,
      },
      navigation: {
        previous: adjacent.previous
          ? {
              chapterId: this.findChapterForLesson(course, adjacent.previous.id)!,
              lessonId: adjacent.previous.id.toString(),
            }
          : null,
        next: adjacent.next
          ? {
              chapterId: this.findChapterForLesson(course, adjacent.next.id)!,
              lessonId: adjacent.next.id.toString(),
            }
          : null,
      },
      isCompleted: progress?.hasCompletedLesson(lessonId) ?? false,
      isUnlocked,
    };
  }

  private findChapterForLesson(course: Course, lessonId: LessonId): string | null {
    for (const chapter of course.chapters) {
      if (chapter.lessons.some(l => l.id.equals(lessonId))) {
        return chapter.id.toString();
      }
    }
    return null;
  }
}
