# Explanation

Follow the requested section. Teach combines How and Why as needed for the explanation.

## How

Explore the codebase to answer "how does X work?" questions. Produce architectural explanations at the level of a senior engineer onboarding onto a subsystem, enough to build a working mental model, not so much that it reads like annotated source code.

This is read-only investigation. It does not authorize implementation, a PR, or global configuration. Use host-configured roles and models; when independent exploration or synthesis materially helps, follow [orchestration](../references/orchestration.md) and the actual [host adapter](../SKILL.md#host-selection). Explorer and explainer are responsibilities, not required named agents. Give delegates a read-only task; do not claim host-enforced read-only access unless the actual permissions provide it.

### 1. Assess complexity

If the scope is ambiguous, state your interpretation and explore. The user can redirect.

- **Simple** (a single module, a small utility, a narrow question such as "how does function X work"): no explorers needed. Explore and explain directly in one pass, using the [explainer instructions](../references/explanation/how/explainer-prompt.md) without the explorer-findings section. Go to step 4. A separate explainer is optional when a fresh synthesis context materially helps.
- **Complex** (a subsystem spanning multiple files or services, a cross-cutting feature, a full architectural overview): go to step 2.

When in doubt, take the simple path.

### 2. Explore (complex only)

Decompose the question into distinct angles, each a separate slice of the subsystem. Two to four angles are often useful, not a required agent count. Trace callers, data/state transitions, ownership, and material failure paths. Investigate coupled or modest slices directly; delegate independent bulky slices when useful.

For each delegated slice, read the [explorer prompt](../references/explanation/how/explorer-prompt.md), fill in the question and angle, and launch independent explorers together using real host tools. Keep the same components/flow/files-read/boundaries/gaps handoff for directly investigated slices so synthesis can reconcile them.

### 3. Synthesize (complex only)

Once the relevant slices have returned, use the [explainer prompt](../references/explanation/how/explainer-prompt.md) with every explorer's findings filled in. Synthesize directly, or delegate one bounded explainer when the separate context helps. Reconcile overlapping findings and check contradictions against the code rather than treating an explorer's report as authority.

### 4. Present

Present the explanation. If an explainer was delegated, light edits for clarity or context from the conversation are fine; do not substantially rewrite accepted findings without checking the evidence.

Cite source paths/symbols and distinguish observed behavior from inference. End when the question has a supported answer; identify the specific missing evidence when it does not. Use [why](#why) for motivation that cannot be established from present code and [show-me](show-me.md) when a diagram or code-shape sketch is clearer.

### Output format

The explanation uses the sections defined in the [explainer prompt](../references/explanation/how/explainer-prompt.md), dropping any that do not apply: Overview, Key Concepts, How It Works, Where Things Live, Gotchas.

## Why

Investigate the motivation and intent behind code. The companion [how](#how) section answers what the code does and how it works. Why answers what forces led to its shape.

Keep the investigation read-only, including external systems. It does not authorize implementation, a PR, or global configuration. Use host-configured roles/models, actual discovered tools, and [orchestration](../references/orchestration.md) when independent bulky research or synthesis materially helps. Investigator and synthesizer are responsibilities, not fixed named agents. A tool-access mode is not permission to write; check actual host capabilities rather than assuming any mode supplies MCP access or enforced read-only permissions.

### Operating posture

Operate as a **careful, cautious, and precise investigator**. Be honest about what you know vs what you're inferring. Read [epistemics](../references/explanation/why/epistemics.md) for the full confidence framework and phrasing guide. Follow it during investigation and synthesis, whether direct or delegated.

### Step 1. Understand the target and the question

The **target** is usually a chunk of code, a pattern, a feature, or a named design decision. The **question** is usually a design rationale, a tradeoff, a motivating edge case, an external constraint, dead code, or a broad history sweep.

If the target is vague ("why do we do it this way?" with no clear referent), make your best guess from conversation context (open files, recent edits, cursor location, what was just discussed). State your interpretation briefly so the user can redirect if you're off, then proceed.

### Step 2. Establish the code anchor

Before partitioning research, build the seed context inline: file paths and line ranges, key symbols (functions, classes, constants), the last few commits touching the target, PR numbers from merge commits (pattern `(#1234)` in the subject line), and any linked ticket IDs. Run `git blame -L <start>,<end> <file>` for last-touch commits, `git log --follow -p -- <file>` for full history with patches through renames, `git log --oneline -20 -- <file>` for recent commits with PR numbers visible, and `git log -1 --format=%B <commit>` to extract PR numbers. Then pull the PR bodies and discussion for any substantive commit: `gh pr view <number> --json title,body,author,createdAt,mergedAt,labels,closingIssuesReferences,comments,reviews`. This anchor goes to every investigator and to the synthesizer.

Use [code archaeology](../references/explanation/why/sources/code-archaeology.md) for deeper source-control searching. Git history and authenticated `gh` may be missing or incomplete; record that gap rather than assuming either is guaranteed.

### Step 3. Investigate relevant evidence categories

Choose coverage from the question, the code anchor, and unresolved hypotheses. A narrow, well-supported question can be answered directly; a broad or contested one may need several independent evidence categories. Source availability alone does not justify searching unrelated systems. Preserve a coverage map of relevant sources searched, empty results, inaccessible sources, and sources intentionally not searched with reasons; an unsearched category is not a negative result.

#### Discovery

Discover tools for the relevant sources through the actual host's exposed tool catalog. Use the available-tools map and, when present, `execute` with `search` to inspect deferred tools. A configured server or listed resource alone does not prove a query tool is available.

Map available sources to the evidence categories below using MCP names, server instructions, tool names, and resource descriptors. If a source could fit more than one category, choose the one matching its primary evidence and record ambiguous cases in the coverage map. Search source control first; add other relevant records when they can resolve the question. For prior sessions, follow [history guidance](../references/history.md), including user-authored evidence, project/date scope, and superseding decisions.

Read the [source-playbook index](../references/explanation/why/source-playbook.md) to select only the references for the source categories you will investigate. Those references preserve example search order and evidence fields, not guaranteed tools: discover the actual tool and translate examples into its schema. If the relevant source is inaccessible, report the gap. Do not invent access/results, automatically configure it, search unrelated systems, or silently substitute another evidentiary claim.

#### Investigator assignments

Investigate directly where sound. Delegate independent bulky categories when useful, launching independent assignments together. Bound each assignment to one source/tool or clearly owned evidence slice so investigators do not duplicate searches. Do not force one agent per available category or a fixed fanout.

For a delegated assignment, read and fill in the [investigator prompt](../references/explanation/why/investigator-prompt.md), plus:

- The category reference selected through the [source-playbook index](../references/explanation/why/source-playbook.md), adapted to the actual available source.
- [Incident/postmortem queries](../references/explanation/why/sources/incident-postmortem.md) **if the target code looks defensive** (null checks, retry logic, timeout handling, rate limiting, feature flags, egress guards, OOM handlers), applied within the assigned source rather than used to expand access or scope.
- The code anchor and the user's original question.

Direct research follows the same investigation loop and preserves its search/evidence/contradictions/gaps/leads handoff. Cross-source leads return to the coordinator or owning investigator instead of silently expanding a bounded assignment.

#### Evidence categories and their strengths

Each category is uniquely positioned to surface one shape of "why", shown after "Best at". Use it to know what to expect back and to name a gap when a relevant source returns empty or is unavailable.

1. **Source control** (git history, `gh` for PRs, code comments, tests). The starting point when available. Best at _implementation-time rationale captured during review_.
2. **Issue / ticket tracker** (e.g. Linear, Jira, GitHub Issues, Plane, Shortcut MCP). Best at _the product or business forcing function_. Strongest when the why is external to engineering.
3. **Long-form documents** (e.g. Notion, Confluence, Google Docs, Coda MCP). Best at _long-form design rationale_, written out before it becomes code.
4. **Real-time team chat** (e.g. Slack, Discord, Microsoft Teams, Mattermost MCP). Best at _real-time deliberation that never reached a doc_. Especially important when the source control, ticket, and doc paper trail is thin.
5. **Infrastructure observability** (e.g. Datadog, New Relic, Honeycomb, Grafana, Splunk MCP). Best at _infrastructure and runtime reality that motivated the code_. Strongest when the target reacts to an infra signal (timeouts, retries, rate limits, circuit breakers).
6. **Error / exception tracking** (e.g. Sentry, Rollbar, Bugsnag, Airbrake MCP). Best at _the specific exceptions and error trajectories that motivated defensive or corrective code_. Strongest for catch blocks, null guards, type checks, retries, and other defenses.
7. **Product analytics warehouse** (e.g. Databricks, Snowflake, BigQuery, ClickHouse, dbt, Redshift MCP). Best at _product and data reality that shaped the code_. Strongest for flag-gated code, experiment-driven ships, data migrations, and "where did this number come from" questions.

#### When not to search a source

Record the reason for each relevant category not searched in Sources Consulted. Distinguish lack of access from a scope choice, for example:

- **No accessible source/tool for the category:** "Real-time team chat not searched. No matching query tool available, so the conversational record was not searchable."
- **Not relevant to the question:** "Error / exception tracking not searched. Target is a build-time script with no runtime code path."
- **Already sufficient evidence for the bounded question:** name the evidence and the remaining coverage limit rather than claiming all other searches would be redundant.

Document actual empty searches; do not invent null results for categories you chose not to search. Stop once the question has a supported answer or a deciding fact is explicitly unavailable. Broaden research when an unresolved contradiction or consequential hypothesis warrants it, not simply to fill a seven-category roster.

### Step 4. Synthesize

Synthesize directly, or use one bounded synthesizer when a separate context materially helps. Read the [synthesizer prompt](../references/explanation/why/synthesizer-prompt.md). Supply:

1. The investigator findings, including any null results and any categories not searched with justification.
2. The code anchor.
3. The user's original question.
4. The [epistemics framework](../references/explanation/why/epistemics.md).
5. The synthesizer prompt template.

Preserve contradictory evidence and dates; a later explicit decision may supersede an earlier one without erasing the historical record. Spot-check uncertain citations with actual available tools and disclose inaccessible verification.

### Step 5. Present

Present the synthesis to the user. You may lightly edit for clarity or add context from the conversation, but **do not rewrite the confidence language** of accepted findings.

### Output format

The structure is the one in the [synthesizer prompt](../references/explanation/why/synthesizer-prompt.md): The Question, The Code in Question, What We Found, What We Can Reasonably Infer, Competing Hypotheses, What We Don't Know, Sources Consulted, Confidence Summary. Adapt as needed to the question's size, but keep the confidence separation intact. Keep Sources Consulted as one line per investigated or relevant unsearched category, including empty results and reasons for not searching. Do not claim complete coverage of unrelated categories.

After Sources Consulted, if the user's why question is a precursor to changing this code, convert the lineage findings into a **Preserve / Change / Avoid / Risk** constraint set for planning the change. Identify what needs verification; this handoff is not implementation approval.

### Common failure modes to avoid

- **Recency bias**. Assuming the most recent commit is authoritative. The current shape is often the accretion of many earlier decisions. Trace back.

## Teach

The goal is understanding, not a report about your investigation.

Use [how](#how) and [why](#why) for the relevant mechanics and rationale. Reuse established evidence rather than investigating it twice. Match depth to why the user is asking and what they already know.

Start with the smallest complete plain-language explanation. Name the thing, the problem it solves, and the concrete mechanism. Walk through an actual interaction when that makes the idea clear. Use [show-me](show-me.md) to build a diagram progressively when the concept has several interacting parts.

Keep the explanation conversational and layered. Stop at a useful point and let the user steer deeper. Do not quiz them, require a recitation, or print pacing instructions. Preserve confidence language from historical evidence. Apply the [prose cleanup pass](cleanup.md#prose-cleanup) to the explanation without removing necessary uncertainty.
