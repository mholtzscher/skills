# Pi

Users invoke `/skill:mstack` with the task, such as `/skill:mstack triage PR 123`. The single entry point uses `disable-model-invocation: true`. Read linked playbooks directly when routing internally. No extension command registration is needed.

Pi stops descending a skill directory when it finds `SKILL.md`. Mstack has one root `SKILL.md`; its playbooks and references are plain Markdown files loaded on demand. Install the whole `mstack/` directory under a skill search root, including `~/.agents/skills`.

Use the installed structured question extension if exposed; otherwise ask focused questions in conversation. Plannotator is optional and its currently exposed tools determine which review surfaces are available.

## Delegation with pi-subagents

Vanilla Pi does not supply subagents. When installed, `pi-subagents` supplies them. If only `subagents_enable` is exposed, enable it when delegation is authorized by the task or mstack's selected workflow. Then inspect the tool schema and available roles. For installed versions supporting this interface:

```js
subagent({ action: "list", options: { capabilities: true } });
subagent({
  agent: "scout",
  task: "Bounded contract with scope, evidence and constraints",
  cwd: "/absolute/project/path",
  async: true,
});
```

Typical installed roles are scout, worker, and reviewer, but discover rather than require these names. Omit `model` to use host role configuration. Consult `subagent({ action: "guide", options: { topic: "tool-reference" } })` when the API differs. Never pass OpenCode's `prompt`, `background`, or `sessionID` fields to Pi.

Use completion notices for background work. For management or deliberate waiting, use only advertised actions and exact returned run IDs. Some versions expose `status`, `stop`, `resume`, `steer`, and `bg_wait`; those are not portable OpenCode operations. Foreground children may lack ambient extensions/MCP access, so confirm capability before assigning tool-dependent research.

Managed `worktree: true` isolation may require a clean source checkout. Preserve existing edits; use a separate explicit Git worktree when appropriate instead of cleaning the user's checkout. Configure models and tool permissions through the host only when the user requests configuration changes.

## History and long runs

Pi stores session trees as JSONL. Use the installed session/history tools or documented local session files, scoped to the relevant project and date range. Follow the active branch of a session tree rather than treating abandoned branches as later decisions. Summarize user-authored evidence with session/file and entry IDs; keep transcripts out of the parent context.

An installed scheduling interface is not proof of a daemon. Some pi-subagents schedules require an active claiming Pi session or an external launcher. Check the installed version's guide and actual runtime before promising work across restarts. Report background launch failures rather than claiming a watcher is running.

Sources: installed Pi `docs/skills.md` and `docs/sessions.md`; pi-subagents `docs/tool-reference.md` and `docs/standalone-background.md`; [Pi skill discovery](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/skills.ts). These instructions were checked against Pi 1.2.0 and pi-subagents 0.78.0; background execution on that combination still requires live verification.
