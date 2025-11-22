# Multi-Agent Development Protocol

**Version**: 3.0
**Status**: Production-Ready
**Success Rate**: 100% (11 consecutive successes in BookRAG Manager)

This document defines the operational protocol for the Claude Multi-Agent Framework. Following this protocol ensures consistent, high-quality software delivery with minimal errors.

---

## Core Principles

The protocol is built on four fundamental principles that must never be violated:

### 1. DoD 100% Achievement

**Principle**: Every Worker must achieve 100% of their Definition of Done (DoD) before marking a task complete.

**Why**: Partial completions create integration debt and cascade failures. One Worker's 95% completion can block three other Workers.

**Enforcement**:
- Workers self-verify against DoD checklist
- Boss validates DoD before accepting completion
- President spot-checks DoD compliance
- Automated scripts validate objective criteria (TypeScript errors, build status)

**Example DoD Violation** (Ticket 208, pre-Protocol 3):
```
Worker2 marked task complete with:
- ✅ UI implemented
- ✅ Types updated
- ❌ TypeScript errors: 3 (form validation)
- ❌ Build test: not run

Result: Boss integration failed, 2-hour delay, Worker2 rework required
```

**After Protocol 3**: Zero DoD violations across 11 consecutive tickets.

### 2. Instruction-First Execution (Protocol Improvement 3)

**Principle**: Every Worker MUST read their complete task instruction file from start to finish before beginning any implementation.

**Why**: This single change increased success rate from 40% to 100%.

**The Problem Before Protocol 3**:
- Workers started coding based on task title alone
- Missed critical requirements buried in instructions
- Created circular dependencies
- Violated unstated assumptions

**The Breakthrough** (Ticket 210):
```markdown
Task: "Update BookCategory type"

Worker skipped to implementation, missed:
- LEGACY_CATEGORY_MIGRATION requirement
- Dependency order (types BEFORE UI updates)
- 14 categories (thought it was 10)

Result: TypeScript errors in 7 files, 90 minutes of rework
```

**Protocol 3 Rule**:
```markdown
## Required First Action

1. Read this entire instruction file
2. Understand all DoD items
3. Verify dependencies are met
4. Ask Boss questions if ANY part is unclear
5. ONLY THEN begin implementation
```

**Impact**:
- Pre-Protocol 3: 40% success rate, frequent deadlocks
- Post-Protocol 3: 100% success rate, zero deadlocks
- Average rework time: 90 minutes → 0 minutes

### 3. Boss Integration Responsibility

**Principle**: Boss owns the integration of all Worker outputs and is accountable for the final result.

**Boss Responsibilities**:
1. Decompose tasks into worker-sized units
2. Define clear interfaces between Workers
3. Assign explicit tier structure
4. Validate each Worker's DoD achievement
5. Resolve conflicts between Worker outputs
6. Run integration tests
7. Report to President with confidence

**Example Success** (Ticket 212):
```
Boss1 decomposed RAG infrastructure into 6 parallel workers:
- Worker1: Supabase migrations (Tier 1)
- Worker2: OpenAI API integration (Tier 2, depends on Worker1)
- Worker3-6: UI components (Tier 3, depend on Tier 2)

Boss1 validated:
- Each Worker DoD: 100%
- Integration: Zero conflicts
- Build: Success
- Total time: 45 minutes (30min parallel work + 15min integration)
```

**Boss Cannot**:
- Delegate integration responsibility to Workers
- Accept partial completions
- Skip validation steps
- Report to President without testing

### 4. President Quality Gate

**Principle**: President performs final quality validation before production deployment.

**President Checklist**:
```markdown
## Final Quality Gate

- [ ] All acceptance criteria met
- [ ] Production-ready code quality
- [ ] Security review passed
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Deployment runbook ready
- [ ] Rollback plan defined
```

**President Authority**:
- Reject work that doesn't meet quality standards
- Request additional testing
- Require documentation improvements
- Delay deployment for quality reasons

---

## Agent Hierarchy

