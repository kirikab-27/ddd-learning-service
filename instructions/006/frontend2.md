# Frontend2: Chapter 1 コンテンツ作成

## Task Overview
Chapter 1「ドメインとは何か」の学習コンテンツとクイズを新規作成する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### Chapter 1: ドメインとは何か

要件定義書 §3.1 より:
> なぜDDDが必要なのか、ドメインエキスパートとの協業

### Lesson 1-1: なぜDDDが必要なのか

**学習目標:**
- DDDが解決する問題を理解する
- 複雑なビジネスロジックの課題を認識する
- DDDのメリットを説明できる

**コンテンツ構成:**
```markdown
# なぜDDDが必要なのか

## 概要
このレッスンでは、DDDが解決しようとする問題と、
なぜ現代のソフトウェア開発でDDDが重要なのかを学びます。

## ソフトウェア開発の本質的な難しさ

ソフトウェア開発で最も難しいのは、技術的な実装ではなく、
**ビジネスの複雑さを正しく理解し、コードに反映すること**です。

### よくある問題

- 要件の誤解による手戻り
- ビジネスルールがコード全体に散らばる
- 変更のたびに予期しないバグが発生

## DDDとは

DDD（Domain-Driven Design、ドメイン駆動設計）は、
エリック・エヴァンスが2003年に提唱した設計手法です。

### DDDの核心

> ソフトウェアの複雑さは、技術ではなくドメイン（ビジネス領域）にある

### コード例：DDDなしの場合

\`\`\`typescript
// 手続き的なコード - ビジネスルールが散らばっている
function processOrder(order: any) {
  if (order.total > 10000) {
    order.discount = order.total * 0.1;
  }
  if (order.items.length > 5) {
    order.shippingFree = true;
  }
  // ... 100行以上のif文が続く
}
\`\`\`

### コード例：DDDを適用した場合

\`\`\`typescript
// ドメインモデルにビジネスルールを集約
class Order {
  private constructor(
    private readonly items: OrderItem[],
    private readonly customer: Customer
  ) {}

  calculateDiscount(): Money {
    return this.total.isGreaterThan(Money.of(10000))
      ? this.total.multiply(0.1)
      : Money.zero();
  }

  isEligibleForFreeShipping(): boolean {
    return this.items.length > 5;
  }
}
\`\`\`

## DDDが有効なケース

| 有効 | 不向き |
|------|--------|
| 複雑なビジネスルール | CRUDのみのアプリ |
| 長期運用システム | 使い捨てプロトタイプ |
| チーム開発 | 一人開発 |

## まとめ

- DDDは**ビジネスの複雑さ**を管理するための設計手法
- 技術よりも**ドメイン（ビジネス領域）**を重視する
- 複雑なシステムの長期運用に特に効果を発揮する
```

**クイズ（5問）:**
```typescript
{
  id: QuizId.create('quiz-lesson-1-1'),
  lessonId: LessonId.create('lesson-1-1'),
  questions: [
    {
      id: 'q1',
      text: 'DDDが主に解決しようとする問題は何か？',
      options: [
        { id: 'a', text: 'データベースの設計' },
        { id: 'b', text: 'UIのデザイン' },
        { id: 'c', text: 'ビジネスロジックの複雑性' },
        { id: 'd', text: 'ネットワーク通信' },
      ],
      correctOptionId: 'c',
      explanation: 'DDDは複雑なビジネスロジックを整理し、ドメイン（ビジネス領域）を中心に設計することで、複雑性を管理します。',
    },
    {
      id: 'q2',
      text: 'DDDを提唱したのは誰か？',
      options: [
        { id: 'a', text: 'Martin Fowler' },
        { id: 'b', text: 'Eric Evans' },
        { id: 'c', text: 'Kent Beck' },
        { id: 'd', text: 'Robert C. Martin' },
      ],
      correctOptionId: 'b',
      explanation: 'DDDは2003年にEric Evansが著書「Domain-Driven Design」で提唱しました。',
    },
    {
      id: 'q3',
      text: 'DDDの適用が最も効果的なのはどのような場合か？',
      options: [
        { id: 'a', text: '単純なCRUDアプリケーション' },
        { id: 'b', text: '使い捨てのプロトタイプ' },
        { id: 'c', text: '複雑なビジネスルールを持つ長期運用システム' },
        { id: 'd', text: '静的なWebサイト' },
      ],
      correctOptionId: 'c',
      explanation: 'DDDは複雑なビジネスルールを持ち、長期間運用されるシステムで最も効果を発揮します。',
    },
    {
      id: 'q4',
      text: 'DDDにおいて「ドメイン」とは何を指すか？',
      options: [
        { id: 'a', text: 'インターネットのドメイン名' },
        { id: 'b', text: 'データベースのスキーマ' },
        { id: 'c', text: 'ビジネス領域・問題領域' },
        { id: 'd', text: 'プログラミング言語の種類' },
      ],
      correctOptionId: 'c',
      explanation: 'DDDにおけるドメインとは、ソフトウェアが解決しようとするビジネス領域・問題領域のことです。',
    },
    {
      id: 'q5',
      text: '手続き的なコードとDDDを適用したコードの主な違いは何か？',
      options: [
        { id: 'a', text: '実行速度' },
        { id: 'b', text: 'ビジネスルールの配置場所' },
        { id: 'c', text: '使用するプログラミング言語' },
        { id: 'd', text: 'ファイルの数' },
      ],
      correctOptionId: 'b',
      explanation: 'DDDではビジネスルールをドメインモデルに集約するのに対し、手続き的なコードではルールがあちこちに散らばりがちです。',
    },
  ],
}
```

---

### Lesson 1-2: ドメインエキスパートとの協業

