import { SessionId, generateSessionId } from "./TranscriptionTypes";
import { AudioFileMeta } from "./AudioFileMeta";
import { TranscriptionEngine } from "./TranscriptionEngine";
import { TranscriptionStatus } from "./TranscriptionStatus";
import { TranscriptionText } from "./TranscriptionText";
import { TranscriptionFailure } from "./TranscriptionFailure";
import { InvalidStateTransitionError } from "./TranscriptionErrors";

/**
 * 1回の文字起こし処理を表す集約ルート
 */
export class TranscriptionSession {
  private constructor(
    public readonly sessionId: SessionId,
    public readonly audioFileMeta: AudioFileMeta,
    public readonly engine: TranscriptionEngine,
    private _status: TranscriptionStatus,
    private _result: TranscriptionText | null,
    private _failure: TranscriptionFailure | null,
    public readonly createdAt: Date,
    private _completedAt: Date | null,
    private _failedAt: Date | null,
  ) {}

  /**
   * 新しいTranscriptionSessionを生成
   * @param audioFileMeta 音声ファイルのメタ情報
   * @param engine 使用する文字起こしエンジン
   * @param now 現在時刻
   * @returns TranscriptionSession（status = Requested）
   */
  static create(
    audioFileMeta: AudioFileMeta,
    engine: TranscriptionEngine,
    now: Date,
  ): TranscriptionSession {
    return new TranscriptionSession(
      generateSessionId(),
      audioFileMeta,
      engine,
      TranscriptionStatus.requested(),
      null,  // result
      null,  // failure
      now,   // createdAt
      null,  // completedAt
      null,  // failedAt
    );
  }

  // ゲッター
  get status(): TranscriptionStatus {
    return this._status;
  }

  get result(): TranscriptionText | null {
    return this._result;
  }

  get failure(): TranscriptionFailure | null {
    return this._failure;
  }

  get completedAt(): Date | null {
    return this._completedAt;
  }

  get failedAt(): Date | null {
    return this._failedAt;
  }

  /**
   * 処理開始（Requested → Processing）
   * @param now 現在時刻
   * @throws InvalidStateTransitionError 不正な状態遷移
   */
  startProcessing(now: Date): void {
    if (!this._status.canTransitionTo(TranscriptionStatus.processing())) {
      throw new InvalidStateTransitionError(
        `Requested → Processing 以外の遷移は不可: 現在の状態=${this._status.toString()}`
      );
    }
    this._status = TranscriptionStatus.processing();
  }

  /**
   * 処理完了（Processing → Completed）
   * @param result 文字起こし結果
   * @param now 現在時刻
   * @throws InvalidStateTransitionError 不正な状態遷移
   */
  complete(result: TranscriptionText, now: Date): void {
    if (!this._status.canTransitionTo(TranscriptionStatus.completed())) {
      throw new InvalidStateTransitionError(
        `Processing → Completed 以外の遷移は不可: 現在の状態=${this._status.toString()}`
      );
    }
    this._status = TranscriptionStatus.completed();
    this._result = result;
    this._completedAt = now;
  }

  /**
   * 処理失敗（Requested/Processing → Failed）
   * @param failure 失敗情報
   * @param now 現在時刻
   * @throws InvalidStateTransitionError 不正な状態遷移
   */
  fail(failure: TranscriptionFailure, now: Date): void {
    if (!this._status.canTransitionTo(TranscriptionStatus.failed())) {
      throw new InvalidStateTransitionError(
        `Requested/Processing → Failed 以外の遷移は不可: 現在の状態=${this._status.toString()}`
      );
    }
    this._status = TranscriptionStatus.failed();
    this._failure = failure;
    this._failedAt = now;
  }
}
