# Claude Multi-Agent Framework

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Claude](https://img.shields.io/badge/Claude-Sonnet%204.5-orange.svg)

A production-ready framework for managing complex software development tasks using Claude AI with a hierarchical multi-agent system. Achieve consistent 100% task completion rates through structured protocols and tmux-based inter-agent communication.

## Overview

The Claude Multi-Agent Framework enables scalable, reliable software development by organizing Claude AI instances into a three-tier hierarchy:

```
President (Quality Control & Approval)
    ↓
Boss1 (Task Decomposition, Worker Management, Integration)
    ↓
Workers (Individual Implementation, DoD Achievement, Reporting)
```

This framework was battle-tested and refined through the development of **BookRAG Manager**, achieving **11 consecutive successful deployments** with zero errors through Protocol Improvement 3.

### Why Multi-Agent?

**Single-agent limitations**:
- Context overflow on complex projects
- Inconsistent quality across tasks
- Difficulty tracking parallel work
- No systematic error prevention

**Multi-agent benefits**:
- Clear separation of concerns
- Parallel execution with dependency management
- Systematic quality gates
- Reproducible success patterns

## Key Features

### 1. Tier-Based Dependency Management

Organize tasks into tiers to prevent deadlocks and enable maximum parallelization:

```yaml
Tier 1: Foundation tasks (no dependencies)
  └─> Tier 2: Core features (depend on Tier 1)
      └─> Tier 3: Integration tasks (depend on Tier 2)
          └─> Tier 4: Testing & documentation
```

Workers within the same tier execute in parallel. Cross-tier dependencies are explicitly declared and enforced.

### 2. Protocol Improvement 3: Instruction-First Execution

The breakthrough protocol that achieved 11 consecutive successes:

**Rule**: Every Worker MUST read their complete task instruction file before starting work.

**Impact**:
- Before Protocol 3: ~40% success rate (frequent deadlocks, missing requirements)
- After Protocol 3: 100% success rate across 11 consecutive tickets

**Enforcement**: Task instructions contain complete specifications, DoD checklists, and explicit dependency declarations.

### 3. 100% DoD Achievement System

Every task includes a Definition of Done (DoD) checklist:

```markdown
## DoD
- [ ] Implementation complete (all features)
- [ ] TypeScript errors: 0
- [ ] Build test: success
- [ ] Tests created & passing (if applicable)
- [ ] Documentation updated
- [ ] Completion report sent
```

Workers cannot mark tasks complete until all DoD items are checked. Boss validates before integration.

### 4. tmux-Based Agent Communication

Agents communicate through dedicated tmux sessions:

```bash
# Send task to Boss
./scripts/agent-send.sh boss1 instructions/task/task-213.md

# Boss sends subtask to Worker
./scripts/agent-send.sh worker1 instructions/worker/task-213-worker1.md

# Worker sends completion report
./scripts/agent-send.sh boss1 runs/213/worker1-report.md
```

This provides:
- Clear communication channels
- Message history (tmux capture-pane)
- Parallel agent execution
- Human oversight capability

### 5. Template-Based Task Design

Standardized templates ensure consistency:

- **Boss instructions**: Overall project context, agent hierarchy
- **Task files**: Ticket overview, tier structure, acceptance criteria
- **Worker tasks**: Specific implementation details, DoD checklist, file modifications
- **Completion reports**: DoD verification, metrics, next steps

## Quick Start

### 1. Clone or Setup

```bash
# For framework contributors
git clone https://github.com/yourusername/claude-multiagent-framework.git

# For new projects
./scripts/setup-project.sh /path/to/your/project
```

### 2. Configure Project

Edit `instructions/boss/boss-instructions.md` and replace placeholders:

```markdown
- Project name: [YOUR_PROJECT]
- Tech stack: [YOUR_STACK]
- Repository: [YOUR_REPO]
- Agent hierarchy: President → Boss1 → Worker1-N
```

### 3. Create First Task

Copy a template and customize:

```bash
cp templates/task/task-template.md instructions/task/task-001.md
# Edit task-001.md with your requirements
```

### 4. Launch Agents

Set up tmux sessions:

```bash
# Create tmux session for President
tmux new-session -s president -d
tmux send-keys -t president "claude" C-m

# Create session for Boss1
tmux new-session -s boss1 -d
tmux send-keys -t boss1 "claude" C-m

# Create sessions for Workers (adjust N)
for i in {1..6}; do
  tmux new-session -s worker$i -d
  tmux send-keys -t worker$i "claude" C-m
done
```

### 5. Send Instructions and Execute

```bash
# Send Boss instructions
./scripts/agent-send.sh boss1 instructions/boss/boss-instructions.md

# Send first task
./scripts/agent-send.sh boss1 instructions/task/task-001.md

# Boss will decompose and assign to Workers
# Monitor progress in tmux sessions
```

## Directory Structure

```
claude-multiagent-framework/
├── templates/              # Reusable instruction templates
│   ├── instructions/
│   │   ├── boss/          # Boss-level instruction templates
│   │   ├── worker/        # Worker-level task templates
│   │   ├── task/          # Task specification templates
│   │   └── planning/      # Planning document templates
│   └── reports/           # Completion report templates
│
├── scripts/               # Automation scripts
│   ├── agent-send.sh     # Send messages between agents
│   ├── setup-project.sh  # Initialize new project
│   └── validate-dod.sh   # Validate DoD completion
│
├── docs/                  # Framework documentation
│   ├── getting-started.md
│   ├── best-practices.md
│   ├── troubleshooting.md
│   └── case-studies/     # Real-world examples
│       └── bookrag-manager.md
│
├── examples/              # Example projects
│   ├── simple-project/   # Basic web app example
│   └── complex-project/  # Multi-tier system example
│
├── README.md             # This file
├── PROTOCOL.md           # Detailed protocol specification
├── LICENSE               # MIT License
└── .gitignore
```

### Key Directories

- **templates/instructions/boss/**: Context about the project, tech stack, agent roles
- **templates/instructions/worker/**: Specific implementation tasks with DoD
- **templates/instructions/task/**: High-level task descriptions with tier structure
- **templates/reports/**: Standardized completion report formats
- **scripts/**: Helper scripts for agent communication and project setup
- **docs/case-studies/**: Real-world examples (BookRAG Manager, etc.)
- **examples/**: Complete example projects demonstrating framework usage

## Usage

### Setting Up a New Project

```bash
# 1. Run setup script
./scripts/setup-project.sh /path/to/your/project

# 2. Customize Boss instructions
cd /path/to/your/project
vi instructions/boss/boss-instructions.md

# 3. Define your first ticket
cp /path/to/framework/templates/task/task-template.md \
   instructions/task/task-001.md

# 4. Launch tmux sessions (as shown in Quick Start)

# 5. Send Boss instructions
./scripts/agent-send.sh boss1 instructions/boss/boss-instructions.md

# 6. Send first task
./scripts/agent-send.sh boss1 instructions/task/task-001.md
```

### Creating Task Instructions

Every task should follow this structure:

```markdown
# Ticket XXX: [Title]

## Overview
Brief description of the goal

## Tier Structure
Tier 1: Worker1, Worker2 (parallel)
Tier 2: Worker3, Worker4 (depends on Tier 1)

## Task Breakdown
- Worker1: [specific task]
- Worker2: [specific task]
...

## Acceptance Criteria
- [ ] All workers complete DoD
- [ ] TypeScript errors: 0
- [ ] Build succeeds
- [ ] Integration test passes

## Dependencies
- Requires: [previous tickets]
- Blocks: [future tickets]
```

### Managing tmux Sessions

```bash
# List all agent sessions
tmux list-sessions

# Attach to a session (for monitoring)
tmux attach-session -t worker1

# Send a file to an agent
./scripts/agent-send.sh worker1 instructions/worker/task-213-worker1.md

# Capture agent response
tmux capture-pane -t worker1 -p > worker1-output.txt

# Detach from session (Ctrl-b d)
```

### Using agent-send.sh

The `agent-send.sh` script intelligently sends instructions to agents:

```bash
./scripts/agent-send.sh <agent-name> <file-path>

# Examples:
./scripts/agent-send.sh boss1 instructions/task/task-213.md
./scripts/agent-send.sh worker1 instructions/worker/task-213-worker1.md
./scripts/agent-send.sh president runs/213/boss-report.md
```

The script:
1. Validates the file exists
2. Sends the file path to the specified tmux session
3. Logs the communication
4. Returns the agent session name for monitoring

### Monitoring Progress

```bash
# Watch Boss activity
tmux attach-session -t boss1

# Monitor all workers simultaneously
tmux new-window -t boss1
for i in {1..6}; do
  tmux split-window -t boss1 "tmux attach-session -t worker$i"
done
tmux select-layout tiled
```

### Handling Errors

If a Worker encounters an error:

1. **Worker**: Keeps task status as "in_progress"
2. **Worker**: Creates new task describing the blocker
3. **Worker**: Reports to Boss with detailed error information
4. **Boss**: Re-assigns or provides additional context
5. **Worker**: Resolves and completes original task

Never mark a task complete if:
- TypeScript errors exist
- Build fails
- Tests are failing
- Implementation is incomplete

## Success Cases

### BookRAG Manager (v0.9.0 - v1.0.0)

**Project**: RAG-powered book management system with Supabase Vector integration

**Achievements**:
- **11 consecutive successful tickets** (zero rollbacks)
- **100% DoD achievement** across all workers
- **0 TypeScript errors** in production
- **5,000+ lines** added across parallel workers

**Key Tickets**:

**Ticket 210**: Category system redesign
- 6 workers, 4 tiers
- 104 lines type definitions
- Parallel execution: Worker1 (types) → Workers 2-5 (UI updates)

**Ticket 212**: Supabase Vector infrastructure
- Worker1: PostgreSQL migrations (61 lines SQL)
- Worker2: OpenAI API integration
- 420-line comprehensive README
- Zero integration conflicts

**What made it successful**:
1. **Protocol Improvement 3**: Workers read complete instructions first
2. **Explicit tier structure**: Clear dependencies, maximum parallelization
3. **Strict DoD enforcement**: No task marked complete until 100% done
4. **tmux communication**: Clear, traceable agent interactions

**Metrics**:
- Before Protocol 3: 40% success rate, frequent deadlocks
- After Protocol 3: 100% success rate, 11 consecutive successes
- Average task completion: 15-30 minutes per worker
- Integration time: < 5 minutes (due to clear interfaces)

### Other Case Studies

See `docs/case-studies/` for detailed walkthroughs:
- Simple web app deployment
- Complex microservices architecture
- Legacy codebase refactoring

## Core Principles

### 1. DoD 100% Achievement

Every Worker must achieve 100% of their Definition of Done before marking a task complete. No exceptions.

### 2. Instruction-First Execution (Protocol 3)

Workers MUST read their complete task instruction file before starting implementation. This prevents:
- Missing requirements
- Incorrect assumptions
- Dependency violations
- Rework

### 3. Boss Integration Responsibility

Boss owns the integration of all Worker outputs. Boss must:
- Validate each Worker's DoD achievement
- Resolve conflicts between Workers
- Run final integration tests
- Report to President with confidence

### 4. President Quality Gate

President performs final quality checks:
- All acceptance criteria met
- Production-ready code quality
- Documentation completeness
- Deployment readiness

## Documentation

### Getting Started
- [Installation Guide](docs/getting-started.md)
- [Your First Project](docs/your-first-project.md)
- [Understanding Tiers](docs/understanding-tiers.md)

### Best Practices
- [Writing Effective Task Instructions](docs/best-practices/task-instructions.md)
- [Optimizing Worker Parallelization](docs/best-practices/parallelization.md)
- [Handling Complex Dependencies](docs/best-practices/dependencies.md)
- [DoD Checklist Design](docs/best-practices/dod-design.md)

### Troubleshooting
- [Common Deadlock Patterns](docs/troubleshooting.md#deadlocks)
- [Worker Communication Failures](docs/troubleshooting.md#communication)
- [Integration Conflicts](docs/troubleshooting.md#conflicts)
- [tmux Session Issues](docs/troubleshooting.md#tmux)

### Case Studies
- [BookRAG Manager: RAG System Implementation](docs/case-studies/bookrag-manager.md)
- [E-commerce Platform: Microservices Migration](docs/case-studies/ecommerce-platform.md)
- [Legacy Refactoring: TypeScript Conversion](docs/case-studies/legacy-refactoring.md)

### Protocol Reference
- [PROTOCOL.md](PROTOCOL.md) - Complete protocol specification
- [Protocol Evolution](docs/protocol-evolution.md) - v1 → v2 → v3 improvements
- [Communication Standards](docs/communication-standards.md)

## Advanced Topics

### Scaling Beyond 6 Workers

For large projects requiring more than 6 workers:

```yaml
Hierarchy Extension:
  President
    ├─> Boss1 (Workers 1-6: Frontend)
    ├─> Boss2 (Workers 7-12: Backend)
    └─> Boss3 (Workers 13-18: Infrastructure)
```

Each Boss manages their domain independently. President coordinates cross-domain integration.

### Custom Tier Strategies

Different project types benefit from different tier structures:

**Feature Development** (4 tiers):
- Tier 1: Data models & types
- Tier 2: Business logic & APIs
- Tier 3: UI components
- Tier 4: Integration & tests

**Refactoring** (3 tiers):
- Tier 1: Interface definitions
- Tier 2: Implementation updates (parallel)
- Tier 3: Migration & cleanup

**Bug Fixes** (2 tiers):
- Tier 1: Root cause fix
- Tier 2: Related updates & regression tests

### Integration with CI/CD

```yaml
# .github/workflows/multi-agent-validation.yml
on: [pull_request]

jobs:
  validate-dod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Validate DoD completion
        run: ./scripts/validate-dod.sh
      - name: Check TypeScript errors
        run: npx tsc --noEmit
      - name: Run tests
        run: npm test
```

Automated validation ensures all DoD criteria are met before merge.

## Contributing

We welcome contributions to improve the framework!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our protocol
4. Ensure all examples still work
5. Submit a Pull Request

### Areas for Contribution

- Additional task templates
- Example projects
- Case studies from your projects
- Documentation improvements
- Script enhancements
- Integration with other tools

## FAQ

**Q: How many workers should I use?**
A: Start with 4-6 workers. Scale up with multiple Bosses if needed. More workers require more coordination overhead.

**Q: Can I use this with other LLMs besides Claude?**
A: The framework is designed for Claude's capabilities, but the protocol concepts (tiers, DoD, instruction-first) can be adapted to other LLMs.

**Q: What if a Worker gets stuck?**
A: The Worker should keep the task as "in_progress" and report the blocker to Boss. Boss provides additional context or reassigns.

**Q: How do I handle urgent hotfixes?**
A: Create a single-tier, single-worker task for immediate fixes. Run full multi-agent validation afterward.

**Q: Can I mix automated and human workers?**
A: Yes! The protocol works with human developers too. They follow the same DoD and reporting requirements.

## Roadmap

### v1.1.0 (Planned)
- Web UI for monitoring agent status
- Automated DoD validation scripts
- GitHub Actions integration templates
- More example projects

### v1.2.0 (Planned)
- Support for multiple programming languages
- Database schema migration templates
- Performance optimization guidelines
- Visual dependency graphs

### v2.0.0 (Planned)
- Self-optimizing tier structure
- Automated conflict resolution
- AI-powered task decomposition
- Real-time collaboration features

## License

MIT License - see [LICENSE](LICENSE) for details

Copyright (c) 2025 Claude Multi-Agent Framework Contributors

## Acknowledgments

- Built with [Claude](https://claude.ai) by Anthropic
- Inspired by real-world challenges in the BookRAG Manager project
- Protocol Improvement 3 breakthrough enabled by systematic experimentation
- Community feedback shaped best practices

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/yourusername/claude-multiagent-framework/issues)
- Discussions: [Ask questions and share experiences](https://github.com/yourusername/claude-multiagent-framework/discussions)
- Documentation: [Complete guides and references](docs/)

---

**Made with Claude Sonnet 4.5** | **Achieving 100% Task Completion Since 2025**
