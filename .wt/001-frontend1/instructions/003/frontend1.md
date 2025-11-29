# Frontend1 Instructions: Ticket 003

## Your Role
クイズ表示コンポーネント担当

## Dependencies
なし（並列実行可能、モックデータ使用）

## Task
クイズの表示UIコンポーネントを作成する。

## Requirements

### 作成ファイル
1. `src/presentation/features/quiz/QuizQuestion.tsx`
2. `src/presentation/features/quiz/QuizQuestion.module.css`
3. `src/presentation/features/quiz/QuizQuestion.test.tsx`
4. `src/presentation/features/quiz/QuizProgress.tsx`
5. `src/presentation/features/quiz/QuizProgress.module.css`
6. `src/presentation/features/quiz/index.ts`

### QuizQuestion コンポーネント
```typescript
interface QuizQuestionProps {
  question: {
    id: string;
    text: string;
    options: Array<{ id: string; text: string }>;
  };
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
  // 結果表示時
  showResult?: boolean;
  correctOptionId?: string;
  explanation?: string;
}
```

### QuizProgress コンポーネント
```typescript
interface QuizProgressProps {
  current: number;   // 現在の問題番号（1-based）
  total: number;     // 全問題数
}
```

### UI要件
- 問題文は大きく見やすく表示
- 選択肢はラジオボタン形式
- 選択時のホバー・選択状態を明確に
- 結果表示時: 正解は緑、不正解は赤でハイライト
- 解説は折りたたみ可能

### スタイル要件
- レスポンシブ対応
- アクセシビリティ対応（aria属性）
- プライマリカラー使用

## Definition of Done
- [ ] QuizQuestionコンポーネントが実装されている
- [ ] QuizProgressコンポーネントが実装されている
- [ ] 選択・非選択状態が正しく表示される
- [ ] 結果表示モードで正誤がハイライトされる
- [ ] テストが作成されている
- [ ] 全テストがパス

## Output Format
```
[DONE] Frontend1 クイズUIコンポーネント完了
作成ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/003/frontend1
```

## Branch
`agent/003/frontend1`
