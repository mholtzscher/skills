# Cleanup

For a focused request, follow only the requested section. Before publication, follow [publication cleanup](#before-publication) and all three passes.

## Before publication

Before publication, run these three dedicated passes on the scoped change. Read their instructions rather than replacing them with a generic "looks clean" pass:

1. [Code cleanup](#code-cleanup) for unnecessary code machinery and inconsistent style.
2. [Prose cleanup](#prose-cleanup) for changed docs, user-facing prose, commit messages, and PR metadata.
3. [Comment review](#comment-review) for stale narration and the value of non-obvious rationale.

Use independent report-only review for code/comments when it adds confidence, following [orchestration](../../references/orchestration.md). The passes are mandatory; three simultaneous writing agents are not. If a pass has no relevant changed surface, record that result rather than inventing edits. Direct execution is acceptable when optional delegation is unavailable; disclose the lack of independent review.

The implementation owner evaluates findings and applies accepted in-scope changes. Preserve behavior and useful constraints. A proposed redesign outside the approved shape needs approval. Run affected verification after cleanup. Report material accepted/rejected findings and unresolved blockers, not a deletion-count target.

## Code cleanup

Adapted from Cursor Team Kit's deslop with mstack scope and approval rules.

Resolve the actual comparison base and include relevant local changes. Read the scoped diff and surrounding contracts. Look for unnecessary wrappers, abnormal defensive checks inside trusted boundaries, catch-all fallbacks, casts that conceal type errors, deep nesting, and code that conflicts with local conventions. Run [Coding standards: Find](../coding-standards/PLAYBOOK.md#find) and check the scoped diff against those standards as its [Apply](../coding-standards/PLAYBOOK.md#apply) section describes.

For every proposed removal, establish what responsibility remains and why behavior is preserved. Do not remove legitimate boundary validation or error handling just because it looks defensive. Prefer a focused correction over a broad rewrite.

When called during approved implementation/publication cleanup, apply accepted behavior-preserving changes and reverify affected behavior. In review-only or proposal-only contexts, report proposed diffs without edits. A semantic or architectural change beyond the approved design needs approval. End with material findings and checks; no forced cleanup is better than invented improvements.

## Prose cleanup

Edit text to remove AI patterns. Read the complete text and establish its intended audience. For every prose-cleanup invocation, read the [complete prose-pattern catalog](references/prose-patterns.md), scan the selected text against all 28 entries, then rewrite within the caller's authority. Preserve meaning and match the intended tone.

Apply the catalog's strict punctuation and style rules to selected editable prose. Rule 13 excludes em dashes and punctuation substitutes, including parentheses. Rule 14 permits colons before lists or examples, not as mid-sentence connectors. These are editing rules, not permission to alter exact quotations, code, commands, citations, catalog examples, or structured technical notation. Keep those literal. Rule 33 does not remove syntax arrows in genuine diagrams or code. Preserve requirements, technical contracts, confidence, legitimate epistemic hedges, and the author's meaning. Keep tables and diagrams when they explain something rather than decorate it. Report substantive ambiguity instead of silently choosing a new requirement.

Honor proposal-only and review-only scope. Present proposed wording and wait when the caller requires agreement, including spec refinement. During approved implementation or publication cleanup, apply accepted in-scope prose edits without changing technical meaning. Check scoped PR titles, bodies, and commit prose before remote writes, but cleanup itself grants no permission to edit PR metadata, publish, or modify other files. Reuse prior approval only where it covers the selected work.

## Comment review

This is an evidence-led adaptation of pstack's no-comments/Comment Sicko, without its default-to-delete treatment of uncertain constraints.

Review the scoped diff and necessary surrounding code. Prefer an independent report-only reviewer when useful; the implementation owner applies accepted edits. Skill prose does not enforce read-only tool permissions.

- Remove stale claims, commented-out abandoned code, and narration already obvious from names and control flow.
- Preserve legal notices, public API contracts, useful issue/decision links, and concise explanations of non-obvious constraints or mechanisms.
- Investigate "do not remove", suppressions, workarounds, and surprising assertions through source, tests, and focused [how](../explanation/PLAYBOOK.md#how)/[why](../explanation/PLAYBOOK.md#why) research.
- Treat unresolved rationale as uncertainty. Keep a potentially meaningful constraint until its role is understood; do not delete it to meet a comment-count target.
- Propose a clearer name, type, assertion, test, or lint when it can encode the constraint more reliably. Structural or semantic changes outside the approved design need approval.

For each finding, identify the location, evidence, suggested change, and preserved responsibility. Report actual findings or a clean scoped result. In standalone review, stop at the report. In approved cleanup, apply accepted in-scope edits and rerun affected checks.
