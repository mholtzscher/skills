# Architecture, arena, and swarm

Read [orchestration](../references/orchestration.md). Select the actual intent; these are deliberate tools, not mandatory steps for every function.

## Architecture

Sketch types, function signatures, class shapes, and module boundaries with `not implemented` bodies and pseudocode before filling in code. Start from the caller's desired usage, domain shape, and ownership. Use direct design or selective independent perspectives, then synthesize the evidence into one design package.

Before work, open a checklist with all five phases and their completion conditions:

1. Ground the relevant systems and constraints.
2. Sketch the caller's usage and architecture.
3. Agree the design and implementation authority.
4. Implement against the approved sketch, only for an authorized coding task.
5. Scrap and revisit the design if implementation reveals a pattern of architectural failure.

For an architecture-only request, the implementation phase remains unstarted. The scrap phase is a decision checkpoint, not a requirement to reject a sound design.

### Phase A: Ground the problem

Build a real mental model of every system the new code touches. Follow [How](explanation.md#how) over the relevant subsystems and produce its architectural explanation. Naming files is not grounding. Explain actual mechanics, callers, ownership, data flow, and consequential failure paths. If the design redefines ownership or layering, also follow a scoped [Why](explanation.md#why) investigation of the existing shape so established rationale becomes a constraint rather than a guess.

Reuse adequate grounding already established in the conversation, including its uncertainty and coverage limits. Keep research read-only and bounded to the design question. Skip this phase only for genuinely greenfield work with no surrounding system to integrate.

### Phase B: Sketch

Write the caller's usage first, then derive types, signatures, class shapes, and module boundaries from it. Leave bodies `not implemented`, with pseudocode and intent/invariant comments where needed. Apply the complete [runner discipline](../references/exploration/runner-prompt.md) to direct design as well as delegated candidates.

Choose direct work or multiple host-configured perspectives according to the uncertainty. One well-supported design can finish this phase. When credible alternatives would resolve a consequential uncertainty, compare whole, structurally distinct shapes rather than point fixes inside one shape. Two or three candidates can be useful; they are not a quota. Read [Explore alternatives](../principles/explore-alternatives.md) for that choice. The existing [Arena](#arena) procedure is optional when useful, not a required dispatch or a prerequisite for local architecture comparison.

For delegated candidates, give each the task, grounding artifacts, absolute isolated output target, ownership constraints, applicable Architecture instructions, shared context, and [runner prompt](../references/exploration/runner-prompt.md). Supply the instructions in the brief so the runner can complete its assigned phase without reopening the parent workflow. Use actual available tools and host-configured roles/models through [orchestration](../references/orchestration.md). Keep candidates independent until an explicitly authorized later iteration. Requested independence or model diversity must be real; report an unavailable requirement instead of relabeling direct work or same-model roles.

Screen every actual candidate against the complete [design red flags](../references/exploration/design-red-flags.md) before synthesis. Assume the next contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Prefer a design where a change that looks correct in one file satisfies the whole contract. Investigate concrete harm before treating a structural diagnostic as a blocker.

Compare viable designs on interface depth. Prefer the design that hides more complexity behind a smaller, simpler public interface. A capable interface can keep call chains short by concentrating responsibility instead of scattering it across layers. A deep module is not a deep call chain, and a simple interface can justify a complex implementation. Read [Minimize reader load](../principles/minimize-reader-load.md).

Produce one synthesized design package. Record the base, useful adaptations, rejected choices, and actual attribution in the rationale's [synthesis decision](../references/exploration/rationale-template.md#synthesis-decision). For a single candidate, describe the direct decision honestly. Do not invent other candidates, model identities, independent agreement, or an Arena verdict. Reconcile proposed usage and types to the actual required contract rather than inventing constraints to make a preferred shape fit.

### Phase C: Agree

Present the complete design package and request approval before implementation, including code stubs or repository scaffolds. Both [planning paths](planning.md#approval) require approval. Reuse prior approval only when it covers this exact shape and scope. A material deviation needs a revised approved plan. An architecture-only request stops after presenting the package and approval request; design approval alone does not turn it into a coding task.

A requested design artifact may be written at its authorized path as planning work. Otherwise present the sketch in the reply or another authorized artifact. Writing product-code stubs or scaffolds into the checkout is implementation, even if their bodies only throw `not implemented`.

Within an authorized coding task, an approved scaffold can form a coherent separate commit. If filling it in requires temporary breakage, declare the isolated phase's scope, reversibility, affected checks, and green exit gates before breakage begins, following [Verifiable units](../principles/verifiable-units.md#declare-migration-phases-when-temporary-breakage-is-necessary). This does not authorize a broken shared or published branch, automatic history rewriting, or publication from an architecture-only task.

For useful adversarial pressure, use a scoped [review](review.md) of the sketch before implementation. That review is report-only and does not authorize fixes. If the human pushes back on the shape, treat it as grounding evidence. Revisit Phase A and Phase B before writing more code, then seek approval of the revised design rather than automatically resuming.

### Phase D: Implement against the sketch

Enter this phase only when the caller grants implementation authority through the selected coding path. Replace `not implemented` bodies with code and pseudocode with logic. The approved sketch is the contract. Surface deviations instead of silently absorbing them. If a function needs an unanticipated parameter, identify whether the sketch was wrong, a requirement was missed, or implementation is overreaching. Resolve material changes through approval before proceeding.

Verify behavior through the selected coding playbook. Compilation or a completed scaffold alone is not proof that the design works.

### Phase E: Scrap when the architecture is wrong

If implementation keeps producing friction the sketch cannot absorb, revise the design rather than accumulating fixes on the wrong structure. Read [Question the premise](../principles/question-the-premise.md). The signal is a pattern, not a single instance:

- The same shape of workaround appears repeatedly across unrelated code.
- Multiple unrelated edge cases all require special-case branches.
- Types need escape hatches such as `any`, casts, or optional fields always set in practice to compile.
- A "we need a lock" reflex contradicts a sketch that said the state was not shared.
- Callers must know the abstraction's internal rules to use it.
- Two or more independent Phase D deviations have the same shape across the implementation.

Use judgment. A few edge cases do not condemn an architecture. Some problems are legitimately complex. Complexity in the data is not necessarily complexity in the design.

When the pattern warrants a new shape:

1. Follow [How](explanation.md#how) over what has actually been built.
2. Redesign as if the newly discovered constraints had been day-one assumptions.
3. Subtract before adding. Identify the rules, states, dependencies, jumps, or coordination burden that the replacement removes and where retained responsibility goes. Compare concrete reader burden, not a size or deletion quota, using [Minimize reader load](../principles/minimize-reader-load.md#subtract-before-construction).
4. Return to Phase B, compare alternatives when useful, and return to approval if the shape changes.

Scrapping means revising the design and proposing or making an authorized owned replacement. It does not grant authority to delete someone else's work, reset commits, discard evidence, or expand the approved migration.

### Outputs

Write the caller's usage first and derive the type sketch from it. For small changes, provide one file's worth of new types and signatures. For larger work, provide a module map plus type definitions and ownership. Ship a one-page rationale alongside, following every section of the [rationale template](../references/exploration/rationale-template.md), including usage and synthesis decision.

Identify the grounded source, checks actually performed, proposed future usage, unknowns, and approval state. A hypothetical caller is a design proposal, not an observed production consumer. Cite each read principle that materially changed a decision and explain the choice it changed. End with a supported design decision or the exact blocker, not an automatic implementation or PR.

## Arena

Define the candidate question, common baseline, constraints, comparison criteria, and budget before dispatch. For executable candidates, get the experiment sketch approved and isolate writers in separate worktrees. Give each the same task and independent space; avoid feeding one candidate another's conclusion.

Evaluate against the agreed criteria and real checks. Choose a base and identify specific useful parts to integrate. The lead owns integration and revalidation; a collection of individually good fragments is not a verified combined solution. Keep losing candidates until their evidence is recorded, then clean up only work created for the experiment. Production integration follows the approved coding playbook.

## Swarm

Fan out N actual parallel workers, drain their results, and return one consolidated report. Workers may cover separate slices, race the same brief, mix both, or run a gauntlet of defined checks. Local workers are not cloud machines. An explicit remote-machine or model-race requirement remains unmet when the backend or requested models are unavailable.

Before launching anything, open a checklist for Frame, Fan out, Aggregate, and Report. Use [orchestration](../references/orchestration.md) and the adapter for the actual host, [OpenCode](../references/hosts/opencode.md) or [Pi](../references/hosts/pi.md). Implementation or executable experiments need the existing sketch/spec approval; read-only coverage does not authorize fixes or delivery.

### Phase A: Frame

1. State the done predicate, required coverage, and artifact or report the swarm must return. Establish common immutable evidence and criteria before dispatch.
2. Choose the shape. Partition the question into independent slices or a coverage matrix, race N workers on identical briefs, or mix both. A gauntlet assigns the relevant checks explicitly. Assign each required slice once and identify intentional overlap for cross-checking. For a race or mixed shape, declare `first pass`, `rank all`, or `best-of`, with selection criteria, tie-breakers, and budget before launch.
3. Set N from the user or derive it from the shape. N is the total worker count, not the host concurrency limit. Do not add redundant agents to fill a quota. Record any host limit that prevents the requested concurrency.
4. Choose available host-configured agents/models from current schemas. Omit a model override to use the configured default. Name each actual model arm up front for a model race and report only identities confirmed by calls or returned metadata. Unsupported parameters or model IDs are capability gaps to resolve within the actual schema, not permission to invent a fallback family, modify configuration, or claim diversity.
5. Give every writer a distinct absolute output directory or worktree and explicit file ownership. Establish the actual base branch and revision. If work must start from a particular pushed branch, verify it and select a real supported checkout/worktree at its SHA. Pass only parameters the current host actually exposes.
6. When workers verify or measure commits, name the exact SHAs in each brief rather than moving refs. Measurement briefs also define the method, including sample count, what one sample means, and order. Require the worker to record both the exact SHAs and method in its result. Read the full [benchmark checklist](../references/performance/benchmark-checklist.md) before measurement claims or benchmark design, through [Explain the number](../principles/explain-the-number.md). Non-measurement tasks do not need a fabricated sampling protocol.

Define the race rule precisely:

- `first pass` selects the first result observed to satisfy the declared criteria after verification. The fastest unverified `PASS` claim does not win. Preserve observed arrival order and validation outcomes. If order cannot be established, report that limit rather than inventing it.
- `rank all` evaluates every valid terminal result by the declared criteria and tie-breaker and returns the full supported ranking, with invalid or missing arms listed as gaps.
- `best-of` selects the best valid result within the declared budget using the stated score or comparison criteria and tie-breaker. Missing results are not passes or evidence of inferiority. Preserve gaps alongside the selection.

### Phase B: Fan out

Launch all N workers through actual asynchronous host delegation, concurrently when their prerequisites and host capacity permit. Use separate worktrees or genuinely isolated output directories for writers. Read-only workers may share the immutable snapshot. Sequential direct analysis is not independent parallel execution.

Every brief stands alone. Include the goal, scope, exact slice or race arm, immutable evidence and criteria, absolute cwd/output paths, actual base revision, ownership, allowed side effects, verification, budget, and report contract. Include exact SHAs and measurement method when applicable. Keep shared acceptance criteria outside worker write ownership.

Require one terminal status of `PASS`, `ISSUES`, or `BLOCKED`, with evidence. `PASS` means the assigned acceptance criteria were actually checked and met. `ISSUES` lists every defect the worker can prove, not just the first. `BLOCKED` names the unmet prerequisite or unavailable deciding evidence. Unknown or inaccessible source evidence cannot become `PASS`.

If a worker drops out, continue useful work with N-1 and note the dropout. A missing required slice still blocks the coverage done predicate. Retain actual worker/run identifiers and consume native completion notices. Use only real advertised status, continuation, wait, or stop operations; a changed status file does not prove termination.

An early race selection does not permit abandoning owned workers or processes. Drain all launched workers and record their terminal states, or report explicit unknown liveness and incomplete work. Do not claim cancellation without a real supported operation and confirmed outcome.

If delegation is unavailable and independent concurrency is optional, continue as direct analysis and explicitly identify that substitution. Do not call it a completed swarm. A request that specifically requires independent parallel agents remains blocked until the user changes that requirement or the capability is available.

### Phase C: Aggregate

Read the actual terminal reports and validate each against its brief. Verify the evidence, exact target SHAs, and measurement method where required. A result missing or contradicting its required SHAs/method is invalid for acceptance. Preserve its report as evidence of the failure instead of silently fixing its receipt.

For that invalid result, respawn the worker once with the same bounded task and slice/arm identity, using a fresh actual worker and only when budget and authority allow. A retry reruns the task; it does not patch the old report to make it look valid. After a second miss, record a gap. If budget, authority, or prerequisites prevent the retry, record the unmet coverage immediately. Neither case counts as a pass.

For coverage, every required slice needs a valid terminal result and evidence that the done predicate holds. An `ISSUES` report can complete the investigation of a slice, but it is not a successful verification of the target. Resolve status against the actual predicate. For a race, apply only the selection rule and criteria declared before launch to valid receipts. Keep invalid, blocked, and missing arms visible. Do not change the criteria after seeing results or rank a missing arm as passing.

Keep a compact table with worker identity, slice or arm, exact target, actual status, evidence, issues, and gaps. Include exact SHAs and method when relevant. Verify and deduplicate issues into one-line findings without dropping proven defects. Resolve contradictions against the evidence or report the disagreement and deciding gap. Agreement is a lead, not proof. Do not paste raw worker dumps.

### Phase D: Report

Return one consolidated in-chat report with the result table, all evidenced issue one-liners, coverage gaps, disagreements, dropouts, actual retries, and the race rule and selection when used. State whether the done predicate was met and whether every launched worker reached a confirmed terminal state. Unknown liveness or missing required coverage remains incomplete, even if an early winner was selected. Distinguish actual independent execution from direct fallback, local from remote execution, and known model identity from unavailable metadata.

Stop at this report unless the caller separately authorized subsequent implementation or delivery. Findings and selected candidates do not automatically authorize fixes or PR publication.

All modes end with evidence for the decision or a clear blocker. They do not automatically publish competing PRs.
