# チケット004: /api/transcribe エンドポイント実装

**日付**: 2025-11-19
**作成者**: President
**Priority**: High
**Estimated Workers**: 2-3 Workers
**Status**: 未着手

---

## 📋 問題の概要

### エラー内容
フロントエンドから `/api/transcribe` APIを呼び出すと、以下のエラーが発生：

```
Failed to load resource: the server responded with a status of 400 (Bad Request)
URL: :3000/api/transcribe
Unable to add filesystem: <illegal path>
```

### 現状
- ドメイン層：実装済み ✅
- アプリケーション層：実装済み ✅
- インフラストラクチャ層：**未実装** ❌
- プレゼンテーション層（API）：**未実装** ❌

---

## 🎯 タスクの目的

音声ファイルをアップロードして文字起こしを実行するAPIエンドポイント `/api/transcribe` を実装する。

### 成功条件
1. `/api/transcribe` エンドポイントが正常に動作
2. .m4a, .mp3, .wav ファイルを受け付ける
3. 適切なエラーハンドリング
4. バリデーション実装（ファイルサイズ、形式等）
5. TranscribeAudioUseCase との連携

---

## 🏗️ Tier構造

### Tier 1（基盤実装、並列可能）
- **Worker1**: Repository実装（TranscriptionSessionRepository）
- **Worker2**: SpeechToTextService実装（モック or 実装）

### Tier 2（Tier1完了後）
- **Worker3**: API Route実装（`/api/transcribe`）

### Tier 3（Tier2完了後、統合）
- **Boss1**: 統合テスト、動作確認

---

## 📝 Worker別タスク概要

### Worker1: Repository実装
**ファイル**: `src/infrastructure/repository/InMemoryTranscriptionSessionRepository.ts`

**タスク内容**:
- TranscriptionSessionRepository インターフェースの実装
- まずはインメモリ実装（簡易版）
- save(), findById(), findAll() メソッド実装

**DoD**:
- [ ] TranscriptionSessionRepository インターフェース実装
- [ ] インメモリストレージで動作
- [ ] TypeScriptエラー: 0件
- [ ] ユニットテスト作成 & 成功

---

### Worker2: SpeechToTextService実装
**ファイル**: `src/infrastructure/services/MockSpeechToTextService.ts`

**タスク内容**:
- SpeechToTextService インターフェースのモック実装
- ファイルを受け取り、ダミーの文字起こし結果を返す
- エラーケースもシミュレート

**DoD**:
- [ ] SpeechToTextService インターフェース実装
- [ ] モックとしてダミーテキスト返却
- [ ] TypeScriptエラー: 0件
- [ ] ユニットテスト作成 & 成功

---

### Worker3: API Route実装
**ファイル**: `app/api/transcribe/route.ts` (Next.js App Router)

**タスク内容**:
- POST /api/transcribe エンドポイント作成
- FormData でファイルアップロード受付
- TranscribeAudioUseCase を呼び出し
- エラーハンドリング（400, 500等）
- レスポンス返却

**DoD**:
- [ ] POST /api/transcribe 実装
- [ ] ファイルアップロード対応
- [ ] バリデーション実装（ファイル形式、サイズ）
- [ ] TranscribeAudioUseCase 連携
- [ ] エラーハンドリング実装
- [ ] TypeScriptエラー: 0件
- [ ] 動作確認（手動テスト成功）

---

## 🔧 技術仕様

### API仕様

#### エンドポイント
```
POST /api/transcribe
```

#### リクエスト
```typescript
Content-Type: multipart/form-data

{
  file: File (audio/mp4, audio/mpeg, audio/wav等)
}
```

#### レスポンス（成功時）
```typescript
{
  sessionId: string,
  status: "pending" | "processing" | "completed" | "failed",
  fileName: string,
  createdAt: string
}
```

#### レスポンス（エラー時）
```typescript
{
  error: string,
  details?: string
}
```

### バリデーション要件
- ファイル形式: audio/mp4, audio/x-m4a, audio/mpeg, audio/wav 等（AudioFileMetaの許可リスト準拠）
- ファイルサイズ: 最大100MB
- 再生時間: 最大30分（可能な場合）

---

## 📦 依存関係

### 既存コード（利用可能）
- ✅ `src/domain/transcription/*` - ドメインモデル全て
- ✅ `src/application/usecases/TranscribeAudioUseCase` - ユースケース
- ✅ `src/application/repository/TranscriptionSessionRepository` - インターフェース
- ✅ `src/domain/transcription/SpeechToTextService` - インターフェース

### 新規実装が必要
- ❌ Repository実装（Worker1）
- ❌ SpeechToTextService実装（Worker2）
- ❌ API Route（Worker3）

---

## ✅ 受入基準（Acceptance Criteria）

### 機能要件
- [ ] `/api/transcribe` エンドポイントが実装されている
- [ ] .m4a ファイルをアップロードできる
- [ ] .mp3, .wav ファイルもアップロードできる
- [ ] 文字起こしセッションが作成される
- [ ] セッションIDが返却される

### 品質要件
- [ ] TypeScriptエラー: 0件
- [ ] ビルド成功
- [ ] 新規実装箇所にユニットテスト追加
- [ ] 全テスト成功

### エラーハンドリング
- [ ] 不正なファイル形式で400エラー
- [ ] ファイルサイズ超過で400エラー
- [ ] サーバーエラー時に500エラー

### 動作確認
- [ ] ブラウザから .m4a ファイルアップロード成功
- [ ] レスポンスにセッションID含まれる
- [ ] エラーケースも適切に処理される

---

## 🚨 注意事項

### セキュリティ
- ファイルアップロードのバリデーション必須
- ファイルサイズ制限の厳守
- MIME type検証必須

### パフォーマンス
- 大きなファイルのアップロード対応
- タイムアウト設定

### 互換性
- Next.js 16 App Router使用
- Server Actions は使わず、Route Handler で実装

---

## 📚 参考資料

### Next.js Route Handler
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers

### File Upload handling
- FormData APIの使用
- File validation

### 既存コード
- `src/application/usecases/TranscribeAudioUseCase.ts`
- `src/domain/transcription/AudioFileMeta.ts`（バリデーションロジック参照）

---

## 🎯 Boss1への指示

### タスク分解
1. Worker1, Worker2 は並列実行可能（Tier1）
2. Worker3 は Tier1 完了後に開始
3. 各Workerの完了報告を受領後、統合

### 統合責任
- Boss1 が全Worker成果物の統合を実施
- 動作確認テスト実施
- President への完了報告

### 報告フォーマット
- 各Worker DoD 100%達成確認
- 統合テスト結果
- TypeScriptエラー 0件確認
- ビルド成功確認

---

**President承認**: このチケットをBoss1に送信し、タスク実行を開始してください。

**次のアクション**: Boss1がタスク分解とWorker指示書作成
