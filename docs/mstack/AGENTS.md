# Maintaining mstack

Before changing the bundle's workflows, wording, scripts, packaging, or host integration:

1. Read [DECISIONS.md](DECISIONS.md) for accepted choices, rationale, superseded approaches, and known gaps.
2. Preserve accepted choices unless the user explicitly revises them. Surface a conflict between the requested change, recorded intent, and current instructions before choosing a new policy. Use [GLOSSARY.md](GLOSSARY.md) for the bundle's terms.
3. When a choice changes, update its decision record in the same change: status, date, rationale, approval evidence, and replacement. Keep proposals and observed implementation details distinct from accepted decisions. Follow the record's source references only when the summarized evidence is insufficient.
4. For consolidation, compare the before/after instruction bodies. Preserve substantive wording and permission boundaries; treat intentional policy changes as separate decisions. Check relative links and section anchors after moves.
5. Keep runtime reading flow downward from `SKILL.md` to playbooks to supporting material. Peer links within a layer remain valid, including composed playbooks and shared resources reached through `../`. Supporting files must not require rereading the entry or a playbook. Put workflow routing in the caller and pass applicable governing instructions into delegated briefs.
6. Give each playbook a `playbooks/<name>/PLAYBOOK.md` entry. Keep owned references in that folder and cross-cutting references at the runtime root. A nested reference remains supporting material for link validation. Simple playbooks need no empty reference directory, and only the root `SKILL.md` is discoverable.

## Checks

From the repository root, run `bun tooling/mstack/validate.ts`, `bunx prettier --check 'mstack/**/*.md' 'docs/mstack/**/*.md'`, and `git diff --check`. Check formatting on changed root Markdown too. Inspect new or changed link fragments; the bundle validator checks runtime file targets and upward instruction links, not heading anchors or maintenance-document links.

For helper, validator, or packaging changes, also run `bun run typecheck` and `bun test` from `tooling/mstack` after installing its development dependencies. For workflow changes, use the scenario-evaluation guidance in [skill development](../../mstack/playbooks/skill-development/PLAYBOOK.md#evaluate); packaging checks alone do not establish behavior. Discovery, delegation, or watcher changes need the relevant host-level check, with unavailable checks reported explicitly.

Keep validation gaps in [DECISIONS.md](DECISIONS.md#validation-and-cutover-snapshot) dated and evidence-backed. Installation and host configuration follow the separately approved cutover described in [README.md](README.md#migration).
