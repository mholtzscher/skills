# Phase 1 — Domain model

## Goal

Clarify the domain language and boundaries before deeper design. Capture durable terms in `CONTEXT.md` when they are resolved.

## Allowed edits

- `docs/workflows/<slug>.md`
- `CONTEXT.md` or the relevant context file named by `CONTEXT-MAP.md`
- ADR files only when the decision is hard to reverse, surprising without context, and the result of a real trade-off
- Minimal code comments or names only if needed to align obvious terminology; avoid implementation work

## Steps

1. Read existing domain context files if present.
2. Inspect relevant code to see whether the requested terminology matches reality.
3. Identify ambiguous, overloaded, or conflicting terms.
4. If ambiguity remains, stop and ask one blocking question.
5. Update `CONTEXT.md` with resolved glossary terms using the repo's existing style.
6. Update the workflow file's phase 1 section.
7. Run project checks if code changed.
8. Run Plannotator:
   - `plannotator review --git` if code changed
   - otherwise `plannotator annotate docs/workflows/<slug>.md`
9. Stop for explicit approval to enter phase 2.
