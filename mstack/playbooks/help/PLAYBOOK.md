# Mstack help

Identify what the user is trying to accomplish and explain only the applicable path. Give an `@mstack` invocation. For delegation or session retrieval questions, read [orchestration](../../references/orchestration.md) or [history](../../references/history.md), respectively. Inspect actual availability before claiming a tool or background capability works.

## Usage

Mstack has one explicit entry point. Describe the task after its name; these are natural-language requests, not subcommands.

```text
@mstack fix the filter reset
@mstack triage PR 123
```

Explicit spec paths and PR URLs or numbers are accepted. Planning, investigation, review, and checks retain their own completion conditions. Implementation requires an approved sketch or spec. Ordinary approved coding continues through one unmerged PR and scoped required-CI repair.

## Dependencies

| Use                           | Requirement                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| Skills and planning           | File-reading tools and `question` when available                    |
| PR evidence scripts           | Bun and authenticated `gh` on the execution machine                 |
| Decision-log append helper    | Bun and an explicitly selected writable local path                  |
| Publication                   | Git, `gh`, repository permissions, and project development tools    |
| Delegation                    | Available `subagent` tool and configured agents                     |
| Browser/terminal verification | Appropriate tools, optionally agent-browser/terminal-control skills |
| Durable scheduling            | A verified scheduler/launcher; mstack itself provides none          |

The helpers have no production package dependencies. Read [helper usage](../../scripts/README.md) for arguments, JSON contracts, exit codes, and limits. Optional delegation can fall back to disclosed direct work where sound; explicit independence or scheduling requirements remain unmet until the capability exists or the user revises the requirement.

## Installation questions

Copy or symlink the whole `mstack/` runtime directory under an OpenCode skill root, keeping its playbooks, principles, references, scripts, and license together. Inspect an existing destination before replacing it, then use `/reload` to refresh discovery. An explicit skill source points at the parent containing `mstack/`. Installation, global OpenCode configuration, and removal of an older workflow require separate authorization.
