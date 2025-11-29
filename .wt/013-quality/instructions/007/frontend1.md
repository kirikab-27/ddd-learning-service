# Ticket 007: Frontend1 - Chapter 2 コンテンツ作成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 2: ユビキタス言語

3つのレッスンと各レッスン5問のクイズを作成する。

## レッスン詳細

### Lesson 2-1: ユビキタス言語とは

**内容要件:**
- ユビキタス言語の定義
  - チーム全員が使う共通言語
  - ドメインエキスパートと開発者の橋渡し
- 言語の不一致による問題
  - コミュニケーションエラー
  - 実装ミス
  - ドキュメントとコードの乖離
- ユビキタス言語の特徴
  - ドメイン固有
  - 進化する
  - コードに反映される

**Markdown構成:**
```markdown
# ユビキタス言語とは

## 概要
このレッスンでは、DDDの核心概念である「ユビキタス言語」について学びます。

## ユビキタス言語の定義
...

## 言語の不一致による問題
...

## ユビキタス言語の特徴
...

## まとめ
- ポイント1
- ポイント2
- ポイント3
```

### Lesson 2-2: チームで共通言語を作る

**内容要件:**
- 用語集の作成
  - 用語の定義方法
  - 用語集の管理・更新
- モデリングワークショップ
  - ドメインエキスパートとの対話
  - ホワイトボードセッション
- 言語の洗練プロセス
  - 曖昧さの排除
  - コンテキストの明確化

### Lesson 2-3: コードに反映する

**内容要件:**
- 命名規則
  - クラス名、メソッド名の付け方
  - ドメイン用語をそのまま使う
- コード例
  - ユビキタス言語を反映したコード
  - 反映されていないコードとの比較
- リファクタリング
  - 既存コードへの適用方法

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 2-1用）:**
```typescript
{
  id: 'q2-1-1',
  text: 'ユビキタス言語とは何ですか？',
  options: [
    { id: 'a', text: 'プログラミング言語の一種', isCorrect: false },
    { id: 'b', text: 'チーム全員が使う共通のドメイン言語', isCorrect: true },
    { id: 'c', text: '英語のこと', isCorrect: false },
    { id: 'd', text: 'データベース設計用語', isCorrect: false },
  ],
  explanation: 'ユビキタス言語は、ドメインエキスパートと開発者が共通で使うドメイン固有の言語です。',
}
```

## 対象ファイル

### 新規作成
```
content/chapters/chapter-2/lessons/lesson-2-1.md
content/chapters/chapter-2/lessons/lesson-2-2.md
content/chapters/chapter-2/lessons/lesson-2-3.md
```

### 更新
```
src/infrastructure/data/sampleLessons.ts（chapter2Lessons 追加）
src/infrastructure/data/sampleQuizzes.ts（クイズデータ追加）
src/infrastructure/data/sampleCourses.ts（Chapter 2 接続）
```

## 実装パターン（Ticket 006 参照）

### sampleLessons.ts
```typescript
// 既存の chapter1Lessons の下に追加
export const lesson2_1 = Lesson.create({
  id: LessonId.create('lesson-2-1'),
  title: LessonTitle.create('ユビキタス言語とは'),
  content: MarkdownContent.create(`...`),
  order: 1,
});

// ... lesson2_2, lesson2_3

export const chapter2Lessons = [lesson2_1, lesson2_2, lesson2_3];
```

### sampleCourses.ts
```typescript
import { chapter1Lessons, chapter2Lessons } from './sampleLessons';

const chapter2 = Chapter.create({
  id: ChapterId.create('chapter-2'),
  title: 'Chapter 2: ユビキタス言語',
  order: 2,
  lessons: chapter2Lessons,
});

// chapters 配列に chapter2 を追加
```

## Definition of Done

- [ ] 3つのレッスンMarkdownが作成されている
- [ ] sampleLessons.ts に chapter2Lessons が追加されている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている
- [ ] sampleCourses.ts に Chapter 2 が接続されている
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 007 - Chapter 2 コンテンツ作成完了。PR #XX を作成しました。"
```
