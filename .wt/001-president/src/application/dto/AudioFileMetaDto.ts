import { AudioFileMeta } from "@/domain/transcription/AudioFileMeta";

/**
 * 音声ファイルメタ情報DTO
 */
export interface AudioFileMetaDto {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds: number | null;
}

/**
 * AudioFileMeta → DTO 変換
 */
export function toAudioFileMetaDto(domain: AudioFileMeta): AudioFileMetaDto {
  return {
    fileName: domain.fileName,
    mimeType: domain.mimeType,
    sizeBytes: domain.sizeBytes,
    durationSeconds: domain.durationSeconds,
  };
}

/**
 * DTO → AudioFileMeta 変換
 */
export function fromAudioFileMetaDto(dto: AudioFileMetaDto): AudioFileMeta {
  return new AudioFileMeta(
    dto.fileName,
    dto.mimeType,
    dto.sizeBytes,
    dto.durationSeconds
  );
}