```
┌─────────────────────────────────────────┐
│          President                       │
│  (Quality Control & Approval)           │
│  - Final quality gate                   │
│  - Production deployment approval       │
│  - Protocol compliance oversight        │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│          Boss1                           │
│  (Task Decomposition & Integration)     │
│  - Break tickets into worker tasks      │
│  - Assign tiers and dependencies        │
│  - Manage worker communication          │
│  - Validate DoD achievement             │
│  - Integrate worker outputs             │
│  - Report to President                  │
└────────────┬────────────────────────────┘
             │
             ├────────────┬────────────┬────────────┬────────────┬────────────┐
             ▼            ▼            ▼            ▼            ▼            ▼
        ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
        │Worker 1 │  │Worker 2 │  │Worker 3 │  │Worker 4 │  │Worker 5 │  │Worker 6 │
        │         │  │         │  │         │  │         │  │         │  │         │
        │ Tier 1  │  │ Tier 1  │  │ Tier 2  │  │ Tier 2  │  │ Tier 3  │  │ Tier 3  │
        │         │  │         │  │         │  │         │  │         │  │         │
        │Read Inst│  │Read Inst│  │Read Inst│  │Read Inst│  │Read Inst│  │Read Inst│
        │Implement│  │Implement│  │Implement│  │Implement│  │Implement│  │Implement│
        │Test     │  │Test     │  │Test     │  │Test     │  │Test     │  │Test     │
        │Report   │  │Report   │  │Report   │  │Report   │  │Report   │  │Report   │
        └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

### Role Definitions

**President**:
- Single instance per project
- Final authority on quality and deployment
- Does not write code
- Focuses on strategic oversight

**Boss**:
- One or more per project (typically Boss1 for small-medium projects)
- Tactical coordination and integration
- Can write integration code
- Directly manages 4-6 workers

**Worker**:
- Individual implementation units
- Assigned to single tier
- Owns specific files/components
- Reports completion to Boss

---

## Communication Rules

### tmux-Based Communication

All agent communication flows through tmux sessions:

```bash
# Session structure
tmux list-sessions
  president
  boss1
  worker1
  worker2
  worker3
  worker4
  worker5
  worker6
```

### Message Routing

```
President ←→ Boss1 ←→ Workers
    ↑          ↑
    └──────────┘
   (Direct communication only for urgent issues)
```

**Standard Flow**:
1. President sends task to Boss1
2. Boss1 decomposes and sends to Workers
3. Workers complete and report to Boss1
4. Boss1 integrates and reports to President
5. President approves or requests changes

### agent-send.sh Protocol

```bash
# Syntax
./scripts/agent-send.sh <target-agent> <file-path>

# Examples
./scripts/agent-send.sh boss1 instructions/task/task-213.md
./scripts/agent-send.sh worker1 instructions/worker/task-213-worker1.md
./scripts/agent-send.sh president runs/213/boss-report.md
```

**Rules**:
1. Always send complete files (not partial snippets)
2. Use markdown format for instructions
3. Include context in file header
4. Reference dependencies explicitly
5. Log all communications

### Message Format Standards

**Task Assignment (Boss → Worker)**:
```markdown
# Ticket XXX Job Y: [Task Title]

**Worker**: WorkerN
**Tier**: N
**Dependencies**: [List of prerequisite jobs]
**Priority**: High/Medium/Low

## Task Overview
[Description]

## Implementation Details
[Specific requirements]

## DoD
- [ ] [Specific deliverable 1]
- [ ] [Specific deliverable 2]
...
- [ ] TypeScript errors: 0
- [ ] Completion report sent

## Files to Modify
- path/to/file1.ts (lines XX-YY)
- path/to/file2.tsx (new file)
```

**Completion Report (Worker → Boss)**:
```markdown
# Ticket XXX Job Y Completion Report

**Worker**: WorkerN
**Completion Time**: YYYY-MM-DD HH:MM

## DoD Status
- [x] [Deliverable 1]
- [x] [Deliverable 2]
...
- [x] TypeScript errors: 0
- [x] Completion report sent

**DoD: 8/8 (100%)**

## Changes Made
- File 1: [Description]
- File 2: [Description]

## Metrics
- Lines added: XXX
- Lines modified: YYY
- TypeScript errors: 0
- Build status: ✅ Success

## Next Steps
[Handoff to next tier or Boss integration]
```

**Integration Report (Boss → President)**:
```markdown
# Ticket XXX Integration Report

**Boss**: Boss1
**Workers**: N workers
**Total Changes**: XXXX lines

## Summary
[High-level overview of changes]

## Worker Status
- Worker1: ✅ DoD 100% (Tier 1)
- Worker2: ✅ DoD 100% (Tier 1)
- Worker3: ✅ DoD 100% (Tier 2)
...

## Integration Results
- TypeScript errors: 0
- Build: ✅ Success
- Tests: ✅ All passing
- Conflicts: None

## Acceptance Criteria
- [x] [Criterion 1]
- [x] [Criterion 2]
...

