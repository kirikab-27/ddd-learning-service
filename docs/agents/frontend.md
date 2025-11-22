# Frontend Workers Guide (Worker 4-6)

## 1. Your Mission

プレゼンテーション層（UIコンポーネント、カスタムフック）の実装を担当します。
**ビジネスロジックを持たず、UseCaseからのDTOを表示する**ことに専念してください。

## 2. Scope of Work

```
src/
├── app/                ★ ルーティング専用 ★
│   ├── layout.tsx
│   ├── page.tsx
│   └── courses/
│       └── [courseId]/
│           └── lessons/
│               └── [lessonId]/
│                   └── page.tsx
└── presentation/       ★ メインの作業領域 ★
    ├── components/     # UIコンポーネント
    │   ├── common/     # 汎用コンポーネント
    │   ├── course/     # コース関連
    │   ├── lesson/     # レッスン関連
    │   └── quiz/       # クイズ関連
    └── hooks/          # カスタムフック
```

## 3. Design System

### カラースキーム (Dark Mode)

```typescript
// tailwind.config.ts で定義済み想定
const colors = {
  background: {
    primary: '#0d1117',
    secondary: '#161b22',
    elevated: '#21262d',
  },
  text: {
    primary: '#e6edf3',
    secondary: '#8b949e',
    muted: '#6e7681',
  },
  accent: {
    primary: '#58a6ff',   // リンク、アクティブ
    success: '#3fb950',   // 完了、正解
    warning: '#d29922',   // 注意
    error: '#f85149',     // エラー
  },
  border: {
    default: '#30363d',
    emphasis: '#484f58',
  },
};
```

### タイポグラフィ

```css
/* フォントファミリー */
--font-ui: 'Inter', system-ui, sans-serif;
--font-code: 'JetBrains Mono', 'Fira Code', monospace;

/* フォントサイズ */
--text-h1: 2rem;      /* 32px */
--text-h2: 1.5rem;    /* 24px */
--text-h3: 1.25rem;   /* 20px */
--text-body: 1rem;    /* 16px */
--text-small: 0.875rem; /* 14px */
--text-code: 0.9rem;  /* 14.4px */
```

### スペーシング (8px Grid)

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

## 4. Component Patterns

### 基本構造

```typescript
// src/presentation/components/lesson/LessonCard.tsx
'use client';

import { type LessonSummaryDto } from '@/application/dto/CourseProgressDto';

interface LessonCardProps {
  lesson: LessonSummaryDto;
  onSelect: (lessonId: string) => void;
}

export function LessonCard({ lesson, onSelect }: LessonCardProps) {
  return (
    <button
      onClick={() => onSelect(lesson.id)}
      disabled={!lesson.isUnlocked}
      className={`
        w-full p-4 rounded-lg border text-left
        ${lesson.isCompleted
          ? 'border-green-500 bg-green-500/10'
          : lesson.isUnlocked
            ? 'border-border-default hover:border-accent-primary'
            : 'border-border-default opacity-50 cursor-not-allowed'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <StatusIcon status={getStatus(lesson)} />
        <span className="text-text-primary">{lesson.title}</span>
      </div>
    </button>
  );
}
```

### カスタムフック

```typescript
// src/presentation/hooks/useLessonDetail.ts
'use client';

import { useState, useEffect } from 'react';
import { createGetLessonUseCase } from '@/infrastructure/di/container';
import type { LessonDetailDto } from '@/application/dto/LessonDetailDto';

export function useLessonDetail(courseId: string, lessonId: string) {
  const [lesson, setLesson] = useState<LessonDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);
        const useCase = createGetLessonUseCase();
        const result = await useCase.execute({ courseId, lessonId });
        setLesson(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  return { lesson, loading, error };
}
```

### App Router ページ

```typescript
// src/app/courses/[courseId]/lessons/[lessonId]/page.tsx
import { LessonPage } from '@/presentation/components/lesson/LessonPage';

interface Props {
  params: { courseId: string; lessonId: string };
}

