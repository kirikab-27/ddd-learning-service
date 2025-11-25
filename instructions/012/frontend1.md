# Frontend1: Chapter 6 コンテンツ拡充

## Task Overview
Chapter 6「エンティティ」を 3 レッスン構成に拡充する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. 既存コンテンツの確認

現在の `sampleCourses.ts` には lesson-6-1 のみが存在。
内容を確認し、lesson-6-1 として適切か確認する。

### 2. sampleLessons.ts の更新

chapter6Lessons を作成し、3レッスン構成にする:

```typescript
// src/infrastructure/data/sampleLessons.ts

export const chapter6Lessons = [
  Lesson.create({
    id: LessonId.create('lesson-6-1'),
    chapterId: ChapterId.create('chapter-6'),
    title: LessonTitle.create('エンティティとは'),
    order: 1,
    content: MarkdownContent.create(lesson6_1_content),
    quizId: QuizId.create('quiz-lesson-6-1'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-6-2'),
    chapterId: ChapterId.create('chapter-6'),
    title: LessonTitle.create('識別子の設計'),
    order: 2,
    content: MarkdownContent.create(lesson6_2_content),
    quizId: QuizId.create('quiz-lesson-6-2'),
  }),
  Lesson.create({
    id: LessonId.create('lesson-6-3'),
    chapterId: ChapterId.create('chapter-6'),
    title: LessonTitle.create('エンティティの実装'),
    order: 3,
    content: MarkdownContent.create(lesson6_3_content),
    quizId: QuizId.create('quiz-lesson-6-3'),
  }),
];
```

### 3. sampleQuizzes.ts の更新

新規レッスン（6-2, 6-3）に5問ずつ、計10問のクイズを追加。
既存の quiz-lesson-6-1 があるか確認し、なければ追加。

### 4. sampleCourses.ts の更新

chapter-6 を chapter6Lessons で置き換え:

```typescript
import { chapter6Lessons } from './sampleLessons';

const chapter6 = Chapter.create({
  id: ChapterId.create('chapter-6'),
  title: 'Chapter 6: エンティティ',
  order: 6,
  lessons: chapter6Lessons,
});
```

## レッスンコンテンツ詳細

### Lesson 6-1: エンティティとは（既存調整）

```markdown
# エンティティとは

## 概要
このレッスンでは、DDDにおける「エンティティ」について学びます。
値オブジェクトとの違いを理解し、エンティティの特性とライフサイクルを把握しましょう。

## エンティティの定義

> **エンティティ（Entity）** は、属性ではなく**同一性（Identity）** によって識別される
> オブジェクトです。時間が経過しても、属性が変化しても、同じエンティティとして認識されます。

### 日常の例

\`\`\`
エンティティの例:
- 銀行口座: 口座番号で識別、残高は変わる
- 人物: IDで識別、名前や住所が変わっても同一人物
- 注文: 注文IDで識別、状態が「注文中」→「発送済み」と変化
- 車: 車両番号で識別、所有者や走行距離が変わる
\`\`\`

### 値オブジェクトとの対比

| 項目 | エンティティ | 値オブジェクト |
|------|------------|--------------|
| 識別 | IDで識別 | 値で識別 |
| 可変性 | 可変（状態が変化） | 不変 |
| 等価性 | IDで判断 | 全属性の値で判断 |
| ライフサイクル | あり | なし |
| 例 | ユーザー、注文、商品 | 金額、住所、日付 |

\`\`\`typescript
// エンティティ: IDで識別
class User {
  constructor(
    private readonly id: UserId,  // 識別子
    private name: string,         // 変更可能
    private email: Email          // 変更可能
  ) {}

  changeName(newName: string): void {
    this.name = newName;  // 名前が変わっても同じユーザー
  }

  equals(other: User): boolean {
    return this.id.equals(other.id);  // IDで比較
  }
}

// 値オブジェクト: 値で識別
class Email {
  private constructor(private readonly value: string) {}

  equals(other: Email): boolean {
    return this.value === other.value;  // 値で比較
  }
}
\`\`\`

## エンティティの特性

### 1. 同一性（Identity）

エンティティは一意の識別子を持ちます:

\`\`\`typescript
class Order {
  constructor(
    private readonly id: OrderId,  // 一意の識別子
    private status: OrderStatus,
    private items: OrderItem[]
  ) {}

  // IDで同一性を判断
  equals(other: Order): boolean {
    return this.id.equals(other.id);
  }
}

const order1 = new Order(OrderId.create('order-123'), ...);
const order2 = new Order(OrderId.create('order-123'), ...);

order1.equals(order2);  // true（同じID）
\`\`\`

### 2. 可変性（Mutability）

エンティティは状態を変更できます:

\`\`\`typescript
class Order {
  private status: OrderStatus;

  ship(): void {
    if (this.status !== OrderStatus.Paid) {
      throw new Error('支払い済みの注文のみ発送可能');
    }
    this.status = OrderStatus.Shipped;  // 状態変更
  }

  cancel(): void {
    if (this.status === OrderStatus.Shipped) {
      throw new Error('発送済みの注文はキャンセル不可');
    }
    this.status = OrderStatus.Cancelled;  // 状態変更
  }
}
\`\`\`

### 3. ライフサイクル

エンティティは作成から削除まで、明確なライフサイクルを持ちます:

\`\`\`
注文のライフサイクル:
[作成] → [支払い待ち] → [支払い完了] → [発送準備中] → [発送済み] → [配達完了]
   ↓
[キャンセル]（特定の状態でのみ可能）
\`\`\`

\`\`\`typescript
class Order {
  private constructor(
    private readonly id: OrderId,
    private status: OrderStatus,
    private readonly createdAt: Date
  ) {}

  // ライフサイクルの開始
  static create(items: OrderItem[]): Order {
    return new Order(
      OrderId.generate(),
      OrderStatus.Pending,
      new Date()
    );
  }

  // 状態遷移
  pay(): void {
    this.status = OrderStatus.Paid;
  }

  ship(): void {
    this.status = OrderStatus.Shipped;
  }

  // ライフサイクルの終了
  complete(): void {
    this.status = OrderStatus.Completed;
  }
}
\`\`\`

## なぜエンティティが必要か

### 1. 現実世界のモデリング

現実世界には、時間とともに変化するが同一性を保つものが多数存在します:

\`\`\`
例: 会員システム
- ユーザーは登録時と1年後では住所や電話番号が変わっているかもしれない
- しかし、同じユーザーIDなら同一のユーザーとして扱う必要がある
\`\`\`

### 2. ビジネスプロセスの追跡

\`\`\`typescript
class Order {
  private readonly history: OrderEvent[] = [];

  ship(): void {
    this.status = OrderStatus.Shipped;
    this.history.push({
      type: 'Shipped',
      timestamp: new Date()
    });
  }

  // 注文の履歴を追跡できる
  getHistory(): OrderEvent[] {
    return [...this.history];
  }
}
\`\`\`

## まとめ

- **エンティティ**は同一性（ID）によって識別される
- **可変**であり、時間とともに状態が変化する
- **ライフサイクル**を持ち、作成から削除までの過程を管理
- **値オブジェクト**とは識別方法、可変性、ライフサイクルの有無が異なる
- 現実世界の変化する概念をモデリングするために必要
```

