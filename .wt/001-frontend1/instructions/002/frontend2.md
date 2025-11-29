# Frontend2 Instructions: Ticket 002

## Your Role
サイドバー進捗表示改善担当

## Dependencies
- Backend2 完了後に開始
- Frontend1 完了後に開始

## Task
サイドバーの進捗表示を改善し、完了ボタンを統合する。

## Requirements

### 修正対象
1. `src/presentation/features/navigation/CourseSidebar.tsx`
2. `src/presentation/features/navigation/LessonNav.tsx`
3. `src/presentation/features/lesson/LessonContent.tsx`（完了ボタン統合）

### 作成ファイル
1. `src/presentation/hooks/useProgress.ts`
2. `src/presentation/hooks/useProgress.test.ts`

### useProgress フック設計
```typescript
interface UseProgressResult {
  progress: Progress | null;
  isCompleted: (lessonId: string) => boolean;
  completeLesson: (lessonId: string) => Promise<void>;
  completionRate: number;
  loading: boolean;
  error: Error | null;
}

function useProgress(courseId: string): UseProgressResult;
```

### UI改善要件
1. サイドバーに進捗バー表示
2. 完了レッスンにチェックマーク（✓）表示
3. 現在のレッスンをハイライト
4. レッスンページに完了ボタンを配置

### 統合要件
- `CompleteLessonUseCase` を使用
- `LessonCompleteButton` コンポーネントを使用
- LocalStorage から進捗を読み込み

## Definition of Done
- [ ] useProgress フックが実装されている
- [ ] サイドバーに進捗が表示される
- [ ] 完了レッスンにチェックマークが表示される
- [ ] レッスンページに完了ボタンが表示される
- [ ] 完了ボタンクリックで進捗が更新される
- [ ] 全テストがパス

## Output Format
完了後、以下の形式でBoss1に報告:
```
[DONE] Frontend2 サイドバー改善完了
作成/修正ファイル: (ファイル一覧)
テスト結果: (結果)
ブランチ: agent/002/frontend2
```

## Branch
`agent/002/frontend2`
