# Simple Project Example: Todo App

このサンプルは、Claude Multi-Agent Frameworkを使用したシンプルなプロジェクトの例です。

## プロジェクト概要

- **名称**: Todo App
- **技術スタック**: React, TypeScript
- **Workers**: 2 Workers
- **Tier**: Tier1のみ（並列実行）

## タスク概要

チケット001: Todo CRUD実装

### Worker割り当て

| Worker | 担当タスク | 依存関係 |
|--------|-----------|---------|
| Worker1 | Todo State管理（Zustand） | なし |
| Worker2 | Todo UI実装（React Components） | なし |

### Tier構造

```
Tier1: Worker1 (State), Worker2 (UI) - 並列実行
```

## 実行例

```bash
# Setup
/path/to/framework/scripts/setup-project.sh $(pwd)

# Edit boss-instructions.md
# Create task-001.md

# Launch tmux
tmux new -s todo-app

# Send task
./scripts/agent-send.sh boss1 "instructions/task/task-001.md"
```

## 学習ポイント

- ✅ シンプルな2 Workers構成
- ✅ 並列実行の実践
- ✅ DoD 100%の達成

## ディレクトリ構造

```
simple-project/
├── README.md                           # このファイル
├── instructions/
│   ├── boss/
│   │   └── boss-instructions.md        # Boss1向け指示書
│   ├── worker/
│   │   ├── task-001-worker1.md        # Worker1タスク（State管理）
│   │   └── task-001-worker2.md        # Worker2タスク（UI実装）
│   └── task/
│       └── task-001.md                 # タスク仕様書
└── runs/
    └── 001/
        ├── worker1-report.md           # Worker1完了報告
        ├── worker2-report.md           # Worker2完了報告
        └── boss-to-president-report.md # Boss1最終報告
```

## 期待される成果

このシンプルなサンプルを通じて、以下を学べます：

1. **並列実行**: 2つのWorkerが依存関係なく並列で作業
2. **DoD達成**: 各Workerが明確なDoD（完了条件）を満たす
3. **報告プロトコル**: Worker → Boss → President の報告フロー

## 次のステップ

より複雑なプロジェクト例については、`../complex-project/` を参照してください。
