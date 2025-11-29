# Frontend1: Chapter 8 集約コンテンツ作成

## Task Overview
Chapter 8「集約」の3レッスンとクイズを作成し、サンプルデータに追加する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| コンテンツ形式 | Markdown |
| 図解 | Mermaid（必須） |
| コード例 | TypeScript |
| テスト | Vitest |

## 作業手順

### Phase 1: レッスンコンテンツ作成

#### Lesson 8-1: 集約とは

**ファイル**: `content/chapters/chapter-8/lessons/lesson-8-1.md`

**必須セクション:**

1. **概要**
   - 集約とは何か
   - このレッスンで学ぶこと

2. **集約の定義**
   - 集約は「整合性の境界」
   - エンティティと値オブジェクトのクラスタ
   - トランザクションの単位

3. **なぜ集約が必要か**
   - 整合性が壊れる問題の具体例
   - 複数オブジェクトの不変条件を守る
   - データベーストランザクションとの関係

4. **不変条件（Invariant）**
   - 不変条件とは何か
   - ビジネスルールとしての不変条件
   - 集約による不変条件の保護

5. **集約の例**
   - **注文と注文明細**: 注文の合計金額は明細の合計と一致する
   - **ブログ記事とコメント**: 公開済み記事のみコメント可能
   - **銀行口座と取引**: 残高は全取引の合計と一致する

6. **トランザクション境界**
   - 1つの集約 = 1つのトランザクション
   - 複数集約の更新は結果整合性で

7. **まとめ**
   - 集約は整合性の境界
   - 不変条件を守る単位
   - トランザクションの単位

**必須図解（Mermaid）:**
- 集約の境界を示す図（graph TD with subgraph）
- 整合性が壊れる例 vs 集約による保護
- トランザクション境界の可視化

**コード例:**
```typescript
// 悪い例: 整合性が壊れる可能性
order.totalAmount = 1000;
orderItem.price = 500;  // 合計が合わない！

// 良い例: 集約が整合性を保証
class Order {
  private items: OrderItem[] = [];

  addItem(item: OrderItem): void {
    this.items.push(item);
    this.recalculateTotal();  // 自動的に整合性を保つ
  }

  private recalculateTotal(): void {
    this.totalAmount = this.items.reduce((sum, item) => sum + item.getAmount(), 0);
  }
}
```

---

#### Lesson 8-2: 集約ルート

**ファイル**: `content/chapters/chapter-8/lessons/lesson-8-2.md`

**必須セクション:**

1. **概要**
   - 集約ルートとは何か
   - このレッスンで学ぶこと

2. **集約ルートの定義**
   - 集約の入り口となるエンティティ
   - 外部からは集約ルート経由でのみアクセス
   - 集約全体の整合性を保証する責務

3. **外部アクセスの制限**
   - 集約内部への直接アクセス禁止
   - IDによる参照（オブジェクト参照ではない）
   - カプセル化の重要性

4. **集約ルートが提供すべきメソッド**
   - ビジネス操作を表現するメソッド
   - 内部状態の変更は集約ルート経由のみ
   - 不変条件のチェックを含む

5. **TypeScriptでの実装パターン**
   - 集約ルートクラスの設計
   - 内部エンティティのprivate化
   - 操作メソッドの実装

6. **実装例: 注文集約**
   ```typescript
   class Order {  // 集約ルート
     private id: OrderId;
     private items: OrderItem[] = [];  // 内部エンティティ
     private status: OrderStatus;
     private totalAmount: Money;

     // ビジネス操作
     addItem(product: Product, quantity: number): void {
       if (this.status !== OrderStatus.Draft) {
         throw new Error('確定済み注文には商品を追加できません');
       }

       const item = new OrderItem(product, quantity);
       this.items.push(item);
       this.recalculateTotal();  // 不変条件を保つ
     }

     confirm(): void {
       if (this.items.length === 0) {
         throw new Error('商品が1つもありません');
       }
       this.status = OrderStatus.Confirmed;
     }

     // 外部からの直接アクセスを防ぐ
     getItems(): ReadonlyArray<OrderItem> {
       return this.items;  // 読み取り専用
     }
   }
   ```

7. **よくある間違い**
   - 集約内部への直接アクセス
   - Getterで内部配列を返してしまう
   - 集約ルートを経由しない変更

