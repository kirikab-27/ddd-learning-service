# Ticket 004: Frontend2 - Lesson/Quiz系コンポーネント Tailwind移行

## 技術スタック（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- **Markdown: @tailwindcss/typography (prose)**
- 参照: docs/REQUIREMENTS.md

## 担当ファイル

### 移行対象（CSS Modules → Tailwind）
1. `src/presentation/features/lesson/LessonHeader.tsx` + `LessonHeader.module.css`
2. `src/presentation/features/lesson/LessonNavigation.tsx` + `LessonNavigation.module.css`
3. `src/presentation/features/lesson/MarkdownRenderer.tsx` + `MarkdownRenderer.module.css`
4. `src/presentation/features/lesson/LessonCompleteButton.tsx` + `LessonCompleteButton.module.css`
5. `src/presentation/features/lesson/LessonContent.tsx` + `LessonContent.module.css`
6. `src/presentation/features/navigation/ChapterNav.tsx` + `ChapterNav.module.css`
7. `src/presentation/features/navigation/CourseSidebar.tsx` + `CourseSidebar.module.css`
8. `src/presentation/features/navigation/LessonNav.tsx` + `LessonNav.module.css`
9. `src/presentation/features/navigation/LessonNavigation.tsx` + `LessonNavigation.module.css`
10. `src/presentation/features/quiz/QuizContainer.tsx` + `QuizContainer.module.css`
11. `src/presentation/features/quiz/QuizProgress.tsx` + `QuizProgress.module.css`
12. `src/presentation/features/quiz/QuizQuestion.tsx` + `QuizQuestion.module.css`
13. `src/presentation/features/quiz/QuizResult.tsx` + `QuizResult.module.css`

## 作業手順

### Step 1: @tailwindcss/typography 確認
```bash
# インストール済みか確認、なければインストール
npm install @tailwindcss/typography
```

tailwind.config.ts に追加:
```ts
plugins: [require('@tailwindcss/typography')],
```

### Step 2: 各コンポーネント移行

### Step 3: CSS Modulesファイル削除

## 移行パターン例

### MarkdownRenderer（重要）
```tsx
// prose クラスで Markdown スタイリング
<article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600">
  <ReactMarkdown>{content}</ReactMarkdown>
</article>
```

### LessonCompleteButton
```tsx
<button
  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={isCompleted}
>
  {isCompleted ? '完了済み' : 'レッスンを完了する'}
</button>
```

### QuizQuestion
```tsx
<div className="bg-white rounded-lg shadow p-6 space-y-4">
  <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
  <div className="space-y-2">
    {question.options.map(option => (
      <label
        key={option.id}
        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <input type="radio" className="mr-3" />
        <span>{option.text}</span>
      </label>
    ))}
  </div>
</div>
```

### QuizProgress
```tsx
<div className="flex items-center gap-2">
  <span className="text-sm text-gray-600">問題 {current} / {total}</span>
  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-600 transition-all"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
</div>
```

### QuizResult
```tsx
<div className="text-center p-8 bg-white rounded-lg shadow">
  <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
    {score}%
  </div>
  <p className="mt-2 text-gray-600">
    {passed ? '合格です！' : 'もう一度挑戦してください'}
  </p>
</div>
```

## Definition of Done
- [ ] 全13ファイルのCSS ModulesがTailwindに移行完了
- [ ] 対応する13個の `.module.css` ファイルが削除されている
- [ ] @tailwindcss/typography が導入されている
- [ ] MarkdownRenderer で prose クラスが使用されている
- [ ] 見た目に大きな変化がない
- [ ] TypeScriptエラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend2完了] Ticket 004 - Lesson/Quiz系移行完了。PR #XX を作成しました。"
```
