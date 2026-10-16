# Question the premise

## Integrate a requirement into the whole design

When integrating a new requirement, read all affected files and understand the current design. Ask, "if we were writing this from scratch with this new requirement, what would we build?" Treat the requirement as a foundational assumption rather than adding another special case to the existing design.

Think through the whole coherent design, then deliver it incrementally. Propagate the change through every affected reference, including types, docs, examples, and rationale sections. Compare that shape with a local patch, accounting for agreed scope and migration cost. This preserves future design choices without making a small requirement permission for an unrelated rewrite. A materially larger redesign needs a revised approved sketch or spec.

## Test the shared premise before another fix

When two or more fixes that share one premise fail the same gate, suspect the premise rather than producing another fix that assumes it. Each failure is evidence about that assumption.

1. Write down the premise in one sentence. Name the assumption every failed fix shared.
2. Before the next fix, take a census of the imbalance per actor. Identify all relevant actors and state. An aggregate total says how much imbalance exists, but the census shows who holds it. Retain the counts and enough method and run context to interpret them.
3. Read the skew across runs. If the same few actors hold most of the imbalance every time, find what assigns them that role. The assignment becomes the next "why" in the root-cause investigation.
4. Consider removing the asymmetry rather than compensating for it. Rotate the role between actors, randomize its assignment, or move the role so that no actor holds it on every run. A return path, shared pool, batched hand-off, or periodic rebalance may leave the assignment intact and add work on every run. Compare the actual mechanisms before choosing within approved scope.

Do not start another speculative fix until the premise is written and the census exists. Reuse existing census tools. Make the census rerunnable when that materially improves the evidence, following [Encode lessons](encode-lessons.md#make-work-rerunnable). New code still needs implementation approval. An unavailable census stops speculative fixes; it does not authorize writing a tool without agreement.

If the census is even across actors, stop pursuing the demonstrated actor-concentration explanation and look elsewhere. Keep the census as evidence. An even census rules out that explanation for the observed runs, not every possible premise or cause.

This diagnostic questions a fact the current design assumes. The requirement-driven redesign above asks what to build given a new fact.

## Fix the cause rather than concealing the symptom

Reproduce the failure first. Ask why until the mechanism explains it. Symptom fixes accumulate workarounds while leaving the bug in place. A nil check that only silences a crash is not a root-cause fix. Legitimate boundary guards remain necessary when they enforce the actual contract.

Search for the pattern as well as the instance. Inspect sibling modules and callers for the same mechanism. Fix equivalent instances within the approved fix scope and surface additional work rather than expanding authority. When stuck, instrument the path and read the actual error instead of guessing. New instrumentation follows the existing code-approval gate.

A workaround needing a paragraph-long comment is a diagnostic to investigate its design, not proof the code is wrong. Preserve useful rationale and uncertain constraints while checking them.

For a failure after restart, suspect stale persistent state before changing code. Inspect config files, caches, lock files, and serialized state. If an authorized experiment clearing owned disposable state restores behavior, prioritize state validation and reconciliation as the likely fix. Preserve the original evidence. Clearing state is not itself a durable fix, and this diagnostic grants no permission to delete user, shared, or production state.
