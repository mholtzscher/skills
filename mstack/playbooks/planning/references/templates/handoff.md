# Handoff Artifact

When spec is complete, produce final summary for task decomposition:

```
# [Feature Name] — Implementation Spec

**Status:** Ready for task breakdown
**Effort:** [total estimate]
**Approved by:** [human who approved]
**Date:** [date]

## Deliverables (Ordered)

1. **[D1]** (S) — [concrete outcome]
   - Depends on: -
   - Owning paths: [file/package paths]
   - Acceptance: A1

2. **[D2]** (M) — [concrete outcome]
   - Depends on: D1
   - Owning paths: [file/package paths]
   - Acceptance: A2

## Key Technical Decisions
- [Decision]: [choice] because [reason]

## Types
[Copy concrete type definitions and ownership from spec]

## Interfaces
[Copy concrete boundary definitions from spec]

## Project Layout
[Copy proposed file/package tree and responsibilities from spec]

## Acceptance Criteria
- **A1:** [Testable criterion 1]
- **A2:** [Testable criterion 2]

## Open Items (Non-Blocking)
- [Item] → Owner: [who]

---
*Spec approved for task decomposition.*
```
