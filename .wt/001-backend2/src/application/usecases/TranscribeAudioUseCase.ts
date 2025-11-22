import { TranscribeAudioCommand } from "../dto/TranscribeAudioCommand";
import { TranscriptionResult } from "../dto/TranscriptionResult";
import { TranscriptionSessionRepository } from "../repository/TranscriptionSessionRepository";
import { SpeechToTextService } from "@/domain/transcription/SpeechToTextService";
import { AudioFileMeta } from "@/domain/transcription/AudioFileMeta";
import { TranscriptionEngine } from "@/domain/transcription/TranscriptionEngine";
import { TranscriptionSession } from "@/domain/transcription/TranscriptionSession";
import { TranscriptionText } from "@/domain/transcription/TranscriptionText";
import { TranscriptionFailure } from "@/domain/transcription/TranscriptionFailure";
import { toTranscriptionResult } from "../dto/TranscriptionResult";

/**
 * 音声文字起こしユースケース
 */
export class TranscribeAudioUseCase {
  constructor(
    private readonly repository: TranscriptionSessionRepository,
    private readonly speechToTextService: SpeechToTextService,
  ) {}

  /**
   * 音声ファイルを文字起こし
   * @param command 文字起こしリクエスト
   * @param audioData 音声バイナリデータ
   * @returns 文字起こし結果
   */
  async execute(
    command: TranscribeAudioCommand,
    audioData: Uint8Array,
  ): Promise<TranscriptionResult> {
    // 1. ドメインオブジェクトの生成
    const audioFileMeta = new AudioFileMeta(
      command.fileName,
      command.originalFileName,
      command.mimeType,
      command.sizeBytes,
      command.durationSeconds
    );
    const engine = TranscriptionEngine.fromString(command.engine);
    const now = new Date();
    const session = TranscriptionSession.create(audioFileMeta, engine, now);

    // 2. セッションの保存（Requested状態）
    await this.repository.save(session);

    // 3. 処理開始
    session.startProcessing(now);
    await this.repository.update(session);

    try {
      // 4. 文字起こし実行
      const text = await this.speechToTextService.transcribe(audioData, "ja");
      const result = new TranscriptionText(text);

      // 5. 処理完了
      session.complete(result, new Date());
      await this.repository.update(session);

      return toTranscriptionResult(session);
    } catch (error) {
      // 6. 処理失敗
      const failure = TranscriptionFailure.general(
        error instanceof Error ? error.message : "Unknown error"
      );
      session.fail(failure, new Date());
      await this.repository.update(session);

      return toTranscriptionResult(session);
    }
  }
}
