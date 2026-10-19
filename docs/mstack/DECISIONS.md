# Mstack maintenance decisions

Initial record created 2026-10-15 from the original design session's user messages and completed question/answer records, including material before compaction, and cross-checked against the published bundle at `f26c267`. Later decisions cite their own approval evidence. This is the durable record of design intent; [SKILL.md](../../mstack/SKILL.md) and its linked playbooks contain the executable instructions, and [PROVENANCE.md](PROVENANCE.md) identifies adapted sources.

The decisions below are accepted unless explicitly marked otherwise. Rationale summarizes the tradeoffs discussed; detailed implementation choices are identified as such rather than presented as separate user votes. Original approval records are indexed under [Sources](#sources). Earlier session history informed the discussion but does not override these choices.

When revising a decision, retain its ID and old outcome as superseded, link its replacement, and record the new approval and reason. Add proposals separately until accepted. Refresh dated validation observations when new evidence arrives; a missing test or upstream feature is not permission or a commitment to add it.

## Accepted decisions

### D01: Own the workflow independently

Mstack owns Michael's engineering workflow in this repository. Adapt pstack's playbook/principle structure and broad supporting toolkit, integrate orchestration, and replace useful workflow-tools mechanics with bundled scripts. Independent maintenance allows the workflow to follow Michael's preferences rather than upstream's personalized defaults. Upstream parity and a workflow-tools runtime dependency are not goals. Preserve attribution and licenses when adapting content. [E1](#e1-original-purpose-and-hosts), [E6](#e6-initial-implementation-approval).

### D02: One explicit entry point and three terms

`mstack/SKILL.md` is the sole discoverable entry, explicitly invoked for a task in OpenCode V2 or Pi. Supporting procedures are plain Markdown. Use **playbook** for a task procedure, **principle** for cross-cutting decision guidance, and **role** for a delegated responsibility, as defined in [GLOSSARY.md](GLOSSARY.md).

**Superseded:** the initially approved main-plus-shortcuts layout, nested `mstack/skills/`, and the redundant formal term **capability**. One entry reduced discovery complexity and repeated instruction loading; one name for procedures removed an unnecessary distinction. Preserve the substantive specialist instructions when changing packaging. [E1](#e1-original-purpose-and-hosts), [E8](#e8-single-entry-and-terminology).

### D03: Consolidate routing without losing instructions

Shared rules, the principle index, host selection, investigation guidance, and PR intent routing live in the main skill. Load only the selected playbooks and relevant principle leaves. Repeated directions to read already-loaded shared rules were removed because they added reads without context.

Approved consolidations: code/prose/comments in [cleanup](../../mstack/playbooks/cleanup/PLAYBOOK.md); recall/catch-up/pickup/pause in [continuity](../../mstack/playbooks/continuity/PLAYBOOK.md); how/why/teach in [explanation](../../mstack/playbooks/explanation/PLAYBOOK.md); sketch/spec-planner/refinement in [planning](../../mstack/playbooks/planning/PLAYBOOK.md); six PR operations in [pull requests](../../mstack/playbooks/pull-requests/PLAYBOOK.md). Named sections preserve each operation's permissions and stopping point. Spec implementation, finish delivery, grilling, and domain modeling remain separate procedures.

The user explicitly required exact text preservation during consolidation. Headings, relative links, and agreed terminology changed; substantive instruction rewriting was not part of that permission. This does not freeze wording forever: future intentional changes need their own scope. [E7](#e7-shared-context-consolidation), [E9](#e9-playbook-consolidation).

On 2026-10-15, the user requested fixes for three entry-document annotations in Plannotator review `pn-d961f9`. Remove the direct README pointer from the fallback route, remove the principle index's self-link and duplicate instructions, and replace the separate Bundle paths section with one opening sentence about resolving relative links. Installation guidance remains in the bundle guide, reached through Help for relevant requests. Preserve conditional reading and D08's material-citation requirements. This refines the entry document without changing the selected workflows or D13's whole-bundle installation requirement.

### D04: Approve both planning paths

The agent chooses an implementation sketch or full spec based on uncertainty, impact, and scope; the user can override that choice. **Both require approval before implementation.** Reuse already-given approval and reopen it when material new evidence changes the outcome. Full specs remain first-class implementation contracts; refinement proposes changes before editing them.

**Rejected:** showing a small sketch and proceeding automatically. The user's answer was “Approve every sketch.” Smaller work reduces planning depth, not user control. This intentionally replaces pstack's “Never Block on the Human” posture. [E3](#e3-planning-and-pr-contracts).

On 2026-10-15, the user approved removing duplicated planning details from the entry's Scope and approval section with "let's do that". The entry retains the approval requirement and links to Planning for depth selection and proposal contents. Existing approval reuse, read-only and experiment boundaries, and publication authority remain in the shared rules.

### D05: Approved ordinary coding includes delivery

Approved feature, bug-fix, refactoring, and spec-implementation work continues through verification, cleanup, one PR, and repair of required CI within scope. Ordinary delivery stops before merging. Stacked delivery and merging remain explicitly requested advanced operations.

**Rejected:** making verified local changes the ordinary stopping point. The user chose “Publish ordinary coding too” and “Fix CI for coding tasks.” This authority belongs to approved coding; investigation, planning, review, and check snapshots retain their own completion conditions. See [scope and approval](../../mstack/SKILL.md#scope-and-approval) and [finish delivery](../../mstack/playbooks/finish-delivery/PLAYBOOK.md). [E2](#e2-delegation-delivery-and-activation), [E3](#e3-planning-and-pr-contracts).

### D06: Preserve distinct PR intents and agreement boundaries

Publish, rewrite metadata, triage feedback, fix agreed feedback, inspect checks, and watch are independently selectable operations. Triage is read-only until agreement. Feedback fixes must publish successfully before reactions or thread resolution. Monitoring after standalone publication or feedback fixes is read-only; coding tasks own required-CI repair. An immediate checks request does not become a waiting or repair loop.

Keep the visual PR format: **Why the change**, **Special things to note**, a compact **Change outline**, and verification results. Explicit PR URLs/numbers are accepted. The [PR playbook](../../mstack/playbooks/pull-requests/PLAYBOOK.md) implements these boundaries, including its bounded 30-minute publication watcher and opt-out; merging its files did not merge its permissions. [E3](#e3-planning-and-pr-contracts), [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval), [E9](#e9-playbook-consolidation).

### D07: Delegate selectively; let hosts own models

Use separate contexts when independent exploration, implementation, or review materially helps. Coupled implementation has one writer, and the coordinator accepts delegated evidence. Optional delegation can fall back to disclosed direct work where sound; an explicitly required independent review or parallel run remains unmet until available or revised by the user.

Models and roles come from host configuration. **Rejected:** mandatory implementation delegation, routine design panels, a model sheet, and even an optional mstack-specific model-setup workflow. OpenCode/Pi adapters translate actual host capabilities rather than duplicating workflow policy. See [orchestration](../../mstack/references/orchestration.md) and [host selection](../../mstack/SKILL.md#host-selection). [E2](#e2-delegation-delivery-and-activation), [E3](#e3-planning-and-pr-contracts), [E4](#e4-principles-cleanup-and-models).

### D08: Retain material principle citations

Read relevant principle leaves and cite a principle when it materially changes a decision, naming the concrete choice it affected. The user retained explicit citations rather than making principles entirely implicit. Relevance determines which principles apply; their presence does not automatically trigger a heavyweight design or delegation exercise. [E4](#e4-principles-cleanup-and-models), [E6](#e6-initial-implementation-approval).

### D09: Keep all three cleanup passes and useful rationale

Code cleanup, prose cleanup, and dedicated comment review are mandatory before publication. They are distinct passes, not a requirement for three simultaneous writing agents. Independent report-only review is useful when available; the owner applies accepted changes within scope.

Comment review preserves useful non-obvious rationale and investigates uncertain constraints before recommending deletion. **Rejected:** inheriting pstack's default-to-delete treatment of unresolved constraint comments. Encoding a real constraint in a type, test, or assertion is preferable when practical, but uncertainty alone is not evidence that a comment is worthless. See [cleanup](../../mstack/playbooks/cleanup/PLAYBOOK.md). [E4](#e4-principles-cleanup-and-models), [E5](#e5-vendoring-migration-and-review-surface).

### D10: Vendor selected procedures; keep specialists external

Vendor/adapt show-me, show-complexity, spec-planner, grilling, and domain-modeling with required supporting references. Integrate agent-orchestrator and deprecate its standalone skill. These procedures are maintained mstack content, reached through the single entry.

Technical and tool-specific skills remain external: service-design, go-test-effectiveness, skill-creator, writing-for-agents, agent-browser, and terminal-control. No external skill is mandatory at bundle startup; a task still requires the actual tools needed to complete it. This keeps independently evolving tool instructions with their owners while making the selected planning/explanation workflow self-contained. **Rejected proposal:** reference all the planning/explanation procedures externally. [E5](#e5-vendoring-migration-and-review-surface).

On 2026-10-15, Plannotator review `pn-55dbd7` requested removal of the entry's optional-specialist paragraph as unnecessary. Remove that repeated catalog. Task-specific verification and authoring guidance still identify relevant specialists, and shared completion rules still require reporting unavailable capabilities. The external-specialist policy remains unchanged.

### D11: Put deterministic mechanics in standalone Bun scripts

Use Bun/TypeScript for reusable PR targeting, paginated thread collection, conservative check classification, and bounded failure-log evidence. Preserve unknown/unavailable evidence as distinct from success and detect inconsistent snapshots. Keep approval and publication policy in the playbooks. Explicit spec paths and PR targets are supported; repository defaults are conveniences rather than a strict slash-command grammar.

This retains useful workflow-tools logic without its plugin lifecycle or prompt-injection machinery. The four PR evidence helpers are read-only and use `gh`. D25 adds a separate local append helper for decision trails. Publication uses Git/GitHub tools under the selected workflow. Mstack supplies neither a scheduler nor host-enforced permissions. [E3](#e3-planning-and-pr-contracts), [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval).

### D12: Host questions are the default review interface

Use structured host questions for decisions, with conversational fallback. Plannotator/Inbox is optional when requested or useful for artifact review. **Rejected:** requiring Inbox or artifact sign-off for every proposal. Approval is mandatory where the workflow requires it; a particular review UI is not. [E5](#e5-vendoring-migration-and-review-surface).

### D13: Build and publish before a separate cutover

Building the bundle, deprecating the standalone orchestrator, and publishing the work are authorized independently of installation, global host configuration, and workflow-tools removal. Those cutover actions need their own request. This keeps development and review from silently changing the user's active environment.

The resulting packaging requires the entire `mstack/` directory under a skill search root. An explicit OpenCode source points at the parent containing `mstack/`; the obsolete `mstack/skills` source must be changed during cutover. See [installation](README.md#install-the-whole-bundle) and [migration](README.md#migration). [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval), [E8](#e8-single-entry-and-terminology).

D29 narrows `mstack/` to runtime files. Maintenance records and development tooling now live outside the installable directory; the whole-runtime installation and separate cutover requirements remain.

### D14: Include verification-skill creation and maintenance

The initial bundle had general verification guidance but omitted pstack's project verification-skill workflows. The user approved adding one [verification-skill playbook](../../mstack/playbooks/verification-skill/PLAYBOOK.md) with Create and Maintain sections and the worked feature-map resources.

The implemented adaptation defaults generated skills to project-local `.agents/skills/verify-<app>/`, shared by OpenCode and Pi. Creation proves one mapped feature end to end. Maintenance covers every mapped feature against source and live behavior, confines corrections to the target skill directory, and reports clean, changed, or blocked. Both retain evidence through owned cleanup. Mstack approval gates and selective source-reading delegation replace upstream host/path and mandatory-delegation assumptions. These are the adaptation's implemented details; real-app evaluation remains a separate evidence gap. [E10](#e10-verification-skill-addition).

### D15: Commit maintenance context

Keep this decision record and a short maintainer `AGENTS.md`, link them from the development guide, and make provenance refer to the committed record. The user approved this after asking how future sessions could recover context lost through compaction. Store decisions, rationale, source locators, and known gaps rather than a personal transcript dump. A repository-root pointer makes the maintainer instructions reachable when a session starts above `mstack/`. [E11](#e11-durable-maintenance-context).

D29 supersedes their original location inside the installed bundle. The records and maintainer instructions live in `docs/mstack/`, reached through repository-root `AGENTS.md`.

### D16: Restore show-me source fidelity

Accepted 2026-10-15. Restore the complete show-me source body rather than summarizing its examples into a view-selection table. The condensed playbook had retained only one of ten worked examples and omitted the product-styling and desktop/mobile requirements. Keep the original examples and substantive guidance; limit adaptations to single-entry packaging, host-compatible file opening, and formatting. This supersedes the initial condensed show-me implementation while retaining D02's single entry and the shared approval rules.

Keep attribution out of this playbook's runtime instructions, as requested to avoid confusing the agent. Source identity and license notices remain in [PROVENANCE.md](PROVENANCE.md#show-me-source-fidelity) and [LICENSE](../../mstack/LICENSE). The approval covers this show-me restoration and publication to PR #2; it does not authorize rewriting other vendored procedures. [E12](#e12-show-me-restoration).

### D17: Restore spec-planner source fidelity

Accepted 2026-10-15. Restore the full spec-planner workflow and all four original references instead of the condensed full-spec procedure and short format/decision summaries. The approval explicitly includes phase reporting, effort estimates, and completeness checks. Retain philosophy, clarification/discovery detail, implementation contracts, scope control, templates, and the final handoff. Publish the restoration to PR #2. [E13](#e13-spec-planner-restoration).

Keep mstack's sketch route, both approval gates, reuse of prior interview answers, explicit output paths, separate proposal-only existing-spec refinement, and OpenCode/Pi tool adaptations. Restore the four references with formatting changes only; preserve the separate domain-record resource during this restoration (subsequently replaced by the full formats under D18). The complete adaptation list is in [provenance](PROVENANCE.md#spec-planner-source-fidelity) and [the source audit](SOURCE-AUDIT.md#spec-planner-restoration-adaptations). This approval restores spec-planner; the broader audit does not authorize all proposed restorations.

### D18: Restore the remaining selected vendor procedures

Accepted 2026-10-15. Restore show-complexity, grilling, and domain-modeling from their complete source bodies and supporting resources, and publish to PR #2. This supersedes their condensed implementations. Show-complexity regains its visual-selection table, worked comparison, and detailed evidence/assessment guidance. Grilling regains the whole-frontier round, recommendation-accepting question wording, and empty-frontier completion contract. Domain modeling regains the concrete examples, context layouts, and complete glossary/ADR formats. [E15](#e15-three-procedure-restoration).

Retain host questions with conversational fallback, selective research delegation, prior-answer reuse, read-only investigation, and sketch/spec approval before implementation. Replace the condensed `domain-records.md` with `GLOSSARY-FORMAT.md` and `ADR-FORMAT.md`; update its callers. This replaces D17's temporary preservation of that separate summary, not its planning workflow. Keep attribution in maintenance/license files. [Provenance](PROVENANCE.md#three-procedure-source-fidelity) records every source adaptation. Other audit recommendations remain proposals.

### D19: Restore orchestration and explanation evidence

Accepted 2026-10-15. Restore orchestration's complete roles, delegation briefs, milestone/dependency ownership, handoff acceptance, validation examples, and escalation/completion guidance. Restore How and Why in the consolidated explanation playbook, including both How references and all twelve Why references. Recover substantive source instructions, examples, evidence rules, and source-specific research recipes rather than replacing them with summaries. Preserve Teach as a separately routed procedure. [E16](#e16-orchestration-and-explanation-restoration).

Keep selective delegation, host-owned models and actual tool discovery, disclosed direct fallback for optional unavailable delegation, bounded read-only investigation, and existing approval/delivery boundaries. Adapt tool-specific research to available sources and schemas; report inaccessible evidence rather than inventing results or configuring integrations. Retain citation, contradiction, confidence, and negative-result discipline. The user authorized subagents with explicit instructions and detailed context about why restoration is needed; the parent remains responsible for integration and acceptance.

Also restore the PR incomplete-review stopping rule: publication stops before commit/push/PR writes when the complete scoped diff has not been reviewed, and metadata rewriting stops before title/body edits when its PR diff review is incomplete. This repairs the weaker report-only wording without combining PR-operation permissions. Publish the approved batch to PR #2. Remaining audit recommendations require separate approval.

### D20: Restore review and blast-radius evidence

Accepted 2026-10-15. Restore Review/interrogate's complete workflow and all four references: reviewer prompt, rubric, code-quality lens, and lead judgment. Restore severity/output formats, reviewer attribution, the four verdict buckets including Noted, and agreement mapping. Restore Blast radius's five-level proof ladder, pinned-dependency/local-patch checks, timing and cross-language examples, confirmed versus cleared risks, and runnable proof of the critical safety fact. Publish the batch to PR #2 using the same bounded implementation, independent review, and behavioral-evaluation strategy as D19. [E17](#e17-review-and-blast-radius-restoration).

The user explicitly chose **evidence-led structural review** after the source's presumptive blockers were surfaced: retain every structural diagnostic and example, including the 1,000-line threshold, but require a concrete maintainability problem to block. File size alone prompts inspection. Preserve pragmatic lead judgment, meaningful simplification, and all valid findings rather than imposing a count quota.

Retain selective delegation and host-owned models; requested multi-model diversity must be real or reported unmet. Review remains report-only, with fixes requiring agreement and implementation approval. Real-code proof remains the blast-radius goal, but new experimental scripts/tests require an approved sketch and an isolated disposable target under D04. Reuse existing approval; otherwise propose the smallest proof and report the safety fact unproven at the highest attained evidence level. A source citation is not execution. Review-role restrictions remain distinct from authorized tester/lead execution. Remaining performance and other audit batches require separate approval.

### D21: Restore benchmarking and hillclimbing

Accepted 2026-10-15. Restore the complete benchmark checklist and Hillclimb procedure, including Hillclimb's dependency on the seven ordered performance mantras. Preserve the benchmark's preflight, seven evidence questions, explicit requested-ballpark exception, production-tuned comparisons, physical-limit checks, alternating repeated runs, meaningful work/error counts, and inconclusive verdicts. Restore workload/sensitivity validation, a frozen harness, baseline/regression gates, agreed target and minimum attempts, exact experiment-log schema, causal hypotheses, keep/revert decisions, plateau pivots, and final evidence. Publish to PR #2 with isolated implementation, independent review, and bounded behavioral evaluations. [E18](#e18-benchmarking-and-hillclimbing-restoration).

Keep the one-off and measurement-only routes, approval before harness/product experiments, and reuse of an approved experiment series within its budget and scope. A minimum-attempt target does not override budget, correctness, missing prerequisites, or explicit stop; report an unmet predicate honestly. Preserve the source's exception for a correctness-preserving simplification that holds the metric, identified as a simplification rather than a measured speedup. Use host-configured selective delegation and real scheduling capabilities. Logs remain local, revert affects only owned attempts, accepted production changes follow one unmerged PR with scoped CI repair, and measurement-only work ends with evidence. Link the checklist from the measurement principle without restoring unrelated principle or one-off-performance detail. Remaining source-audit batches need separate approval.

### D22: Restore refactoring proof and visual-parity baselines

Accepted 2026-10-15. Restore the complete focused-to-medium Refactoring and Visual parity procedures, preserving executable pre-move behavior pins, real-artifact equivalence choices, caller/rename checks, reader-load acceptance, ordered green slices, pre-migration visual baselines, frozen harnesses, shared-primitives-first order, per-component image differences, and evidence-backed completion. Retain the separate prototype workflow. Use isolated implementation, independent complete-source review, bounded behavioral evaluations, maintenance records, and publication to PR #2. [E19](#e19-refactoring-and-visual-parity-restoration).

The user chose **Agreed contract (Recommended)** after the source's unconditional zero-pixel rule was presented against mstack's allowed-differences contract: pixel-exact is the default; visual differences must be explicitly approved before comparison and reported separately. A nonzero raw result is never called pixel-exact. Baselines and harnesses remain frozen; unexplained differences block completion. A revised contract needs agreement and a new identified comparison, not a retroactive pass or silent masking/tolerance change.

Existing approval applies before new test/harness/product code; reuse adequate executable pins and already-approved plans. Keep genuine external compatibility while removing superseded internal paths. Concrete reader-load reduction, rather than a structural quota, justifies refactoring. Selective host-owned delegation, scoped reverts, real driver/scheduler capability, and one ordinary unmerged PR replace fixed agents/models, mandatory architecture fanout, automatic history rewriting, and per-component PR proliferation. Other source-audit batches remain separately approved.

### D23: Restore Teach, Catch-up, and Recall

Accepted 2026-10-15. Restore the complete Teach, Catch-up (`ketchup` source), and Recall procedures, including teaching examples/style, progressive diagrams, carried-forward user decisions, current-state verification, side-by-side action summaries, scoped recent history, per-chat evidence, named-target shared-record review, and the compact thread-status brief. Preserve the existing How/Why and Pickup/Pause procedures. Use isolated implementation, independent complete-source review, bounded behavioral evaluations, maintenance records, and publication to PR #2. [E20](#e20-teach-catch-up-and-recall-restoration).

Keep host-owned models, selective delegation, actual tool/source discovery, evidence reuse, privacy, and existing read-only/approval boundaries. Replace fixed transcript paths and image tools with available host capabilities and explicit gaps. Reply visuals use existing evidence; new executable artifacts or product changes require their own authority. Never fabricate screens, state, or completed actions. Recovered history does not authorize resuming work. Full supplied capsules skip transcript mining, and unknown live state stays unknown rather than being forced into a success tag. Bro supplies Catch-up's plain voice without creating a new restatement workflow; full prose-cleanup/reflection/decision-trail restoration remains later scope.

### D24: Restore prose cleanup and reflection

Accepted 2026-10-15. Restore prose cleanup's complete 28-pattern catalog with stable source rule IDs and examples. Restore Reflection's full workflow and all four judgment, tooling, divergent, and synthesis references. Preserve the surrounding code/comment cleanup and Author/Evaluate sections. Use isolated implementation, independent complete-source review, bounded behavioral evaluations, maintenance records, and publication to PR #2. [E21](#e21-prose-cleanup-and-reflection-restoration).

The user selected **Strict source style** after the source's punctuation bans were contrasted with contextual editing diagnostics. Apply source punctuation and style prohibitions to selected editable prose. Preserve exact quotations, code, commands, citations, structured technical syntax, and technical meaning. Keep evidence-based uncertainty. This intentionally strengthens the previous prose guidance; it does not authorize rewriting unrelated files or protected examples.

Reflection retains all three analytical lenses with selective host-configured execution. Actual transcript identity and scoped sources replace fixed Cursor paths, models, and access-mode assumptions. Reviewers and synthesis remain report-only. Accepted means a proposed edit pending the user's selection, not permission to apply it. Backlog items also require current authorization before external filing; automatic tracker writes are not restored. Read the target before accepting a body edit, distinguish used guidance from supported missed-trigger candidates, preserve explicit-only invocation, and prefer structural enforcement where it fits. Approval and the local Author/Evaluate routes govern any subsequent edits or new skills. Decision-trail tooling and other audit work remain separate scope.

### D25: Restore decision trails

Accepted 2026-10-15. Restore the complete decision-trail procedure, six-column TSV template, worked example, and sanitizing append helper. Recover decision and iteration checkpoints, run ownership and reentry markers, append-only corrections, transcript/evidence auditing, review diagnostics, and the Attention report. Add a plain playbook behind the sole entry and conditional pointers from autonomous work and continuity. Use isolated implementation, independent review, behavioral evaluation, and publication to PR #2. [E22](#e22-decision-trail-restoration).

The user selected **Selective review** when the source's mandatory different-family reviewer was contrasted with mstack's host-configured approach. Keep the transcript audit and honest Attention section. Use independent review when it materially helps. Explicitly requested independence or diversity remains unmet when unavailable, and reviewer labels do not establish model identity or diversity.

Port the local append helper to Bun/TypeScript under D11. Preserve the exact six columns, UTC timestamps, single-line cell sanitization, leading-formula neutralization, and append semantics. Reject incompatible headers and unfinished rows without rewriting history. One owner serializes writes; the helper does not enforce ownership, verify evidence, supply locks, or guarantee crash recovery. Keep Hillclimb's separate nine-field experiment log intact.

Trails stay local in existing ignored storage or an agreed outside-tree path. Creating an artifact and publishing it require the caller's authority. Ambition alone does not authorize a committed trail, ignore-file change, or external write. Audit only the current run's identified stretches against scoped actual history. Missing transcripts or evidence remain unverified. Corrections preserve original rows and identify what they supersede. Read-only review proposes corrections rather than appending them. The bundle's maintenance decisions are distinct from runtime trails.

### D26: Restore the consolidated principles

Accepted 2026-10-15. Compare all 24 pinned source principles individually and restore their substantive diagnostics, examples, and decision rules within the existing 14 principle files. Preserve the sole entry, conditional reading, material citations, and established approval, delegation, delivery, comment-preservation, and evidence boundaries. Keep the rejected proceed-first policy excluded. Use isolated implementation, independent full-source review, bounded behavioral evaluations, maintenance records, and publication to PR #2. [E23](#e23-principle-restoration).

The user chose **Evidence-driven** tool creation over a mandatory artifact for every nontrivial task. Restore hand-unit equivalence checks, safe reruns, deterministic processing before manual fan-out, and a shared delegate recipe with verification and protected targets. Reuse adequate tools. A new tool, including one for a one-off task, needs a concrete reliability or proof benefit and existing implementation authority. An artifact claim must identify a real artifact. Runtime-trail publication still follows D25.

The user chose **Risk-based** semantic types. Restore sum-type, nonempty-list, time-range, exhaustive-match, authoritative-schema, and total-function examples. Distinct identifiers should prevent plausible mix-ups or repeated validation. Strengthen a type where partiality or a real ambiguity appears, then stop; ordinary total functions retain plain types. This preserves the useful protection without blanket branding.

The user chose **Declared phases** for planned migrations. An approved plan may declare temporary breakage inside an isolated, scoped, reversible phase. Name the affected checks, keep high-signal checks for touched behavior, and require the declared boundary and full final static/runtime verification before delivery. Unplanned failure blocks advancement. This supplements the normal known-good, one-change, check sequence; it does not authorize broken shared or published state, automatic rebasing, new migration scope, or ignoring unavailable checks.

Other adaptations preserve existing decisions. Root-cause diagnostics do not authorize clearing persistent state, deleting useful rationale, or fixing unrelated sibling instances. An even actor census ends the concentration hypothesis without proving every premise true. Locking, process identity, reconciliation, and scheduling examples guide systems being designed; they do not claim mstack supplies those mechanisms. Prompt/reference subtraction requires scoped authority, caller inspection, and preservation of substantive content. Structural and reader-time diagnostics require concrete evidence, not size or timing quotas. Novel alternatives and prototypes remain selective and approved.

### D27: Restore Architecture and Swarm; defer Arena

Accepted 2026-10-15. Restore Architecture's complete workflow and all three references, plus Swarm's complete framing, dispatch, receipt-validation, aggregation, and reporting procedure. Retain the consolidated exploration playbook and its existing Arena section unchanged. Use isolated implementation, independent full-source review, behavioral evaluations with actual host delegation where relevant, maintenance records, and publication to PR #2. [E24](#e24-architecture-and-swarm-restoration).

The user explicitly said **skip arena for now** when asked about the source's mandatory cross-judge. That defers Arena restoration rather than selecting a cross-judge policy or disabling the existing route. Architecture may use the existing route when useful. Its substantive caller-first design, grounding, red-flag screening, interface-depth comparison, rationale, deviation analysis, and repeated-friction redesign loop are restored independently.

Preserve D04's mandatory implementation approval, D07's selective host-owned delegation, D20's evidence-led structural review, and D26's evidence-driven tools, risk-based types, and declared migration phases. Architecture-only work stops at a design package and approval request. Source model defaults, unconditional two-candidate dispatch, opt-in sign-off, automatic scaffold publication, and destructive interpretations of scrapping a design are not restored. A materially revised shape returns to approval; existing sufficient grounding and approval can be reused.

Swarm supports partitioned coverage, races, and mixed work with the selection rule declared before dispatch. Worker count is total assigned workers, not a claim about actual concurrency or remote capacity. Commit verification and measurement name exact SHAs; measurements also specify sample count, sample definition, and order. Validate receipts before accepting them. A missing or mismatched required receipt gets one fresh bounded replacement when authorized and feasible; a second miss is an explicit gap. Preserve terminal-state, dropout, incomplete-coverage, and actual model/host distinctions. A written rule cannot cancel a child or establish its liveness.

### D28: Restore testing, forensics, and one-off performance detail

Accepted 2026-10-15. Restore the complete `tdd` skill and Bug fix, Runtime forensics, Trace forensics, and Perf issue source procedures within the existing Bug fix, Forensics, Performance, and verification files. Preserve one entry, conditional reading, and the existing performance mantras, Hillclimb, and measurement-only sections. Use isolated implementation, independent complete-source review, bounded behavioral evaluations, maintenance records, and publication to PR #2. [E25](#e25-diagnostic-workflow-restoration).

Restore matching-boundary reproduction, runtime-backed hypothesis elimination, intended-reason failing tests, practical regression alternatives, flaky-test discipline, ordered failing/passing receipts, artifact querying and source attribution, live mechanism-confirmation techniques, and trace-backed performance comparisons. Explicitly requested TDD that cannot be performed remains an unmet request. Test expectations cannot be weakened to match wrong behavior. Additional sibling coverage remains a scoped proposal.

Existing approvals govern new tests, instrumentation, parsers, derived artifacts, and product fixes. CDP evaluation and live hotfixes are stateful experiments requiring specific bounded, reversible authority. A request to diagnose does not supply that authority. Captured artifacts stay fixed, and missing symbols or runtime access remain evidence gaps. Unpaired captures support hypotheses; a before/after pair still needs comparable conditions and a known intervention before a causal conclusion.

Selective host-owned execution replaces mandatory implementation agents, model-sheet setup, and automatic Architecture for every cross-function edit. Adequate query tools replace compulsory SQLite conversion of every artifact. Preserve test-before-fix evidence without requiring broken published commits. D26 governs any approved isolated temporary failure. Accepted production fixes retain one ordinary unmerged PR and scoped required-CI repair; diagnostic and measurement-only requests retain their own stopping boundaries. Arena and other source-audit omissions remain outside this batch.

### D29: Separate runtime packaging from repository maintenance

Accepted 2026-10-15. Keep only `SKILL.md`, `LICENSE`, playbooks, principles, runtime references, helpers, and helper usage in `mstack/`. Move the installation/development guide, maintainer instructions, decisions, glossary, provenance, and source audit to `docs/mstack/`. Move the validator, tests, package manifest, lockfile, TypeScript configuration, and local development dependencies to `tooling/mstack/`. Update repository pointers, relative links, test imports, and validation commands together. [E26](#e26-runtime-packaging-separation).

Help must remain usable from an installed copy, with local invocation, dependency, and installation guidance. Runtime files must not depend on repository maintenance documents or development packages. Preserve the complete maintenance history and source inventories, runtime helper behavior, license notices, single-entry discovery metadata, and workflow approval boundaries. The validator defaults to the runtime directory from any working directory and still accepts an explicit installation path. Installation and global configuration remain separate cutover actions.

### D30: Keep runtime reading flow downward and retain peer composition

Accepted 2026-10-15. Runtime links follow three layers: the `SKILL.md` entry, playbooks, and supporting material such as principles, references, and helper usage. Links may go down or stay within a layer. Remove links from child files back to the entry and from supporting files back to playbooks. The user chose **Keep peer links**, preserving useful task composition and shared-resource links. A relative `../` path is not an upward dependency when it reaches a peer or lower-layer resource. Maintenance documents are outside this runtime rule. [E27](#e27-downward-reading-flow).

Preserve substantive rules and delegated context when removing backlinks. Host guidance points directly to the applicable adapters. Already-loaded shared rules remain authoritative. The parent supplies applicable governing instructions in each delegated brief; the child reports missing required context rather than reopening the parent workflow. Workflow routing belongs in the entry or calling playbook. Keep supporting references focused on their assigned task. Add validation for the layer boundaries and tests that reject upward dependencies while allowing valid peer composition.

This refines D03's conditional reading and D29's self-contained packaging. It does not require a strict directory tree, remove peer links, change approval or delivery authority, or restore deferred Arena content.

### D31: Colocate playbooks and their owned references

Accepted 2026-10-15. Give every playbook a `playbooks/<name>/PLAYBOOK.md` entry and place its owned prompts, templates, formats, and examples in that folder's `references/`. Simple playbooks contain just their entry. Keep cross-cutting guidance in root `references/` and retain `SKILL.md` as the sole discoverable entry. The user replied "let's do this!" to approve the proposed folder-per-playbook layout. [E28](#e28-playbook-folders).

The implemented ownership map keeps host adapters, orchestration, history, verification, benchmarking, and the shared Why source catalog and epistemics at the runtime root. Explanation's investigator and synthesis prompts move beside Explanation; the domain formats move beside Domain modeling. The decision-log template belongs to Decision trail, with its helper's lookup updated to that location. These are ownership choices within the approved layout, not new workflow policies.

Preserve substantive instructions, examples, permissions, stopping conditions, attribution, and license bytes. Rebase runtime and maintenance links and update executable resource paths together. D30's layers still apply. `PLAYBOOK.md` is a playbook entry, while nested references remain supporting material. Validation must reject their backlinks to any playbook or the skill entry while allowing peer composition and shared-resource links. This refines D02 and D29's packaging without changing workflow authority or the separate installation cutover.

### D32: Add Big pictures, little words as a Show me mode

Accepted 2026-10-16. Incorporate the requested `backnotprop/bro` skill as a named HTML-first mode within Show me, with an explicit route from the entry table. Preserve its complete guidance through independently written instructions for large visuals, brief text without lost details, deliberate design, selective real-world imagery, newcomer-friendly language, and literal explanation instead of strained metaphors. General diagram and code-sketch requests retain Show me's existing choice of the smallest useful view. [E29](#e29-big-pictures-little-words).

Reuse the existing HTML styling, responsive-layout, and host-preview instructions through a local section link. Preserve all ten Show me examples and its prior instruction text. Retain one discoverable skill, 25 playbook folders, shared approval boundaries, and ordinary delivery to PR #2. Source attribution belongs in maintenance documents rather than the runtime procedure.

The inspected source at `3737bf2` has only its skill file and explicit-only UI metadata. It declares no license for this skill; the repository's separate Sharpen license does not establish one. Use independently worded guidance based on the requested ideas, record that distinction, and leave existing MIT notices intact. This addition does not restore deferred Arena or other unapproved source-audit work.

### D33: Read planning templates by document type and stage

Accepted 2026-10-16. Split Planning's combined `references/templates.md` into five files under `references/templates/`: `quick-decision.md`, `feature-plan.md`, `adr.md`, `rfc.md`, and `handoff.md`. The playbook selects and links directly to the relevant draft format, with an instruction to read only that template. Read the handoff template only after approval in the Done phase. No extra template index or blanket read of all templates is needed. [E30](#e30-planning-template-split).

Keep shared formatting guidance in the playbook. Its existing implementation-contract instructions already cover focused diffs, normal blocks for wholly new definitions, and annotated directory trees; move the combined resource's directory-tree example beside those rules. Preserve each template's complete body and examples, changing only its heading level for a standalone file. Keep the sketch, approval, final-response format, and refinement contracts. This refines D17's resource packaging and D31's colocated references without changing planning authority or the approved template content.

### D34: Disclose glossary-map and final-report templates when needed

Accepted 2026-10-16. Extract three templates with their complete wording and examples: Domain modeling's glossary map into `references/GLOSSARY-MAP-FORMAT.md`, Review's Interrogate verdict into `references/interrogate-report.md`, and Planning's completion response into `references/templates/final-response.md`. Each playbook links directly to its template at the relevant writing stage. [E31](#e31-additional-template-extractions).

Move the glossary's single/multi-context selection rules into the Domain modeling playbook so they apply before choosing a format. Read the map format when writing or updating the map. Read the Interrogate report only for that verdict, carrying the already-stated intent into it. Read Planning's final-response format after spec approval, keeping the task-decomposition handoff distinct. Preserve the formats, evidence requirements, permission boundaries, and report-only stopping rules. This refines D18, D20, and D33's packaging under D30's downward-reading rule. Other role prompts and single-deliverable references retain their existing layout.

### D35: Require a visual PR change outline explicitly

Accepted 2026-10-16. Make the visual requirement explicit in the shared PR metadata reference used by Publish and Rewrite metadata. The Change outline must contain a relevant diagram, responsibility tree, focused diff, or pseudocode. A prose summary or file-by-file changelog does not satisfy it. Restore workflow-tools' complete view-selection list, narrative ordering, and the option to show the complete target shape when most of it is new or a diff obscures ownership or order. Check the visual against the reviewed diff before publishing metadata. [E32](#e32-explicit-visual-pr-outline).

This strengthens D06's existing visual PR contract and replaces the condensed outline guidance. Keep the rule in the shared reference so both metadata-writing paths use one definition. Explicit user or repository formatting instructions still take precedence, and Verification remains the accepted fourth section. This change concerns visual-outline fidelity; other metadata rules continue under D06.

### D36: Add a coding-standards workflow

Accepted 2026-10-18. Add a [Coding standards](../../mstack/playbooks/coding-standards/PLAYBOOK.md) playbook with Find, Apply, Capture, and Survey sections, a root [smell baseline](../../mstack/references/code-smells.md), and owned rule-format and survey-source references. Mstack previously had related principles (Encode lessons, code cleanup's local conventions, the review rubric) but no workflow that read, cited, or grew a project's documented standards, and Reflection improved only mstack's own instructions. [E33](#e33-coding-standards-workflow).

The user's choices:

- **Implementation reads standards too**, not only review. This departs from Matt Pocock's retro, which reserves `CODING_STANDARDS.md` for the lower-context review stage. The entry's execution rules point implementation at Apply, and delegated implementer briefs carry the source paths.
- **A Standards playbook and a Reflection hand-off.** Capture owns project lessons. Reflection keeps workflow and skill lessons and hands project-code lessons to Capture. The entry routes project-code lessons directly to Capture and narrows the Skill development row to lessons about skills, after evaluation showed the two routes competing.
- **Smell baseline as judgment calls.** The twelve smells apply when a repository documents nothing or alongside its rules. A documented standard overrides the baseline, and tooling-enforced rules are skipped.
- **A separate Standards section in review.** It sits beside Act on, Consider, Noted, and Dismissed, citing file and rule or naming the smell. Each standards finding still carries a bucket, and one that is also a correctness or security defect stays in its main bucket with the citation, so the section cannot bury a blocker. Delegation stays selective under D07; Matt's mandatory parallel Standards and Spec sub-agents are not adopted.
- **Survey runs on request and is offered when no standards exist.** It mines PR review comments and history through read-only `gh` when accessible, aims for a few strong rules, and interviews the user through Grilling after exploration. Aspirational rules apply to new and changed code, with existing violations listed as migration candidates.

Each standards source applies only within its scope: the directory a package-level file sits in, narrowed by a rule's **Applies to**. A nearer source wins over a broader one for its paths. Mechanical lessons become proposed deterministic checks and judgment lessons become proposed rules, following Encode lessons. All rules and checks start as proposals: standards-file edits follow explicit row selection, and new checks need implementation approval and ordinary delivery under D04 and D05. Capture after agreed PR feedback fixes was left out of scope to keep D06's PR operations unchanged.

### D37: Drop explicit repository-instruction reads

Accepted 2026-10-19. Remove the explicit "read repository instructions" wording from the spec-implement entry, the planning depth choice, and the verification inventory step. OpenCode injects `AGENTS.md` as system instructions (global plus project files, nested files on read discovery), so compliant runs show no `read` tool call for it: sessions `ses_eae25604` and `ses_eaf7e80` followed `hearth/AGENTS.md` conventions without ever reading that file, with the harness copy confirmed in `instruction_blob`. The removed lines created false audit gaps without adding behavior. Shared-rule authority for explicit user and repository instructions is unchanged. Approval: Inbox thread `msg_01M5922TTVBZ0RDARQWW83MF1X` ("Approve these three wording removals?"), user answered "approved" 2026-10-19. [E34](#e34-harness-injected-instructions).

### D38: Trim playbook no-op sentences for directness

Accepted 2026-10-19. Remove persona framing, same-file restatements, shared-rule repeats already loaded with the entry, and throat-clearing across all 26 playbooks (net about 60 lines). Shared-rule removals rest on [SKILL.md](../../mstack/SKILL.md): approval reuse and reopening (scope and approval), one unmerged PR without merging or stacks (scope and approval), selective delegation with disclosed direct fallback (execution and completion), and tool-schema precedence (host selection). This extends D03's consolidation precedent, which removed repeated shared-rule directions without freezing future wording changes.

Substantive instructions, permission boundaries, approval gates, and evidence requirements are preserved. Where the trim overreached, the load-bearing text was restored: the planning structured-question contract (option shape, header length, `multiple: true`, worked example), the spec filename/path rules, the show-complexity scope bound, and the forensics evidence-source verbs. Provenance stays in [PROVENANCE.md](PROVENANCE.md): the inline deslop credit was removed as covered there, while the Comment Sicko credit remains inline because it has no provenance entry. Approval: user directive "Apply then" in the working session, 2026-10-19, on the independent worker's finding list.

### D39: Trim principle no-op sentences for directness

Accepted 2026-10-19. Remove agreed no-op sentences across the 14 principles: same-file restatements, slogans, disclaimers, and shared-rule repeats already loaded with the entry (approval reuse and reopening, one-PR delivery with explicit stacks, selective delegation with disclosed fallback, tool-schema precedence, unavailable-check reporting). Substantive diagnostics, E23 risk-based choices, the D09 comment protection, and E26 evidence requirements are preserved; prove-it-works keeps the unavailable-check gap rule while verifiable-units defers to it. Approval: user-selected "Agreed + shared-rule" scope on the reconciled opus/Sol finding lists, 2026-10-19. Opus-only operative trims and all wording rewrites were excluded.

### D40: Second trim pass on principles

Accepted 2026-10-19. Extend D39 with the reconciled pass-2 findings: the 5 both-workers-agree deletions, 6 Sol-only pure removals, and 8 missed shared-rule approval repeats (prototype-approval, census/instrumentation gates, scope-expansion and deletion disclaimers). Excluded all wording rewrites and opus-only operative trims. One misapplied edit (model-the-domain :19, slogan kept over diagnostic) was caught in verification and repaired before checks. Approval: user-selected "Add shared-rule too" scope, 2026-10-19.

### D41: Routing fixes from mstack usage sessions

Accepted 2026-10-19. Five routing improvements grounded in session evidence (subagent-mined from the live session store, dev sessions excluded):

- Architectural "why" disambiguation: historical rationale routes to Why; "was this the right choice?" or option comparison routes to Exploration → Architecture. Evidence: `ses_eb0dc933` (HomeKit bridge/adapter) misrouted to Why and had to reload Exploration after user correction.
- Explicit-invocation fallback: an `@mstack` invocation names the entry; if its content is unavailable, report that instead of substituting another skill. Evidence: `ses_eb0aa2a9` first `@mstack explore` carried no skill attachment and was answered from service-design. Caveat: this line only fires once the entry loads; the underlying non-activation is a host-boundary failure needing separate investigation.
- Show-complexity triggers: "implementation complexity", "what complexity does this introduce?", "what can we simplify?", with classification explicitly not effort estimation. Evidence: unprefixed complexity request answered as effort estimate; `@mstack`-prefixed repeat correctly loaded Show complexity.
- Retro entry row routing to Skill development → Reflect. Evidence: `@mstack retro` probed Continuity before settling on Reflect.
- Performance precedence: timing trends, slow tests, and benchmarks route to Performance, read-only until implementation approval. Evidence: CI-slowdown session mixed Investigation labeling with Performance procedure.

Approval: user "yes" to implementing all five, 2026-10-19.

### D42: Entry-trigger disambiguation from dual-worker review

Accepted 2026-10-19. Ten trigger fixes both workers independently flagged: repair-vs-diagnose wording (bug fix/forensics), narrowed read-only investigation scope, recall as recent-work review, cleanup as scoped-change tidy, implement-a-spec without pre-approval implication, skill author/update/evaluate, analysis-only complexity assessment, retro scoped to current-session skill lessons, and monitor added to the PR row. Lessons three-way split is addressed by the :35/:44/:50 scoping, not a new playbook. Excluded: each worker's unique extras and all rewrites. Approval: user-selected "Both-agree only" scope, 2026-10-19. Follow-up same day: the D41 Architecture bullet was narrowed to choosing-between-options per the workers' shared verdict; evaluating an existing design routes through the entry's Review and Show complexity rows.

### D43: Add a Tour playbook for shared, visual walkthroughs

Accepted 2026-10-19. Add a [Tour](../../mstack/playbooks/tour/PLAYBOOK.md) playbook that walks a reader through a set of code in ordered stops, each led by a visual, with an owned [views catalog](../../mstack/playbooks/tour/references/views.md). Show me stays the single in-chat view; Tour covers deeper reading or a medium beyond chat. The user wanted the playbook to focus on high-impact representations of types, interfaces, data objects, database tables, data flow, and call stacks. [E35](#e35-tour-playbook).

The user's choices:

- **A tour, not a guided-review mode.** Discussion started from a guided-review playbook. The user then asked whether that was a more detailed Show me and proposed "tour" as the reusable idea, with Show me for simple in-chat answers and tours for deeper or shared mediums.
- **Change and data-model subjects only.** Design tours of a proposed spec are deferred.
- **Explanation and Exploration stay unchanged.** Using the tour structure as How's or Architecture's standard output was considered and set aside: "maybe tour doesn't align with those yet". How, Why, Teach, Architecture, Review, and PR metadata keep their structures.
- **Tool-agnostic view generation.** The accuracy rules prefer views generated from the project's own artifacts without naming stack-specific tools.
- **Markdown by default, opened in Plannotator.** The user answered "always markdown and open plannotator for me". This uses the optional review surface accepted with [E5](#e5-vendoring-migration-and-review-surface). The procedure keeps a fallback that reports the path when Plannotator is unavailable, so Plannotator does not become a required dependency.

Every tour pins its revision or range, anchors each stop to source, and applies the accuracy rules before delivery. Stops run data first, in this order: Map, Shapes, Flow, Behavior, Glue. A change tour places every changed path in exactly one chapter or an explicit Not covered list, and explains the change rather than reviewing it. The views catalog stays inside the Tour folder under D31 because only Tour uses it; adopting it from Show me or PR metadata would move it to the runtime root in that change. Show me's body is unchanged, preserving D16. Tours are read-only; Inbox guides, HTML, and PR bodies are produced only on request, and remote writes need explicit authority.

## Upstream differences that are not new commitments

The original adaptation condensed pstack 0.15.21's 24 principles into 14. Several concrete prescriptions were shortened away, including the written premise/actor census and detailed exhaustive-matching/type-construction guidance. D26 restores these diagnostics and examples, with explicit choices for evidence-driven tools, risk-based types, and declared migration phases. The source's mandatory tool deliverable and proceed-first policy are not restored. Full Orchestrate/Autopilot protocols and the dedicated worktree/simulator-cleanup workflow were not preserved.

These are observed coverage differences, not individually approved prohibitions or promises to port them later. The later consolidation passes preserved their source text; they did not restore detail omitted during the initial adaptation. Review upstream additions against the decisions above instead of treating parity as the acceptance criterion. Evidence: comparison response `msg_13d4e9cff001zIpZUmIFkY8AAo` in the [design session](#sources), checked against the current bundle. Verification-skill creation/maintenance was a subsequently identified omission resolved by D14.

The 2026-10-15 [integrated-source audit](SOURCE-AUDIT.md) extends that comparison to every selected vendor source, all 52 pstack skill entries including 24 principles, its 23 nested playbooks, supporting resources, and workflow-tools' PR/spec instruction contracts. It records additional losses separately from accepted host, approval, delegation, and delivery adaptations. D18 through D28 approve the subsequent restoration batches, with Arena explicitly deferred. The remaining restoration order is a recommendation awaiting approval. [E14](#e14-all-integrated-skill-audit).

## Validation and cutover snapshot

As of 2026-10-15, baseline commit `f26c267`:

- Bundle metadata/links, formatting, script typechecking and 67 tests passed during publication; five packaging tests and source-example comparisons passed after the verification-skill addition. Original session evidence also records consolidation-preservation and link-anchor/reachability checks.
- Actual OpenCode registry and Pi RPC discovery found exactly one mstack entry. That establishes discovery, not live delegation or workflow behavior.
- Live background delegation and watcher lifecycle remain untested. Verification-skill creation/maintenance has not been exercised against a real app. Offline scenarios and structural checks do not close those gaps.
- GitHub reported no checks for PR #2 at that head; required-check knowledge was unavailable. This is not evidence of passing required CI or merge gates.
- Installation, global configuration cutover, and workflow-tools removal had not occurred. The PR was open and unmerged. Re-read live PR/installation state before acting; this is a dated observation, not the current-state authority.
- The original six-chapter Inbox guided review predates the consolidations. Later messages attached revised files and linked the PR, but a refreshed complete guide had not been submitted. Use the committed files for the current design.

The D16 show-me restoration was checked on 2026-10-15 against upstream revision `bba9d13`: the installed source is byte-identical, and the restored body differs only by its documented packaging, host-opening, and formatting adaptations. All ten worked examples are retained. Bundle validation, formatting, links/anchors, and whitespace checks passed. These establish source fidelity; no fresh end-to-end artifact-generation evaluation was run.

The D17 spec-planner restoration and broad source audit were checked on 2026-10-15 against bundle baseline `fbc0587` and planner source `57f95bb`: all four restored references are byte-identical to source, and the main-body differences match the documented adaptations. Sketch/depth and Approval/Refine sections are unchanged. The audit inventory accounts for 28 non-principle pstack skills, 24 principle skills, and 23 nested playbooks without missing or extra rows. Bundle validation covers one skill and 61 Markdown files; all 129 local fragment links resolve. Formatting and whitespace checks pass. Static planning-route walkthroughs were reviewed; no fresh independent agent execution was run, so the existing live-host and real-app evaluation gaps remain. No helper or validator code changed.

The D18 three-procedure restoration was checked on 2026-10-15 against bundle baseline `9a0b6f7`: all three restored bodies and both domain formats match their sources after only documented adaptations and Markdown formatting. The show-complexity source is byte-identical to `57f95bb`; grilling/domain-modeling use the installed copies identified by SHA-256 in provenance. Planning changes only its domain-record routing link. Bundle validation covers one skill and 62 Markdown files; all 136 local fragment links resolve, and the restored formats are reachable. Formatting and whitespace checks pass. Six static scenario walkthroughs and direct cleanup passes are recorded in the audit; no independent behavioral execution or live-host check was run. Existing live delegation, watcher, and real-app gaps remain. No helper or validator code changed.

The D19 restoration was checked on 2026-10-15 against bundle baseline `ad51933`: two isolated implementation workers supplied the restored content, the parent reviewed source differences, and two independent report-only reviews found no substantive defects. All sixteen How/Why source files match workflow-tools `3f83b1d`; all fourteen references and fifteen exact fenced examples are present, and Teach is byte-identical to baseline. The orchestration comparison covers the complete source body and its documented adaptations. An independent offline How/Why execution correctly distinguished conflicting rationale, source-established retry behavior, and unavailable incident/partner evidence in a synthetic repository, which remained clean. PR incomplete-review stops received independent static scenario review. Bundle validation covers one skill and 76 Markdown files; all 149 local fragment links resolve. Formatting and whitespace checks pass. OpenCode background launch/completion, isolated writers, and parent acceptance/integration were exercised; Pi delegation, failure recovery, restart persistence, live external-source recipes, watcher lifecycle, and real-app verification-skill workflows remain untested. No helper or validator code changed.

The D20 restoration was checked on 2026-10-15 against bundle baseline `a6c6d04`: one isolated worker restored the coupled procedures and four references, the parent compared complete bodies/source differences, and an independent source/policy review reported no findings. All six inspected source files match pinned workflow-tools `3f83b1d`; differences are documented in provenance. Three independent offline executions validated lead judgment on conflicting reports and a generated file crossing 1,000 lines, real-code blast proof against a locally patched dependency, and the source-only/unproven stopping boundary. The executed proof caught a post-close callback failure while the existing cache-membership test passed; it establishes fixture-level execution, not a production incident. Both fixture repositories stayed clean. Bundle validation reports one entry and 80 Markdown files; all 164 local fragment links resolve and all four review resources are reachable. Formatting and whitespace checks pass. No helper/validator code changed. Real multi-model review, Pi execution, failure recovery, live-app blast proof, external-source recipes, watcher lifecycle, and real-app verification-skill workflows remain untested.

The D21 restoration was checked on 2026-10-15 against bundle baseline `ac6f8da`: one isolated worker restored benchmark/Hillclimb content, independent complete-source and focused integration reviews reported no findings, and the parent verified source differences. Both complete procedures and the seven ordered mantras are accounted for; the exact source log has nine fields. Three independent offline exercises rejected an invalid adoption comparison, honored an explicit single-run ballpark, and completed a bounded two-attempt Hillclimb with frozen harness evidence. The latter rejected an incorrect low-work candidate, then kept a correct target improvement from 96,000 to 2,400 event visits; no wall-clock speedup was claimed. Read-only fixtures remained clean, and only the approved engine changed in the Hillclimb fixture with frozen inputs/unrelated note intact. Bundle validation reports one entry and 81 Markdown files; all 182 local fragment links resolve. Formatting, whitespace, reachability, and source-inventory checks pass. No helper/validator code changed. Production performance, broader workload tradeoffs, plateau/simplification behavior, budget-before-target exits, harness-invalidity recovery, Pi execution, diverse-model experiments, and restart-resilient scheduling remain untested.

The D22 restoration was checked on 2026-10-15 against bundle baseline `9ae4dc9`: one isolated worker restored both complete procedures, independent full-source/policy review found no defects, and the parent verified the source differences and integrated files. Three independent exercises validated original-code characterization/equivalence through real CLI/dynamic consumers, frozen-baseline image comparison with real local Chrome interactions, and the missing-baseline stopping boundary. The visual case finished with 144 raw changed pixels per state, all explicitly approved, and zero unexplained differences; it was not labeled pixel-exact. Only approved fixture files changed; frozen inputs/evidence and unrelated notes were preserved. The prototype paragraph is unchanged. Bundle validation reports one entry and 81 Markdown files; all 191 local fragment links resolve. Formatting, whitespace, reachability, and source-inventory checks pass. No helper/validator code changed. The browser CLI's skill-content lookup was unavailable; explicit CLI-help fallback worked without installation/configuration changes. Finite refactor cases and one local two-state viewport do not prove production/cross-browser/terminal coverage. Existing-pin reuse, benefit-driven reversion, shared-primitive ordering, strict-zero end-state, baseline-correction recovery, Pi execution, and restart-surviving work remain untested.

The D23 restoration was checked on 2026-10-15 against bundle baseline `18ad7b1`: one isolated worker restored Teach/Catch-up/Recall, independent complete-source review found no substantive defects, and the parent verified source differences and unchanged neighboring sections. Four independent offline exercises covered two-turn teaching with progressive diagrams and preserved rationale uncertainty, older unanswered catch-up decisions and stale-state gaps, topic recall with a reverted fix and a tool failure contradicting an assistant summary, and supplied-capsule reuse without transcript mining. All four fixtures stayed clean. Teach's opening used three sentences rather than the requested one or two; this minor observed pacing deviation is recorded without claiming perfect compliance. One entry and 81 Markdown files validate; all 205 local fragment links resolve. Formatting, whitespace, reachability, and source-inventory checks pass. No helper/validator/host-adapter code changed. Live OpenCode/Pi history APIs, external PR/CI/agent-state checks, bulk retrieval, all-history batching, spatial image generation, and human learning outcomes remain untested.

The D24 restoration was checked on 2026-10-15 against bundle baseline `d127f5a`. An isolated writer restored prose cleanup and Reflection, and independent complete-source review found no substantive defects. All 28 catalog entries match the pinned examples and fixes. Three independent offline exercises covered strict prose edits with literal evidence preservation, reflection proposals from conflicting evidence, and rejection of already-covered guidance. A second reflection turn applied only the explicitly selected A1 row. The proposed-only fixture was clean before selection, and final changes were confined to approved text. The optional fixture skill validator could not start because Python's `yaml` module was missing. No dependency installation occurred. Bundle validation reports one entry and 86 Markdown files. All 217 local fragment links resolve, and formatting, whitespace, reachability, and source-inventory checks pass. No helper, validator, or host-adapter code changed. Live history retrieval, tracker filing, diverse-model synthesis, description optimization, and the future effectiveness of the selected guidance change remain untested. [The audit](SOURCE-AUDIT.md#d24-review-and-execution-evidence) records report hashes and exact limits.

The D25 restoration was checked on 2026-10-15 against baseline `6450498`. Independent complete-source, policy, and code review found no defects. The template and all four example rows match the pinned source. Three independent exercises covered run reentry and append-only audit corrections, missing-evidence read-only review, and the real append CLI. The first preserved a false historical pass while superseding it with actual verifier failure and recovering an omitted pivot. The CLI exercise passed 40 checks. A minor strict-style deviation in log wording is recorded rather than claimed compliant. Fresh script typechecking and all 74 tests passed, including seven new subprocess tests. Bundle validation reports one entry and 87 Markdown files. All 228 local fragment links resolve, with 25 playbooks and 14 principles reachable. Formatting, whitespace, and source inventories pass. Live history, verified model diversity, concurrency, crash recovery, and production evidence remain untested. [The audit](SOURCE-AUDIT.md#d25-review-and-execution-evidence) records exact outcomes and report hashes.

The D26 restoration was reviewed and exercised on 2026-10-15 against baseline `0837f3f`. All 24 source leaves match the pinned snapshot; independent full-source and policy review found no unexplained omissions or substantive defects. Four independent exercises covered actor-census diagnosis, actual wrong outputs hidden by passing tests, an approved migration from temporary failure to six passing cases, and a failed boundary that stopped completion. Protected fixture files remained unchanged, with only the approved migration consumer edited. One proposed type restriction exceeded the supplied contract and is recorded as an evaluation limitation. Bundle validation reports one entry and 87 Markdown files. All 250 local fragment links resolve; 25 playbooks and 14 principles are reachable. Formatting, whitespace, and source-inventory checks pass. Compiler rejection, live concurrency, crash recovery, UI behavior, and all principle branches were not established. [The audit](SOURCE-AUDIT.md#d26-review-and-execution-evidence) retains exact outcomes and report hashes. No helper, validator, discovery, or host-adapter code changed.

The D27 restoration was reviewed and exercised on 2026-10-15 against baseline `757621a`. Independent complete-source and policy review found no substantive defects in Architecture, Swarm, and all three references. Two Architecture turns grounded a caller-first proposal, then revised its ownership model for a new joint-checkpoint requirement without implementing either proposal. A child-session coordinator correctly reported unavailable nested delegation. A separate parent-launched two-worker local exercise passed exact-revision correctness and counted-read checks, and independent aggregation accepted its receipts. A synthetic incomplete receipt was rejected and received one real fresh measurement worker whose receipt passed independent acceptance. Both fixture repositories remained clean. Architecture rationales exceeded the one-page target, and measurement workers made extra read-only host inspections beyond their narrow briefs. Those deviations remain explicit. [The audit](SOURCE-AUDIT.md#d27-review-and-execution-evidence) records outcomes, evidence hashes, and limits. Backend atomicity, implementation-driven redesign, race selection, dropouts, second invalid receipts, Pi delegation, model diversity, and restart persistence remain untested.

Final D27 packaging checks report one entry and 90 Markdown files, with 274 resolving local fragment links and all 25 playbooks, 14 principles, and three new references reachable. Formatting, whitespace, preserved 28/23/24-row inventories, and all ten recorded evidence hashes pass. The integrated runtime files match the reviewed candidate byte-for-byte. No helper, validator, discovery, or host-adapter code changed. D25's 74 helper tests and typecheck remain historical results for unchanged executable code.

The D28 restoration was reviewed and exercised on 2026-10-15 against baseline `ef59fb0`. All five complete sources match the pinned snapshot, and independent full-source review found no material defects. Four independent exercises covered wrong-reason test failure followed by real behavioral red/green and same-CLI proof, fixed CPU-profile attribution without causal overclaiming, missing-live-evidence stopping, and an approved one-off improvement from 2,057 to 67 synthetic row visits across five samples per side. Protected fixture bytes remained intact, with only the approved parser/test and performance-engine changes. The integrated files match the reviewed and evaluated candidate, with existing performance sections and shared verification preserved. [The audit](SOURCE-AUDIT.md#d28-review-and-execution-evidence) records exact evidence and report hashes. Live capture/hotfix, heap/spindump analysis, large SQLite conversion, flaky-test repair, and impractical-test fallback remain untested. No helper, validator, discovery, or host-adapter code changed.

Final D28 packaging checks report one entry and 90 Markdown files, with 296 resolving local fragment links. All 25 playbooks, 14 principles, and the expanded verification reference are reachable. Formatting, whitespace, preserved 28/23/24-row inventories, and all four report hashes pass. Independent maintenance review found no material inaccuracies or prose-policy defects. D25's 74 helper tests and typecheck remain historical results for unchanged executable code.

The entry-document annotation fixes were checked on 2026-10-15 against baseline `43d6392`. Bundle validation reports one entry and 90 Markdown files; all 295 local fragment links resolve, and all 25 playbooks and 14 principles remain reachable. Direct before/after comparison confirms unchanged discovery metadata, routing tables, approval rules, execution rules, and host selection. Help retains the on-demand installation guide, principle reading and material citations remain explicit, and the opening retains relative-link resolution. This was a direct prose and routing review, with no fresh independent behavioral evaluation or live-host check. No executable code changed.

The planning-pointer cleanup was checked on 2026-10-15 against baseline `53ff3ae`. Bundle validation reports one entry and 90 Markdown files. The new link resolves; the planning playbook and all shared rules outside the approved passage are byte-identical to baseline. Verification was direct and static, with no fresh behavioral or live-host evaluation. No executable code changed.

The optional-specialist paragraph removal was checked on 2026-10-15 against baseline `58e6593`. Bundle validation reports one entry and 90 Markdown files. Direct comparison confirms unchanged preceding entry text and task-specific specialist guidance. No links, headings, discovery metadata, or executable code changed. No fresh behavioral or live-host evaluation was run.

The D29 packaging move was checked on 2026-10-15 against baseline `5bcbaad`. Bundle validation reports one entry and 84 runtime Markdown files. Fresh typechecking and all 76 tests passed from `tooling/mstack`, including copied-runtime CLI execution and validator default-path checks. Ninety-two retained runtime files, including helper source and license, are byte-preserved. [Packaging evidence](SOURCE-AUDIT.md#d29-packaging-verification) records direct review, link checks, and limits. Fresh independent Help evaluation, live host discovery, and real GitHub execution from a copied installation remain untested. No installation or global cutover occurred.

The D30 downward-link cleanup was checked on 2026-10-15 against baseline `6397a5a`. All 52 upward-link occurrences were removed or redirected. The new validator rejects that baseline with 50 distinct upward-link diagnostics and accepts the updated bundle with one entry and 84 Markdown files. Typechecking and all 86 tests passed, including rejection and peer-composition cases. All 48 fenced runtime examples are unchanged, and the entry, host adapters, helper code, license, and Arena body retain their bytes. [Link-flow evidence](SOURCE-AUDIT.md#d30-downward-link-verification) records caller/context review and remaining limits. The external skill-creator validator could not start because PyYAML is missing. No fresh independent behavioral evaluation or live host delegation was run.

The D31 playbook-folder move was checked on 2026-10-15 against baseline `38ba3e1`. All 25 entries and 28 owned resources moved with their callers updated. The 84 runtime Markdown files preserve their wording apart from link targets and table spacing, and all 48 fenced examples retain their bytes. Typechecking and all 92 tests passed, including copied-runtime helper execution and nested-reference layer checks. [Folder-layout evidence](SOURCE-AUDIT.md#d31-playbook-folder-verification) records the complete file inventory, link/reachability checks, and direct review. The external Python validator remains blocked by missing PyYAML. Fresh behavioral-agent evaluation and live host discovery/delegation were not run; earlier workflow gaps remain.

The D32 HTML mode was checked on 2026-10-16 against baseline `1b7c244`. The complete two-file source was inspected and pinned. The previous Show me body and all ten examples remain exact after removing added routing, headings, and the new mode; all other 92 runtime files apart from the entry are byte-identical. Bundle validation and all 92 tests passed. [The audit](SOURCE-AUDIT.md#d32-html-mode-incorporation) records four direct instruction walkthroughs and source-coverage mapping. No independent behavioral evaluation, HTML rendering exercise, or live host check was run. The external Python validator remains blocked by missing PyYAML.

The D33 planning-template split was checked on 2026-10-16 against baseline `1982628`. All five template bodies are exact after heading promotion, and the shared tree example retains its bytes. The sketch, approval/refinement, and final-response contracts are unchanged. All other 92 runtime files remain byte-identical. Bundle validation reports one entry and 88 Markdown files. Typechecking, all 92 tests with 303 assertions, formatting, whitespace, 666 local links, 279 fragments, and full runtime Markdown reachability pass. The audit records direct static routing walkthroughs and all three cleanup passes. No independent behavioral execution or fresh live-host check was run. The external skill-creator validator was not rerun after its recorded missing-PyYAML failure; that validation remains unavailable.

The D34 additional-template extraction was checked on 2026-10-16 against baseline `8a437e0`. Exact comparisons preserve the glossary-map body, glossary selection rules, Interrogate report after heading promotion, Planning completion-response fence, and all 48 fenced examples. The caller files differ only by the intended extractions and routing. All other 94 runtime files retain their bytes. Bundle validation reports one entry and 91 Markdown files. Typechecking and all 92 tests with 303 assertions pass, along with formatting, whitespace, 672 local links, 281 fragments, and complete runtime Markdown reachability. The audit records eight direct static routing walkthroughs and all three cleanup passes. No independent behavioral execution or fresh live-host check was run. The external skill-creator validator was not rerun after its recorded missing-PyYAML failure; that check remains unavailable.

The D35 visual PR requirement was checked on 2026-10-16 against baseline `8a6f70f` and the pinned workflow-tools source at `3f83b1d`. The inspected source matches that revision. All five visual-view bullets retain their exact wording, the complete-shape exception is restored, and both metadata-writing routes already read the shared reference. The remaining template sections and verification/publication instructions are preserved; all other 100 runtime files retain their bytes. Bundle validation reports one entry and 91 Markdown files. Formatting, whitespace, and new fragment-link checks pass. The audit records six direct static walkthroughs and inspection of PR #2's actual responsibility-tree outline at the baseline head. No independent behavioral execution or fresh live-host check was run. No helper, validator, or packaging code changed; D34's 92 tests and typecheck remain historical results for unchanged code. The external skill-creator validator was not rerun after its recorded missing-PyYAML failure.

The D36 coding-standards workflow was checked on 2026-10-18 against baseline `156bfdd`. Five independent offline evaluations covered standards-cited review with an endorsed smell suppressed, Capture before and after a routing fix, standards-first implementation, and a three-turn Survey with a mid-migration convention and an aspirational rule. The first Capture run exposed a competing entry route; the fix was verified by rerun. Bundle validation reports one entry and 95 Markdown files; typechecking and all 92 tests pass. Formatting, whitespace, and new anchors pass. [The audit](SOURCE-AUDIT.md#d36-coding-standards-verification) records outcomes and limits. Review-history mining through `gh`, delegated Survey exploration, Interrogate panels, and live host discovery remain untested.

The D37 wording removal was checked on 2026-10-19. Direct before/after comparison confirms only the three intended clauses removed, with neighboring steps, permissions, and stopping conditions byte-identical. Bundle validation reports one entry and 95 Markdown files with no errors; formatting, whitespace, and `git diff --check` pass. No helper, validator, or host-adapter code changed. No fresh behavioral evaluation or live-host check was run.

The D43 Tour playbook was checked on 2026-10-19 against baseline `8c1e1b2`. Every Mermaid example in the views catalog rendered with Mermaid CLI 12.0.0, the version Plannotator 0.28.23 ships. Rendering caught a class-diagram styling statement that declared a phantom class, fixed by the `:::name` suffix. Plannotator's annotate viewer renders Mermaid fences, per its v0.27.16 release notes and `@plannotator/ui` source. Four independent offline evaluations used a frozen bundle copy and a Go and PostgreSQL fixture repository. A routing check sent seven prompts to Review, Tour, Show me, and How as intended. A one-line change tour produced one chapter with 1/1 paths covered, but used more views than the change needed, so a sizing sentence was added. A change tour of a feature, an unrelated rename, uncommitted edits, and an untracked test produced two chapters with 15/15 paths placed once. It flagged the planted memory-store gap without becoming a review, and stated deploy order and compatibility. One of its diagrams failed to parse on a semicolon in a sequence message, so the accuracy rules now name that pitfall. A data-model tour ran Map, Shapes, Flow, Behavior, and Glue, rendered all seven diagrams, and checked 47 source anchors. All fixtures stayed unchanged. A report-only prose critique removed ten restatements and no-op phrases. Bundle validation reports one entry and 97 Markdown files; formatting and whitespace checks pass. Evaluators had no Plannotator, so the fallback path was exercised and the live annotate path was not. Live host discovery and real PR delivery remain untested.

Future verification should update this section with its date, target revision, commands/evidence, and remaining limits. No follow-up above is automatically authorized by this snapshot.

## Sources

Original OpenCode session: `ses_ec3c6cff2ffev2bYCWi3zMV355`, **Create mstack skill bundle from pstack and workflow-tools**, 2026-10-14–15 (UTC). Message IDs below locate the original evidence if that session remains available. The summaries here are sufficient for normal maintenance; local session storage and temporary exports are not runtime dependencies.

Publication: [PR #2](https://github.com/mholtzscher/skills/pull/2), [initial bundle `8bc5ef5`](https://github.com/mholtzscher/skills/commit/8bc5ef598d162403ea0a924f74cb3ec2e0efa03b), [verification addition `f26c267`](https://github.com/mholtzscher/skills/commit/f26c267af3923caba16dd968524de5d5eb63cb2b). Inbox thread: `msg_01M4Y7HCWRJZ9YS7NK2AQ3PFM0`. Upstream revisions and licenses are recorded in [PROVENANCE.md](PROVENANCE.md).

### E1: Original purpose and hosts

Initial request `msg_13c393012001UIuzvW7TPJiaB2` asked for an owned workflow, history-informed exploration, and intent confirmation before changes. Completed questions in `msg_13c3b2e73001oBVR2l5B3DeyZt`: “Yes, that's the direction,” broad adaptation, regular OpenCode V2/Pi use, and initially main plus shortcuts. The last choice was superseded by E8.

### E2: Delegation, delivery, and activation

Completed questions in `msg_13c3f7512001CoRFDAlhC8VX1C`: selective delegation, “Publish ordinary coding too,” explicit advanced stack/merge playbooks, and explicit invocation.

### E3: Planning and PR contracts

Completed questions in `msg_13c4104370013jCCzrNh3JXluO`: two planning paths, agreed PR-feedback verdicts, CI repair for coding tasks, and visual PR descriptions plus verification. Completed questions in `msg_13c43c4fa001IwTIUybpBFvw4G`: “Approve every sketch,” agent routing with user override, Bun/TypeScript, and sound direct fallback when delegation is unavailable.

### E4: Principles, cleanup, and models

Completed questions in `msg_13c45630d001sJ2S5CORrNxjLR`: keep broad supporting workflows, “Retain explicit principle citations,” “Mandatory cleanup specialists,” and “Host configuration only.”

### E5: Vendoring, migration, and review surface

Completed questions in `msg_13c46ecc20013wMf4TooCQXcjg`: deprecate standalone orchestrator, vendor selected specialists, flexible explicit targets, and build then cut over. Completed questions in `msg_13c4852bd0016uQpBnoGvphlyV`: vendor the planning/explanation group (show-me, show-complexity, spec-planner, grilling, domain-modeling), evidence-led comment review, and host questions by default.

### E6: Initial implementation approval

`msg_13c50e23a001u06V1eBjR7Yo7L` contains the implementation plan and completed answer “Approve implementation.” Later choices below supersede its original shortcut layout. Publication was explicitly requested in `msg_13d7d4894001cD9rBJP2IDXnCK`: “create pr for all the changes.”

### E7: Shared-context consolidation

`msg_E8B03792AE554F49B72043437D11DF8D`: “Merge it in. Make sure to keep exact text.” Follow-up shared-rule removal: `msg_13d46fb2f001umL7J8hByFI05h`; principle-index request: `msg_13d48fd8b001BhQcl4w6lAQ1fW`; remaining index consolidation approval: `msg_13d4b7038001dFPJi4d8QoVlid`. The user also challenged redundant same-file shared-rule instructions in `msg_13d68ff5b001FsvdFSFUZDOu3F`.

### E8: Single entry and terminology

`msg_13d550a38001JIWqzc6Npcut2S`: “i want just one entry point”; `msg_13d560b0f0016Duk7IamQSY66V` accepts the proposed organization. `msg_13d6d4c5e001SjZp4FPvWsqcJ9` proposes choosing **playbook** over **capability**; `msg_13d6dd52f001gOtr75oiZ4R38G` approves it.

### E9: Playbook consolidation

`msg_13d72ebea001qQyR2oY7enzWzJ` approves the cleanup, continuity, and explanation merges. `msg_13d78d4340018tJ3G4V32mUsOF` approves the subsequent planning and PR-flow merges after the request in `msg_13d77a34e0015TKLbo3Jxk2oCz`.

### E10: Verification-skill addition

`msg_13d81e445001XcPqpJ2ElqQG7A` asks whether the pstack verification skill was brought over; `msg_13d828ade0010rJMqNNYW0EhzX` approves the proposed create/maintain addition. Commit `f26c267` records the implemented adaptation.

### E11: Durable maintenance context

`msg_13fb77dc4001r9KajOY1eIIlRc` asks to preserve this session's context and decisions, including before compaction. `msg_13fb974fd0013hItpGNdmoOztN` approves the proposed `DECISIONS.md`, maintainer `AGENTS.md`, provenance pointer, and update to PR #2.

### E12: Show-me restoration

`msg_140011a06001Yfyajy4S0mpm00` requests greater fidelity to the show-me source after identifying lost content. The subsequent structured answer selects “Restore full source (Recommended),” approving the complete body with minimal packaging/host-tool adaptations, decision/provenance updates, and publication to PR #2. `msg_14002cd4b001yxpv1kTUHKii0S` then requests removing attribution from the in-use instructions because it would confuse the agent.

### E13: Spec-planner restoration

In the 2026-10-15 continuation, after the comparison of the full planner and its four references, the user approved restoring the complete source workflow, including phase reporting, effort estimates, and completeness checks, and updating PR #2. The approval retained mstack's sketch/approval/host/path contracts and prior-answer reuse. This approval is preserved in the conversation checkpoint; no additional original message ID was recovered for this entry.

### E14: All integrated-skill audit

The subsequent request was “do this same audit for all the skills we integrated.” The resulting `SOURCE-AUDIT.md` records sources, destinations, missing instructions/examples/resources, deliberate adaptations, and proposed next restorations. It continues the already-approved spec-planner work; it is not blanket approval to change every audited workflow.

### E15: Three-procedure restoration

In the 2026-10-15 continuation, the recommendation was to restore show-complexity, grilling, and domain-modeling together next. The user answered “do those 3.” The acknowledged scope was full-source restoration with mstack's host and approval rules, validation, and an update to PR #2. This approval is preserved in the conversation checkpoint; no additional original message ID was recovered for this entry.

### E16: Orchestration and explanation restoration

In the 2026-10-15 continuation after D18, the assistant recommended orchestration, How, and Why as the next restoration batch, plus the explicit PR incomplete-review stop rule. The user answered: “do those. you can have subagents do them if you give explicit instructions to them and detailed context as to why we're doing it”. The acknowledged scope included the three procedures, the PR rule, maintenance records, verification, and publication to the existing PR. Review/blast-radius and performance restorations were named as later work and are not part of this approval.

### E17: Review and blast-radius restoration

After D19 was published, the assistant recommended Review/interrogate and Blast radius together, explicitly naming all four review references, the missing verdict formats, proof ladder, dependency/timing checks, and runnable evidence. The user replied: “use the same strategy to address those”. The acknowledged scope includes isolated implementation, detailed source/policy briefs, independent review, behavioral checks, records, and publication to PR #2. Benchmark/hillclimb and refactoring/visual-parity work were named as later batches.

The source's strict structural bar was then presented as a policy conflict: presumptive blockers for crossing 1,000 lines or missing structural simplifications versus mstack's evidence-led review. The user selected **Evidence-led (Recommended)**: “Keep every diagnostic and example, but require a concrete maintainability problem to block; file size alone prompts inspection.” This is an explicit adaptation of the source, not an accidental omission.

### E18: Benchmarking and hillclimbing restoration

After D20 was published, the assistant recommended “benchmarking and hillclimbing” as the next batch. The user replied “do those next”. The acknowledged scope is full benchmark-checklist and hillclimb restoration with source/policy briefs, isolated implementation, independent review, behavioral checks, maintenance records, and an update to PR #2. The source's fixed-model delegation and stacked delivery are adapted to existing mstack decisions; the minimum-attempt requirement is bounded by the agreed budget. Refactoring/visual-parity and other source-audit work remain later proposals.

### E19: Refactoring and visual-parity restoration

After D21 was published, the assistant recommended “refactoring verification and visual-parity baselines.” The user replied “do those next”. The acknowledged scope retained isolated implementation, independent review, behavioral checks, source-policy comparison, and publication to PR #2. Asked to choose between unconditional zero-diff and an explicit agreed contract, the user selected **Agreed contract (Recommended)**: “Default to pixel-exact; allow differences only when explicitly approved before comparison. Report those exceptions separately and never call a nonzero result pixel-exact.” Both options explicitly froze the baseline/harness and blocked unexplained differences.

### E20: Teach, Catch-up, and Recall restoration

After D22 was published, the assistant recommended “Teach, Catch-up, and Recall.” The user replied “do those next”. The acknowledged scope is source-complete restoration with the same isolated implementation, independent review, behavioral checks, maintenance records, and publication to PR #2. Fixed transcript paths/models/image tooling are adapted to accepted host and permission rules, without restoring adjacent authoring/reflection or advanced programs.

### E21: Prose cleanup and reflection restoration

After D23 was published, the assistant recommended prose cleanup and reflection. The user replied “do those next”. Asked whether to treat the recovered punctuation rules as contextual diagnostics or strict prohibitions, the user selected **Strict source style**: apply the source's punctuation and style prohibitions to editable prose while protecting exact evidence and technical syntax. Both options explicitly preserved quotations, code, commands, citations, and meaning. The acknowledged restoration keeps existing approval rules for skill edits and tracker writes and follows the established review, evaluation, and PR publication strategy.

### E22: Decision-trail restoration

After D24 was published, the assistant recommended decision trails. The user replied "do that next". The acknowledged scope includes the procedure, template, helper, established source-review and behavioral-evaluation strategy, and publication to PR #2. Asked whether to require a different model family on every trail handoff, the user chose **Selective review**. Both offered choices retained transcript auditing and an honest Attention section. The implementation uses the established Bun/TypeScript, local-artifact, host, and approval rules.

### E23: Principle restoration

After D25 was published, the assistant recommended the remaining principle losses, reviewed individually. The user replied "continue". The acknowledged work compares each complete source before restoring diagnostics and examples and surfaces policy conflicts first. The user then selected **Evidence-driven** tool creation, **Risk-based** semantic types, and **Declared phases** for temporary migration breakage. The questions retained implementation/publication authority, total functions on plain types, isolated approved phases, and passing boundary/final checks. Existing restoration strategy and PR #2 remain the delivery path.

### E24: Architecture and Swarm restoration

After D26 was published, the assistant recommended Architecture, Arena, and Swarm. The user replied "keep going". When asked whether Arena should always require a separate judge or use one selectively, the user answered "skip arena for now". The assistant acknowledged the narrowed Architecture and Swarm batch, with Arena restoration deferred and the existing comparison route retained. The established source-review, isolated implementation, independent evaluation, and PR publication strategy continues within that scope.

### E25: Diagnostic workflow restoration

After D27 was published, the user asked whether the proposed testing, forensics, and performance options were skills. The assistant identified the `tdd` skill and four nested pstack playbooks, explained the missing instructions and their existing mstack destinations, and distinguished the already-restored benchmarking and Hillclimb procedures. The user answered "ah yes, do those". The acknowledged scope retained the established source comparison, isolated implementation, independent review, behavioral checks, and publication to PR #2.

### E26: Runtime packaging separation

The user asked whether provenance, decisions, and the glossary would be installed with the skill, then requested a proposed directory structure. The assistant showed `mstack/` for runtime files, `docs/mstack/` for maintenance documents, and `tooling/mstack/` for validation, tests, and development dependencies. The proposal retained self-contained Help and runtime links. The user replied "do that", approving this layout and its necessary caller updates.

### E27: Downward reading flow

After D29 was published, the user requested downward links through the skill without upward links. An audit found 28 links back to `SKILL.md` and 24 from supporting material back to playbooks. The assistant proposed removing those reading dependencies, preserving rules and delegated context, and adding a validator check. The user selected **Keep peer links (Recommended)**, approving parent-backlink removal while retaining task-specific composition, shared-resource links, and valid `../` paths.

### E28: Playbook folders

After D30 was published, the user asked whether playbooks could be folders containing their references. The assistant proposed `playbooks/<name>/PLAYBOOK.md` with colocated owned references, shared guidance in root `references/`, no empty reference folders for simple playbooks, one discoverable `SKILL.md`, and validation that distinguishes entries from nested supporting material. The user replied "let's do this!", approving that proposal and its required link and helper-path updates.

### E29: Big pictures, little words

The user requested incorporation of `https://github.com/backnotprop/bro/blob/main/skills/big-pics-little-words/SKILL.md` after the folder reorganization. The assistant inspected the complete source, UI metadata, repository tree, and license evidence, then recommended a named HTML mode within Show me with explicit routing, source/adaptation records, validation, and publication to PR #2. The proposal retained the existing general visual mode and identified the independently worded adaptation of a source without a declared license. The user replied "Do it", approving the recommended integration.

### E30: Planning template split

The user questioned keeping all planning templates in one file. The assistant inspected the 268-line resource and proposed separate quick-decision, feature-plan, ADR, RFC, and handoff files. The proposal put shared formatting in the playbook, selected one template through a direct link, loaded handoff only after approval, and preserved the existing content and examples. The user replied "do it", approving that split and its caller updates.

### E31: Additional template extractions

The user asked to look for other templates needing the same split. The audit recommended separating the glossary-map template, the Interrogate report, and Planning's final response, preserving their wording and adding conditional links at the relevant steps. It identified the existing How/Why, Reflection, PR metadata, and Architecture references as already separated by purpose. The user replied "do it", approving the three recommended extractions.

### E32: Explicit visual PR outline

The user asked whether mstack had lost the workflow-tools PR template. A source comparison found that its structure survived but its visual guidance had been condensed, including narrative ordering, detailed view choices, and the complete-shape exception. The user then said, "The visual outline is very important to me. I want to make sure it is explicit." This directs the visual requirement and source-detail restoration recorded in D35.

### E33: Coding-standards workflow

On 2026-10-18 the user asked whether mstack covered maintaining coding standards, then whether it used a `CODING_STANDARDS.md` file, and traced the idea to Matt Pocock's skills. The assistant identified the missing feedback loop and inspected Matt's code-review and retro. The user said "i want to create a more cohesive workflow around coding standarsd then" and answered structured questions: **Implementation too**, **Both** (new playbook plus a Reflection hand-off), **Yes, as judgment calls (Recommended)**, and **Separate Standards section (Recommended)**. Asked about codebases without a file, the user chose **Explicit + offered (Recommended)**, **Yes, when accessible (Recommended)** for history mining, and **Few strong rules (Recommended)**, then added "survey should also interview the user based on exploration to discover standarsd". The revised sketch, including the deferred PR-feedback Capture, was answered "approved".

PR #3 triage then found two valid Codex review threads at `8c7e41d`. The user selected **Agree, nearer wins (Recommended)** for scoping standards sources and **Agree (Recommended)** for keeping buckets on standards findings and blockers in their main bucket, then requested "fix the agreed feedback".

### E34: Harness-injected instructions

On 2026-10-19 the user asked whether the harness reads `AGENTS.md` and injects it, after session evidence showed spec-implement runs following `hearth/AGENTS.md` without a `read` tool call. The assistant confirmed OpenCode auto-loads global plus project `AGENTS.md` with nested discovery, confirmed the harness copy in `instruction_blob`, and proposed removing the three explicit read lines as diffs in the Plannotator Inbox (thread `msg_01M5922TTVBZ0RDARQWW83MF1X`). The user replied "approved".

### E35: Tour playbook

On 2026-10-19 the user asked for ideas for a guided review playbook, then redirected toward "visualizations and high impact representations. especially on types, interfaces, data objects, db tables, and data flow". Asked "is this just a more detailed show-me?", the assistant separated the visual formats from the changeset procedure. The user proposed "tour" as the reusable concept, considered tours as the output of Exploration and Explanation, then narrowed: "maybe tour doesn't align with those yet". Asked for a sketch, the user chose **Change + data model (Recommended)**, **Tool-agnostic**, and "always markdown and open plannotator for me", then answered "approved" to the sketch. During implementation the user added "add callstack to views as well".
