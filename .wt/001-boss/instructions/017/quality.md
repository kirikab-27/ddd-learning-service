# Ticket 017: Quality - Mermaid図解対応のレビュー

## 担当タスク

Frontend1が実装したMermaid図解対応をレビューし、品質を確認する。

## レビュー項目

### 1. ファイル構成確認

#### 新規ファイル
- [ ] `src/presentation/features/lesson/MermaidDiagram.tsx` が作成されている

#### 更新ファイル
- [ ] `src/presentation/features/lesson/MarkdownRenderer.tsx` が更新されている
- [ ] `package.json` が更新されている
- [ ] `package-lock.json` が更新されている

### 2. 依存関係確認

```bash
cat package.json | grep -E "(mermaid|remark-gfm)"
```

- [ ] `"mermaid"` パッケージが追加されている
- [ ] `"remark-gfm"` パッケージが追加されている

### 3. MermaidDiagram コンポーネント確認

**必須要素**:
- [ ] `'use client'` ディレクティブがある
- [ ] `mermaid.initialize()` でダークテーマ設定がある
- [ ] `suppressHydrationWarning` が使用されている
- [ ] TypeScript型定義が適切

**スタイリング**:
- [ ] Tailwind CSS のみ使用（CSS Modules なし）
- [ ] 上下の余白が適切（`my-6` など）
- [ ] 中央揃え（`flex justify-center` など）

### 4. MarkdownRenderer 更新確認

#### インポート
- [ ] `import remarkGfm from 'remark-gfm'` がある
- [ ] `import { MermaidDiagram } from './MermaidDiagram'` がある

#### ReactMarkdown
- [ ] `remarkPlugins={[remarkGfm]}` が追加されている
- [ ] `code` コンポーネントに Mermaid検出ロジックがある
  - `language === 'mermaid'` で判定
  - `<MermaidDiagram chart={...} />` を返す

#### Ticket 014 改善の維持
- [ ] **既存のTailwindクラスが維持されている**
  - prose, headings, code, lists, tables, blockquotes, links
- [ ] **SyntaxHighlighter の customStyle が維持されている**
  - padding, fontSize, lineHeight, borderRadius

### 5. 技術確認

#### TypeScript型チェック
```bash
cd /mnt/c/Users/masas/Documents/Projects/ddd-learning-service
npx tsc --noEmit
```
- [ ] 型エラー: 0件

#### テスト実行
```bash
npm test
```
- [ ] 新しい失敗が追加されていない
- [ ] 期待結果: 322 passed / 8 failed (330 total) またはそれ以上

### 6. ブラウザ確認

#### 開発サーバー起動
```bash
npm run dev
```

#### Chapter 8 確認（優先）
Chapter 8には14個のMermaid図解があります:

**lesson-8-1**: http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-1
- [ ] Mermaid図解が図として表示される（生のコードではない）
- [ ] 複数の図解が正しく表示される
- [ ] コードブロック（TypeScript）も正しく表示される

**lesson-8-2**: http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-2
- [ ] Mermaid図解が図として表示される
- [ ] シーケンス図が正しく表示される

**lesson-8-3**: http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-3
- [ ] Mermaid図解が図として表示される
- [ ] フローチャートが正しく表示される

#### 他のChapter確認（サンプル）
Mermaid図解が含まれる他のレッスンも確認:

- [ ] Chapter 1-7でMermaid図解があれば表示される
- [ ] 既存のレッスンが壊れていない

### 7. スタイル確認

- [ ] Mermaid図解がダークテーマで表示される
- [ ] 図解が中央揃えで表示される
- [ ] 図解の上下に適切な余白がある
- [ ] コードブロックのスタイルが Ticket 014 の改善を維持している

### 8. レスポンシブ確認（オプション）

Chrome DevTools でデバイスエミュレーション:
- [ ] モバイル（320px-767px）: 図解が見やすい
- [ ] タブレット（768px-1023px）: 図解が見やすい
- [ ] デスクトップ（1024px以上）: 図解が見やすい

## 問題がある場合の対応

### 型エラーがある場合
```bash
./scripts/agent-send.sh boss1 "[Quality] Ticket 017 - TypeScript型エラーが X 件あります。Frontend1に修正を依頼してください。詳細: [エラー内容]"
```

### Mermaid図解が表示されない場合
```bash
./scripts/agent-send.sh boss1 "[Quality] Ticket 017 - Mermaid図解が表示されません。問題: [具体的な問題]。Frontend1に修正を依頼してください。"
```

### Ticket 014の改善が失われている場合
```bash
./scripts/agent-send.sh boss1 "[Quality] Ticket 017 - Ticket 014のMarkdownRenderer改善が失われています。Frontend1に修正を依頼してください。"
```

## 問題がない場合の対応

### PRマージ
```bash
cd /mnt/c/Users/masas/Documents/Projects/ddd-learning-service
gh pr merge [PR番号] --merge
```

### Boss1に報告
```bash
./scripts/agent-send.sh boss1 "[Quality完了] Ticket 017 - 品質レビュー完了。PR#XX マージ済み。Mermaid図解対応が正しく実装されています。Chapter 1-8の全レッスンでMermaid図解が正常に表示されます。TypeScript型エラー: 0件。テスト: XXX passed / XXX failed (XXX total)。"
```

## 重要な注意事項

### Ticket 014 改善の維持
- MarkdownRenderer.tsx の Tailwind クラスが変更されていないこと
- SyntaxHighlighter の customStyle が維持されていること
- Ticket 014で改善されたスタイルが壊れていないこと

### 新しい失敗の確認
- テスト結果: 322 passed / 8 failed（既知の問題）
- これより悪化していなければOK
- 新しい失敗があれば、Frontend1に修正を依頼

## Definition of Done

- [ ] すべてのレビュー項目を確認
- [ ] Chapter 8の14個のMermaid図解がすべて表示される
- [ ] Ticket 014の改善が維持されている
- [ ] TypeScript型エラー: 0件
- [ ] テスト: 新しい失敗なし
- [ ] 問題がある場合はFrontend1にフィードバック
- [ ] 問題がない場合はPRをマージ
- [ ] Boss1に完了報告
