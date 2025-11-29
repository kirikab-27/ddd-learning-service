# Ticket 014: Quality - デザイン改善レビュー

## 担当タスク

Frontend1 のレッスンページデザイン改善をレビューし、品質を保証する。

## レビュー対象

PR #XX（Frontend1 から報告されるPR番号）

## 確認項目

### 1. スタイル確認

#### 全体レイアウト
- [ ] `prose-lg` クラスが適用されている
- [ ] `leading-relaxed` で行間がゆったりしている
- [ ] レスポンシブクラス（`sm:`, `md:`, `lg:`）が適用されている

#### 見出し（Headings）
- [ ] `h1`: `text-4xl`, `mb-8`, `mt-12`
- [ ] `h2`: `text-3xl`, `mb-6`, `mt-10`, `border-b`, `border-slate-700`
- [ ] `h3`: `text-2xl`, `mb-4`, `mt-8`
- [ ] `h4`: `text-xl`, `mb-3`, `mt-6`
- [ ] 見出しが階層的に見やすい

#### 段落（Paragraphs）
- [ ] `prose-p:my-6` で段落間の余白が適切
- [ ] `prose-p:leading-8` で行間が読みやすい

#### コード
- [ ] インラインコード: `bg-slate-800`, `text-pink-400`, `px-2`, `py-1`
- [ ] コードブロック: `bg-slate-900`, `border`, `rounded-lg`, `shadow-xl`
- [ ] SyntaxHighlighter に `customStyle` が適用されている
  - `padding: '1.5rem'`
  - `fontSize: '0.95rem'`
  - `lineHeight: '1.7'`

#### リスト
- [ ] `prose-ul:my-6`, `prose-ul:space-y-2`
- [ ] `prose-ol:my-6`, `prose-ol:space-y-2`
- [ ] `prose-li:my-2` で項目間の余白が適切

#### テーブル
- [ ] `prose-table:my-8`
- [ ] `prose-th:bg-slate-800`, `prose-th:px-4`, `prose-th:py-3`
- [ ] `prose-td:px-4`, `prose-td:py-3`
- [ ] セルに border が適用されている

#### 引用（Blockquote）
- [ ] `border-l-4`, `border-l-blue-500`
- [ ] `bg-slate-800/50`, `pl-6`, `py-4`
- [ ] `rounded-r`, `italic`

#### リンク
- [ ] `text-blue-400`, `no-underline`
- [ ] `hover:text-blue-300`, `hover:underline`

### 2. 視覚確認

実際に http://localhost:3000/courses/ddd-practice でレッスンを開いて確認:

- [ ] 見出しが階層的で見やすい
- [ ] 段落の行間が快適
- [ ] コードブロックが読みやすく、シンタックスハイライトが適切
- [ ] リストの項目が区別しやすい
- [ ] テーブルが整然と表示される
- [ ] 引用ブロックが視覚的に区別される
- [ ] リンクがホバーで分かりやすい

### 3. レスポンシブ確認

#### モバイル（320px - 767px）
```bash
# DevToolsで320px幅に設定
```
- [ ] 文字サイズが適切（`sm:prose-base`）
- [ ] コードブロックが横スクロール可能
- [ ] テーブルが表示できる（またはスクロール可能）

#### タブレット（768px - 1023px）
```bash
# DevToolsで768px幅に設定
```
- [ ] 文字サイズが快適（`md:prose-lg`）
- [ ] 余白が適切

#### デスクトップ（1024px以上）
```bash
# DevToolsで1024px以上に設定
```
- [ ] 文字サイズが最適（`lg:prose-xl`）
- [ ] 行長が読みやすい範囲内

### 4. 技術確認

```bash
# 型チェック
npx tsc --noEmit

# テスト実行
npm test
```

- [ ] TypeScript型エラー: 0件
- [ ] テスト: 全パス
- [ ] Tailwind CSSのみ使用（CSS Modules未使用）

### 5. コード品質

- [ ] MarkdownRenderer.tsx のクラス名が適切に整理されている
- [ ] SyntaxHighlighter の customStyle が適切
- [ ] 不要なインラインスタイルがない

## Definition of Done

- [ ] 全確認項目がクリア
- [ ] 実際の表示が改善されている
- [ ] レスポンシブ対応が適切
- [ ] PRをマージ（問題がない場合）
- [ ] Boss1に完了報告

## 報告方法

### 問題がない場合
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 014 - PASS。レッスンページデザイン改善確認完了。大幅に読みやすくなりました。PR #XX マージ済み。"
```

### 問題がある場合
```
./scripts/agent-send.sh boss "[Quality] Ticket 014 - 要修正。問題: [具体的な問題内容]"
```
