# Quality: テスト・品質レビュー

## Task Overview
Ticket 006 の成果物（構造移行 + Chapter 1 コンテンツ）の品質を検証する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 前提条件

Frontend1, Frontend2 の作業が完了していること。

## 検証項目

### 1. 構造検証

#### 1.1 Chapter構成の確認
- [ ] Chapter 1-15 が存在する
- [ ] 各Chapterのタイトルが要件定義書 §3.1 と一致する
- [ ] orderが正しく設定されている

```typescript
// 期待される構造
chapters: [
  { id: 'chapter-1', title: 'ドメインとは何か', order: 1 },
  { id: 'chapter-2', title: 'ユビキタス言語', order: 2 },
  { id: 'chapter-3', title: '境界づけられたコンテキスト', order: 3 },
  { id: 'chapter-4', title: 'コンテキストマップ', order: 4 },
  { id: 'chapter-5', title: '値オブジェクト', order: 5 },
  // ...
]
```

#### 1.2 既存レッスンの移動確認
- [ ] lesson-5-1（値オブジェクト）が Chapter 5 に存在
- [ ] lesson-6-1（エンティティ）が Chapter 6 に存在
- [ ] lesson-8-1（集約とは）が Chapter 8 に存在
- [ ] 旧IDのレッスン（lesson-1〜4）が削除されている

### 2. Chapter 1 コンテンツ検証

#### 2.1 レッスン存在確認
- [ ] lesson-1-1「なぜDDDが必要なのか」が存在
- [ ] lesson-1-2「ドメインエキスパートとの協業」が存在
- [ ] lesson-1-3「ドメインモデルの役割」が存在

#### 2.2 コンテンツ品質
- [ ] 各レッスンに概要セクションがある
- [ ] 各レッスンにコード例がある
- [ ] 各レッスンにまとめセクションがある
- [ ] Markdownが正しくレンダリングされる

#### 2.3 クイズ検証
- [ ] quiz-lesson-1-1 が存在（5問）
- [ ] quiz-lesson-1-2 が存在（5問）
- [ ] quiz-lesson-1-3 が存在（5問）
- [ ] 各問題に正解と解説がある
- [ ] 回答が正しく判定される

### 3. 画面表示テスト

#### 3.1 コース詳細ページ `/courses/ddd-practice`
- [ ] 15章が一覧表示される
- [ ] Chapter 1 に3レッスンが表示される
- [ ] Chapter 5, 6, 8 に移動したレッスンが表示される

#### 3.2 レッスンページ
- [ ] `/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-1` が表示される
- [ ] `/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-2` が表示される
- [ ] `/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-3` が表示される
- [ ] `/courses/ddd-practice/chapters/chapter-5/lessons/lesson-5-1` が表示される

#### 3.3 クイズページ
- [ ] 各レッスンからクイズに遷移できる
- [ ] クイズが正常に動作する
- [ ] 結果が正しく表示される

### 4. 技術要件準拠

#### 4.1 Tailwind CSS
- [ ] CSS Modulesが使用されていない
- [ ] 新規コンポーネントがTailwindでスタイリングされている

#### 4.2 テスト
- [ ] 全ユニットテストがパス
- [ ] 新規コードに対するテストが追加されている

### 5. 進捗データ互換性

- [ ] 既存の進捗データが破損しない
- [ ] 旧IDから新IDへのマイグレーションが機能する（必要な場合）

## テスト実行

```bash
# 全テスト実行
npm run test

# 特定のテスト実行
npm run test -- src/infrastructure/data/

# カバレッジ確認
npm run test:coverage
```

## 品質基準

| 項目 | 基準 |
|------|------|
| Type Safety | `any` 禁止、strict mode |
| Domain Purity | ドメイン層に外部依存なし |
| Test Coverage | ドメインロジックは100% |
| Tailwind CSS | CSS Modules不使用 |

## Definition of Done

- [ ] 全検証項目がパス
- [ ] 全テストがパス
- [ ] レビューコメントがない（または解決済み）

## Communication

検証完了後、以下を Boss1 に報告:
```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 006 品質検証完了。全項目パスしました。"
```

問題発見時:
```bash
./scripts/agent-send.sh boss1 "[BLOCKED] 問題を発見しました: {問題の詳細}"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §8
- docs/AGENT_PROTOCOL.md §8 Quality Gates
- docs/CONTENT_ROADMAP.md
