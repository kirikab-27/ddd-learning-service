# Ticket 013: Chapter 7 ドメインサービス作成

## Goal
Chapter 7「ドメインサービス」を3レッスン構成で作成する（Phase 2 継続）。

## 現状
- Chapter 7: 未実装

## 目標
- Chapter 7: 3レッスン構成を新規作成

| Lesson | タイトル | 内容 |
|--------|---------|------|
| 7-1 | ドメインサービスとは | ドメインサービスの定義、使いどころ（新規） |
| 7-2 | ドメインサービスの実装 | TypeScriptでの実装パターン（新規） |
| 7-3 | ドメインサービスのアンチパターン | 肥大化の防止、責務の適切な配置（新規） |

## Scope

### In Scope
- lesson-7-1, lesson-7-2, lesson-7-3 の新規作成
- 各レッスンのクイズ作成（5問×3 = 15問）
- sampleLessons.ts, sampleQuizzes.ts, sampleCourses.ts の更新

### Out of Scope
- 他のChapterの変更

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 013-frontend1 | Chapter 7 コンテンツ作成 | なし |
| Quality | 013-quality | 品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: コンテンツ作成
└── Frontend1: Chapter 7 レッスン作成

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に存在
- [ ] chapter7Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズ（計15問）
- [ ] sampleCourses.ts で chapter7 を追加
- [ ] 型エラーがない
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Phase 2 進捗

```
第2部: 戦術的設計パターン
├── Chapter 5: 値オブジェクト ✅ 完了
├── Chapter 6: エンティティ ✅ 完了
├── Chapter 7: ドメインサービス ★このチケット
├── Chapter 8: 集約
├── Chapter 9: リポジトリ
├── Chapter 10: ファクトリ
└── Chapter 11: 仕様パターン
```
