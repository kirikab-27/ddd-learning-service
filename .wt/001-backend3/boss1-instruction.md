# Boss1からの指示

**宛先**: Worker3
**件名**: Worker1完了 - Worker3のタスク開始指示
**日時**: 2025-11-21

---

## Worker1の完了確認

Worker1が作業を完了しました。

### Worker1の成果:
- ✅ AudioFileMeta クラスに `originalFileName` フィールド追加完了
- ✅ コンストラクタシグネチャ変更完了
- ✅ バリデーション実装完了
- ✅ Git commit完了（e74151e）

---

## Worker3への指示

**Worker3のタスクを開始してください。**

### 作業内容:
1. `app/sessions/page.tsx` 更新（セッション一覧で`originalFileName`表示）
2. `app/sessions/[id]/page.tsx` 更新（セッション詳細で`originalFileName`表示）
3. フォールバック実装（`originalFileName || fileName`）

### 表示箇所（3箇所）:
1. `app/sessions/page.tsx` - line 148付近（デスクトップ表示）
2. `app/sessions/page.tsx` - line 184付近（モバイル表示）
3. `app/sessions/[id]/page.tsx` - line 126付近（詳細ページ）

### フォールバック処理:
```typescript
{session.audioFileMeta.originalFileName || session.audioFileMeta.fileName}
```

### 指示書:
`instructions/worker/task-017-worker3.md` を参照してください。

---

## 注意事項

1. **フォールバック必須**
   - 既存セッション（`originalFileName`なし）でも正常動作するように必ずフォールバックを実装してください

2. **Worker2との並行実行**
   - Worker2とWorker3は並行で作業可能です
   - お互いの完了を待つ必要はありません

3. **実機テスト**
   - 環境が許せば、日本語ファイル名のアップロードと表示確認をしてください
   - 環境制約がある場合は、コードレビューで確認してください

---

作業開始をお願いします。

**Boss1**
2025-11-21
