# Show complexity

Adapted from Michael Holtzscher's show-complexity skill. Use [show-me](show-me.md) for the smallest useful visual.

## Establish the evidence

Identify the target, comparison base, and decision the user needs. Distinguish existing code from a proposal. Read relevant requirements, inventory entry points, and trace consequential callers, state, dependencies, and failure paths. Check registration and supported external consumers before calling code unused.

For whole-project assessment, use a shallow responsibility map to select areas. State sampling coverage. Expand discovery only to answer a question that could change the classification or recommendation. Missing rationale is uncertainty, not proof of unnecessary complexity.

## Classify individual burdens

| Mark | Meaning                                 | Required evidence                                            |
| ---- | --------------------------------------- | ------------------------------------------------------------ |
| E    | Essential under the agreed requirements | Name the constraint, its source, and what breaks without it. |
| A    | Accidental to this implementation       | Show a simpler design that preserves the required behavior.  |
| ?    | Undetermined                            | Name the missing fact and how to resolve it.                 |

Classify mechanisms, not entire modules. Availability, security, compatibility, and operational needs count when they are actual requirements. A mechanism can be avoidable in the long term yet still worth retaining now.

Inspect rules and state combinations, hidden ownership, change coupling, dependencies, translation, concurrency, retries, and operational work. File size and line count are leads, not verdicts. Prefer concrete observations over invented complexity percentages.

## Show and decide

Lead with the main finding and a compact E/A/? view: a responsibility tree, call/dependency graph, state sequence, or current/proposed structural diff. Label arrows and use real names. Mark collapsed detail so the visual cannot imply omitted work disappeared.

For each worthwhile simplification, identify:

- The concrete rule, state, dependency, or coordination burden removed.
- The retained responsibility and who will own it.
- The behavior and constraints preserved, with evidence.
- Migration cost, tradeoffs, and new failure modes.
- The check that establishes completion.

Compare the total burden, including work moved into a tool, helper, configuration, or manual procedure. Stop when the deciding facts are established. If no worthwhile simplification exists in the inspected scope, say so. Finish with a concise prioritized recommendation and material uncertainties. Assessment authorizes analysis and requested visual artifacts; wait for implementation approval before refactoring.
