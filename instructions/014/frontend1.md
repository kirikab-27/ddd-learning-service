# Ticket 014: Frontend1 - MarkdownRenderer改善

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

MarkdownRenderer.tsx のスタイル改善により、レッスンページの読みやすさを向上させる。

## 改善要件

### 1. 全体レイアウト

**現状の問題:**
- `prose` クラスのデフォルト設定では行間・余白が不十分
- 長文が読みづらい

**改善内容:**
```tsx
<article className="
  prose prose-lg prose-invert prose-slate
  max-w-none

  // 基本スタイル
  leading-relaxed         // 行間をゆったりと

  // パラグラフ
  prose-p:my-6           // 段落間の余白を広げる
  prose-p:leading-8      // 段落内の行間を広げる

  // 見出しスタイル
  prose-headings:font-bold
  prose-headings:tracking-tight
  prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-700
  prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
  prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6

  // リンク
  prose-a:text-blue-400
  prose-a:no-underline
  prose-a:font-medium
  hover:prose-a:text-blue-300
  hover:prose-a:underline

  // インラインコード
  prose-code:bg-slate-800
  prose-code:text-pink-400
  prose-code:px-2
  prose-code:py-1
  prose-code:rounded
  prose-code:font-mono
  prose-code:text-sm
  prose-code:before:content-none
  prose-code:after:content-none

  // コードブロック
  prose-pre:bg-slate-900
  prose-pre:border prose-pre:border-slate-700
  prose-pre:rounded-lg
  prose-pre:my-6
  prose-pre:shadow-xl

  // 引用
  prose-blockquote:border-l-4
  prose-blockquote:border-l-blue-500
  prose-blockquote:bg-slate-800/50
  prose-blockquote:pl-6
  prose-blockquote:py-4
  prose-blockquote:my-6
  prose-blockquote:rounded-r
  prose-blockquote:italic

  // リスト
  prose-ul:my-6
  prose-ul:space-y-2
  prose-ol:my-6
  prose-ol:space-y-2
  prose-li:my-2

  // テーブル
  prose-table:my-8
  prose-table:border-collapse
  prose-th:bg-slate-800
  prose-th:px-4
  prose-th:py-3
  prose-th:text-left
  prose-th:font-semibold
  prose-th:border
  prose-th:border-slate-700
  prose-td:px-4
  prose-td:py-3
  prose-td:border
  prose-td:border-slate-700

  // 強調
  prose-strong:text-white
  prose-strong:font-bold

  // 水平線
  prose-hr:my-12
  prose-hr:border-slate-700
">
```

### 2. コードハイライト改善

**SyntaxHighlighter のカスタマイズ:**
```tsx
<SyntaxHighlighter
  style={oneDark as { [key: string]: CSSProperties }}
  language={match[1]}
  PreTag="div"
  customStyle={{
    margin: 0,
    padding: '1.5rem',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    borderRadius: '0.5rem',
  }}
  codeTagProps={{
    style: {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
  }}
>
  {String(children).replace(/\n$/, '')}
</SyntaxHighlighter>
```

### 3. レスポンシブ対応

- モバイル: 文字サイズ・行間の調整
- タブレット: 最適な表示幅
- デスクトップ: 読みやすい最大幅

```tsx
// 追加のレスポンシブクラス例
sm:prose-base    // スマホ: 基本サイズ
md:prose-lg      // タブレット: 大きめ
lg:prose-xl      // デスクトップ: さらに大きく
```

## 対象ファイル

### 更新
```
src/presentation/features/lesson/MarkdownRenderer.tsx
  - article className の大幅な拡充
  - SyntaxHighlighter のカスタマイズ追加
```

## 実装例

### Before (現在)
```tsx
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-slate max-w-none ...">
      {/* 簡素なproseスタイル */}
    </article>
  );
}
```

### After (改善後)
```tsx
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="
      prose prose-lg prose-invert prose-slate
      max-w-none leading-relaxed

      /* 段落 */
      prose-p:my-6 prose-p:leading-8

      /* 見出し */
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
      prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-700

      /* コード */
      prose-code:bg-slate-800 prose-code:text-pink-400
      prose-code:px-2 prose-code:py-1 prose-code:rounded
      prose-code:before:content-none prose-code:after:content-none

      /* コードブロック */
      prose-pre:bg-slate-900 prose-pre:border
      prose-pre:border-slate-700 prose-pre:rounded-lg
      prose-pre:my-6 prose-pre:shadow-xl

      /* 引用 */
      prose-blockquote:border-l-4 prose-blockquote:border-l-blue-500
      prose-blockquote:bg-slate-800/50 prose-blockquote:pl-6
      prose-blockquote:py-4 prose-blockquote:my-6
      prose-blockquote:rounded-r prose-blockquote:italic

      /* リスト */
      prose-ul:my-6 prose-ul:space-y-2
      prose-ol:my-6 prose-ol:space-y-2
      prose-li:my-2

      /* テーブル */
      prose-table:my-8 prose-th:bg-slate-800
      prose-th:px-4 prose-th:py-3 prose-th:font-semibold
      prose-th:border prose-th:border-slate-700
      prose-td:px-4 prose-td:py-3
      prose-td:border prose-td:border-slate-700

      /* 強調・その他 */
      prose-strong:text-white prose-strong:font-bold
      prose-hr:my-12 prose-hr:border-slate-700
      prose-a:text-blue-400 prose-a:no-underline
      hover:prose-a:text-blue-300 hover:prose-a:underline

      /* レスポンシブ */
      sm:prose-base md:prose-lg lg:prose-xl
    ">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return !isInline && match ? (
              <SyntaxHighlighter
                style={oneDark as { [key: string]: CSSProperties }}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  borderRadius: '0.5rem',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  },
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
```

## チェックポイント

### スタイル確認
- [ ] 見出しの階層が明確
- [ ] 段落間の余白が適切
- [ ] コードブロックが見やすい
- [ ] リストの項目が区別しやすい
- [ ] テーブルが読みやすい
- [ ] 引用ブロックが目立つ

### レスポンシブ確認
- [ ] モバイル（320px-）: 適切な文字サイズ
- [ ] タブレット（768px-）: 快適な読書体験
- [ ] デスクトップ（1024px-）: 最適な行長

### 技術確認
- [ ] Tailwind CSSのみ使用
- [ ] CSS Modules未使用
- [ ] TypeScript型エラーなし

## Definition of Done

- [ ] MarkdownRenderer.tsx のスタイルが大幅に改善されている
- [ ] 全要素の視認性が向上している
- [ ] レスポンシブ対応済み
- [ ] Tailwind CSS のみ使用
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 014 - レッスンページデザイン改善完了。MarkdownRenderer.tsx を大幅に改善しました。PR #XX を作成しました。"
```
