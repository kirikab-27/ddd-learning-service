# Quality Instructions: Ticket 002

## Your Role
品質保証・テスト担当

## Dependencies
- 全Worker（Backend1, Backend2, Frontend1, Frontend2）完了後に開始

## Task
全体の品質レビューとテスト実行

## Requirements

### 品質チェック項目

#### 1. コードレビュー
- [ ] DDDパターンの遵守
- [ ] TypeScript型安全性
- [ ] エラーハンドリング
- [ ] コンポーネント設計

#### 2. テスト実行
```bash
npm run test
npm run typecheck
npm run lint
```

#### 3. 機能テスト
- [ ] `/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1` でアクセス可能
- [ ] レッスン完了ボタンが表示される
- [ ] 完了ボタンクリックで進捗がLocalStorageに保存される
- [ ] サイドバーに完了チェックマークが表示される
- [ ] ページリロード後も進捗が維持される

#### 4. 統合テスト作成
必要に応じて以下を作成:
- `src/__tests__/integration/progressFlow.test.ts`

### 修正権限
- テストの修正
- 軽微なバグ修正
- 型エラーの修正

### エスカレーション
以下の場合はBoss1に報告:
- 設計変更が必要な問題
- 大きなリファクタリングが必要な場合

## Definition of Done
- [ ] 全テストがパス
- [ ] 型チェックがパス
- [ ] Lintエラーなし
- [ ] 機能テスト全項目クリア
- [ ] 品質ゲート全項目PASS

## Output Format
完了後、以下の形式でBoss1に報告:
```
[DONE] Quality 品質レビュー完了

レビュー結果: PASS/FAIL

Quality Gates:
- Unit Tests: ✅/❌
- Type Safety: ✅/❌
- Lint: ✅/❌
- Functional Tests: ✅/❌

Issues Fixed: (修正した問題があれば記載)

ブランチ: agent/002/quality
```

## Branch
`agent/002/quality`
