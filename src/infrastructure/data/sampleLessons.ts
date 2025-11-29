import { Lesson, LessonTitle, MarkdownContent } from '@/domain/content/models';
import { LessonId } from '@/domain/shared';

// Lesson 1-1: なぜDDDが必要なのか
export const lesson1_1 = Lesson.create({
  id: LessonId.create('lesson-1-1'),
  title: LessonTitle.create('なぜDDDが必要なのか'),
  content: MarkdownContent.create(`
# なぜDDDが必要なのか

## 概要

このレッスンでは、DDDが解決しようとする問題と、DDDを採用するメリットについて学びます。
なぜ従来のソフトウェア開発アプローチでは複雑なビジネスロジックを扱うのが難しいのか、
そしてDDDがどのようにその課題を解決するのかを理解しましょう。

## ソフトウェア開発の課題

### 複雑なビジネスロジック

現代のソフトウェア開発では、ビジネスロジックが非常に複雑になることがあります。
例えば、ECサイトでは以下のような複雑なルールが存在します：

- 会員ランクによる割引率の違い
- 在庫状況に応じた注文制限
- 配送先による送料計算
- キャンペーン期間中の特別ルール

これらのルールが適切に整理されていないと、**スパゲッティコード**が生まれます。

\`\`\`typescript
// 悪い例：ビジネスルールが散在している
function processOrder(order, user, inventory) {
  let discount = 0;
  if (user.rank === 'gold') {
    discount = 0.1;
  } else if (user.rank === 'silver') {
    discount = 0.05;
  }
  // ...さらに多くの条件分岐が続く
}
\`\`\`

### 技術とビジネスの乖離

開発者が使う技術的な用語と、ビジネス側が使う用語が異なると、
コミュニケーションに齟齬が生まれます。

| ビジネス側の言葉 | 開発者の言葉 |
|----------------|------------|
| 「顧客」 | 「Userテーブル」 |
| 「注文を確定する」 | 「statusフラグを1にする」 |
| 「在庫を引き当てる」 | 「inventory -= quantity」 |

この乖離が大きくなると、ビジネス要件の誤解や実装ミスにつながります。

## DDDとは

**ドメイン駆動設計（Domain-Driven Design）** は、Eric Evansが2003年に提唱した
ソフトウェア設計手法です。

DDDの核心は：

> ソフトウェアの複雑さの根本原因は、**ドメイン（ビジネスの問題領域）** にある。
> したがって、ドメインを深く理解し、それをコードに反映させることが重要である。

### DDDの3つの柱

1. **ユビキタス言語**: ビジネスと開発で共通の言葉を使う
2. **モデル駆動設計**: ドメインモデルをコードの中心に据える
3. **境界づけられたコンテキスト**: 複雑さを適切な単位で分離する

## DDDのメリット

### 1. ビジネスと技術の共通理解

DDDでは、ビジネスエキスパートと開発者が同じ言葉（ユビキタス言語）を使います。

\`\`\`typescript
// DDDを適用した例：ビジネス用語がそのままコードに
class Order {
  confirm(): void {
    if (!this.canBeConfirmed()) {
      throw new OrderCannotBeConfirmedException();
    }
    this.status = OrderStatus.Confirmed;
  }
}
\`\`\`

### 2. 変更に強い設計

ドメインモデルを中心に設計することで、ビジネスルールの変更に柔軟に対応できます。

### 3. チームコミュニケーションの改善

共通言語があることで、要件定義の精度向上やコードレビューの効率化が実現します。

## まとめ

- **スパゲッティコード**や**ビジネスルールの散在**は、複雑なソフトウェア開発の大きな課題
- **技術とビジネスの乖離**は、コミュニケーションエラーや実装ミスを引き起こす
- **DDD**は、ドメインを中心に据えた設計手法で、これらの課題を解決する
- DDDにより、**共通理解**、**変更への強さ**、**コミュニケーション改善**が実現できる
`),
  order: 1,
});

// Lesson 1-2: ドメインエキスパートとの協業
export const lesson1_2 = Lesson.create({
  id: LessonId.create('lesson-1-2'),
  title: LessonTitle.create('ドメインエキスパートとの協業'),
  content: MarkdownContent.create(`
# ドメインエキスパートとの協業

## 概要

このレッスンでは、DDDにおけるドメインエキスパートとの協業について学びます。
なぜ協業が重要なのか、そして効果的なコミュニケーション手法について理解しましょう。

## ドメインエキスパートとは誰か

**ドメインエキスパート**とは、ビジネスドメインについて深い知識を持つ人のことです。
必ずしも「偉い人」や「肩書きのある人」ではありません。

ドメインエキスパートになりうる人：

| 役割 | 専門知識の例 |
|------|-----------|
| 営業担当者 | 顧客のニーズ、商談プロセス |
| カスタマーサポート | よくある問題、ユーザーの困りごと |
| 経理担当者 | 会計処理、請求ルール |
| 物流担当者 | 配送ルール、在庫管理 |

## なぜ協業が重要か

開発者がドキュメントを読んだだけでは、以下を把握できません：

- **暗黙のルール**: 「普通はこうする」という慣習
- **例外ケース**: 「でも、この場合は違う」というケース
- **優先度**: どのルールがより重要か
- **文脈**: なぜそのルールが存在するのか

## 効果的なコミュニケーション手法

### 1. イベントストーミング

**イベントストーミング**は、ビジネスプロセスを可視化するワークショップ手法です。

1. オレンジ色の付箋に「起きること（イベント）」を書く
2. 時系列に並べる
3. イベントを引き起こす「コマンド」と「アクター」を追加
4. 境界を見つけ、コンテキストを分離

### 2. ホワイトボードセッション

図を描きながらドメインエキスパートと対話する手法です。

### 3. プロトタイピング

実際に動くものを見せて、認識を合わせます。

## まとめ

- **ドメインエキスパート**は、ビジネスドメインの深い知識を持つ人
- 開発者だけでは**暗黙のルール**や**例外ケース**を把握できない
- **イベントストーミング**、**ホワイトボードセッション**、**プロトタイピング**が効果的
- 協業を通じて**ユビキタス言語**を構築し、コードに反映させる
`),
  order: 2,
});

// Lesson 1-3: ドメインモデルの役割
export const lesson1_3 = Lesson.create({
  id: LessonId.create('lesson-1-3'),
  title: LessonTitle.create('ドメインモデルの役割'),
  content: MarkdownContent.create(`
# ドメインモデルの役割

## 概要

このレッスンでは、DDDの中核となる「ドメインモデル」について学びます。
モデルとは何か、なぜ重要なのか、そしてどのように表現するのかを理解しましょう。

## モデルとは何か

**モデル**とは、現実世界の複雑さを目的に応じて簡略化した表現です。

モデルの例：
- **地図**: 現実の地形を2次元に簡略化
- **組織図**: 会社の構造を階層的に表現
- **ER図**: データベースの構造を表現

重要なのは、モデルは**現実の完全なコピーではない**ということです。

## ドメインモデルの目的

### 1. 複雑さの整理

ビジネスの複雑さを、理解可能なレベルに整理します。

\`\`\`typescript
// モデルあり：概念が整理されている
class Payment {
  constructor(
    private readonly order: Order,
    private readonly amount: Money,
    private readonly method: PaymentMethod
  ) {}

  execute(): PaymentResult {
    this.validateAmount();
    return this.method.process(this.amount);
  }
}
\`\`\`

### 2. コミュニケーションの基盤

ドメインモデルは、チーム全員が参照できる**共通の理解**を提供します。

### 3. 設計の指針

モデルがあることで、ロジックの配置や概念の分離が判断しやすくなります。

## モデルの表現方法

### 1. UML図

クラス図でドメインモデルを視覚化します。全体像を俯瞰でき、非エンジニアにも伝わりやすいです。

### 2. コード

コード自体がドメインモデルの最も正確な表現です。

\`\`\`typescript
class Order {
  private readonly id: OrderId;
  private items: OrderItem[];
  private status: OrderStatus;

  addItem(product: Product, quantity: number): void {
    if (this.status !== OrderStatus.Draft) {
      throw new CannotModifyConfirmedOrderError();
    }
    const item = OrderItem.create(product, quantity);
    this.items.push(item);
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new EmptyOrderCannotBeConfirmedError();
    }
    this.status = OrderStatus.Confirmed;
  }
}
\`\`\`

### 3. 用語集（ユビキタス言語）

ドメインの言葉を定義した辞書です。誰でも読め、認識のズレを防ぎます。

## まとめ

- **モデル**は現実を目的に応じて簡略化した表現
- **ドメインモデル**はビジネスドメインの概念、関係、ルールを表現する
- ドメインモデルは**複雑さの整理**、**コミュニケーションの基盤**、**設計の指針**として機能する
- 表現方法には**UML図**、**コード**、**用語集**があり、それぞれ補完し合う
- モデルは**継続的に改善**されるべきもの
`),
  order: 3,
});

export const chapter1Lessons = [lesson1_1, lesson1_2, lesson1_3];

// =============================================================================
// Chapter 2: ユビキタス言語
// =============================================================================

// Lesson 2-1: ユビキタス言語とは
export const lesson2_1 = Lesson.create({
  id: LessonId.create('lesson-2-1'),
  title: LessonTitle.create('ユビキタス言語とは'),
  content: MarkdownContent.create(`
# ユビキタス言語とは

## 概要

このレッスンでは、DDDの核心概念である「ユビキタス言語」について学びます。
ユビキタス言語とは何か、なぜ重要なのか、そしてどのような特徴を持つのかを理解しましょう。

## ユビキタス言語の定義

**ユビキタス言語（Ubiquitous Language）** とは、プロジェクトに関わる全員が使う共通のドメイン言語です。

### チーム全員が使う共通言語

ユビキタス言語は以下の人々が共通して使用します：

| 立場 | 使用場面 |
|------|---------|
| ドメインエキスパート | 要件の説明、業務の相談 |
| 開発者 | コードの実装、設計の議論 |
| プロジェクトマネージャー | 仕様書の作成、進捗報告 |
| QAエンジニア | テストケースの作成 |

### ドメインエキスパートと開発者の橋渡し

\`\`\`
ドメインエキスパート ←→ ユビキタス言語 ←→ 開発者
       ↓                    ↓                ↓
    業務知識              共通理解            コード
\`\`\`

## 言語の不一致による問題

ユビキタス言語がない場合、以下のような問題が発生します。

### 1. コミュニケーションエラー

\`\`\`
ビジネス: 「顧客を凍結して」
開発者A: 「アカウントを無効化すればいいんだな」
開発者B: 「いや、ログインを一時停止するだけでは？」
→ 実装がバラバラになる
\`\`\`

### 2. 実装ミス

言葉の解釈が異なると、ビジネスの意図と異なるコードが書かれます。

\`\`\`typescript
// ビジネスの意図：「注文をキャンセルする」＝在庫を戻し、決済を取り消す
// 開発者の解釈：削除フラグを立てるだけ
function cancelOrder(orderId: string) {
  db.orders.update(orderId, { deleted: true }); // 不完全な実装
}
\`\`\`

### 3. ドキュメントとコードの乖離

\`\`\`
仕様書: 「ユーザー」
コード: User, Customer, Account, Member が混在
→ どれが何を指すのか分からない
\`\`\`

## ユビキタス言語の特徴

### 1. ドメイン固有

ユビキタス言語は、その事業ドメインに特化した言葉です。

\`\`\`typescript
// ECサイトのユビキタス言語
class ShoppingCart { ... }  // 買い物かご
class Checkout { ... }      // 購入手続き
class Shipment { ... }      // 出荷

// 医療システムのユビキタス言語
class Patient { ... }       // 患者
class Prescription { ... }  // 処方箋
class Diagnosis { ... }     // 診断
\`\`\`

### 2. 進化する

ビジネスの理解が深まるにつれて、ユビキタス言語も進化します。

\`\`\`
初期: 「ユーザー」
  ↓ ビジネスの理解が深まる
中期: 「会員」と「ゲスト」に分離
  ↓ さらに詳細化
後期: 「プレミアム会員」「一般会員」「ゲスト」
\`\`\`

### 3. コードに反映される

ユビキタス言語はドキュメントだけでなく、コードにも反映されます。

\`\`\`typescript
// 良い例：ユビキタス言語がそのままコードに
class Order {
  confirm(): void { ... }      // 「注文を確定する」
  cancel(): void { ... }       // 「注文をキャンセルする」
  requestRefund(): void { ... } // 「返金を依頼する」
}
\`\`\`

## まとめ

- **ユビキタス言語**は、チーム全員が使う共通のドメイン言語
- 言語の不一致は、**コミュニケーションエラー**、**実装ミス**、**ドキュメントとコードの乖離**を引き起こす
- ユビキタス言語は**ドメイン固有**で、**進化**し、**コードに反映**される
`),
  order: 1,
});

// Lesson 2-2: チームで共通言語を作る
export const lesson2_2 = Lesson.create({
  id: LessonId.create('lesson-2-2'),
  title: LessonTitle.create('チームで共通言語を作る'),
  content: MarkdownContent.create(`
# チームで共通言語を作る

## 概要

このレッスンでは、ユビキタス言語をチームで構築する方法について学びます。
用語集の作成、モデリングワークショップ、言語の洗練プロセスを理解しましょう。

## 用語集の作成

### 用語の定義方法

用語集には以下の要素を含めます：

| 項目 | 説明 | 例 |
|------|-----|-----|
| 用語 | ドメインで使う言葉 | 「注文」 |
| 定義 | 用語の明確な意味 | 顧客が商品を購入する意思表示 |
| 同義語 | 同じ意味で使われる言葉 | オーダー、発注 |
| 反例 | この用語に含まれないもの | 見積り依頼は含まない |
| コード表現 | コードでの表現 | \`Order\` クラス |

\`\`\`markdown
## 用語集の例

### 注文（Order）
**定義**: 顧客が1つ以上の商品を購入する意思を示したもの

**同義語**: オーダー
**反例**: 見積り依頼、問い合わせは含まない

**状態**:
- 下書き（Draft）: 作成中、変更可能
- 確定済み（Confirmed）: 確定後、変更不可
- キャンセル（Cancelled）: 取り消し済み

**コード**: \`class Order\`
\`\`\`

### 用語集の管理・更新

- **バージョン管理**: Gitで用語集を管理し、変更履歴を追跡
- **レビュープロセス**: 用語の追加・変更時はチームでレビュー
- **定期的な見直し**: スプリントレトロスペクティブで用語集を確認

## モデリングワークショップ

### ドメインエキスパートとの対話

効果的な質問の例：

\`\`\`
開発者: 「『注文をキャンセルする』とは具体的にどういうことですか？」
ドメインエキスパート: 「在庫を戻して、決済を取り消して、顧客に通知を送ることです」
開発者: 「決済が既に完了している場合は？」
ドメインエキスパート: 「その場合は『返金処理』になります」
\`\`\`

### ホワイトボードセッション

1. **概念の可視化**: 主要な概念を付箋やボックスで表現
2. **関係の明確化**: 概念間の関係を矢印で結ぶ
3. **境界の発見**: 異なるコンテキストを色分けで表現

\`\`\`
┌─────────────┐      ┌─────────────┐
│    顧客     │──────│    注文     │
│  Customer   │ 作成 │   Order     │
└─────────────┘      └──────┬──────┘
                            │ 含む
                     ┌──────┴──────┐
                     │   注文明細   │
                     │  OrderItem  │
                     └─────────────┘
\`\`\`

## 言語の洗練プロセス

### 曖昧さの排除

\`\`\`
曖昧な表現:「商品」
  ↓ 質問：「商品」は何を指しますか？
洗練後:
  - Product: カタログに載っている商品マスタ
  - OrderItem: 注文に含まれる商品（数量付き）
  - InventoryItem: 倉庫にある在庫
\`\`\`

### コンテキストの明確化

同じ言葉でも、コンテキストによって意味が異なることがあります：

\`\`\`
「顧客」という言葉の意味:
- 営業コンテキスト: 見込み客から既存顧客まで
- 配送コンテキスト: 届け先の住所を持つ人
- 請求コンテキスト: 支払い責任者
\`\`\`

それぞれのコンテキストで適切な名前を定義します：

\`\`\`typescript
// 営業コンテキスト
class Lead { ... }      // 見込み客
class Customer { ... }  // 既存顧客

// 配送コンテキスト
class Recipient { ... } // 届け先

// 請求コンテキスト
class Payer { ... }     // 支払い者
\`\`\`

## まとめ

- **用語集**は用語、定義、同義語、反例、コード表現を含め、バージョン管理する
- **モデリングワークショップ**では、ドメインエキスパートとの対話とホワイトボードセッションを活用
- **言語の洗練**では、曖昧さを排除し、コンテキストを明確化する
- ユビキタス言語は**継続的に進化**させていくもの
`),
  order: 2,
});

