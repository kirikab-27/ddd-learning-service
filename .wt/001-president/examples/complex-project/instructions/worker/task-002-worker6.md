# チケット002 Worker6: セマンティック検索UI

**From**: Boss1
**To**: Worker6
**Task**: ドキュメント一覧ページにセマンティック検索機能を追加
**Priority**: High
**Tier**: Tier4（Worker4完了後、Worker5と並列）

---

## 📋 タスク概要

ドキュメント一覧ページにセマンティック検索機能を追加してください。
自然言語クエリでRAG検索ができるようにします。

---

## 前提条件

- ✅ Worker4 が src/lib/rag.ts を実装済み
- ✅ semanticSearch() 関数が利用可能

---

## 🎯 実装内容

### ドキュメント一覧ページの更新

**ファイル**: `src/app/documents/page.tsx`（更新）

**要件**:
1. 検索モード切り替え（キーワード検索 vs セマンティック検索）
2. セマンティック検索入力欄
3. semanticSearch() の呼び出し
4. 検索結果の表示（類似度付き）

---

## 💡 実装ガイドライン

### 1. State追加

```typescript
const [searchMode, setSearchMode] = useState<'keyword' | 'semantic'>('keyword');
const [semanticQuery, setSemanticQuery] = useState('');
const [semanticResults, setSemanticResults] = useState<SimilarDocumentResult[]>([]);
const [semanticLoading, setSemanticLoading] = useState(false);
```

必要なインポート追加:
```typescript
import { semanticSearch, type SimilarDocumentResult } from '@/lib/rag';
```

---

### 2. セマンティック検索関数追加

```typescript
const handleSemanticSearch = async () => {
  if (!semanticQuery.trim()) {
    setSemanticResults([]);
    return;
  }

  try {
    setSemanticLoading(true);
    const results = await semanticSearch(semanticQuery, 20);
    setSemanticResults(results);
  } catch (error) {
    console.error('Semantic search failed:', error);
    showToast('セマンティック検索に失敗しました', 'error');
  } finally {
    setSemanticLoading(false);
  }
};
```

---

### 3. 検索モード切り替えUI

```typescript
{/* 検索モード切り替え */}
<div className="mb-4 flex gap-4">
  <button
    type="button"
    onClick={() => {
      setSearchMode('keyword');
      setSemanticResults([]);
    }}
    className={`px-4 py-2 rounded-md font-medium ${
      searchMode === 'keyword'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-700'
    }`}
  >
    キーワード検索
  </button>
  <button
    type="button"
    onClick={() => setSearchMode('semantic')}
    className={`px-4 py-2 rounded-md font-medium ${
      searchMode === 'semantic'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-700'
    }`}
  >
    セマンティック検索
  </button>
</div>
```

---

### 4. セマンティック検索入力欄

```typescript
{searchMode === 'semantic' && (
  <div className="mb-6">
    <label className="block text-sm font-medium mb-2">
      自然言語で検索（例: 「TypeScriptの初心者向け記事」）
    </label>
    <div className="flex gap-2">
      <input
        type="text"
        value={semanticQuery}
        onChange={(e) => setSemanticQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSemanticSearch();
          }
        }}
        placeholder="探しているドキュメントの特徴を入力"
        className="flex-1 px-4 py-2 border rounded-md"
      />
      <button
        onClick={handleSemanticSearch}
        disabled={semanticLoading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {semanticLoading ? '検索中...' : '検索'}
      </button>
    </div>
  </div>
)}
```

---

### 5. 検索結果表示

```typescript
{searchMode === 'semantic' && (
  <div>
    {semanticLoading ? (
      <div className="text-center py-8">
        <p>検索中...</p>
      </div>
    ) : semanticResults.length > 0 ? (
      <div>
        <h2 className="text-xl font-bold mb-4">
          検索結果（{semanticResults.length}件）
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {semanticResults.map(({ document, similarity }) => (
            <div key={document.id} className="relative">
              <DocumentCard
                document={document}
                onClick={() => router.push(`/documents/${document.id}`)}
              />
              <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {Math.round(similarity * 100)}% 一致
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : semanticQuery ? (
      <div className="text-center py-8">
        <p>該当するドキュメントが見つかりませんでした</p>
      </div>
    ) : (
      <div className="text-center py-8">
        <p>検索クエリを入力してください</p>
      </div>
    )}
  </div>
)}
```

---

### 6. 既存UIの条件付き表示

キーワード検索のフィルターとドキュメント一覧を `searchMode === 'keyword'` で条件分岐：

```typescript
{searchMode === 'keyword' && (
  <div>
    {/* 既存のキーワード検索UI */}
  </div>
)}
```

---

## ✅ Definition of Done (DoD)

- [ ] src/app/documents/page.tsx 更新完了
- [ ] 検索モード切り替えUI実装
- [ ] セマンティック検索入力欄実装
- [ ] semanticSearch()を正しく呼び出している
- [ ] 検索結果に類似度（%）を表示
- [ ] TypeScriptエラー 0件
- [ ] 完了報告送信（runs/002/worker6-report.md）

**DoD: 0/7 → 目標: 7/7 (100%)**

---

## 📤 完了報告フォーマット

```markdown
# チケット002 Worker6 完了報告

**担当**: Worker6
**タスク**: セマンティック検索UI

## 完了内容

- src/app/documents/page.tsx 更新完了
- 検索モード切り替えUI実装
- セマンティック検索機能統合
- Enterキー対応
- 類似度バッジ表示

## DoD達成状況

- [x] page.tsx更新完了
- [x] 検索モード切り替えUI実装
- [x] セマンティック検索入力欄実装
- [x] semanticSearch()呼び出し
- [x] 類似度表示
- [x] TypeScriptエラー 0件
- [x] 完了報告送信

**DoD: 7/7 (100%)**

Worker6
```

---

Worker6、よろしくお願いします！
