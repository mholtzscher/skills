# Cleanup

For a focused request, follow only the requested section. Before publication, follow [publication cleanup](#before-publication) and all three passes.

## Before publication

Before publication, run these three dedicated passes on the scoped change. Read their instructions rather than replacing them with a generic "looks clean" pass:

1. [Code cleanup](#code-cleanup) for unnecessary code machinery and inconsistent style.
2. [Prose cleanup](#prose-cleanup) for changed docs, user-facing prose, commit messages, and PR metadata.
3. [Comment review](#comment-review) for stale narration and the value of non-obvious rationale.

Use independent report-only review for code/comments when it adds confidence, following [orchestration](../references/orchestration.md). The passes are mandatory; three simultaneous writing agents are not. If a pass has no relevant changed surface, record that result rather than inventing edits. Direct execution is acceptable when optional delegation is unavailable; disclose the lack of independent review.

The implementation owner evaluates findings and applies accepted in-scope changes. Preserve behavior and useful constraints. A proposed redesign outside the approved shape needs approval. Run affected verification after cleanup. Report material accepted/rejected findings and unresolved blockers, not a deletion-count target.

## Code cleanup

Adapted from Cursor Team Kit's deslop with mstack scope and approval rules.

Resolve the actual comparison base and include relevant local changes. Read the scoped diff and surrounding contracts. Look for unnecessary wrappers, abnormal defensive checks inside trusted boundaries, catch-all fallbacks, casts that conceal type errors, deep nesting, and code that conflicts with local conventions.

For every proposed removal, establish what responsibility remains and why behavior is preserved. Do not remove legitimate boundary validation or error handling just because it looks defensive. Prefer a focused correction over a broad rewrite.

When called during approved implementation/publication cleanup, apply accepted behavior-preserving changes and reverify affected behavior. In review-only or proposal-only contexts, report proposed diffs without edits. A semantic or architectural change beyond the approved design needs approval. End with material findings and checks; no forced cleanup is better than invented improvements.

## Prose cleanup

Adapted from pstack's unslop. Honor a caller's proposal-only scope.

Read the complete text and its intended audience. Preserve requirements, technical contracts, citations, uncertainty, and the author's meaning. Prefer plain words, active verbs, concrete mechanisms, short paragraphs, and one consistent name per concept.

Remove unsupported attributions, vague promotional claims, ceremonial introductions, sycophancy, repetitive summaries, forced lists, needless metaphors, and chatbot closers. Replace "serves as" with "is" when nothing is lost. State the chosen behavior directly rather than defining it through an unsolicited contrast. Reduce decorative formatting and dense punctuation.

Keep enough explanation for the reader to understand the cause and tradeoff. Do not compress away articles, turn prose into cryptic symbol strings, or remove a hedge that represents a real evidence gap. Tables, code diffs, and arrows remain useful when they genuinely explain structure.

Apply edits only within the caller's authority. In spec refinement, present the proposed wording first and wait. In publication, check the PR title/body and commit prose before it is written remotely. Report substantive ambiguity rather than silently choosing a new requirement.

## Comment review

This is an evidence-led adaptation of pstack's no-comments/Comment Sicko, without its default-to-delete treatment of uncertain constraints.

Review the scoped diff and necessary surrounding code. Prefer an independent report-only reviewer when useful; the implementation owner applies accepted edits. Skill prose does not enforce read-only tool permissions.

- Remove stale claims, commented-out abandoned code, and narration already obvious from names and control flow.
- Preserve legal notices, public API contracts, useful issue/decision links, and concise explanations of non-obvious constraints or mechanisms.
- Investigate "do not remove", suppressions, workarounds, and surprising assertions through source, tests, and focused [how](explanation.md#how)/[why](explanation.md#why) research.
- Treat unresolved rationale as uncertainty. Keep a potentially meaningful constraint until its role is understood; do not delete it to meet a comment-count target.
- Propose a clearer name, type, assertion, test, or lint when it can encode the constraint more reliably. Structural or semantic changes outside the approved design need approval.

For each finding, identify the location, evidence, suggested change, and preserved responsibility. Report actual findings or a clean scoped result. In standalone review, stop at the report. In approved cleanup, apply accepted in-scope edits and rerun affected checks.
