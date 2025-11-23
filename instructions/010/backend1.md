# Ticket 010: Backend1 - Integration Test 修正

## 問題の概要

Integration Test で使用されているlessonIdが、実際のsampleCoursesと不一致のため、11件のテストが失敗している。

## 修正対象ファイル

### 1. src/__tests__/integration/lessonFlow.test.ts

**修正箇所:**

```typescript
// 修正前
lessonId: 'lesson-1'
lessonId: 'lesson-2'
lessonId: 'lesson-3'

// 修正後
lessonId: 'lesson-1-1'
lessonId: 'lesson-1-2'
lessonId: 'lesson-1-3'
```

**詳細な修正点:**

1. Line 46: `lessonId: 'lesson-1'` → `lessonId: 'lesson-1-1'`
2. Line 49: `expect(result.lesson.title).toBe('DDDとは何か')` → `expect(result.lesson.title).toBe('なぜDDDが必要なのか')`
3. Line 59: `lessonId: 'lesson-2'` → `lessonId: 'lesson-1-2'`
4. Line 69: `LessonId.create('lesson-1')` → `LessonId.create('lesson-1-1')`
5. Line 78: `lessonId: 'lesson-2'` → `lessonId: 'lesson-1-2'`
6. Line 89: `currentLessonId: 'lesson-1'` → `currentLessonId: 'lesson-1-1'`
7. Line 104-105: lessonId の修正
8. Line 112: `currentLessonId: 'lesson-3'` → `currentLessonId: 'lesson-1-3'`
9. Line 115: `expect(result.completionRate).toBe(50)` → 計算し直し（現在11レッスンあるため調整必要）
10. Line 124: `lessonId: 'lesson-2'` → `lessonId: 'lesson-1-2'`
11. Line 128-130: navigation.previous/next の期待値を修正

### 2. src/__tests__/integration/progressFlow.test.ts

**修正箇所:**

```typescript
// 修正前
lessonId: 'lesson-1'
lessonId: 'lesson-2'
lessonId: 'lesson-3'

// 修正後
lessonId: 'lesson-1-1'
lessonId: 'lesson-1-2'
lessonId: 'lesson-1-3'
```

**詳細な修正点:**

1. Line 46: `lessonId: 'lesson-1'` → `lessonId: 'lesson-1-1'`
2. Line 53: `lessonId: 'lesson-1'` → `lessonId: 'lesson-1-1'`
3. Line 60: `lessonId: 'lesson-1'` → `lessonId: 'lesson-1-1'`
4. Line 73: `lessonId: 'lesson-2'` → `lessonId: 'lesson-1-2'`
5. Line 80: `lessonId: 'lesson-1'` → `lessonId: 'lesson-1-1'`
6. Line 87: `lessonId: 'lesson-2'` → `lessonId: 'lesson-1-2'`
7. Line 99-100, 106, 111, 118, 123: 同様の修正
8. Line 113, 125: completionRate の期待値を調整（11レッスン基準）
9. Line 135, 140-141, 153, 166: 同様の修正

## レッスンID対応表

現在のsampleCoursesの構成:

| Chapter | Lesson | lessonId |
|---------|--------|----------|
| Chapter 1 | なぜDDDが必要なのか | lesson-1-1 |
| Chapter 1 | ドメインエキスパートとの協業 | lesson-1-2 |
| Chapter 1 | ドメインモデルの役割 | lesson-1-3 |
| Chapter 2 | ユビキタス言語とは | lesson-2-1 |
| Chapter 2 | チームで共通言語を作る | lesson-2-2 |
| Chapter 2 | コードに反映する | lesson-2-3 |
| Chapter 3 | コンテキストとは何か | lesson-3-1 |
| Chapter 3 | コンテキストの見つけ方 | lesson-3-2 |
| Chapter 3 | コンテキスト間の関係 | lesson-3-3 |
| Chapter 5 | 値オブジェクト | lesson-5-1 |
| Chapter 6 | エンティティ | lesson-6-1 |
| Chapter 8 | 集約とは | lesson-8-1 |

**注意**: Chapter 4 (lesson-4-1, lesson-4-2) がPR #26でマージされているはずだが、sampleCourses.tsに反映されていない可能性あり。確認が必要。

## completionRate の計算

現在のレッスン数に基づいて期待値を調整:
- 総レッスン数を確認（Chapter 1-4 + 5,6,8 = 11 or 13レッスン）
- 1レッスン完了時の期待値: `Math.round(1 / totalLessons * 100)`
- 2レッスン完了時の期待値: `Math.round(2 / totalLessons * 100)`

## Definition of Done

- [ ] lessonFlow.test.ts の全テストがパス（6件）
- [ ] progressFlow.test.ts の全テストがパス（5件）
- [ ] 既存の他のテストに影響がない（319件パス維持）
- [ ] TypeScript型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法

完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Backend1完了] Ticket 010 - Integration Test修正完了。PR #XX を作成しました。全テストパス。"
```
