# チケット002: RAG統合

**From**: President
**To**: Boss1
**Priority**: High
**Deadline**: 3日
**Dependencies**: チケット001完了後

---

## 📋 タスク概要

RAG（Retrieval-Augmented Generation）システムを統合してください。
Supabase Vector Store と OpenAI Embeddings を使用し、セマンティック検索機能を実装します。

---

## 🎯 目標

- Supabase pgvector設定
- OpenAI Embeddings統合
- Vector DB操作実装
- RAGロジック実装
- 検索UI実装（類似検索 + セマンティック検索）
- DoD 100%達成

---

## 📐 技術仕様

### 技術スタック

- **Supabase pgvector** - Vector Store
- **OpenAI API** - text-embedding-3-small (1536次元)
- **Next.js** 14+ - フロントエンド
- **TypeScript** 5+ - 型安全性

### 型定義

```typescript
interface Document {
  id: string;
  title: string;
  content: string;
  embedding: number[]; // 1536次元
  createdAt: Date;
}

interface SimilarDocument {
  document: Document;
  similarity: number; // 0.0-1.0
}
```

---

## 👥 Worker割り当て

### Tier1: 基盤構築（並列実行）

#### Worker1: Supabase Vector設定

**担当範囲**:
- pgvector拡張有効化
- documentsテーブル作成
- インデックス作成

**成果物**:
- `supabase/migrations/XXX_create_vector_table.sql`

**DoD（3項目）**:
- [ ] pgvector拡張有効化
- [ ] documentsテーブル作成（embedding列含む）
- [ ] 完了報告送信

---

#### Worker2: OpenAI Embeddings

**担当範囲**:
- OpenAI API統合
- embedText(), embedDocument()実装

**成果物**:
- `src/lib/embeddings.ts`

**DoD（3項目）**:
- [ ] embedText()実装完了
- [ ] embedDocument()実装完了
- [ ] 完了報告送信

---

### Tier2: Vector DB操作

#### Worker3: Vector DB操作

**担当範囲**:
- SupabaseクライアントでVector操作
- saveVector(), searchSimilarVectors()実装

**成果物**:
- `src/lib/vector-db.ts`

**DoD（4項目）**:
- [ ] saveVector()実装
- [ ] searchSimilarVectors()実装
- [ ] Supabase RPCコール実装
- [ ] 完了報告送信

**依存関係**: Worker1, Worker2完了後

---

### Tier3: RAGロジック

#### Worker4: RAGロジック

**担当範囲**:
- indexDocument()実装
- findSimilarDocuments()実装
- semanticSearch()実装

**成果物**:
- `src/lib/rag.ts`

**DoD（4項目）**:
- [ ] indexDocument()実装
- [ ] findSimilarDocuments()実装
- [ ] semanticSearch()実装
- [ ] 完了報告送信

**依存関係**: Worker3完了後

---

### Tier4: UI実装（並列実行）

#### Worker5: 類似検索UI

**担当範囲**:
- ドキュメント詳細ページに類似ドキュメント表示
- findSimilarDocuments()呼び出し

**成果物**:
- `src/app/documents/[id]/page.tsx`（更新）

**DoD（3項目）**:
- [ ] 類似ドキュメントセクション実装
- [ ] 類似度バッジ表示
- [ ] 完了報告送信

**依存関係**: Worker4完了後

---

#### Worker6: セマンティック検索UI

**担当範囲**:
- ドキュメント一覧ページにセマンティック検索追加
- 検索モード切り替え
- semanticSearch()呼び出し

**成果物**:
- `src/app/documents/page.tsx`（更新）

**DoD（4項目）**:
- [ ] 検索モード切り替えUI実装
- [ ] セマンティック検索入力欄実装
- [ ] 検索結果表示（類似度付き）
- [ ] 完了報告送信

**依存関係**: Worker4完了後

---

## 🏗️ Tier構造

```
Tier1: Worker1 (Supabase Vector), Worker2 (OpenAI) - 並列実行
  ↓
Tier2: Worker3 (Vector DB操作)
  ↓
Tier3: Worker4 (RAGロジック)
  ↓
Tier4: Worker5 (類似検索UI), Worker6 (セマンティック検索UI) - 並列実行
```

**並列実行ポイント**:
- Tier1: Worker1とWorker2は依存関係なし
- Tier4: Worker5とWorker6は依存関係なし

---

## ✅ 統合DoD（Boss1確認項目）

- [ ] Worker1 DoD達成（3/3）
- [ ] Worker2 DoD達成（3/3）
- [ ] Worker3 DoD達成（4/4）
- [ ] Worker4 DoD達成（4/4）
- [ ] Worker5 DoD達成（3/3）
- [ ] Worker6 DoD達成（4/4）
- [ ] TypeScriptエラー 0件
- [ ] npm run build成功
- [ ] 類似検索動作確認
- [ ] セマンティック検索動作確認
- [ ] runs/002/boss-to-president-report.md作成
- [ ] Presidentへ最終報告送信

---

## 📝 備考

- **BookRAG Manager実績ベース**
  - Protocol Improvement 3（11連続成功達成）のノウハウ活用
  - DoD 100%達成の厳格性
- **Tier構造の重要性**
  - 依存関係を明確化し、Workerの作業順序を制御
  - Tier1とTier4で並列実行を最適化
- **品質基準**
  - TypeScriptエラー 0件必須
  - Build成功必須
  - 動作確認必須

Boss1、Workerへのタスク分割をお願いします。

President
