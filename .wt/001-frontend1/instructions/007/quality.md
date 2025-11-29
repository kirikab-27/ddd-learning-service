# Ticket 007: Quality - テスト・品質レビュー

## 実行タイミング
**Phase B**: Frontend1 のPRがマージされた後に実行

## 担当タスク

### 1. 構造確認

#### コース構造が正しいか確認
```bash
# sampleCourses.ts の構造を確認
# Chapter 2 が第1部に配置されているか
# chapter2Lessons が正しくインポートされているか
```

### 2. コンテンツ確認

| 確認項目 | 期待値 |
|---------|--------|
| Chapter 2 レッスン数 | 3 |
| 各レッスンのクイズ数 | 5問 |
| Markdown形式 | 正しい |

### 3. 機能テスト

以下の画面を `npm run dev` で確認:

| URL | 確認項目 |
|-----|----------|
| `/courses/ddd-practice` | Chapter 2 が表示される |
| `/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-1` | レッスンが表示される |
| 同上（クイズ） | クイズが動作する |

### 4. テスト実行

```bash
npm run typecheck
npm run test -- --dir src
```

## チェックリスト

### 構造
- [ ] sampleCourses.ts に Chapter 2 が追加されている
- [ ] Chapter 2 が3レッスン含んでいる
- [ ] chapter2Lessons が正しくインポートされている

### コンテンツ
- [ ] Lesson 2-1: ユビキタス言語とは
- [ ] Lesson 2-2: チームで共通言語を作る
- [ ] Lesson 2-3: コードに反映する
- [ ] 各レッスンに5問のクイズ

### 機能
- [ ] Chapter 2 がコース詳細に表示される
- [ ] 各レッスンが正常に表示される
- [ ] クイズが正常に動作する
- [ ] 進捗が正しく記録される

### テスト
- [ ] `npm run typecheck` パス
- [ ] `npm run test -- --dir src` パス

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 007 - 品質レビュー完了。全チェックパス / 問題あり（詳細: ...）"
```
