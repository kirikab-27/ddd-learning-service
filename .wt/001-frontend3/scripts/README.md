# Claude Multi-Agent Framework - Scripts

Claude Multi-Agent Frameworkを使った開発を支援するスクリプト集です。

## 概要

複数のClaude Codeインスタンス（エージェント）をtmuxで協調動作させます。
- **President**: プロジェクト全体を統括
- **Boss1-N**: チケット管理、ワーカーへのタスク割り当て
- **Worker1-N**: 実際の開発作業

## 1. agent-send.sh

エージェント間でメッセージを送受信するスクリプト。

**使用方法:**
```bash
./agent-send.sh <target_agent> <message>
```

**使用例:**
```bash
# Worker から Boss へ質問
./agent-send.sh boss1 "[TO: Boss1] Worker2 の完了を待つべきですか？"

# Boss から Worker へ回答
./agent-send.sh worker4 "[TO: Worker4] はい、Worker2 の完了を待ってください。"
```

**動作:** tmuxセッション内の対象ペインにメッセージを送信

## 2. setup-project.sh

新規プロジェクトにマルチエージェントプロトコルの構造を作成します。

**使用方法:**
```bash
./setup-project.sh <PROJECT_PATH>
```

**使用例:**
```bash
./setup-project.sh /path/to/my-project
./setup-project.sh ../my-project
```

**作成される構造:**
```
my-project/
├── instructions/
│   ├── boss/          # Boss指示書テンプレート
│   ├── worker/        # Workerタスク指示書テンプレート
│   ├── task/          # タスクテンプレート
│   └── planning/      # プランニングテンプレート
├── runs/              # 実行ログ・レポート
└── scripts/
    └── agent-send.sh  # エージェント間通信スクリプト
```

**次のステップ:**
1. プロジェクトディレクトリに移動
2. `instructions/boss/boss-instructions.md` を編集
3. `validate-protocol.sh` で検証
4. tmuxセッションを開始

## 3. validate-protocol.sh

プロジェクトがマルチエージェントプロトコルに準拠しているかを検証します。

**使用方法:**
```bash
./validate-protocol.sh [PROJECT_PATH]  # 省略時: カレントディレクトリ
```

**検証項目:**
1. ディレクトリ構造（instructions/boss, instructions/worker, runs, scripts）
2. Boss指示書（boss-instructions.md）の存在
3. プレースホルダー（{{...}}）の残存チェック（警告）
4. agent-send.sh の存在と実行権限

**終了コード:**
- `0`: 検証成功
- `1`: 検証失敗

## tmuxセッション構成

### セッション構造例

```
tmux session: "multiagent-dev"
├── window 0: president
├── window 1: boss1
├── window 2: worker1
├── window 3: worker2
└── window 4: worker3
```

### tmuxセッション開始

```bash
# セッション作成
tmux new-session -d -s multiagent-dev -n president
tmux new-window -t multiagent-dev:1 -n boss1
tmux new-window -t multiagent-dev:2 -n worker1
tmux attach-session -t multiagent-dev
```

### 推奨ワークフロー

1. `setup-project.sh` でプロジェクト構造作成
2. Boss指示書を編集
3. `validate-protocol.sh` で検証
4. tmux起動、各エージェント用ウィンドウ作成
5. 各ウィンドウでClaude Codeを起動して作業開始

## トラブルシューティング

**agent-send.sh でメッセージが届かない:**
- tmuxセッション名が正しいか確認
- 対象エージェントのtmuxウィンドウが存在するか確認

**validate-protocol.sh でエラー:**
- `mkdir -p instructions/boss instructions/worker runs scripts`
- `chmod +x scripts/agent-send.sh`

## 参考

- フレームワーク全体: 親ディレクトリの `README.md` と `PROTOCOL.md`
- テンプレート: `templates/` ディレクトリ
