import { TranscriptionResult } from "../dto/TranscriptionResult";
import { TranscriptionSessionRepository } from "../repository/TranscriptionSessionRepository";
import { toTranscriptionResult } from "../dto/TranscriptionResult";

/**
 * セッション一覧取得ユースケース
 */
export class ListTranscriptionSessionsUseCase {
  constructor(
    private readonly repository: TranscriptionSessionRepository,
  ) {}

  /**
   * 全セッションの一覧を取得
   * @returns セッション一覧（作成日時降順）
   */
  async execute(): Promise<TranscriptionResult[]> {
    const sessions = await this.repository.findAll();

    // 作成日時降順にソート
    const sorted = sessions.sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );

    return sorted.map(session => toTranscriptionResult(session));
  }
}
