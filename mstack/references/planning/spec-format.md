# Spec format

Adapt the following outline to the problem. Keep the contract and traceability, not empty headings.

```text
# Feature or decision
Problem and desired outcome
Scope and meaningful exclusions
Recommendation and decisive tradeoffs
Types (focused diff or new definitions)
Interfaces (inputs, outputs, errors, side effects)
Project layout (nested tree, responsibility per path)
Deliverables: ID | outcome | owning paths | dependencies | acceptance IDs
Acceptance: ID | observable behavior | expected outcome
Validation: acceptance ID | boundary/check | command/procedure | prerequisites
Migration and compatibility
Material risks and unresolved decisions
Approval status
```

Use stable `D1`, `D2`, and `A1`, `A2` references so execution can track acceptance without inventing a separate task database. Map new types and interfaces to an owning path and deliverable.

For a short decision, a paragraph covering the choice, why, tradeoff, and revisit condition is enough. If it authorizes implementation, include the affected code shape and validation, then obtain approval. An ADR records a durable decision; a spec describes the implementation contract. Use the [domain record formats](domain-records.md) for glossaries and ADRs.
