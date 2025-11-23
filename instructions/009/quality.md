# Ticket 009: Quality - 品質レビュー

## 担当タスク

Frontend1 のChapter 4コンテンツをレビューし、第1部（MVP Phase 1）の品質を保証する。

## レビュー対象

PR #XX（Frontend1 から報告されるPR番号）

## 確認項目

### 1. コンテンツ確認

- [ ] 2つのレッスンが正しく追加されている
  - Lesson 4-1: コンテキストマップとは
  - Lesson 4-2: 統合パターン
- [ ] chapter4Lessons がエクスポートされている
- [ ] sampleCourses.ts に Chapter 4 が接続されている
- [ ] Chapter 4 が第4章として正しい順序で配置されている

### 2. クイズ確認

- [ ] 各レッスンに5問のクイズが追加されている（計10問）
- [ ] 各問題に4つの選択肢がある
- [ ] 正解が1つだけ設定されている
- [ ] 解説（explanation）が記載されている
- [ ] クイズIDが正しい形式（quiz-4-1, quiz-4-2）

### 3. 技術確認

```bash
# 型チェック
npx tsc --noEmit

# テスト実行
npm test

# ビルド確認（必要に応じて）
npm run build
```

- [ ] TypeScript型エラー: 0件
- [ ] テスト: 全パス
- [ ] ビルド: 成功（必要な場合）

### 4. 動作確認

- [ ] /courses/ddd-practice でChapter 4が表示される
- [ ] Lesson 4-1 が正しく表示される
- [ ] Lesson 4-2 が正しく表示される
- [ ] クイズが動作する

### 5. 第1部完成確認

以下の構成が完成していることを確認:

```
第1部: DDDの基礎概念（戦略的設計）
├── Chapter 1: ドメインとは何か（3レッスン）✓
├── Chapter 2: ユビキタス言語（3レッスン）✓
├── Chapter 3: 境界づけられたコンテキスト（3レッスン）✓
└── Chapter 4: コンテキストマップ（2レッスン）← 今回
```

## Definition of Done

- [ ] 全確認項目がクリア
- [ ] PRをマージ（問題がない場合）
- [ ] Boss1に完了報告

## 報告方法

### 問題がない場合
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 009 - PASS。Chapter 4 品質確認完了。PR #XX マージ済み。第1部（MVP Phase 1）完成！"
```

### 問題がある場合
```
./scripts/agent-send.sh boss "[Quality] Ticket 009 - 要修正。問題: [具体的な問題内容]"
```
