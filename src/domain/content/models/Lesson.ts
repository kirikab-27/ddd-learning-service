import { LessonId, LessonTitle } from '@/domain/shared';

export class Lesson {
  constructor(
    public readonly id: LessonId,
    public readonly title: LessonTitle,
    public readonly order: number,
    public readonly chapterId: string
  ) {}

  static create(props: {
    id: string;
    title: string;
    order: number;
    chapterId: string;
  }): Lesson {
    return new Lesson(
      LessonId.create(props.id),
      LessonTitle.create(props.title),
      props.order,
      props.chapterId
    );
  }
}
