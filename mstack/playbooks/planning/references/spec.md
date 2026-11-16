# Full-spec procedure

### Workflow Phases

```
CLARIFY ──[user responds]──► DISCOVER ──[done]──► DRAFT ──[complete]──► REFINE ──[approved]──► DONE
   │                            │                   │                      │
   └──[still ambiguous]──◄──────┴───────────────────┴────[gaps found]──────┘
```

**State phase at end of every response while following the spec path:**

```
---
Phase: CLARIFY | Waiting for: answers to questions 1-4
```

---

### Phase 1: CLARIFY (Mandatory)

**Hard rule:** No spec until user has responded to at least one round of questions. Read existing decisions first; an earlier clarification or grilling round in this conversation counts. Reuse settled answers rather than restarting the interview.

1. Identify gaps in: scope, motivation, constraints, edge cases, success criteria, and expected implementation shape
2. Ask 2-4 pointed questions that would change the approach. Use `question` when available; otherwise ask in conversation.
3. **Wait for responses**

| Category       | Example                                                  |
| -------------- | -------------------------------------------------------- |
| Scope          | "Share where? Social media? Direct link? Embed?"         |
| Motivation     | "What user problem are we actually solving?"             |
| Constraints    | "Does this need to work with existing privacy settings?" |
| Success        | "How will we know this worked?"                          |
| Implementation | "Which types, boundaries, or modules will change?"       |

**Escape prevention:** For a new interview, even if the request seems complete, ask 2+ clarifying questions. Skip only for mechanical requests (e.g., "rename X to Y").

**Anti-patterns to resist:**

- "Just give me a rough plan" → Still needs scope questions
- "I'll figure out the details" → Those details ARE the spec
- Very long initial request → Longer ≠ clearer; probe assumptions

**Transition:** User answered AND no new ambiguities → DISCOVER

---

### Phase 2: DISCOVER

Explore directly by default using file and search tools. Identify key files, abstractions, patterns, integration points, types, interfaces, and project-layout constraints.

For delegated discovery, check available agents and the actual tool schema. Use [orchestration](../../../references/orchestration.md). Assign bounded read-only discovery tasks. Launch independent tasks separately in the background, wait for results before dependent steps, and consume results before drafting.

| Target             | What to Find                                       |
| ------------------ | -------------------------------------------------- |
| Affected area      | Files and modules that will change                 |
| Existing patterns  | How similar features are implemented               |
| Types              | Domain, API, persistence, and configuration shapes |
| Interfaces         | Signatures, endpoints, events, errors, and callers |
| Project layout     | Package boundaries, file ownership, and naming     |
| Integration points | APIs, events, and data flows touched               |

**If unfamiliar tech is involved**, use available web search with 2-4 varied queries and fetch authoritative documentation. Follow applicable tool/documentation policies and report unavailable research capabilities. Return the recommended approach, gotchas, and production patterns with source evidence; distinguish verified facts from assumptions.

**Output:** Brief architecture summary before proposing solutions, including current type, interface, and project-layout constraints.

**Transition:** System context understood → DRAFT

---

### Phase 3: DRAFT

Before drafting, read and apply the [technical-writing standard](../../../references/technical-writing.md). Preserve the selected template, use consistent terms and explicit conditions, and distinguish proposed behavior from current behavior. Keep uncertainty and open decisions visible.

Apply planning framework from [decision-frameworks.md](decision-frameworks.md):

1. **Problem Definition** — What are we solving? For whom? Cost of not solving?
2. **Constraints Inventory** — Time, system, knowledge, scope ceiling
3. **Solution Space** — Simplest → Balanced → Full engineering solution
4. **Trade-off Analysis** — See table format in references
5. **Recommendation** — One clear choice with reasoning

#### Define the implementation contract

Every implementation-ready spec must make these three parts concrete:

1. **Types** — Define new and changed domain, API, persistence, event, and configuration shapes, including constraints and ownership.
2. **Interfaces** — Define boundaries between components: signatures or protocols, inputs, outputs, errors, side effects, and compatibility needs.
3. **Project layout** — Show the proposed file/package tree as a nested directory tree, identify files to create or modify, and state each module's responsibility.

Use the project's implementation language when known; otherwise use precise pseudocode. For changes to existing code,
show the implementation shape as focused unified `diff` blocks: enough surrounding context to locate the change, but no
unrelated code. For entirely new files or definitions with no useful before-state, use a normal language-tagged code
block. Include only relevant definitions, but do not replace them with prose such as "add a request object." Render
project-layout changes as a nested `text` directory tree, marking each path as new, modify, or move and stating its
responsibility. If one part is unchanged or genuinely not applicable, say so and explain why instead of silently
omitting it. Map each new type and interface to an owning path and deliverable. Where a view clarifies Types, Interfaces, or Layout, use the components and legend in [visual components](../../../references/visual-components.md). Label views as proposed and anchor them to source and spec paths.

