# Frontend1: Chapter 3 コンテンツ作成

## Task Overview
Chapter 3「境界づけられたコンテキスト」の学習コンテンツとクイズを作成する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. sampleLessons.ts の更新

Ticket 006, 007 の chapter1Lessons, chapter2Lessons と同様の形式で chapter3Lessons を作成:

```typescript
// src/infrastructure/data/sampleLessons.ts

export const chapter3Lessons = [
  Lesson.create({
    id: LessonId.create('lesson-3-1'),
    chapterId: ChapterId.create('chapter-3'),
    title: LessonTitle.create('コンテキストとは何か'),
    order: 1,
    content: MarkdownContent.create(lesson3_1_content),
    quizId: QuizId.create('quiz-lesson-3-1'),
  }),
  // ... lesson-3-2, lesson-3-3
];
```

### 2. sampleQuizzes.ts の更新

各レッスンに5問ずつ、計15問のクイズを追加。

### 3. sampleCourses.ts の更新

chapter-3 を追加し、lessons を接続:

```typescript
import { chapter1Lessons, chapter2Lessons, chapter3Lessons } from './sampleLessons';

const chapter3 = Chapter.create({
  id: ChapterId.create('chapter-3'),
  title: 'Chapter 3: 境界づけられたコンテキスト',
  order: 3,
  lessons: chapter3Lessons,
});

// ddsCourse の chapters に chapter3 を追加
chapters: [chapter1, chapter2, chapter3, chapter5, chapter6, chapter8],
```

## レッスンコンテンツ詳細

### Lesson 3-1: コンテキストとは何か

```markdown
# コンテキストとは何か

## 概要
このレッスンでは、DDDの中核概念である「境界づけられたコンテキスト」について学びます。
なぜシステムを分割する必要があるのか、その境界は何を意味するのかを理解しましょう。

## 境界づけられたコンテキストとは

> **境界づけられたコンテキスト（Bounded Context）** とは、
> 特定のドメインモデルが適用される明示的な境界です。

### なぜコンテキストが必要なのか

大規模なシステムでは、同じ言葉が異なる意味を持つことがあります。

\`\`\`
「顧客」という言葉の意味:

┌─────────────────┐    ┌─────────────────┐
│  販売コンテキスト  │    │  配送コンテキスト  │
│                 │    │                 │
│  顧客 = 購入者   │    │  顧客 = 届け先   │
│  - 購入履歴     │    │  - 住所         │
│  - 支払い方法   │    │  - 配送希望時間  │
└─────────────────┘    └─────────────────┘
\`\`\`

### コンテキストの境界がないときの問題

\`\`\`typescript
// ❌ 悪い例: すべてを一つのモデルに詰め込む
class Customer {
  // 販売に必要な情報
  purchaseHistory: Order[];
  paymentMethods: PaymentMethod[];

  // 配送に必要な情報
  shippingAddress: Address;
  preferredDeliveryTime: TimeSlot;

  // マーケティングに必要な情報
  emailPreferences: EmailPreference;
  segments: CustomerSegment[];

  // サポートに必要な情報
  supportTickets: Ticket[];
  satisfactionScore: number;

  // ... 際限なく肥大化
}
\`\`\`

### コード例: コンテキストごとのモデル

\`\`\`typescript
// ✅ 良い例: コンテキストごとに適切なモデル

// 販売コンテキスト
namespace Sales {
  class Customer {
    readonly customerId: CustomerId;
    readonly purchaseHistory: Order[];
    readonly paymentMethods: PaymentMethod[];
  }
}

// 配送コンテキスト
namespace Shipping {
  class Recipient {  // 「顧客」ではなく「受取人」
    readonly recipientId: RecipientId;
    readonly address: Address;
    readonly preferredTime: TimeSlot;
  }
}
\`\`\`

## コンテキストの境界

境界は以下を分離します:
- **言語**: 同じ言葉でも意味が異なる
- **モデル**: それぞれのコンテキストに最適化されたモデル
- **データ**: 必要なデータのみを持つ
- **チーム**: 責任範囲を明確化

## まとめ

- 境界づけられたコンテキストは**モデルの適用範囲**を定義する
- 同じ言葉でも**コンテキストによって意味が異なる**
- 境界を設けることで**モデルの肥大化を防ぐ**
- 各コンテキストは**独立して進化**できる
```

### Lesson 3-2: コンテキストの見つけ方

