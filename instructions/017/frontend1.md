# Ticket 017: Frontend1 - Mermaid図解対応の実装

## 担当タスク

Mermaidライブラリを使って、レッスン内のMermaidコードブロックを図として表示できるようにする。

## 実装要件

### 1. 依存関係の追加

```bash
npm install mermaid remark-gfm
```

**package.json に追加されるパッケージ**:
- `mermaid`: Mermaid図解のレンダリング
- `remark-gfm`: GitHub Flavored Markdown対応（テーブル、タスクリストなど）

### 2. MermaidDiagram コンポーネントの作成

**ファイル**: `src/presentation/features/lesson/MermaidDiagram.tsx`

```typescript
'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Mermaidの初期化（ダークテーマ）
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      });

      // 既存の図をクリア
      ref.current.innerHTML = chart;

      // レンダリング
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div
      ref={ref}
      className="mermaid my-6 flex justify-center"
      suppressHydrationWarning
    />
  );
}
```

**重要ポイント**:
- `'use client'`: Mermaidはクライアントサイドでのみ動作
- `suppressHydrationWarning`: SSR/CSR の違いによる警告を抑制
- `theme: 'dark'`: ダークテーマに統一
- `my-6`: 上下の余白（Ticket 014のスタイルと統一）
- `flex justify-center`: 図を中央揃え

### 3. MarkdownRenderer の更新

**ファイル**: `src/presentation/features/lesson/MarkdownRenderer.tsx`

#### 3.1 インポートの追加

```typescript
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { CSSProperties } from 'react';
import remarkGfm from 'remark-gfm';  // 追加
import { MermaidDiagram } from './MermaidDiagram';  // 追加
```

#### 3.2 ReactMarkdown の更新

```typescript
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="
      prose prose-lg prose-invert prose-slate
      max-w-none leading-relaxed

      // ... 既存のTailwindクラス（Ticket 014の改善を維持）
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}  // 追加
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            // Mermaid図解の場合
            if (!inline && language === 'mermaid') {
              return (
                <MermaidDiagram
                  chart={String(children).replace(/\n$/, '')}
                />
              );
            }

            // 通常のコードブロック（既存のロジック）
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark as { [key: string]: CSSProperties }}
                language={language}
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

**重要ポイント**:
- `remarkPlugins={[remarkGfm]}`: GFM対応を追加
- Mermaid検出ロジック: `language === 'mermaid'`
- **既存のTicket 014改善を維持**: Tailwindクラス、customStyleなど

### 4. 参考資料

stash@{0} の内容を参考にできます:

```bash
# MermaidDiagram の実装例を見る
git stash show -p 'stash@{0}' | grep -A 50 "MermaidDiagram.tsx"

# MarkdownRenderer の変更を見る
git stash show -p 'stash@{0}' | grep -A 100 "MarkdownRenderer.tsx"
```

**注意**: stashは古いため、直接適用せず「参考」としてのみ使用してください。

## 実装手順

### Step 1: 依存関係の追加
```bash
npm install mermaid remark-gfm
```

### Step 2: MermaidDiagram.tsx の作成
- 上記のコード例を使用
- `src/presentation/features/lesson/` に配置

### Step 3: MarkdownRenderer.tsx の更新
- remarkGfm をインポート
- MermaidDiagram をインポート
- code コンポーネントに Mermaid検出ロジックを追加
- **既存のTailwindクラスとスタイルは維持**

### Step 4: 動作確認
```bash
npm run dev
```

以下のURLで確認:
- Chapter 8 lesson-8-1: http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-1
  - 複数のMermaid図解が表示されるはず
- Chapter 8 lesson-8-2: http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-2
- Chapter 8 lesson-8-3: http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-3

### Step 5: TypeScript型チェック
```bash
npx tsc --noEmit
```
- 型エラー: 0件

### Step 6: テスト実行
```bash
npm test
```
- 新しい失敗が追加されていないこと

## Definition of Done

- [ ] mermaid, remark-gfm パッケージがインストールされている
- [ ] MermaidDiagram.tsx が作成されている
- [ ] MarkdownRenderer.tsx が更新されている
- [ ] Chapter 8の14個のMermaid図解がすべて表示される
- [ ] Ticket 014のMarkdownRenderer改善が維持されている
- [ ] TypeScript型エラー: 0件
- [ ] テスト: 新しい失敗なし
- [ ] PR作成完了

## 完了報告

作業完了後、以下のコマンドで Boss1 に報告してください:

```bash
./scripts/agent-send.sh boss1 "Ticket 017 - Mermaid図解対応の実装が完了しました。PR #XX を作成しました。Chapter 1-8の全レッスンでMermaid図解が正しく表示されます。"
```
