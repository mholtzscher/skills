# Explanation

## How

Explore the codebase to answer "how does X work?" questions. Produce architectural explanations at the level of a senior engineer onboarding onto a subsystem, enough to build a working mental model, not so much that it reads like annotated source code.

Explorer and explainer are responsibilities, not required named agents. Give delegates a read-only task; do not claim host-enforced read-only access unless the actual permissions provide it.

### 1. Assess complexity

If the scope is ambiguous, state your interpretation and explore.

- **Simple** (a single module, a small utility, a narrow question such as "how does function X work"): no explorers needed. Explore and explain directly in one pass, using the [explainer instructions](references/how/explainer-prompt.md) without the explorer-findings section. Go to step 4. A separate explainer is optional when a fresh synthesis context materially helps.
- **Complex** (a subsystem spanning multiple files or services, a cross-cutting feature, a full architectural overview): go to step 2.

When in doubt, take the simple path.

### 2. Explore (complex only)

Decompose the question into distinct angles, each a separate slice of the subsystem. Two to four angles are often useful, not a required agent count. Trace callers, data/state transitions, ownership, and material failure paths. Investigate coupled or modest slices directly; delegate independent bulky slices when useful.

For each delegated slice, read the [explorer prompt](references/how/explorer-prompt.md), fill in the question and angle, and launch independent explorers together using real host tools. Keep the same components/flow/files-read/boundaries/gaps handoff for directly investigated slices so synthesis can reconcile them.

### 3. Synthesize (complex only)

Once the relevant slices have returned, use the [explainer prompt](references/how/explainer-prompt.md) with every explorer's findings filled in. Synthesize directly, or delegate one bounded explainer when the separate context helps. Reconcile overlapping findings and check contradictions against the code rather than treating an explorer's report as authority.

### 4. Present

If an explainer was delegated, light edits for clarity or context from the conversation are fine; do not substantially rewrite accepted findings without checking the evidence.

