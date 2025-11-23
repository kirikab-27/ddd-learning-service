# Ticket 008: Frontend1 - Chapter 3 コンテンツ作成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 3: 境界づけられたコンテキスト

3つのレッスンと各レッスン5問のクイズを作成する。

## レッスン詳細

### Lesson 3-1: コンテキストとは何か

**内容要件:**
- 境界づけられたコンテキストの定義
  - モデルが適用される範囲
  - 言語の一貫性が保たれる領域
- 境界の意味
  - なぜ境界が必要か
  - 境界がないとどうなるか
- コンテキストの例
  - ECサイトの例（販売、在庫、配送）
  - 同じ「商品」でも意味が異なる

### Lesson 3-2: コンテキストの見つけ方

**内容要件:**
- 分析パターン
  - 言語の違いに注目する
  - ビジネスプロセスの境界
  - チーム構造との関連
- 境界の決め方
  - 大きすぎず、小さすぎず
  - 変更の頻度
  - チームの責任範囲

### Lesson 3-3: コンテキスト間の関係

**内容要件:**
- 上流/下流の関係
  - 上流コンテキストが下流に影響
  - 依存関係の方向
- 統合パターン
  - 共有カーネル（Shared Kernel）
  - 腐敗防止層（Anti-Corruption Layer）
  - 公開ホストサービス（Open Host Service）
- パターン選択の指針

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 3-1用）:**
```typescript
{
  id: 'q3-1-1',
  text: '境界づけられたコンテキストとは何ですか？',
  options: [
    { id: 'a', text: 'プログラミング言語の境界', isCorrect: false },
    { id: 'b', text: 'モデルとユビキタス言語が一貫して適用される範囲', isCorrect: true },
    { id: 'c', text: 'データベースのスキーマ', isCorrect: false },
    { id: 'd', text: 'ネットワークの境界', isCorrect: false },
  ],
  explanation: '境界づけられたコンテキストは、特定のモデルとユビキタス言語が一貫して適用される明確な境界を持つ領域です。',
}
```

## 対象ファイル

### 更新
```
src/infrastructure/data/sampleLessons.ts（chapter3Lessons 追加）
src/infrastructure/data/sampleQuizzes.ts（クイズデータ追加）
src/infrastructure/data/sampleCourses.ts（Chapter 3 接続）
```

## 実装パターン（Ticket 006, 007 参照）

### sampleLessons.ts
```typescript
// 既存の chapter2Lessons の下に追加
export const lesson3_1 = Lesson.create({
  id: LessonId.create('lesson-3-1'),
  title: LessonTitle.create('コンテキストとは何か'),
  content: MarkdownContent.create(`...`),
  order: 1,
});

// ... lesson3_2, lesson3_3

export const chapter3Lessons = [lesson3_1, lesson3_2, lesson3_3];
```

### sampleCourses.ts
```typescript
import { chapter1Lessons, chapter2Lessons, chapter3Lessons } from './sampleLessons';

const chapter3 = Chapter.create({
  id: ChapterId.create('chapter-3'),
  title: 'Chapter 3: 境界づけられたコンテキスト',
  order: 3,
  lessons: chapter3Lessons,
});

// chapters 配列に chapter3 を追加
```

## Definition of Done

- [ ] 3つのレッスンが sampleLessons.ts に追加されている
- [ ] chapter3Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている
- [ ] sampleCourses.ts に Chapter 3 が接続されている
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 008 - Chapter 3 コンテンツ作成完了。PR #XX を作成しました。"
```
