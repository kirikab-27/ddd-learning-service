# Ticket 007: Chapter 2 - ユビキタス言語

## Goal
Chapter 2「ユビキタス言語」の学習コンテンツとクイズを作成する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第1部 Chapter 2）
- §3.2: 各チャプターの構成

要件定義書より:
> Chapter 2: ユビキタス言語
> └── チームで共通言語を作る、コードに反映する

## Scope

### In Scope
- Chapter 2「ユビキタス言語」のレッスン作成（3レッスン）
- 各レッスンのクイズ作成（5問×3 = 15問）
- sampleLessons.ts / sampleQuizzes.ts / sampleCourses.ts の更新

### Out of Scope
- Chapter 3-4 の作成（Ticket 008-009 で対応）
- 既存 Chapter の修正

## Chapter 2 レッスン構成

| Lesson ID | タイトル | 内容 |
|-----------|---------|------|
| lesson-2-1 | ユビキタス言語とは | 共通言語の重要性、言語の不一致による問題 |
| lesson-2-2 | チームで共通言語を作る | 用語集の作成、モデリングワークショップ |
| lesson-2-3 | コードに反映する | 命名規則、ドメイン用語のコード化 |

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 007-frontend1 | Chapter 2 コンテンツ作成 | なし |
| Quality | 007-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: Chapter 2 コンテンツ作成

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Technical Requirements

### レッスン内容詳細

#### Lesson 2-1: ユビキタス言語とは

**学習目標:**
- ユビキタス言語の定義を理解する
- 共通言語がない場合の問題を認識する
- ユビキタス言語の適用範囲を理解する

**コンテンツ構成:**
```markdown
# ユビキタス言語とは

## 概要
ユビキタス言語（Ubiquitous Language）は、DDDの中核概念の一つです。
チーム全員が同じ言葉で同じ意味を共有することの重要性を学びます。

## 言語の不一致による問題

### アンチパターン: 翻訳地獄
ビジネス: 「顧客」
開発者A: 「User」
開発者B: 「Customer」
データベース: 「clients」

→ 混乱、バグ、コミュニケーションコスト増大

## ユビキタス言語の定義

> ドメインエキスパートと開発者が共有する、
> 厳密に定義された共通言語

### 特徴
- 曖昧さがない
- コードに反映される
- ドキュメントに使われる
- 会話で使われる

## コード例
// 悪い例: 技術用語
class UserDataObject { ... }

// 良い例: ユビキタス言語
class Customer { ... }

## まとめ
- ユビキタス言語は**チーム全員の共通言語**
- コード、ドキュメント、会話で**一貫して使う**
- 言語の不一致は**バグと混乱の元**
```

#### Lesson 2-2: チームで共通言語を作る

**学習目標:**
- 用語集の作成方法を学ぶ
- モデリングワークショップの進め方を理解する
- 言語の育て方を知る

**コンテンツ構成:**
```markdown
# チームで共通言語を作る

## 概要
ユビキタス言語は自然に生まれるものではなく、
意図的に作り上げていくものです。その方法を学びます。

## 用語集（Glossary）の作成

### 用語集の要素
| 用語 | 定義 | 同義語 | 関連用語 |
|------|------|--------|----------|
| 注文 | 顧客が商品を購入する意思表示 | オーダー | 顧客、商品 |

## モデリングワークショップ

### イベントストーミング
1. ドメインイベントを洗い出す
2. コマンドを特定する
3. 集約を見つける

### 例: ECサイト
[商品をカートに追加] → [注文を確定] → [決済完了] → [出荷]

## 言語の育て方

- 定期的なレビュー
- 新しい概念の追加
- 曖昧な用語の明確化
- コードへの反映

## まとめ
- 用語集を**チームで維持**する
- ワークショップで**共通理解を形成**
- 言語は**継続的に改善**していく
```

#### Lesson 2-3: コードに反映する

**学習目標:**
- 命名規則とユビキタス言語の関係を理解する
- ドメイン用語をコードで表現する方法を学ぶ
- コードとモデルの一致の重要性を理解する

**コンテンツ構成:**
```markdown
# コードに反映する

## 概要
ユビキタス言語の真価は、コードに反映されて初めて発揮されます。
ドメイン用語をコードでどう表現するかを学びます。

## 命名規則

### クラス名
- Customer（顧客）
- Order（注文）
- Product（商品）

### メソッド名
- placeOrder()（注文する）
- cancelOrder()（注文をキャンセルする）
- ship()（出荷する）

## コード例

### 悪い例
function process(data) {
  if (data.status === 1) {
    updateDB(data);
  }
}

### 良い例
class Order {
  confirm(): void {
    if (this.status === OrderStatus.Pending) {
      this.status = OrderStatus.Confirmed;
    }
  }
}

## モデルとコードの一致

### なぜ重要か
- コードがドキュメントになる
- ビジネス変更がコード変更に直結
- コミュニケーションコストの削減

## まとめ
- クラス名、メソッド名に**ドメイン用語**を使う
- コードを見れば**ビジネスが分かる**状態を目指す
- モデルとコードは**常に同期**させる
```

### クイズ形式

各レッスンに5問の選択式問題（Ticket 006 と同様の形式）

### ファイル構成

```
content/chapters/chapter-2/lessons/
├── lesson-2-1.md
├── lesson-2-2.md
└── lesson-2-3.md

src/infrastructure/data/
├── sampleLessons.ts  # chapter2Lessons を追加
├── sampleQuizzes.ts  # quiz-lesson-2-1〜2-3 を追加
└── sampleCourses.ts  # chapter-2 に lessons を接続
```

## Definition of Done

- [ ] Lesson 2-1, 2-2, 2-3 のコンテンツが作成されている
- [ ] 各レッスンのクイズ（5問×3）が作成されている
- [ ] sampleLessons.ts に chapter2Lessons が追加されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-2 に lessons が接続されている
- [ ] `/courses/ddd-practice` で Chapter 2 が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- Ticket 006 の構造（chapter2Lessons のエクスポート方式）を参考にすること
- docs/CONTENT_ROADMAP.md を参照
- Boss1は完了後に `runs/007/REPORT.md` を作成すること
