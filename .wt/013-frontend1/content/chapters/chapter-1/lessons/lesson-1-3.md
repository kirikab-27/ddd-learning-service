# ドメインモデルの役割

## 概要

このレッスンでは、DDDの中核となる「ドメインモデル」について学びます。
モデルとは何か、なぜ重要なのか、そしてどのように表現するのかを理解しましょう。

## モデルとは何か

### モデルの定義

**モデル**とは、現実世界の複雑さを目的に応じて簡略化した表現です。

モデルの例：
- **地図**: 現実の地形を2次元に簡略化
- **組織図**: 会社の構造を階層的に表現
- **ER図**: データベースの構造を表現

重要なのは、モデルは**現実の完全なコピーではない**ということです。

> 「すべてのモデルは間違っている。しかし、いくつかは有用である。」
> — George E. P. Box

### ドメインモデルの特徴

**ドメインモデル**は、ビジネスドメインを表現するモデルです。

```
現実のビジネス（複雑）
    ↓ 抽象化・簡略化
ドメインモデル（理解可能な複雑さ）
    ↓ 実装
コード（実行可能）
```

ドメインモデルには以下が含まれます：
- ビジネス上重要な**概念**
- 概念間の**関係**
- ビジネス**ルール**
- **振る舞い**

## ドメインモデルの目的

### 1. 複雑さの整理

ビジネスの複雑さを、理解可能なレベルに整理します。

```typescript
// モデルなし：複雑さがコード全体に散らばる
function processPayment(userId, orderId, amount, paymentMethod) {
  // 100行以上の手続き的なコード...
}

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
```

### 2. コミュニケーションの基盤

ドメインモデルは、チーム全員が参照できる**共通の理解**を提供します。

- ビジネス側：「この『支払い』って何？」
- 開発側：「このPaymentクラスのことです」
- 両者が同じものを指して会話できる

### 3. 設計の指針

モデルがあることで、以下の判断がしやすくなります：

- このロジックはどこに書くべきか？
- この概念は独立した存在か、別の概念の一部か？
- どこまでを1つのトランザクションで扱うか？

## モデルの表現方法

ドメインモデルは、複数の方法で表現できます。

### 1. UML図

**クラス図**でドメインモデルを視覚化します。

```
┌─────────────┐       ┌─────────────┐
│   Order     │       │  Customer   │
├─────────────┤       ├─────────────┤
│ - id        │ *   1 │ - id        │
│ - items     │───────│ - name      │
│ - status    │       │ - email     │
├─────────────┤       ├─────────────┤
│ + confirm() │       │ + validate()│
└─────────────┘       └─────────────┘
        │
        │ 1
        │
        ▼ *
┌─────────────┐
│  OrderItem  │
├─────────────┤
│ - product   │
│ - quantity  │
│ - price     │
└─────────────┘
```

**メリット：**
- 全体像を俯瞰できる
- 非エンジニアにも伝わりやすい

**注意点：**
- 詳細すぎると見づらくなる
- メンテナンスが必要

### 2. コード

コード自体がドメインモデルの最も正確な表現です。

```typescript
// ドメインモデルをコードで表現
class Order {
  private readonly id: OrderId;
  private readonly customerId: CustomerId;
  private items: OrderItem[];
  private status: OrderStatus;

  // ビジネスルールを表現するメソッド
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

  get totalAmount(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal),
      Money.zero()
    );
  }
}
```

**メリット：**
- 最も正確で実行可能
- バージョン管理される

**注意点：**
- 技術的な詳細が混ざりやすい
- 非エンジニアには読みにくい

### 3. 用語集（ユビキタス言語）

ドメインの言葉を定義した辞書です。

```markdown
## 用語集

### 注文（Order）
顧客が商品の購入を意思表示したもの。
作成後は「下書き」状態で、「確定」されるまで変更可能。

### 注文明細（OrderItem）
注文に含まれる個々の商品と数量。
商品、数量、その時点の価格を保持する。

### 確定（Confirm）
注文を正式に受け付けること。
確定後は明細の変更ができなくなる。
確定と同時に在庫の引当が行われる。
```

**メリット：**
- 誰でも読める
- 認識のズレを防ぐ

**注意点：**
- コードと乖離しないようメンテナンスが必要

## モデルの進化

ドメインモデルは、**継続的に改善**されるべきものです。

### リファクタリングの重要性

ビジネスの理解が深まるにつれ、モデルも進化します。

```typescript
// 最初のモデル
class Order {
  discount: number; // 単純な割引率
}

// 理解が深まった後のモデル
class Order {
  appliedPromotions: Promotion[]; // 複数のプロモーションが適用可能と判明

  calculateDiscount(): Money {
    return this.appliedPromotions.reduce(
      (total, promo) => total.add(promo.calculate(this)),
      Money.zero()
    );
  }
}
```

### モデルを守るための原則

1. **ドメインロジックはドメイン層に**: UI やインフラの都合をドメインに持ち込まない
2. **ユビキタス言語をコードに反映**: 用語集とコードを一致させる
3. **小さく頻繁にリファクタリング**: 大きな書き換えを避ける

## まとめ

- **モデル**は現実を目的に応じて簡略化した表現
- **ドメインモデル**はビジネスドメインの概念、関係、ルールを表現する
- ドメインモデルは**複雑さの整理**、**コミュニケーションの基盤**、**設計の指針**として機能する
- 表現方法には**UML図**、**コード**、**用語集**があり、それぞれ補完し合う
- モデルは**継続的に改善**されるべきもの
