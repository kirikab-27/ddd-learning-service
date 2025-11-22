/**
 * 文字起こしリクエストDTO
 */
export interface TranscribeAudioCommand {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds: number | null;
  engine: string; // "whisper" など
}