```text
src/
├── api/
│   └── widget_handler.go    # modify — validates and serves widget requests
└── widgets/
    ├── service.go           # new — owns widget creation rules
    └── repository.go        # modify — persists widget records
```

Define each deliverable with a stable ID, a concrete outcome, owning file/package paths, dependencies, and references to its testable acceptance criteria. Include shared infrastructure and integration checks in those mappings so delegation does not leave required work unowned. Keep this information in the existing spec; the execution orchestrator decides agent assignments and scheduling, not the planner.

For each acceptance criterion, specify how an implementer can check it: the behavior or boundary to exercise, the expected result, and a concrete command or manual procedure when known. Cover the main success path and material failure or regression paths. Distinguish checks the implementer can run locally from those requiring external access or a deployed environment. Do not invent commands; mark unknown commands for discovery during implementation and explain what must be checked.

#### Select the output template

Choose the format for the current proposal, then read only its template:

- [Quick decision](templates/quick-decision.md) for scoped technical choices.
- [Feature plan](templates/feature-plan.md) for new feature development.
- [ADR](templates/adr.md) for architecture decisions.
- [RFC](templates/rfc.md) for larger proposals.

Write the draft to the explicitly requested path, or default to `specs/<descriptive-name>.md`, and mark its approval state accurately. Use established repository conventions for durable ADRs.

**Transition:** Spec produced → REFINE

---

### Phase 4: REFINE

Run completeness check:

| Criterion              | Check                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------ |
| Scope bounded          | Every deliverable listed; non-goals explicit                                         |
| Ambiguity resolved     | No "TBD" or "to be determined"                                                       |
| Acceptance testable    | Each criterion pass/fail verifiable                                                  |
| Validation traceable   | Each acceptance criterion has a check; checks that cannot run locally are identified |
| Deliverables traceable | Each ID maps to an outcome, owning paths, dependencies, and acceptance criteria      |
| Dependencies ordered   | Clear what blocks what                                                               |
| Types concrete         | Fields, value types, constraints, and ownership defined                              |
| Interfaces concrete    | Inputs, outputs, errors, and side effects defined                                    |
| Layout explicit        | Proposed paths and module responsibilities shown                                     |
| Shape traceable        | Types/interfaces map to paths and deliverables                                       |
| Effort estimated       | Each deliverable has S/M/L/XL                                                        |
| Risks identified       | At least 2 risks with mitigations                                                    |
| Open questions         | Resolved OR assigned owner                                                           |

**If any criterion fails:** Return to dialogue. "To finalize, I need clarity on: [failing criteria]."

Present the written spec and its consequential choices, then wait for explicit approval. Assigned open questions must be non-blocking; unresolved implementation-contract choices return to clarification. Estimates express uncertainty rather than promises; use the [estimation guidance](estimation.md).

**Transition:** All criteria pass + user approval → DONE

---

### Phase 5: DONE

After approval, read the [handoff template](templates/handoff.md) for the task-decomposition handoff.

#### Final Output

When reporting the approved, completed spec, read and use the [final-response template](templates/final-response.md).

#### Write Spec to File (MANDATORY)

1. Derive filename from feature/decision name (kebab-case) when no path was supplied.
2. Write or finalize the spec at the explicitly requested path, or default to `specs/<filename>.md`. Explicit paths may be nested or outside that directory.
3. Confirm: `Spec written to: <actual path>`

---

### Effort Estimates

| Size   | Time      | Scope                              |
| ------ | --------- | ---------------------------------- |
| **S**  | <1 hour   | Single file, isolated change       |
| **M**  | 1-3 hours | Few files, contained feature       |
| **L**  | 1-2 days  | Cross-cutting, multiple components |
| **XL** | >2 days   | Major refactor, new system         |

### Scope Control

When scope creeps:

1. **Name it:** "That's scope expansion. Let's finish X first."
2. **Park it:** "Added to Open Questions. Revisit after core spec stable."
3. **Cost it:** "Adding Y changes effort from M to XL. Worth it?"

### References

| File                                   | When to Read               |
| -------------------------------------- | -------------------------- |
| [technical-debt.md](technical-debt.md) | Evaluating refactoring ROI |
