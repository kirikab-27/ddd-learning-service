# Ticket 012: Chapter 6 エンティティ拡充

## Goal
Chapter 6「エンティティ」を3レッスン構成で作成する（Phase 2 継続）。

## 現状
- Chapter 6: 未実装

## 目標
- Chapter 6: 3レッスン構成を新規作成

| Lesson | タイトル | 内容 |
|--------|---------|------|
| 6-1 | エンティティとは | 同一性の概念、値オブジェクトとの違い（新規） |
| 6-2 | エンティティの実装 | TypeScriptでの実装パターン、IDの設計（新規） |
| 6-3 | エンティティのライフサイクル | 生成、変更、永続化のパターン（新規） |

## Scope

### In Scope
- lesson-6-1, lesson-6-2, lesson-6-3 の新規作成
- 各レッスンのクイズ作成（5問×3 = 15問）
- sampleLessons.ts, sampleQuizzes.ts, sampleCourses.ts の更新

### Out of Scope
- 他のChapterの変更

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 012-frontend1 | Chapter 6 コンテンツ作成 | なし |
| Quality | 012-quality | 品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: コンテンツ作成
└── Frontend1: Chapter 6 レッスン作成

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に存在
- [ ] chapter6Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズ（計15問）
- [ ] sampleCourses.ts で chapter6 を追加
- [ ] 型エラーがない
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Phase 2 進捗

```
第2部: 戦術的設計パターン
├── Chapter 5: 値オブジェクト ✅ 完了
├── Chapter 6: エンティティ ★このチケット
├── Chapter 7: ドメインサービス
├── Chapter 8: 集約
├── Chapter 9: リポジトリ
├── Chapter 10: ファクトリ
└── Chapter 11: 仕様パターン
```
