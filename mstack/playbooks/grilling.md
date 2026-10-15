# Grilling

Adapted from Matt Pocock's grilling skill.

Map the proposal as a design tree. Each decision unlocks dependent decisions. The current frontier contains only questions whose prerequisites are settled; do not ask the user to guess answers that depend on unresolved choices.

1. Read the conversation and relevant code/docs first. Reuse answered questions and established constraints.
2. Find observable facts yourself. Delegate bounded research when it keeps bulky evidence out of the main conversation. Questions downstream of unfinished research wait; independent decisions can proceed.
3. Ask the current frontier in manageable rounds using the host's structured question tool. Make each question a real choice, explain why it matters, and give a recommended answer with credible alternatives.
4. After each round, update the decision tree. Probe edge cases, cost of ownership, tradeoffs, and what would invalidate the preferred design.
5. When consequential branches are settled, restate the intended outcome and decisions in your own words. Ask the user to confirm the shared understanding.

The deliverable is agreement or a precise list of unresolved decisions. This interview does not authorize implementation. For a formal plan, hand the agreed decisions to [full-spec planning](planning.md#full-spec) without restarting the interview.
