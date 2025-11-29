# Ticket 004: Frontend1 - レイアウト系コンポーネント Tailwind移行

## 技術スタック（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md

## 担当ファイル

### 移行対象（CSS Modules → Tailwind）
1. `src/presentation/components/Header/Header.tsx` + `Header.module.css`
2. `src/presentation/components/Sidebar/Sidebar.tsx` + `Sidebar.module.css`
3. `src/presentation/components/Sidebar/SidebarItem.tsx` + `SidebarItem.module.css`
4. `src/presentation/layouts/CourseLayout.tsx` + `CourseLayout.module.css`
5. `src/presentation/layouts/RootLayout.tsx` + `RootLayout.module.css`

## 作業手順

### Step 1: 現状把握
各CSS Modulesファイルのスタイルを確認し、対応するTailwindクラスを特定する。

### Step 2: コンポーネント移行
```tsx
// Before
import styles from './Header.module.css';
<header className={styles.header}>

// After
<header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
```

### Step 3: CSS Modulesファイル削除
移行完了後、対応する `.module.css` ファイルを削除する。

## 移行パターン例

### Header
```tsx
// 一般的なヘッダーパターン
<header className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <h1 className="text-xl font-bold text-gray-900">DDD Learning Service</h1>
    <nav className="flex gap-4">...</nav>
  </div>
</header>
```

### Sidebar
```tsx
// サイドバーパターン
<aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
  <nav className="p-4 space-y-2">
    {/* SidebarItems */}
  </nav>
</aside>
```

### Layout
```tsx
// レイアウトパターン
<div className="min-h-screen flex flex-col">
  <Header />
  <div className="flex flex-1">
    <Sidebar />
    <main className="flex-1 p-6">{children}</main>
  </div>
</div>
```

## Definition of Done
- [ ] 全5ファイルのCSS ModulesがTailwindに移行完了
- [ ] 対応する5つの `.module.css` ファイルが削除されている
- [ ] 見た目に大きな変化がない（既存デザイン維持）
- [ ] TypeScriptエラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend1完了] Ticket 004 - レイアウト系移行完了。PR #XX を作成しました。"
```
