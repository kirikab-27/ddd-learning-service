# Complex Project Example: SaaS App with RAG

このサンプルは、Claude Multi-Agent Frameworkを使用した複雑なプロジェクトの例です。

## プロジェクト概要

- **名称**: SaaS App with RAG
- **技術スタック**: Next.js, TypeScript, Supabase, OpenAI
- **Workers**: 5-6 Workers（タスクによる）
- **Tier**: 多層構造（Tier1-4）

## タスク一覧

### チケット001: 認証機能（3 Workers）

| Worker | 担当タスク | 依存関係 |
|--------|-----------|---------|
| Worker1 | Supabase Auth設定 | なし |
| Worker2 | Auth UI実装 | Worker1完了後 |
| Worker3 | Protected Routes | Worker2完了後 |

**Tier構造**:
```
Tier1: Worker1 (Supabase Auth)
Tier2: Worker2 (Auth UI)
Tier3: Worker3 (Protected Routes)
```

### チケット002: RAG統合（6 Workers, BookRAG Managerと同構成）

| Worker | 担当タスク | 依存関係 |
|--------|-----------|---------|
| Worker1 | Supabase Vector | なし |
| Worker2 | OpenAI Embeddings | なし |
| Worker3 | Vector DB操作 | Worker1,2完了後 |
| Worker4 | RAGロジック | Worker3完了後 |
| Worker5 | 類似検索UI | Worker4完了後 |
| Worker6 | セマンティック検索UI | Worker4完了後 |

**Tier構造**:
```
Tier1: Worker1, Worker2 (並列)
Tier2: Worker3
Tier3: Worker4
Tier4: Worker5, Worker6 (並列)
```

## 実行例

```bash
# Setup
/path/to/framework/scripts/setup-project.sh $(pwd)

# Planning phase
# Create v1.0.0-mvp.md

# Task execution
./scripts/agent-send.sh boss1 "instructions/task/task-001.md"
# (Wait for completion)
./scripts/agent-send.sh boss1 "instructions/task/task-002.md"
```

## 学習ポイント

- ✅ 複雑なTier構造の設計
- ✅ 多数のWorkers管理
- ✅ Planning phaseの活用
- ✅ 複数タスクの連携

## ディレクトリ構造

```
complex-project/
├── README.md                           # このファイル
├── instructions/
│   ├── boss/
│   │   └── boss-instructions.md        # Boss1向け指示書
│   ├── worker/
│   │   ├── task-002-worker1.md        # RAG: Supabase Vector
│   │   ├── task-002-worker2.md        # RAG: OpenAI Embeddings
│   │   ├── task-002-worker3.md        # RAG: Vector DB操作
│   │   ├── task-002-worker4.md        # RAG: RAGロジック
│   │   ├── task-002-worker5.md        # RAG: 類似検索UI
│   │   └── task-002-worker6.md        # RAG: セマンティック検索UI
│   ├── task/
│   │   ├── task-001.md                 # 認証機能
│   │   └── task-002.md                 # RAG統合
│   └── planning/
│       └── v1.0.0-mvp.md               # MVP計画
└── runs/
    ├── 001/                            # 認証機能実行結果
    └── 002/                            # RAG統合実行結果
        ├── worker1-report.md
        ├── worker2-report.md
        ├── worker3-report.md
        ├── worker4-report.md
        ├── worker5-report.md
        ├── worker6-report.md
        └── boss-to-president-report.md
```

## このサンプルの特徴

### 1. 多層Tier構造

チケット002（RAG統合）では4つのTierを使用：
- **Tier1**: 基盤（Supabase, OpenAI）- 並列
- **Tier2**: Vector DB操作
- **Tier3**: RAGロジック
- **Tier4**: UI実装 - 並列

### 2. 依存関係管理

- 明確な依存関係定義
- Tierごとの完了待機
- 並列実行の最適化

### 3. Planning Phase

`instructions/planning/v1.0.0-mvp.md`でMVP範囲を事前定義：
- 機能スコープ
- Worker割り当て
- Tier構造設計

## 実装のリアリティ

このサンプルは **BookRAG Manager** での実際の成功実績を基にしています：

- **Protocol Improvement 3**: 11連続成功達成
- **DoD 100%達成**: 全Worker完了条件満足
- **TypeScriptエラー 0件**: 厳格な品質基準

## 次のステップ

1. Planning phaseでMVP範囲を定義
2. Boss1がタスクをWorkerに割り振り
3. Tierごとに段階的実行
4. 統合確認とPresident報告

シンプルなプロジェクト（`../simple-project/`）で基本を学んだ後、
このComplex Projectで実践的なスキルを身につけましょう。
