# Worker4 Instructions: Ticket 001

## Task: レイアウト基盤の実装

### Prerequisites
- なし（Phase A: 並列作業）

### Goal
アプリケーション全体のレイアウト基盤（Sidebar, Header）を構築する。

### Deliverables

```
src/presentation/
├── layouts/
│   ├── RootLayout.tsx
│   ├── RootLayout.test.tsx
│   ├── CourseLayout.tsx
│   ├── CourseLayout.test.tsx
│   └── index.ts
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.test.tsx
│   │   └── index.ts
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── Sidebar.test.tsx
│   │   ├── SidebarItem.tsx
│   │   └── index.ts
│   └── index.ts
└── styles/
    ├── variables.css
    └── globals.css

app/
├── layout.tsx (update)
└── courses/
    └── [courseId]/
        └── layout.tsx
```

### Design System

```css
/* src/presentation/styles/variables.css */
:root {
  /* Colors - Slate base */
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-tertiary: #334155;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent: #38bdf8;
  --color-accent-hover: #7dd3fc;
  --color-success: #4ade80;
  --color-border: #334155;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Layout */
  --sidebar-width: 280px;
  --header-height: 60px;
  --content-max-width: 800px;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Implementation: Header

```typescript
// src/presentation/components/Header/Header.tsx
'use client';

import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'DDD実践学習' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📚</span>
        <span className={styles.logoText}>{title}</span>
      </div>
      <nav className={styles.nav}>
        {/* 将来的にユーザーメニュー等を追加 */}
      </nav>
    </header>
  );
}
```

```css
/* src/presentation/components/Header/Header.module.css */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--spacing-lg);
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logoIcon {
  font-size: 1.5rem;
}

.logoText {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}
```

### Implementation: Sidebar

```typescript
// src/presentation/components/Sidebar/Sidebar.tsx
'use client';

import { ReactNode } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {children}
      </nav>
    </aside>
  );
}
```

```typescript
// src/presentation/components/Sidebar/SidebarItem.tsx
'use client';

import Link from 'next/link';
import styles from './SidebarItem.module.css';

interface SidebarItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
  indent?: number;
}

export function SidebarItem({
  href,
  label,
  isActive = false,
  isCompleted = false,
  isLocked = false,
  indent = 0,
}: SidebarItemProps) {
  const className = [
    styles.item,
    isActive && styles.active,
    isCompleted && styles.completed,
    isLocked && styles.locked,
  ]
    .filter(Boolean)
    .join(' ');

  if (isLocked) {
    return (
      <div
        className={className}
        style={{ paddingLeft: `${indent * 12 + 16}px` }}
      >
        <span className={styles.lockIcon}>🔒</span>
        <span className={styles.label}>{label}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={{ paddingLeft: `${indent * 12 + 16}px` }}
    >
      {isCompleted && <span className={styles.checkIcon}>✓</span>}
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
```

### Implementation: CourseLayout

```typescript
// src/presentation/layouts/CourseLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import styles from './CourseLayout.module.css';

interface CourseLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function CourseLayout({ children, sidebar }: CourseLayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sidebar>{sidebar}</Sidebar>
        <main className={styles.main}>
          <div className={styles.content}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
```

```css
/* src/presentation/layouts/CourseLayout.module.css */
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
}

.body {
  display: flex;
  flex: 1;
}

.main {
  flex: 1;
  padding: var(--spacing-xl);
  overflow-y: auto;
}

.content {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .body {
    flex-direction: column;
  }
}
```

### App Router Integration

```typescript
// app/courses/[courseId]/layout.tsx
import { CourseLayout } from '@/presentation/layouts/CourseLayout';
import { CourseSidebar } from '@/presentation/features/navigation/CourseSidebar';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  return (
    <CourseLayout
      sidebar={<CourseSidebar courseId={params.courseId} />}
    >
      {children}
    </CourseLayout>
  );
}
```

### Definition of Done

- [ ] CSS変数定義: variables.css
- [ ] Header コンポーネント
- [ ] Sidebar コンポーネント
- [ ] SidebarItem コンポーネント
- [ ] CourseLayout コンポーネント
- [ ] App Router統合（layout.tsx）
- [ ] レスポンシブ対応（モバイル）
- [ ] git commit & push
- [ ] Boss1 に完了報告

### Commands

```bash
# 開発サーバー起動
npm run dev

# テスト実行
npm run test src/presentation/

# 型チェック
npm run typecheck

# コミット
git add src/presentation/ app/
git commit -m "feat(presentation): add layout foundation"
git push origin agent/001/frontend1
```

### Communication

Boss1 への報告は `agent-send.sh` を使用:

```bash
# 完了報告
./scripts/agent-send.sh boss1 "[DONE] Frontend1 レイアウト基盤完了。PR: agent/001/frontend1"

# 問題発生時
./scripts/agent-send.sh boss1 "[BLOCKED] Frontend1: 〇〇の問題が発生。支援が必要です。"
```

### Report Template

```
[DONE] Frontend1 レイアウト基盤完了

作成ファイル:
- src/presentation/styles/variables.css
- src/presentation/components/Header/Header.tsx
- src/presentation/components/Sidebar/Sidebar.tsx, SidebarItem.tsx
- src/presentation/layouts/CourseLayout.tsx
- app/courses/[courseId]/layout.tsx

テスト結果: 全パス
PR: agent/001/frontend4
```
