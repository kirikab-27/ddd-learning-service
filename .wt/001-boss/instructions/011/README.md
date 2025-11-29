# Ticket 011: Chapter 5 値オブジェクト拡充

## Goal
Chapter 5「値オブジェクト」を3レッスン構成に拡充する（Phase 2 開始）。

## 現状
- Chapter 5: 1レッスン（lesson-5-1: 値オブジェクト）のみ

## 目標
- Chapter 5: 3レッスン構成に拡充

| Lesson | タイトル | 内容 |
|--------|---------|------|
| 5-1 | 値オブジェクトとは | 不変性、等価性の概念（既存を改善） |
| 5-2 | 値オブジェクトの実装 | TypeScriptでの実装パターン（新規） |
| 5-3 | 自己検証と不変条件 | バリデーションの配置、ファクトリメソッド（新規） |

## Scope

### In Scope
- lesson-5-1 の内容充実（既存コンテンツの拡充）
- lesson-5-2, lesson-5-3 の新規作成
- 各レッスンのクイズ作成（5問×3 = 15問）
- sampleLessons.ts, sampleQuizzes.ts, sampleCourses.ts の更新

### Out of Scope
- 他のChapterの変更

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 011-frontend1 | Chapter 5 コンテンツ拡充 | なし |
| Quality | 011-quality | 品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: コンテンツ作成
└── Frontend1: Chapter 5 レッスン拡充

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に存在
- [ ] chapter5Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズ（計15問）
- [ ] sampleCourses.ts で chapter5Lessons を使用
- [ ] 型エラーがない
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Phase 2 進捗

```
第2部: 戦術的設計パターン
├── Chapter 5: 値オブジェクト ★このチケット
├── Chapter 6: エンティティ
├── Chapter 7: ドメインサービス
├── Chapter 8: 集約
├── Chapter 9: リポジトリ
├── Chapter 10: ファクトリ
└── Chapter 11: 仕様パターン
```
