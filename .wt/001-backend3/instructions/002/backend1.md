# Backend1 Instructions: Ticket 002

## Your Role
コースIDバグ修正担当

## Task
サンプルデータのコースIDを修正する。

## Requirements

### 修正対象
- `src/infrastructure/data/sampleCourses.ts`

### 変更内容
1. コースIDを `ddd-basics` から `ddd-practice` に変更
2. チャプターID (`chapter-1`, `chapter-2`) は変更なし
3. 関連するテストファイルも更新

### 変更箇所の確認
```typescript
// Before
id: CourseId.create('ddd-basics')

// After
id: CourseId.create('ddd-practice')
```

## Definition of Done
- [ ] `sampleCourses.ts` のコースIDが `ddd-practice` に変更されている
- [ ] 既存のテストが全てパス
- [ ] 型チェックがパス
- [ ] コミット完了

## Output Format
完了後、以下の形式でBoss1に報告:
```
[DONE] Backend1 コースIDバグ修正完了
変更ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/002/backend1
```

## Branch
`agent/002/backend1`