**Ready for Production**: Yes
```

---

## Tier Structure & Dependency Management

### What Are Tiers?

Tiers organize tasks into layers based on dependencies:

```
Tier 1: No dependencies (can start immediately)
  ↓
Tier 2: Depends ONLY on Tier 1 completion
  ↓
Tier 3: Depends ONLY on Tier 2 completion
  ↓
Tier 4: Depends ONLY on Tier 3 completion
```

**Key Rules**:
1. Workers within the same tier execute in parallel
2. Tier N+1 cannot start until ALL Tier N Workers complete
3. No cross-tier dependencies (e.g., Tier 3 cannot depend on Tier 1 only)
4. Boss enforces tier ordering

### Example: Ticket 210 (Category Redesign)

```yaml
Tier 1:
  - Worker1: Update types.ts (BookCategory expansion)
    DoD: 14 categories defined, CATEGORY_LABELS, LEGACY_CATEGORY_MIGRATION

Tier 2 (depends on Tier 1):
  - Worker2: Update BookForm.tsx (use new categories)
  - Worker3: Update BookCard.tsx (use CATEGORY_LABELS)
  - Worker4: Update list page filters

Tier 3 (depends on Tier 2):
  - Worker5: Update tests for new categories

Tier 4 (depends on Tier 3):
  - Boss1: Integration test, migration script
```

**Execution Timeline**:
```
0min:  Worker1 starts (Tier 1)
15min: Worker1 completes, reports to Boss1
15min: Boss1 validates Worker1 DoD
16min: Workers 2, 3, 4 start in parallel (Tier 2)
35min: All Tier 2 workers complete
36min: Worker5 starts (Tier 3)
45min: Worker5 completes
46min: Boss1 integration & testing
60min: Ticket 210 complete (✅ 100% DoD)
```

### Avoiding Deadlocks

**Common Deadlock Pattern** (Pre-Protocol 3):
```
Worker1: Updating types.ts, needs Worker2's interface definition
Worker2: Updating components, needs Worker1's types
Result: Both stuck waiting for each other
```

**Solution**:
```
Tier 1: Worker1 defines ALL types and interfaces
Tier 2: Worker2 uses Worker1's types (no circular dependency)
```

**Design Rule**: Tiers must form a Directed Acyclic Graph (DAG)

### Dependency Declaration

Every worker task must explicitly declare dependencies:

```markdown
## Dependencies

**Requires (must complete before this task)**:
- Ticket 209: Database schema migration
- Job A (Worker1): Type definitions

**Blocks (cannot start until this task completes)**:
- Job C (Worker3): UI components
- Job D (Worker4): Integration tests

**Conflicts (cannot run in parallel with)**:
- None (safe to parallelize with any same-tier task)
```

---

## Quality Metrics

### Objective Metrics

These are automatically validated:

```bash
# TypeScript errors
npx tsc --noEmit
# Must be: 0 errors

# Build success
npm run build
# Exit code: 0

# Test coverage
npm test
# All tests passing

# Linting
npm run lint
# 0 errors, 0 warnings (or pre-approved exceptions)
```

### Definition of Done (DoD)

Every task includes a DoD checklist. Common items:

```markdown
## DoD

**Implementation**:
- [ ] All features in specification implemented
- [ ] Edge cases handled
- [ ] Error handling added

**Quality**:
- [ ] TypeScript errors: 0
- [ ] Build test: Success
- [ ] Unit tests: Created and passing
- [ ] Integration tests: Passing (if applicable)

**Documentation**:
- [ ] Code comments added
- [ ] README updated (if applicable)
- [ ] API documentation updated (if applicable)

**Process**:
- [ ] Completion report created
- [ ] Completion report sent to Boss
- [ ] Files committed (if git-based workflow)
```

### DoD Template

Standard template for worker tasks:

```markdown
## ✅ Definition of Done (DoD)

- [ ] [Specific deliverable 1]
- [ ] [Specific deliverable 2]
- [ ] [Specific deliverable 3]
- [ ] TypeScript errors: 0 (run `npx tsc --noEmit`)
- [ ] Build test: Success (run `npm run build`)
- [ ] [Tests created/updated if applicable]
- [ ] [Documentation updated if applicable]
- [ ] Completion report sent to Boss1

**DoD Achievement**: 0/8 → Target: 8/8 (100%)
```

### Metrics Tracking

Boss tracks across all Workers:

```markdown
## Ticket XXX Metrics