// Lesson 2-3: コードに反映する
export const lesson2_3 = Lesson.create({
  id: LessonId.create('lesson-2-3'),
  title: LessonTitle.create('コードに反映する'),
  content: MarkdownContent.create(`
# コードに反映する

## 概要

このレッスンでは、ユビキタス言語をコードに反映する方法について学びます。
命名規則、コード例の比較、リファクタリングの手法を理解しましょう。

## 命名規則

### クラス名の付け方

ドメインの概念をそのままクラス名にします：

\`\`\`typescript
// 良い例：ユビキタス言語をそのまま使用
class Order { }         // 注文
class Customer { }      // 顧客
class ShoppingCart { }  // 買い物かご
class Shipment { }      // 出荷

// 悪い例：技術的な命名
class OrderData { }     // 「Data」は不要
class CustomerInfo { }  // 「Info」は曖昧
class CartManager { }   // 「Manager」は責務が不明確
\`\`\`

### メソッド名の付け方

ビジネスアクションをそのままメソッド名にします：

\`\`\`typescript
class Order {
  // 良い例：ビジネスの言葉
  confirm(): void { }       // 「注文を確定する」
  cancel(): void { }        // 「注文をキャンセルする」
  requestRefund(): void { } // 「返金を依頼する」

  // 悪い例：技術的な言葉
  setStatus(): void { }     // 何のステータス？
  process(): void { }       // 何を処理？
  update(): void { }        // 何を更新？
}
\`\`\`

### ドメイン用語をそのまま使う

ドメインエキスパートが使う言葉を、そのままコードに反映します：

\`\`\`typescript
// ドメインエキスパートの言葉
// 「在庫を引き当てる」「出荷指示を出す」「配送完了を記録する」

class Inventory {
  allocate(orderId: OrderId, quantity: number): Allocation {
    // 在庫を引き当てる
  }
}

class Warehouse {
  issueShipmentInstruction(order: Order): ShipmentInstruction {
    // 出荷指示を出す
  }
}

class Delivery {
  recordCompletion(shipmentId: ShipmentId): void {
    // 配送完了を記録する
  }
}
\`\`\`

## コード例

### ユビキタス言語を反映したコード

\`\`\`typescript
// 用語集:
// - 注文（Order）: 顧客が商品を購入する意思表示
// - 確定する（confirm）: 注文を変更不可にする
// - キャンセルする（cancel）: 注文を取り消す

class Order {
  private status: OrderStatus;
  private items: OrderItem[];

  confirm(): void {
    if (this.items.length === 0) {
      throw new EmptyOrderCannotBeConfirmedError();
    }
    if (this.status !== OrderStatus.Draft) {
      throw new OrderAlreadyConfirmedError();
    }
    this.status = OrderStatus.Confirmed;
  }

  cancel(): void {
    if (this.status === OrderStatus.Shipped) {
      throw new ShippedOrderCannotBeCancelledError();
    }
    this.status = OrderStatus.Cancelled;
  }
}
\`\`\`

### 反映されていないコードとの比較

\`\`\`typescript
// 悪い例：ユビキタス言語が反映されていない
class OrderService {
  processOrder(data: OrderData): void {
    if (data.items.length === 0) {
      throw new Error('Items required');
    }
    data.status = 1; // マジックナンバー
    db.save(data);
  }

  updateOrderStatus(id: string, status: number): void {
    const data = db.find(id);
    data.status = status;
    db.save(data);
  }
}

// 良い例：ユビキタス言語が反映されている
class Order {
  confirm(): void {
    this.ensureNotEmpty();
    this.ensureDraft();
    this.status = OrderStatus.Confirmed;
  }

  private ensureNotEmpty(): void {
    if (this.items.length === 0) {
      throw new EmptyOrderCannotBeConfirmedError();
    }
  }
}
\`\`\`

## リファクタリング

### 既存コードへの適用方法

1. **用語の洗い出し**: コード内の命名を一覧化
2. **用語集との照合**: ユビキタス言語と比較
3. **リネーム**: 段階的に命名を変更

\`\`\`typescript
// Step 1: 現状の確認
class UserData {
  updateStatus(s: number): void { }
}

// Step 2: クラス名の変更
class Customer {  // UserData → Customer
  updateStatus(s: number): void { }
}

// Step 3: メソッド名の変更
class Customer {
  activate(): void { }  // updateStatus → activate（有効化する）
  suspend(): void { }   // updateStatus → suspend（一時停止する）
}

// Step 4: パラメータの明確化
class Customer {
  activate(): void {
    this.status = CustomerStatus.Active;
  }
  suspend(reason: SuspensionReason): void {
    this.status = CustomerStatus.Suspended;
    this.suspensionReason = reason;
  }
}
\`\`\`

### 段階的なリファクタリング

大きな変更は避け、小さな変更を積み重ねます：

1. **テストを書く**: 現状の動作を保証
2. **命名を変更**: IDEのリファクタリング機能を活用
3. **テストを実行**: 動作が変わっていないことを確認
4. **コミット**: 小さな単位でコミット

## まとめ

- **クラス名**はドメインの概念を、**メソッド名**はビジネスアクションをそのまま表現
- 技術的な命名（Data, Info, Manager, process, update）を避け、**ドメイン用語をそのまま使う**
- **リファクタリング**は段階的に行い、テストで動作を保証しながら進める
- コードがユビキタス言語を反映することで、**可読性**と**保守性**が向上する
`),
  order: 3,
});

export const chapter2Lessons = [lesson2_1, lesson2_2, lesson2_3];

// =============================================================================
// Chapter 3: 境界づけられたコンテキスト
// =============================================================================

// Lesson 3-1: コンテキストとは何か
export const lesson3_1 = Lesson.create({
  id: LessonId.create('lesson-3-1'),
  title: LessonTitle.create('コンテキストとは何か'),
  content: MarkdownContent.create(`
# コンテキストとは何か

## 概要

このレッスンでは、DDDの重要な概念である「境界づけられたコンテキスト」について学びます。
コンテキストとは何か、なぜ境界が必要なのかを理解しましょう。

## 境界づけられたコンテキストの定義

**境界づけられたコンテキスト（Bounded Context）** とは、特定のドメインモデルとユビキタス言語が
一貫して適用される明確な境界を持つ領域です。

### モデルが適用される範囲

\`\`\`
┌─────────────────────────────────────────┐
│       境界づけられたコンテキスト          │
│  ┌─────────────────────────────────┐   │
│  │      ドメインモデル              │   │
│  │  ・エンティティ                  │   │
│  │  ・値オブジェクト                │   │
│  │  ・ドメインサービス              │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │      ユビキタス言語              │   │
│  │  用語A, 用語B, 用語C...          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
\`\`\`

### 言語の一貫性が保たれる領域

コンテキスト内では、同じ言葉は常に同じ意味を持ちます：

\`\`\`typescript
// 販売コンテキスト内では「商品」は一貫した意味
class Product {
  private price: Money;
  private name: ProductName;
  private description: ProductDescription;
}
\`\`\`

## 境界の意味

### なぜ境界が必要か

1. **言語の衝突を防ぐ**: 同じ言葉が異なる意味を持つことを避ける
2. **複雑さの分離**: システムを管理可能な単位に分割
3. **チームの自律性**: 各チームが独立して開発可能

### 境界がないとどうなるか

\`\`\`
境界がない場合:

「商品」という言葉が曖昧に
     ↓
┌──────────────────────────────────────────┐
│  Product クラスが肥大化                   │
│  - カタログ情報                           │
│  - 在庫情報                               │
│  - 配送情報                               │
│  - 価格情報                               │
│  → 責務が不明確、変更が困難               │
└──────────────────────────────────────────┘
\`\`\`

## コンテキストの例

### ECサイトの例

ECサイトは複数のコンテキストで構成されます：

| コンテキスト | 責務 | 「商品」の意味 |
|-------------|------|--------------|
| カタログ | 商品の表示・検索 | 名前、説明、画像 |
| 在庫 | 在庫の管理 | SKU、在庫数、倉庫位置 |
| 注文 | 注文の処理 | 注文明細、数量、単価 |
| 配送 | 配送の管理 | 重量、サイズ、配送先 |

### 同じ「商品」でも意味が異なる

\`\`\`typescript
// カタログコンテキスト
class CatalogProduct {
  name: string;
  description: string;
  images: Image[];
  categories: Category[];
}

// 在庫コンテキスト
class InventoryItem {
  sku: string;
  quantity: number;
  warehouseLocation: Location;
  reorderPoint: number;
}

// 配送コンテキスト
class ShippableItem {
  weight: Weight;
  dimensions: Dimensions;
  handlingInstructions: string;
}
\`\`\`

これらは全て「商品」に関するものですが、各コンテキストで異なるモデルとして表現されます。

## まとめ

- **境界づけられたコンテキスト**は、モデルとユビキタス言語が一貫して適用される範囲
- 境界により**言語の衝突**を防ぎ、**複雑さを分離**し、**チームの自律性**を確保
- 同じ概念（例：商品）でも、コンテキストによって**異なるモデル**で表現される
`),
  order: 1,
});

// Lesson 3-2: コンテキストの見つけ方
export const lesson3_2 = Lesson.create({
  id: LessonId.create('lesson-3-2'),
  title: LessonTitle.create('コンテキストの見つけ方'),
  content: MarkdownContent.create(`
# コンテキストの見つけ方

## 概要

このレッスンでは、システムから境界づけられたコンテキストを見つける方法について学びます。
分析パターンと境界の決め方を理解しましょう。

## 分析パターン

### 言語の違いに注目する

同じ言葉が異なる意味で使われている場所を探します：

\`\`\`
「顧客」という言葉の使われ方:

営業チーム: 「顧客の連絡先を更新して」
  → 会社名、担当者名、電話番号

経理チーム: 「顧客の与信限度額を確認して」
  → 支払い履歴、与信情報

配送チーム: 「顧客の届け先を確認して」
  → 住所、配送時間帯

→ 3つの異なるコンテキストが存在する可能性
\`\`\`

### ビジネスプロセスの境界

ビジネスプロセスの切れ目を探します：

\`\`\`
ECサイトの注文プロセス:

[カタログ閲覧] → [カートに追加] → [注文確定] → [決済] → [在庫引当] → [配送]
     ↑              ↑              ↑         ↑         ↑          ↑
   カタログ        カート         注文       決済      在庫        配送
  コンテキスト   コンテキスト   コンテキスト コンテキスト コンテキスト コンテキスト
\`\`\`

### チーム構造との関連

**コンウェイの法則**: 組織構造がシステム構造に影響を与える

\`\`\`
チーム構造:
├── フロントエンドチーム → カタログコンテキスト
├── 注文処理チーム → 注文・決済コンテキスト
├── 物流チーム → 在庫・配送コンテキスト
└── 顧客管理チーム → 顧客コンテキスト
\`\`\`

チームの責任範囲がコンテキストの境界のヒントになります。

## 境界の決め方

### 大きすぎず、小さすぎず

\`\`\`
❌ 大きすぎる:
┌─────────────────────────────────────────┐
│           EC システム全体               │
│  カタログ + 在庫 + 注文 + 決済 + 配送    │
│  → 複雑すぎて管理困難                   │
└─────────────────────────────────────────┘

❌ 小さすぎる:
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│商品名  │ │商品価格│ │在庫数  │ │カテゴリ│
└────────┘ └────────┘ └────────┘ └────────┘
→ 過度に分割され、連携コストが増大

✅ 適切なサイズ:
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  カタログ    │ │    在庫     │ │    注文     │
│ コンテキスト │ │ コンテキスト │ │ コンテキスト │
└─────────────┘ └─────────────┘ └─────────────┘
→ 独立して開発・デプロイ可能な単位
\`\`\`

### 変更の頻度

頻繁に一緒に変更されるものは同じコンテキストに：

\`\`\`
変更の分析:
- 価格変更 → カタログの価格表示も変更 → 同じコンテキスト
- 在庫ロジック変更 → 配送は影響なし → 別のコンテキスト
\`\`\`

### チームの責任範囲

\`\`\`typescript
// 良い境界: 1つのチームが責任を持てる範囲
// 注文コンテキスト（注文チームが担当）
class Order { }
class OrderItem { }
class OrderStatus { }
class OrderRepository { }

// 悪い境界: 複数チームが関わる範囲を1つに
// 何でもコンテキスト（誰が責任者？）
class Order { }
class Inventory { }
class Payment { }
class Shipping { }
\`\`\`

## コンテキスト発見のワークショップ

### イベントストーミングの活用

1. **ドメインイベント**を洗い出す
2. **コマンド**と**アクター**を追加
3. **集約**を特定する
4. **境界**を引く

\`\`\`
[注文が作成された] [支払いが完了した] [商品が出荷された]
        ↓                  ↓                  ↓
    注文コンテキスト    決済コンテキスト    配送コンテキスト
\`\`\`

## まとめ

- **言語の違い**、**ビジネスプロセスの境界**、**チーム構造**に注目してコンテキストを見つける
- 境界は**大きすぎず、小さすぎず**、独立して開発・デプロイ可能な単位に
- **変更の頻度**と**チームの責任範囲**を考慮して境界を決める
- **イベントストーミング**はコンテキスト発見に有効なワークショップ手法
`),
  order: 2,
});

// Lesson 3-3: コンテキスト間の関係
export const lesson3_3 = Lesson.create({
  id: LessonId.create('lesson-3-3'),
  title: LessonTitle.create('コンテキスト間の関係'),
  content: MarkdownContent.create(`
# コンテキスト間の関係

## 概要

このレッスンでは、境界づけられたコンテキスト間の関係性について学びます。
上流/下流の関係と、主要な統合パターンを理解しましょう。

## 上流/下流の関係

### 上流コンテキストが下流に影響

\`\`\`
上流（Upstream）             下流（Downstream）
┌─────────────┐              ┌─────────────┐
│   注文      │ ──────────→ │   配送      │
│ コンテキスト │   注文情報   │ コンテキスト │
└─────────────┘              └─────────────┘

上流の変更 → 下流に影響
下流の変更 → 上流に影響なし
\`\`\`

### 依存関係の方向

\`\`\`typescript
// 下流（配送コンテキスト）は上流（注文コンテキスト）に依存
class ShippingService {
  // 注文コンテキストのイベントを購読
  handleOrderConfirmed(event: OrderConfirmedEvent): void {
    const shipment = this.createShipmentFromOrder(event.orderId);
    this.shipmentRepository.save(shipment);
  }
}
\`\`\`

## 統合パターン

### 1. 共有カーネル（Shared Kernel）

2つのコンテキストが共通のモデルを共有するパターン：

\`\`\`
┌─────────────┐  共有部分  ┌─────────────┐
│ コンテキストA │◀────────▶│ コンテキストB │
└─────────────┘           └─────────────┘
         ↓
   ┌─────────────┐
   │ 共有カーネル │
   │ - Money     │
   │ - Address   │
   └─────────────┘
\`\`\`

**使用場面**: 密接に連携するチーム間で、共通の概念を共有したい場合

\`\`\`typescript
// 共有カーネル（shared-kernel パッケージ）
export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}
}

// 両方のコンテキストで使用
import { Money } from '@shared-kernel';
\`\`\`

**注意点**: 変更時は両チームの合意が必要。乱用するとコンテキストの独立性が失われる。

### 2. 腐敗防止層（Anti-Corruption Layer）

外部システムやレガシーシステムとの統合時に、自分のモデルを守るパターン：

\`\`\`
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ 外部/レガシー │ → │ 腐敗防止層  │ → │ 自コンテキスト│
│  システム    │   │    (ACL)    │   │             │
└─────────────┘   └─────────────┘   └─────────────┘
                        ↓
                  翻訳・変換
\`\`\`

\`\`\`typescript
// 腐敗防止層（ACL）
class CustomerTranslator {
  // 外部システムのデータを自分のモデルに変換
  translateFromLegacy(legacyCustomer: LegacyCustomerData): Customer {
    return Customer.create({
      id: CustomerId.create(legacyCustomer.CUST_NO),
      name: CustomerName.create(
        legacyCustomer.FIRST_NM + ' ' + legacyCustomer.LAST_NM
      ),
      email: Email.create(legacyCustomer.EMAIL_ADDR),
    });
  }
}
\`\`\`

**使用場面**: レガシーシステムとの統合、外部APIとの連携

### 3. 公開ホストサービス（Open Host Service）

他のコンテキストに対して、明確なAPIを公開するパターン：

\`\`\`
              公開API
┌─────────────┐  REST/gRPC  ┌─────────────┐
│ 提供者      │ ────────── │ 消費者A     │
│ コンテキスト │ ────────── │ 消費者B     │
│             │ ────────── │ 消費者C     │
└─────────────┘             └─────────────┘
\`\`\`

\`\`\`typescript
// 公開ホストサービス（REST API）
@Controller('/orders')
class OrderController {
  @Get('/:id')
  async getOrder(@Param('id') id: string): Promise<OrderDTO> {
    const order = await this.orderRepository.findById(id);
    return this.toDTO(order);  // 公開形式に変換
  }
}
\`\`\`

**使用場面**: 複数のコンテキストに同じサービスを提供する場合

## パターン選択の指針

| 状況 | 推奨パターン |
|------|------------|
| 密接に連携するチーム | 共有カーネル |
| レガシーシステム統合 | 腐敗防止層 |
| 外部API連携 | 腐敗防止層 |
| 複数コンテキストへのサービス提供 | 公開ホストサービス |
| チーム間の独立性重視 | 腐敗防止層 + 公開ホストサービス |

## コンテキストマップ

コンテキスト間の関係を図示したものが**コンテキストマップ**です：

\`\`\`
           ┌─────────┐
           │ カタログ │
           └────┬────┘
                │ 公開API
           ┌────▼────┐      ┌─────────┐
           │  注文   │ ───→ │  配送   │
           └────┬────┘ 上流  └─────────┘
                │            下流
           ┌────▼────┐
           │  決済   │←─── 外部決済システム
           └─────────┘ ACL
\`\`\`

## まとめ

- コンテキスト間には**上流/下流**の依存関係がある
- **共有カーネル**は共通モデルを共有（密接なチーム向け）
- **腐敗防止層**は外部の影響から自分のモデルを守る
- **公開ホストサービス**は明確なAPIを他コンテキストに提供
- **コンテキストマップ**でシステム全体の関係を可視化
`),
  order: 3,
});

export const chapter3Lessons = [lesson3_1, lesson3_2, lesson3_3];

// =============================================================================
// Chapter 4: コンテキストマップ
// =============================================================================

// Lesson 4-1: コンテキストマップとは
export const lesson4_1 = Lesson.create({
  id: LessonId.create('lesson-4-1'),
  title: LessonTitle.create('コンテキストマップとは'),
  content: MarkdownContent.create(`
# コンテキストマップとは

## 概要

このレッスンでは、システム全体のコンテキスト間の関係を可視化する「コンテキストマップ」について学びます。
コンテキストマップの目的、読み方、作成方法を理解しましょう。

## コンテキストマップの定義

**コンテキストマップ**は、システム内のすべての境界づけられたコンテキストとその関係を
図示した戦略的な設計ツールです。

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                  コンテキストマップ                      │
│                                                         │
│  ┌─────────┐      ┌─────────┐      ┌─────────┐        │
│  │カタログ │ ───→ │  注文   │ ───→ │  配送   │        │
│  │         │  API │         │ イベント│         │        │
│  └─────────┘      └────┬────┘      └─────────┘        │
│                        │                               │
│                   ┌────▼────┐                          │
│                   │  決済   │ ←── 外部決済             │
│                   │         │  ACL                     │
│                   └─────────┘                          │
└─────────────────────────────────────────────────────────┘
\`\`\`

## コンテキストマップの目的

### 1. 全体像の把握

システム全体を俯瞰し、どのコンテキストが存在するかを理解します：

- コンテキストの一覧
- 依存関係の方向
- 統合ポイント

### 2. コミュニケーションの基盤

チーム間で共通の理解を持つためのドキュメントとして機能します：

\`\`\`
「注文コンテキストと決済コンテキストの関係は？」
  → コンテキストマップを見れば一目で分かる
\`\`\`

### 3. 設計判断の記録

なぜその統合パターンを選んだかの記録になります：

| コンテキスト間 | パターン | 理由 |
|--------------|---------|------|
| 注文 → 配送 | イベント | 疎結合を維持 |
| 決済 ← 外部 | ACL | 外部仕様の影響を遮断 |

## コンテキストマップの読み方

### 関係の方向

\`\`\`
上流（Upstream）    →    下流（Downstream）
┌──────────┐             ┌──────────┐
│ 提供する │  ────────→  │ 利用する │
│ コンテキスト │             │ コンテキスト │
└──────────┘             └──────────┘

U: Upstream（上流）
D: Downstream（下流）
\`\`\`

### 統合パターンの記号

\`\`\`
OHS: Open Host Service（公開ホストサービス）
ACL: Anti-Corruption Layer（腐敗防止層）
SK: Shared Kernel（共有カーネル）
CF: Conformist（順応者）
PL: Published Language（公開言語）
\`\`\`

## コンテキストマップの作成方法

### Step 1: コンテキストの洗い出し

\`\`\`
ECシステムのコンテキスト:
□ カタログ管理
□ 在庫管理
□ 注文処理
□ 決済処理
□ 配送管理
□ 顧客管理
\`\`\`

### Step 2: 関係の特定

各コンテキスト間でデータや機能のやり取りがあるかを確認：

\`\`\`
カタログ → 注文: 商品情報を参照
注文 → 在庫: 在庫を引き当て
注文 → 決済: 支払いを処理
注文 → 配送: 出荷を依頼
\`\`\`

### Step 3: 統合パターンの決定

各関係に適切なパターンを選択：

\`\`\`
カタログ ──[OHS]──→ 注文
注文 ──[イベント]──→ 在庫
注文 ──[ACL]──→ 外部決済
\`\`\`

### Step 4: 図の作成

チーム全員が理解できる形で図示します。

## まとめ

- **コンテキストマップ**はシステム全体のコンテキスト関係を可視化した図
- **全体像の把握**、**コミュニケーション基盤**、**設計判断の記録**として機能
- **上流/下流**の関係と**統合パターン**を図に記載する
- コンテキストの洗い出し → 関係特定 → パターン決定 → 図作成の手順で作成
`),
  order: 1,
});

