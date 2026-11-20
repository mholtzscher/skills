# Explanation

## How

Explain how the code works so a senior engineer new to the area can work on it. Stay read-only. State your interpretation if the scope is ambiguous.

For a narrow question, trace the entry point, decisions, and result directly. Include callers, ownership, state changes, and failure paths where they affect the answer. Answer in one pass without the explorer or explainer templates. Use the steps below for a subsystem spanning components, a cross-cutting question, or a full architectural overview. When in doubt, start with a direct trace.

### Explore a complex system

Explorer and explainer are responsibilities, not required named agents. Give delegates a read-only task. Claim enforced read-only access only when permissions provide it.

Decompose the question into distinct angles, each a separate slice of the subsystem. Two to four angles are often useful, not a required agent count. Trace callers, data/state transitions, ownership, and material failure paths. Investigate coupled or modest slices directly; delegate independent bulky slices when useful.

For each delegated slice, read the [explorer prompt](references/how/explorer-prompt.md), fill in the question and angle, and launch independent explorers together with `subagent`. Keep the same components/flow/files-read/boundaries/gaps handoff for directly investigated slices so synthesis can reconcile them.

### Synthesize a complex trace

Once the relevant slices have returned, use the [explainer prompt](references/how/explainer-prompt.md) with every explorer's findings filled in. Synthesize directly, or delegate one bounded explainer when the separate context helps. Reconcile overlapping findings and check contradictions against the code rather than treating an explorer's report as authority.

### Present

If an explainer was delegated, light edits for clarity or context from the conversation are fine; do not substantially rewrite accepted findings without checking the evidence.

