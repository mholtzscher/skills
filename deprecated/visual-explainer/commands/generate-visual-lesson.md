---
description: Generate a visual HTML teaching page for a Sensei-style mentor response
---
Load the visual-explainer skill, then generate a comprehensive visual lesson as a self-contained HTML page for a response from the Sensei agent.

Follow the visual-explainer skill workflow. Read `./templates/architecture.html` for card/grid composition, `./templates/mermaid-flowchart.html` for diagram containers and zoom controls, `./references/css-patterns.md` for annotations/callouts/depth tiers, and `./references/libraries.md` for font pairings and Mermaid theming. Use an editorial, blueprint, paper/ink, or notebook-style teaching aesthetic. Do not default to a generic dashboard look.

**Input handling** — determine the source from `$1` / `$@`:
- If `$1` is a readable text, markdown, or HTML file, treat it as the source response from Sensei
- Otherwise treat `$@` as the concept or user question to answer in Sensei's style before rendering
- If both the original question and the final response are available, use the question to sharpen the title, audience assumption, and check-for-understanding prompt

**Sensei contract** — preserve the teaching behavior from the agent:
- Teach concepts, principles, and trade-offs; do not drift into implementation work unless the source explicitly does
- Default to guided inquiry and the "why" over the "what", unless the source or user explicitly asked for a direct explanation
- Distinguish definitions, conventions, and uncertainty instead of flattening them into one confident voice
- For language-specific or library-specific claims, surface any source URLs or citations used in the response
- Keep code examples minimal and pedagogically focused

**Content extraction phase** — before writing HTML, extract and normalize:
1. Topic / title
2. Assumed user level
3. Concept brief
4. Deep-dive mechanics and trade-offs
5. Illustrative code
6. Anything diagram-worthy
7. One understanding check if appropriate
8. One next-level concept if appropriate
9. Definitions vs conventions vs uncertainties
10. Any cited URLs or references

**Verification checkpoint** — before generating HTML, ensure:
- Every code sample matches the explanation around it
- Any claimed API or runtime behavior is either sourced in the response or marked uncertain
- Diagram labels use the same terminology as the prose
- If the topic does not benefit from a topology or flow diagram, use cards, comparisons, annotated steps, or timelines instead of forcing Mermaid

**Page structure** — the page should include:

1. **Lesson header** — a strong visual anchor with a monospace label (`Visual Lesson`, `Sensei`, etc.), topic title, audience assumption, and one-sentence concept brief

2. **Mental model** — one dominant visual. Use Mermaid when the concept is structural (state, flow, hierarchy, relationships, recursion, memory layout, control flow). Otherwise use a comparison grid, stacked cards, or annotated sequence panel. If Mermaid is used, include the full `.mermaid-wrap` zoom/pan/expand pattern from `./templates/mermaid-flowchart.html`

3. **Deep dive** — 3-6 numbered cards that explain the mechanics, trade-offs, and "why". Make the steps feel like a guided lesson, not a documentation dump

4. **Illustrative code** — a minimal snippet with annotations or adjacent callouts explaining the key lines. Keep the example tight; show the principle, not a whole app

5. **Epistemic status** — split into clear visual buckets for **Definition**, **Convention**, and **Uncertain / Verify** so the reader can tell what is fundamental vs contextual vs not fully verified

6. **Common traps** — misconceptions, edge cases, or wrong mental models that would lead a learner astray. Skip if the topic genuinely has none

7. **Check for understanding** — one brief question, prompt, or tiny exercise. Skip this section if the source response was explicitly direct-answer-only

8. **Next level** — one adjacent concept, deeper layer, or follow-up topic. Optional if it would feel forced

**Visual treatment:**
- This is a teaching artifact, not a product dashboard. Prefer editorial, notebook, blueprint, or blackboard-adjacent visual language
- The concept brief and mental model should dominate the first viewport
- Use badges or labels like `Definition`, `Convention`, `Uncertain`, `Try it`, and `Next level` to make the instructional structure scannable
- Code blocks must use `white-space: pre-wrap` and `word-break: break-word`
- If the response has a step-by-step chain of logic, preserve that pacing with arrows, numbered connectors, or staged cards
- Never dump the raw response into a single prose column

**Optional illustration** — if `surf` CLI is available (`which surf`), consider a tasteful conceptual hero illustration for abstract topics. Skip for concrete code-first lessons where it would just add noise.

Write to `~/.agent/diagrams/` with a descriptive filename such as `sensei-closures-lesson.html` or `visual-lesson-event-loop.html`. Open the result in the browser. Tell the user the file path.

Ultrathink.

$@
