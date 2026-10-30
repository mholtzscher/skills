# Mstack

Michael's engineering workflow bundle for OpenCode V2. One explicitly invoked [entry point](SKILL.md) routes your request to a playbook.

## Install

Copy or symlink the entire `mstack/` directory into a skill search root. For a checkout at `~/code/skills`:

```sh
mkdir -p ~/.agents/skills
ln -s ~/code/skills/mstack ~/.agents/skills/mstack
```

Inspect an existing destination before replacing it, then use `/reload` to refresh discovery. Keep the entry, playbooks, principles, references, and scripts together; copying `SKILL.md` alone breaks the bundle.

For an explicit OpenCode skill source, select the parent directory containing `mstack/`, not `mstack/` itself. Only the root `SKILL.md` is a skill entry; playbooks are supporting Markdown.

## Use

Describe the task in natural language:

```text
@mstack fix the filter reset
```

Invocation loads instructions for that task, not a persistent mode. Internal routing reads linked playbooks directly.

Other requests include:

- Plan a change, refine a spec, or implement an approved spec.
- Investigate behavior, explain a design, or review a change.
- Triage PR feedback, apply agreed fixes, or inspect checks.
- Build a visual explanation or a guided tour.
- Measure performance, diagnose a trace, or refactor code.
- Resume work, summarize progress, or reflect on session lessons.
- Create or maintain a project verification skill.
- Write or review technical documentation.

See [SKILL.md](SKILL.md#playbooks) for the full routing table. General skill authoring and evaluation use the separate `skill-creator` and `writing-for-agents` skills; [Reflect](playbooks/reflect/PLAYBOOK.md) extracts durable lessons from a session.

## Working style

Implementation starts from an approved sketch or spec, in its own worktree on a fresh topic branch. Approved coding work includes verification, code/prose/comment cleanup, one PR, and in-scope required-CI repair. Ordinary delivery stops before merging; stacks and merging require explicit requests.

Focused requests keep their own stopping points. Planning produces a proposal, review produces findings, and a checks request reports current CI. [PR operations](playbooks/pull-requests/PLAYBOOK.md) are independently selectable.

Delegation is selective, with one writer for coupled implementation and OpenCode-configured models. Principles are read when relevant and cited when they materially change a decision.

## Requirements

- OpenCode V2 with file-reading tools; decisions use `question` and delegation uses `subagent` when available.
- Git, authenticated `gh`, and repository permissions for publication.
- The `wt` command from [Worktrunk](https://worktrunk.dev) for task worktrees and branch cleanup. Without it, task worktrees fall back to OpenCode's worktree tool and branch cleanup is unavailable.
- Bun for the bundled PR and decision-log helpers. See [script usage](scripts/README.md).
- Project tools for verification, plus browser or terminal tools when the behavior needs them.

Read [orchestration](references/orchestration.md) for delegation and [history](references/history.md) for session retrieval. External specialist skills remain separate installations. Mstack has no workflow-tools dependency and supplies no durable scheduler.

## Maintain

In the source repository, `mstack/` is the installable bundle, `docs/mstack/` holds maintenance instructions and decisions, and `tooling/mstack/` holds validation and tests. Read `docs/mstack/AGENTS.md` before changing the bundle.

From the repository root:

```sh
bun tooling/mstack/validate.ts
bunx prettier --check 'mstack/**/*.md' 'docs/mstack/**/*.md'
git diff --check
```

For helper, validator, or packaging changes, also run `bun install --frozen-lockfile`, `bun run typecheck`, and `bun test` from `tooling/mstack/`. Structural checks do not establish agent behavior; use `skill-creator` for behavioral evaluation and check live OpenCode capabilities when affected.

## Migration

Replace old `mstack-*` shortcuts with natural-language requests such as `@mstack triage PR 123`. Replace an installation source pointing at `mstack/skills` with the parent directory containing `mstack/`, then reload discovery. Installation changes do not uninstall other tools or alter OpenCode configuration; make those changes only as part of an explicit cutover.

Licensed under [MIT](LICENSE).