8. **まとめ**
   - 集約ルートは集約の入り口
   - 外部アクセスは集約ルート経由のみ
   - 不変条件の保護が責務

**必須図解（Mermaid）:**
- 集約ルートと内部エンティティの構造（classDiagram）
- 正しいアクセスパターン vs 誤ったアクセスパターン（graph LR）
- 集約ルートのメソッド設計

---

#### Lesson 8-3: 集約の設計ガイドライン

**ファイル**: `content/chapters/chapter-8/lessons/lesson-8-3.md`

**必須セクション:**

1. **概要**
   - 適切な集約の設計とは
   - このレッスンで学ぶこと

2. **小さな集約を優先する**
   - "Small Aggregates" 原則
   - 大きな集約の問題点（ロック競合、パフォーマンス）
   - 本当に同時に変更される必要があるか？

3. **トランザクション整合性 vs 結果整合性**
   - **トランザクション整合性**: 1つの集約内部（即座に一貫性）
   - **結果整合性**: 複数集約間（最終的に一貫性）
   - ビジネス要件による判断

4. **集約間の参照**
   - オブジェクト参照ではなくIDで参照
   - 集約境界を越えた直接変更を防ぐ
   - リポジトリ経由での取得

5. **集約の境界を見つける方法**
   - 不変条件を分析する
   - トランザクションの必要性を確認する
   - ユースケースから逆算する
   - イベントストーミングを活用

6. **大きすぎる集約の例と問題**
   ```typescript
   // ❌ 悪い例: 大きすぎる集約
   class Customer {  // 集約ルート
     private orders: Order[] = [];      // 全注文を保持
     private payments: Payment[] = [];  // 全決済を保持
     private addresses: Address[] = []; // 全住所を保持

     // 顧客の1つの操作で全データをロック！
   }

   // ✅ 良い例: 小さな集約に分割
   class Customer {
     private id: CustomerId;
     private name: CustomerName;
     private defaultAddressId: AddressId;  // IDで参照
   }

   class Order {  // 別の集約
     private customerId: CustomerId;  // IDで参照
     private items: OrderItem[];
   }
   ```

7. **集約の分割と統合の判断基準**
   | 判断基準 | 1つの集約にまとめる | 別の集約に分ける |
   |----------|-------------------|-----------------|
   | 同時更新の必要性 | 必ず同時に変更される | 別々に変更されることがある |
   | 不変条件 | 不変条件が存在する | 独立した不変条件 |
   | ライフサイクル | 同じライフサイクル | 異なるライフサイクル |
   | トランザクション | 即座の整合性が必須 | 結果整合性で十分 |

8. **イベント駆動による集約間連携**
   ```typescript
   // 注文確定時にイベント発行
   class Order {
     confirm(): void {
       this.status = OrderStatus.Confirmed;
       this.addDomainEvent(new OrderConfirmedEvent(this.id));
     }
   }

   // 在庫集約がイベントを受け取って処理
   class InventoryEventHandler {
     handle(event: OrderConfirmedEvent): void {
       const inventory = this.repo.find(event.productId);
       inventory.reserve(event.quantity);
       this.repo.save(inventory);
     }
   }
   ```

9. **集約設計のチェックリスト**
   - [ ] 不変条件は明確か？
   - [ ] トランザクション整合性が本当に必要か？
   - [ ] 集約は小さく保たれているか？
   - [ ] 集約間はIDで参照しているか？
   - [ ] ビジネス操作を表現するメソッドがあるか？

10. **まとめ**
    - 小さな集約を優先
    - トランザクション整合性が必要な範囲のみ1つの集約に
    - 集約間はIDで参照
    - イベントで集約間を連携

**必須図解（Mermaid）:**
- 大きな集約 vs 小さな集約の比較（graph TD）
- 集約間の参照パターン（classDiagram）
- イベント駆動による集約間連携（sequenceDiagram）
- 集約設計の決定木（graph TD）

---

### Phase 2: クイズ作成

各レッスンに5問のクイズを作成し、`src/infrastructure/data/sampleQuizzes.ts` に追加。

#### クイズ構造

