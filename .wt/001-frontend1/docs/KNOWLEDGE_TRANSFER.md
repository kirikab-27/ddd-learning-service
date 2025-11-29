# 知見引き継ぎドキュメント

## 前プロジェクト（NotebookLM Transcriber）からの学び

---

## 1. DDD実装で学んだこと

### 値オブジェクトの威力
```typescript
// ❌ プリミティブ型のまま
function createUser(email: string) { ... }

// ✅ 値オブジェクトでラップ
function createUser(email: Email) { ... }

// Email値オブジェクト
class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!this.isValid(value)) {
      throw new Error('Invalid email format');
    }
    return new Email(value);
  }
}
```

**効果**: バリデーションの一元化、型安全性の向上

### DTOレイヤーの重要性
前プロジェクトで発生したバグ:
- `AudioFileMetaDto`に`originalFileName`が欠落
- ドメイン→DTO変換時に情報が失われた

**教訓**: DTOは慎重に設計し、ドメインモデルとの対応を明確にする

### リポジトリパターンのメリット
- ドメイン層がインフラに依存しない
- テスト時にモックに差し替え可能
- 永続化技術の変更が容易

---

## 2. マルチエージェントプロトコルの教訓

### Protocol v3/v4の核心

| 原則 | 説明 |
|------|------|
| DoD 100%達成 | 部分完了は許可しない |
| Instruction-First | 指示書を最後まで読んでから作業開始 |
| Boss統合責任 | Bossが最終統合を担う |
| President品質ゲート | 本番デプロイ前の最終確認 |

### 成功率の推移
- Protocol v1: 25%
- Protocol v2: 60%
- Protocol v3: 100%（11連続成功）

### 重要な失敗事例と対策

**問題1: 作業ディレクトリ誤り**
- Worker5が間違ったディレクトリで作業
- 対策: 作業開始前に`pwd`確認を必須化

**問題2: 通信忘れ**
- Presidentがテキスト応答し、agent-send.shを忘れる
- 対策: 指示書最上部に通信プロトコルを配置

---

## 3. 設計判断の記録

### Clean Architecture採用理由
1. ドメインロジックの純粋性を保つため
2. フレームワーク（Next.js）に依存しない設計
3. テスト容易性の確保

### 4層構造の採用理由
```
Presentation → Application → Domain ← Infrastructure
```
- シンプルで理解しやすい
- 小〜中規模プロジェクトに適切
- 過度な複雑化を避ける

---

## 4. 本プロジェクトへの適用

### DDD学習サービスの境界づけられたコンテキスト（BC）

1. **コース管理BC**: コース、章、教材
2. **学習進捗BC**: 受講登録、進捗、完了状態
3. **評価BC**: クイズ、回答、採点
4. **ユーザーBC**: 学生、講師

### 推奨する値オブジェクト
- `Score`: 0-100の成績
- `CourseTitle`: コース名（空文字禁止）
- `LessonOrder`: 章の順序（1以上）
- `StudyDuration`: 学習時間

### 推奨するSpecification
- `CourseCompletionSpecification`: 修了判定
- `LessonUnlockSpecification`: 次章解放判定
- `CertificateEligibleSpecification`: 修了証発行判定

---

## 5. 開発時の注意事項

### Presidentとして
- **実装作業をしない** → Boss1に委譲
- 品質ゲートでの最終確認に専念
- Protocol遵守の監督

### Boss1として
- タスクをWorker単位に分解
- Tier構造で依存関係を管理
- 統合テストの実行

### Workerとして
- 指示書を最後まで読む
- DoD 100%を達成してから完了報告
- 不明点はBossに質問

---

## 6. 参考資料

- `/docs/ARCHITECTURE.md`: アーキテクチャガイド
- `/.wt/001-president/PROTOCOL.md`: マルチエージェントプロトコル
- DDDドキュメント: `noteboolLM_DDD/`（前プロジェクト）
