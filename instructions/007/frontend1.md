# Frontend1: Chapter 2 コンテンツ作成

## Task Overview
Chapter 2「ユビキタス言語」の学習コンテンツとクイズを作成する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. Markdownコンテンツ作成

以下のファイルを作成:

```
content/chapters/chapter-2/lessons/
├── lesson-2-1.md  # ユビキタス言語とは
├── lesson-2-2.md  # チームで共通言語を作る
└── lesson-2-3.md  # コードに反映する
```

### 2. sampleLessons.ts の更新

Ticket 006 の chapter1Lessons と同様の形式で chapter2Lessons を作成:

```typescript
// src/infrastructure/data/sampleLessons.ts

// 既存の chapter1Lessons の後に追加
export const chapter2Lessons = [
  Lesson.create({
    id: LessonId.create('lesson-2-1'),
    chapterId: ChapterId.create('chapter-2'),
    title: 'ユビキタス言語とは',
    order: 1,
    content: MarkdownContent.create(lesson2_1_content),
    quizId: QuizId.create('quiz-lesson-2-1'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-2-2'),
    chapterId: ChapterId.create('chapter-2'),
    title: 'チームで共通言語を作る',
    order: 2,
    content: MarkdownContent.create(lesson2_2_content),
    quizId: QuizId.create('quiz-lesson-2-2'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-2-3'),
    chapterId: ChapterId.create('chapter-2'),
    title: 'コードに反映する',
    order: 3,
    content: MarkdownContent.create(lesson2_3_content),
    quizId: QuizId.create('quiz-lesson-2-3'),
  }),
];
```

### 3. sampleQuizzes.ts の更新

各レッスンに5問ずつ、計15問のクイズを追加:

```typescript
// quiz-lesson-2-1
{
  id: QuizId.create('quiz-lesson-2-1'),
  lessonId: LessonId.create('lesson-2-1'),
  questions: [
    {
      id: 'q1',
      text: 'ユビキタス言語とは何か？',
      options: [
        { id: 'a', text: 'プログラミング言語の一種' },
        { id: 'b', text: 'チーム全員が共有する厳密に定義された共通言語' },
        { id: 'c', text: 'データベースのクエリ言語' },
        { id: 'd', text: '外国語のこと' },
      ],
      correctOptionId: 'b',
      explanation: 'ユビキタス言語は、ドメインエキスパートと開発者が共有する、厳密に定義された共通言語です。',
    },
    // ... 残り4問
  ],
}
```

### 4. sampleCourses.ts の更新

chapter-2 に lessons を接続:

```typescript
import { chapter1Lessons, chapter2Lessons } from './sampleLessons';

// chapter-2 の定義
const chapter2 = Chapter.create({
  id: ChapterId.create('chapter-2'),
  title: 'ユビキタス言語',
  order: 2,
  lessons: chapter2Lessons,  // ← これを追加
});
```

## レッスンコンテンツ詳細

### Lesson 2-1: ユビキタス言語とは

```markdown
# ユビキタス言語とは

## 概要
このレッスンでは、DDDの中核概念である「ユビキタス言語」について学びます。
なぜチーム全員が同じ言葉を使うことが重要なのかを理解しましょう。

## 言語の不一致による問題

ソフトウェア開発でよく起こる問題を見てみましょう。

### アンチパターン: 翻訳地獄

\`\`\`
ビジネス担当:  「顧客」
開発者A:       「User」
開発者B:       「Customer」
データベース:  「clients」
API:           「account」
\`\`\`

同じ概念に対して5つの異なる名前が使われています。
これにより:
- コミュニケーションコストが増大
- 認識のズレによるバグ
- ドキュメントと実装の乖離

## ユビキタス言語とは

> **ユビキタス言語（Ubiquitous Language）**とは、
> ドメインエキスパートと開発者が共有する、
> 厳密に定義された共通言語です。

### 「ユビキタス」の意味

「Ubiquitous」は「どこにでも存在する」という意味です。
つまり、この言語は:

- **コード**で使われる
- **ドキュメント**で使われる
- **会話**で使われる
- **テスト**で使われる

### コード例

\`\`\`typescript
// ❌ 悪い例: 技術用語だけ
class UserDataObject {
  private data: Map<string, any>;

  process(): void {
    // ...
  }
}

// ✅ 良い例: ユビキタス言語を使用
class Customer {
  private readonly customerId: CustomerId;
  private contactInfo: ContactInfo;

  placeOrder(order: Order): void {
    // 顧客が注文を行う
  }
}
\`\`\`

## ユビキタス言語の適用範囲

ユビキタス言語は**境界づけられたコンテキスト**内で有効です。

\`\`\`
┌─────────────────┐    ┌─────────────────┐
│  販売コンテキスト  │    │  配送コンテキスト  │
│                 │    │                 │
│  「顧客」=購入者  │    │  「顧客」=届け先  │
└─────────────────┘    └─────────────────┘
\`\`\`

同じ「顧客」でも、コンテキストによって意味が異なることがあります。

## まとめ

- ユビキタス言語は**チーム全員の共通言語**
- コード、ドキュメント、会話で**一貫して使う**
- 言語の不一致は**バグと混乱の元**
- 適用範囲は**境界づけられたコンテキスト内**
```

### Lesson 2-2: チームで共通言語を作る

