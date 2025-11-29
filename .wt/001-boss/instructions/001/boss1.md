# Boss1 Instructions: Ticket 001

## Your Role
タスクの進捗管理、PRレビュー、マージ調整を行う。

## Worker Mapping

| 論理名 | Worktree | ブランチ | 担当 |
|--------|----------|----------|------|
| Backend1 | 001-backend1 | agent/001/backend1 | 共有カーネル |
| Backend2 | 001-backend2 | agent/001/backend2 | Content BC |
| Backend3 | 001-backend3 | agent/001/backend3 | Progress BC + インフラ |
| Frontend1 | 001-frontend1 | agent/001/frontend1 | レイアウト基盤 |
| Frontend2 | 001-frontend2 | agent/001/frontend2 | レッスン表示 |
| Frontend3 | 001-frontend3 | agent/001/frontend3 | ナビゲーション |
| Quality | 001-quality | agent/001/quality | 品質レビュー |

## Execution Plan

### Phase A: 並列開始（即時）
```
Backend1 → 共有カーネル開始
Frontend1 → レイアウト開始
```

### Phase B: ドメイン層（Backend1完了後）
```
Backend1完了確認 → Backend2, Backend3 に開始指示
```

### Phase C: プレゼンテーション層（Phase B完了後）
```
Backend2, Frontend1完了確認 → Frontend2, Frontend3 に開始指示
```

### Phase D: 品質保証
```
全Worker完了 → Quality にレビュー依頼
```

## Communication Commands

```bash
# Phase A 開始
./scripts/agent-send.sh backend1 "[TASK] 共有カーネルの実装を開始してください。instructions/001/backend1.md を参照。"
./scripts/agent-send.sh frontend1 "[TASK] レイアウト基盤の実装を開始してください。instructions/001/frontend1.md を参照。"

# Backend1 完了後
./scripts/agent-send.sh backend2 "[TASK] Content BCの実装を開始してください。Backend1の共有カーネルが完了しました。instructions/001/backend2.md を参照。"
./scripts/agent-send.sh backend3 "[TASK] Progress BC + インフラの実装を開始してください。Backend1の共有カーネルが完了しました。instructions/001/backend3.md を参照。"

# Phase B 完了後
./scripts/agent-send.sh frontend2 "[TASK] レッスン表示コンポーネントを開始してください。instructions/001/frontend2.md を参照。"
./scripts/agent-send.sh frontend3 "[TASK] ナビゲーションコンポーネントを開始してください。instructions/001/frontend3.md を参照。"

# 全完了後
./scripts/agent-send.sh quality "[REVIEW] 全実装完了。品質レビューをお願いします。instructions/001/quality.md を参照。"
```

## Progress Tracking

| Worker | Status | Started | Completed | PR |
|--------|--------|---------|-----------|-----|
| Backend1 | ⏳ | | | agent/001/backend1 |
| Backend2 | ⏳ | | | agent/001/backend2 |
| Backend3 | ⏳ | | | agent/001/backend3 |
| Frontend1 | ⏳ | | | agent/001/frontend1 |
| Frontend2 | ⏳ | | | agent/001/frontend2 |
| Frontend3 | ⏳ | | | agent/001/frontend3 |
| Quality | ⏳ | | | agent/001/quality |

## Merge Order

```
1. Backend1 (共有カーネル) → main
2. Backend2 (Content BC) → main
3. Backend3 (Progress BC) → main
4. Frontend1 (レイアウト) → main
5. Frontend2 (レッスン表示) → main
6. Frontend3 (ナビゲーション) → main
```

## Escalation Triggers

以下の場合は President に報告:
- 設計変更が必要な問題の発見
- Worker間で解決できないコンフリクト
- 2時間以上のブロッカー
