# Worker1 Instructions: Ticket 001

## Task: 共有カーネル（Shared Kernel）の実装

### Goal
全BCで共有する識別子の値オブジェクトを作成する。

### Deliverables

```
src/domain/shared/
├── CourseId.ts
├── CourseId.test.ts
├── ChapterId.ts
├── ChapterId.test.ts
├── LessonId.ts
├── LessonId.test.ts
├── QuizId.ts
├── QuizId.test.ts
└── index.ts          # re-export
```

### Implementation Pattern

すべての識別子は以下のパターンに従う:

```typescript
// src/domain/shared/CourseId.ts
export class CourseId {
  private constructor(private readonly value: string) {}

  static create(value: string): CourseId {
    if (!value || value.trim() === '') {
      throw new Error('CourseId cannot be empty');
    }
    return new CourseId(value.trim());
  }

  equals(other: CourseId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
```

### Test Pattern

```typescript
// src/domain/shared/CourseId.test.ts
import { describe, it, expect } from 'vitest';
import { CourseId } from './CourseId';

describe('CourseId', () => {
  describe('create', () => {
    it('should create with valid value', () => {
      const id = CourseId.create('course-1');
      expect(id.toString()).toBe('course-1');
    });

    it('should trim whitespace', () => {
      const id = CourseId.create('  course-1  ');
      expect(id.toString()).toBe('course-1');
    });

    it('should throw for empty string', () => {
      expect(() => CourseId.create('')).toThrow('cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => CourseId.create('   ')).toThrow('cannot be empty');
    });
  });

  describe('equals', () => {
    it('should be equal with same value', () => {
      const a = CourseId.create('course-1');
      const b = CourseId.create('course-1');
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal with different value', () => {
      const a = CourseId.create('course-1');
      const b = CourseId.create('course-2');
      expect(a.equals(b)).toBe(false);
    });
  });
});
```

### index.ts

```typescript
// src/domain/shared/index.ts
export { CourseId } from './CourseId';
export { ChapterId } from './ChapterId';
export { LessonId } from './LessonId';
export { QuizId } from './QuizId';
```

### Definition of Done

- [ ] 4つの識別子クラスを作成（CourseId, ChapterId, LessonId, QuizId）
- [ ] 各クラスにユニットテストを作成
- [ ] `npm run test` が全てパス
- [ ] `npm run typecheck` がエラーなし
- [ ] git commit & push
- [ ] Boss1 に完了報告

### Commands

```bash
# テスト実行
npm run test src/domain/shared/

# 型チェック
npm run typecheck

# コミット
git add src/domain/shared/
git commit -m "feat(domain): add shared kernel identifiers"
git push origin agent/001/backend1
```

### Communication

Boss1 への報告は `agent-send.sh` を使用:

```bash
# 完了報告
./scripts/agent-send.sh boss1 "[DONE] Backend1 共有カーネル完了。PR: agent/001/backend1"

# 問題発生時
./scripts/agent-send.sh boss1 "[BLOCKED] Backend1: 〇〇の問題が発生。支援が必要です。"
```

### Report Template

完了時に以下の形式で Boss1 へ送信:

```
[DONE] Backend1 共有カーネル完了

作成ファイル:
- src/domain/shared/CourseId.ts
- src/domain/shared/ChapterId.ts
- src/domain/shared/LessonId.ts
- src/domain/shared/QuizId.ts
- 各テストファイル

テスト結果: 全パス
PR: agent/001/backend1
```