export default function Page({ params }: Props) {
  return <LessonPage courseId={params.courseId} lessonId={params.lessonId} />;
}
```

## 5. Layout Structure

### デスクトップ (md: 768px+)

```
+--------------------+----------------------------------------+
|                    |                                        |
|    Sidebar         |           Main Content                 |
|    (272px)         |                                        |
|                    |                                        |
|  DDD学習サービス    |   Lesson Title                         |
|  ─────────────     |   ─────────────────────                |
|  第1部: 基礎概念    |                                        |
|  ├ Ch.1 ドメイン ✓ |   Content with inline code blocks      |
|  ├ Ch.2 言語    ●  |                                        |
|  └ Ch.3 境界      |   [← Prev]              [Next →]       |
+--------------------+----------------------------------------+
```

### モバイル (< 768px)

```
+----------------------------------------+
| ≡  DDD学習サービス                      |  ← ハンバーガー
+----------------------------------------+
|                                        |
|   Lesson Title                         |
|   Content (full width)                 |
|   [← Prev]              [Next →]       |
+----------------------------------------+
```

## 6. Component Checklist

### 共通コンポーネント

- [ ] `Button` - Primary / Secondary / Ghost
- [ ] `Card` - 汎用カード
- [ ] `ProgressBar` - 進捗バー
- [ ] `StatusIcon` - 完了/進行中/未開始

### コース関連

- [ ] `Sidebar` - サイドバーナビゲーション
- [ ] `ChapterAccordion` - チャプター折りたたみ
- [ ] `LessonCard` - レッスンカード
- [ ] `ProgressIndicator` - 全体進捗表示

### レッスン関連

- [ ] `LessonPage` - レッスンメインページ
- [ ] `LessonContent` - Markdownコンテンツ表示
- [ ] `CodeBlock` - シンタックスハイライト付きコード
- [ ] `LessonNavigation` - 前後ナビゲーション

### クイズ関連

- [ ] `QuizCard` - クイズ問題カード
- [ ] `QuizOption` - 選択肢
- [ ] `QuizResult` - 結果表示
- [ ] `ScoreDisplay` - スコア表示

## 7. Implementation Rules

### ❌ DO NOT: ビジネスロジックを持つ

```typescript
// ❌ NG: コンポーネント内でビジネスロジック
function LessonCard({ lesson, previousLesson }) {
  // ロジックがコンポーネントに漏れている
  const isUnlocked = previousLesson?.isCompleted ?? true;
}

// ✅ OK: DTOから受け取るだけ
function LessonCard({ lesson }: { lesson: LessonSummaryDto }) {
  // isUnlocked は UseCase で計算済み
  const { isUnlocked } = lesson;
}
```

### ❌ DO NOT: ドメイン層を直接参照

```typescript
// ❌ NG: ドメインモデルを直接インポート
import { Score } from '@/domain/progress/models/Score';

// ✅ OK: DTOを使用
import type { QuizResultDto } from '@/application/dto/QuizResultDto';
```

### ✅ DO: 'use client' を適切に使用

```typescript
// hooks は必ず 'use client'
'use client';

// useState, useEffect を使うコンポーネントも 'use client'
'use client';

// サーバーコンポーネントとして動作できるものは 'use client' 不要
// (例: 静的なレイアウト、プロップスのみで動作するもの)
```

## 8. Styling Guidelines

### Tailwind クラスの順序

```typescript
// 推奨順序: レイアウト → サイズ → スペース → 見た目 → 状態
<div className="
  flex flex-col           // レイアウト
  w-full max-w-2xl        // サイズ
  p-4 gap-2               // スペース
  bg-background-secondary // 背景
  border border-border-default  // 枠線
  rounded-lg              // 角丸
  hover:border-accent-primary   // ホバー
  transition-colors       // アニメーション
">
```

### レスポンシブ

```typescript
// モバイルファースト
<aside className="
  hidden              // デフォルト: 非表示
  md:flex md:w-72     // md以上: 表示、幅272px
">
```

## 9. Communication

Boss1 との通信には `agent-send.sh` を使用:

```bash
# 完了報告
./scripts/agent-send.sh boss1 "[DONE] Frontend1 レイアウト基盤完了。PR: agent/001/frontend1"

# 問題発生時
./scripts/agent-send.sh boss1 "[BLOCKED] Frontend2: UseCase呼び出しで型エラーが発生。支援が必要です。"

# 質問
./scripts/agent-send.sh boss1 "[QUESTION] Frontend3: ナビゲーションのUI仕様について確認したいです。"
```

## 10. Reference Documents

- `docs/DESIGN_CONCEPT.md` - デザイン仕様の詳細
- `docs/IMPLEMENTATION_GUIDE.md` - アプリケーション層のDTO定義
- `docs/AGENT_PROTOCOL.md` - エージェント間通信プロトコル
