import { ListTranscriptionSessionsUseCase } from "@/application/usecases/ListTranscriptionSessionsUseCase";
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

describe("ListTranscriptionSessionsUseCase", () => {
  let useCase: ListTranscriptionSessionsUseCase;
  let repository: MockRepository;

  beforeEach(() => {
    repository = new MockRepository();
    useCase = new ListTranscriptionSessionsUseCase(repository);
  });

  it("正常系: 全セッションを取得できる", async () => {
    const audioMeta = new AudioFileMeta("test.m4a", "audio/m4a", 1000, 60);
    const engine = TranscriptionEngine.whisper();

    const session1 = TranscriptionSession.create(audioMeta, engine, new Date("2025-01-01"));
    const session2 = TranscriptionSession.create(audioMeta, engine, new Date("2025-01-02"));
    await repository.save(session1);
    await repository.save(session2);

    const results = await useCase.execute();

    expect(results).toHaveLength(2);
  });

  it("正常系: 作成日時降順でソートされる", async () => {
    const audioMeta = new AudioFileMeta("test.m4a", "audio/m4a", 1000, 60);
    const engine = TranscriptionEngine.whisper();

    const session1 = TranscriptionSession.create(audioMeta, engine, new Date("2025-01-01"));
    const session2 = TranscriptionSession.create(audioMeta, engine, new Date("2025-01-02"));
    await repository.save(session1);
    await repository.save(session2);

    const results = await useCase.execute();

    expect(new Date(results[0].createdAt).getTime()).toBeGreaterThan(
      new Date(results[1].createdAt).getTime()
    );
  });

  it("正常系: セッションが0件の場合、空配列を返す", async () => {
    const results = await useCase.execute();

    expect(results).toEqual([]);
  });
});
