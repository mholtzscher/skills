# Performance and hillclimbing

Read [Explain the number](../principles/explain-the-number.md).

Select the requested route: a [one-off performance issue](#one-off-performance-issue), a [sustained hillclimb](#hillclimb), or [measurement only](#measurement-only). Use the [benchmark checklist](../references/performance/benchmark-checklist.md) whenever producing or acting on a performance number.

## One-off performance issue

1. Define the user-visible metric, workload, constraints, environment, and baseline. Vet the baseline with the [benchmark checklist](../references/performance/benchmark-checklist.md) and determine the limiting resource before proposing an optimization.
2. Trace the bottleneck and approve a fix sketch/spec. Consider the [performance mantras](#performance-mantras) in order, cheapest first; a one-off fix can stop searching when an earlier mantra meets its target.
3. Test one causal hypothesis at a time. Compare repeated before/after runs under equivalent conditions using the checklist, check correctness, and account for noise and displaced cost. Reject regressions without disturbing unrelated work; preserve accepted improvements in coherent commits.
4. Stop at the target, budget, or lack of a credible next hypothesis. Report the actual improvement and remaining limits. Approved production improvements use [finish delivery](finish-delivery.md); a measurement-only request ends with evidence.

## Performance mantras

For a performance metric, order mechanism-grounded hypotheses by these mantras, cheapest first:

1. Don't do it. Stop work whose result nothing uses rather than cheapening it.
2. Do it, but don't do it again.
3. Do it less.
4. Do it later.
5. Do it when they're not looking.
6. Do it concurrently.
7. Do it cheaper.

Hillclimbing borrows this order, not the one-off route's stop rule: its agreed predicate and budget govern completion.

## Hillclimb

Own the metric and the experiment's integrity. Supervise and review any delegated attempts. This is for sustained, iterative improvement of one measurable thing against a target. For a one-off fix, use [Bug fix](bug-fix.md) or the [one-off performance route](#one-off-performance-issue).

Core discipline: one change, one measurement, keep or revert. Never stack untested changes, and never claim a win from code inspection; read [Prove it works](../principles/prove-it-works.md).

1. **Ground the workload, then agree the contract.** Investigate the target's execution path and architecture with [How](explanation.md#how). Name realistic workload dimensions that can move the result (data size, history, state, concurrency), and select a case that reproduces the user's complaint. If none reproduces it, repair the reproduction instead of hillclimbing; obtain approval before writing reproduction code. Then fix one metric, its unit, the direction that counts as better, and a checkable stop predicate pairing a target with a floor on attempts so a lucky early win cannot end the run. Use the user's numbers when given; otherwise agree them. “At least 50% better than baseline and at least 10 iterations” is an example of the shape, not a default. Agree the time/resource budget, permitted experiment scope, regression gate, and stopping conditions. Obtain [sketch/spec approval](../SKILL.md#scope-and-approval) before writing harness, experimental, or product code. An approved series covers subsequent in-scope attempts within that metric, target, budget, scope, and stop predicate; reuse it rather than asking again for each attempt. Material changes return to approval.
2. **Build, prove, and freeze the harness.** Run contrasting realistic workloads and confirm that the target case reproduces the symptom while easier cases separate as expected. If the harness cannot distinguish them, revise the workload or metric within approval, or reopen the contract. Vet it with the [benchmark checklist](../references/performance/benchmark-checklist.md) before freezing it, including independent profiling outside reported runs. Make it print its error count and a count of work done; also verify output correctness. Once frozen, one repeatable command emits the metric, sampled enough to clear noise (median of N, not a single run; at least five alternating runs per side for comparisons, with range and close-call statistics as needed). Record the baseline metric, raw evidence, and a green run of the regression gate before any candidate change. Keep comparable versions, data, configuration, warmup/cache conditions, and resource conditions. The frozen harness is not an optimization target: never change it to manufacture wins. If evidence invalidates it, report why, pause the affected comparisons, and re-establish a comparable baseline under an approved harness revision before resuming; do not splice incompatible measurements into a speedup.
3. **Open the decision log.** Use a local, non-shipped `decision.tsv`, one row per attempt, with this exact column order (tabs between fields):

   ```text
   id	hypothesis	change	before	after	delta	tests	verdict	note
   ```

   Read it before every attempt so rejected ideas, accepted wins, and prior evidence inform the next choice. Record the revision/diff and command/evidence paths in the relevant fields, with verdict `kept` or `reverted` and enough test/error/work/correctness detail to audit the decision. Follow repository policy for local logs: use an existing ignored destination when available; otherwise place it outside the tree. Do not silently edit tracked ignore/config files or ship the log. Report its path. No separate logging helper is required.

4. **Ground each hypothesis in a mechanism.** Use the architecture model from step 1: “defer X off the boot path because it blocks first paint,” not “try memoizing something.” For a performance metric, order hypotheses by the seven [performance mantras](#performance-mantras). Borrow only their order, not the one-off stop rule.
5. **Loop, one hypothesis per iteration.**
   - Keep coupled implementation with one writer. Implement directly or selectively delegate a tightly scoped attempt using actual host-configured roles/models and [orchestration](../references/orchestration.md); no model sheet or setup is required. Supervise and review delegated diffs. Independent hypotheses may use isolated worktrees when useful and authorized; read [Separate ownership](../principles/separate-ownership.md). Serialize measurements on shared resources or otherwise control contention so competing workloads cannot invalidate comparisons. Shared measurement controls do not require extra infrastructure by default.
   - Measure before and after with the frozen harness and run the regression gate. Inspect actual error/work counts and correctness evidence, and check noise rather than trusting a favorable single sample.
   - Accept a performance win only when the metric moves past noise and the gate stays green. Otherwise revert the owned attempt changes in full, preserving prior accepted wins and unrelated/user work. A tweak that “might help” is not kept. The explicit simplification exception in step 6 requires correctness and no measurable regression; label it simplification, not a speedup.
   - Make one coherent commit per accepted fix, staging only owned changed files (`git add <files>`, not `git add -A`). Log the row either way, kept or reverted. Commit/publication authority remains that of the approved task, not a measurement-only request.

   Each iteration ends in a check before the next begins; read [Verifiable units](../principles/verifiable-units.md). Iterate while this session is executing. If the run needs unattended wakeups or restart survival, check the real scheduling capability described in [Autonomous run](autonomous.md), not that playbook's stop rule. Missing scheduling blocks unattended continuation, not an actively executing local iteration. Do not promise a scheduler the host does not provide.

6. **Push past the first plateau.** On a stall or several rejects in a row, pivot category, combine near-misses into one new testable hypothesis, re-read the source, or try something more radical within approved scope before concluding the hill is climbed. Combining near-misses is a fresh bounded attempt, not permission to stack untested changes. Correctness and simplicity outrank the number. Revert an apparent win that breaks behavior. Keep a simplification that holds the number only when correctness remains established and repeated measurements show no regression; report it honestly as a simplification, not a measured speedup. Read [Minimize reader load](../principles/minimize-reader-load.md) when judging that tradeoff.
7. **Stop honestly.** Stop successfully when the agreed target and attempt floor are both met. Stop incomplete at budget expiry, an explicit user stop, correctness failure that cannot be resolved in scope, an unavailable prerequisite, or exhausted credible ideas whose remaining marginal benefit is not worth the cost. The attempt floor never overrides those boundaries. Do not relax the predicate to claim success or quit while cheap untried credible hypotheses remain within scope and budget. Surface a stall rather than spin. Distinguish an unmet target from success, even if some attempts improved the baseline.
8. **Finish the requested work.** Approved production improvements use [finish delivery](finish-delivery.md): accepted commits in their landed order, one ordinary unmerged PR, and required-CI repair. Do not automatically create a PR stack or merge. A measurement-only task returns evidence, not product changes or publication.

**Reply:** the metric and target (including direction and attempt floor), baseline to final with units and percent delta, whether the predicate was met and why the run stopped, iterations run (kept versus reverted), each accepted fix on one line (distinguishing simplifications), the `decision.tsv` path, measurement/regression evidence and gaps, and the best idea to try next if pushed further.

## Measurement only

Establish the requested claim, workload, environment, baseline/options, and constraints. Apply the [benchmark checklist](../references/performance/benchmark-checklist.md), including its narrow exception for a user-requested ballpark. A choice between options is not a ballpark. Reuse existing approved tools/harnesses; writing experimental or harness code still needs an approved sketch and an isolated explicitly disposable target. Profile or stop workloads only with available tools and actual authority; do not automatically install tools, kill unrelated processes, or change environment configuration. Return the verdict, method, raw evidence/artifact paths, and uncertainties. Missing tools or deciding evidence mean a named gap or inconclusive comparison, not a winner. This route does not authorize product improvements, commits, pushes, or a PR.
