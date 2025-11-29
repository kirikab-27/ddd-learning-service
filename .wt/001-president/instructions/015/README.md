# Ticket 015: Gemini レイアウト改善の全ページ適用確認

## Goal
Gemini が実装したレイアウト改善（MarkdownRenderer）が全レッスンページに正しく適用されていることを確認し、必要に応じて統一する。

## 背景

Gemini が実装したレイアウト改善:
- カスタムコンポーネントによる各要素のスタイリング
- H1の重複削除（`h1: () => null`）
- remarkGfm によるテーブルレンダリング対応
- セクション間のスペーシング改善

この実装が **Chapter 1 Lesson 1** で確認されており、他のレッスンにも同様に適用されているはずですが、全ページで動作確認が必要です。

## Scope

### In Scope
- 全レッスンページの表示確認（Chapter 1-7）
- MarkdownRenderer の動作確認
- スタイルの一貫性確認
- モバイル/デスクトップでのレスポンシブ確認

### Out of Scope
- 新しいスタイルの追加
- コンテンツの修正
- 他のコンポーネントの変更

## 確認対象レッスン

### Phase 1（戦略的設計）
- [ ] Chapter 1: lesson-1-1, lesson-1-2, lesson-1-3
- [ ] Chapter 2: lesson-2-1, lesson-2-2, lesson-2-3
- [ ] Chapter 3: lesson-3-1, lesson-3-2, lesson-3-3
- [ ] Chapter 4: lesson-4-1, lesson-4-2

### Phase 2（戦術的設計）
- [ ] Chapter 5: lesson-5-1, lesson-5-2, lesson-5-3
- [ ] Chapter 6: lesson-6-1, lesson-6-2, lesson-6-3
- [ ] Chapter 7: lesson-7-1, lesson-7-2, lesson-7-3

### その他
- [ ] Chapter 8: lesson-8-1

## 検証ポイント

### 1. スタイリング確認

各レッスンで以下を確認:

- [ ] **H1**: 表示されない（重複削除）
- [ ] **H2**: `text-2xl font-bold mt-12 mb-6` + ボーダー
- [ ] **H3**: `text-xl font-bold mt-10 mb-4`
- [ ] **段落**: `mb-6 leading-relaxed`
- [ ] **リスト**: `space-y-2` で項目間スペース
- [ ] **コードブロック**: `mt-6 mb-8` でスペース確保
- [ ] **テーブル**: ボーダー、背景色、ホバー効果
- [ ] **引用**: 左ボーダー、背景色

### 2. remarkGfm 動作確認

テーブルを含むレッスンで確認:
- [ ] テーブルが正しくレンダリングされる
- [ ] ヘッダー行が強調表示される
- [ ] 行のホバー効果が動作する

### 3. レスポンシブ確認

- [ ] **デスクトップ** (1920px): レイアウト正常
- [ ] **タブレット** (768px): テーブルが横スクロール可能
- [ ] **モバイル** (375px): テキストが読める

### 4. 一貫性確認

- [ ] 全レッスンで同じスタイルが適用されている
- [ ] 特定のレッスンだけ異なるスタイルになっていない
- [ ] コードブロックの言語が異なっても正しく表示される

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Quality | 015-quality | 全レッスンページ確認 | なし |

## Execution Order

```
Phase A: 確認
└── Quality: 全レッスンページの表示確認・動作確認
```

## 修正が必要な場合

もし特定のレッスンでスタイルが正しく適用されていない場合:

1. MarkdownRenderer.tsx の実装を確認
2. レッスンコンテンツのMarkdown形式を確認
3. 必要に応じて修正を実施

## Definition of Done

- [ ] 全レッスンページ（18レッスン）の確認完了
- [ ] スタイルが一貫して適用されている
- [ ] remarkGfm によるテーブルが正しく表示される
- [ ] レスポンシブ対応が完璧
- [ ] 問題があれば修正完了
- [ ] 全テストがパス

## Notes

- 現在の MarkdownRenderer は Gemini が実装したもの
- Boss1 の Ticket 014 指示とは異なる実装だが、ユーザー承認済み
- シンプルで実用的なアプローチを維持する
- Boss1は完了後に `runs/015/REPORT.md` を作成すること

## Reference

- Gemini 実装計画: `C:\Users\masas\.gemini\antigravity\brain\d4568185-4f88-4d21-86d7-92d297012b0f\implementation_plan.md`
- Gemini ウォークスルー: `walkthrough.md`
- 現在の実装: `src/presentation/features/lesson/MarkdownRenderer.tsx`
