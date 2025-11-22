# Worker7 Instructions: Ticket 001

## Task: 品質レビュー・統合テスト

### Prerequisites
- 全 Worker (1-6) の完了を待つ

### Goal
全実装の品質レビューを行い、統合テストを作成・実行する。

### Review Scope

```
レビュー対象:
├── src/domain/shared/           # Worker1
├── src/domain/content/          # Worker2
├── src/domain/progress/         # Worker3
├── src/infrastructure/          # Worker3
├── src/presentation/layouts/    # Worker4
├── src/presentation/components/ # Worker4
├── src/presentation/features/   # Worker5, Worker6
├── src/application/             # Worker5, Worker6
└── app/                         # Worker4, Worker5
```

### Quality Gates Checklist

#### Gate 1: ドメイン層の純粋性 (CRITICAL)

```bash
# 実行コマンド
grep -r "from 'react'" src/domain/
grep -r "from 'next" src/domain/
grep -r "@prisma" src/domain/
grep -r "localStorage" src/domain/

# 期待: 何もヒットしない
```

**確認項目:**
- [ ] ドメイン層に React のインポートがない
- [ ] ドメイン層に Next.js のインポートがない
- [ ] ドメイン層に外部ライブラリの直接参照がない

#### Gate 2: 型安全性

```bash
# TypeScript コンパイルチェック
npm run typecheck

# any の使用を検出
grep -rn ": any" src/
grep -rn "as any" src/

# 期待: エラーなし、any は 0 件
```

**確認項目:**
- [ ] TypeScript コンパイルエラーがない
- [ ] `any` 型が使用されていない
- [ ] 適切な型定義がある

#### Gate 3: 値オブジェクトの不変性

**確認項目:**
- [ ] 全ての値オブジェクトが `private readonly` を使用
- [ ] ファクトリメソッド (`create`) でのみインスタンス化
- [ ] バリデーションがファクトリメソッド内で実行される

```typescript
// ✅ 正しいパターン
class LessonTitle {
  private constructor(private readonly value: string) {}
  static create(value: string): LessonTitle { ... }
}

// ❌ 拒否すべきパターン
class LessonTitle {
  public value: string;
  constructor(value: string) { this.value = value; }
}
```

#### Gate 4: エンティティの同一性

**確認項目:**
- [ ] エンティティの `equals()` メソッドが ID のみで比較
- [ ] 属性での比較をしていない

#### Gate 5: 集約境界

**確認項目:**
- [ ] Progress が Course を直接参照していない（CourseId のみ）
- [ ] 異なる集約間は ID による参照のみ

### Test Coverage Check

```bash
# テスト実行（全体）
npm run test

# カバレッジ確認
npm run test -- --coverage

# ドメイン層のみ
npm run test src/domain/ -- --coverage
```

**カバレッジ目標:**
| Layer | Target |
|-------|--------|
| Domain (models) | 100% |
| Domain (specifications) | 100% |
| Application (usecases) | 80% |

### Integration Test

```typescript
// src/__tests__/integration/lessonFlow.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { GetLessonUseCase } from '@/application/usecases/GetLessonUseCase';
import { GetCourseNavigationUseCase } from '@/application/usecases/GetCourseNavigationUseCase';
import { InMemoryCourseRepository } from '@/infrastructure/repositories/InMemoryCourseRepository';
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { createSampleCourse } from '@/infrastructure/data/sampleCourses';

describe('Lesson Flow Integration', () => {
  let courseRepo: InMemoryCourseRepository;
  let progressRepo: LocalStorageProgressRepository;

  beforeEach(() => {
    courseRepo = new InMemoryCourseRepository([createSampleCourse()]);
    progressRepo = new LocalStorageProgressRepository();
    localStorage.clear();
  });

  it('should load first lesson successfully', async () => {
    const useCase = new GetLessonUseCase(courseRepo, progressRepo);

    const result = await useCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-1',
    });

    expect(result.lesson.title).toBeTruthy();
    expect(result.isUnlocked).toBe(true);
  });

  it('should lock second lesson when first is not completed', async () => {
    const useCase = new GetLessonUseCase(courseRepo, progressRepo);

    const result = await useCase.execute({
      courseId: 'ddd-practice',
      chapterId: 'chapter-1',
      lessonId: 'lesson-2',
    });

    expect(result.isUnlocked).toBe(false);
  });

  it('should show correct navigation with progress', async () => {
    const navUseCase = new GetCourseNavigationUseCase(courseRepo, progressRepo);

    const result = await navUseCase.execute({
      courseId: 'ddd-practice',
      currentLessonId: 'lesson-1',
    });

    expect(result.chapters.length).toBeGreaterThan(0);
    expect(result.completionRate).toBe(0);

    const firstLesson = result.chapters[0].lessons[0];
    expect(firstLesson.isUnlocked).toBe(true);
    expect(firstLesson.isCurrent).toBe(true);
  });
});
```

