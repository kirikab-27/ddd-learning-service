# Frontend1: Chapter 5 コンテンツ拡充

## Task Overview
Chapter 5「値オブジェクト」を 3 レッスン構成に拡充する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. 既存コンテンツの確認

現在の `sampleCourses.ts` には lesson-5-1 のみが存在。
内容を確認し、lesson-5-1 として適切か確認する。

### 2. sampleLessons.ts の更新

chapter5Lessons を作成し、3レッスン構成にする:

```typescript
// src/infrastructure/data/sampleLessons.ts

export const chapter5Lessons = [
  Lesson.create({
    id: LessonId.create('lesson-5-1'),
    chapterId: ChapterId.create('chapter-5'),
    title: LessonTitle.create('値オブジェクトとは'),
    order: 1,
    content: MarkdownContent.create(lesson5_1_content),
    quizId: QuizId.create('quiz-lesson-5-1'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-5-2'),
    chapterId: ChapterId.create('chapter-5'),
    title: LessonTitle.create('値オブジェクトの実装'),
    order: 2,
    content: MarkdownContent.create(lesson5_2_content),
    quizId: QuizId.create('quiz-lesson-5-2'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-5-3'),
    chapterId: ChapterId.create('chapter-5'),
    title: LessonTitle.create('自己検証と不変条件'),
    order: 3,
    content: MarkdownContent.create(lesson5_3_content),
    quizId: QuizId.create('quiz-lesson-5-3'),
  }),
];
```

### 3. sampleQuizzes.ts の更新

新規レッスン（5-2, 5-3）に5問ずつ、計10問のクイズを追加。
既存の quiz-lesson-5-1 があるか確認し、なければ追加。

### 4. sampleCourses.ts の更新

chapter-5 を chapter5Lessons で置き換え:

```typescript
import { chapter5Lessons } from './sampleLessons';

const chapter5 = Chapter.create({
  id: ChapterId.create('chapter-5'),
  title: 'Chapter 5: 値オブジェクト',
  order: 5,
  lessons: chapter5Lessons,
});
```

## レッスンコンテンツ詳細

### Lesson 5-1: 値オブジェクトとは（既存調整）

```markdown
# 値オブジェクトとは

## 概要
このレッスンでは、DDDの基本的な構成要素である「値オブジェクト」について学びます。
値オブジェクトの特性を理解し、いつ使うべきかを判断できるようになりましょう。

## 値オブジェクトの定義

> **値オブジェクト（Value Object）** は、その属性の値によって識別されるオブジェクトです。
> エンティティとは異なり、固有のIDを持ちません。

### 現実世界の例

\`\`\`
お金（Money）:
  1万円札 A と 1万円札 B は「同じ」と扱われる
  → どの札かは重要ではなく、金額が重要

色（Color）:
  RGB(255, 0, 0) と RGB(255, 0, 0) は「同じ赤」
  → 同じ値なら同じ色

住所（Address）:
  「東京都渋谷区1-1-1」は値で識別
  → 同じ住所文字列なら同じ場所
\`\`\`

## 値オブジェクトの3つの特性

### 1. 不変性（Immutability）

一度作成したら変更できない:

\`\`\`typescript
// ❌ 悪い例: 可変な値オブジェクト
class Money {
  amount: number;  // 変更可能

  setAmount(newAmount: number) {
    this.amount = newAmount;  // 状態を変更
  }
}

// ✅ 良い例: 不変な値オブジェクト
class Money {
  private readonly _amount: number;

  private constructor(amount: number) {
    this._amount = amount;
  }

  // 新しいインスタンスを返す
  add(other: Money): Money {
    return new Money(this._amount + other._amount);
  }
}
\`\`\`

### 2. 等価性（Equality）

値が同じなら等しいと判断:

\`\`\`typescript
class Money {
  // IDではなく、値で比較
  equals(other: Money): boolean {
    return this._amount === other._amount &&
           this._currency === other._currency;
  }
}

const money1 = Money.create(1000, 'JPY');
const money2 = Money.create(1000, 'JPY');

console.log(money1 === money2);     // false（参照比較）
console.log(money1.equals(money2)); // true（値比較）
\`\`\`

### 3. 自己完結性（Self-Validation）

自分自身のバリデーションを持つ:

\`\`\`typescript
class Money {
  static create(amount: number, currency: string): Money {
    // 自己検証
    if (amount < 0) {
      throw new Error('金額は0以上である必要があります');
    }
    if (!['JPY', 'USD', 'EUR'].includes(currency)) {
      throw new Error('サポートされていない通貨です');
    }
    return new Money(amount, currency);
  }
}
\`\`\`

## 値オブジェクトを使う場面

| 使う場面 | 例 |
|---------|-----|
| 計測・定量化 | 金額、長さ、重さ、時間 |
| 説明・属性 | 色、住所、名前、メールアドレス |
| 範囲・期間 | 日付範囲、価格帯 |
| 複合値 | 座標(x, y)、通貨+金額 |

## まとめ

- 値オブジェクトは**値によって識別**される
- **不変性**を持ち、変更する場合は新しいインスタンスを作る
- **等価性**は値で判断する
- **自己検証**により常に正しい状態を保証する
```

