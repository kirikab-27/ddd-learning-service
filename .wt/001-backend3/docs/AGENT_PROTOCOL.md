# Agent Protocol: DDD Learning Service

## 1. Agent Hierarchy

```
                    ┌─────────────┐
                    │  PRESIDENT  │  戦略的判断・最終承認
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    Boss1    │  タスク分配・進捗管理・PR統合
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐        ┌────▼────┐        ┌────▼────┐
   │ Backend │        │Frontend │        │ Quality │
   │ Workers │        │ Workers │        │  Worker │
   │ (1-3)   │        │ (4-6)   │        │   (7)   │
   └─────────┘        └─────────┘        └─────────┘
```

## 2. Role Definitions

| Role | Agents | Responsibilities |
|------|--------|------------------|
| **President** | Window 0 | 設計判断、ドキュメント承認、コンフリクト解決 |
| **Boss1** | Window 1, Pane 0 | タスク割り当て、進捗追跡、PRレビュー・マージ |
| **Backend** | Worker 1-3 | ドメイン層、アプリケーション層、インフラ層 |
| **Frontend** | Worker 4-6 | プレゼンテーション層、UIコンポーネント |
| **Quality** | Worker 7 | テスト作成、コードレビュー、品質基準の適用 |

## 3. Git Workflow

### Branch Strategy

各エージェントは専用のworktreeとブランチで作業:

```
main
 │
 ├── agent/{TICKET_ID}/president   # President用
 ├── agent/{TICKET_ID}/boss        # Boss1用
 ├── agent/{TICKET_ID}/backend1    # Worker1用
 ├── agent/{TICKET_ID}/backend2    # Worker2用
 ├── agent/{TICKET_ID}/backend3    # Worker3用
 ├── agent/{TICKET_ID}/frontend1   # Worker4用
 ├── agent/{TICKET_ID}/frontend2   # Worker5用
 ├── agent/{TICKET_ID}/frontend3   # Worker6用
 └── agent/{TICKET_ID}/quality     # Worker7用
```

### Commit Convention

```
<type>(<scope>): <subject>

Types:
  feat     - 新機能
  fix      - バグ修正
  refactor - リファクタリング
  test     - テスト追加・修正
  docs     - ドキュメント
  chore    - ビルド・設定変更

Scopes:
  domain   - ドメイン層
  app      - アプリケーション層
  infra    - インフラ層
  ui       - プレゼンテーション層

Examples:
  feat(domain): add Score value object
  test(domain): add Score validation tests
  feat(ui): implement LessonCard component
```

### PR Flow

```
1. Worker が作業完了
   └── git push origin agent/{TICKET_ID}/{role}

2. Boss1 がレビュー
   └── 軽微な修正は直接コメント、大きな問題は Worker に差し戻し

3. Quality (Worker7) が品質チェック
   └── テストカバレッジ、型安全性、ドメイン層の純粋性

4. Boss1 が main へマージ
   └── Squash merge を推奨
```

## 4. Communication Protocol

### メッセージ送信

エージェント間のコミュニケーションには `agent-send.sh` を使用:

```bash
# 使用方法
./scripts/agent-send.sh <送信先> <メッセージ>

# 例: Boss1 から Worker1 へタスク指示
./scripts/agent-send.sh worker1 "CourseId 値オブジェクトを実装してください"

# 例: Worker1 から Boss1 へ完了報告
./scripts/agent-send.sh boss1 "CourseId 実装完了。PRをお願いします。"
```

### メッセージフォーマット

```
[FROM: {sender}] [TO: {receiver}] [TYPE: {type}]
{message}

Types:
  TASK     - タスク割り当て
  QUESTION - 質問・確認
  DONE     - 完了報告
  BLOCKED  - ブロッカー報告
  REVIEW   - レビュー依頼
```

## 5. Task Assignment Protocol

### Boss1 → Worker へのタスク指示

`instructions/{TICKET_ID}/` にタスクファイルを作成:

```markdown
# instructions/{TICKET_ID}/worker1.md

## Task: CourseId 値オブジェクトの実装

### Goal
`src/domain/shared/CourseId.ts` を作成

### Requirements
- private constructor パターン
- static create() でバリデーション
- equals() メソッド
- toString() メソッド

### Reference
- docs/IMPLEMENTATION_GUIDE.md §3.1.1

### Definition of Done
- [ ] 実装完了
- [ ] ユニットテスト作成
- [ ] git push 完了
- [ ] Boss1 へ DONE 報告
```

## 6. Escalation Path

問題発生時のエスカレーション:

```
Worker → Boss1 → President

1. Worker が判断に迷った場合
   └── Boss1 に QUESTION を送信

2. Boss1 が解決できない場合
   └── President に判断を仰ぐ

3. 設計変更が必要な場合
   └── President が DOMAIN_VISION.md との整合性を確認し判断
```

## 7. Conflict Resolution

### コードコンフリクト
```
1. 同じファイルを複数 Worker が編集した場合
2. Boss1 が調整し、どちらの変更を優先するか決定
3. 必要に応じて President が最終判断
```

### 設計コンフリクト
```
1. Worker 間で設計方針が異なる場合
2. Boss1 が IMPLEMENTATION_GUIDE.md を参照し判断
3. ガイドに記載がない場合は President が判断し、ガイドを更新
```

## 8. Quality Gates

PRマージ前の必須チェック:

| Check | Owner | Criteria |
|-------|-------|----------|
| Type Safety | Worker7 | `any` 禁止、strict mode |
| Domain Purity | Worker7 | ドメイン層に外部依存なし |
| Test Coverage | Worker7 | ドメインロジックは100% |
| Code Review | Boss1 | 設計原則の遵守 |

## 9. Session Initialization

各エージェントはセッション開始時に以下を読み込む:

```
必読ドキュメント:
├── docs/DOMAIN_VISION.md        # 全員
├── docs/CONTEXT_MAP.md          # 全員
├── docs/AGENT_PROTOCOL.md       # 全員
└── docs/agents/{role}.md        # 自分の役割のみ

タスク指示:
└── instructions/{TICKET_ID}/{agent}.md
```
