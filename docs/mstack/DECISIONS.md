# Mstack maintenance decisions

Initial record created 2026-10-15 and cross-checked against the published bundle at `f26c267`. This is the durable record of design intent. [SKILL.md](../../mstack/SKILL.md) and its linked playbooks contain the executable instructions. The upstream-source provenance record was retired on 2026-10-21 under [D44](#d44-retire-upstream-provenance-tracking). Approvals below were user-confirmed per batch in the 2026-10-15 to 2026-10-19 sessions and PRs 2 through 5, except where a decision names its own approval.

The decisions below are accepted unless explicitly marked otherwise. When revising a decision, retain its ID and old outcome as superseded, link its replacement, and record the new approval and reason. Add proposals separately until accepted. Refresh dated validation observations when new evidence arrives. A missing test is not permission or a commitment to add it.

## Accepted decisions

### D01: Own the workflow independently

Mstack owns this repository's engineering workflow. Upstream parity and a workflow-tools runtime dependency are not goals. Preserve attribution and licenses when adapting content.

### D02: One explicit entry point and three terms

`mstack/SKILL.md` is the sole discoverable entry, explicitly invoked for a task. Supporting procedures are plain Markdown. Use **playbook** for a task procedure, **principle** for cross-cutting decision guidance, and **role** for a delegated responsibility. This supersedes the initial main-plus-shortcuts layout.

### D03: Consolidate routing without losing instructions

Shared rules, the principle index, host selection, investigation guidance, and PR intent routing live in the main skill. Load only the selected playbooks and relevant principle leaves. Consolidation changed headings, links, and agreed terminology, not substantive instructions.

The shared-rule organization is superseded by [D47](#d47-keep-the-entry-contract-separate-from-procedures), and entry-level PR intent routing by [D48](#d48-remove-duplicate-entry-routers). The single-entry design remains accepted.

### D04: Approve both planning paths

The agent chooses a sketch or full spec based on uncertainty, impact, and scope, and the user can override that choice. Both require approval before implementation. Reuse already-given approval and reopen it when material new evidence changes the outcome.

### D05: Approved ordinary coding includes delivery

Approved feature, bug-fix, refactoring, and spec-implementation work continues through verification, cleanup, one PR, and repair of required CI within scope. Ordinary delivery stops before merging. Stacks and merging require explicit requests.

### D06: Preserve distinct PR intents and agreement boundaries

Publish, rewrite metadata, triage feedback, fix agreed feedback, inspect checks, and watch are independently selectable. Triage is read-only until agreement. Feedback fixes publish first, then react or resolve. Monitoring after standalone publication or feedback fixes is read-only. Coding tasks own required-CI repair. Keep the visual PR format of why the change, special notes, a visual change outline, and verification.

### D07: Delegate selectively; let hosts own models

Use separate contexts when independent exploration, implementation, or review materially helps. Coupled implementation has one writer. Models and roles come from host configuration. Mandatory implementation delegation, routine design panels, and model setup are rejected. Optional delegation can fall back to disclosed direct work. Explicitly required independent review or parallel execution remains unmet until satisfied or revised.

### D08: Retain material principle citations

Read relevant principle leaves before applying them and cite a principle when it materially changes a decision. Relevance determines use. Presence of a principle does not trigger heavyweight design or delegation by itself.

### D09: Keep all three cleanup passes and useful rationale

Code cleanup, prose cleanup, and comment review are distinct mandatory passes before publication. Comment review preserves useful non-obvious rationale and investigates uncertain constraints. Default-to-delete treatment of unresolved constraints is rejected.

### D10: Vendor selected procedures; keep specialists external

Show-me, show complexity, spec-planner, grilling, domain modeling, orchestration, explanation, review, forensics, and related procedures are maintained mstack content behind the single entry. Service-design, go-test-effectiveness, skill-creator, writing-for-agents, agent-browser, and terminal-control stay external.

### D11: Put deterministic mechanics in standalone Bun scripts

Use Bun and TypeScript for PR targeting, thread collection, check classification, failure-log evidence, and the local decision-log append helper. Preserve unknown evidence as distinct from success. Keep approval and publication policy in the playbooks. Mstack supplies no scheduler or host-enforced permissions.

### D12: Host questions are the default review interface

Use structured host questions for decisions, with conversational fallback. Inbox or Plannotator review is optional, used when requested or when an artifact benefits from it.

The entry-level Inbox/Plannotator recommendation is retired by [D49](#d49-place-orientation-before-routing); host-question policy remains accepted.

### D13: Build and publish before a separate cutover

Building, deprecating the standalone orchestrator, and publishing are authorized independently of installation, global host configuration, and workflow-tools removal. Installation requires the entire `mstack/` directory under a skill search root.

### D14: Include verification-skill creation and maintenance

Keep one verification-skill playbook with Create and Maintain sections. Generated skills default to project-local `.agents/skills/verify-<app>/`. Creation proves one mapped feature end to end. Maintenance covers every mapped feature, confines corrections to the target skill directory, and retains evidence through cleanup. Implementation changes require approval.

### D15: Commit maintenance context

Keep this decision record and a short maintainer `AGENTS.md`, linked from the development guide. D29 moved them to `docs/mstack/`, reached through repository-root `AGENTS.md`.

### D16: Restore show-me source fidelity

Accepted 2026-10-15. Restore the complete show-me body with all ten worked examples and styling guidance. Adaptations are limited to single-entry packaging, host-compatible opening, and formatting. Attribution stays in maintenance and license files, not runtime instructions.

### D17: Restore spec-planner source fidelity

Accepted 2026-10-15. Restore the full spec-planner workflow and all four references with formatting changes only. Keep the sketch route, both approval gates, prior-answer reuse, explicit output paths, proposal-only refinement, and host tool adaptations.

### D18: Restore the remaining selected vendor procedures

Accepted 2026-10-15. Restore show-complexity, grilling, and domain-modeling in full, including the visual-selection table, whole-frontier interview contract, and glossary and ADR formats. Keep host questions, selective delegation, prior-answer reuse, read-only scope, and sketch or spec approval before implementation.

### D19: Restore orchestration and explanation evidence

Accepted 2026-10-15. Restore orchestration roles, briefs, ownership, handoff, and escalation guidance, plus the complete How and Why procedures with their references. Keep selective delegation, host-owned models, bounded read-only investigation, and citation discipline. Restore the PR incomplete-review stop rule: publication and metadata rewrites stop before writes when the scoped diff review is incomplete.

### D20: Restore review and blast-radius evidence

Accepted 2026-10-15. Restore Review and Interrogate with all four references and the Blast-radius proof ladder with dependency, timing, and local-patch checks. Review stays report-only. The user chose evidence-led structural review: keep every diagnostic, including the 1,000-line threshold, but require a concrete maintainability problem to block. Requested model diversity must be real or reported unmet.

### D21: Restore benchmarking and hillclimbing

Accepted 2026-10-15. Restore the benchmark checklist and Hillclimb procedure with its frozen harness, exact nine-field log, and seven ordered mantras. Keep approval before harness or product experiments, reuse of an approved experiment series within budget, and one ordinary unmerged PR for production changes.

### D22: Restore refactoring proof and visual-parity baselines

Accepted 2026-10-15. Restore Refactoring with behavior pins and ordered green slices, and Visual parity with frozen baselines, shared-primitives-first order, and per-component image comparison. The user chose the agreed visual contract: pixel-exact is the default, approved differences are predefined and reported separately, and zero unexplained pixels are required.

### D23: Restore Teach, Catch-up, and Recall

Accepted 2026-10-15. Restore Teach, Catch-up, and Recall in full, including teaching examples, carried-forward user decisions, live-state checks, and scoped history evidence. Teaching stays read-only. Missing transcripts and unverified live state remain explicit gaps.

### D24: Restore prose cleanup and reflection

Accepted 2026-10-15. Restore the 28-pattern prose catalog with strict source style for editable prose, and Reflection with all four reviewer and synthesis references. Exact quotations, code, commands, citations, and technical meaning stay protected. Accepted reflection items remain proposals pending selection. Tracker writes need current authorization.

### D25: Restore decision trails

Accepted 2026-10-15. Restore the decision-trail procedure, six-column template, worked example, and local append helper. Trails stay local in ignored storage or an agreed outside-tree path. The user chose selective review. Read-only reviews propose corrections rather than appending them.

### D26: Restore the consolidated principles

Accepted 2026-10-15. Restore substantive diagnostics and examples from the 24 principle sources into the 14 consolidated files. The user chose evidence-driven tool creation, risk-based semantic types, and declared migration phases. The proceed-first policy stays rejected.

### D27: Restore Architecture and Swarm; defer Arena

Accepted 2026-10-15. Restore Architecture and Swarm in full, including grounding, rationale, red-flag screening, receipt validation, and coverage and race rules. The user deferred Arena restoration. Architecture-only work stops at a design package and approval request.

### D28: Restore testing, forensics, and one-off performance detail

Accepted 2026-10-15. Restore TDD, Bug fix, Runtime forensics, Trace forensics, and one-off performance detail, including reproduction, hypothesis elimination, practical regression alternatives, flaky-test discipline, and trace-backed comparison. New tests, instrumentation, parsers, and product fixes need current implementation authority.

### D29: Separate runtime packaging from repository maintenance

Accepted 2026-10-15. Keep only `SKILL.md`, `LICENSE`, playbooks, principles, runtime references, helpers, and helper usage in `mstack/`. Maintenance records live in `docs/mstack/` and development tooling lives in `tooling/mstack/`. Runtime files must not depend on repository maintenance documents.

### D30: Keep runtime reading flow downward and retain peer composition

Accepted 2026-10-15. Runtime links go down or stay within a layer: entry, playbooks, then supporting material. Remove backlinks to the entry and from supporting files to playbooks. Keep peer composition and shared-resource links. Maintenance documents are outside this rule.

### D31: Colocate playbooks and their owned references

Accepted 2026-10-15. Give every playbook a `playbooks/<name>/PLAYBOOK.md` entry with owned prompts, templates, formats, and examples in that folder's `references/`. Keep cross-cutting guidance in root `references/` and `SKILL.md` as the sole discoverable entry.

### D32: Add Big pictures, little words as a Show me mode

Accepted 2026-10-16. Incorporate the requested `backnotprop/bro` skill as a named HTML-first mode within Show me, with independently written instructions for large visuals and brief text. The source declares no license for this skill, so its text is not vendored and existing MIT notices are unchanged.

### D33: Read planning templates by document type and stage

Accepted 2026-10-16. Split the combined planning template resource into five files beside Planning. Drafting reads only the chosen format. The handoff template is read only after approval in Done.

### D34: Disclose glossary-map and final-report templates when needed

Accepted 2026-10-16. Extract the glossary-map format, Interrogate report, and Planning completion response into their own references. Context selection moved into the calling playbook. Callers read each template only at its relevant writing stage.

### D35: Require a visual PR change outline explicitly

Accepted 2026-10-16. Make the visual requirement explicit in the shared PR metadata reference. The change outline must contain a relevant diagram, responsibility tree, focused diff, or pseudocode. A prose summary or file-by-file changelog does not satisfy it. Explicit user or repository formatting instructions still take precedence.

### D36: Add a coding-standards workflow

Accepted 2026-10-18. Add a Coding standards playbook with Find, Apply, Capture, and Survey sections, a root smell baseline, and owned rule-format and survey-source references. Implementation reads standards too, not only review. Standards findings carry a review bucket, and correctness or security defects stay in their main bucket. Rules and checks start as proposals. Standards-file edits need explicit row selection. New checks need implementation approval and ordinary delivery.

### D37: Drop explicit repository-instruction reads

Accepted 2026-10-19. Remove the explicit repository-instruction reads from spec-implement, planning, and verification inventory. The harness injects `AGENTS.md` as system instructions. Shared-rule authority for explicit user and repository instructions is unchanged. Approval: Inbox thread `msg_01M5922TTVBZ0RDARQWW83MF1X`, user answered approved 2026-10-19.

### D38: Trim playbook no-op sentences for directness

Accepted 2026-10-19. Remove persona framing, same-file restatements, shared-rule repeats already loaded with the entry, and throat-clearing across all playbooks. Substantive instructions, permission boundaries, approval gates, and evidence requirements are preserved. Approval: user directive Apply then, 2026-10-19.

### D39: Trim principle no-op sentences for directness

Accepted 2026-10-19. Remove agreed no-op sentences across the 14 principles, including same-file restatements, slogans, disclaimers, and shared-rule repeats already loaded with the entry. Substantive diagnostics and D09 comment protection are preserved. Approval: user-selected Agreed plus shared-rule scope, 2026-10-19.

### D40: Second trim pass on principles

Accepted 2026-10-19. Extend D39 with the reconciled pass-2 findings. Excluded wording rewrites and operative trims. Approval: user-selected Add shared-rule too scope, 2026-10-19.

### D41: Routing fixes from mstack usage sessions

Accepted 2026-10-19. Five routing fixes from session evidence: architectural why goes to Exploration Architecture, explicit-invocation fallback reports a missing entry instead of substituting another skill, complexity triggers route to Show complexity without implying effort estimation, retro routes to Skill development Reflect, and timing and benchmark requests route to read-only Performance. Approval: user yes to implementing all five, 2026-10-19.

### D42: Entry-trigger disambiguation from dual-worker review

Accepted 2026-10-19. Ten trigger fixes both workers independently flagged, covering repair versus diagnose wording, narrowed read-only investigation scope, recall as recent-work review, scoped-change cleanup, spec implementation without pre-approval implication, skill author and evaluation routing, analysis-only complexity assessment, current-session retro scope, and monitor on the PR row. Excluded single-worker extras and rewrites. Approval: user-selected Both-agree only scope, 2026-10-19.

### D43: Add a Tour playbook for shared, visual walkthroughs

Accepted 2026-10-19. Add a Tour playbook with an owned views catalog for ordered visual walkthroughs of a change or data model. Show me stays the single in-chat view. Tours cover change and data-model subjects only, stay tool-agnostic, default to Markdown opened in Plannotator, and remain read-only. Every tour pins its revision, anchors each stop to source, gives each changed path one owning chapter, and explains rather than reviews. Catalog ownership superseded by [D45](#d45-promote-views-catalog-to-cross-cutting) on 2026-10-21; tour structure rules are unchanged. Approval: sketch approved plus owning-chapter fix for PR 5 feedback, 2026-10-19.

### D44: Retire upstream-provenance tracking

Accepted 2026-10-21. Delete `docs/mstack/PROVENANCE.md` and stop revision-level upstream tracking. Mstack is now owned work in this repository. Upstream parity was already not a goal under D01, and the user confirmed there is no intent to stay in sync. MIT copyright notices remain in [LICENSE](../../mstack/LICENSE). Big-pics-little-words remains independently worded guidance from a source without a declared license, not vendored MIT material. Older `PROVENANCE.md` section links in this record are historical revision evidence, not live dependencies. Approval: user directive on 2026-10-21 to treat the skill as owned work plus full delete option.

### D45: Promote views catalog to cross-cutting

Accepted 2026-10-21. Move the views catalog from `mstack/playbooks/tour/references/views.md` to `mstack/references/visual-components.md` as shared component guidance for tour, planning, show-me, and future visual consumers. Generalize catalog wording from stops to sections and cover proposal labeling alongside pinned revisions; starting component set and legend are unchanged. The catalog has since grown with responsibility tree, pseudocode, layout tree and file-layout diff, deliverable matrix, config map, UI component tree and component diff, control-flow diff, and screenshot reference, with show-me trimmed to reuse it. Tour structure, pinning, chapter ownership, delivery, and read-only rules stay in the Tour playbook. Planning sketch and spec link the shared catalog and label views as proposed. This partially supersedes the owned-catalog outcome in [D43](#d43-add-a-tour-playbook-for-shared-visual-walkthroughs). Approval: user directive yes to the promotion in the 2026-10-21 session.

### D46: Retire integrated-source audit

Accepted 2026-10-21. Delete `docs/mstack/SOURCE-AUDIT.md`. The per-source retained/missing inventory and batch evaluation evidence are no longer maintained; `DECISIONS.md` remains the durable record of accepted behavior and the upstream-differences summary above remains the boundary for future work. Approval: user directive `i don't want it` on 2026-10-21.

### D47: Keep the entry contract separate from procedures

Accepted 2026-10-20. Keep shared rules in `SKILL.md` focused on scope, approval, delivery authority, and evidence-backed completion. Replace procedural summaries with conditional routes to planning, coding standards, orchestration, verification, and cleanup. Principle selection and host selection are peer routing sections; question-tool policy sits with host selection. Remove generic response-style advice already supplied by the host or task procedures. This supersedes D03's shared-rule organization, preserving approval and delivery boundaries, mandatory cleanup, selective delegation and its failure handling, and D08's material principle citations. Approval: the user accepted the structural review and directed `i like this. implement it` in this session. The aim is one owner for procedural detail rather than several abbreviated versions.

The separate procedural-table organization is superseded by [D48](#d48-remove-duplicate-entry-routers); the compact shared contract remains accepted.

### D48: Remove duplicate entry routers

Accepted 2026-10-20. Route PR requests directly from the main playbook table to the Pull requests playbook, whose sections own operation selection. Remove the Supporting procedures table introduced by D47. Keep necessary planning, standards, verification, and orchestration links beside the applicable contract or host guidance; publication procedures already invoke cleanup. This supersedes D03's entry-level PR intent routing and D47's separate procedural table, preserving the independent PR intents of D06 and mandatory cleanup of D09. Approval: user requested addressing annotations 1 and 2 in Plannotator review `pn-56c515`, questioning the repeated PR playbook and second router.

### D49: Place orientation before routing

Accepted 2026-10-20. Move the playbook/principle/role explanation and unmatched-request fallback before the playbook table. Place the orchestration pointer beside roles rather than under Host selection, superseding that placement in D48. Remove the Plannotator/Inbox recommendation from `SKILL.md`, partially superseding D12; task-specific procedures and host adapters are outside this edit. Approval: annotations 1 through 3 in Plannotator review `pn-4e2169`, including the explicit request to remove the recommendation from this file. This keeps orientation ahead of selection and separates orchestration policy from host mechanics.

### D50: Tighten the entry introduction

Accepted 2026-10-20. Replace the expanded introduction with four short paragraphs covering playbook selection and conditional loading, completion checklists and unmatched requests, orchestration, and missing-entry handling. Remove repeated identity, terminology, and scope exposition; the shared contract and glossary retain those responsibilities. This refines D49's orientation wording without changing its placement. Approval: the user directed `do that` after reviewing the exact proposed introduction.

### D51: Tighten host selection

Accepted 2026-10-20. Keep host selection focused on identifying the host from available tools, reading its adapter, and using structured questions with conversational fallback. Remove generic tooling advice, shared-policy exposition, and execution-machine detail from the entry. Approval: the user directed `do that` after reviewing the exact proposed Host selection section. Adapter links and D12's question-tool policy remain intact.

### D52: Remove the checklist scope qualifier

Accepted 2026-10-20. Remove `For substantial work,` from the entry's checklist instruction, making it unconditional. This supersedes D50's retained substantial-work qualifier. Approval: explicit removal requested in annotation 1 of Plannotator review `pn-91de4b`.

## Upstream differences that are not new commitments

The original adaptation condensed the upstream principle set and omitted full Orchestrate and Autopilot protocols and dedicated worktree and simulator-cleanup workflows. Those are observed coverage differences, not prohibitions or promises to port them later. Review upstream additions against the decisions above instead of treating parity as the acceptance criterion. Arena is explicitly deferred.

## Validation and cutover snapshot

2026-10-20, D47 working-tree review: bundle validation (`bun tooling/mstack/validate.ts`, one skill and 97 Markdown files), full bundle/docs Prettier check, and `git diff --check` passed. Direct before/after route inspection covered read-only investigation, previously approved implementation, optional versus required delegation failure, and publication cleanup. Those paths retain their authority and stopping conditions through the shared contract and linked owners; this is source inspection, not an independent behavioral run. Changed section anchors were inspected and no Markdown callers of removed headings were found. The external skill-creator validator could not run because its Python environment lacks `yaml`. Live workflow evaluation was not run.

As of 2026-10-15, baseline commit `f26c267`, bundle validation, formatting, script typechecking, and tests passed for publication. Discovery found exactly one mstack entry in the OpenCode registry and Pi RPC. That establishes discovery, not live delegation or workflow behavior.

Known gaps, dated 2026-10-15 unless a later decision records new evidence:

- Live background delegation and watcher lifecycle remain untested.
- Verification-skill creation and maintenance have not been exercised against a real app.
- Required-check knowledge was unavailable for PR 2 at that head. This is not evidence of passing CI.
- Installation, global configuration cutover, and workflow-tools removal had not occurred.
- Live host discovery, real PR delivery, Pi delegation, failure recovery, restart persistence, and production evidence remain untested across later batches.

Future verification should update this section with its date, target revision, commands and evidence, and remaining limits. No follow-up above is automatically authorized by this snapshot.