```typescript
{
  id: 'quiz-8-1-1',
  lessonId: 'lesson-8-1',
  question: '集約の主な目的は何ですか？',
  options: [
    'パフォーマンスの最適化',
    '整合性の境界を定義すること',
    'データベーステーブルの設計',
    'コードの再利用性向上'
  ],
  correctAnswer: 1,
  explanation: '集約の主な目的は整合性の境界を定義することです。集約内部の不変条件を守り、トランザクションの単位を明確にします。'
}
```

#### Lesson 8-1 のクイズ例（5問）

1. 集約の主な目的（整合性の境界）
2. 不変条件とは何か
3. トランザクション境界としての集約
4. 集約の例（注文と注文明細）
5. 複数集約の更新方法（結果整合性）

#### Lesson 8-2 のクイズ例（5問）

1. 集約ルートの役割
2. 外部アクセスの制限理由
3. 集約内部への直接アクセス
4. 集約ルートが提供すべきメソッド
5. ReadonlyArrayの使用理由

#### Lesson 8-3 のクイズ例（5問）

1. 小さな集約を優先する理由
2. トランザクション整合性 vs 結果整合性
3. 集約間の参照方法
4. 大きすぎる集約の問題
5. 集約設計の判断基準

---

### Phase 3: サンプルデータ更新

#### 1. sampleLessons.ts に追加

```typescript
// Chapter 8
{
  id: 'lesson-8-1',
  chapterId: 'chapter-8',
  title: '集約とは',
  description: '集約の定義、整合性の境界、不変条件について学びます',
  content: lesson81Content,
  order: 1,
  estimatedMinutes: 20,
  objectives: [
    '集約の定義を理解する',
    '整合性の境界の概念を理解する',
    '不変条件の重要性を理解する'
  ],
  prerequisites: ['lesson-6-3']
},
{
  id: 'lesson-8-2',
  chapterId: 'chapter-8',
  title: '集約ルート',
  description: '集約ルートの役割と実装パターンを学びます',
  content: lesson82Content,
  order: 2,
  estimatedMinutes: 25,
  objectives: [
    '集約ルートの役割を理解する',
    '外部アクセス制御を理解する',
    '集約ルートの実装パターンを習得する'
  ],
  prerequisites: ['lesson-8-1']
},
{
  id: 'lesson-8-3',
  chapterId: 'chapter-8',
  title: '集約の設計ガイドライン',
  description: '適切な集約サイズの決め方と設計原則を学びます',
  content: lesson83Content,
  order: 3,
  estimatedMinutes: 30,
  objectives: [
    '適切な集約サイズを決められる',
    '集約の境界を見つける方法を習得する',
    'よくある設計ミスを回避できる'
  ],
  prerequisites: ['lesson-8-2']
}
```

#### 2. sampleCourses.ts に Chapter 8 追加

```typescript
{
  id: 'chapter-8',
  courseId: 'ddd-practice',
  title: '集約',
  description: '整合性の境界、集約ルート、設計ガイドラインを学びます',
  order: 8,
  objectives: [
    '集約の概念を理解する',
    '集約ルートの実装ができる',
    '適切な集約設計ができる'
  ]
}
```

---

## テスト実行

```bash
npm run test
npm run type-check
```

---

## Definition of Done

- [ ] Lesson 8-1, 8-2, 8-3 のMarkdown作成完了
- [ ] 各レッスンに5問のクイズ作成完了（合計15問）
- [ ] sampleLessons.ts に3レッスン追加完了
- [ ] sampleQuizzes.ts に15問追加完了
- [ ] sampleCourses.ts に Chapter 8 追加完了
- [ ] 全レッスンがブラウザで表示される
- [ ] 全クイズが動作する
- [ ] Mermaid図解が正しく表示される
- [ ] 全テストがパス
- [ ] 型チェックがパス

---

## Communication

完了時:
```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 016 Frontend1完了。Chapter 8（集約）の3レッスン+クイズ15問を作成しました。"
```

問題発生時:
```bash
./scripts/agent-send.sh boss1 "[ISSUE] Ticket 016 Frontend1で問題が発生しました。[問題の詳細]"
```

---

## Reference

- README.md: Ticket全体概要
- CONTENT_ROADMAP.md: コンテンツ構成
- Ticket 011-013: 類似パターンの実装例
- Chapter 5, 6, 7: 前提知識
