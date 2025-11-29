# Frontend2: レッスンページデザイン改善

## Task Overview
レッスンページの読みやすさを向上させるため、MarkdownRenderer を改善する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 対象ファイル
- `src/presentation/features/lesson/MarkdownRenderer.tsx`

### 改善ポイント

#### 1. セクション間のスペーシング改善

現在の `prose` クラスに加え、より読みやすいスペーシングを追加:

```tsx
<article className="prose prose-invert prose-slate max-w-none
  prose-headings:font-semibold
  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-700
  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
  prose-p:leading-relaxed prose-p:my-4
  prose-ul:my-6 prose-li:my-2
  ...
">
```

#### 2. カード型レイアウト（オプション）

セクションをカードで区切る場合は、Markdownコンテンツのカスタムコンポーネントを追加:

```tsx
components={{
  h2({ node, children, ...props }) {
    return (
      <div className="bg-slate-800/30 rounded-lg p-6 my-8 border border-slate-700/50">
        <h2 className="!mt-0 !border-0" {...props}>{children}</h2>
      </div>
    );
  },
  // ... 他のコンポーネント
}}
```

#### 3. コードブロックのスタイリング強化

```tsx
code({ node, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const isInline = !match;
  return !isInline && match ? (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-700">
      <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700">
        {match[1]}
      </div>
      <SyntaxHighlighter
        style={oneDark as { [key: string]: CSSProperties }}
        language={match[1]}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: '1.5rem',
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
},
```

#### 4. 引用ブロックの改善

```tsx
blockquote({ node, children, ...props }) {
  return (
    <blockquote
      className="!border-l-4 !border-blue-500 bg-blue-500/10 !rounded-r-lg p-4 my-6"
      {...props}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="flex-1">{children}</div>
      </div>
    </blockquote>
  );
},
```

#### 5. テーブルのスタイリング改善

```tsx
table({ node, children, ...props }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-700">
      <table className="!my-0" {...props}>
        {children}
      </table>
    </div>
  );
},
```

## 実装例（完全版）

```tsx
'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CSSProperties } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-slate max-w-none
      prose-headings:font-semibold
      prose-h1:text-3xl prose-h1:mb-8
      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-700
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
      prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
      prose-p:leading-relaxed prose-p:my-4 prose-p:text-slate-300
      prose-ul:my-6 prose-ul:space-y-2
      prose-ol:my-6 prose-ol:space-y-2
      prose-li:my-2
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-code:bg-slate-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-code:text-sm prose-code:text-pink-300
      prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-transparent prose-pre:p-0
      prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-800/50 prose-blockquote:rounded-r
      prose-th:bg-slate-800 prose-th:font-semibold
      prose-td:border-slate-700 prose-th:border-slate-700
      prose-img:rounded-lg prose-img:border prose-img:border-slate-700
      prose-hr:border-slate-700 prose-hr:my-12
    ">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;

            if (!isInline && match) {
              return (
                <div className="my-6 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                  {/* Language label */}
                  <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700">
                    {match[1]}
                  </div>
                  {/* Code block */}
                  <SyntaxHighlighter
                    style={oneDark as { [key: string]: CSSProperties }}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      padding: '1.5rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.7',
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          blockquote({ node, children, ...props }) {
            return (
              <blockquote
                className="!border-l-4 !border-blue-500 bg-blue-500/10 !rounded-r-lg p-4 my-6"
                {...props}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">💡</span>
                  <div className="flex-1">{children}</div>
                </div>
              </blockquote>
            );
          },

          table({ node, children, ...props }) {
            return (
              <div className="my-8 overflow-x-auto rounded-lg border border-slate-700">
                <table className="!my-0" {...props}>
                  {children}
                </table>
              </div>
            );
          },

          h2({ node, children, ...props }) {
            return (
              <h2
                className="scroll-mt-20"
                id={String(children).toLowerCase().replace(/\s+/g, '-')}
                {...props}
              >
                {children}
              </h2>
            );
          },

          ul({ node, children, ...props }) {
            return (
              <ul className="space-y-2" {...props}>
                {children}
              </ul>
            );
          },

          ol({ node, children, ...props }) {
            return (
              <ol className="space-y-2" {...props}>
                {children}
              </ol>
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

## オプション機能（Phase B）

### プログレッシブディスクロージャー

長いコードを折りたたむためのカスタムMarkdown構文:

```markdown
<details>
<summary>詳細なコード例を見る</summary>

\`\`\`typescript
// 長いコード
\`\`\`

</details>
```

これは標準HTMLなので、追加実装不要。

### アイコン付きCallout

カスタムコンポーネントを追加:

```tsx
// src/presentation/components/Callout.tsx
interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'danger';
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  const styles = {
    info: 'border-blue-500 bg-blue-500/10',
    warning: 'border-orange-500 bg-orange-500/10',
    success: 'border-green-500 bg-green-500/10',
    danger: 'border-red-500 bg-red-500/10',
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    danger: '❌',
  };

  return (
    <div className={\`border-l-4 \${styles[type]} rounded-r-lg p-4 my-4\`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
```

## Definition of Done

- [ ] MarkdownRenderer.tsx が更新されている
- [ ] セクション間のスペーシングが改善されている
- [ ] コードブロックに言語ラベルが表示される
- [ ] 引用ブロックにアイコンが表示される
- [ ] テーブルがカード型レイアウトになっている
- [ ] 見出しにIDが付与されている（リンク可能）
- [ ] モバイルでも読みやすい
- [ ] 全レッスンで統一されたデザイン
- [ ] パフォーマンスに影響なし
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] レッスンページデザイン改善完了。MarkdownRenderer を更新しました。"
```

## Reference

- 現在の実装: `src/presentation/features/lesson/MarkdownRenderer.tsx`
- TailwindCSS Typography: https://tailwindcss.com/docs/typography-plugin
- ReactMarkdown: https://github.com/remarkjs/react-markdown
