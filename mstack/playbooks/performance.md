# Performance and hillclimbing

Read [Explain the number](../principles/explain-the-number.md).

1. Define the user-visible metric, workload, constraints, environment, and baseline. Determine the limiting resource before proposing an optimization.
2. For a one-off performance issue, trace the bottleneck and approve a fix sketch/spec. For a hillclimb, approve the metric, target, time/resource budget, permitted experiment scope, and stopping condition. That agreement may authorize a series of in-scope experiments.
3. Test one causal hypothesis at a time. Compare repeated before/after runs under equivalent conditions, check correctness, and account for noise and displaced cost.
4. Keep a compact experiment log for sustained work: hypothesis, revision, method, result, decision. Reject regressions without disturbing unrelated work; preserve accepted improvements in coherent commits.
5. Stop at the target, budget, or lack of a credible next hypothesis. Report the actual improvement and remaining limits. Production improvements use [finish delivery](finish-delivery.md); a measurement-only request ends with evidence.