**学習目標:**
- ドメインエキスパートの役割を理解する
- 効果的なコミュニケーション方法を学ぶ
- 知識抽出の技法を知る

**コンテンツ構成:**
```markdown
# ドメインエキスパートとの協業

## 概要
DDDの成功には、技術者とビジネスの専門家（ドメインエキスパート）の
密接な協業が不可欠です。このレッスンでは、その方法を学びます。

## ドメインエキスパートとは

ドメインエキスパートとは、そのビジネス領域に深い知識を持つ人のことです。

### 例
- ECサイト → 商品企画担当、物流担当
- 医療システム → 医師、看護師
- 金融システム → ファイナンシャルプランナー、審査担当

## なぜ協業が重要なのか

### 問題: 「伝言ゲーム」の弊害

\`\`\`
ドメインエキスパート → 企画 → PM → 開発者
                ↓
        情報が劣化・誤解が発生
\`\`\`

### 解決: 直接対話

\`\`\`
ドメインエキスパート ←→ 開発者
        ↓
    共通理解の形成
\`\`\`

## 知識抽出の技法

### 1. インタビュー
- オープンクエスチョンを使う
- 「なぜ？」を繰り返す
- 具体例を求める

### 2. イベントストーミング

\`\`\`
[注文受付] → [在庫確認] → [決済処理] → [出荷指示]
    ↓           ↓           ↓           ↓
  顧客情報    商品情報    支払情報    配送情報
\`\`\`

### 3. ドメインストーリーテリング
ビジネスプロセスを「物語」として語ってもらう。

## 協業のポイント

| Do | Don't |
|----|-------|
| ビジネス用語で話す | 技術用語を押し付ける |
| 図や具体例を使う | 抽象的な議論に終始 |
| 疑問点をすぐ確認 | 推測で進める |

## まとめ

- ドメインエキスパートは**ビジネス知識の源泉**
- 直接対話で**誤解を防ぐ**
- イベントストーミングなどの技法を活用する
```

**クイズ（5問）:** 同様の形式で作成

---

### Lesson 1-3: ドメインモデルの役割

**学習目標:**
- ドメインモデルの定義を理解する
- モデルの表現方法を学ぶ
- モデルとコードの関係を理解する

**コンテンツ構成:**
```markdown
# ドメインモデルの役割

## 概要
ドメインモデルは、ビジネスの構造とルールを表現した概念的な模型です。
このレッスンでは、モデルの役割と表現方法を学びます。

## モデルとは何か

> モデルとは、現実世界の**本質的な部分**を抽出し、
> **特定の目的**のために単純化した表現

### 例: 地図はモデル
- 実際の地形を100%再現していない
- 目的（ナビゲーション）に必要な情報だけを含む
- 適切な抽象化がされている

## ドメインモデルの3つの側面

### 1. コード（実装）
\`\`\`typescript
class Order {
  private items: OrderItem[];

  addItem(item: OrderItem): void {
    if (this.items.length >= 10) {
      throw new Error('1注文あたり10商品までです');
    }
    this.items.push(item);
  }
}
\`\`\`

### 2. 図（UML、ER図など）
\`\`\`
┌─────────┐       ┌───────────┐
│  Order  │──────→│ OrderItem │
└─────────┘  1:N  └───────────┘
     │
     ↓
┌──────────┐
│ Customer │
└──────────┘
\`\`\`

### 3. 言葉（ユビキタス言語）
- 「注文」「注文明細」「顧客」
- チーム全員が同じ意味で使う

## モデル駆動設計

DDDでは、モデルとコードを**一致させる**ことを重視します。

### アンチパターン: モデルとコードの乖離
\`\`\`
設計書: 「注文は顧客に紐づく」
コード: order.customer_id = 123  // ただの数値...
\`\`\`

### 正しいアプローチ
\`\`\`typescript
// モデルがそのままコードになる
class Order {
  constructor(
    private readonly customer: Customer  // 顧客オブジェクト
  ) {}
}
\`\`\`

## まとめ

- ドメインモデルは**ビジネスの本質**を表現する
- コード・図・言葉の**3つの側面**で表現
- モデルとコードを**一致させる**ことが重要
```

**クイズ（5問）:** 同様の形式で作成

---

## 成果物

### 1. sampleLessons.ts への追加

```typescript
// Chapter 1 のレッスン
{
  id: LessonId.create('lesson-1-1'),
  chapterId: ChapterId.create('chapter-1'),
  title: 'なぜDDDが必要なのか',
  order: 1,
  content: MarkdownContent.create(lesson1_1_content),
  quizId: QuizId.create('quiz-lesson-1-1'),
},
{
  id: LessonId.create('lesson-1-2'),
  chapterId: ChapterId.create('chapter-1'),
  title: 'ドメインエキスパートとの協業',
  order: 2,
  content: MarkdownContent.create(lesson1_2_content),
  quizId: QuizId.create('quiz-lesson-1-2'),
},
{
  id: LessonId.create('lesson-1-3'),
  chapterId: ChapterId.create('chapter-1'),
  title: 'ドメインモデルの役割',
  order: 3,
  content: MarkdownContent.create(lesson1_3_content),
  quizId: QuizId.create('quiz-lesson-1-3'),
},
```

### 2. sampleQuizzes.ts への追加

各レッスンに5問ずつ、計15問のクイズを追加。

## Definition of Done

- [ ] Lesson 1-1 のコンテンツとクイズが作成されている
- [ ] Lesson 1-2 のコンテンツとクイズが作成されている
- [ ] Lesson 1-3 のコンテンツとクイズが作成されている
- [ ] sampleLessons.ts に3レッスンが追加されている
- [ ] sampleQuizzes.ts に3クイズ（15問）が追加されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 1 コンテンツ作成完了。3レッスン + 15問のクイズを作成しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