### Lesson 5-2: 値オブジェクトの実装

```markdown
# 値オブジェクトの実装

## 概要
このレッスンでは、TypeScriptで値オブジェクトを実装するパターンを学びます。
実践的なコード例を通じて、値オブジェクトの実装テクニックを身につけましょう。

## 基本的な実装パターン

### パターン1: クラスベース

\`\`\`typescript
export class Email {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('無効なメールアドレス形式です');
    }
    return new Email(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
\`\`\`

### パターン2: 複数の属性を持つ値オブジェクト

\`\`\`typescript
export class Money {
  private readonly _amount: number;
  private readonly _currency: Currency;

  private constructor(amount: number, currency: Currency) {
    this._amount = amount;
    this._currency = currency;
  }

  static create(amount: number, currency: Currency): Money {
    if (amount < 0) {
      throw new Error('金額は0以上である必要があります');
    }
    return new Money(amount, currency);
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): Currency {
    return this._currency;
  }

  add(other: Money): Money {
    if (!this._currency.equals(other._currency)) {
      throw new Error('異なる通貨は加算できません');
    }
    return Money.create(this._amount + other._amount, this._currency);
  }

  subtract(other: Money): Money {
    if (!this._currency.equals(other._currency)) {
      throw new Error('異なる通貨は減算できません');
    }
    return Money.create(this._amount - other._amount, this._currency);
  }

  multiply(multiplier: number): Money {
    return Money.create(this._amount * multiplier, this._currency);
  }

  equals(other: Money): boolean {
    return this._amount === other._amount &&
           this._currency.equals(other._currency);
  }
}
\`\`\`

## 値オブジェクトの比較メソッド

### equalsの実装

\`\`\`typescript
class DateRange {
  private readonly _start: Date;
  private readonly _end: Date;

  equals(other: DateRange): boolean {
    return this._start.getTime() === other._start.getTime() &&
           this._end.getTime() === other._end.getTime();
  }

  // ハッシュ値も実装すると便利
  hashCode(): number {
    return this._start.getTime() * 31 + this._end.getTime();
  }
}
\`\`\`

## 変換メソッドのパターン

### toプリミティブ

\`\`\`typescript
class UserId {
  private readonly _value: string;

  // プリミティブへの変換
  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}
\`\`\`

### fromプリミティブ（ファクトリメソッド）

\`\`\`typescript
class UserId {
  static fromString(value: string): UserId {
    return UserId.create(value);
  }

  static fromNumber(value: number): UserId {
    return UserId.create(value.toString());
  }
}
\`\`\`

## 実装のベストプラクティス

### 1. コンストラクタをprivateにする

\`\`\`typescript
class Email {
  // ✅ privateコンストラクタ
  private constructor(value: string) {
    this._value = value;
  }

  // ファクトリメソッドで作成
  static create(value: string): Email {
    // バリデーション
    return new Email(value);
  }
}
\`\`\`

### 2. readonlyを活用する

\`\`\`typescript
class Money {
  // ✅ readonlyで不変性を保証
  private readonly _amount: number;
  private readonly _currency: Currency;
}
\`\`\`

### 3. 防御的コピー

\`\`\`typescript
class DateRange {
  private readonly _start: Date;
  private readonly _end: Date;

  get start(): Date {
    // ✅ 新しいDateオブジェクトを返す（防御的コピー）
    return new Date(this._start.getTime());
  }
}
\`\`\`

## まとめ

- **privateコンストラクタ** + **ファクトリメソッド**パターンを使う
- **readonly**で不変性を保証する
- **equals**メソッドで値の比較を実装する
- **防御的コピー**でミュータブルな内部値を保護する
- **変換メソッド**（toString, toJSON）を提供する
```

### Lesson 5-3: 自己検証と不変条件

