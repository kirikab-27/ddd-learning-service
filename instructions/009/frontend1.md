# Frontend1: Chapter 4 コンテンツ作成

## Task Overview
Chapter 4「コンテキストマップ」の学習コンテンツとクイズを作成する。
**このチケット完了で第1部（MVP Phase 1）が完成となる。**

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. sampleLessons.ts の更新

Ticket 006, 007, 008 の chapter1Lessons, chapter2Lessons, chapter3Lessons と同様の形式で chapter4Lessons を作成:

```typescript
// src/infrastructure/data/sampleLessons.ts

export const chapter4Lessons = [
  Lesson.create({
    id: LessonId.create('lesson-4-1'),
    chapterId: ChapterId.create('chapter-4'),
    title: LessonTitle.create('コンテキストマップとは'),
    order: 1,
    content: MarkdownContent.create(lesson4_1_content),
    quizId: QuizId.create('quiz-lesson-4-1'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-4-2'),
    chapterId: ChapterId.create('chapter-4'),
    title: LessonTitle.create('統合パターン'),
    order: 2,
    content: MarkdownContent.create(lesson4_2_content),
    quizId: QuizId.create('quiz-lesson-4-2'),
  }),
];
```

### 2. sampleQuizzes.ts の更新

各レッスンに5問ずつ、計10問のクイズを追加。

### 3. sampleCourses.ts の更新

chapter-4 を追加し、lessons を接続:

```typescript
import { chapter1Lessons, chapter2Lessons, chapter3Lessons, chapter4Lessons } from './sampleLessons';

const chapter4 = Chapter.create({
  id: ChapterId.create('chapter-4'),
  title: 'Chapter 4: コンテキストマップ',
  order: 4,
  lessons: chapter4Lessons,
});

// ddsCourse の chapters に chapter4 を追加
chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter8],
```

## レッスンコンテンツ詳細

### Lesson 4-1: コンテキストマップとは

```markdown
# コンテキストマップとは

## 概要
このレッスンでは、コンテキストマップの目的と価値について学びます。
複数の境界づけられたコンテキストがどのように関係しているかを視覚化する方法を理解しましょう。

## コンテキストマップとは

> **コンテキストマップ** とは、システム内の境界づけられたコンテキスト間の
> 関係を視覚的に表現した図です。

### なぜコンテキストマップが必要なのか

大規模システムでは複数のコンテキストが存在します:

\`\`\`
┌─────────────────────────────────────────────────┐
│              ECシステム全体                      │
│                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ カタログ  │    │  注文    │    │  配送    │  │
│  │コンテキスト│    │コンテキスト│    │コンテキスト│  │
│  └──────────┘    └──────────┘    └──────────┘  │
│                                                 │
│  ┌──────────┐    ┌──────────┐                  │
│  │  決済    │    │ 顧客管理  │                  │
│  │コンテキスト│    │コンテキスト│                  │
│  └──────────┘    └──────────┘                  │
└─────────────────────────────────────────────────┘

これらがどう連携しているか？ → コンテキストマップで表現
\`\`\`

### コンテキストマップの価値

1. **全体像の把握**: システム全体の構造を俯瞰できる
2. **チーム間連携**: どのチームがどのコンテキストを担当しているか明確
3. **統合ポイントの特定**: コンテキスト間の接点を明示
4. **リスクの可視化**: 依存関係の複雑さを把握

## コンテキストマップの構成要素

### 1. コンテキスト（ノード）

\`\`\`
┌─────────────────┐
│   コンテキスト名  │
│                 │
│  担当チーム      │
│  主要概念        │
└─────────────────┘
\`\`\`

### 2. 関係（エッジ）

コンテキスト間の関係を線と記号で表現:

\`\`\`
[上流] ────U────→ [下流]
        │
        └─ 関係の種類を示す記号
           U: Upstream（上流）
           D: Downstream（下流）
\`\`\`

### 3. 関係パターンの記号

| 記号 | パターン | 意味 |
|-----|---------|------|
| SK | Shared Kernel | 共有カーネル |
| CF | Conformist | 順応者 |
| ACL | Anti-Corruption Layer | 腐敗防止層 |
| OHS | Open Host Service | 公開ホストサービス |
| PL | Published Language | 公表された言語 |

## コンテキストマップの例

\`\`\`
            ┌─────────────┐
            │   カタログ   │
            │  コンテキスト │
            └──────┬──────┘
                   │ OHS/PL
                   ▼
┌─────────────┐   ┌─────────────┐
│    決済     │←──│    注文     │
│ コンテキスト │ACL│ コンテキスト │
└─────────────┘   └──────┬──────┘
                         │ CF
                         ▼
                  ┌─────────────┐
                  │    配送     │
                  │ コンテキスト │
                  └─────────────┘

凡例:
- OHS/PL: カタログはAPIを公開、注文が利用
- ACL: 注文は決済の影響を受けないよう防御
- CF: 配送は注文のモデルに従う
\`\`\`

## コンテキストマップを作成する

### ステップ1: コンテキストを列挙

現在のシステムに存在するコンテキストをすべて洗い出す。

### ステップ2: 関係を特定

各コンテキスト間のデータの流れ、依存関係を調査。

### ステップ3: パターンを分類

関係を適切なパターン（次のレッスンで詳しく学習）に分類。

### ステップ4: 図を作成

視覚的に表現し、チーム全体で共有。

## まとめ

- コンテキストマップは**コンテキスト間の関係を視覚化**する
- **全体像の把握**と**チーム間連携**に役立つ
- **統合パターン**を記号で表現する
- 定期的に**更新・共有**することが重要
```