```markdown
# コンテキストの見つけ方

## 概要
コンテキストは自然に見つかるものではありません。
ビジネスを分析し、適切な境界を見つける方法を学びましょう。

## コンテキストを見つける手がかり

### 1. 言語の違い
同じ概念に対して異なる言葉が使われている:
- 「注文」vs「発注」vs「受注」
- 「商品」vs「製品」vs「在庫品」

### 2. ビジネスプロセスの境界
プロセスが切り替わるポイント:

\`\`\`
[受注] → [出荷] → [配送] → [請求]
   │        │        │        │
   └────────┴────────┴────────┘
      それぞれ別のコンテキスト候補
\`\`\`

### 3. 組織構造
部署やチームの境界:
- 営業部門 → 販売コンテキスト
- 物流部門 → 配送コンテキスト
- 経理部門 → 会計コンテキスト

## 実践例: ECサイトのコンテキスト分割

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    ECサイト                          │
├───────────┬───────────┬───────────┬─────────────────┤
│  カタログ  │   注文    │   配送    │     決済        │
│           │           │           │                 │
│ - 商品    │ - 注文    │ - 出荷    │ - 支払い        │
│ - カテゴリ │ - カート  │ - 追跡    │ - 返金          │
│ - 検索    │ - 価格    │ - 届け先  │ - 請求書        │
└───────────┴───────────┴───────────┴─────────────────┘
\`\`\`

### 分割の判断基準

| 質問 | Yes なら分割を検討 |
|------|-------------------|
| 異なるチームが担当するか？ | ✓ |
| 異なるライフサイクルか？ | ✓ |
| 異なる言語が使われるか？ | ✓ |
| 独立してデプロイしたいか？ | ✓ |

## アンチパターン

### 技術的な理由だけで分割しない

\`\`\`
❌ 悪い例:
- 「このテーブルが大きいから分割」
- 「このサービスが遅いから分割」

✅ 良い例:
- 「このビジネス機能は独立して変更される」
- 「このドメイン知識は別のチームが持っている」
\`\`\`

## まとめ

- コンテキストは**ビジネスの境界**から見つける
- **言語の違い**は重要な手がかり
- **組織構造**を参考にする
- **技術的な理由だけ**で分割しない
```

### Lesson 3-3: コンテキスト間の関係

```markdown
# コンテキスト間の関係

## 概要
コンテキストは独立していますが、完全に孤立しているわけではありません。
コンテキスト間の関係パターンを学び、適切な統合方法を選択しましょう。

## 上流と下流

\`\`\`
┌──────────┐         ┌──────────┐
│  上流     │ ──────→ │  下流     │
│ (Upstream)│         │(Downstream)│
└──────────┘         └──────────┘

上流: データや機能を提供する側
下流: データや機能を利用する側
\`\`\`

## 主要な関係パターン

### 1. 共有カーネル（Shared Kernel）

両方のコンテキストで共有するモデル:

\`\`\`
┌─────────────┐   ┌─────────────┐
│  コンテキストA │   │  コンテキストB │
│             │   │             │
│    ┌────────┼───┼────────┐    │
│    │ 共有    │   │        │    │
│    │ カーネル │   │        │    │
│    └────────┼───┼────────┘    │
└─────────────┘   └─────────────┘
\`\`\`

**注意**: 変更時に両方のコンテキストに影響

### 2. 顧客/供給者（Customer/Supplier）

\`\`\`typescript
// 供給者（Supplier）: 注文コンテキスト
class OrderService {
  getOrderStatus(orderId: OrderId): OrderStatus {
    // 下流のために必要な情報を提供
  }
}

// 顧客（Customer）: 配送コンテキスト
class ShippingService {
  // 上流のAPIを利用
  checkOrderReady(orderId: OrderId): boolean {
    const status = orderService.getOrderStatus(orderId);
    return status === OrderStatus.Confirmed;
  }
}
\`\`\`

### 3. 腐敗防止層（Anti-Corruption Layer）

外部システムの影響を受けないための防御層:

\`\`\`typescript
// 腐敗防止層の実装例
class LegacyCustomerAdapter {
  constructor(private legacyApi: LegacyCustomerApi) {}

  // レガシーの複雑なデータ構造を
  // 自分のコンテキストのモデルに変換
  findCustomer(id: string): Customer {
    const legacyData = this.legacyApi.getCustomerData(id);

    // レガシーの構造に依存しない
    return Customer.create({
      id: CustomerId.create(legacyData.CUST_NO),
      name: CustomerName.create(
        legacyData.FIRST_NM + ' ' + legacyData.LAST_NM
      ),
      email: Email.create(legacyData.EMAIL_ADDR),
    });
  }
}
\`\`\`

### 4. 公開ホストサービス（Open Host Service）

標準化されたプロトコルでサービスを公開:

\`\`\`typescript
// REST API として公開
@Controller('/api/orders')
class OrderController {
  @Get('/:id')
  getOrder(@Param('id') id: string): OrderDTO {
    // 内部モデルをDTOに変換して公開
  }
}
\`\`\`

## パターンの選択指針

| 状況 | 推奨パターン |
|------|------------|
| 密接に連携するチーム | 共有カーネル |
| 上流が下流の要求を聞く | 顧客/供給者 |
| レガシーシステムとの統合 | 腐敗防止層 |
| 多数のクライアントがいる | 公開ホストサービス |

## まとめ

- コンテキスト間には**上流/下流**の関係がある
- **共有カーネル**は変更の影響範囲に注意
- **腐敗防止層**で外部システムの影響を遮断
- 状況に応じて**適切なパターン**を選択する
```

## Definition of Done

- [ ] Lesson 3-1 のコンテンツとクイズが作成されている
- [ ] Lesson 3-2 のコンテンツとクイズが作成されている
- [ ] Lesson 3-3 のコンテンツとクイズが作成されている
- [ ] sampleLessons.ts に chapter3Lessons が追加されている
- [ ] sampleQuizzes.ts に 3クイズ（15問）が追加されている
- [ ] sampleCourses.ts に Chapter 3 が追加・接続されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 3 コンテンツ作成完了。3レッスン + 15問のクイズを作成しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- Ticket 006, 007 の成果物（chapter1Lessons, chapter2Lessons の実装を参考）
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
- src/infrastructure/data/sampleCourses.ts
