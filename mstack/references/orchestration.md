# Orchestration

The user's explicit instructions and repository rules govern the task. The selected playbook determines its permissions and stopping point; this reference does not start a new delivery workflow.

The root (lead) owns intent, the goal, architecture, task decomposition, integration, verification, and the final report. Subagents provide evidence and bounded execution; they do not own the overall direction.

## Delegation gate

Before substantive repository work, classify the task as root-only or delegated. Keep small, localized work root-only when separate context would not materially help; simply locating or reading a file does not require delegation.

Use selective delegation when separate context materially helps, including:

- there are two or more independent workstreams
- substantial repository exploration benefits from separate context
- implementation and verification benefit from separate context
- cross-component debugging or inspection has a bounded question that benefits from separate context
- external or version-specific facts need verification
- independent post-change review is materially useful
- the user explicitly asks for delegation, parallelism, agents, or subagents

For tightly coupled changes, keep the root as the active implementation writer and delegate independent review or verification after integration when useful. Multiple files alone do not justify splitting implementation. A separate context can be useful even when work is sequential. Before assigning a worker, identify useful independent work for the parent; if none exists, keep implementation with the root or yield immediately until the dependency is ready.

## Spawn policy

For delegated tasks, launch a real subagent before doing its assigned work. Describing delegation is not a substitute for launching an agent. Do not create agents solely to satisfy this rule for root-only tasks. If optional delegation is unavailable, use the disclosed fallback in [Blockers and failures](#blockers-and-failures).

For actual tool syntax and capabilities, read the adapter for the current host, [OpenCode](hosts/opencode.md) or [Pi](hosts/pi.md). Current tool schemas take precedence over examples. Models and actual agent names come from host configuration; mstack requires no model setup. A requested multi-model review needs real model diversity; if unavailable, report it rather than relabeling same-model roles as diverse.

For each launch:

1. Choose an available host-configured agent matching the role below.
2. Prepare the role and bounded delegation contract as the child brief; do not assume the agent has the whole conversation.
3. Include the worktree's absolute path and base revision in the brief.
4. Launch through the host's actual delegation tool; compose multi-step or parallel work as described below.
5. Retain the returned child/session/run identifier and output and inspect the result before integrating it or starting dependent work.

Keep one writer per cwd/worktree; give concurrent writers separate worktrees or genuinely isolated output targets. Do not create or switch to additional worktrees unless isolation is necessary; explain that need first. Do not assign competing fixes unless the root explicitly requests alternative approaches. Read-only reviewers may inspect the same immutable snapshot. Do not dispatch a replacement writer until the previous writer's state is known.

The root owns publication unless a child is explicitly assigned delivery within the approved task. That child reports its exact branch/PR/head; other children do not independently publish duplicates. Both sketch and spec require approval before implementation; reuse already-given approval rather than restarting the interview. A child receives the bounded assignment, not a fresh top-level delivery workflow.

## Role selection

Logical roles belong in the child brief; choose actual agent names from the current host's advertised agents rather than assuming the role names are installed.

| Logical role | Scope and constraints                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| explorer     | Read-only mapping, tracing, and inspection. No file creation, edits, tests, or state-changing commands.              |
| worker       | Bounded implementation and fixes within assigned file ownership.                                                     |
| tester       | Reproduction, validation, and test-gap analysis; add or edit tests only when authorized by the contract.             |
| reviewer     | Independent diff review for validated correctness, security, regression, project-rule, and maintainability findings. |
| researcher   | Verify external facts and compatibility using available tools and authoritative sources; report access limitations.  |

Give reviewers the diff or comparison baseline. They report findings only: no edits, builds, dependency installation, commits, or posted comments. Expect their `Findings` and `Summary` report; missing tests or speculative risks alone are not bugs. Reviewers report validated defects with location, triggering condition, consequence, and correction; they do not silently expand the review.

Choose a suitable discovered agent for design advice beyond the reviewer's validated-diff scope. Agent-type instructions are not proof of enforced tool permissions. Check actual host permissions before describing review as technically enforced read-only execution.

## Delegation contract

Give each agent a narrow task with:

- **Objective:** one concrete outcome
- **Scope:** exact files, module, subsystem, or question; use absolute paths, an absolute cwd, a base revision, and explicit owned paths
- **Context:** only the information needed to succeed, including necessary source pointers and agreed decisions
- **Constraints:** what must not change, including file ownership, read-only limits, and stopping conditions
- **Deliverable:** what to return or implement, with expected evidence and a concise handoff format
- **Acceptance criteria:** how success will be checked

Supply the applicable shared rules and assigned playbook instructions in the brief, plus absolute paths to relevant principles, supporting references, and the selected host adapter. The child receives its governing context from the parent rather than reopening a higher-level workflow.

When an approved sketch or spec provides numbered deliverables, use them as the initial work breakdown. Each worker contract names the relevant deliverable IDs, owned paths, dependencies, and acceptance criteria. Preserve those references when splitting large deliverables into milestones or combining small deliverables that form one cohesive change; do not require one agent per deliverable. Keep a deliverable incomplete until all its assigned implementation and validation work is accepted.

Bound the amount of work, not just its directory. When an assignment combines several substantial behaviors with different verification needs, split it into coherent, independently checkable milestones. Identify shared interfaces and required helpers, generated consumers, and test infrastructure before assigning ownership. Give each dependency an owner; do not leave a worker to satisfy the goal through files it cannot change.

Example:

> **Role:** explorer.
>
> **Objective:** Identify where `POST /invoices` validates currency.
>
> **Scope:** Trace the invoice endpoint and its validation helpers and tests in `/worktrees/billing-api`.
>
> **Context:** Unsupported currencies are reportedly accepted; the root needs the current validation path before choosing a fix.
>
> **Constraints:** Read-only inspection. Do not edit files, run tests, or use state-changing commands.
>
> **Deliverable:** Return the handler-to-validation call path, absolute file paths and symbol references, and relevant existing test cases.
>
> **Acceptance criteria:** Cite source evidence for where unsupported currencies are rejected, or show the traced path if no rejection exists. Identify existing test coverage or explicitly report that none was found.

Ask for concise conclusions, changed paths, file and symbol references, commands run with actual results, and evidence for each acceptance criterion—not entire files or raw logs when a summary suffices. Worker handoffs should explicitly identify unmet criteria, deviations, unresolved issues, out-of-scope dependencies, and checks not run, or state that none remain.

## Handoff acceptance

Before starting dependent work, the root compares each worker's result and relevant diff against its acceptance criteria. Inspect the diff yourself. A completed agent or green tests do not establish acceptance when the handoff describes an omitted deliverable, contract violation, or workaround.

Resolve exceptions by correcting the implementation, assigning the missing dependency, or clarifying a materially different outcome with the user. Do not silently weaken the goal to fit file ownership. Resolve cross-boundary ownership before asking a worker to compensate outside its scope. Keep the affected milestone incomplete until its criteria are met; unrelated work may proceed. Integrate only accepted work.

## Execution and parallelism

Use background execution by default for independent work, through the actual host adapter.

Launch separate children for independent tasks and wait for results before launching dependent steps. Never batch dependent tasks or writers with overlapping ownership. Inspect results before starting dependent implementation; schedule ready work by actual dependencies.

Do useful independent root work without duplicating assignments, then yield for native completion notifications. Do not sleep or poll for reassurance. Use blocking execution for a genuine dependency when the parent has no independent work; a final review or gate alone does not require blocking execution.

Use only advertised host operations for state, waiting, continuation, or stopping. Resume a completed child when its retained context is useful and supported. Otherwise supply a fresh child with the consolidated brief and prior evidence. Cancellation is not success: inspect partial changes and resolve any remaining scope. Never infer that a child stopped because a status file changed.

## Shared-worktree validation

During concurrent implementation in isolated writer targets, workers run focused checks and limit formatting or other mutations to owned files. When checks encounter shared state or a sibling's intermediate changes, report those failures rather than repairing that scope or repeatedly rerunning the whole suite. This does not authorize multiple active writers in one worktree.

The root owns repository-wide formatting, generation, integration, and final validation after writers finish. If dependent implementation needs generated output earlier, explicitly assign one generator owner and serialize generation with any writers whose files it can change. Repository task names do not imply scoped effects; check what a command modifies before running it concurrently.

## Workflow

Use only roles that materially help; do not spawn every role mechanically. Serialize dependent stages:

1. Gather evidence through exploration, reproduction, or research as needed. Verify external claims before relying on them.
2. Root chooses the implementation direction within the approved sketch/spec and keeps coupled implementation with one writer. Assign bounded worker ownership when delegation materially helps.
3. Apply the handoff acceptance check and integrate accepted implementation results.
4. Use a tester independent of the implementation where it adds confidence, including the original reproduction path for bugs. For cross-component changes, assign targeted checks through the affected public boundaries—for example request/response handling, raw wire decoding, generated SDK entry points, or rendered UI behavior. Derive expectations from the requirement, not merely the implementation or its generated fixtures. Build success and helper tests alone do not prove end-to-end behavior; report untested paths explicitly.
5. Use an independent reviewer when materially useful, especially for high-risk or non-obvious changes.
6. Resolve findings and perform final verification, including repository-wide checks after integration, before reporting completion.

## Blockers and failures

Subagents should report back rather than expand scope when they encounter:

- architectural or security-sensitive decisions, breaking API/schema changes, or new dependencies
- unclear requirements or reasoning blockers requiring broader context
- unexpected changes outside their scope or conflicts with another worker's ownership
- acceptance criteria that require changes outside assigned ownership or cannot be met without a workaround that violates the contract

The root resolves conflicts and chooses whether to narrow, clarify, retry, or reassign work. Inspect and report failures; never claim failed delegation succeeded. For workflow, launch, runtime, or tooling infrastructure failures, report the exact failure and run/worktree state, preserving any partial diff. Reconcile partial changes before any retry.

On a failed optional launch or unavailable optional delegation, continue directly where that soundly meets the task, disclosing the fallback and loss of independence. Preserve the difference between direct verification and independent verification. Explicit requirements for independent review, multi-model diversity, parallel candidates, remote execution, or durable scheduling cannot be silently downgraded; stop the affected scope until the requirement is satisfied or the user revises it. Retry within the same protocol or obtain approval before a change in execution mode that would alter a requirement. Unrelated work may proceed.

## Completion check

Before claiming completion, confirm:

- every required agent was actually launched and has completed, explicitly failed with its remaining scope resolved, or been confirmed stopped with its remaining scope resolved
- no required agent is still running; unknown child liveness is unresolved work
- delegated changes met their acceptance criteria, handoff exceptions and conflicting findings were resolved, and material review findings were addressed
- the final diff implements the request without unintended changes
- relevant syntax/type checks, targeted tests, integration checks, builds, and original bug reproductions were run or their omission explained
- unresolved risks and validation limitations are recorded

Report changes, verification, and limitations concisely. Provide task descriptions, agent IDs, types, and completion status only when requested. If reporting a model, use only what the tool call or returned metadata confirms.
