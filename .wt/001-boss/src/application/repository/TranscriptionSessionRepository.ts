import { SessionId } from "@/domain/transcription/TranscriptionTypes";
import { TranscriptionSession } from "@/domain/transcription/TranscriptionSession";

/**
 * TranscriptionSession の永続化を抽象化したリポジトリインターフェース
 *
 * 実装クラス例（Infrastructure層）:
 * - InMemoryTranscriptionSessionRepository（開発・テスト用）
 * - SupabaseTranscriptionSessionRepository（本番用）
 */
export interface TranscriptionSessionRepository {
  /**
   * セッションを保存
   * @param session 保存するセッション
   */
  save(session: TranscriptionSession): Promise<void>;

  /**
   * セッションIDでセッションを取得
   * @param sessionId セッションID
   * @returns セッション（存在しない場合はnull）
   */
  findById(sessionId: SessionId): Promise<TranscriptionSession | null>;

  /**
   * 全セッションを取得
   * @returns セッション配列
   */
  findAll(): Promise<TranscriptionSession[]>;

  /**
   * セッションを更新
   * @param session 更新するセッション
   */
  update(session: TranscriptionSession): Promise<void>;
}
