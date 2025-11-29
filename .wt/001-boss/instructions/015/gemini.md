# Ticket 015: Gemini - レイアウト改善の全ページ適用確認

## 担当タスク

Ticket 014で実装されたMarkdownRenderer.tsxのスタイル改善が、全20レッスンで一貫して適用されているかを確認する。

## 確認対象レッスン

### Chapter 1: ドメイン駆動設計とは（3レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-1/lesson-1-1
- http://localhost:3000/courses/ddd-practice/chapter-1/lesson-1-2
- http://localhost:3000/courses/ddd-practice/chapter-1/lesson-1-3

### Chapter 2: ユビキタス言語（3レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-2/lesson-2-1
- http://localhost:3000/courses/ddd-practice/chapter-2/lesson-2-2
- http://localhost:3000/courses/ddd-practice/chapter-2/lesson-2-3

### Chapter 3: 境界づけられたコンテキスト（3レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-3/lesson-3-1
- http://localhost:3000/courses/ddd-practice/chapter-3/lesson-3-2
- http://localhost:3000/courses/ddd-practice/chapter-3/lesson-3-3

### Chapter 4: コンテキストマップ（2レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-4/lesson-4-1
- http://localhost:3000/courses/ddd-practice/chapter-4/lesson-4-2

### Chapter 5: 値オブジェクト（3レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-5/lesson-5-1
- http://localhost:3000/courses/ddd-practice/chapter-5/lesson-5-2
- http://localhost:3000/courses/ddd-practice/chapter-5/lesson-5-3

### Chapter 6: エンティティ（3レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-6/lesson-6-1
- http://localhost:3000/courses/ddd-practice/chapter-6/lesson-6-2
- http://localhost:3000/courses/ddd-practice/chapter-6/lesson-6-3

### Chapter 7: ドメインサービス（3レッスン）
- http://localhost:3000/courses/ddd-practice/chapter-7/lesson-7-1
- http://localhost:3000/courses/ddd-practice/chapter-7/lesson-7-2
- http://localhost:3000/courses/ddd-practice/chapter-7/lesson-7-3

**合計**: 20レッスン

## 確認項目

各レッスンで以下の要素が Ticket 014 で改善されたスタイルで表示されているかを確認:

### 1. 見出し（Headings）
- [ ] H1: `text-4xl`, 大きく明確
- [ ] H2: `text-3xl`, `border-bottom` あり
- [ ] H3: `text-2xl`, 適切な余白
- [ ] H4: `text-xl`, 適切な余白
- [ ] 見出しの階層が視覚的に明確

### 2. 段落（Paragraphs）
- [ ] 行間がゆったりしている（`leading-8`）
- [ ] 段落間の余白が適切（`my-6`）
- [ ] 読みやすい

### 3. コードブロック
- [ ] 背景が `slate-900`
- [ ] border と rounded-lg が適用されている
- [ ] shadow-xl で立体感がある
- [ ] padding が適切（`1.5rem`）
- [ ] シンタックスハイライトが適切
- [ ] フォントサイズが読みやすい（`0.95rem`）

### 4. インラインコード
- [ ] 背景が `slate-800`
- [ ] テキストが `pink-400`
- [ ] padding が適切（`px-2`, `py-1`）
- [ ] rounded で角が丸い
- [ ] 通常テキストと明確に区別される

### 5. リスト
- [ ] 項目間の余白が適切（`space-y-2`）
- [ ] リスト全体の余白が適切（`my-6`）
- [ ] 階層構造が分かりやすい

### 6. テーブル
- [ ] セルに padding がある（`px-4`, `py-3`）
- [ ] ヘッダーが `slate-800` 背景
- [ ] border が適用されている
- [ ] 整然と表示されている

### 7. 引用（Blockquote）
- [ ] 左に青いボーダー（`border-l-4`, `border-l-blue-500`）
- [ ] 背景が `slate-800/50`
- [ ] padding が適切（`pl-6`, `py-4`）
- [ ] 右角が丸い（`rounded-r`）
- [ ] italic スタイル
- [ ] 視覚的に区別される

### 8. リンク
- [ ] テキストが `blue-400`
- [ ] underline なし（デフォルト）
- [ ] hover で `blue-300` に変わる
- [ ] hover で underline が表示される

### 9. 全体的な一貫性
- [ ] すべてのレッスンで同じスタイルが適用されている
- [ ] スタイルの崩れがない
- [ ] レスポンシブ対応（モバイル・タブレット・デスクトップ）

## 確認手順

1. **開発サーバーが起動していることを確認**
   ```bash
   # http://localhost:3000 が利用可能か確認
   curl http://localhost:3000
   ```

2. **各レッスンURLにアクセス**
   - 上記20レッスンのURLを順番に開く
   - ブラウザは Chrome または Firefox を推奨

3. **各確認項目をチェック**
   - 見出し、段落、コード、リストなど全要素を確認
   - スタイルの一貫性を確認

4. **問題を発見した場合**
   - レッスンURL
   - 問題の要素（見出し、コード、テーブルなど）
   - 具体的な問題内容（スタイルが適用されていない、崩れているなど）
   - スクリーンショット（可能であれば）

5. **レスポンシブ確認（オプション）**
   - Chrome DevTools でデバイスエミュレーション
   - モバイル（320px-767px）
   - タブレット（768px-1023px）
   - デスクトップ（1024px以上）

## 報告方法

### 問題がない場合（すべてのレッスンで正しくスタイルが適用されている）
```
./scripts/agent-send.sh boss "[Gemini完了] Ticket 015 - PASS。全20レッスンでMarkdownRenderer.tsxのスタイル改善が一貫して適用されています。見出し、コードブロック、リスト、テーブル、引用など、すべての要素が正しく表示されています。"
```

### 問題がある場合（スタイルの問題を発見した）
```
./scripts/agent-send.sh boss "[Gemini] Ticket 015 - 問題発見。以下のレッスンでスタイルの問題があります:
- Lesson X-Y (URL): [具体的な問題内容]
- Lesson A-B (URL): [具体的な問題内容]
詳細: [問題の詳しい説明]"
```

## 注意事項

- **HOTFIX（全レッスンアンロック）**: 現在すべてのレッスンがアンロックされているため、順番に関係なくアクセス可能です
- **開発サーバー**: http://localhost:3000 が起動していることを確認してください
- **ブラウザキャッシュ**: 問題が見られる場合は、ブラウザの強制リロード（Ctrl+Shift+R / Cmd+Shift+R）を試してください

## Definition of Done

- [ ] 全20レッスンの確認完了
- [ ] スタイルの一貫性確認完了
- [ ] Boss1に報告完了
