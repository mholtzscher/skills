# Continuity

Follow only the requested section. For pickup or pause, read [history guidance](../references/history.md) and the current [host adapter](../SKILL.md#host-selection).

## Recall

Read [history guidance](../references/history.md). Identify the topic and relevant project/time range. Search the available session record plus linked specs, commits, PRs, and decisions. Delegate bulk retrieval when useful.

Return the current goal, settled decisions, superseded proposals, completed work, unresolved questions, and likely next action, with source IDs/dates. Check current repository state where stale history could mislead. Do not resume implementation or publish merely because the prior session intended to do so; confirm the applicable authorization and ownership first.

## Catch up

Summarize the current conversation since the user's last substantive instruction or the requested checkpoint. Use actual tool/delegate results, not the intended plan as proof of completion.

Lead with the current state. Group completed actions, running work, blockers, and decisions needing the user. Give enough evidence and a recommendation for each choice to be answerable without rereading the transcript. Link actual artifacts/PRs and distinguish pending CI from a successful delivery. This is a summary, not a new round of execution.

## Pickup

Read the supplied handoff or relevant prior session. Reconstruct goal, approved design, scope, decisions, branches/PRs, checks, and unresolved work. Verify current Git state and published head instead of trusting a stale summary. Identify active writers/processes before taking ownership. Do not start another writer in a worktree still owned by an unconfirmed child.

Confirm the next task and applicable authority when the handoff is incomplete or consequential choices remain. Resume the relevant playbook from its unmet acceptance criterion, not from the beginning of an already-approved interview.

## Pause

Stop launching new work. Ask running children to checkpoint/stop only through actual host controls, and verify the response where supported. If the host cannot stop them, record their IDs, ownership, and unknown state explicitly; do not claim the pause is complete.

Record goal, approvals, current branch/base/head, changed paths, child/process IDs, verification, published PR/check state, blockers, and the next concrete action. Use an existing task/spec record or a user-agreed handoff path. Preserve uncommitted work; do not commit or discard it merely to make a handoff tidy. Report what continues running and what the next operator must verify.
