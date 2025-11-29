# Quality: テスト・品質レビュー

## Task Overview
Ticket 011 の成果物（Chapter 5 コンテンツ拡充）の品質を検証する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 検証項目

### 1. コンテンツ検証

- [ ] lesson-5-1「値オブジェクトとは」が存在・内容確認
- [ ] lesson-5-2「値オブジェクトの実装」が存在
- [ ] lesson-5-3「自己検証と不変条件」が存在
- [ ] 各レッスンに概要、コード例、まとめがある
- [ ] quiz-lesson-5-1〜5-3 が各5問存在

### 2. 画面表示テスト

- [ ] `/courses/ddd-practice` で Chapter 5 が表示される
- [ ] Chapter 5 の order が 5 である
- [ ] 3レッスンが正しい順序で表示される
- [ ] 各レッスンページが正常に表示される
- [ ] 各クイズが正常に動作する

### 3. データ整合性

- [ ] chapter5Lessons がエクスポートされている
- [ ] sampleCourses.ts に Chapter 5 が追加されている
- [ ] Chapter の order が正しい（5）

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
./scripts/agent-send.sh boss1 "[DONE] Ticket 011 品質検証完了。"
```
