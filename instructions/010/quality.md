# Quality: テスト修正

## Task Overview
既存の Integration Test で失敗している lessonId 不一致問題を修正する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| テスト | Vitest |

## 作業内容

### 1. 失敗テストの確認

```bash
npm run test
```

失敗している11件のテストを特定する。

### 2. 原因の特定

Ticket 006 でコース構造を再編成した際、lessonId が変更された:
- 旧 lesson-2 → lesson-5-1
- 旧 lesson-3 → lesson-6-1
- 旧 lesson-4 → lesson-8-1

テスト内で旧 lessonId を参照している箇所を特定する。

### 3. 修正の実施

テストファイル内の lessonId を修正:

**修正対象ディレクトリ**:
```
src/application/progress/usecases/__tests__/
```

**現在有効な lessonId 一覧**:
- Chapter 1: lesson-1-1, lesson-1-2, lesson-1-3
- Chapter 2: lesson-2-1, lesson-2-2, lesson-2-3
- Chapter 3: lesson-3-1, lesson-3-2, lesson-3-3
- Chapter 4: lesson-4-1, lesson-4-2
- Chapter 5: lesson-5-1
- Chapter 6: lesson-6-1
- Chapter 8: lesson-8-1

### 4. 検証

```bash
npm run test
npm run type-check
```

## Definition of Done

- [ ] 失敗しているテストの原因を特定
- [ ] 全テストファイルの lessonId を修正
- [ ] `npm run test` で全テストがパス
- [ ] `npm run type-check` がパス

## Communication

作業完了後:
```bash
./scripts/agent-send.sh boss1 "[DONE] Ticket 010 テスト修正完了。全テストがパスしました。"
```
