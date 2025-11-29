# Ticket 008: Quality - テスト・品質レビュー

## 実行タイミング
**Phase B**: Frontend1 のPRがマージされた後に実行

## 担当タスク

### 1. 構造確認

#### コース構造が正しいか確認
```bash
# sampleCourses.ts の構造を確認
# Chapter 3 が第1部に配置されているか
# chapter3Lessons が正しくインポートされているか
```

### 2. コンテンツ確認

| 確認項目 | 期待値 |
|---------|--------|
| Chapter 3 レッスン数 | 3 |
| 各レッスンのクイズ数 | 5問 |
| Markdown形式 | 正しい |

### 3. 機能テスト

以下の画面を `npm run dev` で確認:

| URL | 確認項目 |
|-----|----------|
| `/courses/ddd-practice` | Chapter 3 が表示される |
| `/courses/ddd-practice/chapters/chapter-3/lessons/lesson-3-1` | レッスンが表示される |
| 同上（クイズ） | クイズが動作する |

### 4. テスト実行

```bash
npm run typecheck
npm run test -- --dir src
```

## チェックリスト

### 構造
- [ ] sampleCourses.ts に Chapter 3 が追加されている
- [ ] Chapter 3 が3レッスン含んでいる
- [ ] chapter3Lessons が正しくインポートされている

### コンテンツ
- [ ] Lesson 3-1: コンテキストとは何か
- [ ] Lesson 3-2: コンテキストの見つけ方
- [ ] Lesson 3-3: コンテキスト間の関係
- [ ] 各レッスンに5問のクイズ

### 機能
- [ ] Chapter 3 がコース詳細に表示される
- [ ] 各レッスンが正常に表示される
- [ ] クイズが正常に動作する
- [ ] 進捗が正しく記録される

### テスト
- [ ] `npm run typecheck` パス
- [ ] `npm run test -- --dir src` パス

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 008 - 品質レビュー完了。全チェックパス / 問題あり（詳細: ...）"
```
