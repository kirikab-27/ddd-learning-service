# Ticket 012: Chapter 6 - エンティティ（拡充）

## Goal
Chapter 6「エンティティ」のコンテンツを拡充する。
現在 lesson-6-1 のみ存在するが、ロードマップに従い 3 レッスン構成に拡充する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第2部 Chapter 6）
- §3.2: 各チャプターの構成

要件定義書より:
> Chapter 6: エンティティ
> └── 同一性、ライフサイクル、TypeScriptでの実装

## Scope

### In Scope
- Chapter 6 の lesson-6-2, lesson-6-3 を新規作成
- 既存の lesson-6-1 のコンテンツを必要に応じて調整
- 各レッスンのクイズ作成（新規レッスン分: 5問×2 = 10問）
- sampleLessons.ts / sampleQuizzes.ts の更新

### Out of Scope
- Chapter 7 以降の作成
- 既存クイズの修正

## Chapter 6 レッスン構成

| Lesson ID | タイトル | 内容 | 状態 |
|-----------|---------|------|------|
| lesson-6-1 | エンティティとは | 同一性、ライフサイクル | 既存（調整） |
| lesson-6-2 | 識別子の設計 | UUID、自然キー、代理キー | 新規 |
| lesson-6-3 | エンティティの実装 | TypeScriptでの実装パターン | 新規 |

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 012-frontend1 | Chapter 6 コンテンツ拡充 | なし |
| Quality | 012-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: Chapter 6 コンテンツ拡充

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] Lesson 6-1 の内容が確認・調整されている
- [ ] Lesson 6-2, 6-3 のコンテンツが作成されている
- [ ] 新規レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter6Lessons が更新されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-6 が更新されている
- [ ] `/courses/ddd-practice` で Chapter 6 が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- 既存の lesson-6-1 は参考にしつつ、必要に応じて調整
- Chapter 6 は第2部（戦術的設計パターン）の2番目の章
- Chapter 5（値オブジェクト）との対比を意識したコンテンツにする
- Boss1は完了後に `runs/012/REPORT.md` を作成すること
