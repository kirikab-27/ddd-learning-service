# Ticket 001: MVP基盤構築

## Goal
DDDアーキテクチャの基盤を構築し、最初のレッスンが表示できる状態にする。

## Scope

### In Scope
- ディレクトリ構造のセットアップ
- ドメイン層の共有カーネル（識別子）
- Learning Content BC の基本モデル
- Learning Progress BC の基本モデル
- リポジトリインターフェースと実装
- 最初のユースケース（GetLesson）
- 基本UIコンポーネント
- サンプルコンテンツ（1レッスン分）

### Out of Scope
- クイズ機能
- 進捗保存機能
- 認証機能

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Backend1 | 001-backend1 | 共有カーネル（CourseId, LessonId等） | なし |
| Backend2 | 001-backend2 | Learning Content BC（Course, Chapter, Lesson） | Backend1完了後 |
| Backend3 | 001-backend3 | Learning Progress BC + リポジトリ実装 | Backend1完了後 |
| Frontend1 | 001-frontend1 | レイアウト（Sidebar, Header） | なし |
| Frontend2 | 001-frontend2 | レッスン表示コンポーネント | Backend2, Frontend1完了後 |
| Frontend3 | 001-frontend3 | ナビゲーションコンポーネント | Backend2完了後 |
| Quality | 001-quality | 全体のテスト・品質レビュー | 各Worker完了後 |

## Execution Order

```
Phase A: 並列作業（依存なし）
├── Backend1: 共有カーネル
├── Frontend1: レイアウト基盤

Phase B: ドメイン層（Backend1完了後）
├── Backend2: Content BC
├── Backend3: Progress BC + インフラ

Phase C: プレゼンテーション層（Phase B完了後）
├── Frontend2: レッスン表示
├── Frontend3: ナビゲーション

Phase D: 品質保証
└── Quality: テスト・レビュー
```

## Definition of Done

- [ ] 全てのドメインモデルにユニットテストがある
- [ ] TypeScript コンパイルエラーがない
- [ ] `/courses/ddd-practice/chapters/1/lessons/1` でレッスンが表示される
- [ ] サイドバーでチャプター/レッスン一覧が表示される
- [ ] Quality の品質レビューをパス
