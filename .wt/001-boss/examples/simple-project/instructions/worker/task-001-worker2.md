# チケット001 Worker2: Todo UI実装

**From**: Boss1
**To**: Worker2
**Task**: ReactコンポーネントでTodo UIを実装
**Priority**: High
**Dependency**: なし（Tier1、Worker1と並列）

---

## 📋 タスク概要

Todo管理アプリのUIを3つのReactコンポーネントで実装してください。
Zustand storeと連携し、CRUD操作を実現します。

---

## 🎯 実装内容

### 作成するコンポーネント

1. **TodoList** - Todo一覧とフォームを含むメインコンポーネント
2. **TodoItem** - 個別のTodo表示・操作
3. **AddTodo** - Todo追加フォーム

### ファイル一覧

```
src/components/
├── TodoList.tsx    # メインコンポーネント
├── TodoItem.tsx    # 個別Todo
└── AddTodo.tsx     # 追加フォーム
```

---

## 💡 実装要件

### TodoList.tsx

```typescript
import { useTodoStore } from '@/stores/todoStore';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      <AddTodo />
      <div className="mt-6 space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-gray-500 text-center mt-8">Todoがありません</p>
      )}
    </div>
  );
}
```

### TodoItem.tsx

```typescript
import { useTodoStore } from '@/stores/todoStore';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        削除
      </button>
    </div>
  );
}
```

### AddTodo.tsx

```typescript
import { useState } from 'react';
import { useTodoStore } from '@/stores/todoStore';

export default function AddTodo() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいTodoを入力..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        追加
      </button>
    </form>
  );
}
```

---

## ✅ Definition of Done (DoD)

- [ ] `TodoList.tsx` 実装完了
- [ ] `TodoItem.tsx` 実装完了
- [ ] `AddTodo.tsx` 実装完了
- [ ] todoStoreとの連携完了（useTodoStore使用）
- [ ] TypeScriptエラー 0件（`npx tsc --noEmit`）
- [ ] 完了報告送信（`runs/001/worker2-report.md`）

**DoD: 0/6 → 目標: 6/6 (100%)**

---

## 📤 完了報告フォーマット

```markdown
# チケット001 Worker2 完了報告

**担当**: Worker2
**タスク**: Todo UI実装

## 完了内容

- TodoList.tsx 実装完了
- TodoItem.tsx 実装完了
- AddTodo.tsx 実装完了
- useTodoStoreとの連携完了
- TypeScriptエラー: 0件

## DoD達成状況

- [x] TodoList.tsx実装完了
- [x] TodoItem.tsx実装完了
- [x] AddTodo.tsx実装完了
- [x] todoStoreとの連携完了
- [x] TypeScriptエラー 0件
- [x] 完了報告送信

**DoD: 6/6 (100%)**

Worker2
```

---

Worker2、よろしくお願いします！
