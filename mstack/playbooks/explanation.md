# Explanation

Follow the requested section. Teach combines How and Why as needed for the explanation.

## How

Build a working mental model from the actual code, not an annotated source dump.

1. Establish the question and scope from the conversation. State a reasonable interpretation when needed and inspect the relevant entry points.
2. Trace callers, data/state transitions, ownership, and material failure paths. For a narrow question, investigate directly. For independent cross-cutting slices, use [orchestration](../references/orchestration.md) with bounded explorers.
3. Explain the mechanism at the level needed for the user's decision: what it does, how the path runs, where responsibilities live, and the surprising constraints. Use [show-me](show-me.md) when a diagram or code-shape sketch is clearer.
4. Cite source paths/symbols and distinguish observed behavior from inference. End when the question has a supported answer; identify the specific missing evidence when it does not.

Use [why](#why) for motivation that cannot be established from present code. This is read-only investigation and does not automatically implement a proposed improvement.

## Why

Explain the forces that produced the design, not merely what the current code does.

1. Anchor the question in source paths/symbols, behavior, and relevant constraints. Use focused `git blame`, `git log --follow`, commit bodies, linked PRs/issues, ADRs, and docs to trace the decision rather than assuming the latest commit explains it.
2. Discover relevant evidence sources actually available in this host. Search source control first; add session history, issues, documents, discussion, or runtime/incident evidence when they can resolve the question. Do not search every unrelated connected system merely because it exists.
3. Delegate independent bulky evidence categories when useful. Give each investigator the same code anchor and a bounded question. Use [history guidance](../references/history.md) for prior sessions.
4. Synthesize what the records explicitly establish, what they support as inference, competing explanations, and what remains unknown. Preserve contradictory evidence and dates; later user decisions may supersede earlier ones. Never turn missing documentation into a fabricated rationale.
5. Cite sources and scope gaps. If this precedes a requested change, summarize what to preserve, what can change, what to avoid, and what needs verification.

Keep the answer proportional to the question. A single well-supported decision does not need a fleet of investigators. This investigation does not authorize changes.

## Teach

The goal is understanding, not a report about your investigation.

Use [how](#how) and [why](#why) for the relevant mechanics and rationale. Reuse established evidence rather than investigating it twice. Match depth to why the user is asking and what they already know.

Start with the smallest complete plain-language explanation. Name the thing, the problem it solves, and the concrete mechanism. Walk through an actual interaction when that makes the idea clear. Use [show-me](show-me.md) to build a diagram progressively when the concept has several interacting parts.

Keep the explanation conversational and layered. Stop at a useful point and let the user steer deeper. Do not quiz them, require a recitation, or print pacing instructions. Preserve confidence language from historical evidence. Apply the [prose cleanup pass](cleanup.md#prose-cleanup) to the explanation without removing necessary uncertainty.