### Lesson 4-2: 統合パターン

```markdown
# 統合パターン

## 概要
コンテキスト間の関係には様々なパターンがあります。
各パターンの特徴を理解し、状況に応じた適切な選択ができるようになりましょう。

## 統合パターン一覧

### 1. パートナーシップ（Partnership）

両チームが対等に協力する関係:

\`\`\`
┌─────────────┐         ┌─────────────┐
│ コンテキストA │◄──────►│ コンテキストB │
│             │パートナー│             │
│  チームA    │ シップ  │  チームB    │
└─────────────┘         └─────────────┘

特徴:
- 両チームが対等に協力
- 変更時は双方で調整
- 密なコミュニケーションが必要
\`\`\`

### 2. 共有カーネル（Shared Kernel）

共通のモデルを共有:

\`\`\`typescript
// 共有カーネルの例
// 両コンテキストで使用する共通の型定義

// shared-kernel/types.ts
export interface Money {
  amount: number;
  currency: 'JPY' | 'USD' | 'EUR';
}

export interface Address {
  postalCode: string;
  prefecture: string;
  city: string;
  street: string;
}
\`\`\`

**注意点**: 変更時に両方のコンテキストに影響するため、慎重に管理。

### 3. 顧客/供給者（Customer/Supplier）

上流が下流のニーズに応える関係:

\`\`\`
┌─────────────┐         ┌─────────────┐
│   供給者     │         │   顧客      │
│  （上流）    │────────►│  （下流）    │
│             │         │             │
└─────────────┘         └─────────────┘

特徴:
- 上流は下流の要求を聞く
- 下流のために機能を提供
- 計画的な変更が可能
\`\`\`

```typescript
// 供給者側（注文コンテキスト）
class OrderService {
  // 下流（配送）のために必要なAPIを提供
  getOrderForShipping(orderId: string): ShippingOrderDTO {
    const order = this.orderRepository.find(orderId);
    return {
      orderId: order.id,
      items: order.items.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        weight: i.weight,  // 配送に必要な情報
      })),
      shippingAddress: order.shippingAddress,
    };
  }
}
\`\`\`

### 4. 順応者（Conformist）

下流が上流のモデルにそのまま従う:

\`\`\`
┌─────────────┐         ┌─────────────┐
│   上流      │         │   順応者     │
│             │────────►│  （下流）    │
│  変更権なし  │         │  従うのみ   │
└─────────────┘         └─────────────┘

使用場面:
- 外部サービスのAPIを利用する場合
- 上流の変更に影響力がない場合
- 上流のモデルが十分に良い場合
\`\`\`

### 5. 腐敗防止層（Anti-Corruption Layer）

外部の影響から自コンテキストを守る:

\`\`\`typescript
// 腐敗防止層の実装
class ExternalPaymentAdapter {
  constructor(private externalApi: ExternalPaymentApi) {}

  // 外部APIのレスポンスを自ドメインのモデルに変換
  processPayment(payment: Payment): PaymentResult {
    // 外部APIを呼び出し
    const externalResult = this.externalApi.charge({
      amt: payment.amount.value,
      ccy: payment.amount.currency,
      card_tok: payment.cardToken,
    });

    // 自ドメインのモデルに変換
    return PaymentResult.create({
      success: externalResult.status === 'OK',
      transactionId: TransactionId.create(externalResult.tx_id),
      processedAt: new Date(externalResult.timestamp),
    });
  }
}
\`\`\`

### 6. 公開ホストサービス（Open Host Service）

標準化されたプロトコルでサービスを公開:

\`\`\`
┌─────────────────────────────────────┐
│         公開ホストサービス            │
│                                     │
│  ┌───────────────────────────────┐  │
│  │     REST API / GraphQL        │  │
│  │     標準化されたプロトコル       │  │
│  └───────────────────────────────┘  │
│              ▲                      │
│              │                      │
│  ┌───────────────────────────────┐  │
│  │      内部ドメインモデル         │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         │
         ▼
    複数のクライアント
\`\`\`

### 7. 公表された言語（Published Language）

共通の交換フォーマット:

\`\`\`typescript
// 公表された言語の例: JSON Schema
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Order",
  "type": "object",
  "properties": {
    "orderId": { "type": "string" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "productId": { "type": "string" },
          "quantity": { "type": "integer" }
        }
      }
    }
  }
}
\`\`\`

### 8. 別々の道（Separate Ways）

統合しない選択:

\`\`\`
┌─────────────┐         ┌─────────────┐
│ コンテキストA │         │ コンテキストB │
│             │   ✕     │             │
│             │ 統合なし │             │
└─────────────┘         └─────────────┘

選択する場面:
- 統合コストが利益を上回る
- 重複を許容できる
- 独立性が重要
\`\`\`

## パターン選択ガイド

| 状況 | 推奨パターン |
|------|------------|
| 密接に協力するチーム | パートナーシップ、共有カーネル |
| 上流が下流をサポート | 顧客/供給者 |
| 外部システムをそのまま使う | 順応者 |
| 外部システムから守りたい | 腐敗防止層 |
| 多数のクライアントに提供 | 公開ホストサービス + 公表された言語 |
| 統合の価値がない | 別々の道 |

## まとめ

- **パートナーシップ**: 対等な協力関係
- **共有カーネル**: 共通モデルの共有（慎重に）
- **顧客/供給者**: 上流が下流をサポート
- **順応者**: 上流に従う
- **腐敗防止層**: 外部の影響から守る
- **公開ホストサービス**: 標準化されたAPI公開
- **公表された言語**: 共通フォーマットの定義
- **別々の道**: あえて統合しない
```

## Definition of Done

- [ ] Lesson 4-1 のコンテンツとクイズが作成されている
- [ ] Lesson 4-2 のコンテンツとクイズが作成されている
- [ ] sampleLessons.ts に chapter4Lessons が追加されている
- [ ] sampleQuizzes.ts に 2クイズ（10問）が追加されている
- [ ] sampleCourses.ts に Chapter 4 が追加・接続されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 4 コンテンツ作成完了。2レッスン + 10問のクイズを作成しました。これで第1部（MVP Phase 1）が完成です。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- Ticket 006, 007, 008 の成果物（chapter1Lessons, chapter2Lessons, chapter3Lessons の実装を参考）
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
- src/infrastructure/data/sampleCourses.ts
