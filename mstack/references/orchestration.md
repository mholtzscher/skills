# Orchestration

Adapted from the standalone agent-orchestrator skill. The lead owns intent, architecture, task decomposition, integration, verification, and the final report. Children supply bounded work and evidence.

## Choose useful separation

Keep localized or tightly coupled implementation with one writer. Delegate independent workstreams, substantial discovery, external research, independent validation, and materially useful review. File count alone does not justify fan-out. A separate context can be useful even when work is sequential.

Before dispatch, identify useful independent parent work. Launch independent children in the background; yield to completion notifications once parent work is exhausted. Do not poll for reassurance. Use blocking execution for a genuine dependency with no independent parent work.

Read the [host adapter](../SKILL.md#host-selection) for actual tool syntax. Models come from host configuration. A requested multi-model review needs real model diversity; if unavailable, report it rather than relabeling same-model roles as diverse.

## Dispatch contract

Every child receives:

- Objective and deliverable IDs from the approved sketch/spec.
- Absolute cwd, base revision, owned paths, and what it may change.
- Necessary source pointers, agreed decisions, dependencies, and acceptance criteria.
- Its role: explorer, implementer, tester, or report-only reviewer.
- Expected evidence, stopping conditions, and a concise handoff format.
- Absolute paths to mstack's shared rules, relevant playbook/principles, and host adapter. A child reads the bounded assignment, not a fresh top-level delivery workflow.

Give concurrent writers separate worktrees or genuinely isolated output targets. Keep one active writer per worktree. Serialize shared generation, repository-wide formatting, and integration. Read-only reviewers may inspect the same immutable snapshot. Do not dispatch a replacement writer until the previous writer's state is known.

The lead owns publication unless a child is explicitly assigned delivery. That child reports its exact branch/PR/head; other children do not independently publish duplicates.

## Accept the handoff

Require changed paths, evidence for each acceptance criterion, actual checks/results, unresolved issues, and any deviations. Inspect the diff yourself. A green test suite does not excuse an omitted deliverable or an interface workaround that violates the contract.

Integrate only accepted work. Resolve cross-boundary ownership before asking a worker to compensate outside its scope. Run repository-wide checks after integration. Use a validator independent of the implementation where it adds confidence, with the original requirement and actual public boundary as its oracle.

Reviewers report validated defects with location, triggering condition, consequence, and correction. They do not edit, install dependencies, publish comments, or silently expand the review. Check actual host permissions before describing review as technically enforced read-only execution.

## Failure and continuation

On a failed optional launch, report the failure and continue directly where that meets the task. Preserve the difference between direct verification and independent verification. Explicit requirements for independent review, parallel candidates, remote execution, or durable scheduling cannot be silently downgraded.

Resume a completed child when its retained context is useful and supported. Otherwise supply a fresh child with the consolidated brief and prior evidence. Reconcile partial changes before any retry. At completion, every required child must be complete, explicitly failed with its scope resolved, or confirmed stopped. Unknown child liveness is unresolved work.
