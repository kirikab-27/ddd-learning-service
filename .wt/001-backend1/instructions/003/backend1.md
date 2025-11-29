# Backend1 Instructions: Ticket 003

## Your Role
Quiz集約・Question値オブジェクト担当

## Dependencies
なし（並列実行可能）

## Task
クイズのドメインモデルを実装する。

## Requirements

### 作成ファイル
1. `src/domain/content/models/Quiz.ts`
2. `src/domain/content/models/Question.ts`
3. `src/domain/content/models/Quiz.test.ts`
4. `src/domain/content/models/Question.test.ts`

### Quiz集約
```typescript
export interface QuizCreateParams {
  id: QuizId;
  lessonId: LessonId;
  title: string;
  description?: string;
  questions: Question[];
}

export class Quiz {
  private constructor(
    private readonly _id: QuizId,
    private readonly _lessonId: LessonId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _questions: Question[]
  ) {}

  static create(params: QuizCreateParams): Quiz;

  get id(): QuizId;
  get lessonId(): LessonId;
  get title(): string;
  get description(): string;
  get questions(): readonly Question[];
  get questionCount(): number;

  // スコア計算（0-100）
  calculateScore(answers: Map<string, string>): number;
}
```

### Question値オブジェクト
```typescript
export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionCreateParams {
  id: string;
  text: string;
  options: Option[];
  explanation: string;
}

export class Question {
  static create(params: QuestionCreateParams): Question;

  get id(): string;
  get text(): string;
  get options(): readonly Option[];
  get explanation(): string;
  get correctOptionId(): string;

  isCorrect(selectedOptionId: string): boolean;
}
```

### 既存の値オブジェクトを使用
- `src/domain/shared/QuizId.ts` （Ticket 001で作成済み）
- `src/domain/shared/LessonId.ts`

## Definition of Done
- [ ] Quiz集約が実装されている
- [ ] Question値オブジェクトが実装されている
- [ ] calculateScoreメソッドが正しく動作する
- [ ] 単体テストが作成されている
- [ ] index.tsにエクスポートが追加されている
- [ ] 全テストがパス

## Output Format
```
[DONE] Backend1 Quiz集約完了
作成ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/003/backend1
```

## Branch
`agent/003/backend1`
