# Ticket 007: Chapter 2 - ユビキタス言語

## Goal
Chapter 2「ユビキタス言語」のコンテンツを作成する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応
- docs/CONTENT_ROADMAP.md Phase 1, Ticket 007

## Scope

### In Scope
- Chapter 2 コンテンツ作成（3レッスン）
- Chapter 2 クイズ作成（各レッスン5問、計15問）
- sampleCourses.ts への Chapter 2 追加

### Out of Scope
- Chapter 3-4 の作成（後続チケット）
- UI変更

## Task Assignment

| Worker | Worktree | 担当領域 |
|--------|----------|----------|
| Frontend1 | 007-frontend1 | Chapter 2 コンテンツ作成 |
| Quality | 007-quality | テスト・品質レビュー |

## Execution Order

```
Phase A: コンテンツ作成
└── Frontend1: Chapter 2 コンテンツ作成

Phase B: 品質保証
├── Boss1: Frontend1 のPRをマージ
└── Quality: 全画面テスト・レビュー
```

## Chapter 2: ユビキタス言語

| Lesson ID | タイトル | 内容 |
|-----------|---------|------|
| lesson-2-1 | ユビキタス言語とは | 共通言語の重要性、言語の不一致による問題 |
| lesson-2-2 | チームで共通言語を作る | 用語集の作成、モデリングワークショップ |
| lesson-2-3 | コードに反映する | 命名規則、ドメイン用語のコード化 |

## Definition of Done

- [ ] Chapter 2 の3レッスンが作成されている
- [ ] 各レッスンに5問のクイズが追加されている（計15問）
- [ ] sampleLessons.ts に chapter2Lessons が追加されている
- [ ] sampleCourses.ts に Chapter 2 が接続されている
- [ ] /courses/ddd-practice でChapter 2 が表示される
- [ ] レッスン・クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes
- Tailwind CSS必須（CSS Modules禁止）
- Ticket 006 の chapter1Lessons 実装パターンを参考にすること
- Boss1は完了後に `runs/007/REPORT.md` を作成すること
