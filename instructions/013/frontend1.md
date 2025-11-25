# Frontend1: Chapter 7 ドメインサービス作成

## Task Overview
Chapter 7「ドメインサービス」を 2 レッスン構成で新規作成する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. sampleLessons.ts の更新

chapter7Lessons を作成:

```typescript
// src/infrastructure/data/sampleLessons.ts

export const chapter7Lessons = [
  Lesson.create({
    id: LessonId.create('lesson-7-1'),
    chapterId: ChapterId.create('chapter-7'),
    title: LessonTitle.create('ドメインサービスとは'),
    order: 1,
    content: MarkdownContent.create(lesson7_1_content),
    quizId: QuizId.create('quiz-lesson-7-1'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-7-2'),
    chapterId: ChapterId.create('chapter-7'),
    title: LessonTitle.create('ドメインサービスの実装'),
    order: 2,
    content: MarkdownContent.create(lesson7_2_content),
    quizId: QuizId.create('quiz-lesson-7-2'),
  }),
];
```

### 2. sampleQuizzes.ts の更新

各レッスンに5問ずつ、計10問のクイズを追加。

### 3. sampleCourses.ts の更新

Chapter 7 を追加:

```typescript
import { chapter7Lessons } from './sampleLessons';

const chapter7 = Chapter.create({
  id: ChapterId.create('chapter-7'),
  title: 'Chapter 7: ドメインサービス',
  order: 7,
  lessons: chapter7Lessons,
});

// ddsCourse の chapters に chapter7 を追加
chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8],
```

## レッスンコンテンツ詳細

### Lesson 7-1: ドメインサービスとは

```markdown
# ドメインサービスとは

## 概要
このレッスンでは、DDDにおける「ドメインサービス」について学びます。
エンティティや値オブジェクトに属さないビジネスロジックをどう扱うかを理解しましょう。

## ドメインサービスの定義

> **ドメインサービス（Domain Service）** は、エンティティや値オブジェクトに
> 自然に属さないドメインロジックをカプセル化するオブジェクトです。

### なぜドメインサービスが必要か

すべてのビジネスロジックがエンティティや値オブジェクトに属するわけではありません:

\`\`\`
❌ 無理やりエンティティに詰め込む:
┌─────────────────────────────┐
│   User（ユーザー）           │
│                             │
│ - transferMoney()           │ ← 送金ロジックがUserに？
│ - calculateShippingCost()   │ ← 配送料計算がUserに？
│ - validatePassword()        │ ← これは妥当
└─────────────────────────────┘

✅ ドメインサービスに切り出す:
┌─────────────────────┐
│ MoneyTransferService│
│ - transfer()        │
└─────────────────────┘
\`\`\`

## ドメインサービスの特徴

### 1. ステートレス

ドメインサービスは状態を持ちません:

\`\`\`typescript
// ✅ 良い例: ステートレスなドメインサービス
class MoneyTransferService {
  transfer(from: BankAccount, to: BankAccount, amount: Money): void {
    // 状態を持たず、渡されたエンティティに対して操作
    from.withdraw(amount);
    to.deposit(amount);
  }
}

// ❌ 悪い例: 状態を持つ
class BadTransferService {
  private lastTransferAmount: Money;  // 状態を持っている

  transfer(from: BankAccount, to: BankAccount, amount: Money): void {
    this.lastTransferAmount = amount;  // 状態を保存
    from.withdraw(amount);
    to.deposit(amount);
  }
}
\`\`\`

### 2. 複数のエンティティを協調させる

\`\`\`typescript
class OrderFulfillmentService {
  fulfill(order: Order, inventory: Inventory, shipping: ShippingService): void {
    // 注文、在庫、配送という複数の概念を協調させる

    // 在庫を引き当て
    for (const item of order.getItems()) {
      inventory.reserve(item.getProductId(), item.getQuantity());
    }

    // 注文を発送準備状態に
    order.markAsReadyToShip();

    // 配送手配
    shipping.scheduleDelivery(order);
  }
}
\`\`\`

### 3. ドメイン知識を表現

\`\`\`typescript
// ビジネスルール: 同一通貨間でのみ送金可能
class MoneyTransferService {
  transfer(from: BankAccount, to: BankAccount, amount: Money): void {
    // ドメイン知識: 通貨が異なる場合は送金不可
    if (!from.getCurrency().equals(to.getCurrency())) {
      throw new CurrencyMismatchError(
        '異なる通貨間での送金はできません'
      );
    }

    // ドメイン知識: 送金上限チェック
    if (amount.isGreaterThan(Money.create(1000000, from.getCurrency()))) {
      throw new TransferLimitExceededError(
        '一度に送金できる金額は100万円までです'
      );
    }

    from.withdraw(amount);
    to.deposit(amount);
  }
}
\`\`\`

## エンティティ vs ドメインサービス

### エンティティに配置すべきロジック

\`\`\`typescript
class BankAccount {
  // ✅ 単一のエンティティに関するロジック
  withdraw(amount: Money): void {
    if (this.balance.isLessThan(amount)) {
      throw new InsufficientBalanceError();
    }
    this.balance = this.balance.subtract(amount);
  }

  // ✅ 自分自身の状態を変更するロジック
  close(): void {
    if (!this.balance.isZero()) {
      throw new AccountNotEmptyError();
    }
    this.status = AccountStatus.Closed;
  }
}
\`\`\`

### ドメインサービスに配置すべきロジック

\`\`\`typescript
// ✅ 複数のエンティティにまたがるロジック
class MoneyTransferService {
  transfer(from: BankAccount, to: BankAccount, amount: Money): void {
    from.withdraw(amount);
    to.deposit(amount);
  }
}

// ✅ エンティティの責務として不自然なロジック
class ExchangeRateService {
  convert(amount: Money, targetCurrency: Currency): Money {
    const rate = this.rateRepository.getRate(
      amount.getCurrency(),
      targetCurrency
    );
    return amount.multiply(rate);
  }
}
\`\`\`

## ドメインサービスを使う場面

| 場面 | 例 |
|------|-----|
| 複数エンティティの協調 | 送金、注文処理 |
| 計算ロジック | 配送料計算、税金計算 |
| ポリシーの適用 | 割引ルール、価格決定 |
| 外部システムとの統合 | 為替レート取得 |

### 例: 配送料計算

\`\`\`typescript
class ShippingCostCalculationService {
  calculate(
    order: Order,
    destination: Address,
    shippingMethod: ShippingMethod
  ): Money {
    // 重量による基本料金
    const baseRate = this.calculateByWeight(order.getTotalWeight());

    // 距離による追加料金
    const distanceFee = this.calculateByDistance(
      order.getOrigin(),
      destination
    );

    // 配送方法による係数
    const methodMultiplier = shippingMethod.getCostMultiplier();

    return baseRate.add(distanceFee).multiply(methodMultiplier);
  }
}
\`\`\`

## まとめ

- **ドメインサービス**はエンティティや値オブジェクトに属さないドメインロジックを扱う
- **ステートレス**で、状態を持たない
- **複数のエンティティを協調**させる
- **ドメイン知識を表現**する
- エンティティに無理やり詰め込まず、適切に分離する
```

