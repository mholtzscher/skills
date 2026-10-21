# Mstack

Michael's explicitly invoked engineering workflows for OpenCode V2 and Pi. One entry point, `mstack`, routes planning, investigation, review, explanation, and PR requests to playbooks.

Mstack is independently maintained and owned in this repository. It does not depend on workflow-tools or a pstack installation.

Playbooks provide task procedures, principles guide decisions, and roles are bounded assignments for delegated work. These terms are defined in the [glossary](GLOSSARY.md).

## Working style

For implementation, mstack chooses a concise sketch or full spec based on uncertainty and impact. **Both wait for approval.** Approved coding work continues through verification, dedicated code/prose/comment cleanup, PR publication, and required CI. Ordinary delivery is one unmerged PR. Stacks and merging are explicit requests.

Delegation is selective. Coupled implementation stays with one writer; independent work and review can use separate contexts. Models come from host configuration. Principles are read on demand and cited when they materially shape a decision.

Planning, investigation, review, metadata rewrite, and check snapshots keep their own boundaries. Invoking the bundle does not turn every request into coding or publication.

## Repository layout

| Directory         | Contents                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `mstack/`         | Installable entry, playbooks, principles, runtime references, helpers, helper usage, and license                  |
| `docs/mstack/`    | Installation/development guide, maintenance instructions, decisions, and glossary                                 |
| `tooling/mstack/` | Bundle validator, tests, package manifest, lockfile, TypeScript configuration, and local development dependencies |

Only `mstack/` is copied or symlinked during installation. Runtime links resolve within that directory. Repository-root `AGENTS.md` routes maintenance work to this guide's neighboring instructions.

Runtime reading flows from the entry to playbooks to supporting material. Peer playbooks may compose each other, and supporting resources may share references. Links back to the entry or from supporting material to playbooks are rejected by the validator. Relative `../` paths are valid when their targets belong to the same or a lower layer. Maintenance documents may link to any runtime layer.

Each playbook has its own folder with a plain `PLAYBOOK.md` entry and any owned references:

```text
mstack/
├── SKILL.md
├── playbooks/
│   ├── review/
│   │   ├── PLAYBOOK.md
│   │   └── references/
│   │       ├── reviewer-prompt.md
│   │       └── rubric.md
│   └── bug-fix/
│       └── PLAYBOOK.md
├── principles/
├── references/          Shared guidance
└── scripts/
```

Host adapters, orchestration, history, verification, the benchmark checklist, and the shared Why source catalog and epistemics stay in root `references/`. Task-owned prompts, formats, and examples live beside their playbook. Simple playbooks contain only their entry. The validator distinguishes that entry from supporting files nested below it.

## Install the whole bundle

Place or symlink the repository's `mstack/` directory under a shared skill root. For example, after deciding to install:

```sh
mkdir -p ~/.agents/skills
ln -s ~/code/skills/mstack ~/.agents/skills/mstack
```

Inspect an existing destination before replacing it. Reload skills or start a fresh host session afterward. Both hosts discover the single root `SKILL.md`. Keep `playbooks/`, `references/`, `principles/`, and `scripts/` alongside it; copying the entry file alone breaks its relative links.

For an explicit OpenCode skill source, use the parent directory containing `mstack/`, not `mstack/` itself. OpenCode also registers Markdown files at a source root. The shared-directory installation above keeps supporting documents beneath that root.

Mstack is explicit-only. Its internal playbooks are plain Markdown, so they do not register as separate skills. No plugin hooks, custom agent registration, global model file, or persistent mode is installed.

## Invoke

| Host        | Coding request                       | Focused request               |
| ----------- | ------------------------------------ | ----------------------------- |
| OpenCode V2 | `@mstack Fix the filter reset`       | `@mstack triage PR 123`       |
| Pi          | `/skill:mstack Fix the filter reset` | `/skill:mstack triage PR 123` |

These are skill requests, not extension slash commands. Internal routing reads the bundled files directly. An explicit spec path or PR URL/number is accepted; the current repository/PR and `specs/` are defaults, not restrictions.

| Area               | Playbooks                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Planning and specs | [Sketch, full spec, refinement](../../mstack/playbooks/planning/PLAYBOOK.md); [spec implementation](../../mstack/playbooks/spec-implement/PLAYBOOK.md) |
| PR operations      | [Publish, rewrite metadata, triage, fix agreed feedback, inspect checks, watch](../../mstack/playbooks/pull-requests/PLAYBOOK.md)                      |
| Explanation        | [How, why, teach](../../mstack/playbooks/explanation/PLAYBOOK.md)                                                                                      |
| Visuals and domain | Show me, show complexity, grilling, domain modeling                                                                                                    |
| Design and review  | Architecture, arena, swarm, review, blast radius                                                                                                       |
| Cleanup            | [Code, prose, comments](../../mstack/playbooks/cleanup/PLAYBOOK.md)                                                                                    |
| Performance        | Performance fix, hillclimb, runtime/trace forensics                                                                                                    |
| Advanced delivery  | Stack, ship, autonomous run                                                                                                                            |
| Continuity         | [Recall, catch up, pickup, pause](../../mstack/playbooks/continuity/PLAYBOOK.md)                                                                       |
| Decision trail     | [Record, audit, and review decisions with evidence](../../mstack/playbooks/decision-trail/PLAYBOOK.md)                                                 |
| Skills and help    | Author, evaluate, reflect, help                                                                                                                        |
| App verification   | [Create or maintain a project verification skill and feature map](../../mstack/playbooks/verification-skill/PLAYBOOK.md)                               |

