import { SessionId } from "@/domain/transcription/TranscriptionTypes";
import { TranscriptionResult } from "../dto/TranscriptionResult";
import { TranscriptionSessionRepository } from "../repository/TranscriptionSessionRepository";
import { toTranscriptionResult } from "../dto/TranscriptionResult";

/**
 * セッション未発見エラー
 */
export class SessionNotFoundError extends Error {
  constructor(sessionId: SessionId) {
    super(`Session not found: ${sessionId}`);
    this.name = "SessionNotFoundError";
  }
}

/**
 * 文字起こし結果取得ユースケース
 */
export class GetTranscriptionResultUseCase {
  constructor(
    private readonly repository: TranscriptionSessionRepository,
  ) {}

  /**
   * セッションIDから結果を取得
   * @param sessionId セッションID
   * @returns 文字起こし結果
   * @throws SessionNotFoundError セッションが存在しない場合
   */
  async execute(sessionId: SessionId): Promise<TranscriptionResult> {
    const session = await this.repository.findById(sessionId);

    if (!session) {
      throw new SessionNotFoundError(sessionId);
    }

    return toTranscriptionResult(session);
  }
}
