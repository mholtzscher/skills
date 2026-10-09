---
name: prime-flow
description: Explicit-only phase-gated development workflow for code changes. Use only when the user explicitly mentions `prime-flow` or asks to use the Prime Flow workflow. Guides work through hard approval gates: research, domain model, structures, interfaces, TODOs, invariant checks, and implementation, with Plannotator review at each gate.
license: MIT
compatibility: Requires git for diff review. Uses `plannotator` when available for phase gates.
---

# Prime Flow

Prime Flow is a controlled development workflow for making code changes without letting the agent run ahead. It is inspired by a phase-gated AI coding process: design the change in layers, edit only inside the current phase's scope, verify, run Plannotator review, then stop for explicit approval.

Use this skill only when explicitly invoked. Do not apply Prime Flow to ordinary coding tasks unless the user asks for it.

## Core rules

1. **Hard gates.** Stop after every phase. Do not advance until the user explicitly says to continue, approve, next phase, or equivalent.
2. **Stop on ambiguity.** If anything is ambiguous after inspecting the codebase, stop and ask. Do not silently assume.
3. **Codebase-first.** If a question can be answered by reading the repo, inspect the repo instead of asking.
4. **Current tree only.** Do not create branches, stashes, or worktrees. If the working tree is already dirty at kickoff, stop and ask whether the existing changes belong to this workflow.
5. **Phase-scoped edits.** The agent may edit code in every phase, but only for that phase's purpose. The user reviews each phase's diff through Plannotator.
6. **Durable domain model.** When domain terms are resolved, update `CONTEXT.md` using the repo's existing domain-modeling conventions. Create it lazily only when there is something real to capture.
7. **Workflow artifact.** Create or update a Markdown plan under `docs/workflows/` for every run.
8. **Run project checks.** After phases that edit code, run the repo's relevant checks. If checks are expensive, run them anyway unless the user says otherwise.
9. **Plannotator gate.** At each gate, run Plannotator by target:
   - Code diffs: `plannotator review --git`
   - Plan-only/doc review: `plannotator annotate docs/workflows/<slug>.md`

## Phase sequence

Prime Flow uses seven numbered phases:

| Phase | Name | Purpose |
|---|---|---|
| 0 | Research + run plan | Inspect the codebase, existing docs, tests, and constraints. Create the workflow file and propose how phases will apply. |
| 1 | Domain model | Clarify ubiquitous language, scenarios, and domain boundaries. Update `CONTEXT.md` when terms are resolved. |
| 2 | Structures | Design or modify data structures, schemas, state shapes, and core representations. |
| 3 | Interfaces | Design public APIs, seams, function signatures, command shapes, or module boundaries. |
| 4 | Implementation TODOs | Place precise TODOs/checkpoints in the files where implementation will happen. |
| 5 | Invariant checks | Add executable checks first: tests, assertions, type constraints, validation scripts, or comparable guards. These may fail initially. |
| 6 | Implementation | Implement the change, verify it, report where the plan held or broke, and finish with a final review summary. |

Phases are **adaptive**: if a phase is irrelevant, mark it `N/A` in the workflow file with a brief reason, run the appropriate review if files changed, then stop for approval.

## Kickoff procedure

Read `commands/start.md` when starting a Prime Flow run. Read `commands/resume.md` when continuing an existing run, especially in a fresh session.

At kickoff:

1. Check `git status --short`.
2. If there are existing changes, stop and ask whether they belong to this workflow.
3. Inspect relevant repo docs and code before asking questions.
4. Create `docs/workflows/<slug>.md` using `references/workflow-template.md`.
5. Complete phase 0 only.
6. Run Plannotator on the workflow doc.
7. Stop for explicit approval.

## Per-phase procedure

For each phase:

1. Read the relevant command file in `commands/`.
2. Inspect the codebase enough to answer non-user questions yourself.
3. Make only phase-scoped edits.
4. Update the workflow Markdown file with:
   - phase status
   - files changed
   - decisions made
   - verification commands and results
   - Plannotator command run
   - open questions
   - recommendation for the next phase
5. Run project checks after code edits.
6. Run Plannotator:
   - `plannotator review --git` if code changed
   - `plannotator annotate docs/workflows/<slug>.md` if the workflow doc is the main artifact
7. Stop and wait for explicit approval.

## Plannotator behavior

Treat Plannotator as the review surface, not as an autonomous decision maker. The user decides whether to approve the next phase.

If `plannotator` is unavailable, record that in the workflow file and stop for approval rather than inventing a substitute.

## Implementation phase special rule

Phase 6 merges the video's trial and final implementation steps. During phase 6, ask whether trial implementation changes should be kept, rolled back, or treated as final if that distinction matters. If there is no meaningful distinction, proceed with a normal implementation and document where the earlier plan was insufficient.

## Command files

- `commands/start.md` — kickoff and phase 0
- `commands/resume.md` — recover workflow state and continue an existing run
- `commands/phase-1-domain.md`
- `commands/phase-2-structures.md`
- `commands/phase-3-interfaces.md`
- `commands/phase-4-todos.md`
- `commands/phase-5-invariants.md`
- `commands/phase-6-implementation.md`

Load only the command file needed for the current phase.
