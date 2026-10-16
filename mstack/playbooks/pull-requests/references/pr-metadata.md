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

A compact visual account of the change.

## Verification

- Actual command or exercised behavior and observed result.
```

Use `- None.` under Special things to note when appropriate. For Change outline, choose relevant type/interface diffs, a shallow responsibility tree, component/call tree, SQL/endpoint changes, or pseudocode. Prefer focused diffs for existing shapes and complete blocks for wholly new ones. Explain the shape rather than writing a file-by-file changelog.

Verification distinguishes local results from CI and names material unavailable checks. Do not invent links, measurements, or successful outcomes. The calling workflow applies prose cleanup to the title/body.

Publish long bodies with `gh pr create/edit --body-file <path>`. Use a task-specific temporary file. Verify written title and body by parsing `gh pr view --json title,body` and comparing the intended strings, allowing a terminal newline in the body. Verify the canonical target repository/PR, not whichever branch happens to be current.
