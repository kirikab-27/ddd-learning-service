# Ticket 006: Quality - テスト・品質レビュー

## 実行タイミング
**Phase C**: Frontend1, Frontend2 のPRがマージされた後に実行

## 担当タスク

### 1. 構造確認

#### コース構造が正しいか確認
```bash
# sampleCourses.ts の構造を確認
# Chapter 1-4 が第1部に、Chapter 5-8 が第2部に配置されているか
```

### 2. コンテンツ確認

| 確認項目 | 期待値 |
|---------|--------|
| Chapter 1 レッスン数 | 3 |
| 各レッスンのクイズ数 | 5問 |
| Markdown形式 | 正しい |

### 3. 機能テスト

以下の画面を `npm run dev` で確認:

| URL | 確認項目 |
|-----|----------|
| `/courses/ddd-practice` | Chapter 1 が表示される |
| `/courses/ddd-practice/chapters/chapter-1/lessons/lesson-1-1` | レッスンが表示される |
| 同上（クイズ） | クイズが動作する |

### 4. テスト実行

```bash
npm run typecheck
npm run test
```

## チェックリスト

### 構造
- [ ] sampleCourses.ts が新構造になっている
- [ ] Chapter 1 が3レッスン含んでいる
- [ ] 既存レッスンが適切なChapterに移動している

### コンテンツ
- [ ] Lesson 1-1: なぜDDDが必要なのか
- [ ] Lesson 1-2: ドメインエキスパートとの協業
- [ ] Lesson 1-3: ドメインモデルの役割
- [ ] 各レッスンに5問のクイズ

### 機能
- [ ] Chapter 1 がコース詳細に表示される
- [ ] 各レッスンが正常に表示される
- [ ] クイズが正常に動作する
- [ ] 進捗が正しく記録される

### テスト
- [ ] `npm run typecheck` パス
- [ ] `npm run test` パス

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 006 - 品質レビュー完了。全チェックパス / 問題あり（詳細: ...）"
```