// Lesson 4-2: 統合パターン
export const lesson4_2 = Lesson.create({
  id: LessonId.create('lesson-4-2'),
  title: LessonTitle.create('統合パターン'),
  content: MarkdownContent.create(`
# 統合パターン

## 概要

このレッスンでは、コンテキスト間の統合に使用する主要なパターンについて詳しく学びます。
各パターンの特徴、使い分け、実装方法を理解しましょう。

## パートナーシップ（Partnership）

2つのチームが対等な関係で協力するパターンです。

\`\`\`
┌─────────────┐    協力    ┌─────────────┐
│ コンテキストA │◀────────▶│ コンテキストB │
│  チームA     │    調整    │  チームB     │
└─────────────┘           └─────────────┘
\`\`\`

**特徴:**
- 対等な関係
- 変更時は相互に調整
- 密なコミュニケーションが必要

**適用場面:** 同じ組織内の密接に連携するチーム

## 共有カーネル（Shared Kernel）

2つのコンテキストが共通のモデルを共有します。

\`\`\`typescript
// shared-kernel パッケージ
export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}

  add(other: Money): Money {
    if (!this.currency.equals(other.currency)) {
      throw new CurrencyMismatchError();
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}

// 注文コンテキストで使用
import { Money } from '@shared-kernel';

// 決済コンテキストでも使用
import { Money } from '@shared-kernel';
\`\`\`

**注意:** 変更には両チームの合意が必要。共有範囲は最小限に。

## 顧客/供給者（Customer/Supplier）

下流（顧客）のニーズに上流（供給者）が応える関係です。

\`\`\`
上流（Supplier）          下流（Customer）
┌─────────────┐          ┌─────────────┐
│  注文       │ ───────→ │  配送       │
│  サービス   │   要件    │  サービス   │
└─────────────┘   提示    └─────────────┘
                ←───────
                 対応
\`\`\`

**特徴:**
- 下流が要件を提示
- 上流が対応する責任を持つ
- 計画的な変更管理

## 順応者（Conformist）

下流が上流のモデルにそのまま従うパターンです。

\`\`\`typescript
// 上流（外部API）のモデルをそのまま使用
interface ExternalProductDTO {
  product_id: string;
  product_name: string;
  unit_price: number;
}

// 下流はそのまま使用（変換なし）
class ProductService {
  async getProduct(id: string): Promise<ExternalProductDTO> {
    return await this.externalApi.fetchProduct(id);
  }
}
\`\`\`

**適用場面:** 外部APIの変更を期待できない場合

## 腐敗防止層（Anti-Corruption Layer）

外部モデルから自分のモデルを守る翻訳層を設けます。

\`\`\`typescript
// 腐敗防止層
class ProductTranslator {
  translateFromExternal(dto: ExternalProductDTO): Product {
    return Product.create({
      id: ProductId.create(dto.product_id),
      name: ProductName.create(dto.product_name),
      price: Money.create(dto.unit_price, Currency.JPY),
    });
  }
}

// 使用側は自分のモデルのみ扱う
class CatalogService {
  constructor(
    private readonly externalApi: ExternalApi,
    private readonly translator: ProductTranslator
  ) {}

  async getProduct(id: ProductId): Promise<Product> {
    const dto = await this.externalApi.fetchProduct(id.value);
    return this.translator.translateFromExternal(dto);
  }
}
\`\`\`

**適用場面:** レガシーシステム統合、外部API連携

## 公開ホストサービス（Open Host Service）

明確なAPIを公開して複数の消費者にサービスを提供します。

\`\`\`typescript
// REST APIとして公開
@Controller('/api/v1/orders')
class OrderController {
  @Get('/:id')
  async getOrder(@Param('id') id: string): Promise<OrderResponse> {
    const order = await this.orderService.findById(id);
    return OrderResponse.fromDomain(order);
  }

  @Post('/')
  async createOrder(@Body() request: CreateOrderRequest): Promise<OrderResponse> {
    const order = await this.orderService.create(request.toCommand());
    return OrderResponse.fromDomain(order);
  }
}
\`\`\`

**特徴:**
- バージョン管理（v1, v2...）
- ドキュメント化（OpenAPI/Swagger）
- 公開言語（Published Language）と組み合わせることが多い

## パターン選択の指針

| 状況 | 推奨パターン |
|------|------------|
| 密接に連携するチーム | パートナーシップ、共有カーネル |
| 下流のニーズに応える | 顧客/供給者 |
| 外部APIの変更不可 | 順応者 |
| レガシー/外部システム | 腐敗防止層 |
| 複数消費者へのサービス | 公開ホストサービス |
| チーム間の独立性重視 | 腐敗防止層 + 公開ホストサービス |

## 実装例：ECシステム

\`\`\`
┌───────────────────────────────────────────────────┐
│                   ECシステム                       │
│                                                   │
│  ┌─────────┐                    ┌─────────┐      │
│  │カタログ │───[OHS/PL]──────→ │  注文   │      │
│  │         │    REST API       │         │      │
│  └─────────┘                    └────┬────┘      │
│                                      │           │
│            ┌─────────────────────────┼───┐       │
│            │                         │   │       │
│            ▼                         ▼   ▼       │
│  ┌─────────────┐          ┌─────────┐ ┌───────┐ │
│  │    在庫     │          │  決済   │ │ 配送  │ │
│  │             │          │  [ACL]  │ │       │ │
│  └─────────────┘          └────┬────┘ └───────┘ │
│                                │                 │
│                           外部決済API            │
└───────────────────────────────────────────────────┘
\`\`\`

## まとめ

- **パートナーシップ**: 対等な協力関係
- **共有カーネル**: 共通モデルの共有（最小限に）
- **顧客/供給者**: 下流のニーズに上流が応える
- **順応者**: 上流のモデルにそのまま従う
- **腐敗防止層**: 翻訳層で自分のモデルを守る
- **公開ホストサービス**: 明確なAPIを公開
- パターンは**状況に応じて選択**し、**組み合わせ**て使うことも多い
`),
  order: 2,
});

export const chapter4Lessons = [lesson4_1, lesson4_2];

// =============================================================================
// Chapter 5: 値オブジェクト
// =============================================================================

// Lesson 5-1: 値オブジェクトとは
export const lesson5_1 = Lesson.create({
  id: LessonId.create('lesson-5-1'),
  title: LessonTitle.create('値オブジェクトとは'),
  content: MarkdownContent.create(`
# 値オブジェクトとは

## 概要

このレッスンでは、DDDの戦術的設計パターンの基本となる「値オブジェクト」について学びます。
値オブジェクトとは何か、なぜ重要なのか、エンティティとの違いを理解しましょう。

## 値オブジェクトの定義

**値オブジェクト（Value Object）** は、概念的な同一性を持たず、
その属性の値によってのみ特徴づけられるオブジェクトです。

### 日常の例

\`\`\`
値オブジェクトの例:
- 1000円札 → 別の1000円札と交換しても価値は同じ
- 住所「東京都渋谷区...」→ 同じ住所なら同一と見なす
- RGB(255, 0, 0) → 赤色を表す、同じ値なら同じ色
\`\`\`

### エンティティとの対比

\`\`\`
エンティティの例:
- 銀行口座 → 口座番号で識別、残高は変わる
- 人物 → 名前が変わっても同一人物
- 注文 → 注文IDで識別、状態が変化
\`\`\`

## 値オブジェクトの3つの特徴

### 1. 不変性（Immutability）

一度作成されたら、その状態を変更することができません。

\`\`\`typescript
// 良い例：不変な値オブジェクト
class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}

  // 新しいインスタンスを返す（自身は変更しない）
  add(other: Money): Money {
    return new Money(this.amount + other.amount, this.currency);
  }
}

// 悪い例：可変な実装
class MutableMoney {
  private amount: number;

  add(other: MutableMoney): void {
    this.amount += other.amount; // 自身を変更 - これは値オブジェクトではない
  }
}
\`\`\`

### 2. 等価性（Equality）

値オブジェクトは、IDではなく**全ての属性の値**で等価性を判断します。

\`\`\`typescript
class Money {
  equals(other: Money): boolean {
    return this.amount === other.amount &&
           this.currency === other.currency;
  }
}

// 使用例
const money1 = Money.create(1000, Currency.JPY);
const money2 = Money.create(1000, Currency.JPY);

money1.equals(money2); // true - 同じ値なので等価
money1 === money2;     // false - 異なるインスタンス
\`\`\`

### 3. 自己完結性

値オブジェクトは、自身のバリデーションロジックを持ちます。

\`\`\`typescript
class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!this.isValidFormat(value)) {
      throw new InvalidEmailFormatError(value);
    }
    return new Email(value);
  }

  private static isValidFormat(value: string): boolean {
    return /^[^@]+@[^@]+\\.[^@]+$/.test(value);
  }
}
\`\`\`

## なぜ値オブジェクトが重要か

### 1. ドメインロジックの集約

プリミティブ型を使うと、バリデーションが散在します：

\`\`\`typescript
// 悪い例：バリデーションが散在
function createUser(email: string, age: number) {
  if (!isValidEmail(email)) throw new Error('Invalid email');
  if (age < 0 || age > 150) throw new Error('Invalid age');
  // ...
}

function updateEmail(userId: string, email: string) {
  if (!isValidEmail(email)) throw new Error('Invalid email'); // 重複！
  // ...
}

// 良い例：値オブジェクトに集約
function createUser(email: Email, age: Age) {
  // バリデーション不要 - Email, Ageの作成時に検証済み
}
\`\`\`

### 2. 型安全性の向上

\`\`\`typescript
// 悪い例：取り違えの危険
function transfer(from: string, to: string, amount: number) { }
transfer(toAccount, fromAccount, 1000); // 引数の順番を間違えてもコンパイル通る

// 良い例：型で守る
function transfer(from: AccountId, to: AccountId, amount: Money) { }
transfer(toAccountId, fromAccountId, money); // AccountIdは交換可能だが意図は明確
\`\`\`

### 3. 副作用の防止

\`\`\`typescript
// 不変なので、意図しない変更が起きない
const price = Money.create(1000, Currency.JPY);
const discountedPrice = price.multiply(0.9); // 新しいインスタンス

console.log(price.amount);          // 1000（元の値は変わらない）
console.log(discountedPrice.amount); // 900
\`\`\`

## いつ値オブジェクトを使うか

| ユースケース | 例 |
|------------|-----|
| 計測・定量化 | 金額、距離、重量、期間 |
| 識別情報 | メールアドレス、電話番号、郵便番号 |
| 概念の組み合わせ | 住所（都道府県+市区町村+...）、氏名（姓+名） |
| 範囲・区間 | 日付範囲、価格帯 |

## まとめ

- **値オブジェクト**は属性の値で特徴づけられ、同一性を持たない
- **3つの特徴**: 不変性、等価性、自己完結性
- 値オブジェクトにより**ドメインロジックの集約**、**型安全性**、**副作用防止**を実現
- **計測・定量化**、**識別情報**、**概念の組み合わせ**に値オブジェクトを使う
`),
  order: 1,
});

// Lesson 5-2: 値オブジェクトの実装
export const lesson5_2 = Lesson.create({
  id: LessonId.create('lesson-5-2'),
  title: LessonTitle.create('値オブジェクトの実装'),
  content: MarkdownContent.create(`
# 値オブジェクトの実装

## 概要

このレッスンでは、値オブジェクトの具体的な実装パターンについて学びます。
TypeScriptでの実装方法、ファクトリメソッド、演算メソッドの設計を理解しましょう。

## 基本的な実装パターン

### privateコンストラクタとファクトリメソッド

\`\`\`typescript
export class Money {
  // privateコンストラクタで直接インスタンス化を防ぐ
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}

  // ファクトリメソッドでバリデーション付きの生成
  static create(amount: number, currency: Currency): Money {
    if (amount < 0) {
      throw new NegativeAmountError(amount);
    }
    if (!Number.isFinite(amount)) {
      throw new InvalidAmountError(amount);
    }
    return new Money(amount, currency);
  }

  // ゼロ値の生成
  static zero(currency: Currency): Money {
    return new Money(0, currency);
  }
}
\`\`\`

### なぜprivateコンストラクタか

\`\`\`typescript
// publicコンストラクタの問題
class BadMoney {
  constructor(public amount: number, public currency: string) {}
}

new BadMoney(-1000, 'JPY');  // 不正な値が作れてしまう
new BadMoney(100, 'INVALID'); // 存在しない通貨も作れる

// privateコンストラクタ + ファクトリメソッドの利点
class GoodMoney {
  private constructor(/*...*/) {}
  static create(amount: number, currency: Currency): GoodMoney {
    // 必ずバリデーションを通る
  }
}

// Money.create(-1000, Currency.JPY); // → エラー
\`\`\`

## 不変性の実装

### readonlyによる不変性の保証

\`\`\`typescript
class Address {
  private constructor(
    private readonly prefecture: Prefecture,
    private readonly city: City,
    private readonly street: Street,
    private readonly building: Building | null
  ) {}

  // getterでアクセス（setterは提供しない）
  get prefectureName(): string {
    return this.prefecture.name;
  }

  // 変更メソッドは新しいインスタンスを返す
  withBuilding(building: Building): Address {
    return new Address(
      this.prefecture,
      this.city,
      this.street,
      building
    );
  }
}
\`\`\`

### Object.freezeによる追加の保護（オプション）

\`\`\`typescript
class ImmutableConfig {
  private constructor(private readonly data: ConfigData) {
    Object.freeze(this);
    Object.freeze(this.data);
  }
}
\`\`\`

## 等価性の実装

### equalsメソッドの実装

\`\`\`typescript
class DateRange {
  private constructor(
    private readonly start: Date,
    private readonly end: Date
  ) {}

  equals(other: DateRange): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this.start.getTime() === other.start.getTime() &&
           this.end.getTime() === other.end.getTime();
  }

  // hashCodeの実装（MapやSetで使う場合）
  hashCode(): number {
    return this.start.getTime() * 31 + this.end.getTime();
  }
}
\`\`\`

### 複合値オブジェクトの等価性

\`\`\`typescript
class FullName {
  private constructor(
    private readonly firstName: FirstName,
    private readonly lastName: LastName
  ) {}

  equals(other: FullName): boolean {
    return this.firstName.equals(other.firstName) &&
           this.lastName.equals(other.lastName);
  }
}
\`\`\`

## 演算メソッドの設計

### 算術演算

\`\`\`typescript
class Money {
  add(other: Money): Money {
    this.ensureSameCurrency(other);
    return Money.create(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.ensureSameCurrency(other);
    return Money.create(this.amount - other.amount, this.currency);
  }

  multiply(multiplier: number): Money {
    return Money.create(this.amount * multiplier, this.currency);
  }

  private ensureSameCurrency(other: Money): void {
    if (!this.currency.equals(other.currency)) {
      throw new CurrencyMismatchError(this.currency, other.currency);
    }
  }
}
\`\`\`

### 比較演算

\`\`\`typescript
class Money {
  isGreaterThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount < other.amount;
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  isPositive(): boolean {
    return this.amount > 0;
  }
}
\`\`\`

## 変換メソッドの実装

### 文字列表現

\`\`\`typescript
class Money {
  toString(): string {
    return \`\${this.currency.symbol}\${this.amount.toLocaleString()}\`;
  }

  toJSON(): { amount: number; currency: string } {
    return {
      amount: this.amount,
      currency: this.currency.code,
    };
  }
}

class Email {
  toString(): string {
    return this.value;
  }

  get localPart(): string {
    return this.value.split('@')[0];
  }

  get domain(): string {
    return this.value.split('@')[1];
  }
}
\`\`\`

### 再構築（デシリアライズ）

\`\`\`typescript
class Money {
  // DBやJSONからの再構築用
  static reconstruct(amount: number, currencyCode: string): Money {
    const currency = Currency.fromCode(currencyCode);
    return new Money(amount, currency);
  }
}
\`\`\`

## 実装のベストプラクティス

### 1. 単一責任の原則

\`\`\`typescript
// 良い例：単一の概念を表す
class PhoneNumber { /* 電話番号のみ */ }
class Email { /* メールアドレスのみ */ }

// 悪い例：複数の概念を混ぜる
class ContactInfo {
  phone?: string;
  email?: string;
  fax?: string;
}
\`\`\`

### 2. ドメイン用語を使う

\`\`\`typescript
// 良い例
class OrderQuantity { }
class UnitPrice { }
class TotalAmount { }

// 悪い例
class IntWrapper { }
class DecimalValue { }
\`\`\`

## まとめ

- **privateコンストラクタ + ファクトリメソッド**でバリデーションを強制
- **readonly**で不変性を保証
- **equalsメソッド**で値による等価性を実装
- 演算メソッドは**新しいインスタンスを返す**
- **ドメイン用語**を使い、**単一の概念**を表現する
`),
  order: 2,
});

