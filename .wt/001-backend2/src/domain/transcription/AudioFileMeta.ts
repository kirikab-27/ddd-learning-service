import { InvalidAudioFileError } from "./TranscriptionErrors";

/**
 * AudioFileのメタ情報を表す値オブジェクト
 */
export class AudioFileMeta {
  constructor(
    public readonly fileName: string,
    public readonly originalFileName: string,
    public readonly mimeType: string,
    public readonly sizeBytes: number,
    public readonly durationSeconds: number | null,
  ) {
    this.validate();
  }

  private validate(): void {
    // fileName: 空文字列不可、最大255文字
    if (!this.fileName || this.fileName.length > 255) {
      throw new InvalidAudioFileError("ファイル名は1〜255文字で指定してください");
    }

    // originalFileName: 空文字列不可、最大255文字
    if (!this.originalFileName || this.originalFileName.length > 255) {
      throw new InvalidAudioFileError("元のファイル名は1〜255文字で指定してください");
    }

    // mimeType: 許可リスト
    const allowedMimeTypes = ["audio/m4a", "audio/mp3", "audio/wav", "audio/x-m4a", "audio/mp4"];
    if (!allowedMimeTypes.includes(this.mimeType)) {
      throw new InvalidAudioFileError(
        `対応していないファイル形式です: ${this.mimeType}`
      );
    }

    // sizeBytes: > 0, <= 100MB
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    if (this.sizeBytes <= 0 || this.sizeBytes > MAX_SIZE) {
      throw new InvalidAudioFileError(
        `ファイルサイズは1バイト〜100MBの範囲で指定してください: ${this.sizeBytes}バイト`
      );
    }

    // durationSeconds: null 許容、値がある場合 > 0 かつ <= 1800
    if (this.durationSeconds !== null) {
      if (this.durationSeconds <= 0 || this.durationSeconds > 1800) {
        throw new InvalidAudioFileError(
          `再生時間は1〜1800秒（30分）の範囲で指定してください: ${this.durationSeconds}秒`
        );
      }
    }
  }
}
