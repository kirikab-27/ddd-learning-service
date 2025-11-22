import { AudioFileMeta } from "../../src/domain/transcription/AudioFileMeta";
import { InvalidAudioFileError } from "../../src/domain/transcription/TranscriptionErrors";

describe("AudioFileMeta", () => {
  describe("正常系", () => {
    it("有効なメタデータで生成できる", () => {
      const meta = new AudioFileMeta(
        "test.m4a",
        "audio/m4a",
        10 * 1024 * 1024, // 10MB
        600 // 10分
      );
      expect(meta.fileName).toBe("test.m4a");
      expect(meta.sizeBytes).toBe(10 * 1024 * 1024);
    });

    it("durationSeconds が null でも生成できる", () => {
      const meta = new AudioFileMeta("test.mp3", "audio/mp3", 1000, null);
      expect(meta.durationSeconds).toBeNull();
    });

    it("境界値: サイズ 100MB ちょうど", () => {
      const meta = new AudioFileMeta(
        "test.wav",
        "audio/wav",
        100 * 1024 * 1024,
        1800
      );
      expect(meta.sizeBytes).toBe(100 * 1024 * 1024);
    });

    it("境界値: 再生時間 1800秒（30分）ちょうど", () => {
      const meta = new AudioFileMeta("test.m4a", "audio/m4a", 1000, 1800);
      expect(meta.durationSeconds).toBe(1800);
    });

    it(".m4a の標準MIMEタイプ audio/mp4 で生成できる", () => {
      const meta = new AudioFileMeta("test.m4a", "audio/mp4", 1000, 600);
      expect(meta.fileName).toBe("test.m4a");
      expect(meta.mimeType).toBe("audio/mp4");
    });

    it(".m4a の代替MIMEタイプ audio/x-m4a で生成できる", () => {
      const meta = new AudioFileMeta("test.m4a", "audio/x-m4a", 1000, 600);
      expect(meta.mimeType).toBe("audio/x-m4a");
    });

    it(".mp3 の標準MIMEタイプ audio/mpeg で生成できる", () => {
      const meta = new AudioFileMeta("test.mp3", "audio/mpeg", 1000, 600);
      expect(meta.mimeType).toBe("audio/mpeg");
    });

    it(".wav の代替MIMEタイプ audio/wave で生成できる", () => {
      const meta = new AudioFileMeta("test.wav", "audio/wave", 1000, 600);
      expect(meta.mimeType).toBe("audio/wave");
    });
  });

  describe("異常系", () => {
    it("空のファイル名でエラー", () => {
      expect(() => {
        new AudioFileMeta("", "audio/m4a", 1000, 60);
      }).toThrow(InvalidAudioFileError);
    });

    it("ファイル名が256文字でエラー", () => {
      const longName = "a".repeat(256) + ".m4a";
      expect(() => {
        new AudioFileMeta(longName, "audio/m4a", 1000, 60);
      }).toThrow(InvalidAudioFileError);
    });

    it("不正な mimeType でエラー", () => {
      expect(() => {
        new AudioFileMeta("test.aac", "audio/aac", 1000, 60);
      }).toThrow(InvalidAudioFileError);
      expect(() => {
        new AudioFileMeta("test.ogg", "audio/ogg", 1000, 60);
      }).toThrow(InvalidAudioFileError);
    });

    it("サイズ 0 でエラー", () => {
      expect(() => {
        new AudioFileMeta("test.m4a", "audio/m4a", 0, 60);
      }).toThrow(InvalidAudioFileError);
    });

    it("サイズ 100MB 超過でエラー", () => {
      expect(() => {
        new AudioFileMeta("test.m4a", "audio/m4a", 100 * 1024 * 1024 + 1, 60);
      }).toThrow(InvalidAudioFileError);
    });

    it("再生時間 0 でエラー", () => {
      expect(() => {
        new AudioFileMeta("test.m4a", "audio/m4a", 1000, 0);
      }).toThrow(InvalidAudioFileError);
    });

    it("再生時間 1801秒（30分超過）でエラー", () => {
      expect(() => {
        new AudioFileMeta("test.m4a", "audio/m4a", 1000, 1801);
      }).toThrow(InvalidAudioFileError);
    });
  });
});
