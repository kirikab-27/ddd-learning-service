// 一時的なダミー（Worker5完了後に削除）
class InvalidStateTransitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidStateTransitionError";
  }
}

type StatusType = "Requested" | "Processing" | "Completed" | "Failed";

/**
 * TranscriptionSessionの状態を表す値オブジェクト
 */
export class TranscriptionStatus {
  private constructor(public readonly value: StatusType) {}

  static requested(): TranscriptionStatus {
    return new TranscriptionStatus("Requested");
  }

  static processing(): TranscriptionStatus {
    return new TranscriptionStatus("Processing");
  }

  static completed(): TranscriptionStatus {
    return new TranscriptionStatus("Completed");
  }

  static failed(): TranscriptionStatus {
    return new TranscriptionStatus("Failed");
  }

  /**
   * 指定された状態への遷移が可能かチェック
   * @param to 遷移先の状態
   * @returns 遷移可能ならtrue
   */
  canTransitionTo(to: TranscriptionStatus): boolean {
    const transitions: Record<StatusType, StatusType[]> = {
      Requested: ["Processing", "Failed"],
      Processing: ["Completed", "Failed"],
      Completed: [], // 終端状態
      Failed: [],    // 終端状態
    };

    return transitions[this.value].includes(to.value);
  }

  equals(other: TranscriptionStatus): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