### Lesson 6-2: 識別子の設計

```markdown
# 識別子の設計

## 概要
このレッスンでは、エンティティの識別子（ID）の設計について学びます。
UUID、自然キー、代理キーの違いを理解し、適切な識別子を選択できるようになりましょう。

## 識別子の役割

識別子は**エンティティの同一性を保証**する重要な要素です:

\`\`\`typescript
class User {
  constructor(
    private readonly id: UserId,  // 識別子
    private name: string
  ) {}

  // 識別子で等価性を判断
  equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}
\`\`\`

## 識別子の種類

### 1. UUID（Universally Unique Identifier）

**特徴:**
- グローバルに一意
- ランダム生成
- 衝突の可能性が極めて低い

\`\`\`typescript
import { v4 as uuidv4 } from 'uuid';

class UserId {
  private constructor(private readonly value: string) {}

  static generate(): UserId {
    return new UserId(uuidv4());  // 例: "550e8400-e29b-41d4-a716-446655440000"
  }

  static fromString(value: string): UserId {
    if (!this.isValidUUID(value)) {
      throw new InvalidUserIdError(value);
    }
    return new UserId(value);
  }

  private static isValidUUID(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
\`\`\`

**メリット:**
- クライアント側で生成可能
- 分散システムで衝突の心配がない
- データベースに依存しない

**デメリット:**
- 長い（36文字）
- 人間には読みにくい
- インデックスのパフォーマンスが若干悪い

### 2. 自然キー（Natural Key）

**特徴:**
- ビジネス上の意味を持つ
- 元から一意性が保証されている

\`\`\`typescript
// メールアドレスを識別子として使用
class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!this.isValid(value)) {
      throw new InvalidEmailError(value);
    }
    return new Email(value.toLowerCase());
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

class User {
  constructor(
    private readonly email: Email,  // 自然キーとして使用
    private name: string
  ) {}
}
\`\`\`

**例:**
- メールアドレス
- ISBN（書籍）
- 車両番号
- 社員番号

**メリット:**
- ビジネス的に意味がある
- 人間にとって理解しやすい

**デメリット:**
- 変更される可能性がある
- 変更時のデータ整合性が課題

### 3. 代理キー（Surrogate Key）

**特徴:**
- ビジネス的な意味を持たない
- システムが割り当てる

\`\`\`typescript
class OrderId {
  private constructor(private readonly value: number) {}

  static fromNumber(value: number): OrderId {
    if (value <= 0) {
      throw new InvalidOrderIdError(value);
    }
    return new OrderId(value);
  }

  toNumber(): number {
    return this.value;
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }
}
\`\`\`

**例:**
- 自動採番（Auto Increment）
- シーケンス番号

**メリット:**
- シンプル
- データベースで効率的
- 変更の心配がない

**デメリット:**
- データベースに依存
- 分散システムでの採番が難しい

## 識別子の選択ガイドライン

| 状況 | 推奨 | 理由 |
|------|------|------|
| 分散システム | UUID | 衝突の心配がない |
| マイクロサービス | UUID | サービス間で一意性を保証 |
| 単一データベース | 代理キー | シンプルで効率的 |
| 既存の一意な値がある | 自然キー | ビジネス的に意味がある |
| クライアント側で生成 | UUID | データベース不要 |

## 複合識別子

複数の値の組み合わせで識別する場合:

\`\`\`typescript
class OrderItemId {
  private constructor(
    private readonly orderId: OrderId,
    private readonly productId: ProductId
  ) {}

  static create(orderId: OrderId, productId: ProductId): OrderItemId {
    return new OrderItemId(orderId, productId);
  }

  equals(other: OrderItemId): boolean {
    return this.orderId.equals(other.orderId) &&
           this.productId.equals(other.productId);
  }
}
\`\`\`

## 識別子の実装パターン

### パターン1: 値オブジェクトとして実装

\`\`\`typescript
class UserId {
  private constructor(private readonly value: string) {}

  static generate(): UserId {
    return new UserId(uuidv4());
  }

  static fromString(value: string): UserId {
    return new UserId(value);
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
\`\`\`

### パターン2: プレフィックス付きID

\`\`\`typescript
class OrderId {
  private static readonly PREFIX = 'order';

  private constructor(private readonly value: string) {}

  static generate(): OrderId {
    const uuid = uuidv4().substring(0, 8);
    return new OrderId(\`\${this.PREFIX}_\${uuid}\`);
    // 例: "order_550e8400"
  }

  static fromString(value: string): OrderId {
    if (!value.startsWith(this.PREFIX)) {
      throw new InvalidOrderIdError(value);
    }
    return new OrderId(value);
  }
}
\`\`\`

## まとめ

- **UUID**: 分散システムに最適、グローバルに一意
- **自然キー**: ビジネス的に意味がある、変更リスクあり
- **代理キー**: シンプル、データベース依存
- 識別子は**値オブジェクト**として実装
- プレフィックスで**型を識別**しやすくする
```