Cite source paths/symbols and distinguish observed behavior from inference. End when the question has a supported answer; identify the specific missing evidence when it does not. Use [why](#why) for motivation that cannot be established from present code and [show-me](../show-me/PLAYBOOK.md) when a diagram or code-shape sketch is clearer.

## Why

Investigate the intent behind code. Keep the investigation read-only, including external systems.

Start with the [code anchor](#establish-the-code-anchor). If the historical record answers the bounded question directly, cite what the authors wrote, label any inference, and name material limits. The code shows what happens, not why. Answer without the full investigation procedure or synthesis template.

If the record is thin, relevant sources disagree, or the question needs broader coverage, follow the [full investigation](references/why/investigation.md). Carry forward the question, code anchor, and evidence already gathered.

If the question is a precursor to changing the code, turn the findings into a **Preserve / Change / Avoid / Risk** constraint set. Identify what needs verification. This handoff does not authorize implementation.

### Establish the code anchor

Identify the question and target files, line ranges, and symbols. If the target is vague, state your interpretation and proceed. Reuse relevant evidence already supplied.

Read the commits that introduced or materially changed the target and their PR discussions. Pick the commands that resolve the question. Use `git blame -L <start>,<end> <file>` for last-touch history and `git log --follow -p -- <file>` to trace changes through renames. Use `git log --oneline -20 -- <file>` or `git log -1 --format=%B <commit>` to find PR numbers, including `(#1234)` in merge subjects. For substantive PRs, use `gh pr view <number> --json title,body,author,createdAt,mergedAt,labels,closingIssuesReferences,comments,reviews`. Keep any linked ticket IDs.

Read [code archaeology](../../references/explanation/why/sources/code-archaeology.md) for deeper source-control searches. Report missing or incomplete Git history or PR access where it affects the answer.

## Teach

**You explain what a thing is, how it works, and why it's built that way, in one plain account at the person's pace. The goal is that they understand it, not that you change anything.**

Teach sits on top of [how](#how) and [why](#why). Get your bearings on what the work is and what it touches, then follow their actual investigation procedures for mechanics and rationale. Blend what they find into one plain explanation, lead with what matters to the person, and go deeper when they ask. Reword freely for teaching, with one exception. Keep Why's confidence language intact. Its hedges are findings, not style.

Teaching is read-only. It does not authorize code, tests, a PR, or global configuration. Requested diagrams in the reply are fine. New code or HTML artifacts follow the existing scope and approval boundary.

1. Decide the few things they should walk away understanding. Choose them from why they're asking (about to change it, reviewing it, debugging it, new to it) and what they already know, both read from the conversation, not quizzed out of them. Skip what they plainly already know. Put the depth where their question is.
2. Read the code yourself to get oriented, then follow How for how it works and Why for why. Reuse adequate evidence already established in the conversation instead of researching it twice. Match the size to the question. Use both for a subsystem; maybe one is enough for a small change. Investigate directly where sound. Keep Why narrow by default. In a full investigation, account for relevant sources you did not search. Preserve the confidence and coverage limits of reused evidence.
3. Start with a plain definition. Name the thing and say what it is in general terms, the way a senior engineer would say it out loud, with its common name if it has one. Then tie it to the case in front of you ("in X, we use this to ...") and build from there: how it works, the deeper reasons, the edge cases. For each part, explain the idea so it clicks: the problem it solves and how it actually works. Walk through what happens as the person does the thing (opens a long chat, scrolls up) when that is what makes it land. Listing functions and constants is reference, not teaching. Don't print framing labels ("the one idea to hold onto", "the thing to walk away with", "the key insight", "at its core", "TL;DR"). Give the smallest complete answer first, a sentence or two, not a dense paragraph, then stop. Add layers when they ask. Never a wall of text.
4. Keep it a conversation, not a lecture or a performance. Offer to go deeper or move on, and follow their lead. No quizzes. No pacing theater. Don't print "Pause", don't ask them to say it back, don't announce "the sentence to nail", and don't flag a part as important or hard ("here is the part worth slowing down on", "this is the tricky part", "here is where it gets interesting"). When you would pause, stop and let them respond. Running one-shot with no live human, deliver it cleanly and put any offer to go deeper at the end.
5. Show, don't only tell, and build the picture up diagram by diagram. Open the diff, the code, or an available read-only debugger view when that is the fastest way to land it. Draw when a picture lands faster than words. For anything with three or more moving parts, do not draw one diagram with all of them at once. Draw a short series instead, where each diagram redraws the last and adds a single part, so the reader watches the system assemble. A single all-at-once diagram, especially one saved for the end, is a reference, not teaching. Concretely, to teach a flow from A to B to C, draw it three times. First A to B. Then redraw and add C. Then redraw and add the return edge or the next piece. Match the medium to the idea, and use both kinds when both help. A Mermaid diagram fits a flow or structure where the labels carry the meaning. When the idea is spatial, like layout, overlap, scroll position, or a before and after, use an available image-generation tool to draw it marker-on-whiteboard style with a few short labels, since image models garble long text. Actually generate the picture when that capability is available and authorized, rather than only describing the intended image. The build-up rule holds for generated images too. If image generation is unavailable, say so and use an inline diagram, or [show-me](../show-me/PLAYBOOK.md) within an authorized artifact scope. Never pretend an image was generated or a screen captured. A single simple point needs no figure.

Write every response through the local [prose cleanup pass](../cleanup/PLAYBOOK.md#prose-cleanup), in plain spoken English, the way you'd explain it to a colleague. Be tight, not terse. Cut filler and empty verbal hedging, but keep uncertainty that reflects the evidence and the part that makes it click. State the concrete mechanism, not a metaphor, a framing, or a preview of what is coming. This is the target density: "Virtualization runs in two parts, one for rendering and one for loading from disk. When an item scrolls out past the buffer, both its DOM node and its in-memory data are evicted." Normal sentence case, not all-lowercase. No em dashes. Prefer periods over commas. Keep each sentence to one or two commas. If clauses pile up, split them into separate sentences. Give each concept one name and keep it. Avoid mirror sentences ("A without B, or B without A") and tidy closers ("the rest follows", "it all falls out").

**Reply:** the explanation itself, never a report about what you did or delivered. Lead with the main point, then the plain account of what it is, how it works, and why, and the threads worth chasing with How or Why. In a live conversation, deliver that account in the requested layers rather than putting every thread in the initial answer.
