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

## Writing

Apply this standard to all agent prose during the task: chat replies, progress updates, explanations, plans, reviews, documents, PR descriptions, and commit messages. Match the audience, requested format, and editing scope. Preserve exact quotations, code, commands, citations, technical meaning, requirements, and legitimate uncertainty. Product UI strings follow the product's copy guidelines.

### Write plainly

- **Cut every word that does no work.** Lead with the point. "In order to" is "to". "It is important to note that" is nothing.
- **Use the short, everyday word.** "Use", not "utilize". "Help", not "facilitate". "Do", not "perform". A long word has to buy its length with precision.
- **When a rule makes a sentence worse, fix the sentence another way or leave it alone.** A sentence that follows every rule and sounds like a machine wrote it has failed.

The codebase is the word list. Write the real symbol, file, flag, or command name, not a synonym or a description of it. Use words a developer would say out loud: "move", "delete", "a budget that only decreases", not "evacuate", "ratchet", or "endgame". Define a named pattern on first use. If a recurring offender warrants an addition to the prose-pattern catalog, propose a replacement diff rather than editing the catalog as part of the writing task.

### Vary the rhythm

- Mix sentence lengths on purpose. Short sentences land a point. Longer ones carry a fact with its condition or consequence.
- One thought per sentence does not mean one length per sentence. Split the sentence that carries two thoughts. Keep the long sentence that carries one.
- Have a view when asked for judgment or explanation. Weigh trade-offs instead of only listing pros and cons. Reference material stays factual.
- Be specific over sterile. Not "schema changes can cause issues" but "a column rename fails the build".

### Write sentences to the reader (Google developer style)

- Talk to the reader as "you", in the present tense. Use "will" for things that genuinely happen later. Tutorials can use the shared "we" voice.
- Say who does what: "the compiler checks", not "is checked". Passive is fine when the actor is unknown or beside the point.
- Write instructions as commands: "Click Submit." State facts plainly. Avoid "should be done".
- Put the condition before the instruction: "To delete the document, click Delete."
- Put the common case first and exceptions after.
- Sound like a knowledgeable friend. Avoid buzzwords, figurative language, and "please" in instructions. Never use "simply", "easy", or "quickly" in a procedure.
- Avoid unsupported pre-announcements such as "we will soon support...". Don't start consecutive sentences with the same phrase.
- Link with words that say where the link goes: the page title or a short description, not "click here". Prefer a sentence of local context over a link away.
- Headings carry the point, not just the topic. Use sentence case, bare verb phrases for tasks, and noun phrases for concepts. Documents use one h1 and no skipped heading levels; short replies need no headings.
- Numbered lists are for sequences, bullets for other lists. Introduce a list with a complete sentence and keep items parallel.
- Put code in code font and UI elements in bold. Use serial commas. Drop "etc." and say up front that a list is partial.

### Make statements load one at a time (STE rules)

- Give one instruction per sentence and one thought per sentence elsewhere.
- Split instructions longer than about 20 words and other sentences longer than about 25 when that improves clarity.
- Put warnings and conditions before the step they govern: "If hot oil touches your skin, injuries can occur."
- Keep "the" and "a": "Remove backup file" reads two ways. "Remove the backup file" reads one.
- Give each word one meaning and one job. If "check" means inspect, don't also use it for restrain.
- Pick one word per action and keep it: "start", not "start" here and "initiate" there.
- Write procedures as direct commands rather than passive narration: "Install the component", not "the component must be installed".
- Avoid "-ing" words where a clearer construction exists.

### Leave no sentence open to two readings (Global English)

- Keep "only" and "not" next to the words they change. "Only fails on growth" and "fails only on growth" say different things.
- Break up long noun strings: "the proto import budget check script" becomes "the script that checks the proto-import budget".
- Make every "it", "they", and "this" point at one obvious thing. Repeat the noun when in doubt. Avoid using "this" or "which" to refer vaguely to a whole clause.
- Keep verbs and articles. "Phase 1 moves the converters and Phase 2 the runtime" leaves Phase 2 without a verb.
- Keep small words that show structure, such as "that" in "Ensure that the switch is off". Never trade clarity for word count.
- Repeat the article when it prevents a misread: "the client and the host" when they are two things.
- Make the grouping of "and" or "or" explicit when ambiguous. Use "both...and", "either...or", and "if...then" where helpful.
- Use periods rather than semicolons or em dashes. Turn parenthetical prose into its own grammatical sentence. Never form plurals with "(s)".
- Avoid slashes in prose: write "a, b, or both" rather than "a/b" or "and/or". Keep literal paths, commands, and technical notation intact.
- Call each thing by one name. "The gate", "the ratchet", and "the budget check" for one thing teaches three things. Don't churn what didn't change.
- Skip idioms, colloquialisms, Latin abbreviations, and metaphors.

### Choose a mode for substantial documents (Diátaxis)

Use this structure for substantial documents, not ordinary chat replies, progress updates, PR descriptions, or commit messages. Choose by the reader's purpose:

- Action + learning: **tutorial**.
- Action + work: **how-to**.
- Understanding + work: **reference**.
- Understanding + learning: **explanation**.

**Tutorial.** Open with what the learner will build, not what they will "learn". Every step produces a visible result, early and often. Give expected output, prompt changes, or log lines. Limit explanation to one clause and a link. Stay concrete and use shared commands: "First, do x. Now, do y."

**How-to.** Solve the reader's problem. Assume competence and focus on actions, linking background and teaching material instead of inserting digressions. Allow forks and judgment: "If you want x, do y." Name the guide by the task: "How to calibrate the radar array", not "Radar array calibration".

**Reference.** Describe facts, options, limits, and errors for lookup. Mirror the structure of the thing described and generate from code where possible. Keep instruction, persuasion, and opinion elsewhere. Verify claims before stating them as facts; preserve genuine uncertainty rather than manufacturing certainty.

**Explanation.** Address one bounded why question, readable away from the product. Use titles that tolerate an implicit "About...". Explain decisions, history, constraints, and alternatives. Offer reasoned judgment where useful.

Keep one mode per document where practical. Separate and link reference tables, tutorial steps, and explanatory arguments rather than mixing them. Propose splits that exceed the requested edit scope. Required repository templates and document contracts take precedence.

### Apply the standard within the task

- A PR body is a briefing a reviewer can read in under a minute. Link swarm logs, SHA lists, and metric tables instead of pasting them. Preserve required PR sections and the visual change outline.
- Indent code snippets with tabs where the language and repository permit. Preserve syntax-required indentation. Write real paths. Make count and tree claims true at the documented revision and include the command that regenerates them.
- For drafting, revision, or a deliberate cleanup audit, use [Writing](playbooks/writing/PLAYBOOK.md). Its Polish mode loads the detailed prose-pattern catalog; ordinary output does not require that extra read. Explicit Polish passes remain required where a workflow calls them.
- When creating or editing agent instructions, also use the external `writing-for-agents` skill.

### Worked example

Before:

> Configuration of the proto import ratchet budget script parameters is performed via budget.json. Note that it's important to remember that running with --write, which updates the committed budget to reflect the current count, should only be done when lowering it. If exceeded, CI fails.

After:

> `budget.mjs` reads the committed budget from `budget.json` and counts the files that import protos. If the count exceeds the budget, CI fails. Run `budget.mjs --write` only to lower the budget.

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
