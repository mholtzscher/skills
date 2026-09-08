---
name: agent-orchestrator
description: Orchestrate complex coding work with the root agent as planner/integrator and subagents for exploration, implementation, testing, research, and independent review. Use for multi-file features, debugging across components, repo-wide changes, parallelizable workstreams, or whenever the user asks to delegate or use subagents. Do not use for trivial one-file edits or simple questions.
---

# Agent Orchestrator

The user's explicit instructions take precedence over this skill.

The root owns the goal, architecture, task decomposition, integration, verification, and final report. Subagents provide evidence and bounded execution; they do not own the overall direction.

## Delegation gate

Before substantive repository work, classify the task as root-only or delegated. Keep small, localized work root-only when separate context would not materially help; simply locating or reading a file does not require delegation.

Delegate when any of these apply:

- the task spans multiple files, modules, services, or components
- there are two or more independent workstreams
- substantial repository exploration benefits from separate context
- implementation and verification benefit from separate context
- debugging or inspection crosses components, modules, or services
- external or version-specific facts need verification
- independent post-change review is materially useful
- the user explicitly asks for delegation, parallelism, agents, or subagents

## Spawn policy

For delegated tasks, launch at least one real subagent with `Agent` before doing its assigned work. Describing delegation is not a substitute for launching an agent. Do not create agents solely to satisfy this rule for root-only tasks.

For each launch:

1. Choose an exact `agent` type from the role table below.
2. Prepare the role and bounded delegation contract as the initial `prompt`; do not assume the agent has the whole conversation.
3. Set a concise task label in `description` and the current worktree's absolute path in `worktree_path`.
4. Call `Agent` with `run_in_background: false` by default, batching independent calls as described below.
5. Retain the returned agent ID when provided and inspect the result before integrating it or starting dependent work.

Keep agents in the current worktree with one writer per file or subsystem. Do not create or switch to additional worktrees unless isolation is necessary; explain that need first. Do not assign competing fixes unless the root explicitly requests alternative approaches.

If launch fails or `Agent` is unavailable, report it and follow Blockers and failures rather than silently taking over.

## Role selection

Logical roles belong in `prompt`; only the agent types below are valid `agent` values.

| Logical role | `Agent.agent` | Scope and constraints |
| --- | --- | --- |
| explorer | `Explore` | Read-only mapping, tracing, and inspection. No file creation, edits, tests, or state-changing commands. |
| worker | `general-purpose` | Bounded implementation and fixes within assigned file ownership. |
| tester | `general-purpose` | Reproduction, validation, and test-gap analysis; add or edit tests only when authorized by the contract. |
| reviewer | `reviewer` | Independent diff review for validated correctness, security, regression, project-rule, and maintainability findings. |
| researcher | `general-purpose` | Verify external facts and compatibility using available tools and authoritative sources; report access limitations. |

Give reviewers the diff or comparison baseline. They report findings only: no edits, builds, dependency installation, commits, or posted comments. Expect their `Findings` and `Summary` report; missing tests or speculative risks alone are not bugs.

Use `general-purpose` for design advice beyond the reviewer's validated-diff scope. Agent-type instructions are not proof of enforced tool permissions.

## Delegation contract

Give each agent a narrow task with:

- **Objective:** one concrete outcome
- **Scope:** exact files, module, subsystem, or question; use absolute paths
- **Context:** only the information needed to succeed
- **Constraints:** what must not change, including file ownership and read-only limits
- **Deliverable:** what to return or implement
- **Acceptance criteria:** how success will be checked

When a spec provides numbered deliverables, use them as the initial work breakdown. Each worker contract names the relevant deliverable IDs, owned paths, dependencies, and acceptance criteria. Preserve those references when splitting large deliverables into milestones or combining small deliverables that form one cohesive change; do not require one agent per deliverable. Keep a deliverable incomplete until all its assigned implementation and validation work is accepted.

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

Ask for concise conclusions, file and symbol references, commands run, and acceptance evidence—not entire files or raw logs when a summary suffices. Worker handoffs should explicitly identify unmet criteria, deviations, out-of-scope dependencies, and checks not run, or state that none remain.

## Handoff acceptance

Before starting dependent work, the root compares each worker's result and relevant diff against its acceptance criteria. A completed agent or green tests do not establish acceptance when the handoff describes a contract violation or workaround.

