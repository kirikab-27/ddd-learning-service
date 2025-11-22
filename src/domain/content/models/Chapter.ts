import { ChapterId } from '@/domain/shared';
import { Lesson } from './Lesson';

export class Chapter {
  constructor(
    public readonly id: ChapterId,
    public readonly title: string,
    public readonly order: number,
    public readonly lessons: Lesson[]
  ) {}

  static create(props: {
    id: string;
    title: string;
    order: number;
    lessons: Lesson[];
  }): Chapter {
    return new Chapter(
      ChapterId.create(props.id),
      props.title,
      props.order,
      props.lessons
    );
  }
}
