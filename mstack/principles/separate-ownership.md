# Separate ownership

Before serializing competing writes, ask whether they should share the same mutable target at all. Split worktrees, output files, keys, or responsibilities when that removes contention. Serialize only when a shared writer is a real invariant.

Keep one active writer per worktree. Give every shared interface and generation step an owner. Integrate after dependencies are accepted, and verify the assembled result rather than adding together isolated green reports.
