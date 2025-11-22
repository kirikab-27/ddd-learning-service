#!/usr/bin/env bash
# 🚀 DDD-style Multi-Agent Setup (3 windows)
# 使い方: ./setup_ddd.sh <TICKET_ID>
# 例:     ./setup_ddd.sh 123

set -Eeuo pipefail
IFS=$'\n\t'

# ---------- 引数チェック ----------
if [ "${1:-}" = "" ]; then
  echo "Usage: $0 <TICKET_ID>" >&2
  exit 1
fi
TICKET_ID="$1"

# ---------- 依存チェック ----------
if ! command -v tmux >/dev/null 2>&1; then
  echo "ERROR: tmux が見つかりません。sudo apt update && sudo apt install -y tmux を実行してください。" >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git が見つかりません。sudo apt install -y git などでインストールしてください。" >&2
  exit 1
fi

# Gitリポジトリルートへ移動
if ! REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  echo "ERROR: Gitリポジトリ内で実行してください。" >&2
  exit 1
fi
cd "$REPO_ROOT"

# ---------- ログ関数 ----------
log_info()    { printf "\033[1;32m[INFO]\033[0m %b\n"    "$*"; }
log_success() { printf "\033[1;34m[SUCCESS]\033[0m %b\n" "$*"; }

echo "🤖 DDD Multi-Agent Dev Setup (ticket: ${TICKET_ID})"
echo "==================================================="
echo ""

# ---------- 役割定義 ----------
# boss + backend3 + frontend3 + quality = 8ロール
ROLE_KEYS=(boss backend1 backend2 backend3 frontend1 frontend2 frontend3 quality)
PANE_TITLES=("boss1" "worker1" "worker2" "worker3" "worker4" "worker5" "worker6" "worker7")
NUM_ROLES=${#ROLE_KEYS[@]}

WT_ROOT="${REPO_ROOT}/.wt"
mkdir -p "$WT_ROOT"
mkdir -p "runs/${TICKET_ID}" "instructions" "docs"

# ---------- worktree 作成 ----------
log_info "🌿 Git worktree 作成/更新 (ticket: ${TICKET_ID})..."
BASE_REF="main"
git fetch origin >/dev/null 2>&1 || true

# PRESIDENT 用 worktree（★ boss とは別ディレクトリ・別ブランチ）
PRESIDENT_ROLE="president"
PRESIDENT_BRANCH="agent/${TICKET_ID}/${PRESIDENT_ROLE}"
PRESIDENT_WT="${WT_ROOT}/${TICKET_ID}-${PRESIDENT_ROLE}"

log_info "  - president worktree: ${PRESIDENT_WT} (branch: ${PRESIDENT_BRANCH})"
if [ -d "$PRESIDENT_WT" ]; then
  log_info "    (既存のworktreeを再利用)"
else
  git worktree add -B "$PRESIDENT_BRANCH" "$PRESIDENT_WT" "$BASE_REF" >/dev/null 2>&1 || {
    echo "ERROR: git worktree add に失敗しました: branch=${PRESIDENT_BRANCH}, path=${PRESIDENT_WT}" >&2
    echo "必要なら git worktree list / git worktree remove で既存を掃除してください。" >&2
    exit 1
  }
fi

# 他のエージェント用 worktree
BRANCHES=()
WORKTREES=()

for i in $(seq 0 $((NUM_ROLES - 1))); do
  key="${ROLE_KEYS[$i]}"
  branch="agent/${TICKET_ID}/${key}"
  wt="${WT_ROOT}/${TICKET_ID}-${key}"
  BRANCHES+=("$branch")
  WORKTREES+=("$wt")

  log_info "  - worktree: ${wt} (branch: ${branch})"
  if [ -d "$wt" ]; then
    log_info "    (既存のworktreeを再利用)"
  else
    git worktree add -B "$branch" "$wt" "$BASE_REF" >/dev/null 2>&1 || {
      echo "ERROR: git worktree add に失敗しました: branch=${branch}, path=${wt}" >&2
      echo "必要なら git worktree list / git worktree remove で既存を掃除してください。" >&2
      exit 1
    }
  fi
done

log_success "✅ worktree 準備完了"
echo ""

# ---------- tmux セッションクリーンアップ ----------
SESSION="agents-${TICKET_ID}"

log_info "🧹 既存 tmux セッションクリーンアップ (${SESSION})..."
tmux kill-session -t "$SESSION" 2>/dev/null && log_info "${SESSION} セッション削除" || log_info "${SESSION} セッションは存在しませんでした"
log_success "✅ クリーンアップ完了"
echo ""

# ---------- セッション & Window 0: president ----------
log_info "👑 tmux セッション作成 & Window0: president..."

PRESIDENT_DIR="${PRESIDENT_WT}"

tmux new-session -d -s "$SESSION" -n "president"
tmux select-window -t "$SESSION":0
tmux select-pane   -t "$SESSION":0.0
tmux select-pane   -T "PRESIDENT"          # ★ pane_title を PRESIDENT に
tmux send-keys -t "$SESSION":0 "cd \"$PRESIDENT_DIR\"" C-m
tmux send-keys -t "$SESSION":0 \
  "export PS1='(\[\033[1;35m\]PRESIDENT\[\033[0m\]) \[\033[1;32m\]\w\[\033[0m\]\$ '" C-m
tmux send-keys -t "$SESSION":0 "echo '=== PRESIDENT Window (ticket: ${TICKET_ID}) ==='" C-m
tmux send-keys -t "$SESSION":0 "echo 'docs/DOMAIN_VISION.md, docs/CONTEXT_MAP.md, AGENT_PROTOCOL.md を参照してください。'" C-m

# ---------- Window 1: boss + backend1〜3 ----------
log_info "📺 Window1: boss + backend1〜3 (4ペイン)..."

tmux new-window -t "$SESSION":1 -n "boss-w1-3"

# 4ペイン作成
tmux select-window -t "$SESSION":1
tmux split-window -h -t "$SESSION":1
tmux select-pane   -t "$SESSION":1.0
tmux split-window  -v -t "$SESSION":1.0
tmux select-pane   -t "$SESSION":1.1
tmux split-window  -v -t "$SESSION":1.1
tmux select-layout -t "$SESSION":1 tiled

# ---------- Window 2: frontend1〜3 + quality ----------
log_info "📺 Window2: frontend1〜3 + quality (4ペイン)..."

tmux new-window -t "$SESSION":2 -n "w4-7"

tmux select-window -t "$SESSION":2
tmux split-window -h -t "$SESSION":2
tmux select-pane   -t "$SESSION":2.0
tmux split-window  -v -t "$SESSION":2.0
tmux select-pane   -t "$SESSION":2.1
tmux split-window  -v -t "$SESSION":2.1
tmux select-layout -t "$SESSION":2 tiled

# ---------- 各ペインに役割割当 ----------
log_info "🔧 ペイン設定 (タイトル・PS1・ディレクトリ)..."

for i in $(seq 0 $((NUM_ROLES - 1))); do
  title="${PANE_TITLES[$i]}"
  role="${ROLE_KEYS[$i]}"
  wt_dir="${WORKTREES[$i]}"

  # boss〜backend3 は Window1, frontend1〜3 + quality は Window2
  if [ "$i" -le 3 ]; then
    win=1
    pane="$i"
  else
    win=2
    pane=$((i - 4))
  fi

  target="${SESSION}:${win}.${pane}"

  tmux select-pane -t "$target" -T "$title"
  tmux send-keys   -t "$target" "cd \"$wt_dir\"" C-m

  case "$role" in
    boss)
      tmux send-keys -t "$target" \
        "export PS1='(\[\033[1;31m\]${title}\[\033[0m\]) \[\033[1;32m\]\w\[\033[0m\]\$ '" C-m
      ;;
    backend* )
      tmux send-keys -t "$target" \
        "export PS1='(\[\033[1;34m\]${title}\[\033[0m\]) \[\033[1;32m\]\w\[\033[0m\]\$ '" C-m
      ;;
    frontend* )
      tmux send-keys -t "$target" \
        "export PS1='(\[\033[1;36m\]${title}\[\033[0m\]) \[\033[1;32m\]\w\[\033[0m\]\$ '" C-m
      ;;
    quality )
      tmux send-keys -t "$target" \
        "export PS1='(\[\033[1;35m\]${title}\[\033[0m\]) \[\033[1;32m\]\w\[\033[0m\]\$ '" C-m
      ;;
  esac

  tmux send-keys -t "$target" \
    "echo '=== ${title} (${role}) エージェント (ticket: ${TICKET_ID}) ==='" C-m
