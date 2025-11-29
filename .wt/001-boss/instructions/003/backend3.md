# Backend3 Instructions: Ticket 003

## Your Role
サンプルクイズデータ・リポジトリ拡張担当

## Dependencies
- Backend1 完了後に開始

## Task
サンプルクイズデータとリポジトリを実装する。

## Requirements

### 作成ファイル
1. `src/infrastructure/data/sampleQuizzes.ts`
2. `src/domain/shared/repositories/IQuizRepository.ts`
3. `src/domain/shared/repositories/IQuizResultRepository.ts`
4. `src/infrastructure/repositories/InMemoryQuizRepository.ts`
5. `src/infrastructure/repositories/LocalStorageQuizResultRepository.ts`

### サンプルクイズ（レッスン1用、5問）
```typescript
// テーマ: DDDの基礎理解

const questions = [
  {
    id: 'q1',
    text: 'DDDの主な目的は何ですか？',
    options: [
      { id: 'a', text: 'コードを短く書くこと', isCorrect: false },
      { id: 'b', text: 'ビジネスドメインの理解を中心に据えた設計', isCorrect: true },
      { id: 'c', text: 'データベース設計を最適化すること', isCorrect: false },
      { id: 'd', text: 'UIを美しくすること', isCorrect: false },
    ],
    explanation: 'DDDはビジネスドメインの理解を中心に据え、ドメインエキスパートと開発者が共通言語で会話することを重視します。',
  },
  // 残り4問追加（合計5問）
];
```

### IQuizRepository
```typescript
export interface IQuizRepository {
  findById(id: QuizId): Promise<Quiz | null>;
  findByLessonId(lessonId: LessonId): Promise<Quiz | null>;
}
```

### IQuizResultRepository
```typescript
export interface IQuizResultRepository {
  save(result: QuizResult): Promise<void>;
  findByQuizId(quizId: QuizId, courseId: CourseId): Promise<QuizResult | null>;
  findByCourseId(courseId: CourseId): Promise<QuizResult[]>;
}
```

## Definition of Done
- [ ] サンプルクイズ（5問）が作成されている
- [ ] IQuizRepositoryが定義されている
- [ ] IQuizResultRepositoryが定義されている
- [ ] InMemoryQuizRepositoryが実装されている
- [ ] LocalStorageQuizResultRepositoryが実装されている
- [ ] 全テストがパス

## Output Format
```
[DONE] Backend3 サンプルクイズ・リポジトリ完了
作成ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/003/backend3
```

## Branch
`agent/003/backend3`