```markdown
# チームで共通言語を作る

## 概要
ユビキタス言語は自然に生まれるものではありません。
チームが意図的に作り上げていくものです。その方法を学びましょう。

## 用語集（Glossary）の作成

### なぜ用語集が必要か

- 新メンバーのオンボーディング
- 認識のズレの防止
- ドキュメントの基盤

### 用語集の形式

| 用語 | 定義 | 同義語（使わない） | 関連用語 |
|------|------|------------------|----------|
| 顧客 | 商品を購入する個人または法人 | ユーザー、クライアント | 注文、アカウント |
| 注文 | 顧客が商品の購入を確定した状態 | オーダー、発注 | 顧客、商品、配送 |

### 用語集のルール

1. **定義は明確に** - 曖昧な表現を避ける
2. **同義語を禁止** - 一つの概念に一つの名前
3. **定期的に更新** - ビジネスの変化に追従

## モデリングワークショップ

### イベントストーミング

チーム全員で付箋を使ってドメインを可視化する手法です。

\`\`\`
[商品を検索] → [カートに追加] → [注文を確定] → [決済完了] → [出荷]
     ↓              ↓              ↓            ↓          ↓
  商品情報      カート情報      注文情報     決済情報    配送情報
\`\`\`

### ワークショップの進め方

1. **ドメインイベントを洗い出す**
   - 「〜が起こった」という過去形で表現
   - 例: 「注文が確定された」「決済が完了した」

2. **コマンドを特定する**
   - イベントを引き起こすアクション
   - 例: 「注文を確定する」「決済を実行する」

3. **集約を見つける**
   - イベントとコマンドをグループ化
   - 例: 「注文集約」「決済集約」

## 言語の育て方

ユビキタス言語は一度作ったら終わりではありません。

### 継続的な改善

\`\`\`
発見 → 議論 → 合意 → 反映 → 発見 → ...
\`\`\`

### 改善のタイミング

- 新しい機能を追加するとき
- バグの原因が言葉の曖昧さだったとき
- ドメインエキスパートとの会話で新しい概念が出てきたとき

## まとめ

- **用語集**をチームで維持する
- **ワークショップ**で共通理解を形成
- 言語は**継続的に改善**していく
- 全員が**同じ言葉で話す**文化を作る
```

### Lesson 2-3: コードに反映する

```markdown
# コードに反映する

## 概要
ユビキタス言語の真価は、コードに反映されて初めて発揮されます。
ドメイン用語をコードでどう表現するかを学びましょう。

## 命名規則

### クラス名にドメイン用語を使う

\`\`\`typescript
// ❌ 技術的な名前
class UserManager { }
class DataProcessor { }
class InfoHandler { }

// ✅ ドメイン用語
class Customer { }
class Order { }
class Product { }
\`\`\`

### メソッド名にビジネスアクションを使う

\`\`\`typescript
// ❌ 技術的な操作
order.update();
order.setStatus(1);
order.process();

// ✅ ビジネスアクション
order.confirm();        // 注文を確定する
order.cancel();         // 注文をキャンセルする
order.ship();           // 出荷する
\`\`\`

## 実践例

### Before: 技術的なコード

\`\`\`typescript
function processData(data: any): void {
  if (data.status === 1) {
    data.status = 2;
    updateDatabase(data);
    sendNotification(data.userId);
  }
}
\`\`\`

このコードを読んでも、ビジネスが何をしているか分かりません。

### After: ユビキタス言語を使ったコード

\`\`\`typescript
class Order {
  confirm(): void {
    if (this.status !== OrderStatus.Pending) {
      throw new Error('確定できるのは保留中の注文のみです');
    }

    this.status = OrderStatus.Confirmed;
    this.confirmedAt = new Date();
  }
}

// 使用側
const order = orderRepository.findById(orderId);
order.confirm();
orderRepository.save(order);
notificationService.notifyOrderConfirmed(order);
\`\`\`

コードを読むだけで「注文を確定している」ことが分かります。

## モデルとコードの一致

### なぜ重要か

1. **コードがドキュメントになる**
   - 別途仕様書を読まなくても理解できる

2. **ビジネス変更がコード変更に直結**
   - 「顧客のキャンセル」→ `customer.cancel()` を探せばいい

3. **コミュニケーションコストの削減**
   - 開発者とビジネス担当者が同じ言葉で話せる

### アンチパターン: モデルとコードの乖離

\`\`\`
設計書: 「注文は顧客に属する」
コード: order.user_id = 123;  // 「user」って何？
\`\`\`

### 正しいアプローチ

\`\`\`typescript
class Order {
  constructor(
    private readonly customer: Customer  // 顧客オブジェクト
  ) {}

  belongsTo(customer: Customer): boolean {
    return this.customer.equals(customer);
  }
}
\`\`\`

## リファクタリングのヒント

既存コードにユビキタス言語を適用するとき:

1. **用語集を作成**
2. **一つずつ置換** - 一気にやらない
3. **テストを書いてから変更**
4. **チームで合意を取る**

## まとめ

- クラス名、メソッド名に**ドメイン用語**を使う
- コードを見れば**ビジネスが分かる**状態を目指す
- モデルとコードは**常に同期**させる
- リファクタリングは**段階的に**行う
```

## Definition of Done

- [ ] Lesson 2-1 のコンテンツとクイズが作成されている
- [ ] Lesson 2-2 のコンテンツとクイズが作成されている
- [ ] Lesson 2-3 のコンテンツとクイズが作成されている
- [ ] sampleLessons.ts に chapter2Lessons が追加されている
- [ ] sampleQuizzes.ts に 3クイズ（15問）が追加されている
- [ ] sampleCourses.ts の chapter-2 に lessons が接続されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 2 コンテンツ作成完了。3レッスン + 15問のクイズを作成しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- Ticket 006 の成果物（chapter1Lessons の実装を参考）
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
- src/infrastructure/data/sampleCourses.ts
