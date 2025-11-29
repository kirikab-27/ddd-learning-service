# Design Concept: DDD Learning Service

## 基本方針

**ミニマルデザイン** - 学習に集中できる、シンプルで操作しやすいインターフェース

## デザイン原則

### 1. Less is More
- 装飾を排除し、コンテンツに集中
- 1画面1目的を徹底
- 余白を活かした読みやすいレイアウト

### 2. 一貫性
- 同じ操作は同じ見た目・挙動
- 予測可能なナビゲーション
- 統一されたコンポーネント

### 3. 即時フィードバック
- 操作結果を即座に視覚化
- 進捗状況の常時表示
- 完了/未完了の明確な区別

---

## カラースキーム: ダークモード

開発者向けサービスとして、コードが見やすいダークモードを採用。

```
Background:
  - Primary:   #0d1117 (GitHub Dark風)
  - Secondary: #161b22
  - Elevated:  #21262d

Text:
  - Primary:   #e6edf3
  - Secondary: #8b949e
  - Muted:     #6e7681

Accent:
  - Primary:   #58a6ff (リンク、アクティブ状態)
  - Success:   #3fb950 (完了、正解)
  - Warning:   #d29922 (注意)
  - Error:     #f85149 (エラー、不正解)

Border:
  - Default:   #30363d
  - Emphasis:  #484f58

Code Block:
  - Background: #161b22
  - Border:     #30363d
```

---

## ナビゲーション: サイドバー固定 + モバイルハンバーガー

DDD学習サービスは **階層が深い・章立てが命の教材** のため、
左サイドバーでコース全体の目次が常に見える構成が学習体験に効く。

### デスクトップレイアウト（md以上: 768px+）

```
+--------------------+----------------------------------------+
|                    |                                        |
|    Sidebar         |           Main Content                 |
|    (272px)         |                                        |
|                    |                                        |
|  DDD学習サービス    |   Lesson Title                         |
|  ─────────────     |   ─────────────────────                |
|  第1部: 基礎概念    |                                        |
|  ├ Ch.1 ドメイン ✓ |   Content with inline code blocks      |
|  ├ Ch.2 言語    ●  |                                        |
|  └ Ch.3 境界      |   ```typescript                        |
|  第2部: 戦術的設計  |   // code example                      |
|  └ ...            |   ```                                  |
|                    |                                        |
|  [Progress: 45%]   |   [← Prev]              [Next →]       |
+--------------------+----------------------------------------+
```

### モバイルレイアウト（md未満: < 768px）

```
+----------------------------------------+
| ≡  DDD学習サービス                      |  ← ヘッダー + ハンバーガー
+----------------------------------------+
|                                        |
|   Lesson Title                         |
|   ─────────────────────                |
|                                        |
|   Content (full width)                 |
|                                        |
|   ```typescript                        |
|   // code example                      |
|   ```                                  |
|                                        |
|   [← Prev]              [Next →]       |
+----------------------------------------+

≡ タップ時:
+--------------------+-------------------+
|    Sidebar         |                   |
|    (overlay)       |   (dimmed)        |
|                    |                   |
|  第1部: 基礎概念    |                   |
|  ├ Ch.1 ドメイン ✓ |                   |
|  ...               |                   |
+--------------------+-------------------+
```

### 実装イメージ（Tailwind）

```tsx
<div className="min-h-screen flex bg-background">
  {/* サイドバー（デスクトップ） */}
  <aside className="hidden md:flex md:w-72 border-r border-border">
    {/* 章一覧・進捗など */}
  </aside>

  <div className="flex-1 flex flex-col">
    {/* モバイル用ヘッダー + ハンバーガー */}
    <header className="flex items-center justify-between p-4 border-b border-border md:hidden">
      <div className="font-semibold">DDD学習サービス</div>
      <button>{/* ハンバーガーアイコン */}</button>
    </header>

    {/* メインコンテンツ */}
    <main className="p-4 md:p-8">
      {children}
    </main>
  </div>
</div>
```

### サイドバー仕様
- **幅**: 272px（18rem / md:w-72）
- **表示内容**:
  - サービスロゴ/タイトル
  - 部・章・レッスン一覧（ツリー構造）
  - 完了状態アイコン（✓ 完了 / ● 進行中 / ○ 未開始）
  - 全体進捗バー
- **挙動**:
  - 現在のレッスンをハイライト
  - 部・章は折りたたみ可能（アコーディオン）
  - サイドバー自体がスクロール可能
  - モバイル時はオーバーレイ + 左からスライドイン

---

## コンテンツ表示: インライン展開

### 設計方針

