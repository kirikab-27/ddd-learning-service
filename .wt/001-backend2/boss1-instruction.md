# Boss1からの指示

**宛先**: Worker2
**件名**: Worker1完了 - Worker2のタスク開始指示
**日時**: 2025-11-21

---

## Worker1の完了確認

Worker1が作業を完了しました。

### Worker1の成果:
- ✅ AudioFileMeta クラスに `originalFileName` フィールド追加完了
- ✅ コンストラクタシグネチャ変更: `(fileName, originalFileName, mimeType, sizeBytes, durationSeconds)`
- ✅ バリデーション実装完了
- ✅ テスト5件追加完了
- ✅ Git commit完了（e74151e）

---

## Worker2への指示

**Worker2のタスクを開始してください。**

### 作業内容:
1. `app/page.tsx` 更新（FormDataに`originalFileName`追加）
2. `app/api/transcribe/route.ts` 更新（`originalFileName`を受け取りAudioFileMetaに渡す）

### 新しいコンストラクタシグネチャ:
```typescript
new AudioFileMeta(
  fileName,           // サニタイズ済みファイル名
  originalFileName,   // 元のファイル名 ← 新規追加
  mimeType,
  sizeBytes,
  durationSeconds
)
```

### 指示書:
`instructions/worker/task-017-worker2.md` を参照してください。

---

## 注意事項

1. **Breaking Change対応**
   - AudioFileMetaのコンストラクタに`originalFileName`引数が追加されています
   - 必ず新しいシグネチャに従ってください

2. **フォールバック処理**
   - APIで`originalFileName`が存在しない場合のフォールバックを実装してください
   - `const originalFileName = (formData.get('originalFileName') as string) || file.name;`

3. **Worker3との並行実行**
   - Worker2とWorker3は並行で作業可能です
   - お互いの完了を待つ必要はありません

---

作業開始をお願いします。

**Boss1**
2025-11-21