```markdown
# 自己検証と不変条件

## 概要
このレッスンでは、値オブジェクトの「自己検証」について詳しく学びます。
不変条件（invariant）を守り、常に正しい状態のオブジェクトを保証する方法を理解しましょう。

## 自己検証とは

> **自己検証**とは、オブジェクト自身が自分の正しさを検証する仕組みです。
> 値オブジェクトは作成時にバリデーションを行い、不正な状態を許しません。

### バリデーションの配置

\`\`\`
❌ バリデーションが散らばっている:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Controller  │ →  │  UseCase    │ →  │   Entity    │
│ validate()  │    │ validate()  │    │ validate()  │
└─────────────┘    └─────────────┘    └─────────────┘

✅ 値オブジェクトで一元管理:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Controller  │ →  │  UseCase    │ →  │   Entity    │
└──────┬──────┘    └─────────────┘    └─────────────┘
       │
       ▼
┌─────────────┐
│ ValueObject │ ← バリデーションはここだけ
│ create()で  │
│ 検証        │
└─────────────┘
\`\`\`

## 不変条件（Invariant）

### 不変条件とは

オブジェクトが常に満たすべき条件:

\`\`\`typescript
// Email の不変条件:
// 1. 空文字列ではない
// 2. @を含む
// 3. 有効な形式である

// Money の不変条件:
// 1. 金額は0以上（負の金額は許可しない場合）
// 2. 通貨は有効な通貨コード
\`\`\`

### 不変条件の強制

\`\`\`typescript
class PositiveNumber {
  private readonly _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  static create(value: number): PositiveNumber {
    // 不変条件: 正の数であること
    if (value <= 0) {
      throw new InvalidPositiveNumberError(
        \`値は正の数である必要があります: \${value}\`
      );
    }
    return new PositiveNumber(value);
  }

  // 演算後も不変条件を維持
  add(other: PositiveNumber): PositiveNumber {
    return PositiveNumber.create(this._value + other._value);
  }
}
\`\`\`

## ファクトリメソッドのパターン

### 基本パターン

\`\`\`typescript
class Username {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 20;
  private static readonly PATTERN = /^[a-zA-Z0-9_]+$/;

  static create(value: string): Username {
    const trimmed = value.trim();

    if (trimmed.length < this.MIN_LENGTH) {
      throw new Error(
        \`ユーザー名は\${this.MIN_LENGTH}文字以上必要です\`
      );
    }

    if (trimmed.length > this.MAX_LENGTH) {
      throw new Error(
        \`ユーザー名は\${this.MAX_LENGTH}文字以下にしてください\`
      );
    }

    if (!this.PATTERN.test(trimmed)) {
      throw new Error(
        'ユーザー名は英数字とアンダースコアのみ使用できます'
      );
    }

    return new Username(trimmed);
  }
}
\`\`\`

### Result型パターン（例外を投げない）

\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

class Email {
  static create(value: string): Result<Email, string> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      return { success: false, error: 'メールアドレスは必須です' };
    }

    if (!emailRegex.test(value)) {
      return { success: false, error: '無効なメールアドレス形式です' };
    }

    return { success: true, value: new Email(value) };
  }
}

// 使用例
const result = Email.create(input);
if (result.success) {
  const email = result.value;
  // 処理続行
} else {
  console.error(result.error);
}
\`\`\`

## 複合バリデーション

### 複数条件の検証

\`\`\`typescript
class Password {
  private static readonly MIN_LENGTH = 8;
  private static readonly REQUIRE_UPPERCASE = /[A-Z]/;
  private static readonly REQUIRE_LOWERCASE = /[a-z]/;
  private static readonly REQUIRE_NUMBER = /[0-9]/;

  static create(value: string): Password {
    const errors: string[] = [];

    if (value.length < this.MIN_LENGTH) {
      errors.push(\`\${this.MIN_LENGTH}文字以上\`);
    }
    if (!this.REQUIRE_UPPERCASE.test(value)) {
      errors.push('大文字を含む');
    }
    if (!this.REQUIRE_LOWERCASE.test(value)) {
      errors.push('小文字を含む');
    }
    if (!this.REQUIRE_NUMBER.test(value)) {
      errors.push('数字を含む');
    }

    if (errors.length > 0) {
      throw new Error(
        \`パスワードは以下の条件を満たす必要があります: \${errors.join(', ')}\`
      );
    }

    return new Password(value);
  }
}
\`\`\`

## まとめ

- **自己検証**により値オブジェクトは常に正しい状態を保証する
- **不変条件**はオブジェクトが満たすべきルール
- **ファクトリメソッド**でバリデーションを一元化
- **Result型**パターンで例外を使わない検証も可能
- 複数条件は**まとめて検証**してわかりやすいエラーを返す
```

## Definition of Done

- [ ] Lesson 5-1 の内容が確認・調整されている
- [ ] Lesson 5-2, 5-3 のコンテンツが作成されている
- [ ] 新規レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter5Lessons が更新されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-5 が更新されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 5 コンテンツ拡充完了。3レッスン + 15問のクイズを作成しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- Ticket 006-009 の成果物
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
- src/infrastructure/data/sampleCourses.ts
