# Quality: 全レッスンページの確認

## Task Overview
Gemini が実装したレイアウト改善が全レッスンページに正しく適用されていることを確認する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 確認手順

### 1. 開発サーバーの起動確認

```bash
# サーバーが起動していることを確認
curl http://localhost:3000
```

### 2. 全レッスンの確認

以下のURLを順番に開き、スタイルを確認:

#### Chapter 1（3レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-2
http://localhost:3000/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-3
```

#### Chapter 2（3レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-2
http://localhost:3000/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-3
```

#### Chapter 3（3レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-3/lessons/lesson-3-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-3/lessons/lesson-3-2
http://localhost:3000/courses/ddd-practice/chapters/chapter-3/lessons/lesson-3-3
```

#### Chapter 4（2レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-4/lessons/lesson-4-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-4/lessons/lesson-4-2
```

#### Chapter 5（3レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-5/lessons/lesson-5-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-5/lessons/lesson-5-2
http://localhost:3000/courses/ddd-practice/chapters/chapter-5/lessons/lesson-5-3
```

#### Chapter 6（3レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-6/lessons/lesson-6-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-6/lessons/lesson-6-2
http://localhost:3000/courses/ddd-practice/chapters/chapter-6/lessons/lesson-6-3
```

#### Chapter 7（3レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-7/lessons/lesson-7-1
http://localhost:3000/courses/ddd-practice/chapters/chapter-7/lessons/lesson-7-2
http://localhost:3000/courses/ddd-practice/chapters/chapter-7/lessons/lesson-7-3
```

#### Chapter 8（1レッスン）
```
http://localhost:3000/courses/ddd-practice/chapters/chapter-8/lessons/lesson-8-1
```

### 3. 各レッスンでの確認項目

| 要素 | 期待される表示 | 確認 |
|------|--------------|------|
| H1 | 表示されない（重複削除） | ✅/❌ |
| H2 | text-2xl、太字、上12下6マージン、下ボーダー | ✅/❌ |
| H3 | text-xl、太字、上10下4マージン | ✅/❌ |
| 段落 | 下6マージン、行間広い | ✅/❌ |
| リスト | 項目間スペース（space-y-2） | ✅/❌ |
| コードブロック | 上6下8マージン、シンタックスハイライト | ✅/❌ |
| テーブル | ボーダー、背景色、ホバー効果 | ✅/❌ |
| 引用 | 左青ボーダー、背景色 | ✅/❌ |
| インラインコード | 背景色、パディング、角丸 | ✅/❌ |

### 4. レスポンシブ確認

各画面サイズで3〜5レッスンをサンプリング確認:

```bash
# デスクトップ（1920px）
# タブレット（768px）
# モバイル（375px）
```

確認項目:
- [ ] テキストが読める
- [ ] コードブロックが横スクロール可能
- [ ] テーブルが横スクロール可能
- [ ] レイアウト崩れなし

### 5. remarkGfm 動作確認

テーブルを含むレッスンで確認:
- [ ] Chapter 3-1（コンテキストの例）
- [ ] Chapter 4-2（統合パターン一覧）
- [ ] Chapter 5-1（値オブジェクトの使用場面）
- [ ] Chapter 6-1（エンティティ vs 値オブジェクト）
- [ ] Chapter 7-2（ドメインサービス vs アプリケーションサービス）

### 6. 問題がある場合の対応

問題を発見した場合:

1. **スクリーンショットを撮影**
2. **問題の詳細を記録**:
   - レッスンID
   - 問題の要素（H2、テーブルなど）
   - 期待される表示
   - 実際の表示
3. **修正が必要か判断**
4. **必要に応じて修正実施**

## Definition of Done

- [ ] 全18レッスンの確認完了
- [ ] スタイルチェックリスト全項目確認
- [ ] remarkGfm によるテーブルが正しく表示
- [ ] レスポンシブ対応確認完了
- [ ] 問題があれば修正完了
- [ ] 全テストがパス

## テスト実行

```bash
npm run test
npm run type-check
```

## Communication

```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 015 全レッスンページ確認完了。Gemini実装が正しく適用されています。"
```

または問題がある場合:

```bash
./scripts/agent-send.sh boss1 "[ISSUE] Ticket 015 確認中に問題を発見しました。[問題の詳細]"
```

## Reference

- Gemini実装: `src/presentation/features/lesson/MarkdownRenderer.tsx`
- レッスン一覧: `/courses/ddd-practice`
