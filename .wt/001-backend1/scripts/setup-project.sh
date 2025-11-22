#!/bin/bash

# setup-project.sh - Claude Multi-Agent Framework Project Setup
# 新規プロジェクトにマルチエージェントプロトコルの構造を作成します

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

FRAMEWORK_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# ヘルプ
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Usage: setup-project.sh <PROJECT_PATH>"
  echo ""
  echo "新規プロジェクトにマルチエージェントプロトコルの構造を作成します。"
  echo ""
  echo "Example:"
  echo "  setup-project.sh /path/to/my-project"
  exit 0
fi

PROJECT_PATH="$1"
PROJECT_PATH="$(cd "$PROJECT_PATH" 2>/dev/null && pwd || echo "$PROJECT_PATH")"

echo -e "${BLUE}=== Claude Multi-Agent Framework - Project Setup ===${NC}"
echo "Project Path: $PROJECT_PATH"
echo ""

# プロジェクトディレクトリ作成
mkdir -p "$PROJECT_PATH"

# ディレクトリ構造作成
echo -e "${BLUE}Step 1: ディレクトリ構造作成${NC}"
for dir in "instructions/boss" "instructions/worker" "runs" "scripts"; do
  mkdir -p "$PROJECT_PATH/$dir"
  echo "  ✓ $dir"
done
echo ""

# テンプレートコピー
echo -e "${BLUE}Step 2: テンプレートコピー${NC}"
TEMPLATE_DIRS=("boss" "worker" "task" "planning")
for tdir in "${TEMPLATE_DIRS[@]}"; do
  src="$FRAMEWORK_ROOT/templates/instructions/$tdir"
  if [ -d "$src" ]; then
    if [ "$tdir" = "boss" ] || [ "$tdir" = "worker" ]; then
      cp -r "$src/"* "$PROJECT_PATH/instructions/$tdir/" 2>/dev/null || true
    else
      cp -r "$src" "$PROJECT_PATH/instructions/" 2>/dev/null || true
    fi
    echo "  ✓ $tdir templates"
  fi
done
echo ""

# スクリプトコピー
echo -e "${BLUE}Step 3: スクリプトコピー${NC}"
if [ -f "$FRAMEWORK_ROOT/scripts/agent-send.sh" ]; then
  cp "$FRAMEWORK_ROOT/scripts/agent-send.sh" "$PROJECT_PATH/scripts/"
  chmod +x "$PROJECT_PATH/scripts/agent-send.sh"
  echo "  ✓ agent-send.sh"
fi
echo ""

# 完了メッセージ
echo -e "${GREEN}=== ✓ Setup Complete! ===${NC}"
echo ""
echo -e "${BLUE}次のステップ:${NC}"
echo "1. cd $PROJECT_PATH"
echo "2. instructions/boss/boss-instructions.md を編集"
echo "3. $FRAMEWORK_ROOT/scripts/validate-protocol.sh で検証"
echo "4. tmuxセッションを開始"
echo ""
echo -e "${YELLOW}詳細: $FRAMEWORK_ROOT/scripts/README.md${NC}"
