# Ticket 013: Chapter 7 - ドメインサービス（新規作成）

## Goal
Chapter 7「ドメインサービス」を新規作成する。
ロードマップに従い 2 レッスン構成で実装する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第2部 Chapter 7）
- §3.2: 各チャプターの構成

要件定義書より:
> Chapter 7: ドメインサービス
> └── エンティティや値オブジェクトに属さないビジネスロジック

## Scope

### In Scope
- Chapter 7 の lesson-7-1, lesson-7-2 を新規作成
- 各レッスンのクイズ作成（5問×2 = 10問）
- sampleLessons.ts / sampleQuizzes.ts の更新
- sampleCourses.ts への Chapter 7 追加

### Out of Scope
- Chapter 8 以降の作成
- 既存チャプターの修正

## Chapter 7 レッスン構成

| Lesson ID | タイトル | 内容 | 状態 |
|-----------|---------|------|------|
| lesson-7-1 | ドメインサービスとは | 定義、使用場面、エンティティとの違い | 新規 |
| lesson-7-2 | ドメインサービスの実装 | 実装パターン、依存関係、アプリケーションサービスとの違い | 新規 |

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 013-frontend1 | Chapter 7 コンテンツ作成 | なし |
| Quality | 013-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: Chapter 7 コンテンツ作成

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] Lesson 7-1, 7-2 のコンテンツが作成されている
- [ ] 各レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter7Lessons が追加されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts に Chapter 7 が追加されている
- [ ] `/courses/ddd-practice` で Chapter 7 が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- Chapter 7 は第2部（戦術的設計パターン）の3番目の章
- エンティティ・値オブジェクトとの対比を明確にする
- 実践的なコード例を豊富に含める
- Boss1は完了後に `runs/013/REPORT.md` を作成すること
