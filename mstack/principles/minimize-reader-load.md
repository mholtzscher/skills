# Minimize reader load

## Count layers and hidden state separately

Maintainability is the work a reader needs to understand the code. Track two independent axes, the layers between a question and its answer, and the hidden or mutable state a reader must hold in mind. A flat file with 50 globals can be as hard to reason about as a 6-layer adapter stack. Line count, cyclomatic complexity, and an architecture label are proxies, not the goal. Working memory is finite for readers too, as [Guard context](guard-context.md) describes for agents.

- Inspect wrappers with one caller, adapters with no second implementation, and speculative indirection. Collapse them when they cost more than they save. Their shape or size alone is not proof of a maintainability defect.
- Make adjacent layers change the abstraction. Repeating the same methods and arguments adds another jump without hiding a meaningful decision. Collapse unnecessary pass-through layers.
- Demand interface compression. A broad interface that hides little complexity makes readers learn both the interface and its implementation. Prefer a boundary that conceals meaningful decisions and reduces what callers need to know.
- Shrink state scope. Prefer pure functions with returned values over mutations, locals over fields, fields over module state, and module state over globals. Derive a value instead of keeping a second copy synchronized.
- Name and establish an invariant at its boundary so readers learn it once instead of rediscovering checks in every consumer.

Before adding a layer or state, identify the repeated decision or real variation it owns. Ask whether it reduces reader work elsewhere by at least as much. Try the diagnostic of a new reader answering "where does X come from?" and "what can change X?" in under 30 seconds. Difficulty suggests layers or state worth inspecting, not a stopwatch-based blocker.

## Consolidate decisions and minimize the complete change

Put a repeated choice behind one source of truth and pass its result to consumers. A simple flag works when it fits the state; use a domain value when a boolean would hide distinctions or require synchronization. Do not replace one repeated decision with a more elaborate signaling scheme.

Prefer the smallest complete solution and diff that solves the approved problem. Fewer lines can beat elegant boilerplate, but a line-count quota can also conceal missing responsibility. Name the rule, state, dependency, or coordination burden that disappears and where retained responsibility goes. Keep clear local code when a new abstraction would increase reader work.

## Subtract before construction

Sequence justified removal before building on the simpler base. Cut unused behavior before investing in polishing it. Simplification is an ongoing investment in a design that does the required work with the same or fewer concepts.

Trace observed usage, production callers, and contracts before declaring machinery obsolete. Remove dead code, redundant validators, and orphan references within approved scope. Design for actual usage rather than speculative edge cases. Add parsers and guards for real boundary contracts and spec requirements, not imagined future needs.

For prompts, remove redundant instructions and excessive templates. A reference with no novel content can be deleted after checking its callers, substantive content, and removal authority. Preserve a valid route for retained guidance. This is not permission to delete approved restored instructions, supported external requirements, useful rationale, or uncertain constraint comments. Investigate those through [Comment review](../playbooks/cleanup.md#comment-review).

## Migrate internal callers and remove the old path

When the new internal API is approved, inventory callers, migrate them, and delete the superseded API in the same wave. This applies when no external users depend on backward compatibility, the project can absorb coordinated changes, and the migration is part of an approved simplification or refactor. Keeping both paths just because internal callers remain makes every later reader understand two contracts.

Preserve genuine supported external contracts and unrelated work. Temporary adapters are exceptional and time-boxed, with an owner and removal condition rather than permanent default architecture. Use [declared migration phases](verifiable-units.md#declare-migration-phases-when-temporary-breakage-is-necessary) if approved isolated intermediate breakage is necessary.

Update tests to assert the agreed new contract. Remove obsolete tests that protect only pre-refactor implementation details, while preserving meaningful behavior pins and external requirements. Follow [Refactoring](../playbooks/refactoring.md) for original-code pins, coordinated moves, and equivalence evidence. A new internal API does not silently authorize a changed behavior contract or an out-of-scope migration.