### Lesson 6-3: エンティティの実装

```markdown
# エンティティの実装

## 概要
このレッスンでは、TypeScriptでエンティティを実装する具体的なパターンを学びます。
識別子の扱い、状態管理、ビジネスロジックの配置を理解しましょう。

## 基本的な実装パターン

### エンティティの構造

\`\`\`typescript
class User {
  // 識別子は必須でreadonly
  private constructor(
    private readonly id: UserId,
    private name: UserName,
    private email: Email,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  // ファクトリメソッド: 新規作成
  static create(name: UserName, email: Email): User {
    return new User(
      UserId.generate(),
      name,
      email,
      new Date(),
      new Date()
    );
  }

  // ファクトリメソッド: 再構築（DBから取得時）
  static reconstruct(
    id: UserId,
    name: UserName,
    email: Email,
    createdAt: Date,
    updatedAt: Date
  ): User {
    return new User(id, name, email, createdAt, updatedAt);
  }

  // ゲッター
  getId(): UserId {
    return this.id;
  }

  getName(): UserName {
    return this.name;
  }

  // ビジネスロジック
  changeName(newName: UserName): void {
    this.name = newName;
    this.updatedAt = new Date();
  }

  changeEmail(newEmail: Email): void {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  // 等価性
  equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}
\`\`\`

## 状態管理パターン

### 状態遷移の実装

\`\`\`typescript
enum OrderStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
}

class Order {
  private constructor(
    private readonly id: OrderId,
    private status: OrderStatus,
    private items: OrderItem[],
    private readonly createdAt: Date
  ) {}

  static create(items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new EmptyOrderError();
    }
    return new Order(
      OrderId.generate(),
      OrderStatus.Pending,
      items,
      new Date()
    );
  }

  // 状態遷移: 支払い
  pay(): void {
    if (this.status !== OrderStatus.Pending) {
      throw new InvalidOrderStatusError(
        \`注文は支払い待ち状態である必要があります（現在: \${this.status}）\`
      );
    }
    this.status = OrderStatus.Paid;
  }

  // 状態遷移: 発送
  ship(): void {
    if (this.status !== OrderStatus.Paid) {
      throw new InvalidOrderStatusError(
        \`注文は支払い済み状態である必要があります（現在: \${this.status}）\`
      );
    }
    this.status = OrderStatus.Shipped;
  }

  // 状態遷移: キャンセル
  cancel(): void {
    if (this.status === OrderStatus.Shipped || this.status === OrderStatus.Delivered) {
      throw new CannotCancelShippedOrderError();
    }
    this.status = OrderStatus.Cancelled;
  }

  // 状態確認
  canBeCancelled(): boolean {
    return this.status !== OrderStatus.Shipped &&
           this.status !== OrderStatus.Delivered;
  }

  isShipped(): boolean {
    return this.status === OrderStatus.Shipped;
  }
}
\`\`\`

## ビジネスロジックの配置

### エンティティにロジックを配置

\`\`\`typescript
class BankAccount {
  private constructor(
    private readonly id: AccountId,
    private balance: Money
  ) {}

  // ✅ 良い例: ビジネスロジックをエンティティに配置
  withdraw(amount: Money): void {
    if (amount.isNegative()) {
      throw new NegativeAmountError();
    }
    if (this.balance.isLessThan(amount)) {
      throw new InsufficientBalanceError(this.balance, amount);
    }
    this.balance = this.balance.subtract(amount);
  }

  deposit(amount: Money): void {
    if (amount.isNegative()) {
      throw new NegativeAmountError();
    }
    this.balance = this.balance.add(amount);
  }

  // ビジネスルールの確認
  canWithdraw(amount: Money): boolean {
    return !amount.isNegative() && !this.balance.isLessThan(amount);
  }
}

// ❌ 悪い例: ビジネスロジックが外部に漏れる
function withdrawFromAccount(account: BankAccount, amount: Money): void {
  const balance = account.getBalance();
  if (balance < amount) {  // ロジックが外部に
    throw new Error('残高不足');
  }
  account.setBalance(balance - amount);  // setterで直接変更
}
\`\`\`

## 不変条件の保護

### コンストラクタでの検証

\`\`\`typescript
class Product {
  private constructor(
    private readonly id: ProductId,
    private name: ProductName,
    private price: Money,
    private stock: number
  ) {
    // 不変条件の検証
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.price.isNegative()) {
      throw new NegativePriceError();
    }
    if (this.stock < 0) {
      throw new NegativeStockError();
    }
  }

  // 在庫を減らす
  decreaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new InvalidQuantityError(quantity);
    }
    const newStock = this.stock - quantity;
    if (newStock < 0) {
      throw new InsufficientStockError(this.stock, quantity);
    }
    this.stock = newStock;
    this.validateInvariants();  // 不変条件を再確認
  }
}
\`\`\`

## エンティティのコレクション

### 子エンティティの管理

\`\`\`typescript
class Order {
  private constructor(
    private readonly id: OrderId,
    private items: OrderItem[]  // 子エンティティのコレクション
  ) {}

  // アイテムの追加
  addItem(product: Product, quantity: number): void {
    const existingItem = this.items.find(item =>
      item.getProductId().equals(product.getId())
    );

    if (existingItem) {
      existingItem.increaseQuantity(quantity);
    } else {
      this.items.push(OrderItem.create(product, quantity));
    }
  }

  // アイテムの削除
  removeItem(productId: ProductId): void {
    const index = this.items.findIndex(item =>
      item.getProductId().equals(productId)
    );
    if (index === -1) {
      throw new ItemNotFoundError(productId);
    }
    this.items.splice(index, 1);
  }

  // 合計金額の計算
  getTotalAmount(): Money {
    return this.items.reduce(
      (total, item) => total.add(item.getSubtotal()),
      Money.zero()
    );
  }

  // 防御的コピー
  getItems(): OrderItem[] {
    return [...this.items];
  }
}
\`\`\`

## まとめ

- エンティティは**privateコンストラクタ** + **ファクトリメソッド**で作成
- **識別子はreadonly**で変更不可
- **状態遷移**はメソッドで管理し、不正な遷移を防ぐ
- **ビジネスロジック**はエンティティ内に配置
- **不変条件**は常に保護する
- 子エンティティは**防御的コピー**で公開
```

## Definition of Done

- [ ] Lesson 6-1 の内容が確認・調整されている
- [ ] Lesson 6-2, 6-3 のコンテンツが作成されている
- [ ] 新規レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter6Lessons が更新されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-6 が更新されている
- [ ] 全レッスンが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Chapter 6 コンテンツ拡充完了。3レッスン + 15問のクイズを作成しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2
- docs/CONTENT_ROADMAP.md
- Ticket 011 の成果物（Chapter 5 を参考に）
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
- src/infrastructure/data/sampleCourses.ts
