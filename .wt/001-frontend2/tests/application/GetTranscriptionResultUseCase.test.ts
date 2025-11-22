import { GetTranscriptionResultUseCase, SessionNotFoundError } from "@/application/usecases/GetTranscriptionResultUseCase";
import { TranscriptionSessionRepository } from "@/application/repository/TranscriptionSessionRepository";
import { TranscriptionSession } from "@/domain/transcription/TranscriptionSession";
import { AudioFileMeta } from "@/domain/transcription/AudioFileMeta";
import { TranscriptionEngine } from "@/domain/transcription/TranscriptionEngine";

// モックリポジトリ
class MockRepository implements TranscriptionSessionRepository {
  private sessions: TranscriptionSession[] = [];

  async save(session: TranscriptionSession): Promise<void> {
    this.sessions.push(session);
  }

  async findById(sessionId: string): Promise<TranscriptionSession | null> {
    return this.sessions.find(s => s.sessionId === sessionId) ?? null;
  }

  async findAll(): Promise<TranscriptionSession[]> {
    return this.sessions;
  }

  async update(session: TranscriptionSession): Promise<void> {
    const index = this.sessions.findIndex(s => s.sessionId === session.sessionId);
    if (index >= 0) {
      this.sessions[index] = session;
    }
  }
}

describe("GetTranscriptionResultUseCase", () => {
  let useCase: GetTranscriptionResultUseCase;
  let repository: MockRepository;

  beforeEach(() => {
    repository = new MockRepository();
    useCase = new GetTranscriptionResultUseCase(repository);
  });

  it("正常系: セッションが存在する場合、結果を取得できる", async () => {
    const audioMeta = new AudioFileMeta("test.m4a", "audio/m4a", 1000, 60);
    const engine = TranscriptionEngine.whisper();
    const session = TranscriptionSession.create(audioMeta, engine, new Date());
    await repository.save(session);

    const result = await useCase.execute(session.sessionId);

    expect(result.sessionId).toBe(session.sessionId);
    expect(result.status).toBe("Requested");
  });

  it("異常系: セッションが存在しない場合、SessionNotFoundError をスロー", async () => {
    await expect(
      useCase.execute("non-existent-id")
    ).rejects.toThrow(SessionNotFoundError);
  });
});