Describe the task after `@mstack` or `/skill:mstack`; these are natural-language requests, not subcommands. Feature, bug-fix, refactoring, prototype, and visual-parity requests use the same entry point. The [main skill](../../mstack/SKILL.md) routes to the matching playbook.

For an HTML-first explanation, use `@mstack big-pics-little-words explain this design` or `/skill:mstack big-pics-little-words explain this design`. [Big pictures, little words](../../mstack/playbooks/show-me/PLAYBOOK.md#big-pictures-little-words) is a mode within Show me. It uses large visuals and brief, newcomer-friendly text while retaining key details. General diagram and code-sketch requests keep Show me's smallest-useful-view choice.

Standalone publication starts a read-only, 30-minute background watcher unless `--no-watch` or conversational guidance disables it. Coding tasks own CI repair instead. Feedback fixes use agreed triage outcomes, publish first, then react/resolve; their watcher is read-only. An immediate checks request never waits or repairs code.

Use `@mstack create a verification skill for this app` or `/skill:mstack maintain this project's verification skill` to create or audit repeatable app-driving instructions and a feature map. New skills default to the project's `.agents/skills/verify-<app>/`. Creation proves one mapped feature end to end; maintenance covers every mapped feature and confines corrections to the verification skill directory. Both preserve evidence through cleanup, and implementation changes require approval.

Use `@mstack keep a decision trail for this run` or `/skill:mstack audit this decision trail` for a canonical append-only record of decisions and evidence. Long runs route to the same [procedure](../../mstack/playbooks/decision-trail/PLAYBOOK.md). Trails stay in existing ignored storage or an explicit local path outside the worktree by default. Committing or publishing a sanitized trail requires explicit request or agreement. A read-only audit proposes corrections rather than appending them. Owner transcript audit and selective independent review have separate, honestly reported coverage. Every reply of a trail-producing run ends with Attention status. Hillclimb's nine-field experiment log remains separate, with evidence links when both are useful.

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

The Bun helpers have no production package dependencies. [Script usage](../../mstack/scripts/README.md) documents the read-only PR JSON contracts and the local decision-log append interface, exit codes, and limits. The append helper normalizes TSV cells and rejects incompatible existing headers, but does not enforce ownership, validate evidence, lock shared writers, or schedule work. Optional technical skills remain external. Missing optional delegation can fall back to direct work; explicit independence or scheduler requirements remain unmet until the capability exists or the user changes the requirement.

The [host adapters](../../mstack/SKILL.md#host-selection) distinguish OpenCode and Pi tool contracts. Instructions do not enforce sandbox permissions or promise background work survives a restart.

## Development and validation

Before modifying mstack, read the [maintainer instructions](AGENTS.md) and [decision record](DECISIONS.md). They preserve the approved tradeoffs, superseded approaches, and known validation gaps from the original design session; update the record when an accepted choice changes.

From `tooling/mstack`:

```sh
bun install --frozen-lockfile
bun run typecheck
bun test
```

The lockfile pins development-only TypeScript/Bun types. Tests use fixture classification and a subprocess fake `gh`; they perform no live GitHub operations. Typechecking covers both the repository tooling and the runtime helpers. Copied-bundle tests exercise helper execution without the repository's docs, tooling, or development dependencies.

Validate the bundle's skill metadata, discovery layout, and relative links with:

```sh
bun tooling/mstack/validate.ts
```

The validator defaults to this repository's `mstack/` directory from any working directory. Pass an explicit bundle path to validate a copied installation. Check Markdown with `bunx prettier --check 'mstack/**/*.md' 'docs/mstack/**/*.md'` and inspect maintenance-document links and heading fragments separately.

The structural validator checks packaging, not agent behavior. Use the installed `skill-creator` skill's behavioral-evaluation guidance for workflow changes. Exercise actual host discovery before a cutover; live delegation and GitHub writes need their own scoped checks.

## Migration

The old standalone agent-orchestrator is archived under `deprecated/` in the skills repository; maintained orchestration lives in this bundle. Existing external planning/explanation skills remain available, while their adapted mstack playbooks evolve here.

The former `mstack-*` shortcuts have been consolidated into the single entry point. Replace a shortcut such as `@mstack-pr-triage 123` with `@mstack triage PR 123`. When cutting over from the old layout, update any explicit source that points at `mstack/skills` to the parent skill directory containing `mstack/`, then reload discovery.

Creating this bundle does not uninstall workflow-tools or change host configuration. Switch installation sources only during an explicit cutover. License notices are in [LICENSE](../../mstack/LICENSE).
