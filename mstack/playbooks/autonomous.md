# Autonomous run

Autonomy operates inside an approved sketch/spec, scope, and delivery authority. "Keep going" does not by itself approve a new implementation shape, a merge, or unrelated external actions.

1. Establish the goal, observable completion predicate, resource/time budget, delivery target, and decisions still requiring the user. Obtain the required planning approval before implementation.
2. Select a relevant coding playbook or build a bounded sequence of them. Record meaningful decisions and evidence for work the user will review later; keep the record local unless a committed audit trail was requested or agreed.
3. Use available background execution and completion notifications. Check actual scheduling, cancellation, and liveness capabilities before promising unattended work across session restarts.
4. Iterate while an evidence-backed next step remains within scope and budget. Change hypotheses when the same premise repeatedly fails. Stop for missing access, consequential new choices, a failed prerequisite, budget expiry, or the completion predicate.
5. Leave a [handoff](continuity.md#pause) on interruption or incomplete work. Report completed behavior, current PR/head/checks, remaining work, and any child whose state could not be confirmed.

An unavailable scheduler does not block a bounded active-session task. It does block a promise that requires future wakeups or restart recovery.
