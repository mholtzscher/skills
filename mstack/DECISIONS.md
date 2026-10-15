# Mstack maintenance decisions

Initial record created 2026-10-15 from the original design session's user messages and completed question/answer records, including material before compaction, and cross-checked against the published bundle at `f26c267`. Later decisions cite their own approval evidence. This is the durable record of design intent; [SKILL.md](SKILL.md) and its linked playbooks contain the executable instructions, and [PROVENANCE.md](PROVENANCE.md) identifies adapted sources.

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

Approved consolidations: code/prose/comments in [cleanup](playbooks/cleanup.md); recall/catch-up/pickup/pause in [continuity](playbooks/continuity.md); how/why/teach in [explanation](playbooks/explanation.md); sketch/spec-planner/refinement in [planning](playbooks/planning.md); six PR operations in [pull requests](playbooks/pull-requests.md). Named sections preserve each operation's permissions and stopping point. Spec implementation, finish delivery, grilling, and domain modeling remain separate procedures.

The user explicitly required exact text preservation during consolidation. Headings, relative links, and agreed terminology changed; substantive instruction rewriting was not part of that permission. This does not freeze wording forever: future intentional changes need their own scope. [E7](#e7-shared-context-consolidation), [E9](#e9-playbook-consolidation).

### D04: Approve both planning paths

The agent chooses an implementation sketch or full spec based on uncertainty, impact, and scope; the user can override that choice. **Both require approval before implementation.** Reuse already-given approval and reopen it when material new evidence changes the outcome. Full specs remain first-class implementation contracts; refinement proposes changes before editing them.

**Rejected:** showing a small sketch and proceeding automatically. The user's answer was “Approve every sketch.” Smaller work reduces planning depth, not user control. This intentionally replaces pstack's “Never Block on the Human” posture. [E3](#e3-planning-and-pr-contracts).

### D05: Approved ordinary coding includes delivery

Approved feature, bug-fix, refactoring, and spec-implementation work continues through verification, cleanup, one PR, and repair of required CI within scope. Ordinary delivery stops before merging. Stacked delivery and merging remain explicitly requested advanced operations.

**Rejected:** making verified local changes the ordinary stopping point. The user chose “Publish ordinary coding too” and “Fix CI for coding tasks.” This authority belongs to approved coding; investigation, planning, review, and check snapshots retain their own completion conditions. See [scope and approval](SKILL.md#scope-and-approval) and [finish delivery](playbooks/finish-delivery.md). [E2](#e2-delegation-delivery-and-activation), [E3](#e3-planning-and-pr-contracts).

### D06: Preserve distinct PR intents and agreement boundaries

Publish, rewrite metadata, triage feedback, fix agreed feedback, inspect checks, and watch are independently selectable operations. Triage is read-only until agreement. Feedback fixes must publish successfully before reactions or thread resolution. Monitoring after standalone publication or feedback fixes is read-only; coding tasks own required-CI repair. An immediate checks request does not become a waiting or repair loop.

Keep the visual PR format: **Why the change**, **Special things to note**, a compact **Change outline**, and verification results. Explicit PR URLs/numbers are accepted. The [PR playbook](playbooks/pull-requests.md) implements these boundaries, including its bounded 30-minute publication watcher and opt-out; merging its files did not merge its permissions. [E3](#e3-planning-and-pr-contracts), [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval), [E9](#e9-playbook-consolidation).

### D07: Delegate selectively; let hosts own models

Use separate contexts when independent exploration, implementation, or review materially helps. Coupled implementation has one writer, and the coordinator accepts delegated evidence. Optional delegation can fall back to disclosed direct work where sound; an explicitly required independent review or parallel run remains unmet until available or revised by the user.

Models and roles come from host configuration. **Rejected:** mandatory implementation delegation, routine design panels, a model sheet, and even an optional mstack-specific model-setup workflow. OpenCode/Pi adapters translate actual host capabilities rather than duplicating workflow policy. See [orchestration](references/orchestration.md) and [host selection](SKILL.md#host-selection). [E2](#e2-delegation-delivery-and-activation), [E3](#e3-planning-and-pr-contracts), [E4](#e4-principles-cleanup-and-models).

### D08: Retain material principle citations

Read relevant principle leaves and cite a principle when it materially changes a decision, naming the concrete choice it affected. The user retained explicit citations rather than making principles entirely implicit. Relevance determines which principles apply; their presence does not automatically trigger a heavyweight design or delegation exercise. [E4](#e4-principles-cleanup-and-models), [E6](#e6-initial-implementation-approval).

### D09: Keep all three cleanup passes and useful rationale

Code cleanup, prose cleanup, and dedicated comment review are mandatory before publication. They are distinct passes, not a requirement for three simultaneous writing agents. Independent report-only review is useful when available; the owner applies accepted changes within scope.

Comment review preserves useful non-obvious rationale and investigates uncertain constraints before recommending deletion. **Rejected:** inheriting pstack's default-to-delete treatment of unresolved constraint comments. Encoding a real constraint in a type, test, or assertion is preferable when practical, but uncertainty alone is not evidence that a comment is worthless. See [cleanup](playbooks/cleanup.md). [E4](#e4-principles-cleanup-and-models), [E5](#e5-vendoring-migration-and-review-surface).

### D10: Vendor selected procedures; keep specialists external

Vendor/adapt show-me, show-complexity, spec-planner, grilling, and domain-modeling with required supporting references. Integrate agent-orchestrator and deprecate its standalone skill. These procedures are maintained mstack content, reached through the single entry.

Technical and tool-specific skills remain external: service-design, go-test-effectiveness, skill-creator, writing-for-agents, agent-browser, and terminal-control. No external skill is mandatory at bundle startup; a task still requires the actual tools needed to complete it. This keeps independently evolving tool instructions with their owners while making the selected planning/explanation workflow self-contained. **Rejected proposal:** reference all the planning/explanation procedures externally. [E5](#e5-vendoring-migration-and-review-surface).

### D11: Put deterministic mechanics in standalone Bun scripts

Use Bun/TypeScript for reusable PR targeting, paginated thread collection, conservative check classification, and bounded failure-log evidence. Preserve unknown/unavailable evidence as distinct from success and detect inconsistent snapshots. Keep approval and publication policy in the playbooks. Explicit spec paths and PR targets are supported; repository defaults are conveniences rather than a strict slash-command grammar.

This retains useful workflow-tools logic without its plugin lifecycle or prompt-injection machinery. The four PR evidence helpers are read-only and use `gh`. D25 adds a separate local append helper for decision trails. Publication uses Git/GitHub tools under the selected workflow. Mstack supplies neither a scheduler nor host-enforced permissions. [E3](#e3-planning-and-pr-contracts), [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval).

### D12: Host questions are the default review interface

Use structured host questions for decisions, with conversational fallback. Plannotator/Inbox is optional when requested or useful for artifact review. **Rejected:** requiring Inbox or artifact sign-off for every proposal. Approval is mandatory where the workflow requires it; a particular review UI is not. [E5](#e5-vendoring-migration-and-review-surface).

### D13: Build and publish before a separate cutover

Building the bundle, deprecating the standalone orchestrator, and publishing the work are authorized independently of installation, global host configuration, and workflow-tools removal. Those cutover actions need their own request. This keeps development and review from silently changing the user's active environment.

The resulting packaging requires the entire `mstack/` directory under a skill search root. An explicit OpenCode source points at the parent containing `mstack/`; the obsolete `mstack/skills` source must be changed during cutover. See [installation](README.md#install-the-whole-bundle) and [migration](README.md#migration). [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval), [E8](#e8-single-entry-and-terminology).

### D14: Include verification-skill creation and maintenance

The initial bundle had general verification guidance but omitted pstack's project verification-skill workflows. The user approved adding one [verification-skill playbook](playbooks/verification-skill.md) with Create and Maintain sections and the worked feature-map resources.

The implemented adaptation defaults generated skills to project-local `.agents/skills/verify-<app>/`, shared by OpenCode and Pi. Creation proves one mapped feature end to end. Maintenance covers every mapped feature against source and live behavior, confines corrections to the target skill directory, and reports clean, changed, or blocked. Both retain evidence through owned cleanup. Mstack approval gates and selective source-reading delegation replace upstream host/path and mandatory-delegation assumptions. These are the adaptation's implemented details; real-app evaluation remains a separate evidence gap. [E10](#e10-verification-skill-addition).

### D15: Commit maintenance context

Keep this decision record and a short maintainer `AGENTS.md`, link them from the development guide, and make provenance refer to the committed record. The user approved this after asking how future sessions could recover context lost through compaction. Store decisions, rationale, source locators, and known gaps rather than a personal transcript dump. A repository-root pointer makes the maintainer instructions reachable when a session starts above `mstack/`. [E11](#e11-durable-maintenance-context).

### D16: Restore show-me source fidelity

Accepted 2026-10-15. Restore the complete show-me source body rather than summarizing its examples into a view-selection table. The condensed playbook had retained only one of ten worked examples and omitted the product-styling and desktop/mobile requirements. Keep the original examples and substantive guidance; limit adaptations to single-entry packaging, host-compatible file opening, and formatting. This supersedes the initial condensed show-me implementation while retaining D02's single entry and the shared approval rules.

Keep attribution out of this playbook's runtime instructions, as requested to avoid confusing the agent. Source identity and license notices remain in [PROVENANCE.md](PROVENANCE.md#show-me-source-fidelity) and [LICENSE](LICENSE). The approval covers this show-me restoration and publication to PR #2; it does not authorize rewriting other vendored procedures. [E12](#e12-show-me-restoration).

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

## Upstream differences that are not new commitments

The original adaptation condensed pstack 0.15.21's 24 principles into 14. Several concrete prescriptions were shortened away, including the written premise/actor census and detailed exhaustive-matching/type-construction guidance. D26 restores these diagnostics and examples, with explicit choices for evidence-driven tools, risk-based types, and declared migration phases. The source's mandatory tool deliverable and proceed-first policy are not restored. Full Orchestrate/Autopilot protocols and the dedicated worktree/simulator-cleanup workflow were not preserved.

These are observed coverage differences, not individually approved prohibitions or promises to port them later. The later consolidation passes preserved their source text; they did not restore detail omitted during the initial adaptation. Review upstream additions against the decisions above instead of treating parity as the acceptance criterion. Evidence: comparison response `msg_13d4e9cff001zIpZUmIFkY8AAo` in the [design session](#sources), checked against the current bundle. Verification-skill creation/maintenance was a subsequently identified omission resolved by D14.

The 2026-10-15 [integrated-source audit](SOURCE-AUDIT.md) extends that comparison to every selected vendor source, all 52 pstack skill entries including 24 principles, its 23 nested playbooks, supporting resources, and workflow-tools' PR/spec instruction contracts. It records additional losses separately from accepted host, approval, delegation, and delivery adaptations. D18 through D26 approve the subsequent restoration batches. The remaining restoration order is a recommendation awaiting approval. [E14](#e14-all-integrated-skill-audit).

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
