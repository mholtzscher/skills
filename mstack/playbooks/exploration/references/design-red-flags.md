# Design red flags

Screen every actual candidate before architecture synthesis. Each red flag prompts investigation of concrete behavioral or maintainability harm before requiring revision or rejection. Describe the caller coordination, duplicated rule, hidden state, or change burden that matters to the actual goal. A preferred shape, size threshold, or hypothetical future caller alone is not a blocker. Read [Minimize reader load](../../../principles/minimize-reader-load.md).

Assume a contributor sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Distinguish confirmed source callers and behavior from proposed future usage and design hypotheses. Screening proposes a better shape; it does not authorize implementation, wholesale deletion, or a new migration.

## Shallow module

A shallow module exposes a large interface while hiding little complexity. Judge depth by capability and policy hidden behind the public interface relative to its size. Prefer a simple interface backed by substantial behavior.

A deep module is not a deep call chain. A deep call chain scatters understanding across layers. A deep module concentrates capability behind one interface.

Look for these signs:

- Callers coordinate several methods to complete one operation.
- Public options expose internal stages or implementation choices.
- Learning the interface does not save the caller from learning the implementation.

Trace the actual coordination burden before proposing interface compression. A complex implementation can be appropriate when the boundary makes callers simpler.

## Information leakage

Information leakage makes multiple modules depend on the same internal decision. A representation, policy, or protocol detail appears in more than one place, so changing it requires coordinated edits.

Public re-exports of transport or wire types can leak those decisions. Parse external data into domain types behind the interface. Keep storage schemas, framework objects, and protocol details private where the boundary owns them. Preserve genuine supported external contracts and legitimate protocol adapters; identify the actual duplicated decision rather than condemning every external-type reference.

## Temporal decomposition

Temporal decomposition organizes modules by execution order instead of the knowledge they own. Separate load, validate, transform, and save stages often repeat one representation and its invariants across boundaries.

Group code around domain knowledge and ownership. Methods running at different times can belong to one module when they protect the same decisions. Show the repeated rule or coordination cost before requiring a reshape. A legitimate independently owned stage need not disappear merely because it has a phase name.

## Pass-through method

A pass-through method forwards the same arguments to another method with the same shape. It adds a layer without hiding complexity.

Propose removing it or moving responsibility to the module that can complete the operation. Keep a forwarding boundary when it adds policy, adaptation, a distinct abstraction, or genuine supported compatibility. Name what that boundary contributes and the cost of retaining or removing it.

## Split ownership

More than one module writes the same state or keeps its own copy. A contributor editing one writer may not see the others, so their rules diverge.

Give each piece of state one owner. Other modules read it or ask that owner to change it. If actors publish independent facts, consider separate owned state and a merge at the read boundary, per [Separate ownership](../../../principles/separate-ownership.md). Show actual conflicting mutation or synchronization burden rather than assuming all shared reads are shared ownership.

## Two ways to do one task

The design supports more than one way to do the same task. A contributor copies whichever example it finds first, so both ways keep gaining callers.

Prefer one internal path. For an approved internal migration, move every caller and delete the superseded path in the same wave. Preserve supported external compatibility and unrelated work. A necessary temporary adapter needs an owner and removal condition. Establish that the tasks and contracts really are the same before proposing consolidation. Retain behavior pins for an authorized migration; a report-only review proposes changes rather than deleting code.

## Importable internals

A caller can import a module's internals. A contributor takes the shortest path that compiles, so those imports can turn internals into an accidental interface.

Where the language and project tools support it, propose making internals unreachable from outside the module so an external import fails the build. Verify the actual enforcement. A private-looking name or directory alone is not build enforcement. If tools cannot enforce it, report that limit and the remaining exposure instead of claiming protection. New build or lint checks still need implementation authority. Preserve intended public exports and genuine compatibility needs.

## Hand-synced list

Two or more places list the same items, and adding an item means editing every list. A contributor seeing only one list may update only that copy.

Keep one authoritative list and derive the others. If derivation is not feasible, propose a build check that fails when the lists disagree. Identify the invariant, authoritative definition, and supported exception before proposing generation or validation. Creating that check or changing callers requires applicable implementation authority. A proposed check is not an enforced property until it exists and its failure behavior has been verified.
