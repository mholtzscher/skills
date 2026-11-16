# Planning

Planning produces a proposal, not an implementation.

For a new proposal, choose its depth, follow the sketch or spec section, then seek approval. For an existing spec, follow [refinement](#refine) only.

## Terms

- **Proposal** is the umbrella output: either depth below, before approval.
- **Sketch** is the lightweight depth: intended behavior, focused diff, tradeoff, and verification; it stays in conversation unless a file is useful or requested.
- **Spec** is the file-backed depth: concrete Types, Interfaces, and Layout plus deliverables, acceptance checks, risks, and estimates, written to `specs/<name>.md` via the selected template.

## Choose depth

1. Read the request, existing decisions, and relevant source. Explain the current behavior and ownership briefly.
2. Choose **sketch** for a bounded, understood change with a clear validation path. Choose **spec** for consequential uncertainty, cross-boundary contracts, migration, or substantial scope. A one-line security change can still need a spec. Explain the choice and honor an explicit user selection.

## Sketch

Before drafting the sketch, read and apply the [technical-writing standard](../../references/technical-writing.md). Preserve the sketch's structure and distinguish proposed behavior from current behavior.

For a sketch, show the intended behavior and a focused code/data/file diff, decisive tradeoff, and verification. Use one view from [visual components](../../references/visual-components.md) where it clarifies the change. Label the view as proposed and anchor it to source `file:line`. Resolve consequential unknowns through `question`. Keep the sketch in conversation unless a file is useful or requested.

## Spec

For a spec, use [grilling](../grilling/PLAYBOOK.md) to settle open decisions and [domain-modeling](../domain-modeling/PLAYBOOK.md) when terminology matters or for glossary/decision-record work. These build on one interview rather than asking the same questions again.

Read and follow the [full-spec procedure](references/spec.md) only when the spec depth is selected.

## Approval

Present the complete proposal and ask for approval. **Stop before implementation on both paths.** A request to plan or create a spec ends here. For an ongoing coding task, resume its selected playbook after approval.

Done means the proposal is understandable, acceptance is testable, material unknowns are explicit, and the approval state is accurately reported.

## Refine

Accept an explicit path; use the current known spec when unambiguous. Read the whole spec, relevant source/history, and any recorded approvals.

Before drafting refinement proposals, read and apply the [technical-writing standard](../../references/technical-writing.md). Preserve the spec's template, technical requirements, uncertainty, and open decisions.

1. Identify required behavior, compatibility, security, error invariants, ownership, and implementation contracts before proposing cuts.
2. Use [prose cleanup](../cleanup/PLAYBOOK.md#prose-cleanup) in proposal-only mode for prose and [show-complexity](../show-complexity/PLAYBOOK.md) for design burden. This workflow's approval boundary controls both procedures.
3. Present clarity improvements and viable conservative/aggressive simplifications with focused diffs. Explain what each retains, changes, and loses; do not force alternatives where no safe reduction exists.
4. Ask which proposals to approve. Make no initial edits, including wording-only cleanup.
5. Apply only selected changes. Reconcile types, interfaces, deliverables, and validation affected by semantic changes. Resolve contradictions through dialogue.
6. Check consistency and formatting. Report the actual path, changes, and remaining uncertainties. Suggest implementation when ready.
