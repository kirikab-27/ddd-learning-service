import { TranscriptionSessionRepository } from "@/application/repository/TranscriptionSessionRepository";
import { TranscriptionSession } from "@/domain/transcription/TranscriptionSession";
import { SessionId } from "@/domain/transcription/TranscriptionTypes";

/**
 * メモリ内でTranscriptionSessionを管理するリポジトリ
 * 開発・テスト用途
 */
export class InMemoryTranscriptionSessionRepository
  implements TranscriptionSessionRepository
{
  private sessions: Map<SessionId, TranscriptionSession> = new Map();

  /**
   * セッションを保存
   * @param session TranscriptionSession
   */
  async save(session: TranscriptionSession): Promise<void> {
    this.sessions.set(session.sessionId, session);
  }

  /**
   * セッションIDでセッションを取得
   * @param sessionId SessionId
   * @returns TranscriptionSession または null
   */
  async findById(sessionId: SessionId): Promise<TranscriptionSession | null> {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * 全てのセッションを取得
   * @returns TranscriptionSession[]
   */
  async findAll(): Promise<TranscriptionSession[]> {
    return Array.from(this.sessions.values());
  }

  /**
   * セッションを更新
   * @param session TranscriptionSession
   */
  async update(session: TranscriptionSession): Promise<void> {
    this.sessions.set(session.sessionId, session);
  }

  /**
   * セッションを削除
   * @param sessionId SessionId
   */
  async delete(sessionId: SessionId): Promise<void> {
    this.sessions.delete(sessionId);
  }

  /**
   * 全てのセッションを削除（テスト用）
   */
  async clear(): Promise<void> {
    this.sessions.clear();
  }

  /**
   * セッション数を取得（テスト用）
   */
  async count(): Promise<number> {
    return this.sessions.size;
  }
}
