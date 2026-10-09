# Phase 3 — Interfaces

## Goal

Define the seams through which the change will be used: public APIs, function signatures, module boundaries, command shapes, events, request/response formats, or integration points.

## Allowed edits

- Interface/signature/stub changes
- Minimal call-site or compile fixes needed to expose breakage clearly
- Workflow file updates

Avoid implementing full behavior. If implementation pressure appears, record it as a phase 4/6 concern.

## Steps

1. Inspect current call sites and boundaries.
2. Design the shallowest interface that fits the domain and structures.
3. Make phase-scoped edits.
4. Record affected call sites and rejected alternatives.
5. Run project checks.
6. Run `plannotator review --git`.
7. Stop for explicit approval to enter phase 4.
