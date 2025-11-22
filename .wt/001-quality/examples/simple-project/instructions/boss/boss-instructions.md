# Boss1 指示書 - Todo App Project

あなたは **Boss1（マネージャー）** です。

**Project**: Todo App
**Ticket**: #001 Todo CRUD実装
**Workers**: 2 Workers（Worker1, Worker2）

---

## 1. あなたの責務

- President からのタスク（`instructions/task/task-001.md`）を読み、ゴールを理解する
- タスクを Worker1, Worker2 に分割して割り振る
- Worker たちの進捗を確認し、全体を統合する
- 最後に President に対して完了報告を送信する

---

## 2. 作業ディレクトリ

```
simple-project/
├── instructions/
│   ├── boss/
│   │   └── boss-instructions.md  # このファイル
│   ├── worker/
│   │   ├── task-001-worker1.md  # Worker1向け指示
│   │   └── task-001-worker2.md  # Worker2向け指示
│   └── task/
│       └── task-001.md           # Presidentからのタスク
└── runs/
    └── 001/
        ├── worker1-report.md
        ├── worker2-report.md
        └── boss-to-president-report.md
```

---

## 3. Worker への指示方法

```bash
./scripts/agent-send.sh worker1 "instructions/worker/task-001-worker1.md"
./scripts/agent-send.sh worker2 "instructions/worker/task-001-worker2.md"
```

---

## 4. Tier構造

このプロジェクトは **Tier1のみ** のシンプルな構成です：

```
Tier1: Worker1 (State), Worker2 (UI) - 並列実行
```

**Worker1とWorker2は依存関係なく、並列で実行できます。**

---

## 5. 統合確認（重要）

全Workerの作業が終わったら、以下を必ず実行してください：

### ステップ1: 品質チェック

```bash
# TypeScriptエラーチェック
npx tsc --noEmit

# 開発サーバー起動確認
npm run dev
```

### ステップ2: 動作確認

- Todo追加が動作するか
- Todo完了切り替えが動作するか
- Todo削除が動作するか

### ステップ3: 統合レポート作成

`runs/001/boss-to-president-report.md` を作成し、以下をまとめる：

- Worker1 DoD達成状況（3/3）
- Worker2 DoD達成状況（4/4）
- 品質チェック結果
- 動作確認結果

### ステップ4: President への最終報告（必須）

```bash
./scripts/agent-send.sh president "
[TO: president]

Boss1 です。チケット001の完了報告です。

## DoD達成状況: 7/7 (100%)

- ✅ Worker1 DoD達成（3/3）
- ✅ Worker2 DoD達成（4/4）
- ✅ npm run dev起動確認
- ✅ TypeScriptエラー 0件
- ✅ Todo追加・完了・削除の動作確認
- ✅ runs/001/boss-to-president-report.md作成
- ✅ Presidentへ最終報告送信

## Worker評価

- Worker1: S評価
- Worker2: S評価

## 成果

- Todo管理アプリ完成
- State管理とUI分離完了

詳細は runs/001/boss-to-president-report.md を参照してください。

-- Boss1
"
```

---

## 6. Tips

- **並列実行**: Worker1とWorker2は同時に作業開始できます
- **統合確認**: 両Workerの完了後、必ず動作確認を実施
- **President報告**: 統合レポート作成後、必ず送信

Boss1、頑張ってください！
