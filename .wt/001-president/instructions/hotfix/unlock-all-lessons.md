# HOTFIX: 全レッスンアンロック（コンテンツレビュー用）

## 目的
コンテンツレビューのため、一時的に全レッスンをアンロックする。

## 変更ファイル
`src/domain/content/specifications/LessonUnlockSpecification.ts`

## 変更内容

```typescript
export class LessonUnlockSpecification {
  isSatisfiedBy(
    lesson: Lesson,
    course: Course,
    progress: LessonCompletionChecker
  ): boolean {
    // TEMPORARY: Unlock all lessons for content review
    return true;

    // Original logic (commented out)
    // const allLessons = course.getAllLessons();
    // const lessonIndex = allLessons.findIndex(l => l.id.equals(lesson.id));
    // if (lessonIndex === -1) {
    //   return false;
    // }
    // if (lessonIndex === 0) {
    //   return true;
    // }
    // const previousLesson = allLessons[lessonIndex - 1];
    // return progress.hasCompletedLesson(previousLesson.id);
  }
}
```

## 作業手順

1. ファイルを編集
2. 開発サーバーが自動リロードされるのを確認
3. ブラウザでリフレッシュ
4. 全レッスンがアンロックされていることを確認

## 注意事項
- これは**一時的な変更**です
- コンテンツレビュー完了後は元に戻してください
- 本番環境には絶対にデプロイしないでください

## 元に戻す方法
```bash
git checkout src/domain/content/specifications/LessonUnlockSpecification.ts
```