// Lesson 5-3: 自己検証と不変条件
export const lesson5_3 = Lesson.create({
  id: LessonId.create('lesson-5-3'),
  title: LessonTitle.create('自己検証と不変条件'),
  content: MarkdownContent.create(`
# 自己検証と不変条件

## 概要

このレッスンでは、値オブジェクトの重要な特性である「自己検証」と「不変条件」について学びます。
どのようにバリデーションを実装し、常に有効な状態を保つかを理解しましょう。

## 自己検証とは

**自己検証（Self-Validation）** とは、値オブジェクトが自身の有効性を
生成時に検証し、不正な状態のオブジェクトが存在できないようにすることです。

### プリミティブ型の問題

\`\`\`typescript
// プリミティブ型では不正な値が通る
interface User {
  email: string;  // 空文字列も通る
  age: number;    // -1 も通る
}

const invalidUser: User = {
  email: '',      // 不正だが通る
  age: -50,       // 不正だが通る
};
\`\`\`

### 値オブジェクトによる解決

\`\`\`typescript
class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!value || value.trim() === '') {
      throw new EmptyEmailError();
    }
    if (!this.isValidFormat(value)) {
      throw new InvalidEmailFormatError(value);
    }
    return new Email(value.toLowerCase().trim());
  }

  private static isValidFormat(value: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  }
}

// 不正なEmailは作成できない
// Email.create('');        // → EmptyEmailError
// Email.create('invalid'); // → InvalidEmailFormatError
\`\`\`

## 不変条件（Invariant）

**不変条件**とは、オブジェクトが常に満たすべきルールのことです。
値オブジェクトは、生成時にこれらの条件を検証し、以降は不変なので常に条件を満たします。

### 単一属性の不変条件

\`\`\`typescript
class Percentage {
  private constructor(private readonly value: number) {}

  static create(value: number): Percentage {
    // 不変条件: 0〜100の範囲
    if (value < 0 || value > 100) {
      throw new InvalidPercentageError(value);
    }
    return new Percentage(value);
  }
}

class Age {
  private constructor(private readonly value: number) {}

  static create(value: number): Age {
    // 不変条件: 0以上150以下の整数
    if (!Number.isInteger(value)) {
      throw new AgeNotIntegerError(value);
    }
    if (value < 0 || value > 150) {
      throw new AgeOutOfRangeError(value);
    }
    return new Age(value);
  }
}
\`\`\`

### 複数属性間の不変条件

\`\`\`typescript
class DateRange {
  private constructor(
    private readonly start: Date,
    private readonly end: Date
  ) {}

  static create(start: Date, end: Date): DateRange {
    // 不変条件: 開始日 <= 終了日
    if (start > end) {
      throw new InvalidDateRangeError(start, end);
    }
    return new DateRange(start, end);
  }

  get durationInDays(): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((this.end.getTime() - this.start.getTime()) / msPerDay);
  }
}

class PriceRange {
  private constructor(
    private readonly min: Money,
    private readonly max: Money
  ) {}

  static create(min: Money, max: Money): PriceRange {
    // 不変条件1: 同じ通貨
    if (!min.currency.equals(max.currency)) {
      throw new CurrencyMismatchError();
    }
    // 不変条件2: min <= max
    if (min.isGreaterThan(max)) {
      throw new InvalidPriceRangeError(min, max);
    }
    return new PriceRange(min, max);
  }
}
\`\`\`

## バリデーションパターン

### パターン1: 例外をスローする

\`\`\`typescript
class Email {
  static create(value: string): Email {
    if (!this.isValid(value)) {
      throw new InvalidEmailError(value);
    }
    return new Email(value);
  }
}

// 使用側
try {
  const email = Email.create(input);
} catch (error) {
  if (error instanceof InvalidEmailError) {
    // エラーハンドリング
  }
}
\`\`\`

### パターン2: Result型を返す

\`\`\`typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

class Email {
  static create(value: string): Result<Email, EmailValidationError> {
    if (!value) {
      return { ok: false, error: new EmptyEmailError() };
    }
    if (!this.isValidFormat(value)) {
      return { ok: false, error: new InvalidFormatError(value) };
    }
    return { ok: true, value: new Email(value) };
  }
}

// 使用側
const result = Email.create(input);
if (result.ok) {
  const email = result.value;
} else {
  const error = result.error;
}
\`\`\`

### パターン3: 検証メソッドを分離

\`\`\`typescript
class Email {
  static isValid(value: string): boolean {
    return !!value && this.isValidFormat(value);
  }

  static create(value: string): Email {
    if (!this.isValid(value)) {
      throw new InvalidEmailError(value);
    }
    return new Email(value);
  }
}

// 使用側（事前チェック可能）
if (Email.isValid(input)) {
  const email = Email.create(input);
}
\`\`\`

## 正規化（Normalization）

バリデーションと同時に、値を正規化することもあります：

\`\`\`typescript
class Email {
  static create(value: string): Email {
    const normalized = value.toLowerCase().trim();
    if (!this.isValidFormat(normalized)) {
      throw new InvalidEmailError(value);
    }
    return new Email(normalized);
  }
}

class PhoneNumber {
  static create(value: string): PhoneNumber {
    // ハイフンや空白を除去して正規化
    const normalized = value.replace(/[-\\s]/g, '');
    if (!this.isValidFormat(normalized)) {
      throw new InvalidPhoneNumberError(value);
    }
    return new PhoneNumber(normalized);
  }
}

class PostalCode {
  static create(value: string): PostalCode {
    // "123-4567" も "1234567" も受け付け、統一形式で保存
    const normalized = value.replace(/-/g, '');
    if (!/^\\d{7}$/.test(normalized)) {
      throw new InvalidPostalCodeError(value);
    }
    return new PostalCode(normalized);
  }

  // 表示用にフォーマット
  format(): string {
    return \`\${this.value.slice(0, 3)}-\${this.value.slice(3)}\`;
  }
}
\`\`\`

## エラーメッセージの設計

### ドメイン固有のエラー

\`\`\`typescript
// 汎用的すぎる
throw new Error('Invalid value');

// ドメイン固有で具体的
class InvalidEmailError extends Error {
  constructor(value: string) {
    super(\`メールアドレスの形式が正しくありません: \${value}\`);
    this.name = 'InvalidEmailError';
  }
}

class AgeOutOfRangeError extends Error {
  constructor(value: number) {
    super(\`年齢は0〜150の範囲で指定してください: \${value}\`);
    this.name = 'AgeOutOfRangeError';
  }
}
\`\`\`

## まとめ

- **自己検証**により、不正な状態の値オブジェクトが存在できなくなる
- **不変条件**は、値オブジェクトが常に満たすべきルール
- バリデーションは**例外**、**Result型**、**検証メソッド分離**などのパターンがある
- **正規化**により、同じ意味の値を統一的に扱える
- **ドメイン固有のエラー**で、問題を明確に伝える
`),
  order: 3,
});

export const chapter5Lessons = [lesson5_1, lesson5_2, lesson5_3];

// =============================================================================
// Chapter 6: エンティティ
// =============================================================================

// Lesson 6-1: エンティティとは
export const lesson6_1 = Lesson.create({
  id: LessonId.create('lesson-6-1'),
  title: LessonTitle.create('エンティティとは'),
  content: MarkdownContent.create(`
# エンティティとは

## 概要

このレッスンでは、DDDの戦術的設計パターンの中核となる「エンティティ」について学びます。
エンティティとは何か、なぜ重要なのか、値オブジェクトとの違いを理解しましょう。

## エンティティの定義

**エンティティ（Entity）** は、ライフサイクルを通じて一貫した同一性を持ち、
その状態が時間とともに変化するオブジェクトです。

### 日常の例

\`\`\`
エンティティの例:
- 銀行口座 → 口座番号で識別、残高は変わる
- 人物 → 社員番号やIDで識別、住所や役職は変わる
- 注文 → 注文番号で識別、状態（下書き→確定→配送中）が変わる
- 車 → 車両番号で識別、走行距離やオーナーは変わる
\`\`\`

### 値オブジェクトとの対比

\`\`\`
値オブジェクトの例（参考）:
- 1000円札 → どの1000円札でも同じ価値
- 住所「東京都渋谷区...」→ 同じ住所なら同一
- 色RGB(255, 0, 0) → 同じ値なら同じ赤
\`\`\`

## エンティティの3つの特徴

### 1. 同一性（Identity）

エンティティは一意の識別子（ID）によって区別されます。

\`\`\`typescript
class User {
  private constructor(
    private readonly _id: UserId,  // 一意の識別子
    private _name: UserName,
    private _email: Email
  ) {}

  get id(): UserId {
    return this._id;
  }

  equals(other: User): boolean {
    // IDで比較（名前やメールが変わっても同一人物）
    return this._id.equals(other._id);
  }
}

// 使用例
const user1 = User.reconstruct(UserId.create('user-123'), ...);
const user2 = User.reconstruct(UserId.create('user-123'), ...);

user1.equals(user2); // true - 同じIDなので同一エンティティ
\`\`\`

### 2. 変更可能性（Mutability）

エンティティの状態は時間とともに変化することがあります。

\`\`\`typescript
class Order {
  private constructor(
    private readonly _id: OrderId,
    private _items: OrderItem[],
    private _status: OrderStatus  // 状態が変化
  ) {}

  // 状態を変更するメソッド
  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.Draft) {
      throw new CannotModifyConfirmedOrderError();
    }
    this._items.push(item);
  }

  confirm(): void {
    if (this._items.length === 0) {
      throw new EmptyOrderCannotBeConfirmedError();
    }
    this._status = OrderStatus.Confirmed;
  }

  ship(): void {
    if (this._status !== OrderStatus.Confirmed) {
      throw new CannotShipUnconfirmedOrderError();
    }
    this._status = OrderStatus.Shipped;
  }
}
\`\`\`

### 3. ライフサイクル（Lifecycle）

エンティティは作成、変更、削除のライフサイクルを持ちます。

\`\`\`
┌─────────┐     ┌─────────┐     ┌──────────┐     ┌─────────┐
│ 作成    │ ──→ │ 更新    │ ──→ │ 保存     │ ──→ │ 削除    │
│ create  │     │ update  │     │ persist  │     │ delete  │
└─────────┘     └─────────┘     └──────────┘     └─────────┘

注文の例:
作成（Draft） → 確定（Confirmed） → 配送（Shipped） → 完了（Completed）
\`\`\`

## エンティティと値オブジェクトの違い

| 特徴 | エンティティ | 値オブジェクト |
|------|------------|--------------|
| **同一性** | IDで識別 | 全属性の値で識別 |
| **可変性** | 状態が変化しうる | 不変 |
| **比較方法** | ID で比較 | 全属性の値で比較 |
| **ライフサイクル** | 作成→更新→削除 | 生成のみ（変更は新規生成） |
| **例** | User, Order, Product | Money, Email, Address |

### 同じ「商品」でも違う

\`\`\`typescript
// エンティティとしての商品（カタログ管理）
class Product {
  // 商品マスタ - IDで識別、価格や説明が変わる
  private constructor(
    private readonly _id: ProductId,  // SKU-12345
    private _name: ProductName,
    private _price: Money,
    private _description: string
  ) {}

  changePrice(newPrice: Money): void {
    this._price = newPrice;  // 価格が変わる
  }
}

// 値オブジェクトとしての商品（注文明細）
class OrderItem {
  // 注文時点の情報のスナップショット - 不変
  private constructor(
    private readonly productId: ProductId,
    private readonly productName: string,
    private readonly unitPrice: Money,
    private readonly quantity: number
  ) {}

  // 変更メソッドはなし - 不変
}
\`\`\`

## なぜエンティティが重要か

### 1. 現実世界のモデリング

ビジネスの中心となる概念は通常エンティティです：

\`\`\`
ECサイト:
- 顧客（Customer） → 購入履歴が増える、住所が変わる
- 注文（Order） → 状態が変化する
- 在庫（Inventory） → 数量が変動する

銀行システム:
- 口座（Account） → 残高が変動する
- 取引（Transaction） → 作成後は不変だがログとして追跡
\`\`\`

### 2. 状態管理の中心

エンティティはアプリケーションの状態を管理します：

\`\`\`typescript
class User {
  private _status: UserStatus;
  private _lastLoginAt: Date | null;

  login(): void {
    this._status = UserStatus.Active;
    this._lastLoginAt = new Date();
  }

  suspend(reason: SuspensionReason): void {
    this._status = UserStatus.Suspended;
    // 監査ログなども記録
  }
}
\`\`\`

### 3. 永続化の単位

エンティティはデータベースに保存される単位です：

\`\`\`typescript
interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  delete(id: UserId): Promise<void>;
}
\`\`\`

## いつエンティティを使うか

| 判断基準 | エンティティ | 値オブジェクト |
|---------|------------|--------------|
| 識別が必要か | ✓ | × |
| 状態が変化するか | ✓ | × |
| ライフサイクルがあるか | ✓ | × |
| 永続化が必要か | ✓ | 単独では× |
| トラッキングが必要か | ✓ | × |

## まとめ

- **エンティティ**は一意のIDで識別され、ライフサイクルを通じて同一性を保つ
- **3つの特徴**: 同一性（Identity）、変更可能性（Mutability）、ライフサイクル（Lifecycle）
- **値オブジェクト**との違いは、IDによる識別と状態の可変性
- エンティティは**現実世界のモデリング**、**状態管理**、**永続化の単位**として重要
`),
  order: 1,
});

// Lesson 6-2: ライフサイクルと同一性
export const lesson6_2 = Lesson.create({
  id: LessonId.create('lesson-6-2'),
  title: LessonTitle.create('ライフサイクルと同一性'),
  content: MarkdownContent.create(`
# ライフサイクルと同一性

## 概要

このレッスンでは、エンティティの2つの重要な側面である「ライフサイクル」と「同一性」について深く学びます。
エンティティがどのように生成、変更、削除されるか、そして同一性をどう管理するかを理解しましょう。

## エンティティのライフサイクル

### 4つのフェーズ

\`\`\`
┌──────────┐
│ 1. 生成  │  create, register
└────┬─────┘
     │
┌────▼─────┐
│ 2. 取得  │  findById, search
└────┬─────┘
     │
┌────▼─────┐
│ 3. 変更  │  update, modify
└────┬─────┘
     │
┌────▼─────┐
│ 4. 削除  │  delete, archive
└──────────┘
\`\`\`

### 1. エンティティの生成

エンティティは通常、ファクトリメソッドまたはコンストラクタで生成されます。

\`\`\`typescript
class User {
  private constructor(
    private readonly _id: UserId,
    private _name: UserName,
    private _email: Email,
    private _createdAt: Date
  ) {}

  // 新規作成（IDは自動生成）
  static create(params: CreateUserParams): User {
    return new User(
      UserId.generate(),  // UUIDなどで生成
      UserName.create(params.name),
      Email.create(params.email),
      new Date()
    );
  }

  // 再構築（DBから取得時）
  static reconstruct(
    id: UserId,
    name: UserName,
    email: Email,
    createdAt: Date
  ): User {
    return new User(id, name, email, createdAt);
  }
}

// 使用例
const newUser = User.create({ name: '田中太郎', email: 'tanaka@example.com' });
\`\`\`

### 2. エンティティの取得

リポジトリを通じてエンティティを取得します。

\`\`\`typescript
interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findAll(): Promise<User[]>;
}

// 使用例
const user = await userRepository.findById(userId);
if (user === null) {
  throw new UserNotFoundError(userId);
}
\`\`\`

### 3. エンティティの変更

エンティティは状態を変更するメソッドを持ちます。

\`\`\`typescript
class Order {
  private _status: OrderStatus;
  private _items: OrderItem[];

  addItem(item: OrderItem): void {
    this.ensureModifiable();
    this._items.push(item);
  }

  confirm(): void {
    this.ensureHasItems();
    this.ensureDraft();
    this._status = OrderStatus.Confirmed;
  }

  cancel(): void {
    this.ensureCancellable();
    this._status = OrderStatus.Cancelled;
  }

  private ensureModifiable(): void {
    if (this._status !== OrderStatus.Draft) {
      throw new OrderNotModifiableError(this._status);
    }
  }
}

// 使用例
order.addItem(item);
order.confirm();
await orderRepository.save(order);
\`\`\`

### 4. エンティティの削除

\`\`\`typescript
// 物理削除
interface UserRepository {
  delete(id: UserId): Promise<void>;
}

// 論理削除（推奨）
class User {
  private _deletedAt: Date | null;

  delete(): void {
    if (this._deletedAt !== null) {
      throw new UserAlreadyDeletedError();
    }
    this._deletedAt = new Date();
  }

  get isDeleted(): boolean {
    return this._deletedAt !== null;
  }
}
\`\`\`

## 同一性（Identity）の管理

### IDの生成戦略

#### 1. UUID/GUID

\`\`\`typescript
class UserId {
  private constructor(private readonly value: string) {}

  static generate(): UserId {
    const uuid = crypto.randomUUID(); // 'a1b2c3d4-...'
    return new UserId(uuid);
  }

  static create(value: string): UserId {
    if (!this.isValidUUID(value)) {
      throw new InvalidUserIdError(value);
    }
    return new UserId(value);
  }
}
\`\`\`

**メリット**: 衝突の心配がない、分散システムに適している
**デメリット**: 見た目が分かりにくい

#### 2. 連番（Auto Increment）

\`\`\`typescript
class ProductId {
  private constructor(private readonly value: number) {}

  // DBのAUTO_INCREMENTで生成
  static create(value: number): ProductId {
    if (value <= 0) {
      throw new InvalidProductIdError(value);
    }
    return new ProductId(value);
  }
}
\`\`\`

**メリット**: シンプル、URLに使いやすい（/products/123）
**デメリット**: 分散システムには不向き、推測可能

#### 3. 自然キー

\`\`\`typescript
class Email {
  // メールアドレス自体が識別子
  private constructor(private readonly value: string) {}
}

class User {
  // メールアドレスで識別
  private constructor(
    private readonly _email: Email,  // 自然キー
    private _name: UserName
  ) {}

  get email(): Email {
    return this._email;
  }

  equals(other: User): boolean {
    return this._email.equals(other._email);
  }
}
\`\`\`

**メリット**: 意味がある、ビジネス上自然
**デメリット**: 変更される可能性がある（メールアドレス変更など）

### 同一性の比較

#### equalsメソッドの実装

\`\`\`typescript
class Order {
  private constructor(
    private readonly _id: OrderId,
    private _items: OrderItem[],
    private _status: OrderStatus
  ) {}

  equals(other: Order): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    // IDのみで比較（その他の属性は無視）
    return this._id.equals(other._id);
  }
}

// 使用例
const order1 = await repository.findById(orderId);
const order2 = await repository.findById(orderId);

order1 === order2;         // false（異なるインスタンス）
order1.equals(order2);     // true（同じID = 同一エンティティ）
\`\`\`

## ライフサイクルと状態遷移

### 状態遷移の管理

\`\`\`typescript
enum OrderStatus {
  Draft = 'DRAFT',
  Confirmed = 'CONFIRMED',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED'
}

class Order {
  private _status: OrderStatus;

  confirm(): void {
    if (this._status !== OrderStatus.Draft) {
      throw new InvalidStatusTransitionError(this._status, OrderStatus.Confirmed);
    }
    this._status = OrderStatus.Confirmed;
  }

  ship(): void {
    if (this._status !== OrderStatus.Confirmed) {
      throw new InvalidStatusTransitionError(this._status, OrderStatus.Shipped);
    }
    this._status = OrderStatus.Shipped;
  }

  cancel(): void {
    // キャンセルできる状態を制限
    if (this._status === OrderStatus.Shipped ||
        this._status === OrderStatus.Delivered) {
      throw new CannotCancelShippedOrderError();
    }
    this._status = OrderStatus.Cancelled;
  }
}
\`\`\`

### 状態遷移図

\`\`\`
     ┌──────────┐
     │  Draft   │ 下書き
     └────┬─────┘
          │ confirm()
     ┌────▼─────┐
     │Confirmed │ 確定
     └────┬─────┘
          │ ship()
     ┌────▼─────┐
     │ Shipped  │ 配送中
     └────┬─────┘
          │ deliver()
     ┌────▼─────┐
     │Delivered │ 配送完了
     └──────────┘

     cancel()でキャンセル状態へ（Draft/Confirmedから）
\`\`\`

## 楽観的ロックと悲観的ロック

### 楽観的ロック（バージョン管理）

\`\`\`typescript
class User {
  private constructor(
    private readonly _id: UserId,
    private _name: UserName,
    private _version: number  // バージョン番号
  ) {}

  changeName(newName: UserName): void {
    this._name = newName;
    this._version++;  // 変更時にバージョンを上げる
  }

  get version(): number {
    return this._version;
  }
}

// リポジトリでの保存時チェック
class UserRepositoryImpl implements UserRepository {
  async save(user: User): Promise<void> {
    const result = await db.execute(
      'UPDATE users SET name = ?, version = ? WHERE id = ? AND version = ?',
      [user.name, user.version, user.id, user.version - 1]
    );

    if (result.affectedRows === 0) {
      throw new OptimisticLockError();
    }
  }
}
\`\`\`

## まとめ

- エンティティのライフサイクルは**生成→取得→変更→削除**の4フェーズ
- **ID生成戦略**: UUID（分散向き）、連番（シンプル）、自然キー（意味あり）
- **同一性**はIDで判断し、equalsメソッドで実装
- **状態遷移**は明示的に管理し、不正な遷移を防ぐ
- **楽観的ロック**でバージョン管理し、同時更新の競合を検出
`),
  order: 2,
});

