# Backend2 Instructions: Ticket 002

## Your Role
CompleteLessonUseCase 実装担当

## Dependencies
- Backend1 完了後に開始

## Task
レッスン完了を記録するユースケースを実装する。

## Requirements

### 作成ファイル
1. `src/application/usecases/CompleteLessonUseCase.ts`
2. `src/application/usecases/CompleteLessonUseCase.test.ts`

### インターフェース設計
```typescript
interface CompleteLessonInput {
  courseId: string;
  lessonId: string;
}

interface CompleteLessonOutput {
  success: boolean;
  progress: {
    completedCount: number;
    totalLessons: number;
    completionRate: number;
  };
}
```

### 実装要件
1. `IProgressRepository` を使用して進捗を保存
2. `ICourseRepository` を使用してコース情報を取得
3. 既に完了済みの場合も成功を返す（冪等性）
4. 進捗率の計算ロジックを含める

### 使用する既存コード
- `src/domain/progress/models/Progress.ts`
- `src/domain/shared/repositories/IProgressRepository.ts`
- `src/infrastructure/repositories/LocalStorageProgressRepository.ts`

## Definition of Done
- [ ] CompleteLessonUseCase が実装されている
- [ ] 単体テストが作成されている
- [ ] `index.ts` にエクスポートが追加されている
- [ ] 全テストがパス
- [ ] 型チェックがパス

## Output Format
完了後、以下の形式でBoss1に報告:
```
[DONE] Backend2 CompleteLessonUseCase完了
作成ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/002/backend2
```

## Branch
`agent/002/backend2`
