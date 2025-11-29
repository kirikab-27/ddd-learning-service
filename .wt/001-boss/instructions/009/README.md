# Ticket 009: Chapter 4 コンテキストマップ

## Goal
Chapter 4「コンテキストマップ」のコンテンツを作成し、第1部（MVP Phase 1）を完成させる。

## Scope

### In Scope
- Chapter 4 のレッスンコンテンツ作成（2レッスン）
- 各レッスンのクイズ作成（5問×2 = 10問）
- sampleLessons.ts, sampleQuizzes.ts, sampleCourses.ts の更新

### Out of Scope
- 第2部以降のコンテンツ
- 機能追加・UI変更

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 009-frontend1 | Chapter 4 コンテンツ作成 | なし |
| Quality | 009-quality | 品質レビュー | Frontend1完了後 |

## Chapter 4: コンテキストマップ

| Lesson | タイトル | 内容 |
|--------|---------|------|
| 4-1 | コンテキストマップとは | マップの目的、視覚化の重要性 |
| 4-2 | 統合パターン | パートナーシップ、顧客/供給者、順応者など |

## Execution Order

```
Phase A: コンテンツ作成
└── Frontend1: Chapter 4 コンテンツ

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] 2つのレッスンが sampleLessons.ts に追加されている
- [ ] chapter4Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている（計10問）
- [ ] sampleCourses.ts に Chapter 4 が接続されている
- [ ] 型エラーがない
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## MVP Phase 1 完成条件

Ticket 009 完了により、以下の第1部構成が完成:

```
第1部: DDDの基礎概念（戦略的設計）
├── Chapter 1: ドメインとは何か（3レッスン）
├── Chapter 2: ユビキタス言語（3レッスン）
├── Chapter 3: 境界づけられたコンテキスト（3レッスン）
└── Chapter 4: コンテキストマップ（2レッスン）★このチケット
```