done

log_success "✅ tmux ウィンドウ/ペイン構成 完了"
echo ""

# ---------- サマリ ----------
log_info "🔍 環境確認..."
echo ""
echo "📊 セットアップ結果:"
echo "==================="
echo "📂 リポジトリ: $REPO_ROOT"
echo "🎫 チケット:  $TICKET_ID"
echo ""
echo "🌿 worktrees:"
printf "  - %-9s: %s (%s)\n" "PRESIDENT" "${PRESIDENT_WT}" "${PRESIDENT_BRANCH}"
for i in $(seq 0 $((NUM_ROLES - 1))); do
  printf "  - %-9s: %s (%s)\n" "${PANE_TITLES[$i]}" "${WORKTREES[$i]}" "${BRANCHES[$i]}"
done
echo ""
echo "📺 tmux sessions:"
tmux list-sessions
echo ""
log_success "🎉 DDD Multi-Agent 環境セットアップ完了！"
echo ""
echo "📋 ウィンドウ構成:"
echo "  Window 0: president   (PRESIDENT 専用 worktree)"
echo "  Window 1: boss-w1-3   (4ペイン: boss1, worker1, worker2, worker3)"
echo "  Window 2: w4-7        (4ペイン: worker4, worker5, worker6, worker7)"
echo ""

# ---------- attach ----------
tmux select-window -t "${SESSION}:1"

if [ -z "${TMUX:-}" ]; then
  tmux attach -t "$SESSION"
else
  tmux switch-client -t "$SESSION"
fi
