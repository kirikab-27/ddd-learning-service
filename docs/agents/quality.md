# Quality Worker Guide (Worker 7)

## 1. Your Mission

コードの品質保証、テスト作成、コードレビューを担当します。
**DDDの原則が正しく適用されているか、型安全性が保たれているか**を厳密にチェックしてください。

## 2. Scope of Work

```
品質管理対象:
├── src/domain/         # 最重要: ドメイン層の純粋性
├── src/application/    # 重要: ユースケースの正確性
├── src/infrastructure/ # 実装の正確性
├── src/presentation/   # UIの型安全性
└── tests/              # テストカバレッジ
```

## 3. Quality Gates

### Gate 1: ドメイン層の純粋性 (CRITICAL)

```typescript
// ✅ PASS: 純粋なTypeScriptのみ
import { CourseId } from '../shared/CourseId';

// ❌ REJECT: 外部依存
import { useEffect } from 'react';       // Reactは禁止
import { prisma } from '@/lib/prisma';   // ORMは禁止
import { NextResponse } from 'next/server'; // Next.jsは禁止
```

**チェックコマンド:**
```bash
# ドメイン層の外部依存を検出
grep -r "from 'react'" src/domain/
grep -r "from 'next" src/domain/
grep -r "@prisma" src/domain/
```

### Gate 2: 型安全性

```typescript
// ✅ PASS: 明示的な型定義
function calculateProgress(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}

// ❌ REJECT: any の使用
function calculateProgress(completed: any, total: any): any {
  return (completed / total) * 100;
}
```

**チェックコマンド:**
```bash
# any の使用を検出
grep -rn ": any" src/
grep -rn "as any" src/

# TypeScript コンパイルチェック
npx tsc --noEmit
```

### Gate 3: 値オブジェクトの不変性

```typescript
// ✅ PASS: private readonly
class Score {
  private readonly _correct: number;
  private readonly _total: number;
}

// ❌ REJECT: public または mutable
class Score {
  public correct: number;  // public禁止
  private total: number;   // readonly必須
}
```

### Gate 4: エンティティの同一性

```typescript
// ✅ PASS: IDで同一性を判断
class Lesson {
  equals(other: Lesson): boolean {
    return this._id.equals(other._id);
  }
}

// ❌ REJECT: 属性で比較
class Lesson {
  equals(other: Lesson): boolean {
    return this._title === other._title;  // NG
  }
}
```

### Gate 5: 集約境界の尊重

```typescript
// ✅ PASS: IDで参照
class Progress {
  private readonly _courseId: CourseId;
}

// ❌ REJECT: 別集約を直接保持
class Progress {
  private readonly _course: Course;  // 別集約への直接参照
}
```

## 4. Test Requirements

### ドメイン層テスト (必須)

```typescript
// src/domain/progress/models/Score.test.ts
import { describe, it, expect } from 'vitest';
import { Score } from './Score';

describe('Score', () => {
  describe('create', () => {
    it('should create with valid values', () => {
      const score = Score.create(8, 10);
      expect(score.correct).toBe(8);
      expect(score.total).toBe(10);
    });

    it('should throw for negative correct', () => {
      expect(() => Score.create(-1, 10)).toThrow('cannot be negative');
    });

    it('should throw when correct > total', () => {
      expect(() => Score.create(11, 10)).toThrow('cannot exceed');
    });
  });

  describe('percentage', () => {
    it('should calculate percentage correctly', () => {
      expect(Score.create(7, 10).percentage).toBe(70);
      expect(Score.create(1, 3).percentage).toBe(33);
    });
  });

  describe('isPassing', () => {
    it('should pass at 70% threshold', () => {
      expect(Score.create(7, 10).isPassing()).toBe(true);
      expect(Score.create(6, 10).isPassing()).toBe(false);
    });

    it('should accept custom threshold', () => {
      expect(Score.create(8, 10).isPassing(80)).toBe(true);
      expect(Score.create(7, 10).isPassing(80)).toBe(false);
    });
  });

  describe('equals', () => {
    it('should be equal with same values', () => {
      const a = Score.create(8, 10);
      const b = Score.create(8, 10);
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal with different values', () => {
      const a = Score.create(8, 10);
      const b = Score.create(7, 10);
      expect(a.equals(b)).toBe(false);
    });
  });
});
```

### 仕様パターンテスト (必須)

