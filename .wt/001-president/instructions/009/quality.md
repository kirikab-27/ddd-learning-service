# Quality: テスト・品質レビュー

## Task Overview
Ticket 009 の成果物（Chapter 4 コンテンツ）の品質を検証する。
**このチケット完了で第1部（MVP Phase 1）が完成となる。**

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 検証項目

### 1. コンテンツ検証

- [ ] lesson-4-1「コンテキストマップとは」が存在
- [ ] lesson-4-2「統合パターン」が存在
- [ ] 各レッスンに概要、図解、コード例、まとめがある
- [ ] quiz-lesson-4-1〜4-2 が各5問存在

### 2. 画面表示テスト

- [ ] `/courses/ddd-practice` で Chapter 4 が表示される
- [ ] Chapter 4 の order が 4 である
- [ ] 各レッスンページが正常に表示される
- [ ] 各クイズが正常に動作する

### 3. データ整合性

- [ ] chapter4Lessons がエクスポートされている
- [ ] sampleCourses.ts に Chapter 4 が追加されている
- [ ] Chapter の order が正しい（4）
- [ ] 第1部（Chapter 1-4）がすべて揃っている

### 4. 第1部完成確認

- [ ] Chapter 1: ドメインとは何か（3レッスン）
- [ ] Chapter 2: ユビキタス言語（3レッスン）
- [ ] Chapter 3: 境界づけられたコンテキスト（3レッスン）
- [ ] Chapter 4: コンテキストマップ（2レッスン）
- [ ] 合計11レッスン、合計41問のクイズ

### 5. テスト実行

```bash
npm run test
npm run type-check
```

## Definition of Done

- [ ] 全検証項目がパス
- [ ] 全テストがパス
- [ ] 第1部（MVP Phase 1）が完成していることを確認

## Communication

```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 009 品質検証完了。第1部（MVP Phase 1）が完成しました。"
```
