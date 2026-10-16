# Mstack help

Read the adapter for the current host: [OpenCode](../../references/hosts/opencode.md) or [Pi](../../references/hosts/pi.md). Identify what the user is trying to accomplish and explain only the applicable path. Give an invocation they can use in their current host. Inspect actual availability before claiming a tool or background capability works. Installing/configuring dependencies is a separate requested action.

## Usage

Mstack has one explicit entry point. Describe the task after its name; these are natural-language requests, not subcommands.

| Host        | Example                        |
| ----------- | ------------------------------ |
| OpenCode V2 | `@mstack Fix the filter reset` |
| Pi          | `/skill:mstack triage PR 123`  |

Use the playbook and PR intent tables already in context to match the requested task. Explicit spec paths and PR URLs or numbers are accepted. Planning, investigation, review, and checks retain their own completion conditions. Implementation requires an approved sketch or spec. Ordinary approved coding continues through one unmerged PR and scoped required-CI repair.

## Dependencies

| Use                           | Requirement                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| Skills and planning           | Host file-reading tools; structured questions when available        |
| PR evidence scripts           | Bun and authenticated `gh` on the execution machine                 |
| Decision-log append helper    | Bun and an explicitly selected writable local path                  |
| Publication                   | Git, `gh`, repository permissions, and project development tools    |
| Delegation on OpenCode        | Available native subagent tool and configured roles                 |
| Delegation on Pi              | A compatible installed `pi-subagents` extension                     |
| Browser/terminal verification | Appropriate tools, optionally agent-browser/terminal-control skills |
| Durable scheduling            | An actual host scheduler/launcher; mstack itself provides none      |

The helpers have no production package dependencies. Read [helper usage](../../scripts/README.md) for arguments, JSON contracts, exit codes, and limits. Optional delegation can fall back to disclosed direct work where sound; explicit independence or scheduling requirements remain unmet until the capability exists or the user revises the requirement.

## Installation questions

Copy or symlink the whole `mstack/` runtime directory under the selected host's skill root, keeping its playbooks, principles, references, scripts, and license together. Inspect an existing destination before replacing it, and reload skills or start a fresh host session afterward. An explicit OpenCode skill source points at the parent containing `mstack/`. Installation, global host configuration, and removal of an older workflow require separate authorization.
