import { InvalidTranscriptionEngineError } from "./TranscriptionErrors";

type EngineType = "whisper" | "google" | "local-whisper" | "azure";

/**
 * 文字起こしエンジンを表す値オブジェクト
 */
export class TranscriptionEngine {
  private constructor(public readonly value: EngineType) {}

  /**
   * 文字列からTranscriptionEngineを生成
   * @param engine エンジン名
   * @returns TranscriptionEngine
   * @throws InvalidTranscriptionEngineError サポート外のエンジン
   */
  static fromString(engine: string): TranscriptionEngine {
    const supportedEngines: EngineType[] = ["whisper"]; // v1はwhisperのみ

    if (!supportedEngines.includes(engine as EngineType)) {
      throw new InvalidTranscriptionEngineError(
        `サポートされていないエンジンです: ${engine}`
      );
    }

    return new TranscriptionEngine(engine as EngineType);
  }

  static whisper(): TranscriptionEngine {
    return new TranscriptionEngine("whisper");
  }

  toString(): string {
    return this.value;
  }
}
