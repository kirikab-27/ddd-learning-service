/**
 * 文字起こしリクエストDTO
 */
export interface TranscribeAudioCommand {
  fileName: string;
  originalFileName: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds: number | null;
  engine: string; // "whisper" など
}
