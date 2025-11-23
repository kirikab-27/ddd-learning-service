# Ticket 009: Chapter 4 - コンテキストマップ

## Goal
Chapter 4「コンテキストマップ」の学習コンテンツとクイズを作成する。
これで第1部（戦略的設計）が完成し、MVP Phase 1 が完了となる。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第1部 Chapter 4）
- §3.2: 各チャプターの構成

要件定義書より:
> Chapter 4: コンテキストマップ
> └── コンテキスト間の関係、統合パターン

## Scope

### In Scope
- Chapter 4「コンテキストマップ」のレッスン作成（2レッスン）
- 各レッスンのクイズ作成（5問×2 = 10問）
- sampleLessons.ts / sampleQuizzes.ts / sampleCourses.ts の更新

### Out of Scope
- 第2部（Chapter 5-11）の作成（Phase 2）
- 既存 Chapter の修正

## Chapter 4 レッスン構成

| Lesson ID | タイトル | 内容 |
|-----------|---------|------|
| lesson-4-1 | コンテキストマップとは | マップの目的、視覚化の重要性 |
| lesson-4-2 | 統合パターン | パートナーシップ、顧客/供給者、順応者など |

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 009-frontend1 | Chapter 4 コンテンツ作成 | なし |
| Quality | 009-quality | テスト・品質レビュー | Frontend1完了後 |

## Execution Order

```
Phase A: 実装
└── Frontend1: Chapter 4 コンテンツ作成

Phase B: 品質保証
└── Quality: テスト・レビュー
```

## Technical Requirements

### レッスン内容詳細

#### Lesson 4-1: コンテキストマップとは

**学習目標:**
- コンテキストマップの目的を理解する
- マップの読み方を学ぶ
- マップを作成する価値を理解する

**コンテンツ構成:**
- コンテキストマップの定義
- なぜマップが必要か
- マップの構成要素
- マップの作成例

#### Lesson 4-2: 統合パターン

**学習目標:**
- 主要な統合パターンを理解する
- パターンの使い分けを学ぶ
- 実際のシステムでの適用例を知る

**コンテンツ構成:**
- パートナーシップ
- 共有カーネル
- 顧客/供給者
- 順応者
- 腐敗防止層
- 公開ホストサービス
- 公表された言語
- 別々の道

### ファイル構成

```
src/infrastructure/data/
├── sampleLessons.ts  # chapter4Lessons を追加
├── sampleQuizzes.ts  # quiz-lesson-4-1〜4-2 を追加
└── sampleCourses.ts  # chapter-4 に lessons を接続
```

## Definition of Done

- [ ] Lesson 4-1, 4-2 のコンテンツが作成されている
- [ ] 各レッスンのクイズ（5問×2）が作成されている
- [ ] sampleLessons.ts に chapter4Lessons が追加されている
- [ ] sampleQuizzes.ts にクイズが追加されている
- [ ] sampleCourses.ts の chapter-4 に lessons が接続されている
- [ ] `/courses/ddd-practice` で Chapter 4 が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- Ticket 006-008 のパターンを参考にすること
- docs/CONTENT_ROADMAP.md を参照
- **このチケット完了で第1部（MVP Phase 1）完成**
- Boss1は完了後に `runs/009/REPORT.md` を作成すること