Cite source paths/symbols and distinguish observed behavior from inference. End when the question has a supported answer; identify the specific missing evidence when it does not. Use [why](#why) for motivation that cannot be established from present code and [show-me](../show-me/PLAYBOOK.md) when a diagram or code-shape sketch is clearer.

### Output format

The explanation uses the sections defined in the [explainer prompt](references/how/explainer-prompt.md), dropping any that do not apply: Overview, Key Concepts, How It Works, Where Things Live, Gotchas.

## Why

Investigate the motivation and intent behind code. Why answers what forces led to its shape.

Keep the investigation read-only, including external systems. It does not authorize implementation, a PR, or global configuration. Use host-configured roles/models, actual discovered tools, and [orchestration](../../references/orchestration.md) when independent bulky research or synthesis materially helps.

### Operating posture

Read [epistemics](../../references/explanation/why/epistemics.md) for the full confidence framework and phrasing guide. Follow it during investigation and synthesis, whether direct or delegated.

### Step 1. Understand the target and the question

The **target** is usually a chunk of code, a pattern, a feature, or a named design decision. The **question** is usually a design rationale, a tradeoff, a motivating edge case, an external constraint, dead code, or a broad history sweep.

If the target is vague ("why do we do it this way?" with no clear referent), make your best guess from conversation context (open files, recent edits, cursor location, what was just discussed). State your interpretation briefly so the user can redirect if you're off, then proceed.

### Step 2. Establish the code anchor

Before partitioning research, build the seed context inline: file paths and line ranges, key symbols (functions, classes, constants), the last few commits touching the target, PR numbers from merge commits (pattern `(#1234)` in the subject line), and any linked ticket IDs. Run `git blame -L <start>,<end> <file>` for last-touch commits, `git log --follow -p -- <file>` for full history with patches through renames, `git log --oneline -20 -- <file>` for recent commits with PR numbers visible, and `git log -1 --format=%B <commit>` to extract PR numbers. Then pull the PR bodies and discussion for any substantive commit: `gh pr view <number> --json title,body,author,createdAt,mergedAt,labels,closingIssuesReferences,comments,reviews`. This anchor goes to every investigator and to the synthesizer.

Use [code archaeology](../../references/explanation/why/sources/code-archaeology.md) for deeper source-control searching. Git history and authenticated `gh` may be missing or incomplete; record that gap rather than assuming either is guaranteed.

### Step 3. Investigate relevant evidence categories

Choose coverage from the question, the code anchor, and unresolved hypotheses. A narrow, well-supported question can be answered directly; a broad or contested one may need several independent evidence categories. Source availability alone does not justify searching unrelated systems. Preserve a coverage map of relevant sources searched, empty results, inaccessible sources, and sources intentionally not searched with reasons; an unsearched category is not a negative result.

#### Discovery

Discover tools for the relevant sources through the actual host's exposed tool catalog. Use the available-tools map and, when present, `execute` with `search` to inspect deferred tools. A configured server or listed resource alone does not prove a query tool is available.

Map available sources to the evidence categories below using MCP names, server instructions, tool names, and resource descriptors. If a source could fit more than one category, choose the one matching its primary evidence and record ambiguous cases in the coverage map. Search source control first; add other relevant records when they can resolve the question. For prior sessions, follow [history guidance](../../references/history.md), including user-authored evidence, project/date scope, and superseding decisions.

Read the [source-playbook index](../../references/explanation/why/source-playbook.md) to select only the references for the source categories you will investigate. Those references preserve example search order and evidence fields, not guaranteed tools: discover the actual tool and translate examples into its schema. If the relevant source is inaccessible, report the gap. Do not invent access/results, automatically configure it, search unrelated systems, or silently substitute another evidentiary claim.

#### Investigator assignments

Investigate directly where sound. Delegate independent bulky categories when useful, launching independent assignments together. Bound each assignment to one source/tool or clearly owned evidence slice so investigators do not duplicate searches.

For a delegated assignment, read and fill in the [investigator prompt](references/why/investigator-prompt.md), plus:

- The category reference selected through the [source-playbook index](../../references/explanation/why/source-playbook.md), adapted to the actual available source.
- [Incident/postmortem queries](../../references/explanation/why/sources/incident-postmortem.md) **if the target code looks defensive** (null checks, retry logic, timeout handling, rate limiting, feature flags, egress guards, OOM handlers), applied within the assigned source rather than used to expand access or scope.
- The code anchor and the user's original question.

Direct research follows the same investigation loop and preserves its search/evidence/contradictions/gaps/leads handoff. Cross-source leads return to the coordinator or owning investigator instead of silently expanding a bounded assignment.

#### Evidence categories and their strengths

Each category surfaces one shape of "why", shown after "Best at". Name a gap when a relevant source returns empty or is unavailable.

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

Stop once the question has a supported answer or a deciding fact is explicitly unavailable. Broaden research when an unresolved contradiction or consequential hypothesis warrants it, not simply to fill a seven-category roster.

### Step 4. Synthesize

Synthesize directly, or use one bounded synthesizer when a separate context materially helps. Read the [synthesizer prompt](references/why/synthesizer-prompt.md). Supply:

1. The investigator findings, including any null results and any categories not searched with justification.
2. The code anchor.
3. The user's original question.
4. The [epistemics framework](../../references/explanation/why/epistemics.md).
5. The synthesizer prompt template.

Preserve contradictory evidence and dates; a later explicit decision may supersede an earlier one without erasing the historical record. Spot-check uncertain citations with actual available tools and disclose inaccessible verification.

### Step 5. Present

You may lightly edit for clarity or add context from the conversation, but **do not rewrite the confidence language** of accepted findings.

### Output format

The structure is the one in the [synthesizer prompt](references/why/synthesizer-prompt.md): The Question, The Code in Question, What We Found, What We Can Reasonably Infer, Competing Hypotheses, What We Don't Know, Sources Consulted, Confidence Summary. Adapt as needed to the question's size, but keep the confidence separation intact. Keep Sources Consulted as one line per investigated or relevant unsearched category, including empty results and reasons for not searching. Do not claim complete coverage of unrelated categories.

After Sources Consulted, if the user's why question is a precursor to changing this code, convert the lineage findings into a **Preserve / Change / Avoid / Risk** constraint set for planning the change. Identify what needs verification; this handoff is not implementation approval.

### Common failure modes to avoid

- **Recency bias**. Assuming the most recent commit is authoritative. The current shape is often the accretion of many earlier decisions. Trace back.

## Teach

**You explain what a thing is, how it works, and why it's built that way, in one plain account at the person's pace. The goal is that they understand it, not that you change anything.**

Teach sits on top of [how](#how) and [why](#why). Get your bearings on what the work is and what it touches, then follow their actual investigation procedures for mechanics and rationale. Blend what they find into one plain explanation, lead with what matters to the person, and go deeper when they ask. Reword freely for teaching, with one exception. Keep Why's confidence language intact. Its hedges are findings, not style.

Teaching is read-only. It does not authorize code, tests, a PR, or global configuration. Requested diagrams in the reply are fine. New code or HTML artifacts follow the existing scope and approval boundary.

1. Decide the few things they should walk away understanding. Choose them from why they're asking (about to change it, reviewing it, debugging it, new to it) and what they already know, both read from the conversation, not quizzed out of them. Skip what they plainly already know. Put the depth where their question is.
2. Read the code yourself to get oriented, then follow How for how it works and Why for why. Reuse adequate evidence already established in the conversation instead of researching it twice. Match the size to the question. Use both for a subsystem; maybe one is enough for a small change. Investigate directly where sound. Keep Why narrow by default since its full sweep is slow. Put the narrowing in the question itself (a scoped question, git plus a source or two) so Why records the skipped categories per its own contract. Widen it only when the reasons are the point. Preserve the confidence and coverage limits of reused evidence too.
3. Start with a plain definition. Name the thing and say what it is in general terms, the way a senior engineer would say it out loud, with its common name if it has one. Then tie it to the case in front of you ("in X, we use this to ...") and build from there: how it works, the deeper reasons, the edge cases. For each part, explain the idea so it clicks: the problem it solves and how it actually works. Walk through what happens as the person does the thing (opens a long chat, scrolls up) when that is what makes it land. Listing functions and constants is reference, not teaching. Don't print framing labels ("the one idea to hold onto", "the thing to walk away with", "the key insight", "at its core", "TL;DR"). Give the smallest complete answer first, a sentence or two, not a dense paragraph, then stop. Add layers when they ask. Never a wall of text.
4. Keep it a conversation, not a lecture or a performance. Offer to go deeper or move on, and follow their lead. No quizzes. No pacing theater. Don't print "Pause", don't ask them to say it back, don't announce "the sentence to nail", and don't flag a part as important or hard ("here is the part worth slowing down on", "this is the tricky part", "here is where it gets interesting"). When you would pause, stop and let them respond. Running one-shot with no live human, deliver it cleanly and put any offer to go deeper at the end.
5. Show, don't only tell, and build the picture up diagram by diagram. Open the diff, the code, or an available read-only debugger view when that is the fastest way to land it. Draw when a picture lands faster than words. For anything with three or more moving parts, do not draw one diagram with all of them at once. Draw a short series instead, where each diagram redraws the last and adds a single part, so the reader watches the system assemble. A single all-at-once diagram, especially one saved for the end, is a reference, not teaching. Concretely, to teach a flow from A to B to C, draw it three times. First A to B. Then redraw and add C. Then redraw and add the return edge or the next piece. Match the medium to the idea, and use both kinds when both help. A Mermaid diagram fits a flow or structure where the labels carry the meaning. When the idea is spatial, like layout, overlap, scroll position, or a before and after, use an available image-generation tool to draw it marker-on-whiteboard style with a few short labels, since image models garble long text. Actually generate the picture when that capability is available and authorized, rather than only describing the intended image. The build-up rule holds for generated images too. If image generation is unavailable, say so and use an inline diagram, or [show-me](../show-me/PLAYBOOK.md) within an authorized artifact scope. Never pretend an image was generated or a screen captured. A single simple point needs no figure.

Write every response through [Writing: Polish](../writing/PLAYBOOK.md#polish), in plain spoken English, the way you'd explain it to a colleague. Be tight, not terse. Cut filler and empty verbal hedging, but keep uncertainty that reflects the evidence and the part that makes it click. State the concrete mechanism, not a metaphor, a framing, or a preview of what is coming. This is the target density: "Virtualization runs in two parts, one for rendering and one for loading from disk. When an item scrolls out past the buffer, both its DOM node and its in-memory data are evicted." Normal sentence case, not all-lowercase. No em dashes. Prefer periods over commas. Keep each sentence to one or two commas. If clauses pile up, split them into separate sentences. Give each concept one name and keep it. Avoid mirror sentences ("A without B, or B without A") and tidy closers ("the rest follows", "it all falls out").

**Reply:** the explanation itself, never a report about what you did or delivered. Lead with the main point, then the plain account of what it is, how it works, and why, and the threads worth chasing with How or Why. In a live conversation, deliver that account in the requested layers rather than putting every thread in the initial answer.
