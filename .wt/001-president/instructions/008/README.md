# Ticket 008: Chapter 3 - 境界づけられたコンテキスト

## Goal
Chapter 3「境界づけられたコンテキスト」の学習コンテンツとクイズを作成する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第1部 Chapter 3）
- §3.2: 各チャプターの構成

要件定義書より:
> Chapter 3: 境界づけられたコンテキスト
> └── システムを分割する単位、コンテキストの見つけ方

## Scope

### In Scope
- Chapter 3「境界づけられたコンテキスト」のレッスン作成（3レッスン）
- 各レッスンのクイズ作成（5問×3 = 15問）
- sampleLessons.ts / sampleQuizzes.ts / sampleCourses.ts の更新

### Out of Scope
- Chapter 4 の作成（Ticket 009 で対応）
- 既存 Chapter の修正

## Chapter 3 レッスン構成

| Lesson ID | タイトル | 内容 |
|-----------|---------|------|
| lesson-3-1 | コンテキストとは何か | コンテキストの定義、境界の意味 |
| lesson-3-2 | コンテキストの見つけ方 | 分析パターン、境界の決め方 |
| lesson-3-3 | コンテキスト間の関係 | 上流/下流、共有カーネル、腐敗防止層 |

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 008-frontend1 | Chapter 3 コンテンツ作成 | なし |
| Quality | 008-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: Chapter 3 コンテンツ作成

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Technical Requirements

### レッスン内容詳細

#### Lesson 3-1: コンテキストとは何か

**学習目標:**
- 境界づけられたコンテキストの定義を理解する
- なぜコンテキストが必要なのかを理解する
- コンテキストの境界の意味を理解する

**コンテンツ構成:**
- 境界づけられたコンテキストの定義
- 同じ言葉が異なる意味を持つ例
- コンテキストの境界がないときの問題
- コード例: コンテキストごとのモデル

#### Lesson 3-2: コンテキストの見つけ方

**学習目標:**
- コンテキストを識別する方法を学ぶ
- 境界の決め方を理解する
- 組織構造との関係を理解する

**コンテンツ構成:**
- コンテキストを見つける手がかり
- ビジネスプロセスからの分析
- 組織構造とコンテキストの関係
- 実践例: ECサイトのコンテキスト分割

#### Lesson 3-3: コンテキスト間の関係

**学習目標:**
- コンテキスト間の関係パターンを理解する
- 適切な統合パターンを選択できる
- 腐敗防止層の役割を理解する

**コンテンツ構成:**
- 上流/下流の関係
- 共有カーネル
- 顧客/供給者
- 腐敗防止層（ACL）
- コード例: 腐敗防止層の実装

### ファイル構成

```
src/infrastructure/data/
├── sampleLessons.ts  # chapter3Lessons を追加
├── sampleQuizzes.ts  # quiz-lesson-3-1〜3-3 を追加
└── sampleCourses.ts  # chapter-3 に lessons を接続
```

## Definition of Done

- [ ] Lesson 3-1, 3-2, 3-3 のコンテンツが作成されている
- [ ] 各レッスンのクイズ（5問×3）が作成されている
- [ ] sampleLessons.ts に chapter3Lessons が追加されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-3 に lessons が接続されている
- [ ] `/courses/ddd-practice` で Chapter 3 が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- Ticket 006, 007 のパターンを参考にすること
- docs/CONTENT_ROADMAP.md を参照
- Boss1は完了後に `runs/008/REPORT.md` を作成すること
