# Maintaining mstack

Before changing the bundle's workflows, wording, scripts, packaging, or host integration:

1. Read [DECISIONS.md](DECISIONS.md) for accepted choices, rationale, superseded approaches, and known gaps; read [PROVENANCE.md](PROVENANCE.md) for sources and deliberate adaptations.
2. Preserve accepted choices unless the user explicitly revises them. Surface a conflict between the requested change, recorded intent, and current instructions before choosing a new policy. Use [GLOSSARY.md](GLOSSARY.md) for the bundle's terms.
3. When a choice changes, update its decision record in the same change: status, date, rationale, approval evidence, and replacement. Keep proposals and observed implementation details distinct from accepted decisions. Follow the record's source references only when the summarized evidence is insufficient.
4. For consolidation, compare the before/after instruction bodies. Preserve substantive wording and permission boundaries; treat intentional policy changes as separate decisions. Check relative links and section anchors after moves.

## Checks

From the repository root, run `bun tooling/mstack/validate.ts`, `bunx prettier --check 'mstack/**/*.md' 'docs/mstack/**/*.md'`, and `git diff --check`. Check formatting on changed root Markdown too. Inspect new or changed link fragments; the bundle validator checks runtime file targets, not heading anchors or maintenance-document links.

For helper, validator, or packaging changes, also run `bun run typecheck` and `bun test` from `tooling/mstack` after installing its development dependencies. For workflow changes, use the scenario-evaluation guidance in [skill development](../../mstack/playbooks/skill-development.md#evaluate); packaging checks alone do not establish behavior. Discovery, delegation, or watcher changes need the relevant host-level check, with unavailable checks reported explicitly.

Keep validation gaps in [DECISIONS.md](DECISIONS.md#validation-and-cutover-snapshot) dated and evidence-backed. Installation and host configuration follow the separately approved cutover described in [README.md](README.md#migration).
