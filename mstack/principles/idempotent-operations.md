# Idempotent operations

Design commands, lifecycle steps, and processing loops to converge on the intended state despite crashes, restarts, and retries. Every state-mutating operation should explain what happens when it runs twice and when the previous run crashed halfway. If partial state unpredictably changes the next outcome, each restart becomes another debugging session.

## Reconcile partial state

Examples for systems being designed include:

- Convergent startup scans existing state, cleans authorized stale artifacts, and adopts confirmed live sessions rather than creating duplicates. Preserve ownership and evidence while distinguishing stale, live, and unknown state.
- Content-based cleanup compares equivalent contents instead of relying on creation order. Equal contents alone do not establish that an artifact is disposable. Confirm target identity, ownership, retention needs, and deletion authority first.
- Self-healing locks can use PID-based stale-lock detection, but verify the actual process identity and liveness before declaring a lock stale. PID reuse means a matching number alone does not prove that the original owner is still running, and a missing or inconclusive observation does not grant deletion authority.
- Idempotent scheduling lets incomplete failed work restart cleanly and regenerates fresh input after each cycle rather than replaying obsolete state. This requires real scheduling and reconciliation capabilities in that system. Mstack instructions do not supply locks or a scheduler.

Test the operation by asking what happens when it runs twice in a row, when the prior run crashes at every possible point, and whether re-execution converges on the same intended end state. If the answer depends on leftover state without a defined recovery path, add a reconciliation step within approved scope.

## Retry only the incomplete authorized actions

Resolve identity once, inspect the current target, and distinguish creation from update. Avoid duplicate PRs, reactions, or records. A retry must preserve the selected target rather than creating a new one because the first response was unclear.

Report exactly which writes succeeded before a failure. Retry only incomplete authorized actions against the same target. A failed metadata operation does not justify rolling back already-published code or repeating unrelated writes.
