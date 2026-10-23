---
name: mstack
description: Michael's engineering workflow bundle. Explicit entry point for planning, implementation, investigation, review, and PR delivery.
disable-model-invocation: true
license: MIT
---

# Mstack

Select the matching playbook and briefly name it. Playbooks define procedures; principles guide decisions. Load supporting files only as needed, resolving relative links from the containing file.

Track the playbook’s completion conditions in a checklist. If no playbook fits, define a task-specific checklist with an explicit deliverable and stopping condition.

For delegation or independent review, read [orchestration](references/orchestration.md).

If an explicit `@mstack` invocation cannot load this entry, report that rather than substituting another skill.

## Playbooks

| Request                                                            | Playbook                                                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| New or changed behavior                                            | [Feature](playbooks/feature/PLAYBOOK.md)                                              |
| Repair a reported defect                                           | [Bug fix](playbooks/bug-fix/PLAYBOOK.md)                                              |
| Behavior-preserving restructuring                                  | [Refactoring](playbooks/refactoring/PLAYBOOK.md)                                      |
| New proposal, sketch or spec                                       | [Planning](playbooks/planning/PLAYBOOK.md)                                            |
| Refine an existing proposal                                        | [Spec refinement](playbooks/planning/PLAYBOOK.md#refine)                              |
| Implement a spec                                                   | [Spec implementation](playbooks/spec-implement/PLAYBOOK.md)                           |
| Read-only investigation of code or architecture                    | [Investigation](#investigation)                                                       |
| Prototype or visual-parity work                                    | [Prototype](playbooks/prototype/PLAYBOOK.md)                                          |
| Performance measurements, fixes, or hillclimbing                   | [Performance](playbooks/performance/PLAYBOOK.md)                                      |
| Diagnose a live symptom or captured trace                          | [Forensics](playbooks/forensics/PLAYBOOK.md)                                          |
| Independent review or blast-radius analysis                        | [Review](playbooks/review/PLAYBOOK.md)                                                |
| Architecture, competing designs, or partitioned exploration        | [Exploration](playbooks/exploration/PLAYBOOK.md)                                      |
| Publish, rewrite, triage, fix feedback, inspect checks, or monitor | [PR workflows](playbooks/pull-requests/PLAYBOOK.md)                                   |
| Explicit stack or merge                                            | [Advanced delivery](playbooks/advanced-delivery/PLAYBOOK.md)                          |
| Long active-session task or project-scale run                      | [Autonomous run](playbooks/autonomous/PLAYBOOK.md)                                    |
| Keep or audit a reviewable decision trail                          | [Decision trail](playbooks/decision-trail/PLAYBOOK.md)                                |
| Resume prior work                                                  | [Pickup](playbooks/continuity/PLAYBOOK.md#pickup)                                     |
| Hand off or pause work                                             | [Pause](playbooks/continuity/PLAYBOOK.md#pause)                                       |
| Create a project verification skill                                | [Create](playbooks/verification-skill/PLAYBOOK.md#create)                             |
| Maintain a project verification skill                              | [Maintain](playbooks/verification-skill/PLAYBOOK.md#maintain)                         |
| Stress-test a proposal through questions                           | [Grilling](playbooks/grilling/PLAYBOOK.md)                                            |
| Clarify domain terms or record a glossary/decision                 | [Domain modeling](playbooks/domain-modeling/PLAYBOOK.md)                              |
| Explain with a diagram or code-shape sketch                        | [Show me](playbooks/show-me/PLAYBOOK.md)                                              |
| Explain in HTML with large visuals and minimal text                | [Big pictures, little words](playbooks/show-me/PLAYBOOK.md#big-pictures-little-words) |
| Walk a reader through a change or data model as a shared tour      | [Tour](playbooks/tour/PLAYBOOK.md)                                                    |
| Assess complexity without changing code                            | [Show complexity](playbooks/show-complexity/PLAYBOOK.md)                              |
| Review recent work and live state                                  | [Recall](playbooks/continuity/PLAYBOOK.md#recall)                                     |
| Retro the current session for skill lessons                        | [Reflect](playbooks/reflect/PLAYBOOK.md)                                              |
| Summarize progress in the current conversation                     | [Catch up](playbooks/continuity/PLAYBOOK.md#catch-up)                                 |
| Clean up the scoped change (code, prose, comments)                 | [Code cleanup](playbooks/cleanup/PLAYBOOK.md#code-cleanup)                            |
| Draft, revise, review, or polish prose                             | [Writing](playbooks/writing/PLAYBOOK.md)                                              |
| Review comment value                                               | [Comments](playbooks/cleanup/PLAYBOOK.md#comment-review)                              |
| Find, apply, or survey project coding standards                    | [Coding standards](playbooks/coding-standards/PLAYBOOK.md)                            |
| Capture lessons about project code as rules or checks              | [Capture](playbooks/coding-standards/PLAYBOOK.md#capture)                             |
| Explain mstack usage or dependencies                               | [Help](playbooks/help/PLAYBOOK.md)                                                    |

## Investigation

Establish the question and the decision it informs. Remain read-only unless the user separately requests an artifact or implementation.

- Runtime mechanics and ownership: use [how](playbooks/explanation/PLAYBOOK.md#how).
- Design rationale and historical constraints: use [why](playbooks/explanation/PLAYBOOK.md#why).
- Choosing between design options: use [Architecture](playbooks/exploration/PLAYBOOK.md#architecture), not Why.
- Timing trends, slow tests, and benchmarks: use [performance](playbooks/performance/PLAYBOOK.md), read-only until implementation is approved.
- A teaching conversation: use [teach](playbooks/explanation/PLAYBOOK.md#teach).
- Essential versus accidental complexity: use [show-complexity](playbooks/show-complexity/PLAYBOOK.md).

Trace the important path, inspect material failure cases, and cite the actual source. Delegate independent deep evidence gathering when useful. Stop once the question has a supported answer or a deciding fact is explicitly unavailable. Recommend a next action only when it follows from the findings; an investigation does not automatically become a prototype, refactor, or PR.

## Shared rules

- **Scope:** Mstack applies to the invoked task. The selected playbook defines its work and stopping condition; reading another file supplies guidance, not authority to start another workflow. Explicit user instructions and repository rules govern the task. Preserve unrelated work and the selected delivery branch.
- **Approval:** Implementation, including code-writing experiments, requires an approved [sketch or spec](playbooks/planning/PLAYBOOK.md). Reuse an agreed sketch, spec, or feedback fix; seek renewed approval when new evidence materially changes the outcome. Read-only investigation, requested planning, and diff inspection need no implementation approval. Keep experiments in isolated, explicitly disposable targets. Before writing code, [find and apply project standards](playbooks/coding-standards/PLAYBOOK.md#apply).
- **Delivery:** Approved coding playbooks authorize scoped commits, pushes, one PR, and required-CI repair. Ordinary delivery stops before merging. Stacks and merging require explicit requests.
- **Completion:** Support completion claims with observed evidence against the requested outcome; use [verification](references/verification.md) for implementation and review. Report unmet requirements and unavailable or unrun checks. When blocked, preserve a resumable state and seek help rather than changing the goal or silently weakening a requirement.

## Principles

Read relevant principles before applying them within the task's scope. Cite each principle that materially changed a decision by name and link, explaining the choice it changed.

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

## Host selection

Before using host-specific tools, identify the host from its available tools and read its adapter:

- **OpenCode V2:** [opencode.md](references/hosts/opencode.md)
- **Pi:** [pi.md](references/hosts/pi.md)

Look up facts; ask the user for consequential decisions. Use structured questions with a recommendation and meaningful alternatives, falling back to conversation when unavailable.
