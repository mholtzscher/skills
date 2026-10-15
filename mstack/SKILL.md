---
name: mstack
description: Michael's engineering workflow bundle. Explicit entry point for planning, implementation, investigation, review, and PR delivery.
disable-model-invocation: true
license: MIT
---

# Mstack

Select the matching playbook and follow its instructions. State the selected path briefly. Keep a checklist for substantial work, with completion conditions from that playbook. Load supporting playbooks only when needed.

## Playbooks

| Request                                                     | Playbook                                            |
| ----------------------------------------------------------- | --------------------------------------------------- |
| New or changed behavior                                     | [Feature](playbooks/feature.md)                     |
| Reported defect                                             | [Bug fix](playbooks/bug-fix.md)                     |
| Behavior-preserving restructuring                           | [Refactoring](playbooks/refactoring.md)             |
| Small implementation sketch or full spec                    | [Planning](playbooks/planning.md)                   |
| Create an implementation-ready spec                         | [Full spec](playbooks/planning.md#full-spec)        |
| Refine an existing proposal                                 | [Spec refinement](playbooks/planning.md#refine)     |
| Implement an approved spec                                  | [Spec implementation](playbooks/spec-implement.md)  |
| Read-only question or architecture explanation              | [Investigation](#investigation)                     |
| Prototype or visual-parity work                             | [Prototype](playbooks/prototype.md)                 |
| Performance fix or sustained metric improvement             | [Performance](playbooks/performance.md)             |
| Live runtime symptom or captured trace                      | [Forensics](playbooks/forensics.md)                 |
| Independent review or blast-radius analysis                 | [Review](playbooks/review.md)                       |
| Architecture, competing designs, or partitioned exploration | [Exploration](playbooks/exploration.md)             |
| Publish, rewrite, triage, fix feedback, or inspect checks   | [PR workflows](#pr-workflows)                       |
| Explicit stack or merge                                     | [Advanced delivery](playbooks/advanced-delivery.md) |
| Long active-session task or project-scale run               | [Autonomous run](playbooks/autonomous.md)           |
| Resume prior work                                           | [Pickup](playbooks/continuity.md#pickup)            |
| Hand off or pause work                                      | [Pause](playbooks/continuity.md#pause)              |
| Author/evaluate a skill or capture workflow lessons         | [Skill development](playbooks/skill-development.md) |
| Stress-test a proposal through questions                    | [Grilling](playbooks/grilling.md)                   |
| Clarify domain terms or record a glossary/decision          | [Domain modeling](playbooks/domain-modeling.md)     |
| Explain with a diagram or code-shape sketch                 | [Show me](playbooks/show-me.md)                     |
| Assess essential and accidental complexity                  | [Show complexity](playbooks/show-complexity.md)     |
| Reconstruct prior session context                           | [Recall](playbooks/continuity.md#recall)            |
| Summarize progress in the current conversation              | [Catch up](playbooks/continuity.md#catch-up)        |
| Clean up code                                               | [Code cleanup](playbooks/cleanup.md#code-cleanup)   |
| Improve prose                                               | [Prose cleanup](playbooks/cleanup.md#prose-cleanup) |
| Review comment value                                        | [Comments](playbooks/cleanup.md#comment-review)     |
| Explain mstack usage or dependencies                        | [Help](playbooks/help.md)                           |

Mstack is the single entry point. Playbooks supply task procedures; principles guide decisions; roles name bounded assignments when delegating. Read playbooks as task instructions, with the shared rules already in context.

If no playbook fits, assemble the smallest task-specific checklist from the shared rules, with an explicit deliverable and stopping condition. Ask about consequential intent rather than inventing a broader mission. Setup and dependency help live in the [bundle guide](README.md).

## Investigation

Establish the question and the decision it informs. Remain read-only unless the user separately requests an artifact or implementation.

- Runtime mechanics and ownership: use [how](playbooks/explanation.md#how).
- Design rationale and historical constraints: use [why](playbooks/explanation.md#why).
- A teaching conversation: use [teach](playbooks/explanation.md#teach).
- Essential versus accidental complexity: use [show-complexity](playbooks/show-complexity.md).

Trace the important path, inspect material failure cases, and cite the actual source. Delegate independent deep evidence gathering when useful. Stop once the question has a supported answer or a deciding fact is explicitly unavailable. Recommend a next action only when it follows from the findings; an investigation does not automatically become a prototype, refactor, or PR.

## PR workflows

Select the requested intent; these are independently selectable operations, not enforced stages.

| Request                                  | Procedure                                              |
| ---------------------------------------- | ------------------------------------------------------ |
| Commit, push, create/update a PR         | [Publish](playbooks/pull-requests.md#publish)          |
| Rewrite title and description only       | [Rewrite](playbooks/pull-requests.md#rewrite-metadata) |
| Evaluate unresolved inline feedback      | [Triage](playbooks/pull-requests.md#triage-feedback)   |
| Apply agreed feedback and settle threads | [Fix](playbooks/pull-requests.md#fix-agreed-feedback)  |
| Inspect checks now                       | [Checks](playbooks/pull-requests.md#inspect-checks)    |
| Monitor after publication without edits  | [Watch](playbooks/pull-requests.md#watch)              |

# Mstack shared rules

Mstack applies to the task for which it was invoked. The selected playbook determines the work and its completion condition. Reading another bundled file supplies guidance, not permission to start that file's workflow. Explicit user instructions and repository rules govern the task.

## Scope and approval

For implementation, inspect first and choose one planning path by uncertainty, impact, and scope. Explain the choice briefly; the user can override it.

- **Sketch:** show the intended behavior, affected code/data/file shape, and verification in a compact proposal. Wait for approval before implementation.
- **Spec:** resolve consequential questions through dialogue, write a concrete implementation contract, and wait for approval before implementation.

Approval of an already-discussed sketch, spec, or feedback fix satisfies this gate. Reuse that agreement rather than restarting the interview. Reopen a decision when new evidence materially changes the agreed outcome. Read-only investigation, drafting the requested plan, and inspecting an existing diff do not require implementation approval. An experiment that writes code needs an approved sketch too; use an isolated, explicitly disposable target.

After implementation approval, coding playbooks authorize scoped commits, pushes, and PR creation/update, including fixes to required CI. Ordinary delivery is one PR and stops before merging. Stacked delivery and merging require explicit requests. Preserve unrelated work and the selected delivery branch. Missing access or a materially different outcome needs help, rather than a workaround that changes the goal.

## Questions and communication

Look up observable facts. Ask the user for product intent, preferences, or consequential tradeoffs. Use the host's structured question tool; give a recommendation and meaningful alternatives. If unavailable, ask the same focused questions in the conversation and wait. Use Plannotator/Inbox when requested or when an artifact benefits from that review surface, not as a mandatory dependency.

Use focused diffs, trees, or pseudocode to explain proposed changes. Lead with the result or decision. Separate observed evidence, inference, and unresolved questions. Do not turn a brief explanation into a report of every tool call.

## Principles

Consult the [principle index](#principles) for the task's relevant principles and read those leaf files before applying them. In the response, cite each principle that materially changed a decision and name the specific choice it changed. A list of slogans is not evidence. Do not claim to have applied an unread principle.

Read only the leaves that apply. Cite a principle by name and link when it materially changes your choice, explaining that choice. These are contextual decision rules, not permission to expand scope.

| When deciding                                        | Read                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| Core data, states, signatures, or ownership          | [Model the domain](principles/model-the-domain.md)           |
| Validation, errors, framework or network adapters    | [Boundary discipline](principles/boundary-discipline.md)     |
| Refactoring, abstraction, deletion, or reader burden | [Minimize reader load](principles/minimize-reader-load.md)   |
| Integrating a requirement or repeating failed fixes  | [Question the premise](principles/question-the-premise.md)   |
| User-visible behavior and product tradeoffs          | [Experience first](principles/experience-first.md)           |
| Novel designs with consequential uncertainty         | [Explore alternatives](principles/explore-alternatives.md)   |
| Declaring a task complete                            | [Prove it works](principles/prove-it-works.md)               |
| Designing or judging tests                           | [Test behavior](principles/test-behavior.md)                 |
| Benchmarks, performance claims, or eval scores       | [Explain the number](principles/explain-the-number.md)       |
| Multi-step work, commits, migrations, or stacks      | [Verifiable units](principles/verifiable-units.md)           |
| Parallel writers or shared mutable state             | [Separate ownership](principles/separate-ownership.md)       |
| Large evidence, exploration, or handoffs             | [Guard context](principles/guard-context.md)                 |
| Retryable commands and partial failure               | [Idempotent operations](principles/idempotent-operations.md) |
| Recurring mistakes or repeated manual work           | [Encode lessons](principles/encode-lessons.md)               |

## Execution and completion

Read [orchestration](references/orchestration.md) when delegation or independent review is useful. Keep coupled implementation with one writer; delegate independent work and accept its evidence yourself. Use host-configured roles and models. Mstack has no model sheet or mandatory setup step.

Read [host selection](#host-selection) before using host-specific questions, delegation, history, or review tooling. Tool schemas in the current session take precedence over documented examples. Skill instructions describe conduct; enforced permissions belong to the host.

Verify the actual behavior at the relevant boundary. Report commands and outcomes, including unavailable or unrun checks. Compilation and an agent's completion message alone do not prove the requested behavior. Use [verification](references/verification.md) for implementation and review.

Before publication, run all three [cleanup passes](playbooks/cleanup.md#before-publication): code, prose, and comments. Apply accepted, behavior-preserving cleanup within scope and reverify affected behavior. Structural or semantic changes outside the approved design return to approval.

When blocked, name the unmet requirement and preserve a resumable state. A failed optional delegate can be replaced by direct work where sound, with the loss of independence stated. An explicit independent-review or parallel-execution requirement remains blocked until satisfied or the user changes it.

## Host selection

Identify the host from its actual tools, not from the project being edited.

- **OpenCode V2:** read [opencode.md](references/hosts/opencode.md).
- **Pi:** read [pi.md](references/hosts/pi.md).

The workflows share the same policy. These adapters supply tool syntax and capability limits. Use available file/search/shell tools for ordinary operations. Bun and authenticated `gh` run on the agent's execution machine, which may differ from the UI machine.

Discover optional skills by their registered names and actual installed paths. Browser/terminal verification may use `agent-browser` or `terminal-control`; Go work may use `service-design` or `go-test-effectiveness`; skill authoring may use `skill-creator` and `writing-for-agents`. These are external specialists, not bundled dependencies required at startup. When a particular task requires an unavailable capability, report that gap.

## Bundle paths

Resolve links from the containing file, using the installed skill's absolute path. Install the whole bundle: `SKILL.md` uses `playbooks/`, `principles/`, `references/`, and `scripts/`. Load only the files needed for the current task.
