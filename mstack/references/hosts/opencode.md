# OpenCode V2

Users invoke `@mstack` with the task, such as `@mstack triage PR 123`. The single entry point is explicit-only. Internal routing reads linked playbooks directly. This loads instructions for the task; it does not create a persistent host mode.

Use `question` for decisions. Use the available Plannotator tools for requested artifact review. Discover deferred tools with the host catalog when present, rather than guessing tool names.

## Delegation

Inspect the current `subagent` schema and advertised agents. The standard form is:

```js
subagent({
  agent: "general",
  description: "Review cancellation behavior",
  prompt: "Bounded contract with absolute cwd, scope, evidence and constraints",
  background: true,
});
```

Use an available explorer for read-only discovery when suitable. Omit `model` to use host configuration. Use an exact discovered model ID only when the user requests a model or explicitly authorizes a diverse-model panel. Do not create configuration to make a missing role appear.

Launch independent work in the background and consume completion notifications. Use foreground execution when the parent genuinely has no independent work. Continue a completed child with its returned `sessionID` when its context is useful. The standard tool has no list, cancel, or steer-running action. Never invent those operations or infer that a child stopped because a status file changed.

## Files, history, and continuity

Use the available worktree tools or Git for isolated writers. Keep an absolute cwd in every contract. A worktree is filesystem isolation, not a remote machine or a security sandbox.

For historical questions, read the current [API guide](https://opencode.ai/v2/docs/api). Use `opencode api` through its normal authentication/discovery path and inspect the actual API contract before querying sessions. Retrieve only relevant sessions/projects/date ranges. Do not query or edit the live database directly. Return concise evidence with session IDs and dates, distinguishing user messages from generated command prompts.

Completion notifications support work in the active session. They do not establish restart-resilient scheduling. Long-running programs must verify their actual scheduler/control capabilities before promising unattended continuation.

Sources: [skills](https://opencode.ai/v2/docs/skills), [agents](https://opencode.ai/v2/docs/agents), and the current tool schemas.
