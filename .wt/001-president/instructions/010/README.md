# Ticket 010: Integration Test 修正

## Goal
既存の Integration Test で失敗している lessonId 不一致問題を修正し、全テストをパスさせる。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| テスト | Vitest |

## 背景

Ticket 006 でコース構造を再編成した際、以下の変更が行われた:
- 旧 lesson-2 → lesson-5-1（値オブジェクト）
- 旧 lesson-3 → lesson-6-1（エンティティ）
- 旧 lesson-4 → lesson-8-1（集約）

しかし、Integration Test 内のテストデータが旧 lessonId を参照したままのため、11件のテストが失敗している。

## Scope

### In Scope
- Integration Test の lessonId 参照を修正
- 全テストがパスすることを確認

### Out of Scope
- 新規テストの追加
- 機能変更

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Quality | 010-quality | テスト修正 | なし |

## Technical Requirements

### 修正対象ファイル

以下のファイルで lessonId を修正する必要がある可能性が高い:

```
src/application/progress/usecases/__tests__/
├── CompleteLessonUseCase.integration.test.ts
├── GetLessonProgressUseCase.integration.test.ts
└── その他の integration test ファイル
```

### 修正内容

旧 lessonId を新 lessonId に変更:

| 旧 ID | 新 ID | 内容 |
|-------|-------|------|
| lesson-2 | lesson-5-1 | 値オブジェクト |
| lesson-3 | lesson-6-1 | エンティティ |
| lesson-4 | lesson-8-1 | 集約 |

**注意**: テストが実際のデータ（sampleLessons.ts）を参照している場合は、存在する lessonId を使用する必要がある。現在存在する lessonId:
- lesson-1-1, lesson-1-2, lesson-1-3（Chapter 1）
- lesson-2-1, lesson-2-2, lesson-2-3（Chapter 2）
- lesson-3-1, lesson-3-2, lesson-3-3（Chapter 3）
- lesson-4-1, lesson-4-2（Chapter 4）
- lesson-5-1（Chapter 5: 値オブジェクト）
- lesson-6-1（Chapter 6: エンティティ）
- lesson-8-1（Chapter 8: 集約）

### 検証手順

1. `npm run test` を実行
2. 全テストがパスすることを確認
3. `npm run type-check` がパスすることを確認

## Definition of Done

- [ ] 全 Integration Test が修正されている
- [ ] `npm run test` で全テストがパス
- [ ] `npm run type-check` がパス

## Notes

- テストコード内のモック/スタブデータも確認すること
- 修正後、変更したファイルの一覧をレポートに記載すること
