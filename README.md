# skills

A collection of reusable agent skills for coding and research workflows.

Each skill lives in its own directory and is centered around a `SKILL.md` file, with optional supporting docs, scripts, or tools. The skills in this repo focus on planning, documentation, repository research, Atlassian access, and a few quality-of-life workflows for agents.

## Included skills

| Skill | Purpose |
|---|---|
| `atlassian-api` | Read-only Jira/Confluence access through bundled `curl` + `jq` helpers. |
| `conventional-commits` | Conventional commit guidance for commit messages. |
| `spec-planner` | Turn vague feature ideas into implementation-ready specs. |

## Deprecated skills

The following skills have been moved to `deprecated/` and are no longer actively maintained:

| Skill | Purpose |
|---|---|
| `atlas-cli` | Query Jira and Confluence through the `atlas` CLI. |
| `build-skill` | Reference kit for creating and validating new skills. |
| `gradle` | Run Gradle tasks with concise, high-signal output. |
| `index-knowledge` | Generate hierarchical `AGENTS.md` knowledge bases for repositories. |
| `librarian` | Research open-source libraries and inspect repository internals. |
| `mermaid` | Guidance and validation tooling for Mermaid diagrams. |
| `visual-explainer` | Generate self-contained HTML explainers, diagrams, diff reviews, and slide decks. |

## Repository layout

Most skills follow this pattern:

```text
<skill-name>/
├── SKILL.md          # entry point
├── references/       # optional supporting docs
├── scripts/          # optional helper scripts
└── tools/            # optional local utilities
```

## Using a skill

Copy or symlink the skill directory you want into your agent's configured skills folder.

Common locations include:

- `~/.pi/agent/skills/`
- `~/.config/opencode/skills/`
- project-local skill directories, if your agent supports them

Then invoke the skill by name through your agent workflow.

## Authoring new skills

If you want to add more skills to this repo, check the existing skills for reference patterns. For guidance on skill structure and conventions, refer to the skill-creator skill or explore active skills like `spec-planner`.

## License

MIT — see [LICENSE](./LICENSE).
