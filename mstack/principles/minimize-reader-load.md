# Minimize reader load

Prefer the smallest complete solution. Before adding a layer, identify the repeated decision or actual variation it owns. Count the jumps and hidden state a reader needs to answer a concrete question. Collapse redundant wrappers and narrow mutable scope when behavior and ownership remain clear.

Subtract obsolete machinery when replacing it. In an approved migration, move callers to the target design and remove superseded internal paths rather than maintaining throwaway compatibility states. Preserve real compatibility requirements and unrelated work.

Fewer lines alone do not prove simplicity. Name the rule, state, dependency, or coordination burden that disappears, and where any retained responsibility goes.
