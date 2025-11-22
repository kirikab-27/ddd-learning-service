# 新規プロジェクトへの適用ガイド

**Claude Multi-Agent Framework (Protocol v4) を新規プロジェクトで使用する完全ガイド**

---

## 📋 目次

1. [概要](#概要)
2. [前提条件](#前提条件)
3. [Phase 1: セットアップ](#phase-1-セットアップ5分)
4. [Phase 2: カスタマイズ](#phase-2-プロジェクト固有情報の設定10分)
5. [Phase 3: タスク作成](#phase-3-最初のタスク作成20分)
6. [Phase 4: 環境起動](#phase-4-multi-agent環境の起動5分)
7. [Phase 5: 実行](#phase-5-タスク実行実作業開始)
8. [Protocol v4の自動適用](#protocol-v4-が自動適用される仕組み)
9. [実例](#実例-具体的なプロジェクト例)
10. [トラブルシューティング](#トラブルシューティング)
11. [チェックリスト](#チェックリスト-protocol-v4-適用確認)

---

## 概要

このガイドでは、Claude Multi-Agent Framework（Protocol v4）を新規プロジェクトに適用する方法を説明します。

### Protocol v4 とは

Protocol v4 は、以下の問題を防止する強化版プロトコルです:
- **通信忘れ**: agent-send.sh を使わずにテキスト応答してしまう
- **作業ディレクトリ誤り**: 誤ったディレクトリで作業してしまう

### 適用にかかる時間

- **セットアップ**: 5分
- **カスタマイズ**: 10分
- **最初のタスク作成**: 20分
- **環境起動**: 5分
- **合計**: 約40分で開始可能

### Protocol v4 の主要機能

- ✅ **自動適用**: テンプレートベースで全タスクに適用
- ✅ **通信プロトコル強制**: agent-send.sh 必須、テキスト応答禁止
- ✅ **作業前チェックリスト**: pwd でディレクトリ確認
- ✅ **完了前チェックリスト**: ls, git status, git log, agent-send.sh
- ✅ **視覚的強調**: 🚨❌✅ で注意喚起

---

## 前提条件

### 必須ツール

- **tmux**: マルチペインターミナル環境
- **Claude Code**: 各エージェント用のClaude CLI
- **Git**: バージョン管理
- **claude-multiagent-framework**: このフレームワーク

### tmuxインストール確認

```bash
# tmuxがインストールされているか確認
tmux -V
# 期待される出力: tmux 3.x

# インストールされていない場合
# Ubuntu/Debian
sudo apt install tmux

# macOS
brew install tmux
```

### Claude Codeインストール確認

```bash
# Claude Codeがインストールされているか確認
claude --version

# インストールされていない場合
# https://docs.claude.com/en/docs/claude-code を参照
```

---

## Phase 1: セットアップ（5分）

### Step 1-1: 新規プロジェクトの準備

```bash
# 新しいプロジェクトディレクトリを作成
mkdir -p /path/to/your-new-project
cd /path/to/your-new-project

# Gitリポジトリ初期化（既存プロジェクトの場合はスキップ）
git init

# 初回コミット（オプション）
echo "# Your New Project" > README.md
git add README.md
git commit -m "chore: initialize project"
```

**⚠️ 重要**: プロジェクトディレクトリの絶対パスをメモしておく（後で使用）

### Step 1-2: setup-project.sh の実行

```bash
# claude-multiagent-framework からセットアップスクリプトを実行
# 注: フレームワークのパスは環境に応じて変更してください
/path/to/claude-multiagent-framework/scripts/setup-project.sh /path/to/your-new-project
```

**実行結果**:
```
🚀 Claude Multi-Agent Framework Setup
======================================

📁 Creating directory structure...
📄 Copying templates...
✅ Setup complete!

Next steps:
1. Edit instructions/boss/boss-instructions.md (replace placeholders)
2. Create your first task: instructions/task/task-001.md
3. Start tmux session: tmux new -s president
4. Launch Boss agent in another tmux pane
5. Send task to Boss: ./scripts/agent-send.sh boss1 instructions/task/task-001.md

📚 Read the documentation: https://github.com/[USERNAME]/claude-multiagent-framework
```

### Step 1-3: 作成されたファイル構造を確認

```bash
# ディレクトリ構造を確認
tree -L 3

# 期待される構造:
# your-new-project/
# ├── instructions/
# │   ├── boss/
# │   │   └── boss-instructions.md
# │   ├── worker/
# │   │   └── worker-template.md.template
# │   ├── task/
# │   │   └── task-template.md.template
# │   └── planning/
# │       └── planning-template.md.template
# ├── runs/
# └── scripts/
#     └── agent-send.sh
```

**作成されたファイルの説明**:

| ファイル | 説明 | Protocol v4 対応 |
|---------|------|-----------------|
| `instructions/boss/boss-instructions.md` | Boss1への指示書（カスタマイズ必要） | ✅ 🚨 PROTOCOL REMINDER 含む |
| `instructions/worker/worker-template.md.template` | Workerテンプレート | ✅ チェックリスト含む |
| `instructions/task/task-template.md.template` | タスクテンプレート | ✅ Protocol遵守ガイドライン含む |
| `instructions/planning/planning-template.md.template` | 計画テンプレート | ✅ Protocol準拠ガイド含む |
| `scripts/agent-send.sh` | tmux通信スクリプト | ✅ |

---

## Phase 2: プロジェクト固有情報の設定（10分）

### Step 2-1: boss-instructions.md のカスタマイズ

```bash
# boss-instructions.md を編集
vim instructions/boss/boss-instructions.md
# または
code instructions/boss/boss-instructions.md
```

### Step 2-2: プレースホルダーの置換

**必須置換項目**:

| プレースホルダー | 説明 | 例 |
|-----------------|------|-----|
| `[PROJECT_NAME]` | プロジェクト名 | `my-todo-app` |
| `[REPO_PATH]` | リポジトリの絶対パス | `/home/user/projects/my-todo-app` |
| `[TECH_STACK]` | 技術スタック | `Next.js 14, TypeScript, Tailwind CSS` |
| `[PRIMARY_LANGUAGE]` | 主要プログラミング言語 | `TypeScript` |

**置換例（sed コマンド）**:

```bash
cd instructions/boss

# PROJECT_NAME を置換
sed -i 's/\[PROJECT_NAME\]/my-todo-app/g' boss-instructions.md

# REPO_PATH を置換（パスに / が含まれるので区切り文字を変更）
sed -i 's|\[REPO_PATH\]|/home/user/projects/my-todo-app|g' boss-instructions.md

# TECH_STACK を置換
sed -i 's/\[TECH_STACK\]/Next.js 14, TypeScript, Tailwind CSS/g' boss-instructions.md

# PRIMARY_LANGUAGE を置換
sed -i 's/\[PRIMARY_LANGUAGE\]/TypeScript/g' boss-instructions.md
```

**手動置換の場合**:

エディタで以下のセクションを探して編集:

```markdown
## プロジェクト情報

### 基本情報
- **プロジェクト名**: [PROJECT_NAME] → my-todo-app
- **リポジトリパス**: [REPO_PATH] → /home/user/projects/my-todo-app
- **技術スタック**: [TECH_STACK] → Next.js 14, TypeScript, Tailwind CSS
- **主要言語**: [PRIMARY_LANGUAGE] → TypeScript
```

**⚠️ 重要**: `[REPO_PATH]` は**絶対パス**を使用してください（相対パスは不可）

### Step 2-3: validate-protocol.sh で確認

```bash
# プロジェクトルートに戻る
cd /path/to/your-new-project

# プロトコル準拠を確認
./scripts/validate-protocol.sh
```

**期待される出力（全て置換済みの場合）**:

```
🔍 Validating Protocol Compliance...
====================================

📁 Checking directory structure...
✅ instructions/boss
✅ instructions/worker
✅ instructions/task
✅ instructions/planning
✅ runs
✅ scripts

📋 Checking boss instructions...
✅ instructions/boss/boss-instructions.md exists

🔧 Checking scripts...
✅ scripts/agent-send.sh

====================================
✅ Protocol validation passed!
```

**警告が出る場合**:

```
⚠️  Warning: [PROJECT_NAME] placeholder found (needs replacement)
⚠️  Warning: [REPO_PATH] placeholder found (needs replacement)
```

→ プレースホルダーが残っているので、Step 2-2 に戻って置換してください。

---

## Phase 3: 最初のタスク作成（20分）

### Step 3-1: task-001.md の作成

```bash
# task-template.md.template をコピー
cp instructions/task/task-template.md.template instructions/task/task-001.md

# タスク内容を記述
vim instructions/task/task-001.md
```

### Step 3-2: タスク仕様の記述

**テンプレートの主要セクション**:

```markdown
# チケット001: [タスク名]

**Version**: v0.1.0
**Priority**: High
**Estimated Workers**: [Worker数]
**Estimated Duration**: [推定時間]

## 🎯 目的
[このタスクで達成したいビジネス価値]

## 📋 要件
### 機能要件
- [要件1]
- [要件2]

## 🏗️ 実装計画
### Worker割り当て
| Worker | 担当タスク | 主要成果物 |
|--------|-----------|-----------|
| Worker1 | [タスク] | [ファイル] |
| Worker2 | [タスク] | [ファイル] |

### Tier構造
- Tier1: Worker1
- Tier2: Worker2（Worker1完了後）

## ✅ Definition of Done
### Worker1 DoD
- [ ] [完了条件1]
- [ ] [完了条件2]
- [ ] TypeScript エラー: 0件
- [ ] Git commit 完了

### Worker2 DoD
- [ ] [完了条件1]
- [ ] [完了条件2]
- [ ] npm run build: 成功
- [ ] Git commit 完了
```

### Step 3-3: 実例 - Todo CRUDアプリ

**簡潔な実例**:

```markdown
# チケット001: Todo CRUD機能実装

**Version**: v0.1.0
**Priority**: High
**Estimated Workers**: 2 Workers
**Estimated Duration**: 4時間

## 🎯 目的

基本的なTodo管理機能（Create, Read, Update, Delete）を実装する。

## 📋 要件

### 機能要件
- Todo作成: タイトル、説明、期限を入力して新規Todo作成
- Todo一覧: 全Todoを一覧表示（タイトル、期限、完了状態）
- Todo更新: 既存Todoの編集・完了状態の切り替え
- Todo削除: 不要なTodoを削除

### 技術要件
- データストレージ: IndexedDB（ブラウザローカル）
- フロントエンド: React + TypeScript
- スタイル: Tailwind CSS

## 🏗️ 実装計画

### Worker割り当て

| Worker | 担当タスク | 主要成果物 | 依存関係 |
|--------|-----------|-----------|---------|
| Worker1 | データモデル + ストレージ | src/lib/db.ts, src/lib/types.ts | なし |
| Worker2 | UI実装 | src/app/page.tsx, src/components/TodoForm.tsx, src/components/TodoList.tsx | Worker1完了後 |

### Tier構造
- **Tier1**: Worker1（データ層）
- **Tier2**: Worker2（UI層、Worker1完了後に開始）

## 📝 Worker詳細仕様

### Worker1: データモデル + ストレージ

#### 担当内容
1. Todo型定義（src/lib/types.ts）
2. IndexedDB操作関数（src/lib/db.ts）

#### 実装仕様

**src/lib/types.ts**:
```typescript
export interface Todo {
  id?: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**src/lib/db.ts**:
```typescript
// CRUD関数
export async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo>
export async function getTodos(): Promise<Todo[]>
export async function getTodo(id: number): Promise<Todo | undefined>
export async function updateTodo(id: number, updates: Partial<Todo>): Promise<void>
export async function deleteTodo(id: number): Promise<void>
```

#### DoD
- [ ] src/lib/types.ts に Todo 型定義作成
- [ ] src/lib/db.ts に5つのCRUD関数実装
- [ ] IndexedDB の初期化・接続処理実装
- [ ] TypeScript エラー: 0件
- [ ] Git commit 完了（"feat: add todo data model and storage"）
- [ ] agent-send.sh で Boss1 に完了報告

---

### Worker2: UI実装

#### 担当内容
1. Todo一覧表示（src/components/TodoList.tsx）
2. Todo入力フォーム（src/components/TodoForm.tsx）
3. メインページ統合（src/app/page.tsx）

#### 依存関係
⚠️ **Worker1完了後に開始**（src/lib/db.ts を使用するため）

#### 実装仕様

**src/components/TodoForm.tsx**:
- タイトル入力（必須）
- 説明入力（オプション）
- 期限選択（オプション）
- 保存ボタン

**src/components/TodoList.tsx**:
- Todo一覧表示
- 完了チェックボックス
- 編集ボタン
- 削除ボタン

**src/app/page.tsx**:
- TodoForm と TodoList を統合
- 状態管理（useState）

#### DoD
- [ ] src/components/TodoForm.tsx 実装完了
- [ ] src/components/TodoList.tsx 実装完了
- [ ] src/app/page.tsx で統合完了
- [ ] CRUD操作が全て動作することを確認
- [ ] TypeScript エラー: 0件
- [ ] npm run build: 成功
- [ ] Git commit 完了（"feat: add todo UI components"）
- [ ] agent-send.sh で Boss1 に完了報告

## ✅ Definition of Done

### 全体DoD
- [ ] Worker1-2 が完了報告を送信
- [ ] Worker1-2 個別DoDが100%達成
- [ ] TypeScript エラー: 0件
- [ ] npm run build: 成功
- [ ] Todo CRUD操作が全て動作
- [ ] Git commit 完了（全Worker分）
- [ ] Boss統合確認完了
```

---

## Phase 4: Multi-Agent環境の起動（5分）

### Step 4-1: tmuxセッション起動

```bash
# 新しいtmuxセッションを作成
tmux new -s my-project

# セッション名は任意（agents-001, my-todo-app など）
```

### Step 4-2: tmuxペイン構成

**推奨構成**（BookRAG Managerと同じ）:

```
Window 0: President（あなた）
Window 1: Boss1, Worker1, Worker2, Worker3（4ペイン）
Window 2: Worker4, Worker5, Worker6, Worker7（4ペイン）
```

**ペイン作成コマンド**:

```bash
# Window 1 作成（Boss + Worker1-3）
tmux new-window -t my-project:1 -n "boss-w1-3"

# Window 1 を4分割
tmux split-window -h -t my-project:1.0  # 右に分割
tmux split-window -v -t my-project:1.0  # 左下に分割
tmux split-window -v -t my-project:1.2  # 右下に分割

# Window 2 作成（Worker4-7）
tmux new-window -t my-project:2 -n "w4-7"

# Window 2 を4分割
tmux split-window -h -t my-project:2.0
tmux split-window -v -t my-project:2.0
tmux split-window -v -t my-project:2.2

# Window 0（President）に戻る
tmux select-window -t my-project:0
```

**ペイン配置イメージ**:

```
Window 1: boss-w1-3
┌─────────────┬─────────────┐
│   Boss1     │  Worker2    │
│  (Pane 0)   │  (Pane 2)   │
├─────────────┼─────────────┤
│  Worker1    │  Worker3    │
│  (Pane 1)   │  (Pane 3)   │
└─────────────┴─────────────┘

Window 2: w4-7
┌─────────────┬─────────────┐
│  Worker4    │  Worker6    │
│  (Pane 0)   │  (Pane 2)   │
├─────────────┼─────────────┤
│  Worker5    │  Worker7    │
│  (Pane 1)   │  (Pane 3)   │
└─────────────┴─────────────┘
```

### Step 4-3: 各ペインでClaude Codeを起動

**各ペイン（Boss1, Worker1-7）で以下を実行**:

```bash
# プロジェクトディレクトリに移動
cd /path/to/your-new-project

# Claude Code起動
claude
```

**⚠️ 重要**: 各ペインで必ずプロジェクトディレクトリに `cd` してから `claude` を起動してください。

### Step 4-4: ペインのタイトル設定（オプション）

```bash
# 各ペインで実行（識別しやすくするため）
# Boss1
tmux select-pane -t my-project:1.0 -T "Boss1"

# Worker1
tmux select-pane -t my-project:1.1 -T "Worker1"

# ...（以下同様）
```

---

## Phase 5: タスク実行（実作業開始）

### Step 5-1: Boss1に指示書を送信

**President（Window 0）から実行**:

```bash
cd /path/to/your-new-project

# Boss1に task-001.md を送信
./scripts/agent-send.sh boss1 "Boss1、新しいプロジェクトの最初のタスクです。instructions/task/task-001.md を読んで、Worker1-2への指示書を作成してください。Protocol v4 に準拠してお願いします。"
```

**実行結果**:
```
[INFO] sent to boss1 (tmux my-project:1.0)
```

### Step 5-2: Boss1が Worker指示書を作成

Boss1（Window 1, Pane 0）が自動的に:

1. **task-001.md を読み込み**
   - タスク内容を理解
   - Worker割り当てを確認
   - Tier構造を確認

2. **Worker指示書を作成**
   - `instructions/worker/task-001-worker1.md` を作成
   - `instructions/worker/task-001-worker2.md` を作成
   - Protocol v4 のチェックリストを含める

3. **Workerに指示を送信**
   ```bash
   ./scripts/agent-send.sh worker1 "instructions/worker/task-001-worker1.md"
   # Worker1 完了後
   ./scripts/agent-send.sh worker2 "instructions/worker/task-001-worker2.md"
   ```

### Step 5-3: Worker実行

**Worker1（Window 1, Pane 1）**:

1. **指示書を読み込み**
   - `instructions/worker/task-001-worker1.md` を読む

2. **作業開始前チェックリスト**
   ```bash
   pwd
   # 期待される出力: /path/to/your-new-project
   ```

3. **実装作業**
   - src/lib/types.ts 作成
   - src/lib/db.ts 作成
   - TypeScript エラー確認

4. **作業完了前チェックリスト**
   ```bash
   ls -la src/lib/types.ts src/lib/db.ts  # ファイル実在確認
   git status                              # 変更確認
   git add src/lib/types.ts src/lib/db.ts
   git commit -m "feat: add todo data model and storage"
   git log -1 --stat                       # コミット確認
   ```

5. **完了報告**
   ```bash
   ./scripts/agent-send.sh boss1 "Worker1完了報告: Todo データモデルとストレージ実装完了。DoD 6/6 (100%)。Git commit: abc1234。"
   ```

**Worker2（Window 1, Pane 2）**:

Worker1完了後、同様の手順で実装:
- TodoForm.tsx 作成
- TodoList.tsx 作成
- page.tsx 統合
- npm run build 確認
- Git commit
- Boss1 に完了報告

### Step 5-4: Boss統合 → President報告

**Boss1**:

1. **Worker完了報告を確認**
   - Worker1 報告受領
   - Worker2 報告受領

2. **統合作業**
   - ファイル実在確認
   - TypeScript エラー確認
   - ビルド確認
   - 動作確認

3. **President報告**
   ```bash
   ./scripts/agent-send.sh president "Boss1完了報告: チケット001「Todo CRUD機能実装」完了。全Worker DoD 100%達成。TypeScriptエラー0件、ビルド成功。runs/001/boss-to-president-report.md を確認してください。"
   ```

---

## Protocol v4 が自動適用される仕組み

### 1. テンプレートベースの自動適用

`setup-project.sh` が Protocol v4 準拠のテンプレートをコピーするため、**新規プロジェクトは自動的に Protocol v4 を使用**します。

**含まれる Protocol v4 機能**:

| 機能 | 説明 | 適用場所 |
|------|------|---------|
| 🚨 PROTOCOL REMINDER | 指示書最上部に配置 | boss-instructions.md, worker-template.md |
| 通信プロトコル明示 | agent-send.sh 必須、テキスト応答禁止 | 全テンプレート |
| 作業開始前チェックリスト | pwd 確認、指示書読了 | worker-template.md |
| 作業完了前チェックリスト | ls, git status, git log, agent-send.sh | worker-template.md |
| ❌/✅ 表記 | 禁止/推奨を明示 | 全テンプレート |
| コードブロック例示 | 具体的なコマンド例 | 全テンプレート |

### 2. Worker指示書の自動生成

Boss1 が `task-XXX.md` を読み、`worker-template.md.template` を使って Worker指示書を生成するため、**Protocol v4 が全Workerに自動適用**されます。

**Worker が受け取る指示書の構造**:

```markdown
# Worker1 作業指示書

## 🚨 PROTOCOL REMINDER（作業開始前に必読）

### ⚠️ 作業開始前チェックリスト
- [ ] pwd で作業ディレクトリ確認
      期待される出力: /path/to/your-new-project
- [ ] この指示書を最後まで読了

### ⚠️ 作業完了前チェックリスト
- [ ] ls -la で成果物確認
- [ ] git status で変更確認
- [ ] git commit 実行
- [ ] git log -1 --stat で確認
- [ ] agent-send.sh で Boss1 に報告

---

## あなたの担当タスク
[タスク固有の内容]
```

### 3. Protocol v4 の効果実証

**BookRAG Manager での実証**:

- **チケット213**: Worker5 が作業ディレクトリを誤り、4ファイル（2,755行）欠損、2-3時間の再作業
- **チケット214**: Worker1 が Protocol v4 により、同様の問題を**未然に防止** ✅

**新規プロジェクトでも同様の効果**:
- 作業開始前の `pwd` 確認により、ディレクトリ誤りを防止
- agent-send.sh 必須化により、通信忘れを防止

---

## 実例: 具体的なプロジェクト例

### 例1: シンプルなブログシステム

```bash
# Step 1: セットアップ
mkdir -p ~/projects/simple-blog
cd ~/projects/simple-blog
/path/to/claude-multiagent-framework/scripts/setup-project.sh ~/projects/simple-blog

# Step 2: カスタマイズ
vim instructions/boss/boss-instructions.md
# - [PROJECT_NAME] → simple-blog
# - [REPO_PATH] → /home/user/projects/simple-blog
# - [TECH_STACK] → Next.js 14, MDX, Tailwind CSS

# Step 3: タスク作成
vim instructions/task/task-001.md
# チケット001: ブログ記事CRUD機能
# - Worker1: データモデル + ファイルストレージ
# - Worker2: 記事一覧・詳細UI
# - Worker3: 記事作成・編集フォーム

# Step 4: tmux起動
tmux new -s simple-blog
# ペイン作成・Claude起動

# Step 5: タスク実行
./scripts/agent-send.sh boss1 "instructions/task/task-001.md"
```

---

### 例2: E-commerceサイト

```bash
# Step 1: セットアップ
mkdir -p ~/projects/ecommerce-site
cd ~/projects/ecommerce-site
/path/to/claude-multiagent-framework/scripts/setup-project.sh ~/projects/ecommerce-site

# Step 2: カスタマイズ
vim instructions/boss/boss-instructions.md
# - [PROJECT_NAME] → ecommerce-site
# - [REPO_PATH] → /home/user/projects/ecommerce-site
# - [TECH_STACK] → Next.js 14, Stripe, Supabase, Tailwind

# Step 3: タスク作成（大規模タスク）
vim instructions/task/task-001.md
# チケット001: 商品管理機能（v0.1.0）
# - Worker1: Supabaseスキーマ設計
# - Worker2: 商品CRUDバックエンド
# - Worker3: 商品一覧UI
# - Worker4: 商品詳細UI
# - Worker5: 商品検索機能
# - Worker6: 統合テスト

# Step 4: tmux起動
tmux new -s ecommerce
# ペイン作成・Claude起動

# Step 5: タスク実行
./scripts/agent-send.sh boss1 "instructions/task/task-001.md"
```

---

### 例3: APIサーバー（Node.js + Express）

```bash
# Step 1: セットアップ
mkdir -p ~/projects/api-server
cd ~/projects/api-server
/path/to/claude-multiagent-framework/scripts/setup-project.sh ~/projects/api-server

# Step 2: カスタマイズ
vim instructions/boss/boss-instructions.md
# - [PROJECT_NAME] → api-server
# - [REPO_PATH] → /home/user/projects/api-server
# - [TECH_STACK] → Node.js, Express, TypeScript, PostgreSQL
# - [PRIMARY_LANGUAGE] → TypeScript

# Step 3: タスク作成
vim instructions/task/task-001.md
# チケット001: 基本API実装（v0.1.0）
# - Worker1: プロジェクト構造・設定（tsconfig, express setup）
# - Worker2: ユーザーAPI（/api/users CRUD）
# - Worker3: 認証API（/api/auth login/logout）
# - Worker4: テスト実装（Jest + Supertest）

# Step 4: tmux起動
tmux new -s api-server
# ペイン作成・Claude起動

# Step 5: タスク実行
./scripts/agent-send.sh boss1 "instructions/task/task-001.md"
```

---

## トラブルシューティング

### 問題1: setup-project.sh が "command not found"

**症状**:
```bash
./scripts/setup-project.sh: command not found
```

**原因**: パスが間違っているか、実行権限がない

**解決方法**:
```bash
# パスを確認
ls -la /path/to/claude-multiagent-framework/scripts/setup-project.sh

# 実行権限を付与
chmod +x /path/to/claude-multiagent-framework/scripts/setup-project.sh

# 再実行
/path/to/claude-multiagent-framework/scripts/setup-project.sh /path/to/your-project
```

---

### 問題2: validate-protocol.sh で警告が出る

**症状**:
```
⚠️  Warning: [PROJECT_NAME] placeholder found (needs replacement)
⚠️  Warning: [REPO_PATH] placeholder found (needs replacement)
```

**原因**: プレースホルダーが未置換

**解決方法**:
```bash
# boss-instructions.md を確認
grep "\[PROJECT_NAME\]" instructions/boss/boss-instructions.md
grep "\[REPO_PATH\]" instructions/boss/boss-instructions.md

# 置換
sed -i 's/\[PROJECT_NAME\]/your-project-name/g' instructions/boss/boss-instructions.md
sed -i 's|\[REPO_PATH\]|/path/to/your-project|g' instructions/boss/boss-instructions.md

# 再確認
./scripts/validate-protocol.sh
```

---

### 問題3: agent-send.sh が "not in a mode" エラー

**症状**:
```
not in a mode
not in a mode
...
```

**原因**: tmux pane が入力受付状態でない（フィードバック画面など）

**解決方法**:
```bash
# フィードバック画面を解除
./scripts/agent-send.sh boss1 "0"

# 少し待ってから再送信
sleep 2
./scripts/agent-send.sh boss1 "your message"
```

---

### 問題4: Worker が作業ディレクトリを誤る

**症状**: Worker が別のディレクトリで作業してしまう

**原因**:
- Worker が `pwd` 確認を忘れた
- Protocol v4 が適用されていない

**解決方法（予防）**:
```bash
# Worker指示書に Protocol v4 が含まれているか確認
grep "🚨 PROTOCOL REMINDER" instructions/worker/task-001-worker1.md

# 含まれていない場合は、worker-template.md.template を確認
cat instructions/worker/worker-template.md.template | head -50
```

**解決方法（発生後）**:
```bash
# Worker に再度正しいディレクトリを指示
./scripts/agent-send.sh worker1 "作業ディレクトリが間違っています。以下を実行してください: cd /path/to/your-project && pwd で確認"
```

---

### 問題5: Boss1 が Worker指示書を作成しない

**症状**: Boss1 が task-001.md を読んだ後、何もしない

**原因**:
- タスク仕様が不明確
- Worker割り当てが記載されていない

**解決方法**:
```bash
# task-001.md を確認
# 以下が明記されているか確認:
# 1. Worker割り当て表
# 2. Tier構造
# 3. 各WorkerのDoD

# 不足している場合は task-001.md を修正して再送信
vim instructions/task/task-001.md
./scripts/agent-send.sh boss1 "instructions/task/task-001.md を修正しました。再度確認してWorker指示書を作成してください。"
```

---

## チェックリスト: Protocol v4 適用確認

新規プロジェクトで Protocol v4 が正しく適用されているか確認してください。

### セットアップ確認
- [ ] `setup-project.sh` を実行した
- [ ] `instructions/` ディレクトリが作成された
- [ ] `scripts/agent-send.sh` がコピーされた
- [ ] `runs/` ディレクトリが作成された

### boss-instructions.md 確認
- [ ] ファイルが存在する
- [ ] 🚨 PROTOCOL REMINDER が最上部にある
- [ ] 通信プロトコルセクションがある
- [ ] 作業ディレクトリ確認セクションがある
- [ ] `[PROJECT_NAME]` を実際の名前に置換した
- [ ] `[REPO_PATH]` を実際のパスに置換した
- [ ] `[TECH_STACK]` を実際の技術スタックに置換した
- [ ] `[PRIMARY_LANGUAGE]` を実際の言語に置換した

### タスク作成確認
- [ ] `task-001.md` を作成した
- [ ] 🎯 目的が明記されている
- [ ] 📋 要件が明記されている
- [ ] Worker割り当て表がある
- [ ] Tier構造が明記されている
- [ ] 各WorkerのDoDが明記されている

### テンプレート確認
- [ ] `worker-template.md.template` が存在する
- [ ] チェックリストが含まれている
- [ ] `task-template.md.template` が存在する
- [ ] Protocol遵守ガイドラインが含まれている

### 実行環境確認
- [ ] tmuxセッションを起動した
- [ ] Boss1 ペインを作成した
- [ ] Worker1-7 ペインを作成した（必要な数）
- [ ] 各ペインで Claude Code を起動した
- [ ] 各ペインで正しいディレクトリにいる（`pwd` で確認）

### Protocol v4 機能確認
- [ ] `./scripts/validate-protocol.sh` が成功する
- [ ] Boss1指示書に 🚨 PROTOCOL REMINDER がある
- [ ] Worker指示書に作業前/完了前チェックリストがある
- [ ] agent-send.sh が動作する（ログに記録される）

### 実行確認
- [ ] agent-send.sh で Boss1 にタスクを送信した
- [ ] Boss1 が task-001.md を読み込んだ
- [ ] Boss1 が Worker指示書を作成した
- [ ] Worker が作業を開始した
- [ ] Worker が作業前チェックリストを実施した
- [ ] Worker が完了報告を送信した
- [ ] Boss1 が統合作業を実施した
- [ ] Boss1 が President に報告した

---

## まとめ

### Protocol v4 を新規プロジェクトで使用するのは簡単

1. **setup-project.sh を実行**（5分）
2. **プレースホルダーを置換**（10分）
3. **最初のタスクを作成**（20分）
4. **tmux環境を起動**（5分）
5. **タスクを実行**（実作業）

**合計約40分で開始可能**

### Protocol v4 の機能は全て自動適用

- ✅ 通信プロトコル強制（agent-send.sh 必須）
- ✅ 作業ディレクトリ確認（pwd 必須）
- ✅ チェックリスト形式の作業手順
- ✅ 視覚的強調（🚨❌✅）

### BookRAG Manager で実証済み

- **11連続成功** (Protocol v3)
- **Worker1 の問題未然防止** (Protocol v4)
- **100% DoD達成**
- **Zero Rework** (Protocol v4目標)

### 次のステップ

1. **小規模プロジェクトで試す**: Todo アプリなどで試用
2. **効果を体感**: 通信忘れ・ディレクトリ誤りが防止されることを確認
3. **本番適用**: Protocol v4 の効果を確認後、本格的なプロジェクトに適用

---

## 参考資料

### フレームワークのドキュメント

- [Getting Started](getting-started.md) - 30分で理解できる導入ガイド
- [Best Practices](best-practices.md) - 14のベストプラクティス
- [Troubleshooting](troubleshooting.md) - よくある12の問題と解決方法
- [Protocol Specification](../PROTOCOL.md) - Protocol v1-v4 の詳細仕様
- [Case Study: BookRAG Manager](case-studies/bookrag-manager.md) - 成功事例

### サンプルプロジェクト

- `examples/simple-project/` - Todo CRUD（2 Workers）
- `examples/complex-project/` - SaaS App with RAG（6 Workers, 4 Tier）

### GitHub リポジトリ

- **claude-multiagent-framework**: https://github.com/[USERNAME]/claude-multiagent-framework
- **BookRAG Manager** (成功事例): https://github.com/kirikab-27/bookrag-manager

---

**最終更新**: 2025-11-18
**Protocol Version**: v4 (v1.1.0)
