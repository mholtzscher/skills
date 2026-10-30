# Cleanup

For a focused request, follow only the requested section.

## Before publication

Before publication, run these three dedicated passes on the scoped change. Read their instructions rather than replacing them with a generic "looks clean" pass:

1. [Code cleanup](#code-cleanup) for unnecessary code machinery and inconsistent style.
2. [Prose cleanup](#prose-cleanup) for changed docs, user-facing prose, commit messages, and PR metadata.
3. [Comment review](#comment-review) for stale narration and the value of non-obvious rationale.

Use independent report-only review for code/comments when it adds confidence, following [orchestration](../../references/orchestration.md). If a pass has no relevant changed surface, record that result rather than inventing edits.

The implementation owner evaluates findings and applies accepted in-scope changes. Preserve behavior and useful constraints. Report material accepted/rejected findings and unresolved blockers, not a deletion-count target.

## Code cleanup

Resolve the actual comparison base and include relevant local changes. Read the scoped diff and surrounding contracts. Look for unnecessary wrappers, abnormal defensive checks inside trusted boundaries, catch-all fallbacks, casts that conceal type errors, deep nesting, and code that conflicts with local conventions. Run [Coding standards: Find](../coding-standards/PLAYBOOK.md#find) and check the scoped diff against those standards as its [Apply](../coding-standards/PLAYBOOK.md#apply) section describes.

For every proposed removal, establish what responsibility remains and why behavior is preserved. Do not remove legitimate boundary validation or error handling just because it looks defensive. Prefer a focused correction over a broad rewrite.

When called during approved implementation/publication cleanup, apply accepted behavior-preserving changes and reverify affected behavior. In review-only or proposal-only contexts, report proposed diffs without edits. A semantic or architectural change beyond the approved design needs approval. End with material findings and checks.

## Prose cleanup

Read the complete text and establish its intended audience. For every prose-cleanup invocation, read and apply the [technical-writing standard](../../references/technical-writing.md), including all of its prose diagnostics. Rewrite within the caller's authority and match the intended tone. Retain required document templates; PR descriptions and commit messages use the sentence-level layers.

Honor proposal-only and review-only scope. Present proposed wording and wait when the caller requires agreement, including spec refinement. During approved implementation or publication cleanup, apply accepted in-scope prose edits without changing technical meaning. Check scoped PR titles, bodies, and commit prose before remote writes, but cleanup itself grants no permission to edit PR metadata, publish, or modify other files.

## Comment review

Review the scoped diff and necessary surrounding code. Prefer an independent report-only reviewer when useful; the implementation owner applies accepted edits.

- Remove stale claims, commented-out abandoned code, and narration already obvious from names and control flow.
- Preserve legal notices, public API contracts, useful issue/decision links, and concise explanations of non-obvious constraints or mechanisms.
- Investigate "do not remove", suppressions, workarounds, and surprising assertions through source, tests, and focused [how](../explanation/PLAYBOOK.md#how)/[why](../explanation/PLAYBOOK.md#why) research.
- Treat unresolved rationale as uncertainty. Keep a potentially meaningful constraint until its role is understood; do not delete it to meet a comment-count target.
- Propose a clearer name, type, assertion, test, or lint when it can encode the constraint more reliably. Structural or semantic changes outside the approved design need approval.

For each finding, identify the location, evidence, suggested change, and preserved responsibility. Report actual findings or a clean scoped result. In standalone review, stop at the report. In approved cleanup, apply accepted in-scope edits and rerun affected checks.
