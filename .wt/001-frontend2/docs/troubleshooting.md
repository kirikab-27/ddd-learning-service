# Troubleshooting

Claude Multi-Agent Framework の運用中に発生する問題と解決方法をまとめています。BookRAG Manager での実践経験に基づいた具体的なトラブルシューティングガイドです。

---

## 📚 目次

1. [Workerが指示書を読まない](#1-workerが指示書を読まない)
2. [デッドロックが発生](#2-デッドロックが発生)
3. [完了報告がない](#3-完了報告がない)
4. [TypeScript/Buildエラー](#4-typescriptbuildエラー)
5. [tmux通信が動かない](#5-tmux通信が動かない)
6. [Worker数が多すぎて管理困難](#6-worker数が多すぎて管理困難)
7. [Protocol評価が低い](#7-protocol評価が低い)
8. [統合作業が大変](#8-統合作業が大変)
9. [Gitコンフリクトが頻発](#9-gitコンフリクトが頻発)
10. [メモリ不足でビルド失敗](#10-メモリ不足でビルド失敗)

---

## 1. Workerが指示書を読まない

### 症状

- Workerが指示書ファイルを読まずに作業を開始してしまう
- DoD未達成のまま完了報告を送信
- Protocol Improvement 3の成功率が低い（50%以下）

### 原因

**Protocol Improvement 3違反**: 指示書に「必ず読むこと」の明記が不足

Protocol v1とv2では指示書を読まないケースが50%以上発生していました。

### 解決方法

#### 1. Boss指示書に明記

```markdown
## 重要事項

**必ず以下のファイルを最初に読んでから作業を開始してください**:

1. `instructions/worker/task-XXX-workerN.md`（あなた専用の詳細指示書）
2. `instructions/task/task-XXX.md`（全体タスク）

読まずに作業を開始した場合、DoD未達成となり評価が下がります。
```

#### 2. Worker指示書の冒頭に強調

```markdown
# チケットXXX ジョブN: [タスク名]

**⚠️ 重要**: この指示書を最後まで読んでから作業を開始してください。

Protocol Improvement 3 に従い、指示書を読まずに作業開始すると失敗します。
```

#### 3. 検証スクリプトの活用

```bash
# Validate protocol compliance
./scripts/validate-protocol.sh

# Expected output:
# ✅ Protocol Improvement 3 compliant
# ✅ All worker instructions have "必ず読むこと" statement
```

### 実績

BookRAG Managerでは、Protocol Improvement 3により**92%の成功率**を達成（v1の50%から大幅改善）。

---

## 2. デッドロックが発生

### 症状

- Worker1がWorker2の完了を待ち、Worker2がWorker1の完了を待つ
- 全Workerが停止状態になる
- タスクが永遠に完了しない

### 原因

**循環依存**: Tier構造の設計ミス

```
❌ 悪い例:
Worker1 → Worker2 → Worker1 (循環依存)
```

### 解決方法

#### 1. Tier構造を見直す

依存関係を一方向にします:

```markdown
## Tier構造（正しい例）

- **Tier1（並列実行可能）**: Worker1, Worker2
  - 依存関係: なし

- **Tier2（Worker1, 2完了後）**: Worker3, Worker4
  - 依存関係: Tier1完了後

- **Tier3（Worker3, 4完了後）**: Worker5
  - 依存関係: Tier2完了後
```

#### 2. 依存関係マトリクスの作成

| Worker | 依存先 | 完了後に開始できるWorker |
|--------|--------|------------------------|
| Worker1 | なし | Worker3 |
| Worker2 | なし | Worker4 |
| Worker3 | Worker1 | Worker5 |
| Worker4 | Worker2 | Worker5 |
| Worker5 | Worker3, Worker4 | なし |

#### 3. Boss指示書で明確化

```markdown
## 実行順序

1. **Tier1開始**: Worker1とWorker2を並列起動
   ```bash
   ./scripts/agent-send.sh worker1 "instructions/worker/task-XXX-worker1.md を読んで実行"
   ./scripts/agent-send.sh worker2 "instructions/worker/task-XXX-worker2.md を読んで実行"
   ```

2. **Tier1完了確認**: Worker1, Worker2の完了報告待機

3. **Tier2開始**: Worker3とWorker4を並列起動

4. **Tier2完了確認**: Worker3, Worker4の完了報告待機

5. **Tier3開始**: Worker5を起動
```

### 実績

BookRAG Manager チケット212では、**デッドロック0件**を達成。Tier構造の明確化により、6 Workersが円滑に実行されました。

---

## 3. 完了報告がない

### 症状

- Workerが作業完了したのに報告を送信しない
- BossがWorkerの完了を検知できない
- 次のTierのWorkerを起動できない

### 原因

1. **DoD不明確**: 完了基準が曖昧
2. **報告テンプレート未提供**: フォーマットが不明
3. **agent-send.shの使い方が分からない**

### 解決方法

#### 1. Worker指示書にDoD明記

```markdown
## ✅ Definition of Done (DoD)

完了の定義は以下の通りです。**全項目を満たしてから完了報告を送信してください**。

- [ ] src/components/BookForm.tsx 作成完了（150行）
- [ ] TypeScript エラー: 0件（npx tsc --noEmit で確認）
- [ ] テスト成功（npm test）
- [ ] Git コミット完了（feat: add book form component）

**DoD達成状況**: 0/4 → 目標: 4/4 (100%)
```

#### 2. 完了報告テンプレート提供

```markdown
## 📤 完了報告フォーマット

```markdown
# チケットXXX ジョブN 完了報告

**担当**: WorkerN
**タスク**: [タスク名]

## 完了内容

1. src/components/BookForm.tsx 作成（150行）
2. TypeScriptエラー解消（0件）
3. テスト成功（5/5ケース）

## DoD達成状況

- [x] src/components/BookForm.tsx 作成完了（150行）
- [x] TypeScript エラー: 0件
- [x] テスト成功
- [x] Git コミット完了

**DoD: 4/4 (100%)**

## Git情報

- コミットハッシュ: abc1234
- コミットメッセージ: "feat: add book form component"

## 次のWorkerへの引き継ぎ

Worker3（バリデーション実装）が作業開始可能です。

以上、確認をお願いします。

WorkerN
```
```

#### 3. agent-send.shの使い方を記載

```markdown
## 完了報告の送信方法

```bash
# Boss1に完了報告を送信
./scripts/agent-send.sh boss1 "runs/XXX/workerN-report.md を確認してください"
```
```

### 実績

BookRAG Manager では、**全6 Workers が完了報告を送信**。報告テンプレート提供により、報告漏れ0件を達成しました。

---

## 4. TypeScript/Buildエラー

### 症状

- 統合後にTypeScriptエラーが大量発生
- ビルドテストが失敗
- Worker個別では成功していた

### 原因

1. **統合前の個別テスト不足**
2. **型定義の不一致**
3. **インポートパスの間違い**

### 解決方法

#### 1. Worker完了時にTypeScriptチェック

```markdown
## DoD

- [ ] TypeScript エラー: 0件
  - [ ] `npx tsc --noEmit` で確認
  - [ ] エラーが出た場合は修正してから完了報告
```

#### 2. ビルドテストを統合前に実施

```bash
# TypeScript check
npx tsc --noEmit

# Build test
npm run build

# Test run
npm test
```

#### 3. 型定義ファイルの共有

```typescript
// types/book.ts (Worker1が作成、他Workerが使用)
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  scanStatus: 'planned' | 'in-progress' | 'completed';
  createdAt: number;
  updatedAt: number;
}
```

Worker2以降の指示書に記載:
```markdown
## 型定義の使用

Worker1が作成した `types/book.ts` を使用してください:

```typescript
import { Book } from '@/types/book';
```
```

#### 4. 統合テスト担当Workerの設置

チケット212の例:
- **Worker6**: 統合テスト・最終チェック担当
  - 全Workerのコード統合
  - TypeScriptエラー: 0件確認
  - ビルドテスト成功確認

### 実績

BookRAG Manager チケット212では、Worker6の統合テストにより**TypeScriptエラー: 0件、ビルドテスト: 成功**を達成しました。

---

## 5. tmux通信が動かない

### 症状

- `agent-send.sh` 実行時にエラー
- Workerがメッセージを受信しない
- tmuxペインが見つからない

### 原因

1. **agent-send.shのパス間違い**
2. **実行権限がない**
3. **tmuxセッション名の不一致**
4. **ペイン番号の間違い**

### 解決方法

#### 1. 絶対パス使用

```bash
# ❌ 悪い例
./agent-send.sh boss1 "message"

# ✅ 良い例
/path/to/your/project/scripts/agent-send.sh boss1 "message"
```

#### 2. 実行権限確認

```bash
# Check permissions
ls -la scripts/agent-send.sh

# Expected: -rwxr-xr-x

# Fix if needed
chmod +x scripts/agent-send.sh
```

#### 3. tmuxセッション確認

```bash
# List tmux sessions
tmux ls

# Expected output:
# agents-myproject: 6 windows (created ...)

# Attach if needed
tmux attach -t agents-myproject
```

#### 4. ペイン番号確認

```bash
# Inside tmux session
Ctrl+b, q  # Display pane numbers for 2 seconds

# Verify pane layout:
# 0: President
# 1: Boss1
# 2: Worker1
# 3: Worker2
# ...
```

#### 5. agent-send.sh の内容確認

```bash
#!/bin/bash
# agent-send.sh

AGENT_NAME=$1
MESSAGE=$2
SESSION_NAME="agents-myproject"

# Pane mapping
case "$AGENT_NAME" in
  "president") PANE=0 ;;
  "boss1") PANE=1 ;;
  "worker1") PANE=2 ;;
  "worker2") PANE=3 ;;
  *) echo "Unknown agent: $AGENT_NAME"; exit 1 ;;
esac

# Send message
tmux send-keys -t "${SESSION_NAME}:${PANE}" "$MESSAGE" C-m

# Log
echo "$(date): Sent to $AGENT_NAME (pane $PANE): $MESSAGE" >> logs/send_log.txt
```

### 実績

BookRAG Manager では、agent-send.sh の標準化により、**通信エラー0件**を達成しました。

---

## 6. Worker数が多すぎて管理困難

### 症状

- Worker10以上でペイン管理が複雑
- 依存関係の把握が困難
- 統合作業が大変

### 原因

**タスク分割が細かすぎる**

### 解決方法

#### 1. 1-6 Workersを目安に統合

**推奨Worker数**:
- 小規模タスク: 2-3 Workers
- 中規模タスク: 4-6 Workers
- 大規模タスク: 6 Workers（上限）

#### 2. 責務の統合

❌ 細かすぎる例:
```
Worker1: 型定義作成
Worker2: API関数作成
Worker3: Reactコンポーネント作成
Worker4: CSSスタイル作成
Worker5: テスト作成
Worker6: ドキュメント作成
Worker7: 統合テスト
```

✅ 適切な例:
```
Worker1: バックエンド実装（型定義 + API関数）
Worker2: フロントエンド実装（Reactコンポーネント + CSS）
Worker3: テスト・統合（テスト + 統合テスト + ドキュメント）
```

#### 3. Tier構造で整理

```markdown
## Tier構造

- **Tier1（並列）**: Worker1, Worker2（独立したモジュール）
- **Tier2（統合）**: Worker3（Worker1, 2の成果物を統合）
```

### 実績

BookRAG Manager チケット212は**6 Workersで構成**。これにより、管理が適切な範囲に収まりました。

---

## 7. Protocol評価が低い

### 症状

- Boss/PresidentからのProtocol評価が70%以下
- DoD未達成での完了報告
- 指示書未読による失敗

### 原因

1. **DoD未達成で完了報告**
2. **指示書を読まずに作業開始**
3. **報告フォーマット不統一**

### 解決方法

#### 1. DoD 100%達成を厳守

```markdown
## ✅ Definition of Done (DoD)

**全項目を満たしてから完了報告を送信してください**。

- [ ] 実装完了
- [ ] TypeScript エラー: 0件
- [ ] テスト成功
- [ ] Git コミット完了

**DoD達成状況**: 0/4 → 目標: 4/4 (100%)
```

#### 2. Protocol Improvement 3遵守

```markdown
**⚠️ 重要**: この指示書を最後まで読んでから作業を開始してください。

Protocol Improvement 3 に従い、指示書を読まずに作業開始すると評価が下がります。
```

#### 3. 報告テンプレート使用

統一された報告フォーマットを使用することで、評価が向上します。

### 実績

BookRAG Manager Protocol Improvement 3では:
- **92%の成功率**（v1の50%から改善）
- **11連続成功達成**（チケット202-212）
- **全Worker DoD 100%達成**

---

## 8. 統合作業が大変

### 症状

- Worker間のコード統合に時間がかかる
- インターフェース不一致
- 統合後にバグ発見

### 原因

**Worker間のインターフェース未定義**

### 解決方法

#### 1. 事前にインターフェース設計

**タスク指示書に記載**:
```markdown
## 共通インターフェース

全Workerで以下のインターフェースを使用してください:

### 型定義（Worker1が作成、他Workerが使用）

```typescript
// types/book.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  // ...
}
```

### API関数（Worker2が作成、Worker3-5が使用）

```typescript
// lib/api/books.ts
export async function getBooks(): Promise<Book[]>
export async function addBook(book: Book): Promise<void>
```
```

#### 2. 統合担当Workerの設置

チケット212の例:
- **Worker6**: 統合テスト・最終チェック担当
  - 全Workerのコード統合
  - インターフェース確認
  - 統合テスト実施

#### 3. Worker間レビュー

```markdown
## Worker2の作業開始前

Worker1のコードレビュー:
- `types/book.ts` が期待通りか確認
- インポート可能か確認
```

### 実績

BookRAG Manager では、事前のインターフェース設計により、**統合作業がスムーズ**に完了しました。

---

## 9. Gitコンフリクトが頻発

### 症状

- Worker間でGitコンフリクトが発生
- マージ作業に時間がかかる

### 原因

1. **同じファイルを複数Workerが編集**
2. **ブランチ戦略が不明確**

### 解決方法

#### 1. ファイル担当を明確化

```markdown
## Worker別ファイル担当

| Worker | 担当ファイル |
|--------|-------------|
| Worker1 | types/book.ts, lib/api/books.ts |
| Worker2 | src/components/BookForm.tsx |
| Worker3 | src/components/BookList.tsx |
```

#### 2. ブランチ戦略の明確化

```markdown
## Git戦略

- **メインブランチ**: main
- **タスクブランチ**: feature/task-XXX
- **Worker個別ブランチ**: feature/task-XXX-workerN

### 作業フロー

1. Worker個別ブランチで作業
2. 完了後、タスクブランチにマージ
3. 全Worker完了後、mainにマージ
```

#### 3. Conventional Commits使用

```bash
# Worker1
git commit -m "feat(types): add Book interface"

# Worker2
git commit -m "feat(ui): add BookForm component"
```

---

## 10. メモリ不足でビルド失敗

### 症状

- `npm run build` 実行時にメモリ不足エラー
- Node.jsがクラッシュ

### 原因

**Next.jsビルド時のメモリ使用量が大きい**

### 解決方法

#### 1. Node.jsメモリ上限引き上げ

```bash
# package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

#### 2. 開発サーバーでテスト

```bash
# Build前に開発サーバーで確認
npm run dev

# ブラウザで動作確認
# http://localhost:3000
```

---

## サポート

### ドキュメント

- **Best Practices**: [docs/best-practices.md](./best-practices.md)
- **Getting Started**: [docs/getting-started.md](./getting-started.md)

### コミュニケーション

- **Issues**: https://github.com/[USERNAME]/claude-multiagent-framework/issues
- **Discussions**: https://github.com/[USERNAME]/claude-multiagent-framework/discussions

---

**次のステップ**: [Case Study: BookRAG Manager](./case-studies/bookrag-manager.md) で成功事例を学びましょう。

---

## 11. agent-send.sh を忘れてテキスト応答してしまった

### 症状
- 他のエージェントに指示/報告を送信したつもりだが、相手が受け取っていない
- "送信します"と書いたが、実際にツールを実行していない

### 原因
- agent-send.sh の実行を忘れた
- テキスト出力で完結してしまった
- 長文の回答に集中し、通信方法を失念

### 診断方法
```bash
# 通信ログを確認
tail -20 logs/send_log.txt | grep "<agent-name>"
```

ログに記録がない場合は、送信していない。

### 解決方法

#### 方法1: 改めて送信
```bash
./agent-send.sh <agent-name> "<message>"
```

#### 方法2: 通信履歴を確認
```bash
# 最近の通信を確認
tail -20 logs/send_log.txt

# 特定のエージェントへの通信を確認
grep "to=worker1" logs/send_log.txt
```

### 予防策
- 指示書の最上部に 🚨 PROTOCOL REMINDER を配置
- 完了報告前にチェックリストで確認
- logs/send_log.txt で送信記録を確認

### BookRAG Manager での実例
- **チケット213**: President が通信を忘れ、Boss1への指示が届かず
- **発見**: Boss1が"指示を受け取っていない"と報告
- **解決**: agent-send.sh を実行し、Enter送信で即座に解決

---

## 12. 作業ディレクトリが間違っていた

### 症状
- ファイルを作成・編集したはずなのに、リポジトリに存在しない
- git commit したはずなのに、git log に表示されない
- 完了報告したが、Boss1が"ファイルが見つからない"と報告

### 原因
- 作業開始前に `pwd` で確認しなかった
- 複数のプロジェクトディレクトリを開いており、誤ったディレクトリで作業

### 診断方法
```bash
# 現在のディレクトリを確認
pwd

# 成果物が存在するか確認
ls -la <expected-file-path>

# Git履歴を確認
git log --oneline -5

# 別のディレクトリを検索
find ~ -name "<filename>" 2>/dev/null
```

### 解決方法

#### 方法1: ファイルを正しいディレクトリに移動
```bash
# 誤ったディレクトリで作成したファイルを移動
cd <wrong-directory>
cp <files> <correct-directory>/
cd <correct-directory>
git add <files>
git commit -m "feat: add files (corrected directory)"
```

#### 方法2: 正しいディレクトリで再作業
```bash
cd <correct-directory>
pwd  # 確認
# 作業をやり直す
```

### 予防策
- 作業開始前に必ず `pwd` で確認
- 期待値と異なる場合は即座に `cd` で移動
- Worker指示書に作業ディレクトリを明記
- 作業前チェックリストに pwd 確認を追加

### BookRAG Manager での実例
- **チケット213 Worker5**: 誤ったディレクトリ（bookrag-manager）で作業
- **影響**: 4ファイル（2,755行）が claude-multiagent-framework に作成されず
- **発見**: Boss1 が git log を確認し、コミットが存在しないことを検出
- **解決**: Worker5 に再作業を依頼（作業前 pwd 確認を追加）、2-3時間で完了
