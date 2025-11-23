import { Course, Chapter, Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';
import { chapter1Lessons } from './sampleLessons';

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

// Chapter 2-4: 後続チケットで追加予定

// =============================================================================
// 第2部: 戦術的設計パターン
// =============================================================================

// Chapter 5: 値オブジェクト
const lesson5_1 = Lesson.create({
  id: LessonId.create('lesson-5-1'),
  title: LessonTitle.create('値オブジェクト'),
  content: MarkdownContent.create(`
# 値オブジェクト

**値オブジェクト（Value Object）** は、DDDにおける基本的な構成要素の一つです。

## 値オブジェクトの特徴

1. **不変性（Immutability）**: 一度作成されたら変更されない
2. **等価性（Equality）**: アイデンティティではなく、属性の値で比較される
3. **自己完結性**: 自身のバリデーションロジックを持つ

## 実装例

\`\`\`typescript
export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: string
  ) {}

  static create(amount: number, currency: string): Money {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return Money.create(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount &&
           this.currency === other.currency;
  }
}
\`\`\`

## いつ値オブジェクトを使うか

- 計測や定量化を行う場合（金額、距離など）
- 他のオブジェクトの属性を記述する場合
- 不変性が望ましい場合
`),
  order: 1,
});

const chapter5 = Chapter.create({
  id: ChapterId.create('chapter-5'),
  title: 'Chapter 5: 値オブジェクト',
  order: 5,
  lessons: [lesson5_1],
});

// Chapter 6: エンティティ
const lesson6_1 = Lesson.create({
  id: LessonId.create('lesson-6-1'),
  title: LessonTitle.create('エンティティ'),
  content: MarkdownContent.create(`
# エンティティ

**エンティティ（Entity）** は、ライフサイクルを通じて一貫した同一性を持つオブジェクトです。

## エンティティの特徴

1. **同一性**: 一意の識別子によって区別される
2. **変更可能性**: 状態が時間とともに変化する可能性がある
3. **ライフサイクル**: 作成、更新、削除のライフサイクルを持つ

## 値オブジェクトとの違い

| 特徴 | エンティティ | 値オブジェクト |
|------|------------|--------------|
| 同一性 | IDで識別 | 値で識別 |
| 可変性 | 変更可能 | 不変 |
| 比較 | IDで比較 | 全属性で比較 |

## 実装例

\`\`\`typescript
export class User {
  private constructor(
    private readonly _id: UserId,
    private _name: UserName,
    private _email: Email
  ) {}

  static create(params: CreateUserParams): User {
    return new User(
      UserId.generate(),
      UserName.create(params.name),
      Email.create(params.email)
    );
  }

  get id(): UserId { return this._id; }
  get name(): UserName { return this._name; }
  get email(): Email { return this._email; }

  changeName(newName: UserName): void {
    this._name = newName;
  }

  equals(other: User): boolean {
    return this._id.equals(other._id);
  }
}
\`\`\`
`),
  order: 1,
});

const chapter6 = Chapter.create({
  id: ChapterId.create('chapter-6'),
  title: 'Chapter 6: エンティティ',
  order: 6,
  lessons: [lesson6_1],
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
  id: CourseId.create('course-ddd-basics'),
  title: 'DDD基礎コース',
  description: 'ドメイン駆動設計の基礎を学ぶコースです。',
  chapters: [chapter1, chapter5, chapter6, chapter8],
});

export const sampleCourses: Course[] = [ddsCourse];
