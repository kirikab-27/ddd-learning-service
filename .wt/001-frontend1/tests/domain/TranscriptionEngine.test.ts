import { TranscriptionEngine } from "../../src/domain/transcription/TranscriptionEngine";
import { InvalidTranscriptionEngineError } from "../../src/domain/transcription/TranscriptionErrors";

describe("TranscriptionEngine", () => {
  describe("fromString", () => {
    it("whisper を生成できる", () => {
      const engine = TranscriptionEngine.fromString("whisper");
      expect(engine.value).toBe("whisper");
    });

    it("サポート外のエンジンでエラー", () => {
      expect(() => {
        TranscriptionEngine.fromString("unknown");
      }).toThrow(InvalidTranscriptionEngineError);
    });

    it("google でエラー（v1 未サポート）", () => {
      expect(() => {
        TranscriptionEngine.fromString("google");
      }).toThrow(InvalidTranscriptionEngineError);
    });
  });

  describe("whisper", () => {
    it("ファクトリメソッドで生成できる", () => {
      const engine = TranscriptionEngine.whisper();
      expect(engine.value).toBe("whisper");
    });
  });

  describe("toString", () => {
    it("文字列表現を返す", () => {
      const engine = TranscriptionEngine.whisper();
      expect(engine.toString()).toBe("whisper");
    });
  });
});
