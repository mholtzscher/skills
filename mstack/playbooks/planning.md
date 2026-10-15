# Planning

Planning produces a proposal, not an implementation.

For a new proposal, choose its depth, follow the sketch or full-spec section, then seek approval. For an existing spec, follow [refinement](#refine) only.

## Choose depth

1. Read the request, existing decisions, repository instructions, and relevant source. Explain the current behavior and ownership briefly.
2. Choose **sketch** for a bounded, understood change with a clear validation path. Choose **spec** for consequential uncertainty, cross-boundary contracts, migration, or substantial scope. A one-line security change can still need a spec. Explain the choice and honor an explicit user selection.

## Sketch

For a sketch, show the intended behavior and a focused code/data/file diff, decisive tradeoff, and verification. Resolve consequential unknowns through the host question tool. Keep the sketch in conversation unless a file is useful or requested.

## Full spec

For a full spec, use [grilling](grilling.md) to settle open decisions, [domain-modeling](domain-modeling.md) when terminology matters, and [spec planning](#clarify-and-discover) to write the implementation contract. These build on one interview rather than asking the same questions again.

Adapted from Michael Holtzscher's spec-planner. This is the full-spec section; the small-change path lives in [sketch](#sketch).

### Clarify and discover

Read existing decisions before asking questions. Have at least one real exchange about intent or consequential choices; an earlier grilling round in this conversation counts. Use [grilling](grilling.md) for unresolved branches. Understand motivation, scope, constraints, edge cases, and the outcome that would justify the work.

Inspect current types, ownership, callers, package layout, and integration boundaries. Verify version-specific facts from authoritative documentation when they affect the design. Briefly explain the current architecture before proposing its replacement. Use [domain-modeling](domain-modeling.md) when terms or domain boundaries need work.

### Draft the contract

Use [spec format](../references/planning/spec-format.md). Compare credible alternatives using [decision guidance](../references/planning/decisions.md), then recommend one with its decisive tradeoff.

An implementation-ready spec includes:

- The problem, bounded scope, and chosen behavior.
- Concrete new/changed types with fields, constraints, and ownership.
- Interfaces with inputs, outputs, error cases, side effects, and compatibility needs.
- A nested file/package tree marking new, modified, or moved paths and their responsibilities.
- Stable deliverable IDs, outcomes, owning paths, dependencies, and acceptance IDs. Include shared infrastructure and integration work.
- A validation plan for each acceptance criterion: boundary to exercise, expected result, command/procedure when known, and required access. Label unknown commands for discovery rather than inventing them.
- Material risks, migration work, alternatives, and unresolved decisions with owners.

Show changes to existing code shape as focused `diff` blocks. Use ordinary language-tagged blocks for wholly new definitions. If a type/interface/layout category is unchanged or inapplicable, explain that briefly. Keep enough detail to implement, without writing the whole implementation in the spec.

### Refine and approve

Check every deliverable maps to ownership, dependencies, and an observable acceptance condition. Resolve contradictory terms, missing boundaries, and unstated compatibility expectations through dialogue. Estimate only when useful and distinguish uncertainty from a promise.

Write the requested path, or default to `specs/<descriptive-name>.md`. Paths may be nested or outside that directory when explicitly supplied. Creating the requested spec is permitted planning work. Present the spec and its consequential choices, then wait for explicit approval. Report its actual path and open decisions. Suggest implementation only when ready; do not start it as a consequence of finishing the document.

## Approval

Present the complete proposal and ask for approval. **Stop before implementation on both paths.** A request to plan or create a spec ends here. For an ongoing coding task, resume its selected playbook after approval.

Done means the proposal is understandable, acceptance is testable, material unknowns are explicit, and the approval state is accurately reported. Suggested next workflows are suggestions, not automatic transitions.

## Refine

Accept an explicit path; use the current known spec when unambiguous. Read the whole spec, relevant source/history, and any recorded approvals.

1. Identify required behavior, compatibility, security, error invariants, ownership, and implementation contracts before proposing cuts.
2. Use [prose cleanup](cleanup.md#prose-cleanup) in proposal-only mode for prose and [show-complexity](show-complexity.md) for design burden. This workflow's approval boundary controls both procedures.
3. Present clarity improvements and viable conservative/aggressive simplifications with focused diffs. Explain what each retains, changes, and loses; do not force alternatives where no safe reduction exists.
4. Ask which proposals to approve. Make no initial edits, including wording-only cleanup.
5. Apply only selected changes. Reconcile types, interfaces, deliverables, and validation affected by semantic changes. Resolve contradictions through dialogue.
6. Check consistency and formatting. Report the actual path, changes, and remaining uncertainties. Suggest implementation when ready; do not automatically implement or publish the revised spec.
