# Quality: テスト・品質レビュー

## Task Overview
Ticket 008 の成果物（Chapter 3 コンテンツ）の品質を検証する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 検証項目

### 1. コンテンツ検証

- [ ] lesson-3-1「コンテキストとは何か」が存在
- [ ] lesson-3-2「コンテキストの見つけ方」が存在
- [ ] lesson-3-3「コンテキスト間の関係」が存在
- [ ] 各レッスンに概要、コード例、まとめがある
- [ ] quiz-lesson-3-1〜3-3 が各5問存在

### 2. 画面表示テスト

- [ ] `/courses/ddd-practice` で Chapter 3 が表示される
- [ ] 各レッスンページが正常に表示される
- [ ] 各クイズが正常に動作する

### 3. データ整合性

- [ ] chapter3Lessons がエクスポートされている
- [ ] sampleCourses.ts に Chapter 3 が追加されている
- [ ] Chapter の order が正しい（3）

### 4. テスト実行

```bash
npm run test
npm run type-check
```

## Definition of Done

- [ ] 全検証項目がパス
- [ ] 全テストがパス

## Communication

```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 008 品質検証完了。"
```