**v1: インライン展開をデフォルト** → 将来的にタブ切り替えを追加可能な設計

学習フロー（概念 → 図解 → コード例 → 解説 → 演習）と相性が良く、
「説明を読んでスクロールしたら、すぐ下にコードがある」というシンプルな構造が最もストレスが少ない。

### v1: インライン展開（基本スタイル）

本文の流れの中にコードを自然に配置。

```markdown
値オブジェクトは不変性を持ちます。以下のように実装します：

​```typescript
class Score {
  private constructor(private readonly value: number) {}

  static create(value: number): Score {
    if (value < 0 || value > 100) {
      throw new Error('Score must be 0-100');
    }
    return new Score(value);
  }
}
​```

このように `private constructor` を使うことで...
```

### Phase 2: タブ切り替え（将来追加）

複数ファイルを比較したいケースで有効：

```
+------------------------------------------+
| [Before] [After]                         |  ← タブ
+------------------------------------------+
| // Before: 貧血モデル                     |
| class User {                             |
|   public name: string;                   |
|   public email: string;                  |
| }                                        |
+------------------------------------------+
```

**想定ユースケース:**
- Before/After 比較（アンチパターン vs ベストプラクティス）
- 複数レイヤーのファイル比較（controller / usecase / domain）
- 段階的リファクタリングの各ステップ

### 分割ビュー（見送り）

左右分割は以下の理由で v1 では見送り：
- レイアウト実装が重い
- ノートPCで画面幅不足
- レスポンシブ対応が複雑

→ インタラクティブ演習（Phase 2以降）で再検討

### コードブロック仕様
- シンタックスハイライト（react-syntax-highlighter）
- 言語表示ラベル（右上）
- コピーボタン
- 行番号（オプション）
- 背景色でコンテンツと区別
- `react-markdown` でMarkdown内の ```ts ... ``` を自動変換

---

## タイポグラフィ

```
Font Family:
  - UI:   Inter, system-ui, sans-serif
  - Code: JetBrains Mono, Fira Code, monospace

Font Size:
  - H1:   2rem (32px)
  - H2:   1.5rem (24px)
  - H3:   1.25rem (20px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)
  - Code: 0.9rem (14.4px)

Line Height:
  - Heading: 1.3
  - Body:    1.7 (読みやすさ重視)
  - Code:    1.5
```

---

## スペーシング

8pxグリッドシステムを採用。

```
Base Unit: 8px

Spacing Scale:
  - xs:  4px   (0.5 unit)
  - sm:  8px   (1 unit)
  - md:  16px  (2 units)
  - lg:  24px  (3 units)
  - xl:  32px  (4 units)
  - 2xl: 48px  (6 units)
  - 3xl: 64px  (8 units)
```

---

## コンポーネント

### ボタン

```
Primary:   背景 #58a6ff, 文字 #0d1117
Secondary: 背景 transparent, 枠線 #30363d, 文字 #e6edf3
Ghost:     背景 transparent, 文字 #8b949e (hover時に背景)
```

### 進捗インジケータ

```
○ 未開始:  枠線のみ (#30363d)
● 進行中:  半塗り (#58a6ff)
✓ 完了:    塗りつぶし (#3fb950)
```

### カード

```
背景:    #161b22
枠線:    #30363d
角丸:    8px
影:      なし（ミニマル）
ホバー:  枠線 #58a6ff
```

### クイズUI

```
選択肢:
  - デフォルト: 枠線 #30363d
  - ホバー:     枠線 #58a6ff
  - 選択中:     背景 #58a6ff20, 枠線 #58a6ff
  - 正解:       背景 #3fb95020, 枠線 #3fb950
  - 不正解:     背景 #f8514920, 枠線 #f85149
```

---

## レスポンシブ対応

### ブレークポイント（Tailwind準拠）

```
Mobile:  < 768px (default)
  - サイドバー非表示
  - ハンバーガーメニューでオーバーレイ表示
  - コンテンツはフル幅

Tablet/Desktop: >= 768px (md:)
  - サイドバー固定表示 (272px)
  - コンテンツは残りの幅
```

### モバイル時の変更点
- サイドバー → ハンバーガーからスライドイン（オーバーレイ）
- 背景はdimmed（半透明の黒）
- コードブロック横スクロール
- タップ領域を44px以上に確保

---

## アクセシビリティ

- コントラスト比 WCAG AA 準拠
- キーボードナビゲーション対応
- フォーカス状態の明確な表示
- スクリーンリーダー対応（aria-label）

---

## 参考デザイン

- GitHub（ダークモード）
- Vercel Documentation
- Stripe Documentation
- Linear App
