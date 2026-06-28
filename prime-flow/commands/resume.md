# Prime Flow resume

Use this command when the user asks to continue an existing Prime Flow run, especially in a fresh session.

## Goal

Recover the workflow state from `docs/workflows/<slug>.md`, reconcile it with the current repository state, and continue only from the correct next gate.

## Steps

1. Identify the workflow file:
   - If the user provided a path, use it.
   - Otherwise list likely files under `docs/workflows/` and ask which one to resume.
2. Read `prime-flow/SKILL.md` and this workflow file.
3. Run `git status --short`.
4. Inspect the current diff with `git diff --stat` and targeted file reads as needed.
5. Determine:
   - the last approved phase
   - the current or next phase
   - whether the working tree matches the workflow file's recorded state
6. If the workflow file and working tree disagree, stop and ask how to reconcile them.
7. If the last phase appears complete but not explicitly approved, run the appropriate Plannotator command again if useful, summarize the state, and stop for approval.
8. If approval is already recorded and the next phase is clear, read that phase's command file and proceed with that phase only.

## Plannotator on resume

Use the same target rule as normal gates:

- Run `plannotator review --git` when code diffs are present and need review.
- Run `plannotator annotate <workflow.md>` when the workflow document is the main artifact.

Do not advance just because Plannotator has run. The user still needs to explicitly approve the next phase unless the workflow file already records that approval.

## Output before continuing

Report:

- workflow file path
- last approved phase
- current repository state
- current/next phase
- any mismatch or risk
- recommended next action

If anything is ambiguous, stop and ask one blocking question.
