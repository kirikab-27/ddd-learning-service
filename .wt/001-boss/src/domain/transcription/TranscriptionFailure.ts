/**
 * 文字起こし失敗時の詳細情報を表す値オブジェクト
 */
export class TranscriptionFailure {
  constructor(
    public readonly reason: string,
    public readonly errorCode: string | null,
    public readonly retryable: boolean,
  ) {}

  /**
   * APIタイムアウトエラーを生成
   */
  static apiTimeout(): TranscriptionFailure {
    return new TranscriptionFailure(
      "APIがタイムアウトしました。時間をおいて再試行してください。",
      "API_TIMEOUT",
      true
    );
  }

  /**
   * レート制限エラーを生成
   */
  static rateLimited(): TranscriptionFailure {
    return new TranscriptionFailure(
      "API利用制限に達しました。時間をおいて再試行してください。",
      "RATE_LIMITED",
      true
    );
  }

  /**
   * 認証エラーを生成
   */
  static authFailed(): TranscriptionFailure {
    return new TranscriptionFailure(
      "APIキーの認証に失敗しました。設定を確認してください。",
      "AUTH_FAILED",
      false
    );
  }

  /**
   * 一般的なエラーを生成
   */
  static general(reason: string): TranscriptionFailure {
    return new TranscriptionFailure(reason, null, false);
  }
}
