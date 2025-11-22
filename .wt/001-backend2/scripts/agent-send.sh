#!/usr/bin/env bash
# 🔁 agent-send.sh
# tmux 上のエージェントペインにメッセージを送るヘルパー
#
# 使い方:
#   ./agent-send.sh boss1   "チケット201をお願いします"
#   ./agent-send.sh worker1 "Next.js セットアップの続きです"
#
# セッション名:
#   setup_ddd.sh <TICKET_ID> により `agents-<TICKET_ID>` が作成される想定です。
#   このスクリプトは、通常 tmux ペイン内（各エージェント環境）から呼ばれます。

set -euo pipefail
IFS=$'\n\t'

LOG_DIR="logs"
LOG_FILE="${LOG_DIR}/send_log.txt"
mkdir -p "$LOG_DIR"

usage() {
  echo "Usage: $0 <agent-name> \"message...\"" >&2
  echo "例:   $0 boss1 \"新しいチケット201をお願いします\"" >&2
  exit 1
}

if [ "$#" -lt 2 ]; then
  usage
fi

AGENT_NAME="$1"
shift
MESSAGE="$*"

# 現在の tmux セッション名を取得（通常は agents-<TICKET_ID>）
if command -v tmux >/dev/null 2>&1; then
  SESSION="${AGENTS_SESSION:-$(tmux display-message -p '#S' 2>/dev/null || true)}"
else
  SESSION=""
fi

if [ -z "$SESSION" ]; then
  echo "ERROR: tmux セッション名を取得できませんでした。tmux 内から実行してください。" >&2
  exit 1
fi

# エージェント名 → ペイン番号マッピング
# setup_ddd.sh の構成:
#   Window 0: president   (pane 0)
#   Window 1: boss1, worker1, worker2, worker3  (pane 0..3)
#   Window 2: worker4, worker5, worker6, worker7 (pane 0..3)
declare -A AGENT_MAP=(
  [president]="0.0"
  [boss1]="1.0"
  [worker1]="1.1"
  [worker2]="1.2"
  [worker3]="1.3"
  [worker4]="2.0"
  [worker5]="2.1"
  [worker6]="2.2"
  [worker7]="2.3"
)

TARGET_PANE="${AGENT_MAP[$AGENT_NAME]:-}"

if [ -z "$TARGET_PANE" ]; then
  echo "ERROR: unknown agent-name: ${AGENT_NAME}" >&2
  echo "利用可能: president, boss1, worker1, worker2, worker3, worker4, worker5, worker6, worker7" >&2
  exit 1
fi

TARGET="${SESSION}:${TARGET_PANE}"

# ログ出力
timestamp="$(date +'%Y-%m-%dT%H:%M:%S%z')"
{
  echo "[$timestamp] from=$(whoami) session=${SESSION} to=${AGENT_NAME} pane=${TARGET_PANE}"
  echo "  ${MESSAGE}"
  echo "------------------------------------------------------------"
} >> "$LOG_FILE"

# tmux へメッセージ送信
tmux send-keys -t "$TARGET" "$MESSAGE" C-m

echo "[INFO] sent to ${AGENT_NAME} (tmux ${TARGET})"