**Workers**: 6
**Total DoD Items**: 48
**Completed**: 48
**Success Rate**: 100%

**Quality**:
- TypeScript errors: 0
- Build: ✅ Success
- Tests: ✅ All passing

**Timeline**:
- Start: 2025-01-16 10:00
- Tier 1 complete: 10:15
- Tier 2 complete: 10:45
- Tier 3 complete: 11:00
- Integration complete: 11:15
- Total: 75 minutes

**Efficiency**:
- Planned: 90 minutes
- Actual: 75 minutes
- Variance: -15 minutes (17% faster)
```

---

## Completion Report Format

### Worker → Boss Report

```markdown
# Ticket XXX Job Y Completion Report

**Date**: YYYY-MM-DD HH:MM
**Worker**: WorkerN
**Task**: [Brief description]
**Tier**: N

---

## DoD Achievement

| Item | Status | Notes |
|------|--------|-------|
| [Deliverable 1] | ✅ | [Optional details] |
| [Deliverable 2] | ✅ | |
| TypeScript errors: 0 | ✅ | Verified with `npx tsc` |
| Build test: Success | ✅ | `npm run build` passed |
| Completion report | ✅ | This document |

**Total**: 5/5 (100%)

---

## Changes Made

### Files Modified
1. `path/to/file1.ts` (lines XX-YY)
   - [Description of changes]

2. `path/to/file2.tsx` (new file, XXX lines)
   - [Description of what this file does]

### Code Metrics
- Lines added: XXX
- Lines modified: YYY
- Lines deleted: ZZZ
- Files changed: N

---

## Verification

```bash
# Commands run to verify completion
npx tsc --noEmit  # ✅ 0 errors
npm run build     # ✅ Success
npm test          # ✅ All passing (if applicable)
```

---

## Next Steps

Tier N+1 workers can now begin:
- Worker(N+1): [Next task]
- Worker(N+2): [Next task]

---

## Issues Encountered

None / [Description of any issues and how they were resolved]

---

**Worker**: WorkerN
**Completion Time**: YYYY-MM-DD HH:MM
```

### Boss → President Report

```markdown
# Ticket XXX Integration Report

**Date**: YYYY-MM-DD HH:MM
**Boss**: Boss1
**Ticket**: [Title]

---

## Executive Summary

[2-3 sentence overview of what was accomplished]

---

## Worker Status

| Worker | Tier | Task | DoD | Status |
|--------|------|------|-----|--------|
| Worker1 | 1 | [Task] | 6/6 (100%) | ✅ Complete |
| Worker2 | 1 | [Task] | 5/5 (100%) | ✅ Complete |
| Worker3 | 2 | [Task] | 7/7 (100%) | ✅ Complete |
| ... | ... | ... | ... | ... |

**Total Workers**: N
**DoD Achievement**: 100% (all workers)

---

## Integration Results

### TypeScript Check
```bash
npx tsc --noEmit
# ✅ 0 errors
```

### Build Test
```bash
npm run build
# ✅ Success
```

### Test Suite
```bash
npm test
# ✅ All tests passing (XX/XX)
```

---

## Changes Summary

- **Total lines changed**: XXX added, YYY modified, ZZZ deleted
- **Files modified**: NN
- **New files created**: MM

---

## Acceptance Criteria

- [x] [Criterion 1]
- [x] [Criterion 2]
- [x] [Criterion 3]

**All criteria met**: Yes

---

## Production Readiness

- [x] Code quality verified
- [x] Tests passing
- [x] Documentation complete
- [x] No security vulnerabilities
- [x] Performance acceptable
- [x] Rollback plan defined

**Ready for deployment**: Yes

---

**Boss**: Boss1
**Integration Time**: YYYY-MM-DD HH:MM
```

---

## Protocol Improvement History

### Protocol v1.0 (Initial, 2024-Q4)

**Characteristics**:
- Ad-hoc task assignment
- No formal tier structure
- Workers started tasks immediately
- No standard DoD checklist

**Success Rate**: ~25%

**Problems**:
- Frequent deadlocks (circular dependencies)
- Incomplete implementations
- Integration failures
- High rework rate

**Example Failure** (Ticket 205):
```
3 workers blocked by circular dependencies
Boss spent 2 hours debugging conflicts
TypeScript errors: 15
Total time: 4 hours (planned: 1 hour)
```

### Protocol v2.0 (2024-Q4)

**Improvements**:
- Introduced tier structure
- Explicit dependency declarations
- Boss validates dependencies before assigning
- Standard DoD template

**Success Rate**: ~60%

**Problems**:
- Workers still skipped reading full instructions
- Missing requirements discovered during integration
- DoD partially completed

**Example Issue** (Ticket 207):
```
Worker completed UI but missed:
- Error handling requirement
- Edge case for empty state
- Documentation update