// Lesson 6-3: エンティティと値オブジェクトの違い
export const lesson6_3 = Lesson.create({
  id: LessonId.create('lesson-6-3'),
  title: LessonTitle.create('エンティティと値オブジェクトの違い'),
  content: MarkdownContent.create(`
# エンティティと値オブジェクトの違い

## 概要

このレッスンでは、エンティティと値オブジェクトの違いを詳しく学び、
どのような場合にどちらを使うべきかの判断基準を理解しましょう。

## 比較表

| 観点 | エンティティ | 値オブジェクト |
|-----|------------|--------------|
| **同一性** | IDで識別 | 全属性の値で識別 |
| **可変性** | 変更可能（Mutable） | 不変（Immutable） |
| **比較方法** | ID の equals | 全属性の equals |
| **ライフサイクル** | 作成→変更→削除 | 生成のみ（変更=新規生成） |
| **永続化** | 単独でDB保存 | エンティティの一部として保存 |
| **トラッキング** | 履歴を追跡できる | 追跡不要 |
| **メモリ** | 参照で共有 | 値で複製 |

## 同一性の違い

### エンティティ: IDで識別

\`\`\`typescript
class User {
  private constructor(
    private readonly _id: UserId,
    private _name: UserName,
    private _email: Email
  ) {}

  equals(other: User): boolean {
    return this._id.equals(other._id);
  }
}

// 例
const user1 = User.reconstruct(
  UserId.create('user-123'),
  UserName.create('田中'),
  Email.create('tanaka@example.com')
);

const user2 = User.reconstruct(
  UserId.create('user-123'),
  UserName.create('田中太郎'),  // 名前が違う
  Email.create('newtanaka@example.com')  // メールも違う
);

user1.equals(user2); // true - 同じIDなので同一人物
\`\`\`

### 値オブジェクト: 全属性で識別

\`\`\`typescript
class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}

  equals(other: Money): boolean {
    return this.amount === other.amount &&
           this.currency.equals(other.currency);
  }
}

// 例
const money1 = Money.create(1000, Currency.JPY);
const money2 = Money.create(1000, Currency.JPY);
const money3 = Money.create(2000, Currency.JPY);

money1.equals(money2); // true - 全属性が同じ
money1.equals(money3); // false - 金額が違う
\`\`\`

## 可変性の違い

### エンティティ: 状態が変化する

\`\`\`typescript
class Order {
  private _items: OrderItem[];
  private _status: OrderStatus;

  // 状態を変更するメソッド
  addItem(item: OrderItem): void {
    this._items.push(item);
  }

  confirm(): void {
    this._status = OrderStatus.Confirmed;
  }
}

// 使用例
const order = Order.create();
order.addItem(item1);  // 状態が変わる
order.addItem(item2);  // 状態が変わる
order.confirm();       // 状態が変わる
\`\`\`

### 値オブジェクト: 不変

\`\`\`typescript
class Money {
  // 変更メソッドはない
  add(other: Money): Money {
    // 自身を変更せず、新しいインスタンスを返す
    return Money.create(this.amount + other.amount, this.currency);
  }
}

// 使用例
const price = Money.create(1000, Currency.JPY);
const tax = Money.create(100, Currency.JPY);
const total = price.add(tax);  // 新しいインスタンス

console.log(price.amount);  // 1000 (元の値は変わらない)
console.log(total.amount);  // 1100
\`\`\`

## 判断基準

### エンティティを選ぶべき場合

\`\`\`typescript
// ✓ 識別が必要
class User {
  private readonly _id: UserId;  // ユーザーはIDで識別
}

// ✓ 状態が変化する
class Account {
  private _balance: Money;  // 残高が変動
  deposit(amount: Money): void { ... }
}

// ✓ ライフサイクルがある
class Order {
  // 作成 → 確定 → 配送 → 完了
  private _status: OrderStatus;
}

// ✓ トラッキングが必要
class Transaction {
  private readonly _createdAt: Date;
  private _processedAt: Date | null;
}
\`\`\`

### 値オブジェクトを選ぶべき場合

\`\`\`typescript
// ✓ 計測・定量化
class Money { ... }
class Distance { ... }
class Duration { ... }

// ✓ 複数属性の組み合わせ
class Address {
  constructor(
    private readonly prefecture: string,
    private readonly city: string,
    private readonly street: string
  ) {}
}

// ✓ 概念的な値
class DateRange {
  constructor(
    private readonly start: Date,
    private readonly end: Date
  ) {}
}

// ✓ 交換可能
class Color { ... }  // RGB(255,0,0) は別の RGB(255,0,0) と交換可能
\`\`\`

## 混在の例: 注文システム

\`\`\`typescript
// エンティティ: Order
class Order {
  private constructor(
    private readonly _id: OrderId,        // エンティティ
    private readonly _customerId: CustomerId,  // 他エンティティへの参照
    private _items: OrderItem[],          // 値オブジェクトのコレクション
    private _shippingAddress: Address,    // 値オブジェクト
    private _status: OrderStatus,
    private readonly _orderedAt: Date
  ) {}

  addItem(
    productId: ProductId,  // エンティティへの参照
    quantity: Quantity,    // 値オブジェクト
    unitPrice: Money       // 値オブジェクト
  ): void {
    const item = OrderItem.create(productId, quantity, unitPrice);
    this._items.push(item);
  }

  changeShippingAddress(newAddress: Address): void {
    // 値オブジェクトは丸ごと交換
    this._shippingAddress = newAddress;
  }
}

// 値オブジェクト: OrderItem
class OrderItem {
  private constructor(
    private readonly productId: ProductId,  // エンティティへの参照（IDのみ）
    private readonly productName: string,
    private readonly quantity: Quantity,
    private readonly unitPrice: Money
  ) {}

  // 値オブジェクトなので変更メソッドはない
  // 不変のスナップショット
}

// 値オブジェクト: Address
class Address {
  private constructor(
    private readonly prefecture: Prefecture,
    private readonly city: City,
    private readonly street: Street
  ) {}

  // 変更は新しいインスタンスを生成
  withBuilding(building: Building): Address {
    return new Address(this.prefecture, this.city, this.street, building);
  }
}
\`\`\`

## よくある間違い

### 間違い1: 値オブジェクトをエンティティにする

\`\`\`typescript
// ❌ 悪い例: Moneyをエンティティにしてしまう
class Money {
  private readonly _id: MoneyId;  // 不要なID
  private _amount: number;         // 可変にしてしまう

  setAmount(amount: number): void {
    this._amount = amount;
  }
}

// ✓ 良い例: Moneyは値オブジェクト
class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}

  add(other: Money): Money {
    return Money.create(this.amount + other.amount, this.currency);
  }
}
\`\`\`

### 間違い2: エンティティを値オブジェクトにする

\`\`\`typescript
// ❌ 悪い例: Userを値オブジェクトにしてしまう
class User {
  constructor(
    public readonly name: string,
    public readonly email: string
  ) {}

  equals(other: User): boolean {
    // 全属性で比較してしまう
    return this.name === other.name && this.email === other.email;
  }
}

// 問題: 名前が同じ別の人を同一人物と判断してしまう

// ✓ 良い例: Userはエンティティ
class User {
  private constructor(
    private readonly _id: UserId,  // IDで識別
    private _name: UserName,
    private _email: Email
  ) {}

  equals(other: User): boolean {
    return this._id.equals(other._id);
  }
}
\`\`\`

## 判断のフローチャート

\`\`\`
開始
  ↓
Q: 追跡する必要があるか？
  YES → エンティティ
  NO  → ↓
Q: 時間とともに変化するか？
  YES → エンティティ
  NO  → ↓
Q: 交換可能か？
  YES → 値オブジェクト
  NO  → エンティティ
\`\`\`

## まとめ

- **エンティティ**: IDで識別、可変、ライフサイクルあり
  - 例: User, Order, Account
- **値オブジェクト**: 値で識別、不変、スナップショット
  - 例: Money, Address, Email
- **判断基準**: 追跡・識別が必要 → エンティティ、交換可能 → 値オブジェクト
- 同じ概念（商品、顧客など）でも**コンテキストによって異なる**場合がある
- 迷ったら**値オブジェクトから始める**（不変性の方が安全）
`),
  order: 3,
});

export const chapter6Lessons = [lesson6_1, lesson6_2, lesson6_3];

// =============================================================================
// Chapter 7: ドメインサービス
// =============================================================================

// Lesson 7-1: ドメインサービスとは
export const lesson7_1 = Lesson.create({
  id: LessonId.create('lesson-7-1'),
  title: LessonTitle.create('ドメインサービスとは'),
  content: MarkdownContent.create(`
# ドメインサービスとは

**ドメインサービス（Domain Service）** は、エンティティや値オブジェクトに自然に属さないドメインロジックを表現するオブジェクトです。

## ドメインサービスが必要な理由

### エンティティや値オブジェクトに収まらないロジック

\\\`\\\`\\\`typescript
// ❌ どのエンティティに属するべき？
class Account {
  transfer(to: Account, amount: Money): void {
    // 送金ロジック...でも送金元と送金先、両方のAccountを変更する
    // どちらのAccountのメソッドとして実装すべき？
  }
}
\\\`\\\`\\\`

このような**複数のオブジェクトをまたぐ操作**や**オブジェクトに属さない計算**は、ドメインサービスが適しています。

## ドメインサービスの特徴

### 1. ステートレス（状態を持たない）

ドメインサービスは状態を持ちません。必要な情報はすべて引数で受け取ります。

\\\`\\\`\\\`typescript
// ✅ 状態を持たないドメインサービス
class TransferService {
  transfer(from: Account, to: Account, amount: Money): void {
    // すべて引数で受け取る
  }
}
\\\`\\\`\\\`

### 2. ドメイン知識を表現する

技術的な処理ではなく、**ビジネスルール**を表現します。

\\\`\\\`\\\`typescript
// ✅ ドメイン知識を表現
class InventoryAllocationService {
  canAllocate(product: Product, quantity: Quantity): boolean {
    // 在庫割り当て可否のビジネスルール
  }
}

// ❌ 技術的な処理（インフラストラクチャサービス）
class EmailService {
  sendEmail(to: string, subject: string): void {
    // メール送信は技術的な処理
  }
}
\\\`\\\`\\\`

### 3. 操作（動詞）で表現される

ドメインサービスは**操作**を表すため、名前は動詞またはサービスを示す名詞になります。

- 良い例: \\\`TransferService\\\`, \\\`PricingService\\\`, \\\`AuthenticationService\\\`
- 避けるべき: \\\`AccountManager\\\`, \\\`OrderHelper\\\`, \\\`ProductUtil\\\`

## エンティティ・値オブジェクトとの違い

| 観点 | エンティティ | 値オブジェクト | ドメインサービス |
|------|------------|--------------|----------------|
| **同一性** | IDで識別 | 値で識別 | 状態を持たない |
| **状態** | 持つ（可変） | 持つ（不変） | 持たない |
| **責務** | 自身のライフサイクル管理 | 値の表現と検証 | 複数オブジェクトの協調 |
| **名前** | 名詞 | 名詞 | 動詞/サービス名詞 |

## まとめ

- **ドメインサービス**は、エンティティや値オブジェクトに属さないドメインロジックを表現
- **ステートレス**で、必要な情報は引数で受け取る
- **ビジネスルール**を表現し、技術的な処理ではない
- 名前は**操作（動詞）**または**サービス名詞**
- エンティティ・値オブジェクトで表現できるなら、そちらを優先する
`),
  order: 1,
});


// Lesson 7-2: ドメインサービスの実装
export const lesson7_2 = Lesson.create({
  id: LessonId.create('lesson-7-2'),
  title: LessonTitle.create('ドメインサービスの実装'),
  content: MarkdownContent.create(`
# ドメインサービスの実装

ドメインサービスを実装する際のパターンとベストプラクティスを学びます。

## 基本的な実装パターン

### ステートレスなクラスとして実装

\\\`\\\`\\\`typescript
export class MoneyTransferService {
  // 状態（フィールド）を持たない

  transfer(from: Account, to: Account, amount: Money): TransferResult {
    // バリデーション
    if (!this.canTransfer(from, to, amount)) {
      return TransferResult.failure('Transfer not allowed');
    }

    // ドメインロジック実行
    from.withdraw(amount);
    to.deposit(amount);

    return TransferResult.success();
  }

  private canTransfer(from: Account, to: Account, amount: Money): boolean {
    return from.balance.isGreaterThanOrEqual(amount) &&
           !from.isFrozen() &&
           !to.isFrozen();
  }
}
\\\`\\\`\\\`

## 命名規則

### 良い命名

✅ **操作を明確に表す**:
- \\\`MoneyTransferService\\\` - 送金サービス
- \\\`PricingService\\\` - 価格計算サービス
- \\\`AuthenticationService\\\` - 認証サービス
- \\\`InventoryAllocationService\\\` - 在庫割り当てサービス

### 避けるべき命名

❌ **曖昧な名前**:
- \\\`AccountManager\\\` - 何をするのか不明
- \\\`OrderHelper\\\` - ヘルパーは技術的
- \\\`ProductUtil\\\` - ユーティリティは技術的

## まとめ

- ドメインサービスは**ステートレス**なクラスとして実装
- 名前は**操作やビジネス用語**を使う
- **テストしやすい**設計を心がける
`),
  order: 2,
});

// Lesson 7-3: エンティティ・値オブジェクトとの使い分け
export const lesson7_3 = Lesson.create({
  id: LessonId.create('lesson-7-3'),
  title: LessonTitle.create('エンティティ・値オブジェクトとの使い分け'),
  content: MarkdownContent.create(`
# エンティティ・値オブジェクトとの使い分け

ドメインロジックをどこに配置すべきか、判断基準とパターンを学びます。

## ロジック配置の判断フローチャート

\\\`\\\`\\\`
Q: そのロジックは単一のオブジェクトの責務か？
  YES → エンティティまたは値オブジェクトに配置
    ↓
    Q: 状態を持つか？ライフサイクルがあるか？
      YES → エンティティのメソッドとして実装
      NO  → 値オブジェクトのメソッドとして実装

  NO → ↓

Q: 複数のオブジェクトをまたぐ操作か？
  YES → ドメインサービスとして実装

Q: どのオブジェクトにも自然に属さない計算か？
  YES → ドメインサービスとして実装

  NO → もう一度エンティティ・値オブジェクトを検討
\\\`\\\`\\\`

## パターン1: エンティティに配置すべきロジック

### ✅ 良い例: 自身の状態を変更するロジック

\\\`\\\`\\\`typescript
class Order {
  private _status: OrderStatus;
  private _items: OrderItem[];

  // ✅ 注文自身の状態変更はOrderのメソッド
  confirm(): void {
    if (this._items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    if (this._status !== OrderStatus.Draft) {
      throw new Error('Order already confirmed');
    }
    this._status = OrderStatus.Confirmed;
  }
}
\\\`\\\`\\\`

### ❌ 悪い例: エンティティのロジックをサービスに移動

\\\`\\\`\\\`typescript
// ❌ 単一オブジェクトの責務なのにサービスにしている
class OrderService {
  confirmOrder(order: Order): void {
    // Orderのカプセル化を破壊
    order.status = OrderStatus.Confirmed;
  }
}

// ✅ Orderエンティティに配置すべき
class Order {
  confirm(): void {
    this._status = OrderStatus.Confirmed;
  }
}
\\\`\\\`\\\`

## パターン2: 値オブジェクトに配置すべきロジック

### ✅ 良い例: 値の計算や変換

\\\`\\\`\\\`typescript
class Money {
  // ✅ 金額計算は Money のメソッド
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }
}
\\\`\\\`\\\`

## パターン3: ドメインサービスに配置すべきロジック

### ✅ 良い例: 複数オブジェクトをまたぐ操作

\\\`\\\`\\\`typescript
// ✅ 送金は送金元と送金先、両方のAccountに影響
class MoneyTransferService {
  transfer(from: Account, to: Account, amount: Money): void {
    // どちらのAccountメソッドにすべきか判断できない
    // → ドメインサービスが適切

    if (!from.canWithdraw(amount)) {
      throw new InsufficientBalanceError();
    }

    from.withdraw(amount);
    to.deposit(amount);
  }
}
\\\`\\\`\\\`

## アンチパターン: ドメインサービスの過剰使用

### ❌ 貧血ドメインモデル（Anemic Domain Model）

すべてのロジックをサービスに配置し、エンティティがデータの入れ物になっている状態。

\\\`\\\`\\\`typescript
// ❌ データのみのエンティティ（貧血）
class Order {
  id: OrderId;
  items: OrderItem[];
  status: OrderStatus;
  // メソッドがない！
}

// ❌ すべてのロジックがサービスに
class OrderService {
  addItem(order: Order, item: OrderItem): void {
    order.items.push(item);
  }
}
\\\`\\\`\\\`

### ✅ リッチドメインモデル（Rich Domain Model）

エンティティが適切にロジックを持ち、ドメインサービスは本当に必要な場合のみ使用。

\\\`\\\`\\\`typescript
// ✅ ロジックを持つエンティティ
class Order {
  private _items: OrderItem[];

  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.Draft) {
      throw new Error('Cannot modify confirmed order');
    }
    this._items.push(item);
  }
}
\\\`\\\`\\\`

## まとめ

### ロジック配置の優先順位

1. **エンティティ or 値オブジェクト** （最優先）
   - 単一オブジェクトの責務
   - 自身の状態の管理・変更・計算

2. **ドメインサービス** （必要な場合のみ）
   - 複数オブジェクトをまたぐ操作
   - どこにも自然に属さない計算

### 判断のポイント

- ✅ "このロジックは誰の責務か？" を常に問う
- ✅ エンティティ・値オブジェクトに配置できるか、まず検討
- ✅ ドメインサービスは最後の手段
- ❌ 安易にサービスに配置しない（貧血ドメインモデルを避ける）

**原則**: オブジェクトはデータ**と**振る舞いをともに持つべき（リッチドメインモデル）
`),
  order: 3,
});

