/**
 * 音声ファイルのバリデーションエラー
 */
export class InvalidAudioFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidAudioFileError";
  }
}

/**
 * 文字起こしエンジンのバリデーションエラー
 */
export class InvalidTranscriptionEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTranscriptionEngineError";
  }
}

/**
 * 文字起こし処理の失敗エラー
 */
export class TranscriptionFailedError extends Error {
  constructor(
    message: string,
    public readonly failure: import("./TranscriptionFailure").TranscriptionFailure,
  ) {
    super(message);
    this.name = "TranscriptionFailedError";
  }
}

/**
 * 不正な状態遷移エラー
 */
export class InvalidStateTransitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidStateTransitionError";
  }
}