Result: 1 hour rework
```

### Protocol v3.0 (2025-Q1)

**Breakthrough Change**:
- **Instruction-First Execution**: Workers MUST read complete instructions before starting

**Additional Improvements**:
- Strict DoD enforcement (no partial completions)
- Boss responsible for integration
- President quality gate
- Automated validation scripts

**Success Rate**: 100% (11 consecutive successes)

**Example Success** (Ticket 212):
```
6 workers, 4 tiers, 61 SQL lines + 420 README lines + 5 other files
- All workers read instructions first
- Zero dependency conflicts
- Zero integration issues
- Total time: 45 minutes
- DoD achievement: 100%
```

**Key Metrics Comparison**:

| Metric | v1.0 | v2.0 | v3.0 |
|--------|------|------|------|
| Success rate | 25% | 60% | 100% |
| Avg rework time | 120 min | 45 min | 0 min |
| Deadlock frequency | 40% | 15% | 0% |
| DoD completion | 60% | 85% | 100% |
| Integration issues | High | Medium | Zero |

### Protocol v4（強化版）- Ticket 214 👈 **Current**

**Protocol Reminder First**: 指示書最上部に通信プロトコル配置
**Pre-Work Checklist**: 作業開始前の pwd 確認を必須化
**Post-Work Checklist**: 完了前の ls/git status/git log 確認を必須化
**Communication Enforcement**: agent-send.sh 使用の徹底（テキスト応答禁止）
**成果**: （実証中）通信忘れ・作業ディレクトリ誤りの防止

### Protocol v4 の主要変更点

#### 1. 指示書構造の変更
```diff
# Boss1 指示書

+ ## 🚨 PROTOCOL REMINDER（作業開始前に必読）
+ ### 通信プロトコル
+ ❌ 禁止: テキスト応答
+ ✅ 必須: agent-send.sh 実行
+ ---

## あなたの役割
...
```

#### 2. チェックリスト追加
```markdown
## ⚠️ 作業開始前チェックリスト
- [ ] pwd で作業ディレクトリ確認
- [ ] 指示書を最後まで読了

## ⚠️ 作業完了前チェックリスト
- [ ] ls -la で成果物確認
- [ ] git status で変更確認
- [ ] git commit 実行
- [ ] git log -1 --stat で確認
- [ ] agent-send.sh で完了報告
```

#### 3. ドキュメント強化
- Best Practice #13: 通信プロトコル遵守
- Best Practice #14: 作業ディレクトリ確認
- Troubleshooting #11: agent-send.sh 忘れ対応
- Troubleshooting #12: 作業ディレクトリ誤り対応

### Ticket 213 で学んだ教訓

#### 問題1: Worker5 の作業ディレクトリ誤り
- **発生**: Worker5 が `/bookrag-manager` で作業
- **影響**: 4ファイル（2,755行）欠損、2-3時間の再作業
- **原因**: 作業開始前の pwd 確認が指示書になかった
- **対策**: Protocol v4 で作業前チェックリストを必須化

#### 問題2: President の通信忘れ
- **発生**: President が Boss1 への指示をテキスト出力
- **影響**: Boss1 が指示を受け取れず、タスク停止
- **原因**: 長文回答に集中し、agent-send.sh を失念
- **対策**: Protocol v4 で通信プロトコルを指示書最上部に配置

### 期待される効果

| 指標 | Protocol v3 | Protocol v4 (目標) |
|------|------------|-------------------|
| 連続成功数 | 11 | 15+ |
| 通信忘れ発生率 | ~5% | ~0% |
| 作業ディレクトリ誤り率 | ~5% | ~0% |
| 再作業発生率 | ~5% | ~1% |

---

## Summary

This protocol has been battle-tested across 11 consecutive successful tickets in the BookRAG Manager project. The key learnings:

1. **Instruction-First Execution** is non-negotiable
2. **Tier structure** enables maximum parallelization
3. **100% DoD** prevents integration debt
4. **Boss integration responsibility** ensures quality
5. **President quality gate** protects production

Following these principles consistently delivers high-quality software with minimal errors and maximum team efficiency.

---

**Protocol Version**: 3.0
**Last Updated**: 2025-01-17
**Next Review**: After 25 consecutive successes
