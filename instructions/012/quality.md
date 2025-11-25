# Quality: テスト・品質レビュー

## Task Overview
Ticket 012 の成果物（Chapter 6 コンテンツ拡充）の品質を検証する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 検証項目

### 1. コンテンツ検証

- [ ] lesson-6-1「エンティティとは」が存在・内容確認
- [ ] lesson-6-2「識別子の設計」が存在
- [ ] lesson-6-3「エンティティの実装」が存在
- [ ] 各レッスンに概要、コード例、まとめがある
- [ ] Chapter 5（値オブジェクト）との対比が明確
- [ ] quiz-lesson-6-1〜6-3 が各5問存在

### 2. 画面表示テスト

- [ ] `/courses/ddd-practice` で Chapter 6 が表示される
- [ ] Chapter 6 の order が 6 である
- [ ] 3レッスンが正しい順序で表示される
- [ ] 各レッスンページが正常に表示される
- [ ] 各クイズが正常に動作する

### 3. データ整合性

- [ ] chapter6Lessons がエクスポートされている
- [ ] sampleCourses.ts に Chapter 6 が追加されている
- [ ] Chapter の order が正しい（6）
- [ ] レッスン数が正しい（現在16 → 19に増加）

### 4. テスト実行

```bash
npm run test
npm run type-check
```

### 5. completionRate 確認

レッスン数が 16 → 19 に増加するため、Integration Test の completionRate 期待値が正しいか確認:

- 1レッスン完了: 5.26%（1/19）
- 2レッスン完了: 10.53%（2/19）

必要に応じて Hotfix を実施。

## Definition of Done

- [ ] 全検証項目がパス
- [ ] 全テストがパス
- [ ] completionRate が正しい（必要に応じて Hotfix）

## Communication

```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 012 品質検証完了。"
```
