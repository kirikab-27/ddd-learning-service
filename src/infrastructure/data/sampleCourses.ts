import { Course, Chapter, Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';
import { chapter1Lessons, chapter2Lessons, chapter3Lessons, chapter4Lessons, chapter5Lessons, chapter6Lessons, chapter7Lessons, chapter8Lessons, chapter9Lessons, chapter10Lessons, chapter11Lessons, chapter12Lessons } from './sampleLessons';

// =============================================================================
// 第1部: DDDの基礎概念
// =============================================================================

// Chapter 1: ドメインとは何か
const chapter1 = Chapter.create({
  id: ChapterId.create('chapter-1'),
  title: 'Chapter 1: ドメインとは何か',
  order: 1,
  lessons: chapter1Lessons,
});

// Chapter 2: ユビキタス言語
const chapter2 = Chapter.create({
  id: ChapterId.create('chapter-2'),
  title: 'Chapter 2: ユビキタス言語',
  order: 2,
  lessons: chapter2Lessons,
});

// Chapter 3: 境界づけられたコンテキスト
const chapter3 = Chapter.create({
  id: ChapterId.create('chapter-3'),
  title: 'Chapter 3: 境界づけられたコンテキスト',
  order: 3,
  lessons: chapter3Lessons,
});

// Chapter 4: コンテキストマップ
const chapter4 = Chapter.create({
  id: ChapterId.create('chapter-4'),
  title: 'Chapter 4: コンテキストマップ',
  order: 4,
  lessons: chapter4Lessons,
});

// =============================================================================
// 第2部: 戦術的設計パターン
// =============================================================================

// Chapter 5: 値オブジェクト
const chapter5 = Chapter.create({
  id: ChapterId.create('chapter-5'),
  title: 'Chapter 5: 値オブジェクト',
  order: 5,
  lessons: chapter5Lessons,
});

// Chapter 6: エンティティ
const chapter6 = Chapter.create({
  id: ChapterId.create('chapter-6'),
  title: 'Chapter 6: エンティティ',
  order: 6,
  lessons: chapter6Lessons,
});

// Chapter 7: ドメインサービス
const chapter7 = Chapter.create({
  id: ChapterId.create('chapter-7'),
  title: 'Chapter 7: ドメインサービス',
  order: 7,
  lessons: chapter7Lessons,
});

// Chapter 8: 集約
const chapter8 = Chapter.create({
  id: ChapterId.create('chapter-8'),
  title: 'Chapter 8: 集約',
  order: 8,
  lessons: chapter8Lessons,
});

// Chapter 9: リポジトリ
const chapter9 = Chapter.create({
  id: ChapterId.create('chapter-9'),
  title: 'Chapter 9: リポジトリ',
  order: 9,
  lessons: chapter9Lessons,
});

// Chapter 10: ファクトリ
const chapter10 = Chapter.create({
  id: ChapterId.create('chapter-10'),
  title: 'Chapter 10: ファクトリ',
  order: 10,
  lessons: chapter10Lessons,
});

// Chapter 11: 仕様パターン
const chapter11 = Chapter.create({
  id: ChapterId.create('chapter-11'),
  title: 'Chapter 11: 仕様パターン',
  order: 11,
  lessons: chapter11Lessons,
});

// =============================================================================
// 第3部: アーキテクチャパターン
// =============================================================================

// Chapter 12: レイヤードアーキテクチャ
const chapter12 = Chapter.create({
  id: ChapterId.create('chapter-12'),
  title: 'Chapter 12: レイヤードアーキテクチャ',
  order: 12,
  lessons: chapter12Lessons,
});

// =============================================================================
// コース定義
// =============================================================================

const ddsCourse = Course.create({
  id: CourseId.create('ddd-practice'),
  title: 'DDD基礎コース',
  description: 'ドメイン駆動設計の基礎を学ぶコースです。',
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12],
});

export const sampleCourses: Course[] = [ddsCourse];
