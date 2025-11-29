# Ticket 009: Frontend1 - Chapter 4 コンテンツ作成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 4: コンテキストマップ

2つのレッスンと各レッスン5問のクイズを作成する。
これで第1部（MVP Phase 1）が完成します。

## レッスン詳細

### Lesson 4-1: コンテキストマップとは

**内容要件:**
- コンテキストマップの定義
  - 複数のコンテキストを俯瞰する地図
  - コンテキスト間の関係を視覚化
- マップの目的
  - チーム間の認識合わせ
  - 依存関係の明確化
  - 問題箇所の特定
- 視覚化の重要性
  - 複雑な関係を一目で把握
  - コミュニケーションツールとしての活用
  - ドキュメントとしての価値
- コンテキストマップの例
  - ECサイトのコンテキストマップ
  - マップの読み方

### Lesson 4-2: 統合パターン

**内容要件:**
- パートナーシップ（Partnership）
  - 両チームが対等に協力
  - 相互依存の関係
- 顧客/供給者（Customer-Supplier）
  - 上流/下流の明確な関係
  - 下流チームのニーズを上流が考慮
- 順応者（Conformist）
  - 下流が上流に完全に従う
  - 自由度は低いがシンプル
- 腐敗防止層（Anti-Corruption Layer）
  - 下流が自分を守る変換層
  - レガシーシステムとの統合に有効
- 公開ホストサービス（Open Host Service）
  - 上流が標準的なプロトコルを公開
  - 多数の下流に対応
- 公表された言語（Published Language）
  - 標準化された交換形式
  - OHSと組み合わせて使用
- 別々の道（Separate Ways）
  - 統合しない選択
  - 統合コストが高すぎる場合
- 大きな泥団子（Big Ball of Mud）
  - 境界が曖昧な既存システム
  - 腐敗防止層で保護

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 4-1用）:**
```typescript
{
  id: QuizId.create('quiz-4-1'),
  lessonId: LessonId.create('lesson-4-1'),
  questions: [
    Question.create({
      id: 'q4-1-1',
      text: 'コンテキストマップの主な目的は何ですか？',
      options: [
        { id: 'a', text: 'ソースコードの構造を表現する', isCorrect: false },
        { id: 'b', text: 'データベースのER図を作成する', isCorrect: false },
        { id: 'c', text: '境界づけられたコンテキスト間の関係を視覚化する', isCorrect: true },
        { id: 'd', text: 'クラスの継承関係を表現する', isCorrect: false },
      ],
      explanation: 'コンテキストマップは、複数の境界づけられたコンテキスト間の関係を視覚化し、チーム間のコミュニケーションを促進するためのツールです。',
    }),
    // ... 残り4問
  ],
}
```

**クイズ例（Lesson 4-2用）:**
```typescript
{
  id: QuizId.create('quiz-4-2'),
  lessonId: LessonId.create('lesson-4-2'),
  questions: [
    Question.create({
      id: 'q4-2-1',
      text: '「腐敗防止層（ACL）」はどのような状況で使用しますか？',
      options: [
        { id: 'a', text: 'すべての外部システムとの統合', isCorrect: false },
        { id: 'b', text: 'レガシーシステムや品質の低い外部モデルから自分のモデルを守る場合', isCorrect: true },
        { id: 'c', text: '新規システムの構築時のみ', isCorrect: false },
        { id: 'd', text: 'データベースのバックアップ時', isCorrect: false },
      ],
      explanation: '腐敗防止層は、レガシーシステムや設計が異なる外部システムのモデルが自分のドメインモデルを「汚染」しないよう、変換層として機能します。',
    }),
    // ... 残り4問
  ],
}
```

## 対象ファイル

### 更新
```
src/infrastructure/data/sampleLessons.ts（chapter4Lessons 追加）
src/infrastructure/data/sampleQuizzes.ts（クイズデータ追加）
src/infrastructure/data/sampleCourses.ts（Chapter 4 接続）
```

## 実装パターン（Ticket 007, 008 参照）

### sampleLessons.ts
```typescript
// 既存の chapter3Lessons の下に追加
export const lesson4_1 = Lesson.create({
  id: LessonId.create('lesson-4-1'),
  title: LessonTitle.create('コンテキストマップとは'),
  content: MarkdownContent.create(`
# コンテキストマップとは

## 概要
このレッスンでは、複数の境界づけられたコンテキストの関係を視覚化するコンテキストマップについて学びます。

## コンテキストマップの定義

コンテキストマップとは、システム内に存在する**複数の境界づけられたコンテキスト**とその**関係性**を視覚的に表現した図です。

...
  `),
  order: 1,
});

export const lesson4_2 = Lesson.create({
  id: LessonId.create('lesson-4-2'),
  title: LessonTitle.create('統合パターン'),
  content: MarkdownContent.create(`
# 統合パターン

## 概要
このレッスンでは、コンテキスト間の統合パターンを学びます。

...
  `),
  order: 2,
});

export const chapter4Lessons = [lesson4_1, lesson4_2];
```

### sampleCourses.ts
```typescript
import { chapter1Lessons, chapter2Lessons, chapter3Lessons, chapter4Lessons } from './sampleLessons';

const chapter4 = Chapter.create({
  id: ChapterId.create('chapter-4'),
  title: 'Chapter 4: コンテキストマップ',
  order: 4,
  lessons: chapter4Lessons,
});

// chapters 配列に chapter4 を追加
```

## 参考資料

- docs/CONTEXT_MAP.md - 本サービスのコンテキストマップ例
- docs/ddd/DDD_15_の扉を開く - コンテキストマップの解説

## Definition of Done

- [ ] 2つのレッスンが sampleLessons.ts に追加されている
- [ ] chapter4Lessons がエクスポートされている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている（計10問）
- [ ] sampleCourses.ts に Chapter 4 が接続されている
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 009 - Chapter 4 コンテキストマップ完了。PR #XX を作成しました。第1部完成！"
```
