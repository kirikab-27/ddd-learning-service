# Ticket 012: Frontend1 - Chapter 6 エンティティ作成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 6: エンティティ

3つのレッスンと各レッスン5問のクイズを作成する。
Phase 2（第2部: 戦術的設計パターン）の継続。

## レッスン詳細

### Lesson 6-1: エンティティとは（新規）

**内容要件:**
- エンティティの定義と目的
  - DDDにおけるエンティティの位置づけ
  - 同一性（Identity）の重要性
- 値オブジェクトとの違い
  - IDによる比較 vs 値による比較
  - ライフサイクルの有無
  - 可変性 vs 不変性
- エンティティの例
  - User（ユーザー）
  - Order（注文）
  - Product（商品）
- エンティティが持つべき責務
  - ビジネスルールの実装
  - 状態の変更
  - 不変条件の維持

### Lesson 6-2: エンティティの実装（新規）

**内容要件:**
- TypeScriptでの実装パターン
  - クラスベースの設計
  - privateフィールド
  - メソッドによる状態変更
- ID（識別子）の設計
  - UUID vs Sequential ID
  - 型安全なID（UserId, OrderIdなど）
  - ID生成戦略
- 実装例
  ```typescript
  class User {
    private constructor(
      private readonly id: UserId,
      private name: UserName,
      private email: Email,
      private registeredAt: Date
    ) {}

    static create(
      id: UserId,
      name: UserName,
      email: Email
    ): User {
      return new User(id, name, email, new Date());
    }

    changeName(newName: UserName): void {
      // ビジネスルールのチェック
      this.name = newName;
    }

    equals(other: User): boolean {
      return this.id.equals(other.id);
    }
  }
  ```
- エンティティの等価性
  - IDによる比較
  - equals()メソッドの実装

### Lesson 6-3: エンティティのライフサイクル（新規）

**内容要件:**
- エンティティの生成
  - ファクトリメソッド
  - バリデーション
  - 初期状態の設定
- エンティティの変更
  - メソッドによる状態変更
  - 不変条件の維持
  - ドメインイベントの発行
- エンティティの永続化
  - リポジトリパターン
  - DTOへの変換
  - 復元（Reconstruction）
- ライフサイクルの例
  ```typescript
  // 生成
  const order = Order.create(orderId, customerId);

  // 変更
  order.addItem(productId, quantity);
  order.confirm();

  // 永続化
  await orderRepository.save(order);

  // 復元
  const savedOrder = await orderRepository.findById(orderId);
  ```

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 6-1用）:**
```typescript
{
  id: QuizId.create('quiz-6-1'),
  lessonId: LessonId.create('lesson-6-1'),
  questions: [
    Question.create({
      id: 'q6-1-1',
      text: 'エンティティの最も重要な特徴は何ですか？',
      options: [
        { id: 'a', text: '不変性', isCorrect: false },
        { id: 'b', text: '同一性（Identity）', isCorrect: true },
        { id: 'c', text: '値による比較', isCorrect: false },
        { id: 'd', text: 'ライフサイクルがない', isCorrect: false },
      ],
      explanation: 'エンティティは同一性（Identity）を持ち、IDで識別されます。時間経過とともに属性が変わっても同じエンティティとして扱われます。',
    }),
    // ... 残り4問
  ],
}
```

## 対象ファイル

### 更新
```
src/infrastructure/data/sampleLessons.ts
  - lesson6_1, lesson6_2, lesson6_3 の新規追加
  - chapter6Lessons のエクスポート追加

src/infrastructure/data/sampleQuizzes.ts
  - quiz-6-1, quiz-6-2, quiz-6-3 の追加

src/infrastructure/data/sampleCourses.ts
  - chapter6 の新規追加
```

## 実装パターン

### sampleLessons.ts
```typescript
// Chapter 6 用レッスン
export const lesson6_1 = Lesson.create({
  id: LessonId.create('lesson-6-1'),
  title: LessonTitle.create('エンティティとは'),
  content: MarkdownContent.create(`
# エンティティとは

## 概要
...
  `),
  order: 1,
});

export const lesson6_2 = Lesson.create({
  id: LessonId.create('lesson-6-2'),
  title: LessonTitle.create('エンティティの実装'),
  content: MarkdownContent.create(`
# エンティティの実装

## 概要
...
  `),
  order: 2,
});

export const lesson6_3 = Lesson.create({
  id: LessonId.create('lesson-6-3'),
  title: LessonTitle.create('エンティティのライフサイクル'),
  content: MarkdownContent.create(`
# エンティティのライフサイクル

## 概要
...
  `),
  order: 3,
});

export const chapter6Lessons = [lesson6_1, lesson6_2, lesson6_3];
```

### sampleCourses.ts
```typescript
import { chapter6Lessons } from './sampleLessons';

const chapter6 = Chapter.create({
  id: ChapterId.create('chapter-6'),
  title: 'Chapter 6: エンティティ',
  order: 6,
  lessons: chapter6Lessons,
});

// dddPracticeCourse に chapter6 を追加
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に追加されている
- [ ] chapter6Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている（計15問）
- [ ] sampleCourses.ts に chapter6 が追加されている
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 012 - Chapter 6 エンティティ作成完了。PR #XX を作成しました。Phase 2継続！"
```
