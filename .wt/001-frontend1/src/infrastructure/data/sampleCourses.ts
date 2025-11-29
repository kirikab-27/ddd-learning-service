import { Course, Chapter, Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';
import { chapter1Lessons, chapter2Lessons, chapter3Lessons, chapter4Lessons, chapter5Lessons } from './sampleLessons';

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

// Chapter 7: ドメインサービス（後続チケットで追加予定）

// Chapter 8: 集約
const lesson8_1 = Lesson.create({
  id: LessonId.create('lesson-8-1'),
  title: LessonTitle.create('集約とは'),
  content: MarkdownContent.create(`
# 集約（Aggregate）

**集約** は、データ変更の一貫性を保つためにひとまとまりとして扱うオブジェクトの集まりです。

## 集約の構成要素

1. **集約ルート**: 外部からアクセスする唯一のエントリポイント
2. **境界**: トランザクションの一貫性を保つ範囲
3. **内部エンティティ/値オブジェクト**: 集約内部のオブジェクト

## 集約の設計原則

- 集約はできるだけ小さくする
- 他の集約への参照はIDで保持する
- 境界をまたいだ変更は結果整合性で対応する

\`\`\`typescript
export class Order {
  private constructor(
    private readonly _id: OrderId,
    private _items: OrderItem[],
    private _status: OrderStatus
  ) {}

  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.Draft) {
      throw new Error('Cannot modify confirmed order');
    }
    this._items.push(item);
  }

  confirm(): void {
    if (this._items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    this._status = OrderStatus.Confirmed;
  }
}
\`\`\`
`),
  order: 1,
});

const chapter8 = Chapter.create({
  id: ChapterId.create('chapter-8'),
  title: 'Chapter 8: 集約',
  order: 8,
  lessons: [lesson8_1],
});

// =============================================================================
// コース定義
// =============================================================================

const ddsCourse = Course.create({
  id: CourseId.create('ddd-practice'),
  title: 'DDD基礎コース',
  description: 'ドメイン駆動設計の基礎を学ぶコースです。',
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter8],
});

export const sampleCourses: Course[] = [ddsCourse];
