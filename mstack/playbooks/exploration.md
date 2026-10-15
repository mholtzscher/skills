# Architecture, arena, and swarm

Read [orchestration](../references/orchestration.md). Select the actual intent; these are deliberate tools, not mandatory steps for every function.

## Architecture

Start from the caller's desired usage, domain shape, and ownership. Compare credible type/interface/module shapes and trace consequential failure paths. Use parallel proposals when the design uncertainty justifies them. Explain tradeoffs with focused diffs and map the recommendation to an implementation sketch/spec. Stop for approval before writing the implementation.

## Arena

Define the candidate question, common baseline, constraints, comparison criteria, and budget before dispatch. For executable candidates, get the experiment sketch approved and isolate writers in separate worktrees. Give each the same task and independent space; avoid feeding one candidate another's conclusion.

Evaluate against the agreed criteria and real checks. Choose a base and identify specific useful parts to integrate. The lead owns integration and revalidation; a collection of individually good fragments is not a verified combined solution. Keep losing candidates until their evidence is recorded, then clean up only work created for the experiment. Production integration follows the approved coding playbook.

## Swarm

Partition a question into independent slices or a coverage matrix. Assign each slice once, identify overlap needed for cross-checking, and specify a shared report shape. Keep implementation ownership disjoint. Aggregate findings with explicit coverage, disagreements, and missing slices. Do not launch redundant agents merely to fill a quota.

If delegation is unavailable and independent concurrency is optional, continue as direct analysis and explicitly identify that substitution. Do not call it a completed swarm. A request that specifically requires independent parallel agents remains blocked until the user changes that requirement or the capability is available.

All modes end with evidence for the decision or a clear blocker. They do not automatically publish competing PRs.
