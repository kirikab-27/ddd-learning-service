# Ticket 012: Quality - 品質レビュー

## 担当タスク

Frontend1 のChapter 6 エンティティ作成をレビューし、品質を保証する。

## レビュー対象

PR #XX（Frontend1 から報告されるPR番号）

## 確認項目

### 1. コンテンツ確認

- [ ] 3つのレッスンが正しく追加されている
  - Lesson 6-1: エンティティとは（新規）
  - Lesson 6-2: エンティティの実装（新規）
  - Lesson 6-3: エンティティのライフサイクル（新規）
- [ ] chapter6Lessons がエクスポートされている
- [ ] sampleCourses.ts で chapter6 が追加されている

### 2. クイズ確認

- [ ] 各レッスンに5問のクイズが追加されている（計15問）
- [ ] 各問題に4つの選択肢がある
- [ ] 正解が1つだけ設定されている
- [ ] 解説（explanation）が記載されている
- [ ] クイズIDが正しい形式（quiz-6-1, quiz-6-2, quiz-6-3）

### 3. 技術確認

```bash
# 型チェック
npx tsc --noEmit

# テスト実行
npm test
```

- [ ] TypeScript型エラー: 0件
- [ ] テスト: 全パス

### 4. 動作確認

- [ ] /courses/ddd-practice でChapter 6が表示される
- [ ] 3つのレッスンが正しく表示される
- [ ] クイズが動作する

### 5. コード品質

- [ ] Markdownの形式が適切
- [ ] コード例が正しくシンタックスハイライトされる
- [ ] 内容が論理的に構成されている
- [ ] Chapter 5（値オブジェクト）との違いが明確に説明されている

## Definition of Done

- [ ] 全確認項目がクリア
- [ ] PRをマージ（問題がない場合）
- [ ] Boss1に完了報告

## 報告方法

### 問題がない場合
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 012 - PASS。Chapter 6 エンティティ確認完了。PR #XX マージ済み。"
```

### 問題がある場合
```
./scripts/agent-send.sh boss "[Quality] Ticket 012 - 要修正。問題: [具体的な問題内容]"
```
