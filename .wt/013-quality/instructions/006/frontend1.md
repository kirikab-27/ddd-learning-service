# Ticket 006: Frontend1 - 構造移行・データ再編成

## 技術要件（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md §8

## 担当タスク

### 1. sampleCourses.ts の再編成

現在の構造:
```
Chapter 1: DDD入門（仮）
├── DDDとは何か
├── 値オブジェクト  ← 本来は Chapter 5
└── エンティティ    ← 本来は Chapter 6

Chapter 2: 戦術的設計（仮）
└── 集約とは        ← 本来は Chapter 8
```

目標の構造:
```
第1部: DDDの基礎概念
├── Chapter 1: ドメインとは何か（Frontend2が作成）
│   ├── lesson-1-1: なぜDDDが必要なのか
│   ├── lesson-1-2: ドメインエキスパートとの協業
│   └── lesson-1-3: ドメインモデルの役割
├── Chapter 2: ユビキタス言語（後続チケット）
├── Chapter 3: 境界づけられたコンテキスト（後続チケット）
└── Chapter 4: コンテキストマップ（後続チケット）

第2部: 戦術的設計パターン（後続チケット）
├── Chapter 5: 値オブジェクト（既存レッスン移動）
├── Chapter 6: エンティティ（既存レッスン移動）
├── Chapter 7: ドメインサービス
└── Chapter 8: 集約（既存レッスン移動）
```

### 2. 対象ファイル

```
src/infrastructure/data/sampleCourses.ts
src/infrastructure/data/sampleLessons.ts
src/infrastructure/data/sampleQuizzes.ts
```

### 3. 作業手順

#### Step 1: sampleCourses.ts の Part/Chapter 構造を更新
- 第1部、第2部の構造を作成
- Chapter IDを chapter-1, chapter-2, ... に統一
- 既存レッスンを適切なChapterに再配置

#### Step 2: sampleLessons.ts のIDを更新
- 既存の lesson-1 → lesson-5-1（値オブジェクト）
- 既存の lesson-2 → lesson-6-1（エンティティ）
- 既存の lesson-3 → lesson-8-1（集約）

#### Step 3: sampleQuizzes.ts のIDを更新
- クイズIDをレッスンIDに合わせて更新

### 4. 注意事項

- Frontend2が作成するChapter 1のプレースホルダーを用意
- 既存レッスンの内容は変更せず、配置のみ変更
- レッスンID、クイズIDの整合性を保つ

## Definition of Done

- [ ] sampleCourses.ts が新構造に再編成されている
- [ ] sampleLessons.ts のIDが更新されている
- [ ] sampleQuizzes.ts のIDが更新されている
- [ ] Chapter 1 のプレースホルダーがある
- [ ] 型エラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 006 - 構造移行完了。PR #XX を作成しました。"
```
