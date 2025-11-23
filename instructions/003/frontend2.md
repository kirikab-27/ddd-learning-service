# Frontend2 Instructions: Ticket 003

## Your Role
回答・結果表示コンポーネント担当

## Dependencies
- Backend2 完了後に開始
- Frontend1 完了後に開始

## Task
クイズの回答・結果表示機能を統合する。

## Requirements

### 作成ファイル
1. `src/presentation/features/quiz/QuizContainer.tsx`
2. `src/presentation/features/quiz/QuizContainer.test.tsx`
3. `src/presentation/features/quiz/QuizResult.tsx`
4. `src/presentation/features/quiz/QuizResult.module.css`
5. `src/presentation/hooks/useQuiz.ts`
6. `app/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]/quiz/page.tsx`

### QuizContainer コンポーネント
```typescript
interface QuizContainerProps {
  quizId: string;
  lessonId: string;
  courseId: string;
}

// 状態管理
// - 現在の問題インデックス
// - 各問題への回答
// - 送信状態
// - 結果
```

### QuizResult コンポーネント
```typescript
interface QuizResultProps {
  score: number;
  isPassed: boolean;
  results: Array<{
    questionId: string;
    questionText: string;
    isCorrect: boolean;
    selectedOptionText: string;
    correctOptionText: string;
    explanation: string;
  }>;
  onRetry: () => void;
  onBack: () => void;
}
```

### useQuiz フック
```typescript
interface UseQuizResult {
  quiz: Quiz | null;
  isLoading: boolean;
  error: Error | null;
  submitQuiz: (answers: Map<string, string>) => Promise<SubmitQuizOutput>;
  isSubmitting: boolean;
}

function useQuiz(quizId: string, courseId: string): UseQuizResult;
```

### レッスンページとの連携
- レッスン完了後に「理解度チェック」ボタンを表示
- クイズページへのルーティング追加

## Definition of Done
- [ ] QuizContainerが実装されている
- [ ] QuizResultコンポーネントが実装されている
- [ ] useQuizフックが実装されている
- [ ] クイズページが作成されている
- [ ] レッスン完了後にクイズへの導線がある
- [ ] 全テストがパス

## Output Format
```
[DONE] Frontend2 クイズ統合・結果表示完了
作成/修正ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/003/frontend2
```

## Branch
`agent/003/frontend2`
