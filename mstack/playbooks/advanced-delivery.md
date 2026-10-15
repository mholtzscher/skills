# Explicit stacks and shipping

These workflows require an explicit request; ordinary coding delivery remains one unmerged PR.

## Stacked delivery

1. Agree on the outcome, dependency graph, sketch/spec, stack boundaries, and whether the request includes merging. Use small independently verifiable units rather than arbitrary file-count splits.
2. Create a base-branch chain: root targets the intended trunk; each dependent PR targets its parent branch. Independent changes can target trunk separately. Git and `gh` suffice; Graphite is optional only when requested and installed.
3. Give each active writer an isolated worktree, clear ownership, and an exact base. Integrate only accepted work. Record branch/PR/base/head identities in a task-specific handoff when the program spans sessions.
4. Run local checks, mandatory cleanup, publication, and required CI for each delivery unit. Verify integration between units and after rebases/retargeting. Never force-push a shared branch as an implicit recovery step.
5. Report the ordered stack and its actual verified state. A request to build a stack does not authorize merging it.

## Shipping

1. Confirm explicit merge authority, repository, PRs, merge method/repository policy, and intended order.
2. Independently review each candidate at its exact head for accepted behavior, test evidence, unresolved feedback, conflicts, and actual merge requirements. A check rollup alone cannot establish merge readiness; inspect applicable repository protections/rulesets and PR merge state through supported GitHub tools.
3. Merge only the contiguous verified sequence from the root. Recheck identity/head immediately before each merge and account for changed bases after prior merges. A changed or blocked candidate stops later dependent merges.
4. Verify the resulting base revision and relevant post-merge checks. Report merged, blocked, and remaining PRs accurately.

For a multi-day program, use [autonomous run](autonomous.md) only after establishing real scheduler and agent-control support. A Markdown status file is not a coordinator process. Do not promise a fleet or restart-resilient operation from skill instructions alone.
