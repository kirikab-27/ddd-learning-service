import { Course } from '@/domain/content/models/Course';
import { Chapter } from '@/domain/content/models/Chapter';
import { Lesson } from '@/domain/content/models/Lesson';

const createDDDCourse = (): Course => {
  const chapters: Chapter[] = [
    Chapter.create({
      id: 'chapter-1',
      title: 'DDDの基礎',
      order: 1,
      lessons: [
        Lesson.create({
          id: 'lesson-1-1',
          title: 'DDDとは何か',
          order: 1,
          chapterId: 'chapter-1',
        }),
        Lesson.create({
          id: 'lesson-1-2',
          title: 'ユビキタス言語',
          order: 2,
          chapterId: 'chapter-1',
        }),
        Lesson.create({
          id: 'lesson-1-3',
          title: '境界づけられたコンテキスト',
          order: 3,
          chapterId: 'chapter-1',
        }),
      ],
    }),
    Chapter.create({
      id: 'chapter-2',
      title: '戦術的パターン',
      order: 2,
      lessons: [
        Lesson.create({
          id: 'lesson-2-1',
          title: 'エンティティと値オブジェクト',
          order: 1,
          chapterId: 'chapter-2',
        }),
        Lesson.create({
          id: 'lesson-2-2',
          title: '集約とリポジトリ',
          order: 2,
          chapterId: 'chapter-2',
        }),
        Lesson.create({
          id: 'lesson-2-3',
          title: 'ドメインサービス',
          order: 3,
          chapterId: 'chapter-2',
        }),
      ],
    }),
    Chapter.create({
      id: 'chapter-3',
      title: 'アプリケーション層',
      order: 3,
      lessons: [
        Lesson.create({
          id: 'lesson-3-1',
          title: 'ユースケース',
          order: 1,
          chapterId: 'chapter-3',
        }),
        Lesson.create({
          id: 'lesson-3-2',
          title: 'アプリケーションサービス',
          order: 2,
          chapterId: 'chapter-3',
        }),
      ],
    }),
  ];

  return Course.create({
    id: 'ddd-course',
    title: 'DDD入門コース',
    chapters,
  });
};

export const sampleCourses: Course[] = [createDDDCourse()];