### Review Report Template

レビュー結果は以下の形式で Boss1 に報告:

```markdown
# Quality Review Report - Ticket 001

## Summary
- Review Date: YYYY-MM-DD
- Reviewer: Worker7
- Status: ✅ PASS / ❌ FAIL

## Quality Gates

| Gate | Status | Notes |
|------|--------|-------|
| Domain Purity | ✅/❌ | |
| Type Safety | ✅/❌ | |
| Value Object Immutability | ✅/❌ | |
| Entity Identity | ✅/❌ | |
| Aggregate Boundaries | ✅/❌ | |

## Test Results

```
Test Suites: X passed, X total
Tests: X passed, X total
Coverage:
  - Domain: X%
  - Application: X%
  - Infrastructure: X%
```

## Issues Found

### Critical (Must Fix)
- [ ] Issue 1: Description
  - Location: `file:line`
  - Fix: Suggested fix

### Warnings (Should Fix)
- [ ] Issue 2: Description

### Suggestions (Nice to Have)
- Issue 3: Description

## Integration Test Results
- [ ] Lesson loading: PASS/FAIL
- [ ] Lesson unlock: PASS/FAIL
- [ ] Navigation: PASS/FAIL

## Approval
- [ ] Ready for merge
- [ ] Requires fixes (see Issues above)
```

### Definition of Done

- [ ] Gate 1: ドメイン層の純粋性チェック完了
- [ ] Gate 2: 型安全性チェック完了
- [ ] Gate 3: 値オブジェクトの不変性確認
- [ ] Gate 4: エンティティの同一性確認
- [ ] Gate 5: 集約境界の確認
- [ ] 統合テスト作成・実行
- [ ] テストカバレッジ目標達成
- [ ] レビューレポート作成
- [ ] Boss1 に結果報告

### Commands

```bash
# 全テスト実行
npm run test

# カバレッジ付きテスト
npm run test -- --coverage

# TypeScript チェック
npm run typecheck

# Lint チェック
npm run lint

# ドメイン純粋性チェック
grep -r "from 'react'" src/domain/ && echo "FAIL: React found" || echo "PASS"
grep -r "from 'next" src/domain/ && echo "FAIL: Next.js found" || echo "PASS"

# any チェック
grep -rn ": any\|as any" src/ && echo "WARNING: any found" || echo "PASS"
```

### Report Template

```
[DONE] Worker7 品質レビュー完了

レビュー結果: PASS / FAIL

Quality Gates:
- Domain Purity: ✅
- Type Safety: ✅
- Immutability: ✅
- Entity Identity: ✅
- Aggregate Boundaries: ✅

Test Results:
- Unit Tests: 全パス
- Integration Tests: 全パス
- Coverage: Domain 100%, Application 80%+

Issues: なし / X件（詳細はレポート参照）

統合テストファイル: src/__tests__/integration/lessonFlow.test.ts

PR: agent/001/quality7
```

### Escalation

以下の場合は Boss1 に即座にエスカレーション:

1. **Critical Issue**: ドメイン層の純粋性違反
2. **Critical Issue**: セキュリティ脆弱性の発見
3. **Blocker**: テストが通らない原因が他 Worker の実装にある場合
