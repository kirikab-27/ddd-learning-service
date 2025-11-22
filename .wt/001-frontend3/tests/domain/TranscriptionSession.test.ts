import { TranscriptionSession } from "../../src/domain/transcription/TranscriptionSession";
import { AudioFileMeta } from "../../src/domain/transcription/AudioFileMeta";
import { TranscriptionEngine } from "../../src/domain/transcription/TranscriptionEngine";
import { TranscriptionText } from "../../src/domain/transcription/TranscriptionText";
import { TranscriptionFailure } from "../../src/domain/transcription/TranscriptionFailure";
import { InvalidStateTransitionError } from "../../src/domain/transcription/TranscriptionErrors";

describe("TranscriptionSession", () => {
  const audioMeta = new AudioFileMeta("test.m4a", "audio/m4a", 1000, 60);
  const engine = TranscriptionEngine.whisper();
  const now = new Date();

  describe("create", () => {
    it("Requested 状態で生成される", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      expect(session.status.toString()).toBe("Requested");
      expect(session.result).toBeNull();
      expect(session.failure).toBeNull();
      expect(session.createdAt).toBe(now);
    });

    it("SessionId が生成される", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      expect(session.sessionId).toBeTruthy();
      expect(typeof session.sessionId).toBe("string");
    });
  });

  describe("startProcessing", () => {
    it("Requested → Processing に遷移", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      session.startProcessing(now);
      expect(session.status.toString()).toBe("Processing");
    });

    it("Completed → Processing は不可", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      session.startProcessing(now);
      session.complete(new TranscriptionText("result"), now);

      expect(() => {
        session.startProcessing(now);
      }).toThrow(InvalidStateTransitionError);
    });
  });

  describe("complete", () => {
    it("Processing → Completed に遷移", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      session.startProcessing(now);
      const result = new TranscriptionText("文字起こし結果");
      session.complete(result, now);

      expect(session.status.toString()).toBe("Completed");
      expect(session.result?.toString()).toBe("文字起こし結果");
      expect(session.completedAt).toBe(now);
    });

    it("Requested → Completed は不可", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      const result = new TranscriptionText("result");

      expect(() => {
        session.complete(result, now);
      }).toThrow(InvalidStateTransitionError);
    });
  });

  describe("fail", () => {
    it("Processing → Failed に遷移", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      session.startProcessing(now);
      const failure = TranscriptionFailure.apiTimeout();
      session.fail(failure, now);

      expect(session.status.toString()).toBe("Failed");
      expect(session.failure?.reason).toContain("タイムアウト");
      expect(session.failedAt).toBe(now);
    });

    it("Requested → Failed に遷移", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      const failure = TranscriptionFailure.authFailed();
      session.fail(failure, now);

      expect(session.status.toString()).toBe("Failed");
    });

    it("Completed → Failed は不可", () => {
      const session = TranscriptionSession.create(audioMeta, engine, now);
      session.startProcessing(now);
      session.complete(new TranscriptionText("result"), now);

      expect(() => {
        session.fail(TranscriptionFailure.general("error"), now);
      }).toThrow(InvalidStateTransitionError);
    });
  });
});
