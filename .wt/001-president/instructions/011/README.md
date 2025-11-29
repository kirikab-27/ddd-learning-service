# Ticket 011: Chapter 5 - 値オブジェクト（拡充）

## Goal
Chapter 5「値オブジェクト」のコンテンツを拡充する。
現在 lesson-5-1 のみ存在するが、ロードマップに従い 3 レッスン構成に拡充する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第2部 Chapter 5）
- §3.2: 各チャプターの構成

要件定義書より:
> Chapter 5: 値オブジェクト
> └── 不変性、等価性、TypeScriptでの実装

## Scope

### In Scope
- Chapter 5 の lesson-5-2, lesson-5-3 を新規作成
- 既存の lesson-5-1 のコンテンツを必要に応じて調整
- 各レッスンのクイズ作成（新規レッスン分: 5問×2 = 10問）
- sampleLessons.ts / sampleQuizzes.ts の更新

### Out of Scope
- Chapter 6 以降の作成
- 既存クイズの修正

## Chapter 5 レッスン構成

| Lesson ID | タイトル | 内容 | 状態 |
|-----------|---------|------|------|
| lesson-5-1 | 値オブジェクトとは | 不変性、等価性の概念 | 既存（調整） |
| lesson-5-2 | 値オブジェクトの実装 | TypeScriptでの実装パターン | 新規 |
| lesson-5-3 | 自己検証と不変条件 | バリデーションの配置、ファクトリメソッド | 新規 |

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 011-frontend1 | Chapter 5 コンテンツ拡充 | なし |
| Quality | 011-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: Chapter 5 コンテンツ拡充

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] Lesson 5-1 の内容が確認・調整されている
- [ ] Lesson 5-2, 5-3 のコンテンツが作成されている
- [ ] 新規レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter5Lessons が更新されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-5 が更新されている
- [ ] `/courses/ddd-practice` で Chapter 5 が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- 既存の lesson-5-1 は参考にしつつ、必要に応じて調整
- Chapter 5 は第2部（戦術的設計パターン）の最初の章
- Boss1は完了後に `runs/011/REPORT.md` を作成すること
