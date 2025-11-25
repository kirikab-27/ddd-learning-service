# Quality: テスト・品質レビュー

## Task Overview
Ticket 013 の成果物（Chapter 7 ドメインサービス）の品質を検証する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 検証項目

### 1. コンテンツ検証

- [ ] lesson-7-1「ドメインサービスとは」が存在
- [ ] lesson-7-2「ドメインサービスの実装」が存在
- [ ] 各レッスンに概要、コード例、まとめがある
- [ ] エンティティ・値オブジェクトとの対比が明確
- [ ] アプリケーションサービスとの違いが説明されている
- [ ] quiz-lesson-7-1〜7-2 が各5問存在

### 2. 画面表示テスト

- [ ] `/courses/ddd-practice` で Chapter 7 が表示される
- [ ] Chapter 7 の order が 7 である
- [ ] 2レッスンが正しい順序で表示される
- [ ] 各レッスンページが正常に表示される
- [ ] 各クイズが正常に動作する

### 3. データ整合性

- [ ] chapter7Lessons がエクスポートされている
- [ ] sampleCourses.ts に Chapter 7 が追加されている
- [ ] Chapter の order が正しい（7）
- [ ] レッスン数が正しい（18 → 20に増加）

### 4. テスト実行

```bash
npm run test
npm run type-check
```

### 5. completionRate 確認

レッスン数が 18 → 20 に増加するため、Integration Test の completionRate 期待値が正しいか確認:

- 1レッスン完了: 5%（1/20）
- 2レッスン完了: 10%（2/20）

必要に応じて Hotfix を実施。

## Definition of Done

- [ ] 全検証項目がパス
- [ ] 全テストがパス
- [ ] completionRate が正しい（必要に応じて Hotfix）

## Communication

```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 013 品質検証完了。"
```
