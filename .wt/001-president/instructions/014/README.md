# Ticket 014: レッスンページデザイン改善

## Goal
レッスンページの読みやすさを向上させ、学習効果を高めるためのデザイン改善を実施する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 背景

ユーザーフィードバックにより、以下の問題が指摘された：

### 主な問題点

1. **視覚的な区切りが弱い** 👁️
   - セクション間の境界が曖昧
   - コードブロックと説明文の関係性が見えにくい
   - 重要度の違いが伝わりにくい

2. **情報密度が高すぎる** 📄
   - テキストが詰まりすぎて圧迫感
   - 一度に処理する情報量が多い
   - 休憩ポイントがない

3. **スキャンしにくい構造** 🔍
   - 流し読みで要点を掴みにくい
   - どこが重要なのか瞬間判断できない
   - コードサンプルが長くて威圧的

## Scope

### In Scope

#### Phase A: マークダウンレンダリング改善
- カード型レイアウトの導入
- セクション間のスペーシング改善
- コードブロックのスタイリング強化

#### Phase B: インタラクティブ要素（オプション）
- プログレッシブディスクロージャー（折りたたみ）
- アイコンとカラーコーディング
- 目次ナビゲーション

### Out of Scope
- コンテンツ自体の修正
- クイズ機能の変更

## デザイン改善案

### 1. カード型レイアウト 💳

各セクションをカードで区切り、視覚的な境界を明確に:

```tsx
<div className="space-y-6">
  <section className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
    <h2>概要</h2>
    <p>...</p>
  </section>

  <section className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
    <h2>定義</h2>
    <p>...</p>
  </section>
</div>
```

### 2. アイコンとカラーコーディング 🎨

セクションタイプを視覚的に区別:

```tsx
// 概念説明 → 💡 青系
<div className="border-l-4 border-blue-500 bg-blue-500/10 p-4">

// コード例 → 🔧 緑系
<div className="border-l-4 border-green-500 bg-green-500/10 p-4">

// 重要ポイント → ⚠️ オレンジ系
<div className="border-l-4 border-orange-500 bg-orange-500/10 p-4">

// まとめ → ✅ 紫系
<div className="border-l-4 border-purple-500 bg-purple-500/10 p-4">
```

### 3. プログレッシブディスクロージャー 📖

長いコードは折りたたみ可能に:

```tsx
<details className="group">
  <summary className="cursor-pointer">
    詳細なコード例を見る
  </summary>
  <div className="mt-4">
    {/* 長いコード */}
  </div>
</details>
```

### 4. スペーシングとタイポグラフィ

```css
/* セクション間 */
.space-y-8

/* パラグラフ */
.leading-relaxed  /* 行間を広く */
.text-slate-300   /* 読みやすいコントラスト */

/* 見出し */
.text-2xl.font-bold.mb-4  /* h2 */
.text-xl.font-semibold.mb-3  /* h3 */
```

### 5. コードブロックの改善

```tsx
<pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-700">
  <code className="text-sm font-mono">
    {/* コード */}
  </code>
</pre>
```

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend2 | 014-frontend2 | レッスンページコンポーネント改善 | なし |
| Quality | 014-quality | デザインレビュー・テスト | Frontend2完了後 |

## Execution Order

```
Phase A: 基本デザイン改善
└── Frontend2: マークダウンレンダリング改善

Phase B: インタラクティブ要素（オプション）
└── Frontend2: プログレッシブディスクロージャー実装

Phase C: 品質保証
└── Quality: デザインレビュー
```

## Definition of Done

- [ ] レッスンページにカード型レイアウトが適用されている
- [ ] セクション間のスペーシングが改善されている
- [ ] コードブロックのスタイリングが強化されている
- [ ] アイコンとカラーコーディングが実装されている（オプション）
- [ ] 長いコードが折りたたみ可能（オプション）
- [ ] 全レッスンページで統一されたデザイン
- [ ] モバイル対応（レスポンシブ）
- [ ] アクセシビリティ基準を満たしている
- [ ] 全テストがパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- 既存のMarkdownレンダリングロジックを活用
- パフォーマンスに影響を与えないこと
- 段階的に実装可能（Phase A → Phase B）
- Boss1は完了後に `runs/014/REPORT.md` を作成すること

## Reference

- 現在のレッスンページ: `app/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]/page.tsx`
- Markdownレンダリング: `src/presentation/components/MarkdownContent.tsx`（存在する場合）
