import { TranscribeAudioUseCase } from "@/application/usecases/TranscribeAudioUseCase";
import { TranscriptionSessionRepository } from "@/application/repository/TranscriptionSessionRepository";
import { SpeechToTextService } from "@/domain/transcription/SpeechToTextService";
import { TranscriptionSession } from "@/domain/transcription/TranscriptionSession";

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

// モック SpeechToTextService
class MockSpeechToTextService implements SpeechToTextService {
  async transcribe(audio: Uint8Array, language: "ja"): Promise<string> {
    return "文字起こし結果テキスト";
  }
}

describe("TranscribeAudioUseCase", () => {
  let useCase: TranscribeAudioUseCase;
  let repository: MockRepository;
  let service: MockSpeechToTextService;

  beforeEach(() => {
    repository = new MockRepository();
    service = new MockSpeechToTextService();
    useCase = new TranscribeAudioUseCase(repository, service);
  });

  it("正常系: 文字起こしが成功する", async () => {
    const command = {
      fileName: "test.m4a",
      mimeType: "audio/m4a",
      sizeBytes: 1000,
      durationSeconds: 60,
      engine: "whisper",
    };
    const audioData = new Uint8Array([1, 2, 3]);

    const result = await useCase.execute(command, audioData);

    expect(result.status).toBe("Completed");
    expect(result.result).toBe("文字起こし結果テキスト");
    expect(result.sessionId).toBeTruthy();
  });

  it("異常系: SpeechToTextService がエラーをスローする", async () => {
    // エラーをスローするモックサービス
    const errorService: SpeechToTextService = {
      async transcribe() {
        throw new Error("API Error");
      }
    };
    useCase = new TranscribeAudioUseCase(repository, errorService);

    const command = {
      fileName: "test.m4a",
      mimeType: "audio/m4a",
      sizeBytes: 1000,
      durationSeconds: 60,
      engine: "whisper",
    };
    const audioData = new Uint8Array([1, 2, 3]);

    const result = await useCase.execute(command, audioData);

    expect(result.status).toBe("Failed");
    expect(result.failure?.reason).toContain("API Error");
  });
});
