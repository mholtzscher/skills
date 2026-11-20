# Full Why investigation

Start with the original question, code anchor, and evidence from the caller. The code anchor identifies the target paths, line ranges, symbols, and relevant commits, PRs, and ticket IDs. Pass it to every investigator and to the synthesizer.

Keep all research read-only, including external systems. Use configured agents and models, actual discovered tools, and [orchestration](../../../../references/orchestration.md) when independent bulky research or synthesis materially helps.

Read [epistemics](../../../../references/explanation/why/epistemics.md) for the full confidence framework and phrasing guide. Follow it during investigation and synthesis, whether direct or delegated.

## Investigate relevant evidence categories

Choose coverage from the question, the code anchor, and unresolved hypotheses. A narrow, well-supported question can be answered directly; a broad or contested one may need several independent evidence categories. Source availability alone does not justify searching unrelated systems. Preserve a coverage map of relevant sources searched, empty results, inaccessible sources, and sources intentionally not searched with reasons; an unsearched category is not a negative result.

### Discovery

Discover tools for the relevant sources through the available tool catalog. Use the available-tools map and, when present, `execute` with `search` to inspect deferred tools. A configured server or listed resource alone does not prove a query tool is available.

Map available sources to the evidence categories below using MCP names, server instructions, tool names, and resource descriptors. If a source could fit more than one category, choose the one matching its primary evidence and record ambiguous cases in the coverage map. Search source control first; add other relevant records when they can resolve the question. For prior sessions, follow [history guidance](../../../../references/history.md), including user-authored evidence, project/date scope, and superseding decisions.

Read the [source-playbook index](../../../../references/explanation/why/source-playbook.md) to select only the references for the source categories you will investigate. Those references preserve example search order and evidence fields, not guaranteed tools: discover the actual tool and translate examples into its schema. If the relevant source is inaccessible, report the gap. Do not invent access/results, automatically configure it, search unrelated systems, or silently substitute another evidentiary claim.

### Investigator assignments

Investigate directly where sound. Delegate independent bulky categories when useful, launching independent assignments together. Bound each assignment to one source/tool or clearly owned evidence slice so investigators do not duplicate searches.

For a delegated assignment, read and fill in the [investigator prompt](investigator-prompt.md), plus:

- The category reference selected through the [source-playbook index](../../../../references/explanation/why/source-playbook.md), adapted to the actual available source.
- [Incident/postmortem queries](../../../../references/explanation/why/sources/incident-postmortem.md) **if the target code looks defensive** (null checks, retry logic, timeout handling, rate limiting, feature flags, egress guards, OOM handlers), applied within the assigned source rather than used to expand access or scope.
- The code anchor and the user's original question.

Direct research follows the same investigation loop and preserves its search/evidence/contradictions/gaps/leads handoff. Cross-source leads return to the coordinator or owning investigator instead of silently expanding a bounded assignment.

### Evidence categories and their strengths

Each category surfaces one shape of "why", shown after "Best at". Name a gap when a relevant source returns empty or is unavailable.

1. **Source control** (git history, `gh` for PRs, code comments, tests). The starting point when available. Best at _implementation-time rationale captured during review_.
2. **Issue / ticket tracker** (e.g. Linear, Jira, GitHub Issues, Plane, Shortcut MCP). Best at _the product or business forcing function_. Strongest when the why is external to engineering.
3. **Long-form documents** (e.g. Notion, Confluence, Google Docs, Coda MCP). Best at _long-form design rationale_, written out before it becomes code.
4. **Real-time team chat** (e.g. Slack, Discord, Microsoft Teams, Mattermost MCP). Best at _real-time deliberation that never reached a doc_. Especially important when the source control, ticket, and doc paper trail is thin.
5. **Infrastructure observability** (e.g. Datadog, New Relic, Honeycomb, Grafana, Splunk MCP). Best at _infrastructure and runtime reality that motivated the code_. Strongest when the target reacts to an infra signal (timeouts, retries, rate limits, circuit breakers).
6. **Error / exception tracking** (e.g. Sentry, Rollbar, Bugsnag, Airbrake MCP). Best at _the specific exceptions and error trajectories that motivated defensive or corrective code_. Strongest for catch blocks, null guards, type checks, retries, and other defenses.
7. **Product analytics warehouse** (e.g. Databricks, Snowflake, BigQuery, ClickHouse, dbt, Redshift MCP). Best at _product and data reality that shaped the code_. Strongest for flag-gated code, experiment-driven ships, data migrations, and "where did this number come from" questions.

### When not to search a source

Record the reason for each relevant category not searched in Sources Consulted. Distinguish lack of access from a scope choice, for example:

- **No accessible source/tool for the category:** "Real-time team chat not searched. No matching query tool available, so the conversational record was not searchable."
- **Not relevant to the question:** "Error / exception tracking not searched. Target is a build-time script with no runtime code path."
- **Already sufficient evidence for the bounded question:** name the evidence and the remaining coverage limit rather than claiming all other searches would be redundant.

Stop once the question has a supported answer or a deciding fact is explicitly unavailable. Broaden research when an unresolved contradiction or consequential hypothesis warrants it, not simply to fill a seven-category roster.

## Synthesize

Synthesize directly, or use one bounded synthesizer when a separate context materially helps. Read the [synthesizer prompt](synthesizer-prompt.md). Supply:

1. The investigator findings, including any null results and any categories not searched with justification.
2. The code anchor.
3. The user's original question.
4. The [epistemics framework](../../../../references/explanation/why/epistemics.md).
5. The synthesizer prompt template.

Preserve contradictory evidence and dates; a later explicit decision may supersede an earlier one without erasing the historical record. Spot-check uncertain citations with actual available tools and disclose inaccessible verification.

## Present

You may lightly edit for clarity or add context from the conversation, but **do not rewrite the confidence language** of accepted findings.

The structure is the one in the [synthesizer prompt](synthesizer-prompt.md): The Question, The Code in Question, What We Found, What We Can Reasonably Infer, Competing Hypotheses, What We Don't Know, Sources Consulted, Confidence Summary. Adapt as needed to the question's size, but keep the confidence separation intact. Keep Sources Consulted as one line per investigated or relevant unsearched category, including empty results and reasons for not searching. Do not claim complete coverage of unrelated categories.

### Common failure modes to avoid

- **Recency bias**. Assuming the most recent commit is authoritative. The current shape is often the accretion of many earlier decisions. Trace back.
