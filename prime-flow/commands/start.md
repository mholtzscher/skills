# Prime Flow start / Phase 0

Use this command when the user explicitly starts a Prime Flow run.

## Goal

Research the change, create the workflow artifact, and propose the phase plan. Do not perform domain, structure, interface, TODO, invariant, or implementation work yet unless needed only to understand the current code.

## Steps

1. Run `git status --short`.
2. If the tree has existing changes, stop and ask whether those changes belong to this Prime Flow run.
3. Inspect the codebase before asking questions:
   - root docs such as `README.md`, `AGENTS.md`, `CONTEXT.md`, `CONTEXT-MAP.md`
   - package/build/test files
   - files relevant to the requested change
4. Create `docs/workflows/<slug>.md` from `references/workflow-template.md`.
5. Fill in:
   - goal
   - starting state
   - relevant docs/code inspected
   - constraints
   - proposed treatment of each phase, including any phase that may be `N/A`
6. Run `plannotator annotate docs/workflows/<slug>.md`.
7. Stop and ask for explicit approval to enter phase 1.

## Output before stopping

Report only:

- workflow file path
- key findings from research
- Plannotator command run
- open questions, if any
- recommended next phase

Do not continue without explicit approval.
