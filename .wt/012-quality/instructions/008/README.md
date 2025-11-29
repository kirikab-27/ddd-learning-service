# Ticket 008: Chapter 3 - 境界づけられたコンテキスト

## Goal
Chapter 3「境界づけられたコンテキスト」のコンテンツを作成する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応
- docs/CONTENT_ROADMAP.md Phase 1, Ticket 008

## Scope

### In Scope
- Chapter 3 コンテンツ作成（3レッスン）
- Chapter 3 クイズ作成（各レッスン5問、計15問）
- sampleCourses.ts への Chapter 3 追加

### Out of Scope
- Chapter 4 の作成（後続チケット）
- UI変更

## Task Assignment

| Worker | Worktree | 担当領域 |
|--------|----------|----------|
| Frontend1 | 008-frontend1 | Chapter 3 コンテンツ作成 |
| Quality | 008-quality | テスト・品質レビュー |

## Execution Order

```
Phase A: コンテンツ作成
└── Frontend1: Chapter 3 コンテンツ作成

Phase B: 品質保証
├── Boss1: Frontend1 のPRをマージ
└── Quality: 全画面テスト・レビュー
```

## Chapter 3: 境界づけられたコンテキスト

| Lesson ID | タイトル | 内容 |
|-----------|---------|------|
| lesson-3-1 | コンテキストとは何か | コンテキストの定義、境界の意味 |
| lesson-3-2 | コンテキストの見つけ方 | 分析パターン、境界の決め方 |
| lesson-3-3 | コンテキスト間の関係 | 上流/下流、共有カーネル、腐敗防止層 |

## Definition of Done

- [ ] Chapter 3 の3レッスンが作成されている
- [ ] 各レッスンに5問のクイズが追加されている（計15問）
- [ ] sampleLessons.ts に chapter3Lessons が追加されている
- [ ] sampleCourses.ts に Chapter 3 が接続されている
- [ ] /courses/ddd-practice でChapter 3 が表示される
- [ ] レッスン・クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes
- Tailwind CSS必須（CSS Modules禁止）
- Ticket 006, 007 の実装パターンを参考にすること
- Boss1は完了後に `runs/008/REPORT.md` を作成すること
