# Phase 4 — Implementation TODOs

## Goal

Map the implementation path into precise TODOs/checkpoints in the files where the work will happen. The TODOs should prove the agent knows where it will edit before it writes the behavior.

## Allowed edits

- TODO/checkpoint comments in relevant source files
- Workflow file updates
- Tiny mechanical moves only if needed to place TODOs accurately

## TODO quality bar

Each TODO should name:

- the exact behavior or change needed
- the local constraint or invariant it must preserve
- any dependency on another TODO

Avoid vague TODOs like "implement feature".

## Steps

1. Inspect all files expected to change.
2. Add precise TODOs/checkpoints.
3. Update the workflow file with a TODO map and sequencing constraints.
4. Run project checks if code changed.
5. Run `plannotator review --git`.
6. Stop for explicit approval to enter phase 5.