export const chapter7Lessons = [lesson7_1, lesson7_2, lesson7_3];
// Lesson 8-1: 集約とは
export const lesson8_1 = Lesson.create({
  id: LessonId.create('lesson-8-1'),
  title: LessonTitle.create('集約とは'),
  content: MarkdownContent.create(`
# 集約（Aggregate）

**集約** は、データ変更の一貫性を保つためにひとまとまりとして扱うオブジェクトの集まりです。

## 集約が解決する問題

### ❌ 問題: 一貫性の境界が不明確

\`\`\`mermaid
graph LR
    A[Order] --> B[OrderItem]
    A --> C[Customer]
    A --> D[Payment]
    B --> E[Product]
    
    style A fill:#f96,stroke:#333
    style B fill:#f96,stroke:#333
    style C fill:#9cf,stroke:#333
    style D fill:#9cf,stroke:#333
    style E fill:#9cf,stroke:#333
    
    Note[どこまでを一貫して変更すべき？]
\`\`\`

### ✅ 解決: 集約が境界を定義

\`\`\`mermaid
graph TB
    subgraph "Order 集約"
        A[Order<br/>集約ルート]
        B[OrderItem]
        C[OrderItem]
    end
    
    subgraph "Customer 集約"
        D[Customer<br/>集約ルート]
    end
    
    subgraph "Product 集約"
        E[Product<br/>集約ルート]
    end
    
    A -.参照: CustomerId.-> D
    B -.参照: ProductId.-> E
    
    style A fill:#6c6,stroke:#333,stroke-width:3px
    style D fill:#6c6,stroke:#333,stroke-width:3px
    style E fill:#6c6,stroke:#333,stroke-width:3px
\`\`\`

## 集約の3つの核心概念

### 1. 整合性の境界（Consistency Boundary）

集約は、**トランザクションで一貫性を保証する境界** を定義します。

\`\`\`mermaid
graph TB
    subgraph "トランザクション境界 = 集約"
        A[Order]
        B[OrderItem 1]
        C[OrderItem 2]
        D[OrderItem 3]
    end
    
    E[Customer] 
    F[Product]
    
    A --> B
    A --> C
    A --> D
    A -.別トランザクション.-> E
    B -.別トランザクション.-> F
    
    Note[集約内は1トランザクションで変更<br/>集約間は別トランザクション]
    
    style A fill:#6c6,stroke:#333,stroke-width:3px
    style E fill:#fc9,stroke:#333
    style F fill:#fc9,stroke:#333
\`\`\`

**原則**:
- ✅ 集約内のオブジェクトは、常に一貫した状態を保つ
- ✅ 1つのトランザクションで変更できるのは、1つの集約のみ
- ❌ 複数の集約を1トランザクションで変更しない

### 2. 不変条件（Invariants）

集約は、**常に満たすべきビジネスルール（不変条件）** を保護します。

\`\`\`typescript
export class Order {
  private constructor(
    private readonly _id: OrderId,
    private _items: OrderItem[],
    private _status: OrderStatus,
    private _totalAmount: Money
  ) {
    // 不変条件: 注文金額は明細の合計と一致する
    this.assertTotalAmountIsValid();
  }

  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.Draft) {
      throw new Error('Cannot modify confirmed order');
    }
    
    this._items.push(item);
    this._totalAmount = this.calculateTotal(); // 不変条件を維持
    this.assertTotalAmountIsValid();
  }

  private calculateTotal(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.subtotal()),
      Money.zero()
    );
  }

  private assertTotalAmountIsValid(): void {
    const calculated = this.calculateTotal();
    if (!this._totalAmount.equals(calculated)) {
      throw new Error('Total amount invariant violated');
    }
  }
}
\`\`\`

**不変条件の例**:
- 注文の合計金額は、明細の合計と一致する
- 在庫数は常に0以上
- 予約済み座席数は、座席総数を超えない

### 3. トランザクション境界（Transaction Boundary）

集約は、**データベーストランザクションの単位** を定義します。

\`\`\`mermaid
sequenceDiagram
    participant App as アプリケーション
    participant Repo as OrderRepository
    participant DB as データベース
    
    App->>Repo: save(order)
    activate Repo
    
    Repo->>DB: BEGIN TRANSACTION
    Repo->>DB: UPDATE orders SET ...
    Repo->>DB: UPDATE order_items SET ...
    Repo->>DB: COMMIT
    
    deactivate Repo
    
    Note over DB: Order集約全体が<br/>1トランザクションで保存
\`\`\`

## 集約の構成要素

\`\`\`mermaid
classDiagram
    class Order {
        <<Aggregate Root>>
        -OrderId id
        -OrderStatus status
        -Money totalAmount
        +addItem(item)
        +removeItem(itemId)
        +confirm()
    }
    
    class OrderItem {
        <<Entity>>
        -OrderItemId id
        -ProductId productId
        -Quantity quantity
        -Money unitPrice
        +subtotal() Money
    }
    
    class Money {
        <<Value Object>>
        -amount
        -currency
        +add(other) Money
    }
    
    Order "1" *-- "many" OrderItem : 含む
    OrderItem *-- "1" Money : 持つ
    
    note for Order "集約ルート:\\n外部からのエントリポイント"
    note for OrderItem "内部エンティティ:\\n集約ルート経由でのみアクセス"
\`\`\`

### 集約ルート（Aggregate Root）

- **外部からアクセスできる唯一のエントリポイント**
- 集約全体の整合性を保証する責務を持つ
- リポジトリは集約ルートのみを永続化・取得する

### 内部エンティティ/値オブジェクト

- **集約ルート経由でのみアクセス可能**
- 外部から直接参照されない
- 集約ルートが不変条件を保護する

## まとめ

| 概念 | 説明 | 例 |
|------|------|-----|
| **整合性の境界** | トランザクションで一貫性を保つ範囲 | Order + OrderItems |
| **不変条件** | 常に満たすべきビジネスルール | 合計 = 明細の和 |
| **トランザクション境界** | 1つのDBトランザクションの単位 | Order集約全体 |
| **集約ルート** | 外部アクセスのエントリポイント | Order |
| **内部オブジェクト** | 集約ルート経由でアクセス | OrderItem |

**重要な原則**:
- ✅ 1トランザクション = 1集約
- ✅ 集約は小さく保つ
- ✅ 集約間はIDで参照
- ✅ 不変条件は集約ルートが保護
`),
  order: 1,
});

// Lesson 8-2: 集約ルート
export const lesson8_2 = Lesson.create({
  id: LessonId.create('lesson-8-2'),
  title: LessonTitle.create('集約ルート'),
  content: MarkdownContent.create(`
# 集約ルート（Aggregate Root）

**集約ルート** は、集約への外部アクセスを制御し、集約全体の整合性を保証する責務を持つエンティティです。

## 集約ルートの役割

### 1. 外部アクセスの制御

\`\`\`mermaid
graph TB
    subgraph "外部"
        App[アプリケーション]
        Repo[Repository]
    end
    
    subgraph "Order 集約"
        Root[Order<br/>集約ルート<br/>✅ アクセス可能]
        Item1[OrderItem]
        Item2[OrderItem]
    end
    
    App -->|OK| Root
    App -.->|NG 直接アクセス禁止| Item1
    Repo -->|OK| Root
    Repo -.->|NG| Item2
    
    Root --> Item1
    Root --> Item2
    
    style Root fill:#6c6,stroke:#333,stroke-width:4px
    style Item1 fill:#ccc,stroke:#333
    style Item2 fill:#ccc,stroke:#333
\`\`\`

**原則**:
- ✅ 外部は集約ルートのみを参照できる
- ❌ 内部エンティティへの直接アクセスは禁止
- ✅ すべての操作は集約ルート経由

### 2. 不変条件の保護

集約ルートは、集約全体の不変条件を保護します。

\`\`\`typescript
export class Order {
  // 集約ルート
  private constructor(
    private readonly _id: OrderId,
    private _items: OrderItem[], // 内部エンティティ
    private _status: OrderStatus
  ) {}

  // ✅ 集約ルートが不変条件を保護するメソッド
  addItem(product: Product, quantity: Quantity): void {
    // ビジネスルール1: 確定済み注文は変更不可
    if (this._status !== OrderStatus.Draft) {
      throw new Error('Cannot modify confirmed order');
    }

    // ビジネスルール2: 同じ商品は1つの明細にまとめる
    const existingItem = this._items.find(item => 
      item.productId.equals(product.id)
    );
    
    if (existingItem) {
      existingItem.increaseQuantity(quantity);
    } else {
      const newItem = OrderItem.create({
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.price,
      });
      this._items.push(newItem);
    }

    // 不変条件の検証
    this.assertInvariants();
  }

  // ❌ 外部から items を直接変更させない
  // get items(): OrderItem[] { return this._items; } // NG!
  
  // ✅ 読み取り専用のコピーを返す
  get items(): readonly OrderItem[] {
    return [...this._items];
  }

  private assertInvariants(): void {
    if (this._items.length > 100) {
      throw new Error('Order cannot have more than 100 items');
    }
  }
}
\`\`\`

### 3. ライフサイクル管理

\`\`\`mermaid
stateDiagram-v2
    [*] --> Draft: create()
    Draft --> Confirmed: confirm()
    Confirmed --> Shipped: ship()
    Shipped --> Delivered: deliver()
    Delivered --> [*]
    
    Draft --> Cancelled: cancel()
    Confirmed --> Cancelled: cancel()
    Cancelled --> [*]
    
    note right of Draft
        集約ルートが
        状態遷移を制御
    end note
\`\`\`

## 実装パターン

### パターン1: ファクトリーメソッド

集約の生成は、集約ルート自身またはファクトリーが担当します。

\`\`\`typescript
export class Order {
  // private コンストラクタ
  private constructor(
    private readonly _id: OrderId,
    private _customerId: CustomerId,
    private _items: OrderItem[],
    private _status: OrderStatus
  ) {
    this.assertInvariants();
  }

  // ✅ ファクトリーメソッド: 新規作成
  static create(customerId: CustomerId): Order {
    return new Order(
      OrderId.generate(),
      customerId,
      [], // 空の明細リスト
      OrderStatus.Draft
    );
  }

  // ✅ ファクトリーメソッド: 再構築（リポジトリから取得時）
  static reconstruct(params: {
    id: OrderId;
    customerId: CustomerId;
    items: OrderItem[];
    status: OrderStatus;
  }): Order {
    // 再構築時は不変条件チェックのみ
    return new Order(
      params.id,
      params.customerId,
      params.items,
      params.status
    );
  }

  private assertInvariants(): void {
    if (this._status === OrderStatus.Confirmed && this._items.length === 0) {
      throw new Error('Confirmed order must have at least one item');
    }
  }
}
\`\`\`

### パターン2: 内部エンティティのカプセル化

\`\`\`typescript
export class Order {
  private _items: OrderItem[] = [];

  // ❌ 悪い例: 内部エンティティを直接公開
  // get items(): OrderItem[] {
  //   return this._items; // 外部から直接変更される危険！
  // }

  // ✅ 良い例: 読み取り専用で公開
  get items(): readonly OrderItem[] {
    return [...this._items]; // コピーを返す
  }

  // ✅ 良い例: 集約ルート経由で操作
  addItem(product: Product, quantity: Quantity): void {
    // 不変条件を守りながら追加
    // ...
  }

  removeItem(orderItemId: OrderItemId): void {
    const index = this._items.findIndex(item => 
      item.id.equals(orderItemId)
    );
    
    if (index === -1) {
      throw new Error('Item not found');
    }

    this._items.splice(index, 1);
    this.assertInvariants();
  }

  // ✅ 内部エンティティへのクエリメソッド
  findItem(productId: ProductId): OrderItem | undefined {
    return this._items.find(item => 
      item.productId.equals(productId)
    );
  }

  get totalAmount(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.subtotal()),
      Money.zero()
    );
  }
}
\`\`\`

### パターン3: リポジトリとの連携

\`\`\`mermaid
sequenceDiagram
    participant App as アプリケーション
    participant Root as Order<br/>(集約ルート)
    participant Repo as OrderRepository
    participant DB as DB
    
    App->>Repo: findById(orderId)
    Repo->>DB: SELECT order, order_items
    DB-->>Repo: データ
    Repo->>Root: reconstruct(data)
    Root-->>App: Order
    
    App->>Root: addItem(product, quantity)
    Root->>Root: 不変条件チェック
    
    App->>Repo: save(order)
    Repo->>DB: BEGIN TRANSACTION
    Repo->>DB: UPDATE orders
    Repo->>DB: UPDATE order_items
    Repo->>DB: COMMIT
    
    Note over Repo,DB: 集約全体を1トランザクションで保存
\`\`\`

\`\`\`typescript
// リポジトリは集約ルートのみを扱う
export interface OrderRepository {
  // ✅ 集約ルート単位で取得
  findById(id: OrderId): Promise<Order | null>;
  
  // ✅ 集約ルート単位で保存（内部エンティティも含む）
  save(order: Order): Promise<void>;
  
  // ❌ 内部エンティティを個別に操作しない
  // saveOrderItem(item: OrderItem): Promise<void>; // NG!
}
\`\`\`

## カプセル化のベストプラクティス

### ✅ 良い例

\`\`\`typescript
export class Order {
  private _items: OrderItem[] = [];
  
  // 読み取り専用で公開
  get items(): readonly OrderItem[] {
    return [...this._items];
  }
  
  // 操作は集約ルート経由
  addItem(product: Product, quantity: Quantity): void {
    this.assertCanModify();
    // 不変条件を守りながら追加
    const item = OrderItem.create({
      productId: product.id,
      productName: product.name,
      quantity,
      unitPrice: product.price,
    });
    this._items.push(item);
  }
  
  private assertCanModify(): void {
    if (this._status !== OrderStatus.Draft) {
      throw new Error('Cannot modify confirmed order');
    }
  }
}
\`\`\`

### ❌ 悪い例

\`\`\`typescript
export class Order {
  // ❌ public で直接アクセス可能
  public items: OrderItem[] = [];
  
  // ❌ setter で直接変更可能
  set items(value: OrderItem[]) {
    this.items = value; // 不変条件チェックなし！
  }
}

// ❌ 外部から直接変更
order.items.push(newItem); // 不変条件を破壊する可能性！
order.items = []; // 注文を空にできてしまう！
\`\`\`

## まとめ

### 集約ルートの責務

| 責務 | 説明 | 実装方法 |
|------|------|----------|
| **外部アクセス制御** | 集約への唯一のエントリポイント | private 内部エンティティ |
| **不変条件の保護** | ビジネスルールを常に満たす | assertInvariants() |
| **ライフサイクル管理** | 状態遷移を制御 | 状態パターン |
| **トランザクション境界** | 永続化の単位を定義 | Repository連携 |

### 重要な原則

- ✅ **外部は集約ルートのみ参照**
- ✅ **内部エンティティはprivateで保護**
- ✅ **操作は集約ルート経由**
- ✅ **不変条件は常にチェック**
- ✅ **リポジトリは集約ルート単位**
`),
  order: 2,
});