Resolve exceptions by correcting the implementation, assigning the missing dependency, or clarifying a materially different outcome with the user. Do not silently weaken the goal to fit file ownership. Keep the affected milestone incomplete until its criteria are met; unrelated work may proceed.

## Execution and parallelism

Prefer foreground execution with `run_in_background: false`; consume the result returned by `Agent`.

For independent tasks, batch foreground calls in one `multi_tool_use.parallel` invocation. Each entry uses `recipient_name: "functions.Agent"` and includes `prompt`, `agent`, `description`, `worktree_path`, and `run_in_background: false` in `parameters`. The calls run concurrently and the batch returns their results. Never batch dependent tasks or writers with overlapping file ownership.

For example, prepare separate backend-explorer, frontend-explorer, and API-researcher contracts, then batch two `Explore` calls and one `general-purpose` call, all in the foreground. Inspect all three results before starting dependent implementation. Schedule ready work by actual dependencies rather than waiting for an unrelated subsystem to finish.

Use `run_in_background: true` only when the root has useful independent work to do while agents run. Do not duplicate their assigned work.

There is no native blocking wait tool exposed here. Background agents deliver completion notifications; do not run `sleep`, shell wait loops, or repeated `AgentStatus` calls to fill the gap. Do not invent a wait tool. Without useful concurrent root work, choose foreground execution at launch.

Use `AgentStatus` without arguments only to recover uncertain state or a missing notification, not for polling. Use `StopAgent` with `agent_id` to cancel obsolete or superseded work. Cancellation is not success: inspect partial changes and resolve any remaining scope.

## Shared-worktree validation

During concurrent implementation, workers run focused checks and limit formatting or other mutations to owned files. Report failures caused by a sibling's intermediate changes rather than repairing that scope or repeatedly rerunning the whole suite.

The root owns repository-wide formatting, generation, and final validation after writers finish. If dependent implementation needs generated output earlier, explicitly assign one generator owner and serialize generation with any writers whose files it can change. Repository task names do not imply scoped effects; check what a command modifies before running it concurrently.

## Workflow

Use only roles that materially help; do not spawn every role mechanically. Serialize dependent stages:

1. Gather evidence through exploration, reproduction, or research as needed. Verify external claims before relying on them.
2. Root chooses the implementation direction and assigns bounded worker ownership.
3. Apply the handoff acceptance check and integrate accepted implementation results.
4. Have a tester independent of the implementation validate changed behavior, including the original reproduction path for bugs. For cross-component changes, assign targeted checks through the affected public boundaries—for example request/response handling, raw wire decoding, generated SDK entry points, or rendered UI behavior. Derive expectations from the requirement, not merely the implementation or its generated fixtures. Build success and helper tests alone do not prove end-to-end behavior; report untested paths explicitly.
5. Use an independent reviewer when materially useful, especially for high-risk or non-obvious changes.
6. Resolve findings and perform final verification before reporting completion.

## Blockers and failures

Subagents should report back rather than expand scope when they encounter:

- architectural or security-sensitive decisions, breaking API/schema changes, or new dependencies
- unclear requirements or reasoning blockers requiring broader context
- unexpected changes outside their scope or conflicts with another worker's ownership
- acceptance criteria that require changes outside assigned ownership or cannot be met without a workaround that violates the contract

The root resolves conflicts and chooses whether to narrow, clarify, retry, or reassign work. Inspect and report failures; never claim failed delegation succeeded. If a required worker fails repeatedly, the root may continue directly when reasonable, but must disclose the fallback.

## Completion check

Before claiming completion, confirm:

- every required agent was actually launched and has completed, explicitly failed, or been cancelled with its remaining scope resolved
- no required agent is still running
- delegated changes met their acceptance criteria, handoff exceptions and conflicting findings were resolved, and material review findings were addressed
- the final diff implements the request without unintended changes
- relevant syntax/type checks, targeted tests, integration checks, builds, and original bug reproductions were run or their omission explained
- unresolved risks and validation limitations are recorded

Report changes, verification, and limitations concisely. Provide task descriptions, agent IDs, types, and completion status only when requested. If reporting a model, use only what the tool call or returned metadata confirms.
