import { Course, Chapter, Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { CourseId, ChapterId, LessonId } from '@/domain/shared';

const lesson1 = Lesson.create({
  id: LessonId.create('lesson-1'),
  title: LessonTitle.create('DDDとは何か'),
  content: MarkdownContent.create(`
# DDDとは何か

**ドメイン駆動設計（Domain-Driven Design: DDD）** は、複雑なソフトウェア開発において、
ビジネスドメインの理解を中心に据えたアプローチです。

## なぜDDDが重要なのか

1. **ビジネスとコードの整合性**: ドメインエキスパートと開発者が同じ言語で会話できる
2. **保守性の向上**: 変更に強い設計が可能
3. **複雑性の管理**: 境界づけられたコンテキストで複雑性を分離

## DDDの主要な概念

### 戦略的設計
- ユビキタス言語
- 境界づけられたコンテキスト
- コンテキストマップ

### 戦術的設計
- エンティティ
- 値オブジェクト
- 集約
- リポジトリ

\`\`\`typescript
// 値オブジェクトの例
class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!value.includes('@')) {
      throw new Error('Invalid email format');
    }
    return new Email(value);
  }
}
\`\`\`

次のレッスンでは、値オブジェクトについて詳しく学びます。
`),
  order: 1,
});

const lesson2 = Lesson.create({
  id: LessonId.create('lesson-2'),
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
  order: 2,
});

const lesson3 = Lesson.create({
  id: LessonId.create('lesson-3'),
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
  order: 3,
});

const chapter1 = Chapter.create({
  id: ChapterId.create('chapter-1'),
  title: '第1章: DDD入門',
  order: 1,
  lessons: [lesson1, lesson2, lesson3],
});

const lesson4 = Lesson.create({
  id: LessonId.create('lesson-4'),
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

const chapter2 = Chapter.create({
  id: ChapterId.create('chapter-2'),
  title: '第2章: 戦術的設計',
  order: 2,
  lessons: [lesson4],
});

const ddsCourse = Course.create({
  id: CourseId.create('ddd-basics'),
  title: 'DDD基礎コース',
  description: 'ドメイン駆動設計の基礎を学ぶコースです。',
  chapters: [chapter1, chapter2],
});

export const sampleCourses: Course[] = [ddsCourse];
