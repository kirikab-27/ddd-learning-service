# Ticket 004: Quality - 視覚的リグレッションテスト

## 実行タイミング
**Phase B**: Frontend1, Frontend2, Frontend3 の全PRがマージされた後に実行

## 担当タスク

### 1. CSS Modules完全削除確認
```bash
# CSS Modulesファイルが残っていないことを確認
find src -name "*.module.css" -type f
# 結果が空であること
```

### 2. 全画面の視覚確認

以下の画面を `npm run dev` で確認:

| 画面 | URL | 確認項目 |
|------|-----|----------|
| トップページ | `/` | Hero、Features、Prerequisites、CTAセクション表示 |
| コースページ | `/courses/ddd-introduction` | サイドバー、レッスン一覧表示 |
| レッスンページ | `/courses/ddd-introduction/chapters/chapter-1/lessons/lesson-1` | ヘッダー、Markdownコンテンツ、ナビゲーション |
| クイズページ | 同上（クイズボタン押下） | 問題表示、選択肢、進捗バー、結果表示 |

### 3. レスポンシブ確認
各画面を以下のビューポートで確認:
- Desktop (1280px+)
- Tablet (768px - 1279px)
- Mobile (< 768px)

### 4. Tailwind Typography確認
Markdownコンテンツが `prose` クラスで適切にスタイリングされていること:
- 見出しのサイズ・余白
- リストのスタイル
- コードブロックのスタイル
- リンクの色

### 5. テスト実行
```bash
npm run typecheck
npm run test
npm run lint
```

## チェックリスト

### CSS Modules削除確認
- [ ] `src/presentation/components/Header/Header.module.css` 削除済み
- [ ] `src/presentation/components/Sidebar/Sidebar.module.css` 削除済み
- [ ] `src/presentation/components/Sidebar/SidebarItem.module.css` 削除済み
- [ ] `src/presentation/features/lesson/LessonHeader.module.css` 削除済み
- [ ] `src/presentation/features/lesson/LessonNavigation.module.css` 削除済み
- [ ] `src/presentation/features/lesson/MarkdownRenderer.module.css` 削除済み
- [ ] `src/presentation/features/lesson/LessonCompleteButton.module.css` 削除済み
- [ ] `src/presentation/features/lesson/LessonContent.module.css` 削除済み
- [ ] `src/presentation/features/navigation/ChapterNav.module.css` 削除済み
- [ ] `src/presentation/features/navigation/CourseSidebar.module.css` 削除済み
- [ ] `src/presentation/features/navigation/LessonNav.module.css` 削除済み
- [ ] `src/presentation/features/navigation/LessonNavigation.module.css` 削除済み
- [ ] `src/presentation/features/quiz/QuizContainer.module.css` 削除済み
- [ ] `src/presentation/features/quiz/QuizProgress.module.css` 削除済み
- [ ] `src/presentation/features/quiz/QuizQuestion.module.css` 削除済み
- [ ] `src/presentation/features/quiz/QuizResult.module.css` 削除済み
- [ ] `src/presentation/layouts/CourseLayout.module.css` 削除済み
- [ ] `src/presentation/layouts/RootLayout.module.css` 削除済み

### 視覚確認
- [ ] トップページ: 全セクション正常表示
- [ ] トップページ: CTAボタンがコースページにリンク
- [ ] コースページ: サイドバー正常表示
- [ ] レッスンページ: Markdownコンテンツ正常表示（proseスタイル）
- [ ] クイズ: 問題・選択肢・結果が正常表示
- [ ] レスポンシブ: モバイルで崩れない

### テスト
- [ ] `npm run typecheck` パス
- [ ] `npm run test` パス
- [ ] `npm run lint` パス

## 問題発見時の対応

問題を発見した場合:
1. 具体的な問題箇所と内容を記録
2. Boss1に報告し、該当Workerに修正依頼

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Quality完了] Ticket 004 - 視覚確認完了。全チェックパス / 問題あり（詳細: ...）"
```