```typescript
// src/domain/content/specifications/LessonUnlockSpecification.test.ts
describe('LessonUnlockSpecification', () => {
  const spec = new LessonUnlockSpecification();

  it('should unlock first lesson always', () => {
    const { course, progress } = createTestFixture();
    const firstLesson = course.chapters[0].lessons[0];

    expect(spec.isSatisfiedBy(firstLesson, course, progress)).toBe(true);
  });

  it('should lock second lesson when first is incomplete', () => {
    const { course, progress } = createTestFixture();
    const secondLesson = course.chapters[0].lessons[1];

    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(false);
  });

  it('should unlock second lesson when first is complete', () => {
    const { course, progress } = createTestFixture();
    const firstLesson = course.chapters[0].lessons[0];
    const secondLesson = course.chapters[0].lessons[1];

    progress.markLessonAsCompleted(firstLesson.id);

    expect(spec.isSatisfiedBy(secondLesson, course, progress)).toBe(true);
  });
});
```

### ユースケーステスト (重要)

```typescript
// src/application/usecases/CompleteLessonUseCase.test.ts
describe('CompleteLessonUseCase', () => {
  it('should mark lesson as completed', async () => {
    const courseRepo = new MockCourseRepository();
    const progressRepo = new MockProgressRepository();
    const useCase = new CompleteLessonUseCase(courseRepo, progressRepo);

    await useCase.execute({
      courseId: 'course-1',
      lessonId: 'lesson-1',
    });

    const progress = await progressRepo.findByCourseId(
      CourseId.create('course-1')
    );
    expect(progress?.hasCompletedLesson(LessonId.create('lesson-1'))).toBe(true);
  });

  it('should throw when course not found', async () => {
    const courseRepo = new MockCourseRepository(); // 空
    const progressRepo = new MockProgressRepository();
    const useCase = new CompleteLessonUseCase(courseRepo, progressRepo);

    await expect(
      useCase.execute({ courseId: 'invalid', lessonId: 'lesson-1' })
    ).rejects.toThrow('Course not found');
  });
});
```

## 5. Code Review Checklist

PRレビュー時に確認すべき項目:

### Architecture
- [ ] ドメイン層に外部依存がない
- [ ] 依存の方向が正しい（外側 → 内側）
- [ ] 集約境界が守られている

### Domain Layer
- [ ] 値オブジェクトは不変（readonly）
- [ ] エンティティはIDで同一性判断
- [ ] ビジネスルールがモデル内に閉じている
- [ ] 仕様パターンが適切に使われている

### Type Safety
- [ ] `any` が使用されていない
- [ ] 適切な型定義がある
- [ ] null/undefined の扱いが明確

### Testing
- [ ] ドメインロジックにテストがある
- [ ] エッジケースがカバーされている
- [ ] テストが独立している（順序依存なし）

### Naming
- [ ] ユビキタス言語に従っている
- [ ] ファイル名が規約に従っている
- [ ] 関数名が処理内容を表している

## 6. Review Comment Templates

### 問題指摘

```markdown
## 🚫 Domain Purity Violation

**Location:** `src/domain/content/models/Course.ts:15`

**Issue:** ドメイン層でReactをインポートしています。

**Fix:**
```typescript
// ❌ Before
import { useCallback } from 'react';

// ✅ After
// React関連のインポートを削除
```

**Reference:** docs/DOMAIN_VISION.md §5 Quality Standards
```

### 改善提案

```markdown
## 💡 Suggestion

**Location:** `src/domain/progress/models/Score.ts`

**Current:** バリデーションメッセージが汎用的です。

**Suggestion:** より具体的なエラーメッセージにすると、デバッグが容易になります。

```typescript
// ✅ Recommended
throw new Error(`Correct answers (${correct}) cannot exceed total (${total})`);
```
```

## 7. Test Coverage Targets

| Layer | Coverage Target |
|-------|-----------------|
| Domain (models) | 100% |
| Domain (specifications) | 100% |
| Application (usecases) | 80% |
| Infrastructure | 60% |
| Presentation | 40% |

**コマンド:**
```bash
# カバレッジレポート生成
npx vitest run --coverage

# ドメイン層のみ
npx vitest run src/domain --coverage
```

## 8. Automated Checks

CI/CDで自動実行すべきチェック:

```yaml
# .github/workflows/quality.yml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - name: Type Check
        run: npx tsc --noEmit

      - name: Lint
        run: npx eslint src/

      - name: Test
        run: npx vitest run

      - name: Domain Purity Check
        run: |
          if grep -r "from 'react'" src/domain/; then
            echo "React import found in domain layer!"
            exit 1
          fi
```

## 9. Reference Documents

- `docs/DOMAIN_VISION.md` - 品質基準の根拠
- `docs/IMPLEMENTATION_GUIDE.md` - 実装パターンの詳細
- `docs/AGENT_PROTOCOL.md` - PRフローとエスカレーション
