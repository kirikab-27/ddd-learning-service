# Ticket 013: Frontend1 - Chapter 7 ドメインサービス作成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 7: ドメインサービス

3つのレッスンと各レッスン5問のクイズを作成する。
Phase 2（第2部: 戦術的設計パターン）の継続。

## レッスン詳細

### Lesson 7-1: ドメインサービスとは（新規）

**内容要件:**
- ドメインサービスの定義
  - DDDにおけるドメインサービスの位置づけ
  - エンティティや値オブジェクトとの違い
- ドメインサービスが必要な場面
  - 複数のエンティティにまたがる処理
  - 特定のオブジェクトに属さないドメインロジック
  - ステートレスな操作
- ドメインサービスの例
  - TransferService（送金サービス）
  - DuplicationCheckService（重複チェックサービス）
  - PricingService（価格計算サービス）
- ドメインサービスの責務
  - ドメインロジックの実装
  - エンティティ間の協調
  - ビジネスルールの実行

### Lesson 7-2: ドメインサービスの実装（新規）

**内容要件:**
- TypeScriptでの実装パターン
  - インターフェース定義
  - ステートレスな実装
  - 依存性注入の活用
- 実装例
  ```typescript
  interface ITransferService {
    transfer(
      from: Account,
      to: Account,
      amount: Money
    ): TransferResult;
  }

  class TransferService implements ITransferService {
    transfer(
      from: Account,
      to: Account,
      amount: Money
    ): TransferResult {
      // ドメインルールの検証
      if (!from.canWithdraw(amount)) {
        throw new Error('Insufficient balance');
      }

      // 複数エンティティへの操作
      from.withdraw(amount);
      to.deposit(amount);

      return TransferResult.success(amount);
    }
  }
  ```
- ドメインサービスの命名
  - 動詞ベースの命名（Transfer, Calculate, Verify）
  - サービスの意図を明確に表現
- テスタビリティ
  - インターフェースによる抽象化
  - モックの活用

### Lesson 7-3: ドメインサービスのアンチパターン（新規）

**内容要件:**
- ドメインサービスの肥大化
  - 貧血ドメインモデルの兆候
  - エンティティから責務を奪わない
  - 適切な粒度の維持
- アプリケーションサービスとの違い
  - ドメインサービス: ドメインロジック
  - アプリケーションサービス: ユースケースの実行
  - 責務の明確な分離
- アンチパターン例
  ```typescript
  // ❌ Bad: エンティティの責務を奪っている
  class UserService {
    changeName(user: User, newName: string): void {
      user.name = newName; // エンティティが持つべきロジック
    }
  }

  // ✅ Good: エンティティに責務を持たせる
  class User {
    changeName(newName: UserName): void {
      this.name = newName;
    }
  }

  // ✅ Good: 複数エンティティにまたがる処理のみ
  class TransferService {
    transfer(from: Account, to: Account, amount: Money): void {
      // 複数のエンティティを協調させる
    }
  }
  ```
- ドメインサービスの適切な使用
  - 最小限に留める
  - エンティティファーストで考える
  - 真にドメインロジックか確認

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 7-1用）:**
```typescript
{
  id: QuizId.create('quiz-7-1'),
  lessonId: LessonId.create('lesson-7-1'),
  questions: [
    Question.create({
      id: 'q7-1-1',
      text: 'ドメインサービスが必要な場面はどれですか？',
      options: [
        { id: 'a', text: '単一エンティティの状態変更', isCorrect: false },
        { id: 'b', text: '複数のエンティティにまたがる処理', isCorrect: true },
        { id: 'c', text: 'データベースへの保存', isCorrect: false },
        { id: 'd', text: 'UI表示のための変換', isCorrect: false },
      ],
      explanation: 'ドメインサービスは、複数のエンティティや値オブジェクトにまたがるドメインロジックを実装する際に使用します。',
    }),
    // ... 残り4問
  ],
}
```

## 対象ファイル

### 更新
```
src/infrastructure/data/sampleLessons.ts
  - lesson7_1, lesson7_2, lesson7_3 の新規追加
  - chapter7Lessons のエクスポート追加

src/infrastructure/data/sampleQuizzes.ts
  - quiz-7-1, quiz-7-2, quiz-7-3 の追加

src/infrastructure/data/sampleCourses.ts
  - chapter7 の新規追加
```

## 実装パターン

### sampleLessons.ts
```typescript
// Chapter 7 用レッスン
export const lesson7_1 = Lesson.create({
  id: LessonId.create('lesson-7-1'),
  title: LessonTitle.create('ドメインサービスとは'),
  content: MarkdownContent.create(`
# ドメインサービスとは

## 概要
...
  `),
  order: 1,
});

export const lesson7_2 = Lesson.create({
  id: LessonId.create('lesson-7-2'),
  title: LessonTitle.create('ドメインサービスの実装'),
  content: MarkdownContent.create(`
# ドメインサービスの実装

## 概要
...
  `),
  order: 2,
});

export const lesson7_3 = Lesson.create({
  id: LessonId.create('lesson-7-3'),
  title: LessonTitle.create('ドメインサービスのアンチパターン'),
  content: MarkdownContent.create(`
# ドメインサービスのアンチパターン

## 概要
...
  `),
  order: 3,
});

export const chapter7Lessons = [lesson7_1, lesson7_2, lesson7_3];
```

### sampleCourses.ts
```typescript
import { chapter7Lessons } from './sampleLessons';

const chapter7 = Chapter.create({
  id: ChapterId.create('chapter-7'),
  title: 'Chapter 7: ドメインサービス',
  order: 7,
  lessons: chapter7Lessons,
});

// dddPracticeCourse に chapter7 を追加
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に追加されている
- [ ] chapter7Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている（計15問）
- [ ] sampleCourses.ts に chapter7 が追加されている
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 013 - Chapter 7 ドメインサービス作成完了。PR #XX を作成しました。Phase 2継続！"
```
