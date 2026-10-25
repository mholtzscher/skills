# Autonomous run

Autonomy operates inside an approved sketch/spec, scope, and delivery authority. "Keep going" does not by itself approve a new implementation shape, a merge, or unrelated external actions.

1. Establish the goal, observable completion predicate, resource/time budget, delivery target, and decisions still requiring the user.
2. Select a relevant coding playbook or build a bounded sequence of them. Use [Decision trail](../decision-trail/PLAYBOOK.md) for meaningful decisions and evidence the user will review later, including its run attribution, transcript audit, review, and local-storage rules.
3. Check actual scheduling, cancellation, and liveness capabilities before promising unattended work across session restarts. Subagent completion notifications support active-session work, not restart-resilient scheduling. An unavailable scheduler does not block a bounded active-session task.
4. Iterate while an evidence-backed next step remains within scope and budget. Change hypotheses when the same premise repeatedly fails. Stop for missing access, consequential new choices, a failed prerequisite, budget expiry, or the completion predicate.
5. Leave a [handoff](../continuity/PLAYBOOK.md#pause) on interruption or incomplete work. Report completed behavior, current PR/head/checks, remaining work, and any child whose state could not be confirmed.
