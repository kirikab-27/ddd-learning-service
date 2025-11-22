# Worker2 Instructions: Ticket 001

## Task: Learning Content BC の実装

### Prerequisites
- Worker1 の共有カーネル完了を待つ

### Goal
Course, Chapter, Lesson のドメインモデルと仕様パターンを作成する。

### Deliverables

```
src/domain/content/
├── models/
│   ├── Course.ts
│   ├── Course.test.ts
│   ├── Chapter.ts
│   ├── Chapter.test.ts
│   ├── Lesson.ts
│   ├── Lesson.test.ts
│   ├── MarkdownContent.ts      # 値オブジェクト
│   ├── LessonTitle.ts          # 値オブジェクト
│   └── index.ts
├── services/
│   ├── LessonNavigationService.ts
│   └── LessonNavigationService.test.ts
├── specifications/
│   ├── LessonUnlockSpecification.ts
│   ├── LessonUnlockSpecification.test.ts
│   ├── ChapterCompletionSpecification.ts
│   └── ChapterCompletionSpecification.test.ts
└── index.ts
```

### Implementation: Value Objects

```typescript
// src/domain/content/models/LessonTitle.ts
export class LessonTitle {
  private static readonly MAX_LENGTH = 100;

  private constructor(private readonly value: string) {}

  static create(value: string): LessonTitle {
    const trimmed = value?.trim() ?? '';
    if (trimmed === '') {
      throw new Error('LessonTitle cannot be empty');
    }
    if (trimmed.length > LessonTitle.MAX_LENGTH) {
      throw new Error(`LessonTitle cannot exceed ${LessonTitle.MAX_LENGTH} characters`);
    }
    return new LessonTitle(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: LessonTitle): boolean {
    return this.value === other.value;
  }
}
```

```typescript
// src/domain/content/models/MarkdownContent.ts
export class MarkdownContent {
  private constructor(private readonly value: string) {}

  static create(value: string): MarkdownContent {
    return new MarkdownContent(value || '');
  }

  get raw(): string {
    return this.value;
  }

  isEmpty(): boolean {
    return this.value.trim() === '';
  }

  equals(other: MarkdownContent): boolean {
    return this.value === other.value;
  }
}
```

### Implementation: Entities

```typescript
// src/domain/content/models/Lesson.ts
import { LessonId, QuizId } from '@/domain/shared';
import { LessonTitle } from './LessonTitle';
import { MarkdownContent } from './MarkdownContent';

export class Lesson {
  private constructor(
    private readonly _id: LessonId,
    private readonly _title: LessonTitle,
    private readonly _content: MarkdownContent,
    private readonly _order: number,
    private readonly _quizId: QuizId | null
  ) {}

  static create(params: {
    id: LessonId;
    title: LessonTitle;
    content: MarkdownContent;
    order: number;
    quizId?: QuizId;
  }): Lesson {
    if (params.order < 1) {
      throw new Error('Lesson order must be positive');
    }
    return new Lesson(
      params.id,
      params.title,
      params.content,
      params.order,
      params.quizId ?? null
    );
  }

  get id(): LessonId { return this._id; }
  get title(): LessonTitle { return this._title; }
  get content(): MarkdownContent { return this._content; }
  get order(): number { return this._order; }
  get quizId(): QuizId | null { return this._quizId; }

  hasQuiz(): boolean {
    return this._quizId !== null;
  }

  equals(other: Lesson): boolean {
    return this._id.equals(other._id);
  }
}
```

### Implementation: Aggregate Root

```typescript
// src/domain/content/models/Course.ts
export class Course {
  private constructor(
    private readonly _id: CourseId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _chapters: Chapter[]
  ) {}

  static create(params: {...}): Course { ... }

  get id(): CourseId { return this._id; }
  get title(): string { return this._title; }
  get chapters(): readonly Chapter[] { return this._chapters; }
  get totalLessons(): number { ... }

  findLesson(lessonId: LessonId): { chapter: Chapter; lesson: Lesson } | undefined { ... }
  getAdjacentLessons(lessonId: LessonId): { previous: Lesson | null; next: Lesson | null } { ... }

  equals(other: Course): boolean { return this._id.equals(other._id); }
}
```

### Implementation: Specification

```typescript
// src/domain/content/specifications/LessonUnlockSpecification.ts
import { Lesson } from '../models/Lesson';
import { Course } from '../models/Course';
import { Progress } from '@/domain/progress/models/Progress';

export class LessonUnlockSpecification {
  isSatisfiedBy(lesson: Lesson, course: Course, progress: Progress): boolean {
    const allLessons = course.chapters.flatMap(ch => ch.lessons);
    const lessonIndex = allLessons.findIndex(l => l.id.equals(lesson.id));

    if (lessonIndex === -1) return false;
    if (lessonIndex === 0) return true;

    const previousLesson = allLessons[lessonIndex - 1];
    return progress.hasCompletedLesson(previousLesson.id);
  }
}
```

### Definition of Done

- [ ] 値オブジェクト: LessonTitle, MarkdownContent
- [ ] エンティティ: Lesson, Chapter
- [ ] 集約ルート: Course
- [ ] 仕様: LessonUnlockSpecification, ChapterCompletionSpecification
- [ ] サービス: LessonNavigationService
- [ ] 全テスト作成・パス
- [ ] git commit & push
- [ ] Boss1 に完了報告

### Communication

Boss1 への報告は `agent-send.sh` を使用:

```bash
# 完了報告
./scripts/agent-send.sh boss1 "[DONE] Backend2 Content BC完了。PR: agent/001/backend2"

# 問題発生時
./scripts/agent-send.sh boss1 "[BLOCKED] Backend2: 〇〇の問題が発生。支援が必要です。"
```

### Report Template

```
[DONE] Backend2 Content BC完了

作成ファイル:
- src/domain/content/models/Lesson.ts, Chapter.ts, Course.ts
- src/domain/content/models/LessonTitle.ts, MarkdownContent.ts
- src/domain/content/specifications/LessonUnlockSpecification.ts
- src/domain/content/services/LessonNavigationService.ts
- 各テストファイル

テスト結果: 全パス
PR: agent/001/backend2
```
