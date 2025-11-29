# Ticket 004: 技術的負債解消 - Tailwind CSS移行

## Goal
要件定義書との乖離を解消し、CSS ModulesからTailwind CSSへ移行する。

## Background
Ticket 001-003の実装で、要件定義書（docs/REQUIREMENTS.md）で指定されたTailwind CSSではなく、CSS Modulesが使用されていた。この技術的負債を解消する。

## Scope

### In Scope
- 全CSS ModulesファイルのTailwind CSS移行
- トップページの要件準拠実装（コース一覧へのCTA）
- Tailwind Typography（prose）の導入

### Out of Scope
- 新機能追加
- URL構造の変更（別チケットで対応）
- ダークモード対応（将来対応）

## 対象ファイル

### CSS Modules（削除対象）
```
src/presentation/components/Header/Header.module.css
src/presentation/components/Sidebar/Sidebar.module.css
src/presentation/components/Sidebar/SidebarItem.module.css
src/presentation/features/lesson/LessonHeader.module.css
src/presentation/features/lesson/LessonNavigation.module.css
src/presentation/features/lesson/MarkdownRenderer.module.css
src/presentation/features/lesson/LessonCompleteButton.module.css
src/presentation/features/lesson/LessonContent.module.css
src/presentation/features/navigation/ChapterNav.module.css
src/presentation/features/navigation/CourseSidebar.module.css
src/presentation/features/navigation/LessonNav.module.css
src/presentation/features/navigation/LessonNavigation.module.css
src/presentation/features/quiz/QuizContainer.module.css
src/presentation/features/quiz/QuizProgress.module.css
src/presentation/features/quiz/QuizQuestion.module.css
src/presentation/features/quiz/QuizResult.module.css
src/presentation/layouts/CourseLayout.module.css
src/presentation/layouts/RootLayout.module.css
```

### ページ（修正対象）
```
app/page.tsx - トップページをTailwindで再実装
```

## Task Assignment

| Worker | Worktree | 担当領域 | 依存関係 |
|--------|----------|----------|----------|
| Frontend1 | 004-frontend1 | レイアウト系コンポーネント移行 | なし |
| Frontend2 | 004-frontend2 | Lesson/Quiz系コンポーネント移行 | なし |
| Frontend3 | 004-frontend3 | トップページ実装 | なし |
| Quality | 004-quality | 視覚的リグレッションテスト | 全Worker完了後 |

## Execution Order

```
Phase A: 並列作業（依存なし）
├── Frontend1: Header, Sidebar, Layout系
├── Frontend2: Lesson, Quiz系コンポーネント
└── Frontend3: トップページ

Phase B: 統合・品質保証
└── Quality: 全画面の視覚確認、リグレッションテスト
```

## Technical Requirements

### Tailwind設定確認
```bash
# tailwind.config.ts が存在することを確認
# @tailwindcss/typography プラグインの追加が必要な場合はインストール
npm install @tailwindcss/typography
```

### 移行パターン

```tsx
// Before (CSS Modules)
import styles from './Component.module.css';
<div className={styles.container}>

// After (Tailwind)
<div className="max-w-4xl mx-auto p-4">
```

### Markdown用 prose クラス
```tsx
// MarkdownRenderer.tsx
<div className="prose prose-slate max-w-none">
  {/* Markdown content */}
</div>
```

### トップページ要件（app/page.tsx）
- サービス紹介セクション
- コース一覧へのCTAボタン
- 前提知識ガイドへのリンク
- レスポンシブデザイン

## Definition of Done

- [ ] 全CSS Modulesファイルが削除されている
- [ ] 全コンポーネントがTailwind CSSでスタイリングされている
- [ ] トップページが要件通りに実装されている
- [ ] @tailwindcss/typography が導入されている
- [ ] 全画面で視覚的なリグレッションがない
- [ ] 全テストがパス
- [ ] Quality の品質レビューをパス

## Notes

- 既存の見た目を大きく変えず、スタイリング手法のみ移行する
- 移行中に発見したUI改善点は別チケットで対応
- Boss1は完了後に `runs/004/REPORT.md` を作成すること

## 再発防止策
今後のチケットでは、Worker向け指示書に以下を明記すること：
- 使用する技術スタック（Tailwind CSS必須）
- docs/REQUIREMENTS.md への参照
