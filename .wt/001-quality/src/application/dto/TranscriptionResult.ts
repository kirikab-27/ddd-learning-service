import { AudioFileMetaDto, toAudioFileMetaDto } from "./AudioFileMetaDto";
import { TranscriptionSession } from "@/domain/transcription/TranscriptionSession";

export type TranscriptionStatusDto = "Requested" | "Processing" | "Completed" | "Failed";

export interface TranscriptionFailureDto {
  reason: string;
  errorCode: string | null;
  retryable: boolean;
}

/**
 * 文字起こし結果DTO
 */
export interface TranscriptionResult {
  sessionId: string;
  status: TranscriptionStatusDto;
  audioFileMeta: AudioFileMetaDto;
  engine: string;
  result: string | null;
  failure: TranscriptionFailureDto | null;
  createdAt: string; // ISO 8601
  completedAt: string | null; // ISO 8601
  failedAt: string | null; // ISO 8601
}

/**
 * TranscriptionSession → TranscriptionResult 変換
 */
export function toTranscriptionResult(session: TranscriptionSession): TranscriptionResult {
  return {
    sessionId: session.sessionId,
    status: session.status.toString() as TranscriptionStatusDto,
    audioFileMeta: toAudioFileMetaDto(session.audioFileMeta),
    engine: session.engine.toString(),
    result: session.result?.toString() ?? null,
    failure: session.failure ? {
      reason: session.failure.reason,
      errorCode: session.failure.errorCode,
      retryable: session.failure.retryable,
    } : null,
    createdAt: session.createdAt.toISOString(),
    completedAt: session.completedAt?.toISOString() ?? null,
    failedAt: session.failedAt?.toISOString() ?? null,
  };
}
