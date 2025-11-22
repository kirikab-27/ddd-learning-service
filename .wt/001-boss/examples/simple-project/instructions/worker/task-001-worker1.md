# チケット001 Worker1: Todo State管理

**From**: Boss1
**To**: Worker1
**Task**: Zustandを使用したTodo State管理実装
**Priority**: High
**Dependency**: なし（Tier1）

---

## 📋 タスク概要

ZustandでTodoの状態管理を実装してください。
CRUD操作（追加・完了切替・削除）を提供します。

---

## 🎯 実装内容

### ファイル作成

**ファイル名**: `src/stores/todoStore.ts`

### Todo型定義

```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
```

### Store実装要件

以下の機能を実装してください：

```typescript
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}
```

#### addTodo(text: string)
- 新しいTodoを追加
- IDは `crypto.randomUUID()` で生成
- createdAt は現在時刻
- completed は false

#### toggleTodo(id: string)
- 指定IDのTodoのcompleted状態を反転

#### deleteTodo(id: string)
- 指定IDのTodoを削除

---

## 💡 実装例（参考）

```typescript
import { create } from 'zustand';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    }]
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
}));
```

---

## ✅ Definition of Done (DoD)

- [ ] `src/stores/todoStore.ts` 実装完了
- [ ] TypeScriptエラー 0件（`npx tsc --noEmit`）
- [ ] 完了報告送信（`runs/001/worker1-report.md`）

**DoD: 0/3 → 目標: 3/3 (100%)**

---

## 📤 完了報告フォーマット

```markdown
# チケット001 Worker1 完了報告

**担当**: Worker1
**タスク**: Todo State管理

## 完了内容

- src/stores/todoStore.ts 実装完了
- addTodo, toggleTodo, deleteTodo 実装
- TypeScriptエラー: 0件

## DoD達成状況

- [x] todoStore.ts実装完了
- [x] TypeScriptエラー 0件
- [x] 完了報告送信

**DoD: 3/3 (100%)**

Worker1
```

---

Worker1、よろしくお願いします！
