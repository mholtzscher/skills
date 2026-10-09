# Phase 6 — Implementation

## Goal

Implement the change under the constraints created by the earlier phases. Make the invariant checks pass, run project verification, and report where the plan held or broke.

## Trial/final handling

This phase merges trial and final implementation. If it matters whether changes are exploratory or final, stop and ask whether to keep, roll back, or finalize the trial changes. Otherwise proceed normally.

## Allowed edits

- Production implementation
- Test/check updates required by legitimate design discoveries
- Removal or resolution of phase 4 TODOs
- Workflow file updates

Do not expand scope beyond the approved plan. If implementation requires unplanned files or concepts, record where the plan broke and stop if the deviation is material.

## Steps

1. Re-read the workflow file and current TODOs.
2. Implement the smallest change that satisfies the approved structures, interfaces, TODOs, and invariants.
3. Remove or resolve TODO markers introduced by Prime Flow.
4. Run all project checks.
5. Update the workflow file:
   - implementation summary
   - where the plan held
   - where the plan broke
   - checks run and results
   - remaining risks and follow-ups
6. Run `plannotator review --git`.
7. Stop for final user review.