### Lesson 7-2: ドメインサービスの実装

```markdown
# ドメインサービスの実装

## 概要
このレッスンでは、ドメインサービスの具体的な実装パターンを学びます。
アプリケーションサービスとの違い、依存関係の管理を理解しましょう。

## 基本的な実装パターン

### クラスベースの実装

\`\`\`typescript
export class MoneyTransferService {
  // リポジトリへの依存
  constructor(
    private readonly accountRepository: IBankAccountRepository,
    private readonly transferHistoryRepository: ITransferHistoryRepository
  ) {}

  transfer(
    fromAccountId: AccountId,
    toAccountId: AccountId,
    amount: Money
  ): TransferResult {
    // エンティティを取得
    const fromAccount = this.accountRepository.findById(fromAccountId);
    const toAccount = this.accountRepository.findById(toAccountId);

    if (!fromAccount || !toAccount) {
      throw new AccountNotFoundError();
    }

    // ビジネスルールの検証
    this.validateTransfer(fromAccount, toAccount, amount);

    // 送金実行
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);

    // 履歴記録
    const history = TransferHistory.create(
      fromAccountId,
      toAccountId,
      amount,
      new Date()
    );
    this.transferHistoryRepository.save(history);

    return TransferResult.success(history.getId());
  }

  private validateTransfer(
    from: BankAccount,
    to: BankAccount,
    amount: Money
  ): void {
    if (!from.getCurrency().equals(to.getCurrency())) {
      throw new CurrencyMismatchError();
    }
    if (amount.isGreaterThan(from.getBalance())) {
      throw new InsufficientBalanceError();
    }
  }
}
\`\`\`

## 依存関係の管理

### リポジトリへの依存

\`\`\`typescript
class OrderFulfillmentService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly inventoryRepository: IInventoryRepository,
    private readonly shippingService: IShippingService
  ) {}

  fulfill(orderId: OrderId): void {
    // リポジトリからエンティティを取得
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    // 在庫確認
    for (const item of order.getItems()) {
      const inventory = this.inventoryRepository.findByProductId(
        item.getProductId()
      );

      if (!inventory.hasStock(item.getQuantity())) {
        throw new InsufficientStockError(item.getProductId());
      }
    }

    // 処理実行
    order.fulfill();
    this.orderRepository.save(order);
  }
}
\`\`\`

### 他のドメインサービスへの依存

\`\`\`typescript
class PurchaseService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly inventoryService: InventoryService,
    private readonly notificationService: NotificationService
  ) {}

  purchase(order: Order, paymentMethod: PaymentMethod): PurchaseResult {
    // 支払い処理（他のドメインサービス）
    const paymentResult = this.paymentService.processPayment(
      order.getTotalAmount(),
      paymentMethod
    );

    if (!paymentResult.isSuccess()) {
      return PurchaseResult.failure('支払いに失敗しました');
    }

    // 在庫引き当て（他のドメインサービス）
    this.inventoryService.reserveItems(order.getItems());

    // 通知（他のドメインサービス）
    this.notificationService.sendOrderConfirmation(order);

    return PurchaseResult.success(order.getId());
  }
}
\`\`\`

## ドメインサービス vs アプリケーションサービス

### ドメインサービス

**責務**: ドメインロジック

\`\`\`typescript
// ドメイン層
class PricingService {
  // 純粋なビジネスロジック
  calculatePrice(product: Product, customer: Customer): Money {
    let price = product.getBasePrice();

    // 顧客ランクによる割引（ドメインロジック）
    if (customer.isPremium()) {
      price = price.multiply(0.9);
    }

    // キャンペーン適用（ドメインロジック）
    if (product.isOnSale()) {
      price = price.multiply(0.8);
    }

    return price;
  }
}
\`\`\`

### アプリケーションサービス

**責務**: ユースケースの調整

\`\`\`typescript
// アプリケーション層
class PlaceOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly pricingService: PricingService,  // ドメインサービス
    private readonly inventoryService: InventoryService,
    private readonly emailService: IEmailService
  ) {}

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    // 1. トランザクション開始（インフラ層の責務）
    // 2. エンティティ取得
    const customer = this.customerRepository.findById(input.customerId);

    // 3. ドメインサービスを使用
    const price = this.pricingService.calculatePrice(
      input.product,
      customer
    );

    // 4. エンティティ作成
    const order = Order.create(customer, input.items, price);

    // 5. 永続化
    this.orderRepository.save(order);

    // 6. 外部サービス呼び出し（インフラ層）
    this.emailService.sendOrderConfirmation(order);

    // 7. トランザクション確定

    return { orderId: order.getId() };
  }
}
\`\`\`

### 違いの整理

| 項目 | ドメインサービス | アプリケーションサービス |
|------|----------------|----------------------|
| 層 | ドメイン層 | アプリケーション層 |
| 責務 | ドメインロジック | ユースケースの調整 |
| 依存先 | エンティティ、値オブジェクト、リポジトリ | ドメインサービス、インフラサービス |
| トランザクション | 関与しない | 管理する |
| 再利用性 | 高い | ユースケース固有 |

## 実装のベストプラクティス

### 1. インターフェースで抽象化

\`\`\`typescript
// ドメイン層でインターフェース定義
export interface IExchangeRateService {
  getRate(from: Currency, to: Currency): ExchangeRate;
}

// ドメインサービスで使用
class MoneyExchangeService {
  constructor(
    private readonly rateService: IExchangeRateService
  ) {}

  exchange(amount: Money, targetCurrency: Currency): Money {
    const rate = this.rateService.getRate(
      amount.getCurrency(),
      targetCurrency
    );
    return amount.multiply(rate.getValue());
  }
}

// インフラ層で実装
class ExternalExchangeRateService implements IExchangeRateService {
  getRate(from: Currency, to: Currency): ExchangeRate {
    // 外部APIを呼び出し
  }
}
\`\`\`

### 2. 小さく、焦点を絞る

\`\`\`typescript
// ❌ 悪い例: 責務が多すぎる
class OrderService {
  createOrder() { }
  updateOrder() { }
  cancelOrder() { }
  calculateShipping() { }
  applyDiscount() { }
  processPayment() { }
}

// ✅ 良い例: 単一責任
class OrderDiscountService {
  applyDiscount(order: Order, customer: Customer): Money {
    // 割引計算に特化
  }
}

class ShippingCostService {
  calculate(order: Order, destination: Address): Money {
    // 配送料計算に特化
  }
}
\`\`\`

### 3. テスタビリティを保つ

\`\`\`typescript
class PricingService {
  constructor(
    private readonly taxCalculator: ITaxCalculator,
    private readonly discountPolicy: IDiscountPolicy
  ) {}

  calculateFinalPrice(basePrice: Money, customer: Customer): Money {
    const discountedPrice = this.discountPolicy.apply(basePrice, customer);
    const tax = this.taxCalculator.calculate(discountedPrice);
    return discountedPrice.add(tax);
  }
}

// テストでモック可能
describe('PricingService', () => {
  it('should calculate final price with discount and tax', () => {
    const mockTaxCalculator = createMockTaxCalculator();
    const mockDiscountPolicy = createMockDiscountPolicy();

    const service = new PricingService(
      mockTaxCalculator,
      mockDiscountPolicy
    );

    // テスト実行
  });
});
\`\`\`

## まとめ

- ドメインサービスは**ドメインロジックをカプセル化**
- **ステートレス**で、依存性注入で依存を管理
- **アプリケーションサービス**とは責務が異なる
- **インターフェースで抽象化**してテスタビリティを保つ
- **単一責任**を守り、小さく焦点を絞る
```

## Definition of Done

- [ ] Lesson 7-1, 7-2 のコンテンツが作成されている
- [ ] 各レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter7Lessons が追加されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts に Chapter 7 が追加されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 7 ドメインサービス作成完了。2レッスン + 10問のクイズを作成しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- Ticket 011, 012 の成果物
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
- src/infrastructure/data/sampleCourses.ts
