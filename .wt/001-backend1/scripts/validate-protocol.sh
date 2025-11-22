#!/bin/bash

# validate-protocol.sh - Claude Multi-Agent Framework Protocol Validator
# プロジェクトがマルチエージェントプロトコルに準拠しているかを検証します

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_PATH="${1:-.}"
PROJECT_PATH="$(cd "$PROJECT_PATH" 2>/dev/null && pwd || echo "$PROJECT_PATH")"

echo -e "${BLUE}=== Protocol Validation ===${NC}"
echo "Project: $PROJECT_PATH"
echo ""

ERRORS=0
WARNINGS=0

# ディレクトリ構造チェック
echo -e "${BLUE}[1/4] ディレクトリ構造${NC}"
for dir in "instructions/boss" "instructions/worker" "runs" "scripts"; do
  if [ -d "$PROJECT_PATH/$dir" ]; then
    echo "  ✓ $dir"
  else
    echo -e "  ${RED}✗ Missing: $dir${NC}"
    ((ERRORS++))
  fi
done
echo ""

# Boss指示書チェック
echo -e "${BLUE}[2/4] Boss指示書${NC}"
BOSS_FILE="$PROJECT_PATH/instructions/boss/boss-instructions.md"
if [ -f "$BOSS_FILE" ]; then
  echo "  ✓ boss-instructions.md"
  if grep -q "{{" "$BOSS_FILE" 2>/dev/null; then
    echo -e "  ${YELLOW}⚠ Placeholders found - 置換してください${NC}"
    ((WARNINGS++))
  fi
else
  echo -e "  ${RED}✗ Missing boss-instructions.md${NC}"
  ((ERRORS++))
fi
echo ""

# agent-send.sh チェック
echo -e "${BLUE}[3/4] agent-send.sh${NC}"
AGENT_SEND="$PROJECT_PATH/scripts/agent-send.sh"
if [ -f "$AGENT_SEND" ]; then
  echo "  ✓ agent-send.sh exists"
  if [ -x "$AGENT_SEND" ]; then
    echo "  ✓ Executable"
  else
    echo -e "  ${RED}✗ Not executable (chmod +x required)${NC}"
    ((ERRORS++))
  fi
else
  echo -e "  ${RED}✗ Missing agent-send.sh${NC}"
  ((ERRORS++))
fi
echo ""

# 結果
echo -e "${BLUE}[4/4] 結果${NC}"
echo "  Errors: $ERRORS | Warnings: $WARNINGS"
echo ""

if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✓ Protocol validation passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ Validation failed ($ERRORS errors)${NC}"
  exit 1
fi