// Lesson 8-3: 集約の設計ガイドライン
export const lesson8_3 = Lesson.create({
  id: LessonId.create('lesson-8-3'),
  title: LessonTitle.create('集約の設計ガイドライン'),
  content: MarkdownContent.create(`
# 集約の設計ガイドライン

集約を適切に設計するための原則とパターンを学びます。

## 原則1: 小さな集約を設計する

### ❌ アンチパターン: 大きな集約

\`\`\`mermaid
graph TB
    subgraph "巨大な Customer 集約"
        Customer[Customer]
        Profile[Profile]
        Address1[Address 1]
        Address2[Address 2]
        Order1[Order 1]
        Order2[Order 2]
        Item1[OrderItem 1]
        Item2[OrderItem 2]
        Item3[OrderItem 3]
        Payment1[Payment 1]
        Payment2[Payment 2]
    end
    
    Customer --> Profile
    Customer --> Address1
    Customer --> Address2
    Customer --> Order1
    Customer --> Order2
    Order1 --> Item1
    Order1 --> Item2
    Order2 --> Item3
    Order1 --> Payment1
    Order2 --> Payment2
    
    style Customer fill:#f66,stroke:#333,stroke-width:3px
    
    Note[問題:<br/>・トランザクションが重い<br/>・同時実行性が低い<br/>・複雑で保守困難]
\`\`\`

**問題点**:
- トランザクションが大きく、パフォーマンスが悪化
- 同時実行時にロック競合が発生しやすい
- 複雑で理解・保守が困難

### ✅ 推奨: 小さな集約

\`\`\`mermaid
graph TB
    subgraph "Customer 集約"
        C[Customer<br/>集約ルート]
        P[Profile]
    end
    
    subgraph "Order 集約"
        O[Order<br/>集約ルート]
        I1[OrderItem]
        I2[OrderItem]
    end
    
    subgraph "Payment 集約"
        Pay[Payment<br/>集約ルート]
    end
    
    C -.CustomerId.-> O
    O -.CustomerId.-> C
    Pay -.OrderId.-> O
    
    style C fill:#6c6,stroke:#333,stroke-width:3px
    style O fill:#6c6,stroke:#333,stroke-width:3px
    style Pay fill:#6c6,stroke:#333,stroke-width:3px
    
    Note[利点:<br/>・軽量なトランザクション<br/>・高い同時実行性<br/>・シンプルで保守しやすい]
\`\`\`

**利点**:
- トランザクションが軽量で高速
- 異なる集約を並行して変更可能
- シンプルで理解しやすい

## 原則2: 集約間はIDで参照

### ❌ 悪い例: オブジェクト参照

\`\`\`typescript
// ❌ 他の集約を直接参照
export class Order {
  constructor(
    private readonly _id: OrderId,
    private _customer: Customer, // NG: 別の集約を保持
    private _items: OrderItem[]
  ) {}
}

// 問題: 2つの集約が1トランザクションに含まれる
const customer = await customerRepo.findById(customerId);
const order = new Order(orderId, customer, []); // customer集約も含む
await orderRepo.save(order); // customer も一緒に保存？
\`\`\`

### ✅ 良い例: ID参照

\`\`\`typescript
// ✅ 他の集約はIDで参照
export class Order {
  constructor(
    private readonly _id: OrderId,
    private _customerId: CustomerId, // OK: IDのみ
    private _items: OrderItem[]
  ) {}

  get customerId(): CustomerId {
    return this._customerId;
  }
}

// 各集約を独立して操作
const order = await orderRepo.findById(orderId);
const customer = await customerRepo.findById(order.customerId);

// 別々のトランザクションで変更
await orderRepo.save(order);
await customerRepo.save(customer);
\`\`\`

### ID参照のメリット

\`\`\`mermaid
sequenceDiagram
    participant App
    participant OrderRepo
    participant CustomerRepo
    participant OrderDB
    participant CustomerDB
    
    par 並行実行可能
        App->>OrderRepo: save(order)
        OrderRepo->>OrderDB: UPDATE orders
    and
        App->>CustomerRepo: save(customer)
        CustomerRepo->>CustomerDB: UPDATE customers
    end
    
    Note over App,CustomerDB: 別々のトランザクション<br/>= 高い同時実行性
\`\`\`

## 原則3: トランザクション整合性 vs 結果整合性

### トランザクション整合性（集約内）

集約内は **即座に一貫した状態** を保ちます。

\`\`\`typescript
export class Order {
  addItem(product: Product, quantity: Quantity): void {
    const item = OrderItem.create({
      productId: product.id,
      quantity,
      unitPrice: product.price,
    });
    this._items.push(item);
    
    // ✅ メソッド完了時に即座に整合性が保たれる
    this.assertInvariants(); // totalAmount === sum(items)
  }
}
\`\`\`

### 結果整合性（集約間）

集約間は **最終的に整合性が取れれば良い** とします。

\`\`\`mermaid
sequenceDiagram
    participant App
    participant OrderRepo
    participant InventoryRepo
    participant EventBus
    participant InventoryHandler
    
    App->>OrderRepo: save(order)
    Note over OrderRepo: Order確定
    OrderRepo-->>App: 完了
    
    OrderRepo->>EventBus: OrderConfirmed イベント発行
    
    EventBus->>InventoryHandler: OrderConfirmed
    InventoryHandler->>InventoryRepo: findById(productId)
    InventoryRepo-->>InventoryHandler: inventory
    InventoryHandler->>InventoryHandler: reserve(quantity)
    InventoryHandler->>InventoryRepo: save(inventory)
    
    Note over InventoryRepo: 在庫引当（最終的に整合）
\`\`\`

\`\`\`typescript
// 注文確定時
export class OrderApplicationService {
  async confirmOrder(orderId: OrderId): Promise<void> {
    // 1. Order集約を変更（即座に整合）
    const order = await this.orderRepo.findById(orderId);
    order.confirm();
    await this.orderRepo.save(order);
    
    // 2. イベント発行（非同期処理）
    await this.eventBus.publish(
      new OrderConfirmedEvent({
        orderId: order.id,
        items: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      })
    );
    
    // Inventory集約の在庫引当は別トランザクションで実行
    // → 結果整合性
  }
}

// イベントハンドラー（別トランザクション）
export class InventoryEventHandler {
  async handleOrderConfirmed(event: OrderConfirmedEvent): Promise<void> {
    for (const item of event.items) {
      const inventory = await this.inventoryRepo.findByProductId(
        item.productId
      );
      inventory.reserve(item.quantity); // 在庫引当
      await this.inventoryRepo.save(inventory);
    }
  }
}
\`\`\`

## 原則4: 小さな集約 + イベント駆動

\`\`\`mermaid
graph LR
    subgraph "Order 集約"
        O[Order]
    end
    
    subgraph "Inventory 集約"
        I[Inventory]
    end
    
    subgraph "Shipping 集約"
        S[Shipment]
    end
    
    O -->|OrderConfirmed<br/>イベント| I
    O -->|OrderConfirmed<br/>イベント| S
    
    style O fill:#6c6,stroke:#333,stroke-width:3px
    style I fill:#6c6,stroke:#333,stroke-width:3px
    style S fill:#6c6,stroke:#333,stroke-width:3px
    
    Note[小さな集約を<br/>イベントで連携]
\`\`\`

### イベントによる集約間連携

\`\`\`typescript
// ドメインイベント
export class OrderConfirmedEvent {
  constructor(
    public readonly orderId: OrderId,
    public readonly customerId: CustomerId,
    public readonly items: Array<{
      productId: ProductId;
      quantity: Quantity;
    }>,
    public readonly occurredAt: Date = new Date()
  ) {}
}

// Order集約がイベントを発行
export class Order {
  private _domainEvents: DomainEvent[] = [];

  confirm(): void {
    if (this._items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    
    this._status = OrderStatus.Confirmed;
    
    // イベント記録
    this._domainEvents.push(
      new OrderConfirmedEvent({
        orderId: this._id,
        customerId: this._customerId,
        items: this._items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      })
    );
  }

  getDomainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
\`\`\`

## 集約設計の判断フローチャート

\`\`\`mermaid
graph TD
    Start([集約設計開始])
    
    Q1{トランザクション整合性が<br/>必須か？}
    Q2{同時に変更される<br/>頻度は高いか？}
    Q3{小さく分割できるか？}
    
    A1[同じ集約に含める]
    A2[別の集約に分ける<br/>イベントで連携]
    A3[別の集約に分ける<br/>ID参照で連携]
    
    Start --> Q1
    Q1 -->|YES| Q2
    Q1 -->|NO| A2
    
    Q2 -->|YES| A1
    Q2 -->|NO| Q3
    
    Q3 -->|YES| A2
    Q3 -->|NO| A1
    
    style A1 fill:#6c6
    style A2 fill:#69f
    style A3 fill:#69f
\`\`\`

## まとめ

### 集約設計の4原則

| 原則 | 説明 | メリット |
|------|------|----------|
| **小さな集約** | 必要最小限のオブジェクトのみ含める | 軽量・高速・保守しやすい |
| **ID参照** | 他の集約はIDで参照 | 独立性・同時実行性向上 |
| **トランザクション整合性** | 集約内は即座に整合 | データの一貫性保証 |
| **結果整合性** | 集約間は最終的に整合 | スケーラビリティ向上 |

### 判断基準

**同じ集約にする条件**:
- ✅ トランザクション整合性が必須
- ✅ 常に一緒に変更される
- ✅ 不変条件が両方にまたがる

**別の集約にする条件**:
- ✅ 独立して変更されることが多い
- ✅ 結果整合性で十分
- ✅ 異なるチーム/コンテキストで管理

### ベストプラクティス

- ✅ **小さく始める**: 最初は小さな集約から
- ✅ **イベント駆動**: 集約間はイベントで連携
- ✅ **パフォーマンス優先**: 大きな集約はパフォーマンス問題の原因
- ❌ **過度な正規化を避ける**: 必要なら集約内で重複を許容
`),
  order: 3,
});

export const chapter8Lessons = [lesson8_1, lesson8_2, lesson8_3];
// Lesson 9-1: リポジトリとは
export const lesson9_1 = Lesson.create({
  id: LessonId.create('lesson-9-1'),
  title: LessonTitle.create('リポジトリとは'),
  content: MarkdownContent.create(`## リポジトリとは

**リポジトリ（Repository）** は、ドメインオブジェクトの永続化と取得を抽象化するパターンです。

## リポジトリが解決する問題

### ❌ 問題: ドメイン層がインフラストラクチャに依存

\`\`\`mermaid
graph TD
    A[OrderService<br/>ドメイン層] -->|直接依存| B[SQL文]
    A -->|直接依存| C[データベース接続]
    A -->|直接依存| D[ORM]

    style A fill:#f96,stroke:#333
    style B fill:#f66,stroke:#333
    style C fill:#f66,stroke:#333
    style D fill:#f66,stroke:#333

    Note[問題:<br/>・ドメインロジックとデータアクセスが混在<br/>・テストが困難<br/>・データベース変更の影響が大きい]
\`\`\`

**問題点**:
- ドメインロジックにSQL文やデータベース接続コードが混在
- ユニットテストが困難（データベースが必須）
- データベース変更時の影響範囲が広い

### ✅ 解決: リポジトリでデータアクセスを抽象化

\`\`\`mermaid
graph TB
    subgraph "Domain Layer"
        A[OrderService]
        B[IOrderRepository<br/>インターフェース]
    end

    subgraph "Infrastructure Layer"
        C[OrderRepositoryImpl]
        D[SQL/ORM]
        E[Database]
    end

    A -->|依存| B
    B -.実装.-> C
    C --> D
    D --> E

    style A fill:#6c6,stroke:#333
    style B fill:#6c6,stroke:#333,stroke-width:3px
    style C fill:#9cf,stroke:#333

    Note[利点:<br/>・ドメイン層はインターフェースのみに依存<br/>・実装詳細から独立<br/>・テストが容易]
\`\`\`

**利点**:
- ドメイン層はリポジトリインターフェースのみに依存
- データアクセスの実装詳細から独立
- モックを使ったテストが容易

## リポジトリの責務

### 1. コレクションのようなインターフェース

リポジトリは、あたかも **メモリ上のコレクション** のように扱えるインターフェースを提供します。

\`\`\`typescript
// ✅ リポジトリ: コレクションのようなインターフェース
export interface OrderRepository {
  // 追加（永続化）
  save(order: Order): Promise<void>;

  // 削除
  remove(order: Order): Promise<void>;

  // IDで検索
  findById(id: OrderId): Promise<Order | null>;

  // 条件で検索
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;

  // すべて取得
  findAll(): Promise<Order[]>;
}

// ドメインサービスでの使用例
export class OrderService {
  constructor(private orderRepo: OrderRepository) {}

  async confirmOrder(orderId: OrderId): Promise<void> {
    // コレクションから取得するように見える
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // ドメインロジック実行
    order.confirm();

    // コレクションに保存するように見える
    await this.orderRepo.save(order);
  }
}
\`\`\`

### 2. 永続化メカニズムの隠蔽

リポジトリは、SQL、NoSQL、ファイル、メモリなど、**どのように永続化されるかを隠蔽**します。

\`\`\`mermaid
graph LR
    A[OrderRepository<br/>Interface] --> B[MySQL実装]
    A --> C[PostgreSQL実装]
    A --> D[MongoDB実装]
    A --> E[InMemory実装]

    B --> F[(MySQL)]
    C --> G[(PostgreSQL)]
    D --> H[(MongoDB)]
    E --> I[Memory]

    style A fill:#6c6,stroke:#333,stroke-width:3px
    style B fill:#9cf,stroke:#333
    style C fill:#9cf,stroke:#333
    style D fill:#9cf,stroke:#333
    style E fill:#fc9,stroke:#333
\`\`\`

\`\`\`typescript
// インフラストラクチャ層: MySQL実装
export class MySQLOrderRepository implements OrderRepository {
  async save(order: Order): Promise<void> {
    const sql = 'INSERT INTO orders ...';
    // MySQL固有の実装
  }

  async findById(id: OrderId): Promise<Order | null> {
    const sql = 'SELECT * FROM orders WHERE id = ?';
    // MySQL固有の実装
  }
}

// インフラストラクチャ層: InMemory実装（テスト用）
export class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<void> {
    this.orders.set(order.id.value, order);
  }

  async findById(id: OrderId): Promise<Order | null> {
    return this.orders.get(id.value) || null;
  }
}
\`\`\`

## リポジトリとDAOの違い

\`\`\`mermaid
graph TB
    subgraph "DAO (Data Access Object)"
        A1[OrderDAO]
        A2["insert(order)<br/>update(order)<br/>delete(id)<br/>select(id)"]
        A3[データベーステーブルに対応]
    end

    subgraph "Repository"
        B1[OrderRepository]
        B2["save(order)<br/>remove(order)<br/>findById(id)"]
        B3[ドメインモデル/集約に対応]
    end

    A1 --> A2
    A2 --> A3
    B1 --> B2
    B2 --> B3

    style A1 fill:#fc9,stroke:#333
    style B1 fill:#6c6,stroke:#333
\`\`\`

| 観点 | DAO | Repository |
|------|-----|-----------|
| **目的** | データベース操作の抽象化 | ドメインモデルの永続化抽象化 |
| **対応単位** | テーブル | 集約 |
| **メソッド名** | insert, update, delete, select | save, remove, find |
| **層** | 主にインフラストラクチャ | ドメイン（Interface）+ インフラ（実装） |
| **テーブル数** | 1テーブル = 1DAO | 1集約 = 1Repository（複数テーブル可） |

### DAO（アンチパターン）

\`\`\`typescript
// ❌ DAO: テーブル中心
export class OrderDAO {
  insert(orderData: OrderRow): void {
    // INSERT INTO orders ...
  }

  update(orderData: OrderRow): void {
    // UPDATE orders SET ...
  }

  selectById(id: number): OrderRow | null {
    // SELECT * FROM orders WHERE id = ?
  }
}

export class OrderItemDAO {
  insertItems(items: OrderItemRow[]): void {
    // INSERT INTO order_items ...
  }
}

// 問題: ドメインロジックでテーブル構造を意識
async function confirmOrder(orderId: number): Promise<void> {
  const orderRow = orderDAO.selectById(orderId);
  orderRow.status = 'confirmed';
  orderDAO.update(orderRow);

  // 複数のDAOを操作する必要がある
  orderItemDAO.updateStatus(orderId, 'confirmed');
}
\`\`\`

### Repository（推奨）

\`\`\`typescript
// ✅ Repository: 集約中心
export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
}

// ドメインロジックはモデルに集中
async function confirmOrder(orderId: OrderId): Promise<void> {
  const order = await orderRepo.findById(orderId);

  // ドメインモデルのメソッドを使用
  order.confirm();

  // リポジトリは集約全体を永続化（ordersとorder_itemsテーブル両方）
  await orderRepo.save(order);
}
\`\`\`

## リポジトリと集約の関係

\`\`\`mermaid
classDiagram
    class OrderRepository {
        <<Interface>>
        +save(order: Order)
        +remove(order: Order)
        +findById(id: OrderId)
    }

    class Order {
        <<Aggregate Root>>
        -id: OrderId
        -items: OrderItem[]
        +confirm()
        +addItem(item)
    }

    class OrderItem {
        <<Entity>>
        -id: OrderItemId
        -productId: ProductId
        -quantity: number
    }

    OrderRepository --> Order : 永続化・取得
    Order "1" *-- "many" OrderItem : 含む

    note for OrderRepository "集約ルート単位で永続化"
    note for Order "Order集約全体を<br/>1つのトランザクションで保存"
\`\`\`

**重要な原則**:
- ✅ **1集約 = 1リポジトリ**
- ✅ リポジトリは **集約ルート** のみを対象
- ❌ 内部エンティティ（OrderItem）専用のリポジトリは作らない

## まとめ

### リポジトリの特徴

| 特徴 | 説明 |
|------|------|
| **コレクション指向** | メモリ上のコレクションのように扱える |
| **永続化の抽象化** | SQL/NoSQL/メモリなど実装を隠蔽 |
| **集約単位** | 集約ルートごとに1つのリポジトリ |
| **ドメイン層に配置** | インターフェースはドメイン層 |
| **実装は分離** | 実装はインフラストラクチャ層 |

### 利点

- ✅ ドメイン層がインフラストラクチャから独立
- ✅ テストが容易（モック可能）
- ✅ データベース変更の影響を局所化
- ✅ ドメインロジックがシンプルに
- ✅ トランザクション境界が明確

**原則**: リポジトリは **永続化の詳細を隠蔽** し、ドメインモデルをコレクションのように扱えるようにする
`),
  order: 1,
});

