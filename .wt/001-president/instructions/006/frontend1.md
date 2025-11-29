# Frontend1: 構造移行・データ再編成

## Task Overview
サンプルデータを要件定義書（REQUIREMENTS.md §3.1）の構造に沿って再編成する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 作業内容

### 1. sampleCourses.ts の再構成

**現在の構造:**
```typescript
chapters: [
  {
    id: 'chapter-1',
    title: 'DDD入門',
    lessons: [lesson-1, lesson-2, lesson-3]
  },
  {
    id: 'chapter-2',
    title: '戦術的設計',
    lessons: [lesson-4]
  }
]
```

**修正後の構造:**
```typescript
chapters: [
  // 第1部: 戦略的設計
  {
    id: ChapterId.create('chapter-1'),
    title: 'ドメインとは何か',
    order: 1,
    lessons: [] // Frontend2 が追加
  },
  {
    id: ChapterId.create('chapter-2'),
    title: 'ユビキタス言語',
    order: 2,
    lessons: [] // Ticket 007
  },
  {
    id: ChapterId.create('chapter-3'),
    title: '境界づけられたコンテキスト',
    order: 3,
    lessons: [] // Ticket 008
  },
  {
    id: ChapterId.create('chapter-4'),
    title: 'コンテキストマップ',
    order: 4,
    lessons: [] // Ticket 009
  },
  // 第2部: 戦術的設計パターン
  {
    id: ChapterId.create('chapter-5'),
    title: '値オブジェクト',
    order: 5,
    lessons: [/* 既存 lesson-2 を移動 */]
  },
  {
    id: ChapterId.create('chapter-6'),
    title: 'エンティティ',
    order: 6,
    lessons: [/* 既存 lesson-3 を移動 */]
  },
  {
    id: ChapterId.create('chapter-7'),
    title: 'ドメインサービス',
    order: 7,
    lessons: []
  },
  {
    id: ChapterId.create('chapter-8'),
    title: '集約',
    order: 8,
    lessons: [/* 既存 lesson-4 を移動 */]
  },
  // Chapter 9-15 は空で作成（将来用）
]
```

### 2. sampleLessons.ts の更新

**ID変更マッピング:**
```typescript
// 既存レッスンの移動
'lesson-1' → 削除（Chapter 1 は Frontend2 が新規作成）
'lesson-2' → 'lesson-5-1' (値オブジェクト → Chapter 5)
'lesson-3' → 'lesson-6-1' (エンティティ → Chapter 6)
'lesson-4' → 'lesson-8-1' (集約とは → Chapter 8)
```

**新しいレッスン定義:**
```typescript
// 例: 値オブジェクトレッスンの移動
{
  id: LessonId.create('lesson-5-1'),
  chapterId: ChapterId.create('chapter-5'),
  title: '値オブジェクト',
  order: 1,
  content: MarkdownContent.create(/* 既存コンテンツ */),
  quizId: QuizId.create('quiz-lesson-5-1'),
}
```

### 3. sampleQuizzes.ts の更新

**ID変更マッピング:**
```typescript
'quiz-lesson-1' → 削除
'quiz-lesson-2' → 'quiz-lesson-5-1'
'quiz-lesson-3' → 'quiz-lesson-6-1'
'quiz-lesson-4' → 'quiz-lesson-8-1'
```

### 4. 進捗データ互換性

LocalStorage の進捗データ形式を確認し、必要に応じてマイグレーション処理を追加:

```typescript
// useProgress.ts などで対応
// 旧ID → 新ID のマッピングを用意
const LESSON_ID_MIGRATION = {
  'lesson-2': 'lesson-5-1',
  'lesson-3': 'lesson-6-1',
  'lesson-4': 'lesson-8-1',
};
```

## Definition of Done

- [ ] sampleCourses.ts が15章構成になっている
- [ ] 既存レッスンが正しいChapterに移動されている
- [ ] sampleLessons.ts のIDが更新されている
- [ ] sampleQuizzes.ts のIDが更新されている
- [ ] 進捗データのマイグレーション対応（必要な場合）
- [ ] 全テストがパス

## Communication

作業完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] 構造移行完了。Chapter 1-15 の枠組み作成、既存レッスンを Chapter 5,6,8 に移動しました。"
```

## Reference

- docs/REQUIREMENTS.md §3.1
- docs/CONTENT_ROADMAP.md
- src/infrastructure/data/sampleCourses.ts
- src/infrastructure/data/sampleLessons.ts
- src/infrastructure/data/sampleQuizzes.ts
