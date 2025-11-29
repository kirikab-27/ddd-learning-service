# Ticket 010: Integration Test の修正

## Goal
Integration Test の lessonId 不一致問題を修正し、全テストをパスさせる。

## 問題の原因

テストファイルで使用されているlessonIdと、実際のsampleCoursesでの命名が不一致：

| テストで使用 | 実際のsampleLessons |
|------------|-------------------|
| `lesson-1` | `lesson-1-1` |
| `lesson-2` | `lesson-1-2` |
| `lesson-3` | `lesson-1-3` |

## 対象ファイル

```
src/__tests__/integration/lessonFlow.test.ts（6テスト失敗）
src/__tests__/integration/progressFlow.test.ts（5テスト失敗）
```

## Scope

### In Scope
- lessonId の修正（`lesson-1` → `lesson-1-1` 等）
- chapterId の確認と必要に応じた修正
- 期待値（completionRate等）の調整
- 全テストのパス確認

### Out of Scope
- テストロジックの大幅な変更
- 新規テストの追加

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Backend1 | 010-backend1 | Integration Test 修正 | なし |
| Quality | 010-quality | テスト確認・レビュー | Backend1完了後 |

## Execution Order

```
Phase A: テスト修正
└── Backend1: lessonId/chapterId の修正

Phase B: 品質確認
└── Quality: 全テストパス確認
```

## Definition of Done

- [ ] lessonFlow.test.ts の全テストがパス
- [ ] progressFlow.test.ts の全テストがパス
- [ ] 既存の他のテストに影響がない
- [ ] TypeScript型エラーがない
- [ ] 全330テストがパス