// Lesson 9-2: リポジトリの実装パターン
export const lesson9_2 = Lesson.create({
  id: LessonId.create('lesson-9-2'),
  title: LessonTitle.create('リポジトリの実装パターン'),
  content: MarkdownContent.create(`## リポジトリの実装パターン

リポジトリの実装方法と、Domain層とInfrastructure層の適切な分離について学びます。

## 層の分離: Interface と Implementation

\`\`\`mermaid
graph TB
    subgraph "Domain Layer"
        A[OrderService]
        B[Order<br/>Aggregate]
        C[IOrderRepository<br/>Interface]
    end

    subgraph "Infrastructure Layer"
        D[OrderRepositoryImpl]
        E[Prisma/TypeORM]
        F[(Database)]
    end

    A --> C
    A --> B
    C -.実装.-> D
    D --> E
    E --> F

    style C fill:#6c6,stroke:#333,stroke-width:3px
    style D fill:#9cf,stroke:#333

    Note[Domain層: インターフェース定義<br/>Infrastructure層: 具体的な実装]
\`\`\`

### Domain層: インターフェース定義

\`\`\`typescript
// domain/repositories/IOrderRepository.ts
import { Order } from '../models/Order';
import { OrderId } from '../value-objects/OrderId';
import { CustomerId } from '../value-objects/CustomerId';

export interface IOrderRepository {
  // 永続化
  save(order: Order): Promise<void>;

  // 削除
  remove(order: Order): Promise<void>;

  // ID検索
  findById(id: OrderId): Promise<Order | null>;

  // 顧客ID検索
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;

  // 次のID生成（シーケンス等）
  nextId(): Promise<OrderId>;
}
\`\`\`

### Infrastructure層: 具体的な実装

\`\`\`typescript
// infrastructure/repositories/OrderRepositoryImpl.ts
import { IOrderRepository } from '@/domain/repositories/IOrderRepository';
import { Order } from '@/domain/models/Order';
import { PrismaClient } from '@prisma/client';

export class OrderRepositoryImpl implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async save(order: Order): Promise<void> {
    // Order集約全体を永続化
    await this.prisma.$transaction(async (tx) => {
      // 1. Orderテーブルに保存
      await tx.order.upsert({
        where: { id: order.id.value },
        create: {
          id: order.id.value,
          customerId: order.customerId.value,
          status: order.status,
          totalAmount: order.totalAmount.value,
        },
        update: {
          status: order.status,
          totalAmount: order.totalAmount.value,
        },
      });

      // 2. OrderItemsテーブルに保存（集約内のエンティティ）
      await tx.orderItem.deleteMany({
        where: { orderId: order.id.value },
      });

      for (const item of order.items) {
        await tx.orderItem.create({
          data: {
            id: item.id.value,
            orderId: order.id.value,
            productId: item.productId.value,
            quantity: item.quantity,
            unitPrice: item.unitPrice.value,
          },
        });
      }
    });
  }

  async findById(id: OrderId): Promise<Order | null> {
    const orderData = await this.prisma.order.findUnique({
      where: { id: id.value },
      include: { items: true }, // 集約全体を取得
    });

    if (!orderData) return null;

    // ドメインモデルに再構築
    return Order.reconstruct({
      id: new OrderId(orderData.id),
      customerId: new CustomerId(orderData.customerId),
      items: orderData.items.map(item =>
        OrderItem.reconstruct({
          id: new OrderItemId(item.id),
          productId: new ProductId(item.productId),
          quantity: item.quantity,
          unitPrice: new Money(item.unitPrice),
        })
      ),
      status: orderData.status,
      totalAmount: new Money(orderData.totalAmount),
    });
  }

  async nextId(): Promise<OrderId> {
    // UUID生成
    return OrderId.generate();
  }
}
\`\`\`

## コレクション指向 vs 永続化指向

### コレクション指向リポジトリ（推奨）

\`\`\`mermaid
graph LR
    A[Application] -->|1. 取得| B[Repository]
    B -->|2. Order返却| A
    A -->|3. ドメインロジック実行| C[Order.confirm]
    A -->|4. 保存| B

    style B fill:#6c6,stroke:#333
    style C fill:#fc9,stroke:#333

    Note[変更をトラッキングせず<br/>明示的にsave呼び出し]
\`\`\`

\`\`\`typescript
// ✅ コレクション指向: シンプルで明示的
export interface IOrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
}

// 使用例
async function confirmOrder(orderId: OrderId): Promise<void> {
  const order = await orderRepo.findById(orderId);

  order.confirm(); // ドメインロジック

  await orderRepo.save(order); // 明示的に保存
}
\`\`\`

### 永続化指向リポジトリ（ORMの影響）

\`\`\`typescript
// ❌ 永続化指向: 暗黙的で複雑
export interface IOrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  // saveメソッドなし - ORMが自動追跡
}

// 使用例（アンチパターン）
async function confirmOrder(orderId: OrderId): Promise<void> {
  const order = await orderRepo.findById(orderId);

  order.confirm(); // 変更が自動的にDBに反映される？

  // saveの呼び出し不要？ 不明確！
}
\`\`\`

**問題点**:
- 変更が保存されるタイミングが不明確
- トランザクション境界が曖昧
- テストが困難

## 集約単位のリポジトリ設計

\`\`\`mermaid
classDiagram
    class Order {
        <<Aggregate Root>>
        -id: OrderId
        -items: OrderItem[]
        +addItem(item)
        +confirm()
    }

    class OrderItem {
        <<Entity>>
        -id: OrderItemId
        -productId: ProductId
    }

    class OrderRepository {
        <<Interface>>
        +save(order: Order)
        +findById(id: OrderId)
    }

    class ProductRepository {
        <<Interface>>
        +save(product: Product)
        +findById(id: ProductId)
    }

    Order "1" *-- "many" OrderItem
    OrderRepository --> Order
    ProductRepository ..> Product

    note for OrderRepository "Order集約全体を操作<br/>OrderItem単独の操作なし"
    note for ProductRepository "別の集約には<br/>別のリポジトリ"
\`\`\`

### ✅ 良い例: 集約単位

\`\`\`typescript
// ✅ Order集約用のリポジトリ
export interface IOrderRepository {
  save(order: Order): Promise<void>; // Order集約全体を保存
  remove(order: Order): Promise<void>; // Order集約全体を削除
  findById(id: OrderId): Promise<Order | null>; // Order集約全体を取得
}

// ✅ Product集約用のリポジトリ
export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
}
\`\`\`

### ❌ 悪い例: エンティティごと

\`\`\`typescript
// ❌ OrderItem専用のリポジトリ（不要）
export interface IOrderItemRepository {
  save(item: OrderItem): Promise<void>;
  findById(id: OrderItemId): Promise<OrderItem | null>;
}

// 問題: Order集約の整合性を破壊する可能性
async function badExample(): Promise<void> {
  const item = await orderItemRepo.findById(itemId);
  item.changeQuantity(10); // Order集約を経由せずに変更！
  await orderItemRepo.save(item); // 不変条件をバイパス！
}
\`\`\`

## 依存性注入との組み合わせ

\`\`\`mermaid
sequenceDiagram
    participant Main as main.ts
    participant Container as DI Container
    participant Service as OrderService
    participant Repo as IOrderRepository
    participant Impl as OrderRepositoryImpl

    Main->>Container: setup()
    Container->>Container: bind(IOrderRepository, OrderRepositoryImpl)

    Main->>Container: get(OrderService)
    Container->>Impl: new OrderRepositoryImpl(prisma)
    Container->>Service: new OrderService(impl)
    Container-->>Main: service

    Main->>Service: confirmOrder(id)
    Service->>Repo: findById(id)
    Note over Repo,Impl: インターフェース越しに呼び出し
\`\`\`

\`\`\`typescript
// main.ts または DI設定ファイル
import { Container } from 'inversify';
import { IOrderRepository } from '@/domain/repositories/IOrderRepository';
import { OrderRepositoryImpl } from '@/infrastructure/repositories/OrderRepositoryImpl';

const container = new Container();

// インターフェースと実装をバインド
container
  .bind<IOrderRepository>('IOrderRepository')
  .to(OrderRepositoryImpl);

// OrderServiceは自動的にOrderRepositoryImplを受け取る
container.bind(OrderService).toSelf();

export { container };
\`\`\`

\`\`\`typescript
// application/services/OrderService.ts
import { injectable, inject } from 'inversify';
import { IOrderRepository } from '@/domain/repositories/IOrderRepository';

@injectable()
export class OrderService {
  constructor(
    @inject('IOrderRepository')
    private orderRepo: IOrderRepository // インターフェースに依存
  ) {}

  async confirmOrder(orderId: OrderId): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    order.confirm();
    await this.orderRepo.save(order);
  }
}
\`\`\`

## トランザクション管理

\`\`\`typescript
// infrastructure/repositories/OrderRepositoryImpl.ts
export class OrderRepositoryImpl implements IOrderRepository {
  async save(order: Order): Promise<void> {
    // ✅ トランザクションで集約全体を保存
    await this.prisma.$transaction(async (tx) => {
      // Orderテーブル
      await tx.order.upsert({...});

      // OrderItemsテーブル（集約内のエンティティ）
      await tx.orderItem.deleteMany({...});
      for (const item of order.items) {
        await tx.orderItem.create({...});
      }

      // その他の集約内データも同じトランザクション内で
    });
    // トランザクション境界 = 集約境界
  }
}
\`\`\`

## まとめ

### リポジトリ実装の原則

| 原則 | 説明 |
|------|------|
| **Interface/Implementation分離** | Domain層: Interface、Infrastructure層: 実装 |
| **コレクション指向** | 明示的なsave/findメソッド |
| **集約単位** | 1集約 = 1リポジトリ |
| **トランザクション境界** | 集約全体を1トランザクションで永続化 |
| **DI活用** | インターフェースに依存、実装は注入 |

### ベストプラクティス

- ✅ インターフェースをDomain層に配置
- ✅ 実装をInfrastructure層に配置
- ✅ 集約ルートのみをリポジトリで扱う
- ✅ トランザクションで集約全体を保存
- ✅ ドメインモデルへの再構築を実装
- ❌ ORMの自動追跡に依存しない
- ❌ 内部エンティティ専用リポジトリを作らない

**原則**: リポジトリは **集約全体を1単位** として扱い、**インターフェースと実装を分離** する
`),
  order: 2,
});

// Lesson 9-3: リポジトリ設計のベストプラクティス
export const lesson9_3 = Lesson.create({
  id: LessonId.create('lesson-9-3'),
  title: LessonTitle.create('リポジトリ設計のベストプラクティス'),
  content: MarkdownContent.create(`
## リポジトリ設計のベストプラクティス

効果的なリポジトリ設計のパターン、クエリメソッドの設計、そして避けるべきアンチパターンを学びます。

## クエリメソッド設計

### 意図を明確にする命名

\`\`\`typescript
// ✅ 良い例: 意図が明確
export interface IOrderRepository {
  // 単数取得
  findById(id: OrderId): Promise<Order | null>;

  // 複数取得（顧客の全注文）
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;

  // 条件検索（未発送の注文）
  findUnshippedOrders(): Promise<Order[]>;

  // 条件検索（期間指定）
  findByDateRange(start: Date, end: Date): Promise<Order[]>;

  // 存在確認
  exists(id: OrderId): Promise<boolean>;

  // カウント
  countByStatus(status: OrderStatus): Promise<number>;
}

// ❌ 悪い例: 曖昧な命名
export interface IOrderRepository {
  get(id: string): Promise<Order | null>; // get? find? fetch?
  getOrders(customerId: string): Promise<Order[]>; // どの条件？
  query(sql: string): Promise<Order[]>; // SQLを直接渡す？
}
\`\`\`

### 汎用クエリメソッドのアンチパターン

\`\`\`mermaid
graph TD
    A[❌ アンチパターン] -->|汎用的すぎる| B[findByCondition]
    A -->|SQL漏洩| C[findBySql]
    A -->|曖昧| D[search]

    E[✅ 推奨] -->|意図明確| F[findByCustomerId]
    E -->|ドメイン用語| G[findUnshippedOrders]
    E -->|具体的| H[findByDateRange]

    style A fill:#f66,stroke:#333
    style E fill:#6c6,stroke:#333
\`\`\`

\`\`\`typescript
// ❌ アンチパターン: 汎用的すぎるメソッド
export interface IOrderRepository {
  // 問題: どんな条件も受け入れる → ドメイン知識が失われる
  findByCondition(condition: object): Promise<Order[]>;

  // 問題: SQLが漏洩 → リポジトリの抽象化が破綻
  findBySql(sql: string): Promise<Order[]>;

  // 問題: 何を検索するのか不明確
  search(query: string): Promise<Order[]>;
}

// ✅ 推奨: 意図が明確なメソッド
export interface IOrderRepository {
  // ドメイン用語を使用
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;
  findUnshippedOrders(): Promise<Order[]>;
  findOverdueOrders(today: Date): Promise<Order[]>;
}
\`\`\`

## 仕様パターン（Specification Pattern）

複雑な検索条件を表現する場合、仕様パターンを使います。

\`\`\`mermaid
classDiagram
    class ISpecification~T~ {
        <<Interface>>
        +isSatisfiedBy(entity: T) boolean
        +and(spec: ISpecification~T~) ISpecification~T~
        +or(spec: ISpecification~T~) ISpecification~T~
        +not() ISpecification~T~
    }

    class OverdueOrderSpec {
        -today: Date
        +isSatisfiedBy(order: Order) boolean
    }

    class HighValueOrderSpec {
        -threshold: Money
        +isSatisfiedBy(order: Order) boolean
    }

    class OrderRepository {
        +findBySpecification(spec: ISpecification~Order~) Order[]
    }

    ISpecification <|.. OverdueOrderSpec
    ISpecification <|.. HighValueOrderSpec
    OrderRepository --> ISpecification

    note for ISpecification "検索条件をオブジェクトで表現"
    note for OrderRepository "仕様オブジェクトで検索"
\`\`\`

### 仕様パターンの実装

\`\`\`typescript
// domain/specifications/ISpecification.ts
export interface ISpecification<T> {
  isSatisfiedBy(entity: T): boolean;
  and(spec: ISpecification<T>): ISpecification<T>;
  or(spec: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}

// domain/specifications/OverdueOrderSpecification.ts
export class OverdueOrderSpecification implements ISpecification<Order> {
  constructor(private today: Date) {}

  isSatisfiedBy(order: Order): boolean {
    return order.dueDate < this.today && !order.isShipped();
  }

  and(spec: ISpecification<Order>): ISpecification<Order> {
    return new AndSpecification(this, spec);
  }

  // or, not も同様に実装
}

// domain/specifications/HighValueOrderSpecification.ts
export class HighValueOrderSpecification implements ISpecification<Order> {
  constructor(private threshold: Money) {}

  isSatisfiedBy(order: Order): boolean {
    return order.totalAmount.isGreaterThan(this.threshold);
  }
}

// domain/repositories/IOrderRepository.ts
export interface IOrderRepository {
  // 仕様パターンを使った検索
  findBySpecification(spec: ISpecification<Order>): Promise<Order[]>;
}

// 使用例
async function findProblematicOrders(): Promise<Order[]> {
  const overdueSpec = new OverdueOrderSpecification(new Date());
  const highValueSpec = new HighValueOrderSpecification(new Money(100000));

  // 仕様を組み合わせる
  const combinedSpec = overdueSpec.and(highValueSpec);

  // 期限切れかつ高額な注文を検索
  return await orderRepo.findBySpecification(combinedSpec);
}
\`\`\`

### 仕様パターンの実装（Infrastructure層）

\`\`\`typescript
// infrastructure/repositories/OrderRepositoryImpl.ts
export class OrderRepositoryImpl implements IOrderRepository {
  async findBySpecification(
    spec: ISpecification<Order>
  ): Promise<Order[]> {
    // 1. すべての注文を取得（または効率的なクエリ）
    const allOrders = await this.findAll();

    // 2. メモリ上で仕様を適用
    return allOrders.filter(order => spec.isSatisfiedBy(order));
  }

  // より効率的な実装: SQLに変換
  async findBySpecification(
    spec: ISpecification<Order>
  ): Promise<Order[]> {
    // 仕様オブジェクトをSQLに変換（高度な実装）
    const sqlBuilder = new SpecificationToSqlConverter();
    const sql = sqlBuilder.convert(spec);
    return await this.query(sql);
  }
}
\`\`\`

## アンチパターンの回避

### アンチパターン1: リポジトリでビジネスロジック

\`\`\`typescript
// ❌ 悪い例: リポジトリにビジネスロジック
export class OrderRepositoryImpl implements IOrderRepository {
  async confirmOrder(orderId: OrderId): Promise<void> {
    const order = await this.findById(orderId);

    // ❌ ビジネスロジックがリポジトリに！
    if (order.items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    order.status = 'confirmed';

    await this.save(order);
  }
}

// ✅ 良い例: ビジネスロジックはドメインモデルまたはサービスに
export class Order {
  confirm(): void {
    // ✅ ビジネスルールはドメインモデルに
    if (this._items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    this._status = OrderStatus.Confirmed;
  }
}

export class OrderRepositoryImpl implements IOrderRepository {
  // リポジトリは永続化のみ
  async save(order: Order): Promise<void> {
    // 永続化処理のみ
  }
}
\`\`\`

### アンチパターン2: リーキー抽象化

\`\`\`mermaid
graph TD
    A[❌ リーキー抽象化<br/>実装の詳細が漏洩] -->|SQL公開| B[findBySql]
    A -->|テーブル構造| C[findByJoin]
    A -->|ORM依存| D[findWithEagerLoading]

    E[✅ 適切な抽象化<br/>実装を隠蔽] -->|ドメイン用語| F[findByCustomerId]
    E -->|ビジネス条件| G[findUnshippedOrders]

    style A fill:#f66,stroke:#333
    style E fill:#6c6,stroke:#333
\`\`\`

\`\`\`typescript
// ❌ 悪い例: 実装の詳細が漏洩
export interface IOrderRepository {
  // SQL文を直接渡す
  findBySql(sql: string): Promise<Order[]>;

  // ORMの機能が漏洩
  findWithEagerLoading(id: OrderId, relations: string[]): Promise<Order | null>;

  // テーブル構造が漏洩
  findByJoin(table: string, condition: string): Promise<Order[]>;
}

// ✅ 良い例: 実装を完全に隠蔽
export interface IOrderRepository {
  // ドメイン用語のみ
  findById(id: OrderId): Promise<Order | null>;
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;
  findUnshippedOrders(): Promise<Order[]>;
}
\`\`\`

### アンチパターン3: N+1問題の無視

\`\`\`typescript
// ❌ 悪い例: N+1問題
export class OrderRepositoryImpl implements IOrderRepository {
  async findById(id: OrderId): Promise<Order | null> {
    // 1. Orderのみ取得
    const orderData = await this.prisma.order.findUnique({
      where: { id: id.value },
      // include していない！
    });

    // 2. OrderItemsを別々に取得（N+1問題）
    const items = [];
    for (const itemId of orderData.itemIds) {
      const item = await this.prisma.orderItem.findUnique({
        where: { id: itemId },
      }); // N回のクエリ！
      items.push(item);
    }

    return Order.reconstruct({ ...orderData, items });
  }
}

// ✅ 良い例: 集約全体を1クエリで取得
export class OrderRepositoryImpl implements IOrderRepository {
  async findById(id: OrderId): Promise<Order | null> {
    const orderData = await this.prisma.order.findUnique({
      where: { id: id.value },
      include: { items: true }, // ✅ 1クエリで集約全体を取得
    });

    return Order.reconstruct({
      id: new OrderId(orderData.id),
      items: orderData.items.map(/* 変換 */),
      // ...
    });
  }
}
\`\`\`

## ページネーションとソート

\`\`\`typescript
// domain/repositories/IOrderRepository.ts
export interface PageRequest {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Page<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IOrderRepository {
  // ページネーション対応
  findByCustomerId(
    customerId: CustomerId,
    pageRequest: PageRequest
  ): Promise<Page<Order>>;
}

// 使用例
const orders = await orderRepo.findByCustomerId(
  customerId,
  {
    page: 1,
    pageSize: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }
);

console.log(\`Total: \${orders.totalCount}, Page: \${orders.page}/\${orders.totalPages}\`);
\`\`\`

## テスト容易性

\`\`\`mermaid
graph TB
    subgraph "Production"
        A1[OrderService]
        B1[IOrderRepository]
        C1[OrderRepositoryImpl]
        D1[(Database)]
    end

    subgraph "Test"
        A2[OrderService]
        B2[IOrderRepository]
        C2[InMemoryOrderRepository]
        D2[Memory]
    end

    A1 --> B1
    B1 -.実装.-> C1
    C1 --> D1

    A2 --> B2
    B2 -.実装.-> C2
    C2 --> D2

    style B1 fill:#6c6,stroke:#333,stroke-width:3px
    style B2 fill:#6c6,stroke:#333,stroke-width:3px
    style C2 fill:#fc9,stroke:#333
\`\`\`

\`\`\`typescript
// test/repositories/InMemoryOrderRepository.ts
export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<void> {
    this.orders.set(order.id.value, order);
  }

  async findById(id: OrderId): Promise<Order | null> {
    return this.orders.get(id.value) || null;
  }

  async findByCustomerId(customerId: CustomerId): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      order => order.customerId.equals(customerId)
    );
  }

  // テスト用のヘルパーメソッド
  clear(): void {
    this.orders.clear();
  }
}

// test/services/OrderService.test.ts
describe('OrderService', () => {
  let orderRepo: InMemoryOrderRepository;
  let orderService: OrderService;

  beforeEach(() => {
    orderRepo = new InMemoryOrderRepository();
    orderService = new OrderService(orderRepo);
  });

  it('should confirm order', async () => {
    const order = Order.create(customerId);
    await orderRepo.save(order);

    await orderService.confirmOrder(order.id);

    const updated = await orderRepo.findById(order.id);
    expect(updated.status).toBe(OrderStatus.Confirmed);
  });
});
\`\`\`

## まとめ

### リポジトリ設計のベストプラクティス

| プラクティス | 説明 |
|--------------|------|
| **意図明確な命名** | findByCustomerId, findUnshippedOrders |
| **仕様パターン** | 複雑な検索条件をオブジェクトで表現 |
| **抽象化の徹底** | SQL/ORMの詳細を隠蔽 |
| **N+1問題の回避** | 集約全体を1クエリで取得 |
| **テスト容易性** | InMemory実装でテスト |

### 避けるべきアンチパターン

- ❌ リポジトリにビジネスロジック
- ❌ SQL文の直接公開（findBySql）
- ❌ ORM機能の漏洩
- ❌ 汎用的すぎるメソッド（findByCondition）
- ❌ N+1問題

### 重要な原則

- ✅ ドメイン用語で命名
- ✅ 実装の詳細を完全に隠蔽
- ✅ 集約単位で取得・保存
- ✅ テスト可能な設計
- ✅ パフォーマンスを考慮

**原則**: リポジトリは **ドメイン知識を表現** し、**実装の詳細を隠蔽** し、**テスト容易性を確保** する
`),
  order: 3,
});

export const chapter9Lessons = [lesson9_1, lesson9_2, lesson9_3];
