# Ticket 006: Frontend2 - Chapter 1 コンテンツ作成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### Chapter 1: ドメインとは何か

3つのレッスンと各レッスン5問のクイズを作成する。

## レッスン詳細

### Lesson 1-1: なぜDDDが必要なのか

**内容要件:**
- 複雑なビジネスロジックの課題
  - スパゲッティコード、ビジネスルールの散在
  - 技術とビジネスの乖離
- DDDのメリット
  - ビジネスと技術の共通理解
  - 変更に強い設計
  - チームコミュニケーションの改善

**Markdown構成:**
```markdown
# なぜDDDが必要なのか

## 概要
このレッスンでは、DDDが解決しようとする問題と、DDDを採用するメリットについて学びます。

## ソフトウェア開発の課題
### 複雑なビジネスロジック
...

## DDDとは
...

## DDDのメリット
...

## まとめ
- ポイント1
- ポイント2
- ポイント3
```

### Lesson 1-2: ドメインエキスパートとの協業

**内容要件:**
- ドメインエキスパートとは誰か
- なぜ協業が重要か
- 効果的なコミュニケーション手法
  - イベントストーミング
  - ホワイトボードセッション
  - プロトタイピング

### Lesson 1-3: ドメインモデルの役割

**内容要件:**
- モデルとは何か
- ドメインモデルの目的
- モデルの表現方法
  - UML図
  - コード
  - 用語集

## クイズ仕様

各レッスンに5問の選択式（4択）クイズを作成。

**クイズ例（Lesson 1-1用）:**
```typescript
{
  id: 'q1-1-1',
  text: 'DDDが解決しようとする主な課題は何ですか？',
  options: [
    { id: 'a', text: 'UIのデザイン問題', isCorrect: false },
    { id: 'b', text: 'データベースの性能問題', isCorrect: false },
    { id: 'c', text: '複雑なビジネスロジックの管理', isCorrect: true },
    { id: 'd', text: 'ネットワーク通信の最適化', isCorrect: false },
  ],
  explanation: 'DDDは複雑なビジネスドメインを扱うソフトウェアの設計手法です。',
}
```

## 対象ファイル

### 新規作成
```
content/chapters/chapter-1/lessons/lesson-1-1.md
content/chapters/chapter-1/lessons/lesson-1-2.md
content/chapters/chapter-1/lessons/lesson-1-3.md
```

### 更新
```
src/infrastructure/data/sampleLessons.ts（レッスンデータ追加）
src/infrastructure/data/sampleQuizzes.ts（クイズデータ追加）
```

## Definition of Done

- [ ] 3つのレッスンMarkdownが作成されている
- [ ] sampleLessons.ts にChapter 1 のレッスンデータが追加されている
- [ ] sampleQuizzes.ts に各レッスン5問のクイズが追加されている
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend2完了] Ticket 006 - Chapter 1 コンテンツ作成完了。PR #XX を作成しました。"
```
