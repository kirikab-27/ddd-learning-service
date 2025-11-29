# Ticket 006: コース構造移行 + Chapter 1 作成

## Goal
サンプルデータを要件定義書（REQUIREMENTS.md §3.1）に沿って再構成し、Chapter 1「ドメインとは何か」を作成する。

## 技術要件（docs/REQUIREMENTS.md §8 参照）

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 要件定義書との対応

本チケットで対応する要件:
- §3.1: コース構成（第1部 Chapter 1）
- §3.2: 各チャプターの構成
- §4.1.1: 学習コンテンツ機能

## Background

現在の `sampleCourses.ts` は開発用のサンプルデータであり、要件定義書の章立てと一致していない。

### 現状（修正前）
```
Chapter 1: DDD入門（仮）
├── DDDとは何か
├── 値オブジェクト  ← 本来は Chapter 5
└── エンティティ    ← 本来は Chapter 6

Chapter 2: 戦術的設計（仮）
└── 集約とは        ← 本来は Chapter 8
```

### 目標（修正後）
```
第1部: DDDの基礎概念（戦略的設計）
├── Chapter 1: ドメインとは何か ★本チケットで作成★
│   ├── Lesson 1-1: なぜDDDが必要なのか
│   ├── Lesson 1-2: ドメインエキスパートとの協業
│   └── Lesson 1-3: ドメインモデルの役割
├── Chapter 2: ユビキタス言語（Ticket 007）
├── Chapter 3: 境界づけられたコンテキスト（Ticket 008）
└── Chapter 4: コンテキストマップ（Ticket 009）

第2部: 戦術的設計パターン（既存レッスンを移動）
├── Chapter 5: 値オブジェクト ← 既存「値オブジェクト」を移動
├── Chapter 6: エンティティ ← 既存「エンティティ」を移動
...
└── Chapter 8: 集約 ← 既存「集約とは」を移動
```

## Scope

### In Scope
- sampleCourses.ts の構造を要件定義書に沿って再構成
- 既存レッスンの Chapter 5, 6, 8 への移動
- Chapter 1「ドメインとは何か」の新規作成（3レッスン）
- Chapter 1 用クイズの作成（各レッスン5問）
- sampleLessons.ts / sampleQuizzes.ts の更新

### Out of Scope
- Chapter 2-4 の作成（Ticket 007-009 で対応）
- 第2部・第3部の詳細コンテンツ作成（Phase 2）

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 006-frontend1 | 構造移行・データ再編成 | なし |
| Frontend2 | 006-frontend2 | Chapter 1 コンテンツ作成 | なし |
| Quality | 006-quality | テスト・品質レビュー | Frontend1,2完了後 |

## Execution Order

```
Phase A: 並列作業
├── Frontend1: 構造移行・既存レッスン移動
└── Frontend2: Chapter 1 コンテンツ作成

Phase B: 統合
└── Boss1: Frontend1,2 の成果物をマージ

Phase C: 品質保証
└── Quality: テスト・レビュー
```

## Technical Requirements

### ID体系

```typescript
// Course ID
const COURSE_ID = 'ddd-practice';

// Chapter IDs（要件定義書§3.1に準拠）
const CHAPTER_IDS = {
  // 第1部: 戦略的設計
  'chapter-1': 'ドメインとは何か',
  'chapter-2': 'ユビキタス言語',
  'chapter-3': '境界づけられたコンテキスト',
  'chapter-4': 'コンテキストマップ',
  // 第2部: 戦術的設計パターン
  'chapter-5': '値オブジェクト',
  'chapter-6': 'エンティティ',
  'chapter-7': 'ドメインサービス',
  'chapter-8': '集約',
  // ... 続く
};

// Lesson IDs
// 形式: lesson-{chapter}-{lesson}
// 例: lesson-1-1, lesson-1-2, lesson-5-1
```

### Chapter 1 レッスン内容

#### Lesson 1-1: なぜDDDが必要なのか
```markdown
## 学習目標
- DDDが解決する問題を理解する
- 複雑なビジネスロジックの課題を認識する
- DDDのメリットを説明できる

## 内容
1. ソフトウェア開発の本質的な難しさ
2. ビジネスロジックの複雑性
3. DDDが提供する解決策
4. DDDの適用が有効なケース/不向きなケース

## コード例
- 手続き的なコード vs DDDのコード
```

#### Lesson 1-2: ドメインエキスパートとの協業
```markdown
## 学習目標
- ドメインエキスパートの役割を理解する
- 効果的なコミュニケーション方法を学ぶ
- 知識抽出の技法を知る

## 内容
1. ドメインエキスパートとは誰か
2. なぜ協業が重要なのか
3. モデリングワークショップの進め方
4. 共通理解の形成

## コード例
- イベントストーミングの例
```

#### Lesson 1-3: ドメインモデルの役割
```markdown
## 学習目標
- ドメインモデルの定義を理解する
- モデルの表現方法を学ぶ
- モデルとコードの関係を理解する

## 内容
1. モデルとは何か
2. 分析モデルと設計モデル
3. モデルの表現方法（図、コード、言葉）
4. モデル駆動設計

## コード例
- ドメインモデルの TypeScript 実装例
```

### クイズ形式

各レッスンに5問の選択式問題:

```typescript
// sampleQuizzes.ts への追加形式
{
  id: QuizId.create('quiz-lesson-1-1'),
  lessonId: LessonId.create('lesson-1-1'),
  questions: [
    {
      id: 'q1',
      text: 'DDDが主に解決しようとする問題は何か？',
      options: [
        { id: 'a', text: 'データベースの設計' },
        { id: 'b', text: 'UIのデザイン' },
        { id: 'c', text: 'ビジネスロジックの複雑性' },
        { id: 'd', text: 'ネットワーク通信' },
      ],
      correctOptionId: 'c',
      explanation: 'DDDは複雑なビジネスロジックを整理し、...',
    },
    // ... 4問続く
  ],
}
```

### 既存レッスンの移動

```typescript
// 現在のID → 新しいID
'lesson-1' (DDDとは何か) → 削除（新規 lesson-1-1 に置き換え）
'lesson-2' (値オブジェクト) → 'lesson-5-1'
'lesson-3' (エンティティ) → 'lesson-6-1'
'lesson-4' (集約とは) → 'lesson-8-1'

// 対応するクイズも移動
'quiz-lesson-2' → 'quiz-lesson-5-1'
'quiz-lesson-3' → 'quiz-lesson-6-1'
'quiz-lesson-4' → 'quiz-lesson-8-1'
```

## Definition of Done

- [ ] sampleCourses.ts が要件定義書 §3.1 の構造に沿っている
- [ ] 既存レッスン（値オブジェクト、エンティティ、集約）が正しいChapterに移動されている
- [ ] Chapter 1 の3レッスンが作成されている
- [ ] 各レッスンのクイズ（5問×3）が作成されている
- [ ] `/courses/ddd-practice` で新しい構造が表示される
- [ ] 全レッスンページが正常に表示される
- [ ] 全クイズが正常に動作する
- [ ] 既存の進捗データに影響がない（または適切にマイグレーション）
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- Tailwind CSS必須（CSS Modules禁止）
- docs/CONTENT_ROADMAP.md を参照
- 既存の進捗データ（LocalStorage）との互換性に注意
- Boss1は完了後に `runs/006/REPORT.md` を作成すること
