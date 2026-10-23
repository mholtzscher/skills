# Grilling

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Read the conversation and relevant code/docs first. Reuse answered questions and established constraints. Probe edge cases, cost of ownership, tradeoffs, and what would invalidate the preferred design.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Use the host's structured question tool when available, following the adapter for [OpenCode](../../references/hosts/opencode.md) or [Pi](../../references/hosts/pi.md). Make each question a real choice, explain why it matters, and put the recommended answer first with credible alternatives. If the tool limits the number of questions per call, cover the same ready frontier in tool-sized batches within one logical round; dependent questions still belong to the next round.

Without a structured question tool, present numbered questions with choices and a recommended answer.

Word each question so "yes" accepts your recommended answer.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), look it up directly or delegate bounded research through [orchestration](../../references/orchestration.md); don't ask the user for anything you could look up yourself. When research is delegated, don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

Restate the intended outcome and decisions for that confirmation. If the interview pauses before the frontier is empty, report the unresolved decisions instead of claiming completion. For a formal plan, hand the agreed decisions to [spec planning](../planning/PLAYBOOK.md#spec) without restarting the interview.
