# Best Practices

このドキュメントでは、Claude Multi-Agent Frameworkを効果的に使用するためのベストプラクティスを紹介します。BookRAG Managerプロジェクトでの11連続成功実績に基づいた実践的なガイドラインです。

---

## 📚 目次

1. [Protocol Improvement 3](#protocol-improvement-3)
2. [タスク分割の原則](#タスク分割の原則)
3. [Worker数の決定方法](#worker数の決定方法)
4. [Tier構造の設計指針](#tier構造の設計指針)
5. [DoD作成のコツ](#dod作成のコツ)
6. [報告フォーマットの重要性](#報告フォーマットの重要性)
7. [デッドロック回避のパターン](#デッドロック回避のパターン)
8. [統合テストの実施方法](#統合テストの実施方法)
9. [Git管理のベストプラクティス](#git管理のベストプラクティス)
10. [BookRAG Managerでの成功パターン](#bookrag-managerでの成功パターン)
11. [パフォーマンス最適化](#パフォーマンス最適化)
12. [エラーハンドリング](#エラーハンドリング)

---

## Protocol Improvement 3

### 概要

Protocol Improvement 3は、Worker成功率を大幅に向上させる改善プロトコルです。

**成功率の推移**:
- **v1**: 50% 成功率（指示書未読が原因）
- **v2**: 70% 成功率（DoD不明確）
- **v3**: 92% 成功率（11連続成功達成）

### 核心ルール

#### 1. 指示書必読

**NG（悪い例）**:
```markdown
# Worker1指示書

タスクを実行してください。
```

**OK（良い例）**:
```markdown
# Worker1指示書

**重要**: この指示書を最後まで読んでから作業を開始してください。

## タスク内容
[詳細...]

## 前提条件
- Worker0 が xxxx を完了していること
- この指示書を最後まで読んだこと

## DoD
[...]
```

**ポイント**:
- 冒頭に「必読」を明記
- 前提条件に「指示書を読んだこと」を含める
- 指示書の最後に「確認したら作業開始」を記載

#### 2. DoD 100%達成の徹底

**成功パターン**:
```markdown
## DoD

- [ ] 実装完了
  - [ ] src/components/xxx.tsx 作成（100行）
  - [ ] src/lib/xxx.ts 作成（50行）
- [ ] TypeScript エラー: 0件
- [ ] テスト成功（Jest: 10/10）
- [ ] 完了報告送信
```

**DoD達成状況**: 0/4 → 目標: 4/4 (100%)

**ポイント**:
- 具体的で測定可能
- チェックボックス形式
- 達成状況を明示

#### 3. 報告フォーマットの統一

**テンプレート**:
```markdown
# チケットXXX ジョブY 完了報告

**担当**: WorkerN
**タスク**: [タスク名]

## 完了内容
[実装した内容]

## DoD達成状況
- [x] 項目1
- [x] 項目2
[...]

**DoD: N/N (100%)**

## 成果物
- ファイル1 (XXX行)
- ファイル2 (XXX行)

以上、確認をお願いします。
WorkerN
```

---

## タスク分割の原則

### 1 Worker = 1責務

**NG（悪い例）**:
```markdown
## Worker1のタスク
- バックエンドAPI実装
- フロントエンドUI実装
- テスト作成
- ドキュメント作成
```

**OK（良い例）**:
```markdown
## Worker1のタスク
- バックエンドAPI実装のみ

## Worker2のタスク
- フロントエンドUI実装のみ

## Worker3のタスク
- テスト作成のみ
```

**メリット**:
- タスクが明確
- 並列実行可能
- デバッグが容易

### タスク分割の基準

| タスクサイズ | Worker数 | 例 |
|---|---|---|
| 小規模（<200行） | 1 Worker | コンポーネント1つ追加 |
| 中規模（200-500行） | 2-3 Workers | 新機能追加 |
| 大規模（>500行） | 4-6 Workers | システム全体の変更 |

### 分割の具体例

**タスク**: 書籍登録機能の実装（500行）

**悪い分割**:
- Worker1: 全部実装（500行）

**良い分割**:
- Worker1: データ型定義（src/lib/types.ts, 50行）
- Worker2: データベースアクセス（src/lib/db.ts, 150行）
- Worker3: バックエンドサービス（src/lib/services/books.ts, 150行）
- Worker4: フロントエンドフォーム（src/components/BookForm.tsx, 150行）

**メリット**:
- 並列実行で時間短縮
- 各Workerの責務が明確
- テストが容易

---

## Worker数の決定方法

### 推奨: 1-6 Workers

**根拠**:
- 1-3 Workers: 管理が容易
- 4-6 Workers: 並列化のメリットが大きい
- 7+ Workers: 管理コストが増加

### Worker数決定フローチャート

```
タスクサイズを見積もる
  ↓
<200行? → 1 Worker
  ↓
<500行? → 2-3 Workers
  ↓
<1000行? → 4-6 Workers
  ↓
>1000行? → タスク分割を再検討
```

### BookRAG Managerの実例

**チケット212: RAGシステム基盤構築（6 Workers）**

| Worker | タスク | 行数 | 依存関係 |
|---|---|---|---|
| Worker1 | embeddings.ts | 150行 | なし |
| Worker2 | vector-db.ts | 200行 | なし |
| Worker3 | indexing-ui.tsx | 180行 | Worker1,2完了後 |
| Worker4 | rag.ts | 150行 | Worker1,2完了後 |
| Worker5 | similar-books-ui.tsx | 100行 | Worker4完了後 |
| Worker6 | 統合テスト | 50行 | Worker5完了後 |

**合計**: 830行、6 Workers、DoD 100%達成

**成功要因**:
- 適切なTier構造（Tier1: Worker1-2並列、Tier2: Worker3-4並列）
- 各Workerの責務が明確
- 依存関係が明確

---

## Tier構造の設計指針

### Tier構造とは

依存関係に基づいてWorkerをグループ化する設計手法です。

### 設計原則

#### 1. 並列化の最大化

**NG（悪い例）**:
```
Worker1 → Worker2 → Worker3 → Worker4
（完全シーケンシャル）
```

**OK（良い例）**:
```
Tier1:  Worker1, Worker2（並列）
         ↓
Tier2:  Worker3, Worker4（並列）
```

**メリット**:
- 実行時間を半分に短縮
- リソースの効率的利用

#### 2. 依存関係の明確化

**テンプレート**:
```markdown
## Tier構造

- **Tier1 (並列実行可能)**
  - Worker1: 型定義
  - Worker2: データベーススキーマ

- **Tier2 (Tier1完了後)**
  - Worker3: API実装（Worker1,2の成果物を使用）
  - Worker4: UI実装（Worker1,2の成果物を使用）

- **Tier3 (Tier2完了後)**
  - Worker5: 統合テスト（全成果物を使用）
```

#### 3. デッドロック回避

**デッドロックの例**:
```
Worker1 → Worker2 → Worker1
（循環依存）
```

**回避方法**:
- Tier構造で一方向の依存関係を保証
- Worker間の直接依存を避ける
- 共通の依存は上位Tierに配置

### BookRAG Managerの実例

**チケット210: カテゴリ再設計（5 Workers）**

```
Tier1:  Worker1（types.ts更新）
         ↓
Tier2:  Worker2（BookForm更新）, Worker3（一覧ページ更新）（並列）
         ↓
Tier3:  Worker4（migration.ts作成）
         ↓
Tier4:  Worker5（layout.tsx更新）
```

**成功要因**:
- Worker1が基盤（types.ts）を提供
- Worker2-3が並列実行でUI更新
- Worker4がマイグレーション準備
- Worker5が最終統合

---

## DoD作成のコツ

### SMART原則

DoD（Definition of Done）は SMART 原則に従って作成します。

- **S**pecific（具体的）
- **M**easurable（測定可能）
- **A**chievable（達成可能）
- **R**elevant（関連性がある）
- **T**ime-bound（期限がある）

### 悪いDoDの例

```markdown
## DoD
- [ ] 実装する
- [ ] テストする
- [ ] ドキュメント書く
```

**問題点**:
- 具体性がない
- 測定不可能
- 完了判定が曖昧

### 良いDoDの例

```markdown
## DoD

- [ ] 実装完了
  - [ ] src/components/BookForm.tsx 作成（150行）
  - [ ] フォームバリデーション実装（Zod使用）
  - [ ] エラーハンドリング実装
- [ ] TypeScript エラー: 0件
  - [ ] npx tsc --noEmit で確認
- [ ] テスト成功
  - [ ] Jest: 5/5テストケース成功
  - [ ] カバレッジ: 90%以上
- [ ] ドキュメント更新
  - [ ] README.md に使用方法追加
  - [ ] API仕様書更新
- [ ] 完了報告送信
  - [ ] runs/XXX/workerN-report.md 作成

**DoD達成状況**: 0/5 → 目標: 5/5 (100%)
```

**ポイント**:
- 具体的なファイル名と行数
- 測定可能な基準（エラー0件、テスト成功数）
- チェックボックスで進捗可視化

### DoD達成状況の記載

**テンプレート**:
```markdown
**DoD達成状況**: 0/N → 目標: N/N (100%)
```

**進捗更新**:
```markdown
**DoD達成状況**: 3/5 (60%) → 目標: 5/5 (100%)
```

**完了時**:
```markdown
**DoD達成状況**: 5/5 (100%) ✅
```

---

## 報告フォーマットの重要性

### 統一フォーマットの利点

- Boss1が迅速に確認可能
- 成果物の可視化
- 品質保証

### 完了報告テンプレート

```markdown
# チケットXXX ジョブY 完了報告

**担当**: WorkerN
**タスク**: [タスク名]
**日時**: YYYY-MM-DD

---

## 完了内容

1. [成果物1]
2. [成果物2]
[...]

---

## DoD達成状況

- [x] 項目1
- [x] 項目2
[...]

**DoD**: N/N (100%)

---

## 成果物

| ファイル | 行数 | 内容 |
|---|---|---|
| src/xxx.ts | XXX行 | [説明] |
| src/yyy.tsx | XXX行 | [説明] |

---

## Git情報

- コミットハッシュ: XXXXXXX
- コミットメッセージ: "feat: xxx"

---

## 次のWorkerへの引き継ぎ

[WorkerN+1への情報]

---

以上、確認をお願いします。

WorkerN
```

### BookRAG Managerの実例

**Worker5 完了報告（チケット212）**:
- DoD 7/7 (100%)
- 成果物: SimilarBooks.tsx (87行), page.tsx更新
- Git: コミット完了
- 次Worker: Worker6（統合テスト）

**評価**: Excellent ⭐（Presidentから）

---

## デッドロック回避のパターン

### デッドロックとは

複数のWorkerが互いに完了を待ち続けて、進行不能になる状態です。

### よくあるデッドロックパターン

#### パターン1: 循環依存

```
Worker1 → Worker2
Worker2 → Worker1
（循環）
```

**回避方法**:
- Tier構造で一方向の依存を保証
- 共通の依存を上位Tierに配置

#### パターン2: 不明確な依存関係

```markdown
Worker1: "Worker2の完了を待つ"
Worker2: "Worker1の完了を待つ"（記載なし）
```

**回避方法**:
- 依存関係を明示的に記載
- Tier構造図を作成

### デッドロック検出方法

**検証コマンド**:
```bash
./scripts/validate-protocol.sh --check-deadlock
```

**手動検証**:
1. 全Worker指示書を確認
2. 依存関係をグラフ化
3. 循環がないか確認

### 実例: BookRAG Manager（デッドロック0件）

**成功要因**:
- 明確なTier構造
- 依存関係の可視化
- Boss1による事前検証

---

## 統合テストの実施方法

### Worker完了時のチェックリスト

```markdown
## Worker完了時のチェックリスト

- [ ] TypeScript エラー: 0件
  ```bash
  npx tsc --noEmit
  ```

- [ ] ビルド成功
  ```bash
  npm run build
  ```

- [ ] 単体テスト成功
  ```bash
  npm test
  ```

- [ ] Linter成功
  ```bash
  npm run lint
  ```

- [ ] Git コミット成功
  ```bash
  git status
  git diff
  ```
```

### 全Worker完了後の統合テスト

**テストスクリプト**:
```bash
#!/bin/bash
# scripts/integration-test.sh

echo "🧪 統合テスト開始..."

# TypeScript
echo "📝 TypeScript チェック..."
npx tsc --noEmit || exit 1

# Build
echo "🔨 ビルドテスト..."
npm run build || exit 1

# Tests
echo "✅ 単体テスト..."
npm test || exit 1

# Lint
echo "🎨 Linter..."
npm run lint || exit 1

echo "✅ 全テスト成功！"
```

### BookRAG Managerの実例

**チケット212: 統合テスト（Worker6）**

```bash
# TypeScript: 0件
npx tsc --noEmit
# ✅ 成功

# Build
npm run build
# ✅ 成功（5分）

# Tests
npm test
# ✅ 25/25テスト成功
```

---

## Git管理のベストプラクティス

### Conventional Commits

**フォーマット**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**例**:
```
feat(auth): add user login component

- Login form with email/password
- Form validation with Zod
- Error handling

Closes #123
```

### Type一覧

| Type | 用途 | 例 |
|---|---|---|
| feat | 新機能追加 | feat: add search feature |
| fix | バグ修正 | fix: resolve login error |
| docs | ドキュメント | docs: update README |
| refactor | リファクタリング | refactor: improve code structure |
| test | テスト追加 | test: add unit tests |
| chore | 雑務 | chore: update dependencies |

### BookRAG Managerの実例

```bash
# Worker1 コミット
git commit -m "feat(types): add 14 BookCategory types

- Expand from 7 to 14 categories
- Add LEGACY_CATEGORY_MIGRATION
- Add tags field to Book interface

Related: #210"

# Worker5 コミット
git commit -m "feat(ui): add similar books component

- Create SimilarBooks.tsx (87 lines)
- Integrate with books/[id]/page.tsx
- Display similarity percentage

Related: #212"
```

---

## BookRAG Managerでの成功パターン

BookRAG Managerプロジェクトでの11連続成功実績に基づく、具体的な成功パターンを紹介します。

### 成功パターン 1: 指示書必読の徹底

**実施内容**:
- 全Worker指示書の冒頭に「必読」を明記
- 前提条件に「指示書を読んだこと」を含める

**結果**:
- 指示書未読による失敗: 0件
- Protocol Improvement 3 達成率: 92%

### 成功パターン 2: Tier構造による並列化

**実施内容**:
- チケット212: 6 Workers を3 Tierに分割
- Tier1: Worker1-2並列、Tier2: Worker3-4並列

**結果**:
- 実行時間: 50%短縮（予測）
- デッドロック: 0件

### 成功パターン 3: DoD 100%達成の徹底

**実施内容**:
- 全WorkerでDoD 100%達成を義務化
- 未達成の場合は完了報告を送信しない

**結果**:
- 全タスクでDoD 100%達成
- 再作業: 0件

### 成功パターン 4: 報告フォーマットの統一

**実施内容**:
- テンプレートベースの報告書
- DoD達成状況を明示

**結果**:
- Boss1の確認時間: 50%短縮
- 報告漏れ: 0件

### 成功パターン 5: TypeScript/Buildエラー0件

**実施内容**:
- Worker完了時に必ずTypeScriptチェック
- ビルドテストを実施

**結果**:
- TypeScriptエラー: 0件
- ビルドエラー: 0件

### 成功パターン 6: Worker数の最適化

**実施内容**:
- 1-6 Workersを基準に分割
- 小タスクは統合、大タスクは分割

**結果**:
- 管理コスト: 最小化
- 並列化のメリット: 最大化

### 成功パターン 7: Git Conventional Commits

**実施内容**:
- 全コミットでConventional Commits準拠
- feat, fix, docs, refactorなど明確に分類

**結果**:
- コミット履歴: 可読性向上
- リリースノート: 自動生成可能

### 成功パターン 8: 統合テストの実施

**実施内容**:
- Worker6で統合テスト実施
- TypeScript, Build, Unit Testを検証

**結果**:
- 統合エラー: 0件
- 品質保証: 100%

### 成功パターン 9: ドキュメント作成の優先

**実施内容**:
- README, API仕様書を同時更新
- コードコメントの充実

**結果**:
- 保守性: 向上
- オンボーディング: 容易

### 成功パターン 10: エラーハンドリングの統一

**実施内容**:
- try-catch-finally パターンの統一
- エラーメッセージの標準化

**結果**:
- バグ発見: 容易
- デバッグ時間: 短縮

### 成功パターン 11: DRY原則の遵守

**実施内容**:
- BookCard コンポーネントの再利用（Worker5）
- 共通関数の抽出

**結果**:
- コード重複: 0%
- 保守性: 向上
- Presidentから特別評価

### 成功パターン 12: 継続的な改善

**実施内容**:
- Protocol v1 → v2 → v3 と改善
- 失敗パターンを分析してプロトコル改善

**結果**:
- 成功率: 50% → 92%
- 11連続成功達成

---

## パフォーマンス最適化

### Worker並列実行の最適化

**並列実行のメリット**:
- 実行時間の短縮
- リソースの効率的利用

**最適化手法**:
1. Tier構造で並列化
2. 依存関係の最小化
3. 共通依存を上位Tierに配置

### メモリ使用量の最適化

**注意点**:
- 大量のWorker（7+）は避ける
- 各Workerのメモリ使用量を監視

### ディスク I/O の最適化

**ベストプラクティス**:
- 必要最小限のファイル読み書き
- キャッシュの活用

---

## エラーハンドリング

### Worker失敗時の対処

**失敗検出**:
- DoD未達成
- TypeScriptエラー
- ビルドエラー

**対処方法**:
1. エラーログを確認
2. Worker指示書を見直し
3. 再実行

### 統合エラーの対処

**検出方法**:
- 統合テスト実施
- 全Workerの成果物を検証

**対処方法**:
- エラー箇所を特定
- 該当Workerを再実行
- 統合テストを再実行

---

## まとめ

Claude Multi-Agent Framework のベストプラクティスは、BookRAG Managerでの11連続成功実績に基づいています。

**重要ポイント**:
1. Protocol Improvement 3 の徹底
2. Tier構造による並列化
3. DoD 100%達成
4. 報告フォーマットの統一
5. TypeScript/Buildエラー0件
6. Worker数の最適化（1-6 Workers）
7. Git Conventional Commits
8. 統合テストの実施
9. ドキュメント作成の優先
10. エラーハンドリングの統一
11. DRY原則の遵守
12. 継続的な改善

これらのベストプラクティスに従うことで、高い成功率（92%）とDoD 100%達成を実現できます。

---

**次のステップ**: [Troubleshooting](./troubleshooting.md) を読んで、よくある問題の解決方法を学びましょう。

---

## 13. 通信プロトコルを絶対に遵守する

### 原則
すべてのエージェント間通信は `agent-send.sh` を使用する。テキスト応答は厳禁。

### 悪い例 ❌
```markdown
President: "Boss1、新しいタスクをお願いします。"
Boss1（テキスト応答）: "承知しました。Worker1-3に指示を出します。"
```
→ Presidentの指示がBoss1に届いていない！

### 良い例 ✅
```bash
# President
./agent-send.sh boss1 "新しいタスクをお願いします。instructions/task/task-XXX.md"

# Boss1
./agent-send.sh worker1 "instructions/worker/task-XXX-worker1.md"
```

### チェック方法
```bash
# 通信履歴を確認
tail -20 logs/send_log.txt
```

### BookRAG Manager での教訓
- **チケット213**: President が通信を忘れ、Boss1 がタスクを受け取れず
- **解決**: agent-send.sh 実行を忘れずに、確認も実施

---

## 14. 作業ディレクトリを必ず確認する

### 原則
作業開始前に `pwd` で作業ディレクトリを確認し、誤ったディレクトリでの作業を防ぐ。

### 悪い例 ❌
```bash
# 確認せずに作業開始
vim docs/getting-started.md
git add docs/
git commit -m "docs: add getting started"
# → 誤ったリポジトリにコミットしている可能性！
```

### 良い例 ✅
```bash
# 作業開始前に必ず確認
pwd
# /mnt/c/Users/masas/Documents/Projects/claude-multiagent-framework

# 期待値と一致していることを確認してから作業開始
vim docs/getting-started.md
```

### チェック方法
```bash
# 作業前チェックリスト
pwd                        # ディレクトリ確認
ls -la docs/              # 成果物確認
git status                # ステージング確認
git log -1 --stat         # コミット内容確認
```

### BookRAG Manager での教訓
- **チケット213 Worker5**: 誤ったディレクトリで作業し、4ファイル（2,755行）が欠損
- **影響**: 2-3時間の再作業が必要に
- **解決**: 作業開始前の pwd 確認を指示書に追加
