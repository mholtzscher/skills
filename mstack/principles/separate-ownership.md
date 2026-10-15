# Separate ownership

Before serializing competing writes, ask whether the actors need the same mutable object at all. Concurrent writes can create intermittent races that are difficult to reproduce and debug. Removing unnecessary sharing prevents that class of conflict instead of managing each collision.

1. Identify shared mutable state. Include files both actors read and write, branches both push to, keys or state objects both mutate, and APIs both define and consume.
2. Ask whether the actors need one canonical object or are publishing independent facts. Default to separate owned files, keys, branches, or state directories for independent facts, then merge at the read or reporting boundary. Two workers writing their own `lastX` field into one `state.json` still share mutation. Separate `indexer-state.json` and `metrics-state.json` avoid that shared file.
3. Only when one shared write target is a real invariant, enforce serialization structurally. Use an actual lockfile protocol, sequential phases, exclusive ownership, a single-writer actor, or atomic compare-and-swap as appropriate to the system. Treat "we need a lock" as a design smell to investigate before making it the default answer.

Instructions and conventions are not concurrency control. State the actual mechanism and its limits rather than claiming a written rule supplies a lock. Mstack supplies no lock enforcement through this principle.

Keep one active writer per worktree. Give every shared interface and generation step an owner. Isolate concurrent writers and accept prerequisite changes before dependent integration. Verify the assembled result rather than adding together isolated green reports. Follow [orchestration](../references/orchestration.md) for ownership and acceptance, using only the host's actual capabilities.
