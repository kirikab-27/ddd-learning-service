/**
 * 音声→テキスト変換を抽象化したドメインサービス
 *
 * 実装クラス例:
 * - WhisperSpeechToTextService
 * - GoogleSpeechToTextService (将来)
 * - LocalWhisperSpeechToTextService (将来)
 */
export interface SpeechToTextService {
  /**
   * 音声データをテキストに変換
   * @param audio 音声データ（バイナリ）
   * @param language 言語コード（例: "ja"）
   * @returns 文字起こし結果のテキスト
   * @throws TranscriptionFailedError 変換失敗時
   */
  transcribe(audio: Uint8Array, language: "ja"): Promise<string>;
}
