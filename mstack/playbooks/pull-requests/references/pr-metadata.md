# Visual PR metadata

Review the full scoped change before drafting. Classify the title from actual behavior, not the branch name: new user-visible behavior is a feature; behavior-preserving restructuring is a refactor. Use a concise Conventional Commit title with a meaningful scope when useful.

Use this body structure, unless explicit user or repository instructions require another format:

```markdown
[Known ticket/task/plan links, omitted when none are known]

## Why the change

One sentence explaining the problem and what becomes possible.

## Special things to note

- Material migration, compatibility, scope, or surprising design decisions.

## Change outline

A compact visual outline of the change, using the requirements below.

## Verification

- Actual command or exercised behavior and observed result.
```

Use `- None.` under Special things to note when appropriate.

## Change outline requirements

**The Change outline must show the change visually.** Prose summaries and file-by-file changelogs do not satisfy this requirement. Use a diagram, responsibility tree, focused diff, or pseudocode that shows the relevant structure or flow, drawn from the components in [visual components](../../../references/visual-components.md).

Include only the views that explain this PR, ordered for narrative:

- SQL table and endpoint contract changes, plus pseudocode for business logic
- key data structure / type changes
- a shallow file tree showing changed responsibilities
- React component tree changes, including important hooks, state, and package boundaries
- call-tree, call-stack, control-flow, or data-flow changes

Prefer focused `diff` blocks for edits to an existing shape; show the complete target shape when most of it is new or when diff notation would obscure ownership or order.

Before publishing metadata, check that the outline contains a relevant visual and accurately represents the reviewed diff. Replace prose-only summaries or file-by-file changelogs with the appropriate visual before publishing.

## Verification and publication

Verification distinguishes local results from CI and names material unavailable checks. Do not invent links, measurements, or successful outcomes. The calling workflow applies prose cleanup to the title/body.

Publish long bodies with `gh pr create/edit --body-file <path>`. Use a task-specific temporary file. Verify written title and body by parsing `gh pr view --json title,body` and comparing the intended strings, allowing a terminal newline in the body. Verify the canonical target repository/PR, not whichever branch happens to be current.
