# Frontend1 Instructions: Ticket 002

## Your Role
レッスン完了ボタンUI担当

## Dependencies
なし（並列実行可能）

## Task
レッスン完了ボタンコンポーネントを作成する。

## Requirements

### 作成ファイル
1. `src/presentation/features/lesson/LessonCompleteButton.tsx`
2. `src/presentation/features/lesson/LessonCompleteButton.test.tsx`
3. `src/presentation/features/lesson/LessonCompleteButton.module.css`

### コンポーネント設計
```typescript
interface LessonCompleteButtonProps {
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  onComplete: () => void;
  disabled?: boolean;
}
```

### UI要件
1. 未完了時: 「レッスンを完了する」ボタン
2. 完了時: 「✓ 完了済み」表示（クリック不可）
3. ローディング状態のサポート
4. アクセシビリティ対応（aria属性）

### スタイル要件
- プライマリカラー: `var(--color-primary)`
- 完了時: `var(--color-success)`
- ホバー効果あり
- レスポンシブ対応

## Definition of Done
- [ ] LessonCompleteButton コンポーネントが実装されている
- [ ] 未完了/完了の両状態が正しく表示される
- [ ] テストが作成されている
- [ ] スタイルが適用されている
- [ ] 全テストがパス

## Output Format
完了後、以下の形式でBoss1に報告:
```
[DONE] Frontend1 完了ボタンUI完了
作成ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/002/frontend1
```

## Branch
`agent/002/frontend1`
