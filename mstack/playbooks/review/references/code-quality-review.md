# Code Quality Review

Each reviewer applies this code-quality lens in addition to the rubric. It is a rigorous standard focused on implementation quality, maintainability, abstraction quality, and codebase health. It is a diagnostic lens: a blocking finding requires a concrete maintainability problem in the actual change, not a preferred design or file-size rule alone.

Be ambitious about code structure. Do not merely identify local cleanup. Actively search for "code judo" moves, restructurings that preserve behavior while making the implementation dramatically simpler, smaller, more direct, and more elegant. Explain the concrete benefit and tradeoff; recommendations do not authorize implementation.

## Core Prompt

Start from this baseline:

> Perform a deep code quality audit of the current branch's changes.
> Rethink how to structure / implement the changes to meaningfully improve code quality without impacting behavior.
> Look for improvements to abstractions, modularity, spaghetti code, succinctness, and legibility.
> Be ambitious: if there is a clear path to improving the implementation that involves restructuring some of the codebase, propose it with evidence of the problem it solves, rather than editing it.
> Be extremely thorough and rigorous. Measure twice, cut once.

## Dimensions

Each dimension is stated once. Apply the ones that are relevant.

0. **Be ambitious about structural simplification.** Do not stop at "this could be a bit cleaner." Look for reframings that make whole branches, helpers, modes, conditionals, or layers disappear. Investigate whether a "code judo" move is available: one that uses the existing architecture more effectively and makes the change dramatically simpler. If you can delete complexity rather than rearrange it, explain that alternative and its concrete benefit without presuming that a different design is a defect.

1. **Inspect a PR that pushes a file from under 1k lines to over 1k lines.** Retain the exact 1,000-line threshold as a diagnostic, not a presumptive blocker. Consider extracting helpers, subcomponents, or modules. If the diff crosses that threshold, ask whether the code should be decomposed first. Inspect whether the resulting file stays clearly organized and whether extraction improves cohesion or merely scatters context. File size alone does not require a waiver or block approval; identify a concrete maintainability problem before recommending a blocking decomposition.

2. **Look for spaghetti growth in existing code.** Be suspicious of new ad-hoc conditionals, scattered special cases, or one-off branches inserted into unrelated flows. Investigate "weird if statements in random places" as a possible design problem, not merely a style nit. Prefer pushing the logic into a dedicated helper, state machine, or module when that actually untangles the path; show the coupling or reasoning burden it removes.

3. **Look beyond working behavior to design quality.** If behavior can stay the same while the structure becomes meaningfully cleaner, propose the cleaner version and explain the benefit and cost. Prefer simplifications that remove moving pieces over refactors that spread the same complexity around. Working behavior does not excuse a demonstrated maintainability regression, but a missed alternative alone is not a blocker.

4. **Prefer direct, boring, maintainable code over hacky or magical code.** Treat brittle, ad-hoc, or "magic" behavior as a problem when its concrete failure or maintenance cost is established. Be skeptical of generic mechanisms that hide simple data-shape assumptions. Flag thin abstractions, identity wrappers, or pass-through helpers that add indirection without buying clarity.

5. **Push on type and boundary cleanliness when it affects maintainability.** Question unnecessary optionality, `unknown`, `any`, or cast-heavy code when a clearer type boundary could exist. Prefer explicit typed models over loosely-shaped ad-hoc objects. If a branch leans on a silent fallback to paper over an unclear invariant, ask whether the boundary should be made explicit.

6. **Keep logic in the canonical layer and reuse existing helpers.** Call out feature logic leaking into shared paths or implementation details leaking through APIs. Prefer existing canonical utilities over bespoke one-offs. Recommend the right package, service, or module instead of normalizing drift, with evidence of the ownership or maintenance problem.

7. **Treat unnecessary sequential orchestration and non-atomic updates as design smells when the cleaner structure is obvious.** If independent work is serialized for no reason, ask whether it should run in parallel. If related updates can leave state half-applied, push for a more atomic structure. Do not over-index on micro-optimizations, but do flag avoidable orchestration complexity that makes the code more brittle. Confirm independence and shared-state constraints before recommending concurrency.

## Output Expectations

Prioritize structural code-quality regressions and missed simplifications first, then spaghetti and branching complexity, then boundary, type, and file-size concerns, then smaller modularity and legibility issues. Ground priority and severity in actual impact; critical correctness/security defects still take precedence over optional structural proposals.

## Approval Bar

Do not approve merely because behavior seems correct when concrete maintainability problems remain. Inspect all of these diagnostics: the PR keeps a lot of incidental complexity when a code-judo move would delete it; pushes a file from below 1000 lines to above 1000 lines; adds ad-hoc branching that tangles an existing flow; scatters feature checks across shared code; adds an unnecessary abstraction, wrapper, or cast-heavy contract; duplicates an existing helper; or puts logic in the wrong layer when there is a clear canonical home.

For each, establish the actual maintainability problem, the affected path or responsibility, and an actionable alternative with its tradeoff. Block only on a concrete problem that justifies the cost of changing it now. File size or the existence of a cleaner alternative alone prompts inspection, not rejection. Otherwise classify the proposal as Consider, Noted, or Dismissed under lead judgment rather than presuming the author must justify a waiver.

## Review Tone

Be direct, serious, and demanding about quality. Do not be rude, but do not soften major demonstrated maintainability issues into mild suggestions. If the code is making the codebase messier, explain how. If the implementation missed an obvious dramatic simplification, show it and its benefit without treating preference as proof. Do not be satisfied with "maybe rename this" when the real issue is structural.
