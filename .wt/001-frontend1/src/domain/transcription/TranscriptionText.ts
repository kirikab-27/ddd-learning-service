/**
 * 文字起こし結果テキストを表す値オブジェクト
 * v1: 単純な文字列ラッパー
 * v2以降: 生テキスト、整形済み、要約などの複数表現を内包する可能性
 */
export class TranscriptionText {
  constructor(public readonly value: string) {}

  toString(): string {
    return this.value;
  }
}
