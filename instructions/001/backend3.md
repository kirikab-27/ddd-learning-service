# Worker3 Instructions: Ticket 001

## Task: Learning Progress BC + インフラストラクチャ層の実装

### Prerequisites
- Worker1 の共有カーネル完了を待つ

### Goal
Progress 集約とリポジトリインターフェース・実装を作成する。

### Deliverables

```
src/domain/progress/
├── models/
│   ├── Progress.ts
│   ├── Progress.test.ts
│   ├── LessonProgress.ts
│   ├── LessonProgress.test.ts
│   └── index.ts
└── index.ts

src/domain/shared/
├── repositories/
│   ├── ICourseRepository.ts
│   ├── IProgressRepository.ts
│   └── index.ts
└── index.ts (update)

src/infrastructure/
├── repositories/
│   ├── InMemoryCourseRepository.ts
│   ├── InMemoryCourseRepository.test.ts
│   ├── LocalStorageProgressRepository.ts
│   ├── LocalStorageProgressRepository.test.ts
│   └── index.ts
└── index.ts
```

### Implementation: Value Objects

```typescript
// src/domain/progress/models/LessonProgress.ts
import { LessonId } from '@/domain/shared';

export class LessonProgress {
  private constructor(
    private readonly _lessonId: LessonId,
    private readonly _completedAt: Date
  ) {}

  static create(lessonId: LessonId, completedAt: Date = new Date()): LessonProgress {
    return new LessonProgress(lessonId, completedAt);
  }

  get lessonId(): LessonId { return this._lessonId; }
  get completedAt(): Date { return this._completedAt; }

  equals(other: LessonProgress): boolean {
    return this._lessonId.equals(other._lessonId);
  }
}
```

### Implementation: Aggregate Root

```typescript
// src/domain/progress/models/Progress.ts
import { CourseId, LessonId } from '@/domain/shared';
import { LessonProgress } from './LessonProgress';

export class Progress {
  private constructor(
    private readonly _courseId: CourseId,
    private readonly _completedLessons: Map<string, LessonProgress>
  ) {}

  static create(courseId: CourseId): Progress {
    return new Progress(courseId, new Map());
  }

  static restore(
    courseId: CourseId,
    completedLessons: LessonProgress[]
  ): Progress {
    const map = new Map<string, LessonProgress>();
    completedLessons.forEach(lp => {
      map.set(lp.lessonId.toString(), lp);
    });
    return new Progress(courseId, map);
  }

  get courseId(): CourseId { return this._courseId; }

  get completedLessons(): readonly LessonProgress[] {
    return Array.from(this._completedLessons.values());
  }

  get completedCount(): number {
    return this._completedLessons.size;
  }

  hasCompletedLesson(lessonId: LessonId): boolean {
    return this._completedLessons.has(lessonId.toString());
  }

  markLessonAsCompleted(lessonId: LessonId): Progress {
    if (this.hasCompletedLesson(lessonId)) {
      return this;
    }
    const newMap = new Map(this._completedLessons);
    newMap.set(lessonId.toString(), LessonProgress.create(lessonId));
    return new Progress(this._courseId, newMap);
  }

  calculateCompletionRate(totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((this.completedCount / totalLessons) * 100);
  }
}
```

### Implementation: Repository Interfaces

```typescript
// src/domain/shared/repositories/ICourseRepository.ts
import { Course } from '@/domain/content/models/Course';
import { CourseId } from '../CourseId';

export interface ICourseRepository {
  findById(id: CourseId): Promise<Course | null>;
  findAll(): Promise<Course[]>;
}
```

```typescript
// src/domain/shared/repositories/IProgressRepository.ts
import { Progress } from '@/domain/progress/models/Progress';
import { CourseId } from '../CourseId';

export interface IProgressRepository {
  findByCourseId(courseId: CourseId): Promise<Progress | null>;
  save(progress: Progress): Promise<void>;
}
```

### Implementation: Infrastructure

```typescript
// src/infrastructure/repositories/InMemoryCourseRepository.ts
import { ICourseRepository } from '@/domain/shared/repositories/ICourseRepository';
import { Course } from '@/domain/content/models/Course';
import { CourseId } from '@/domain/shared';

export class InMemoryCourseRepository implements ICourseRepository {
  private courses: Map<string, Course> = new Map();

  constructor(initialCourses: Course[] = []) {
    initialCourses.forEach(course => {
      this.courses.set(course.id.toString(), course);
    });
  }

  async findById(id: CourseId): Promise<Course | null> {
    return this.courses.get(id.toString()) ?? null;
  }

  async findAll(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
}
```

```typescript
// src/infrastructure/repositories/LocalStorageProgressRepository.ts
import { IProgressRepository } from '@/domain/shared/repositories/IProgressRepository';
import { Progress } from '@/domain/progress/models/Progress';
import { CourseId, LessonId } from '@/domain/shared';
import { LessonProgress } from '@/domain/progress/models/LessonProgress';

const STORAGE_KEY_PREFIX = 'ddd-learning-progress-';

interface StoredProgress {
  courseId: string;
  completedLessons: Array<{
    lessonId: string;
    completedAt: string;
  }>;
}

export class LocalStorageProgressRepository implements IProgressRepository {
  async findByCourseId(courseId: CourseId): Promise<Progress | null> {
    if (typeof window === 'undefined') {
      return null;
    }

    const key = STORAGE_KEY_PREFIX + courseId.toString();
    const stored = localStorage.getItem(key);

    if (!stored) {
      return null;
    }

    try {
      const data: StoredProgress = JSON.parse(stored);
      const completedLessons = data.completedLessons.map(lp =>
        LessonProgress.create(
          LessonId.create(lp.lessonId),
          new Date(lp.completedAt)
        )
      );
      return Progress.restore(courseId, completedLessons);
    } catch {
      return null;
    }
  }

  async save(progress: Progress): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    const key = STORAGE_KEY_PREFIX + progress.courseId.toString();
    const data: StoredProgress = {
      courseId: progress.courseId.toString(),
      completedLessons: progress.completedLessons.map(lp => ({
        lessonId: lp.lessonId.toString(),
        completedAt: lp.completedAt.toISOString(),
      })),
    };

    localStorage.setItem(key, JSON.stringify(data));
  }
}
```

### Definition of Done

- [ ] 値オブジェクト: LessonProgress
- [ ] 集約ルート: Progress
- [ ] リポジトリIF: ICourseRepository, IProgressRepository
- [ ] 実装: InMemoryCourseRepository, LocalStorageProgressRepository
- [ ] 全テスト作成・パス
- [ ] git commit & push
- [ ] Boss1 に完了報告

### Commands

```bash
# テスト実行
npm run test src/domain/progress/
npm run test src/infrastructure/

# 型チェック
npm run typecheck

# コミット
git add src/domain/progress/ src/domain/shared/repositories/ src/infrastructure/
git commit -m "feat(domain): add progress BC and repository implementations"
git push origin agent/001/backend3
```

### Report Template

```
[DONE] Worker3 Progress BC + インフラ完了

作成ファイル:
- src/domain/progress/models/Progress.ts, LessonProgress.ts
- src/domain/shared/repositories/ICourseRepository.ts, IProgressRepository.ts
- src/infrastructure/repositories/InMemoryCourseRepository.ts
- src/infrastructure/repositories/LocalStorageProgressRepository.ts
- 各テストファイル

テスト結果: 全パス
PR: agent/001/backend3
```
