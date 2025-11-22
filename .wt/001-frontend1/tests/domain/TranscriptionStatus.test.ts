import { TranscriptionStatus } from "../../src/domain/transcription/TranscriptionStatus";

describe("TranscriptionStatus", () => {
  describe("canTransitionTo", () => {
    it("Requested → Processing は可能", () => {
      const status = TranscriptionStatus.requested();
      expect(status.canTransitionTo(TranscriptionStatus.processing())).toBe(true);
    });

    it("Requested → Failed は可能", () => {
      const status = TranscriptionStatus.requested();
      expect(status.canTransitionTo(TranscriptionStatus.failed())).toBe(true);
    });

    it("Requested → Completed は不可", () => {
      const status = TranscriptionStatus.requested();
      expect(status.canTransitionTo(TranscriptionStatus.completed())).toBe(false);
    });

    it("Processing → Completed は可能", () => {
      const status = TranscriptionStatus.processing();
      expect(status.canTransitionTo(TranscriptionStatus.completed())).toBe(true);
    });

    it("Processing → Failed は可能", () => {
      const status = TranscriptionStatus.processing();
      expect(status.canTransitionTo(TranscriptionStatus.failed())).toBe(true);
    });

    it("Completed → Processing は不可（終端状態）", () => {
      const status = TranscriptionStatus.completed();
      expect(status.canTransitionTo(TranscriptionStatus.processing())).toBe(false);
    });

    it("Failed → Processing は不可（終端状態）", () => {
      const status = TranscriptionStatus.failed();
      expect(status.canTransitionTo(TranscriptionStatus.processing())).toBe(false);
    });
  });

  describe("equals", () => {
    it("同じ状態で true", () => {
      const s1 = TranscriptionStatus.requested();
      const s2 = TranscriptionStatus.requested();
      expect(s1.equals(s2)).toBe(true);
    });

    it("異なる状態で false", () => {
      const s1 = TranscriptionStatus.requested();
      const s2 = TranscriptionStatus.processing();
      expect(s1.equals(s2)).toBe(false);
    });
  });
});
