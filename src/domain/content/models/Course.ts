import { CourseId } from '@/domain/shared';
import { Chapter } from './Chapter';

export class Course {
  constructor(
    public readonly id: CourseId,
    public readonly title: string,
    public readonly chapters: Chapter[]
  ) {}

  static create(props: {
    id: string;
    title: string;
    chapters: Chapter[];
  }): Course {
    return new Course(
      CourseId.create(props.id),
      props.title,
      props.chapters
    );
  }

  get totalLessons(): number {
    return this.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  }

  findLessonById(lessonId: string): { chapter: Chapter; lesson: import('./Lesson').Lesson } | null {
    for (const chapter of this.chapters) {
      const lesson = chapter.lessons.find(l => l.id.toString() === lessonId);
      if (lesson) {
        return { chapter, lesson };
      }
    }
    return null;
  }
}
