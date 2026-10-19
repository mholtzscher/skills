# Model the domain

## Choose the structure before the logic

Name the data shape before writing the logic. Define core types early, trace every important access pattern, and choose structures that match the dominant reads and writes. Map each important type and interface to its owner. A structure that matches the domain can remove branches and invalid states.

Reach for the smallest structure that fits:

- Use a state machine for meaningful states and transitions instead of scattered booleans, phases, and lifecycle checks.
- Use a typed model instead of loose parameters and repeated shape assumptions.
- Use a map, registry, lookup table, or discriminated union instead of branching spread across files.
- Use a reducer or command/event model instead of ad hoc state mutations.
- Organize a module around one body of domain knowledge. A sequence such as load, validate, transform, and save describes execution order, not ownership. Phase-named modules can scatter the same domain rule across steps.
- Use a small module boundary to gather repeated behavior, ownership, or invariants.
- Choose a queue, cache, index, graph, tree, or normalized collection when the access pattern calls for it.

When none fits, identify what the code must never allow and how the data gets read. Find the structure that expresses exactly those requirements. A feature extending an existing if/else chain, a second boolean that must stay synchronized with the first, or repeated rules across temporal phases should prompt this investigation.

Keep boring code when its shape is clear, local, and unlikely to grow. An abstraction must remove a real ambiguity, repeated decision, duplicated rule, invalid state, branch burden, or lifecycle risk to justify its indirection. Types and data models should converge, but three similar statements can be clearer than a premature abstraction.

Before actors share state, ask what happens if another actor modifies it concurrently. If that can affect correctness, consider isolation through [Separate ownership](separate-ownership.md).

## Construct valid states

Use sum types, such as discriminated unions, enums with payloads, and sealed classes, when a bag of optional fields admits contradictions. `{ completed: boolean; completedAt?: Date }` allows `completed: true` with no date. Derive the boolean from `completedAt` when that expresses the contract, or model `{ kind: 'open' } | { kind: 'done'; at: Date }`. A comment explaining which field combinations are valid is a reason to consider a sum type.

Build the type from the values you need instead of repeatedly carving valid cases out of a looser shape. A non-empty list is a head plus a rest. A time range can be a start plus a duration, provided construction validates the duration against the contract, including its sign, finiteness, and bounds where relevant. A plain numeric duration does not make every range valid. Expose the interface callers need over the construction.

Strengthen types where partiality or plausible misuse appears, then stop. A runtime assertion, null check, or "this should never happen" throw may mark a type that is too weak. Move the deciding constraint into construction where useful. Prefer total functions. `sum` of an empty list is 0, so it takes a plain list. `head` has no result for an empty list, so it needs a non-empty list or an explicit empty-result case. If a function is already total and no plausible mix-up remains, keep the plain type rather than narrowing every field.

## Distinguish semantic values where risk warrants it

`UserId` and `OrderId` may both be strings underneath. Give them distinct types when interchanging them is a plausible defect or construction would remove repeated validation. A branded intersection in TypeScript or a newtype elsewhere can express the distinction. Validate at creation and use that contract downstream. Two primitive arguments with different meanings warrant examination, not an automatic requirement to brand every argument.

## Let the compiler check variants and schema changes

A match on a sum type should expose a missing case when a new variant is added. Use the language's exhaustiveness mechanism, such as a `never`-typed binding in TypeScript, an unannotated `match` in Rust, `-Wincomplete-patterns` in Haskell with the warning enforced by the project's build policy, or sealed-class match exhaustiveness in Kotlin. The compiler should identify the places that need the new case rather than leaving a default branch to conceal it.

Derive types from the authoritative shape when one exists. A protocol buffer, OpenAPI spec, GraphQL schema, database migration, or design-token file should not acquire a hand-maintained shadow definition. Use [Encode lessons](encode-lessons.md#encode-a-recurring-constraint) when generation or checks can enforce agreement.

External parsing and unsafe assertions belong to [Boundary discipline](boundary-discipline.md#parse-external-data-without-lying-to-the-compiler). A cast does not establish correctness.
