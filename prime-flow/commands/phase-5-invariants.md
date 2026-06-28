# Phase 5 — Invariant checks

## Goal

Add executable checks before implementation. These checks may fail initially. They should constrain the implementation and catch regressions.

## Preferred checks

Choose the strongest practical checks for the repo:

1. Tests for externally visible behavior
2. Assertions or validation for impossible states
3. Type constraints or schema validation
4. Scripted smoke checks or golden fixtures
5. Build/lint/typecheck additions only when they genuinely enforce the invariant

## Allowed edits

- Tests
- Assertions/validation/type constraints
- Fixtures or small test helpers
- Workflow file updates

Do not implement the production behavior merely to make checks pass; that belongs in phase 6.

## Steps

1. Identify invariants from phases 1-4.
2. Add executable checks first.
3. Run the relevant checks and record expected failures.
4. Update the workflow file with every check added and what it proves.
5. Run `plannotator review --git`.
6. Stop for explicit approval to enter phase 6.
