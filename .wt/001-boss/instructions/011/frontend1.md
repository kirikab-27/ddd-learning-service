# Ticket 011: Frontend1 - Chapter 5 値オブジェクト拡充

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 5: 値オブジェクト

3つのレッスンと各レッスン5問のクイズを作成・拡充する。
Phase 2（第2部: 戦術的設計パターン）の開始。

## レッスン詳細

### Lesson 5-1: 値オブジェクトとは（既存を拡充）

**現状**: 基本的な説明のみ

**拡充内容:**
- 値オブジェクトの定義と目的
  - DDDにおける値オブジェクトの位置づけ
  - プリミティブ型との違い
- 不変性（Immutability）
  - なぜ不変性が重要か
  - 副作用の防止
  - スレッドセーフティ
- 等価性（Equality）
  - IDではなく値で比較
  - 構造的等価性 vs 参照等価性
- 値オブジェクトの例
  - Money（金額）
  - Email（メールアドレス）
  - DateRange（日付範囲）

### Lesson 5-2: 値オブジェクトの実装（新規）

**内容要件:**
- TypeScriptでの実装パターン
  - privateコンストラクタ
  - static factoryメソッド
  - readonly修飾子の活用
- 実装例
  ```typescript
  class Email {
    private constructor(private readonly value: string) {}

    static create(value: string): Email {
      if (!this.isValid(value)) {
        throw new Error('Invalid email');
      }
      return new Email(value);
    }

    private static isValid(value: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    equals(other: Email): boolean {
      return this.value === other.value;
    }

    toString(): string {
      return this.value;
    }
  }
  ```
- ドメインプリミティブの概念
- 値オブジェクトの合成

### Lesson 5-3: 自己検証と不変条件（新規）

**内容要件:**
- 自己検証（Self-Validation）
  - 生成時のバリデーション
  - 不正な状態を防ぐ
- 不変条件（Invariants）
  - 常に満たすべき条件
  - ビジネスルールの表現
- ファクトリメソッド
  - create() vs reconstruct()
  - 永続化からの復元
- エラーハンドリング
  - Result型の活用
  - カスタム例外

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 5-1用）:**
```typescript
{
  id: QuizId.create('quiz-5-1'),
  lessonId: LessonId.create('lesson-5-1'),
  questions: [
    Question.create({
      id: 'q5-1-1',
      text: '値オブジェクトの最も重要な特徴は何ですか？',
      options: [
        { id: 'a', text: '一意のIDを持つ', isCorrect: false },
        { id: 'b', text: '不変性と等価性', isCorrect: true },
        { id: 'c', text: 'データベースに保存できる', isCorrect: false },
        { id: 'd', text: 'ライフサイクルを持つ', isCorrect: false },
      ],
      explanation: '値オブジェクトは不変であり、IDではなく値の等価性で比較されます。',
    }),
    // ... 残り4問
  ],
}
```

## 対象ファイル

### 更新
```
src/infrastructure/data/sampleLessons.ts
  - lesson5_1 の内容拡充
  - lesson5_2, lesson5_3 の新規追加
  - chapter5Lessons のエクスポート追加

src/infrastructure/data/sampleQuizzes.ts
  - quiz-5-1, quiz-5-2, quiz-5-3 の追加

src/infrastructure/data/sampleCourses.ts
  - chapter5 を chapter5Lessons を使用するように変更
```

## 実装パターン

### sampleLessons.ts
```typescript
// Chapter 5 用レッスン
export const lesson5_1 = Lesson.create({
  id: LessonId.create('lesson-5-1'),
  title: LessonTitle.create('値オブジェクトとは'),
  content: MarkdownContent.create(`
# 値オブジェクトとは

## 概要
...（拡充された内容）
  `),
  order: 1,
});

export const lesson5_2 = Lesson.create({
  id: LessonId.create('lesson-5-2'),
  title: LessonTitle.create('値オブジェクトの実装'),
  content: MarkdownContent.create(`
# 値オブジェクトの実装

## 概要
...
  `),
  order: 2,
});

export const lesson5_3 = Lesson.create({
  id: LessonId.create('lesson-5-3'),
  title: LessonTitle.create('自己検証と不変条件'),
  content: MarkdownContent.create(`
# 自己検証と不変条件

## 概要
...
  `),
  order: 3,
});

export const chapter5Lessons = [lesson5_1, lesson5_2, lesson5_3];
```

### sampleCourses.ts
```typescript
import { chapter5Lessons } from './sampleLessons';

const chapter5 = Chapter.create({
  id: ChapterId.create('chapter-5'),
  title: 'Chapter 5: 値オブジェクト',
  order: 5,
  lessons: chapter5Lessons, // 変更: [lesson5_1] → chapter5Lessons
});
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に追加されている
- [ ] chapter5Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている（計15問）
- [ ] sampleCourses.ts が chapter5Lessons を使用している
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 011 - Chapter 5 値オブジェクト拡充完了。PR #XX を作成しました。Phase 2開始！"
```
