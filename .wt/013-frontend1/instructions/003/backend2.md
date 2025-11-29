# Backend2 Instructions: Ticket 003

## Your Role
QuizResult集約・SubmitQuizUseCase担当

## Dependencies
- Backend1 完了後に開始

## Task
クイズ結果のドメインモデルとユースケースを実装する。

## Requirements

### 作成ファイル
1. `src/domain/progress/models/QuizResult.ts`
2. `src/domain/progress/models/QuizResult.test.ts`
3. `src/domain/progress/models/Answer.ts`
4. `src/application/usecases/SubmitQuizUseCase.ts`
5. `src/application/usecases/SubmitQuizUseCase.test.ts`

### QuizResult集約
```typescript
export interface Answer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface QuizResultCreateParams {
  quizId: QuizId;
  courseId: CourseId;
  answers: Answer[];
}

export class QuizResult {
  static create(params: QuizResultCreateParams): QuizResult;

  get id(): string;  // UUID生成
  get quizId(): QuizId;
  get courseId(): CourseId;
  get answers(): readonly Answer[];
  get score(): number;           // 0-100
  get isPassed(): boolean;       // 60%以上でtrue
  get completedAt(): Date;
}
```

### SubmitQuizUseCase
```typescript
interface SubmitQuizInput {
  courseId: string;
  lessonId: string;
  quizId: string;
  answers: Array<{ questionId: string; selectedOptionId: string }>;
}

interface SubmitQuizOutput {
  score: number;
  isPassed: boolean;
  results: Array<{
    questionId: string;
    isCorrect: boolean;
    correctOptionId: string;
    explanation: string;
  }>;
}
```

### 使用する既存コード
- `Quiz` 集約（Backend1で作成）
- `IQuizRepository`（Backend3で作成予定、インターフェースのみ先に定義）

## Definition of Done
- [ ] QuizResult集約が実装されている
- [ ] Answer値オブジェクトが実装されている
- [ ] SubmitQuizUseCaseが実装されている
- [ ] isPassed（60%以上）が正しく判定される
- [ ] 単体テストが作成されている
- [ ] 全テストがパス

## Output Format
```
[DONE] Backend2 QuizResult・UseCase完了
作成ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/003/backend2
```

## Branch
`agent/003/backend2`
