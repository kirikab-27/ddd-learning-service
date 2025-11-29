# Ticket 006: 構造移行 + Chapter 1 作成

## Goal
サンプルデータを要件定義書に沿って再構成し、Chapter 1「ドメインとは何か」を作成する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応
- docs/CONTENT_ROADMAP.md Phase 1, Ticket 006

## Scope

### In Scope
- コース構造の再編成（sampleCourses.ts）
- Chapter 1 コンテンツ作成（3レッスン）
- Chapter 1 クイズ作成（各レッスン5問）
- 既存レッスンの位置調整

### Out of Scope
- Chapter 2-4 の作成（後続チケット）
- UI変更

## Task Assignment

| Worker | Worktree | 担当領域 |
|--------|----------|----------|
| Frontend1 | 006-frontend1 | 構造移行・データ再編成 |
| Frontend2 | 006-frontend2 | Chapter 1 コンテンツ作成 |
| Quality | 006-quality | テスト・品質レビュー |

## Execution Order

```
Phase A: 並列作業
├── Frontend1: 構造移行（sampleCourses.ts再編成）
└── Frontend2: Chapter 1 コンテンツ作成

Phase B: マージ
└── Boss1: Frontend1, Frontend2 のPRをマージ

Phase C: 品質保証
└── Quality: 全画面テスト・レビュー
```

## Chapter 1: ドメインとは何か

| Lesson ID | タイトル | 内容 |
|-----------|---------|------|
| lesson-1-1 | なぜDDDが必要なのか | 複雑なビジネスロジックの課題、DDDのメリット |
| lesson-1-2 | ドメインエキスパートとの協業 | ドメインエキスパートの役割、コミュニケーション手法 |
| lesson-1-3 | ドメインモデルの役割 | モデルとは何か、モデルの表現方法 |

## Definition of Done

- [ ] sampleCourses.ts が新構造に再編成されている
- [ ] Chapter 1 の3レッスンが作成されている
- [ ] 各レッスンに5問のクイズが追加されている
- [ ] /courses/ddd-practice でChapter 1 が表示される
- [ ] レッスン・クイズが正常に動作する
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes
- Tailwind CSS必須（CSS Modules禁止）
- docs/CONTENT_ROADMAP.md を参照
- Boss1は完了後に `runs/006/REPORT.md` を作成すること
