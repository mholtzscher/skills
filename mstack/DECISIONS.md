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

This retains useful workflow-tools logic without its plugin lifecycle or prompt-injection machinery. The shipped helpers are read-only and use `gh`; publication uses Git/GitHub tools under the selected workflow. Mstack supplies neither a scheduler nor host-enforced permissions. [E3](#e3-planning-and-pr-contracts), [E5](#e5-vendoring-migration-and-review-surface), [E6](#e6-initial-implementation-approval).

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

## Upstream differences that are not new commitments

The original adaptation condensed pstack 0.15.21's 24 principles into 14. Several concrete prescriptions were shortened away, including the written premise/actor census, detailed exhaustive-matching/type-construction guidance, and a mandatory tool deliverable for nontrivial work. Full Orchestrate/Autopilot protocols and the dedicated worktree/simulator-cleanup workflow were not preserved.

These are observed coverage differences, not individually approved prohibitions or promises to port them later. The later consolidation passes preserved their source text; they did not restore detail omitted during the initial adaptation. Review upstream additions against the decisions above instead of treating parity as the acceptance criterion. Evidence: comparison response `msg_13d4e9cff001zIpZUmIFkY8AAo` in the [design session](#sources), checked against the current bundle. Verification-skill creation/maintenance was a subsequently identified omission resolved by D14.

The 2026-10-15 [integrated-source audit](SOURCE-AUDIT.md) extends that comparison to every selected vendor source, all 52 pstack skill entries (including 24 principles), its 23 nested playbooks, supporting resources, and workflow-tools' PR/spec instruction contracts. It records substantial additional losses separately from accepted host, approval, delegation, and delivery adaptations. D18 approves the subsequent three-procedure restoration; the remaining restoration order is a recommendation, not an accepted change. [E14](#e14-all-integrated-skill-audit).

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
