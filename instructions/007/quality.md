# Quality: テスト・品質レビュー

## Task Overview
Ticket 007 の成果物（Chapter 2 コンテンツ）の品質を検証する。

## 技術要件

| 項目 | 指定技術 |
|------|----------|
| スタイリング | Tailwind CSS（CSS Modules禁止） |
| テスト | Vitest |

## 前提条件

Frontend1 の作業が完了していること。

## 検証項目

### 1. コンテンツ検証

#### 1.1 レッスン存在確認
- [ ] lesson-2-1「ユビキタス言語とは」が存在
- [ ] lesson-2-2「チームで共通言語を作る」が存在
- [ ] lesson-2-3「コードに反映する」が存在

#### 1.2 コンテンツ品質
- [ ] 各レッスンに概要セクションがある
- [ ] 各レッスンにコード例がある
- [ ] 各レッスンにまとめセクションがある
- [ ] Markdownが正しくレンダリングされる
- [ ] コード例のシンタックスハイライトが正常

#### 1.3 クイズ検証
- [ ] quiz-lesson-2-1 が存在（5問）
- [ ] quiz-lesson-2-2 が存在（5問）
- [ ] quiz-lesson-2-3 が存在（5問）
- [ ] 各問題に正解と解説がある
- [ ] 回答が正しく判定される

### 2. 画面表示テスト

#### 2.1 コース詳細ページ `/courses/ddd-practice`
- [ ] Chapter 2 に3レッスンが表示される
- [ ] レッスンへのリンクが機能する

#### 2.2 レッスンページ
- [ ] `/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-1` が表示される
- [ ] `/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-2` が表示される
- [ ] `/courses/ddd-practice/chapters/chapter-2/lessons/lesson-2-3` が表示される
- [ ] ナビゲーション（前へ/次へ）が機能する

#### 2.3 クイズページ
- [ ] 各レッスンからクイズに遷移できる
- [ ] クイズが正常に動作する
- [ ] 結果が正しく表示される

### 3. データ整合性

#### 3.1 sampleLessons.ts
- [ ] chapter2Lessons がエクスポートされている
- [ ] 各レッスンの chapterId が 'chapter-2' になっている
- [ ] order が 1, 2, 3 になっている

#### 3.2 sampleQuizzes.ts
- [ ] 3つのクイズが追加されている
- [ ] lessonId が正しく設定されている

#### 3.3 sampleCourses.ts
- [ ] chapter-2 の lessons に chapter2Lessons が接続されている

### 4. 技術要件準拠

#### 4.1 Tailwind CSS
- [ ] CSS Modulesが使用されていない
- [ ] スタイリングはTailwindクラスを使用

#### 4.2 テスト
- [ ] 全ユニットテストがパス

### 5. 学習体験

#### 5.1 内容の一貫性
- [ ] Chapter 1 からの流れが自然
- [ ] 専門用語が適切に説明されている
- [ ] コード例が理解しやすい

#### 5.2 クイズの妥当性
- [ ] 問題がレッスン内容に沿っている
- [ ] 選択肢が明確に区別できる
- [ ] 解説が学習に役立つ

## テスト実行

```bash
# 全テスト実行
npm run test

# 型チェック
npm run type-check

# リント
npm run lint
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
./scripts/agent-send.sh boss1 "[DONE] Ticket 007 品質検証完了。全項目パスしました。"
```

問題発見時:
```bash
./scripts/agent-send.sh boss1 "[BLOCKED] 問題を発見しました: {問題の詳細}"
```

## Reference

- docs/REQUIREMENTS.md §3.1, §3.2, §8
- docs/AGENT_PROTOCOL.md §8 Quality Gates
- docs/CONTENT_ROADMAP.md
- Ticket 006 の品質検証結果
