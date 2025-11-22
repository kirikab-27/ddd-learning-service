import { randomUUID } from "crypto";

/**
 * SessionId型定義
 * v1: 単純な文字列型(UUID)
 * v2以降: 値オブジェクト化を検討
 */
export type SessionId = string;

/**
 * SessionIdを生成する
 * @returns UUID v4形式のSessionId
 */
export function generateSessionId(): SessionId {
  return randomUUID();
}
