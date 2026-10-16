# Provenance and adaptations

Mstack is an independently maintained adaptation, not an upstream compatibility layer. Source material was inspected and personalized on 2026-10-14. All included source licenses are MIT; notices are preserved in [LICENSE](../../mstack/LICENSE).

| Source                                                                                                                                  | Revision/evidence                                                                               | Used for                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lauren Tan's pstack](https://github.com/cursor/plugins/tree/1dcc2bacde73ddd284803b7af28164d0436198fc/pstack)                           | pstack 0.15.21, commit `1dcc2bacde73ddd284803b7af28164d0436198fc`, as bundled in workflow-tools | Workflow structure; explanation, review, performance, continuity, reflection, cleanup, delivery; verification-skill creation/maintenance and feature maps |
| [Cursor Team Kit deslop](https://github.com/cursor/plugins/tree/dbf49813a39c1a5389c5e28cb8e4c1c2379e2454/cursor-team-kit/skills/deslop) | commit `dbf49813a39c1a5389c5e28cb8e4c1c2379e2454`                                               | Code-cleanup specialist                                                                                                                                   |
| [Michael Holtzscher's skills](https://github.com/mholtzscher/skills)                                                                    | parent checkout `57f95bb`                                                                       | Integrated agent-orchestrator; vendored/adapted spec-planner and show-complexity                                                                          |
| [Workflow tools](https://github.com/mholtzscher/opencode-plugins/tree/3f83b1d5b6b7e82adf7639148403083b4ccb4a8d/workflow-tools)          | commit `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`; `pr/` and `specs/`                           | Spec/PR contracts, visual metadata format, check classification, failure-log summarization, evidence collection                                           |
| [HumanLayer show-me](https://github.com/humanlayer/skills/tree/main/plugins/show-me/skills/show-me)                                     | installed 2026-10-11; installer folder hash `362200ac2fb3c17b765049444e88de73767e6d08`          | Vendored/adapted visual explanation specialist                                                                                                            |
| [Matt Pocock grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling)                                     | installed 2026-10-11; installer folder hash `28aceb4c9567b985cb47f7db88cf23c9f33af8b8`          | Vendored/adapted decision-tree interview                                                                                                                  |
| [Matt Pocock domain-modeling](https://github.com/mattpocock/skills/tree/main/skills/engineering/domain-modeling)                        | installed 2026-10-11; installer folder hash `ea30ee454ba264543dbe40737973b1a5afb9f0e6`          | Vendored/adapted domain modeling, glossary and ADR formats                                                                                                |

Installer folder hashes identify installed content, not upstream Git commits. The source skill bodies and required references were adapted into mstack's own files rather than retained as an unmodified vendored subtree.

## Show-me source fidelity

On 2026-10-15, the condensed show-me playbook was replaced with the complete instruction body from [HumanLayer's source at `bba9d13`](https://github.com/humanlayer/skills/blob/bba9d13ab34f0a87f1cc33df4dd196372393ddfc/plugins/show-me/skills/show-me/SKILL.md). That revision is byte-identical to the installed source, SHA-256 `434a2346cc95e313b0d367d477dda2e23ba642dd2181757415a09500664af100`.

[The playbook](../../mstack/playbooks/show-me.md) retains all ten worked examples, view-selection guidance, and HTML styling/responsiveness instructions. Differences from the source are limited to replacing skill frontmatter with a playbook title, adapting `Bash(open …)` to available host preview/file-opening tools with an unavailable-tool fallback, and formatter-added semicolons in the TypeScript example. Source attribution lives here and in [LICENSE](../../mstack/LICENSE), outside the agent-facing procedure. See [D16](DECISIONS.md#d16-restore-show-me-source-fidelity).

## Spec-planner source fidelity

On 2026-10-15, the condensed full-spec section was replaced with the complete workflow from this repository's `spec-planner/SKILL.md` at `57f95bb94e4abaf6206f97188497958a7e81a1bc` (latest source-specific commit `f06103f0dca1dbe5bdc3001ca2e5af53f40d9d34`). The inspected source body and all four references are byte-identical to that baseline. Source body SHA-256: `8bfc676527065fc74e1fc29344a7f4ea4afc5ff6851a1aa896824cbeacf3f148`.

[Full-spec planning](../../mstack/playbooks/planning.md#full-spec) retains the philosophy, phase diagram/reporting, clarification example and rules, discovery, concrete implementation contract, completeness checks, effort estimates, scope-control examples, and handoff. [Templates](../../mstack/references/planning/templates.md), [decision frameworks](../../mstack/references/planning/decision-frameworks.md), [estimation](../../mstack/references/planning/estimation.md), and [technical debt](../../mstack/references/planning/technical-debt.md) are restored in full, with Markdown formatting only. The former condensed `spec-format.md` and `decisions.md` are retired. The distinct domain-record summary was preserved here and subsequently replaced by the full domain-modeling formats under D18.

Adaptations preserve the existing sketch and proposal-only refinement routes, count earlier interview answers, use actual OpenCode/Pi tools with question fallback, honor explicit spec paths, write a reviewable draft before approval, and retain mstack's approval/implementation stopping conditions. Assigned final questions must be non-blocking. Attribution remains here and in the license. The exact adaptation list and remaining source-coverage gaps are in [SOURCE-AUDIT.md](SOURCE-AUDIT.md); approval is recorded in [D17](DECISIONS.md#d17-restore-spec-planner-source-fidelity).

## Three-procedure source fidelity

On 2026-10-15, [D18](DECISIONS.md#d18-restore-the-remaining-selected-vendor-procedures) approved replacing the condensed show-complexity, grilling, and domain-modeling procedures with their complete sources and required formats. The source bodies used for comparison are identified below; SHA-256 values identify the complete source files including frontmatter.

| Source file                          | Revision/evidence                                                               | SHA-256                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| show-complexity `SKILL.md`           | Byte-identical to this repository at `57f95bb94e4abaf6206f97188497958a7e81a1bc` | `08f12a431713bfac354967b0b2dd557e1571750ef81d4a3072a92fab7989c407` |
| grilling `SKILL.md`                  | Installed copy identified by the installer hash above                           | `befdff1e27a1dfe2a294d5871169ac1afe16d983911daa4f32627514a48c1e15` |
| domain-modeling `SKILL.md`           | Installed copy identified by the installer hash above                           | `7b925d7b1e341a2eeae33ad68a8a8c0ab889a38ddd22a7598e4c240e5a7556a3` |
| domain-modeling `GLOSSARY-FORMAT.md` | Same installed source                                                           | `21dcc40cdec8e151a829b98ab1517c1867bc444e3665134a98c6983411996801` |
| domain-modeling `ADR-FORMAT.md`      | Same installed source                                                           | `944c92aa790e8fbdc9199640b170979abb8a34ba8d0fe18c2a01a63bce140ca0` |

Adaptations:

- All three use plain playbook titles instead of skill frontmatter, bundle-relative links, and Markdown formatting. Attribution stays here and in [LICENSE](../../mstack/LICENSE).
- [Show complexity](../../mstack/playbooks/show-complexity.md) retains the complete source body, including the five-view table and worked “Save order” comparison. Its only content additions are the local show-me link and an explicit link to mstack's sketch/spec approval before implementation.
- [Grilling](../../mstack/playbooks/grilling.md) preserves the entire design-tree, whole-frontier, recommendation, recomputation, fact/decision distinction, and completion contract. Host questions are primary; the original numbered text example is the conversational fallback. Tool-sized batches cover one logical frontier. Direct lookup or selective bounded delegation replaces compulsory sub-agent research. Existing context/answer reuse, edge-case probing, confirmation summary, pause reporting, and the non-implementing full-spec handoff remain mstack additions.
- [Domain modeling](../../mstack/playbooks/domain-modeling.md) retains the full body with `skill` changed to `playbook`, relocated format links, and the existing mstack guidance for host questions, prior answers, reading the context map/glossary, read-only scope, repository conventions, and accurate decision status.
- [Glossary format](../../mstack/references/planning/GLOSSARY-FORMAT.md) and [ADR format](../../mstack/references/planning/ADR-FORMAT.md) retain their full content. Changes are Markdown formatting and `skill` → `playbook` in the glossary reference. The condensed `domain-records.md` is retired; planning now routes to domain modeling. The richer spec-planner ADR template remains a separate planning resource.

## Orchestration and explanation source fidelity

[D19](DECISIONS.md#d19-restore-orchestration-and-explanation-evidence), accepted 2026-10-15, restores orchestration, How/Why evidence workflows, and the explicit PR incomplete-review stop rule.

### Orchestration

The source is `agent-orchestrator/SKILL.md` at repository revision `57f95bb94e4abaf6206f97188497958a7e81a1bc`, SHA-256 `e51311bd135792636543350e49c8363573f6653da3ddc17df3cc5ff5e32f8da5`. [Orchestration](../../mstack/references/orchestration.md) restores all five logical roles, the full invoice-explorer brief, milestone/dependency ownership, shared-state intermediate-failure guidance, public-boundary verification examples, handoff acceptance, escalation, and completion criteria.

Adaptations replace skill discovery and fixed OpenCode syntax with a plain reference and the existing host adapters. Delegation, independent testing, and review remain selective; one writer owns coupled implementation. Optional unavailable delegation permits disclosed sound direct work, while explicitly required independence, diversity, parallel execution, or runtime capabilities remain unmet until satisfied or revised. Existing mstack guidance retains host-owned models, actual schema discovery, approved sketch/spec scope, parent-owned publication, richer dispatch/handoff evidence, isolated writers, and unknown-child-liveness handling. Attribution stays in maintenance/license files. All other substantive source guidance and the complete worked example are retained.

### How and Why

The source bodies and all fourteen reference files come from workflow-tools `pstack/upstream/skills/{how,why}/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All sixteen inspected files match that snapshot. Source-body SHA-256 values: How `47cfe3e6fe55c49c3bdf8ad1b645dcd5fece8f0c36fd22d2e7221f9faa71f648`; Why `24e6ce55ed4a1cbc18f78ab87e10fcede635949f3b60a2a9a4002e3fe00f890b`. This is the pinned host-adapted pstack snapshot, not asserted byte-identical to raw Cursor upstream.

[How](../../mstack/playbooks/explanation.md#how) and [Why](../../mstack/playbooks/explanation.md#why) retain their complete research, handoff, synthesis, and presentation guidance. The How explorer/explainer references and all twelve Why references are restored under `references/explanation/`, including the eight source-specific playbooks. Teach was unchanged in D19 and is restored under D23 below.

Adaptations:

- Skill metadata and headings become named sections behind mstack's single entry. Links point into the installed bundle; reference routing is conditional on the current investigation stage and relevant evidence source. Attribution stays in maintenance/license files.
- Fixed model rules, named agents, mandatory explainer/synthesizer dispatch, and exhaustive per-category fanout become selective direct/delegated work through actual host capabilities. Narrow supported questions can finish directly. The same evidence/handoff and output requirements apply to direct research.
- Source discovery does not presume Git, authenticated `gh`, a specific MCP, or an access mode is available. Relevant-source coverage distinguishes searched-empty, inaccessible, intentionally unsearched, and contradictory evidence. Existing history guidance, dates/supersession, citation checks, and read-only scope remain explicit.
- Tool names and calls in source-specific recipes are examples to translate to discovered schemas. Search order, query strategies, evidence fields, and all fifteen fenced query/tool examples are retained. Warehouse table/column conventions require confirmation. Slack authentication changes are outside read-only investigation; Sentry Seer guidance permits reading existing analysis, with separate authority needed to launch a new stateful analysis.
- Epistemics changes are formatting-only. Other reference changes adapt host/source access and selective research, repair local links and the synthesizer's placeholder citation URL, and apply Markdown formatting. The complete confidence, contradiction, negative-result, handoff, and answer structures remain.

### PR incomplete-review stop

The source rule is `PR_DIFF_REVIEW_INSTRUCTIONS` in workflow-tools `pr/metadata-prompts.ts`, shared by `pr/publication-prompts.ts`, at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. Inspected files are byte-identical to that revision; their SHA-256 values are `cacadec01280ea859b98f9192264da57d9f2e9a4647dcd31618e766b22fd25a9` and `6e44d96100af64beb629bfc85b2b4d0383d125ab0fef9e24a29e158066f679cb`, respectively.

[Publication](../../mstack/playbooks/pull-requests.md#publish) now explicitly stops before commits, pushes, or PR writes if scoped diff review is incomplete. [Metadata rewriting](../../mstack/playbooks/pull-requests.md#rewrite-metadata) stops before title/body edits if its PR diff review is incomplete. Each reports the unreviewed scope. This translates the source's “stop before publishing” into each selected operation's mutation boundary; other PR permissions and behavior are preserved.

## Review and blast-radius source fidelity

[D20](DECISIONS.md#d20-restore-review-and-blast-radius-evidence), accepted 2026-10-15, restores Review/interrogate and Blast radius from workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All six inspected source files match that snapshot byte-for-byte. This is the pinned host-adapted pstack snapshot, not a claim of raw Cursor upstream identity.

| Source file                                     | SHA-256                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| interrogate `SKILL.md`                          | `25341c393f515c1e1fa9bce668b7551e9f98c195113a460ff524d3c1f7f50cd9` |
| interrogate `references/reviewer-prompt.md`     | `f6005cc2b535006fca97a96c5bfda49df57312eedf1ffd8d1aaaf3eb33817c25` |
| interrogate `references/rubric.md`              | `0f9c6bdb0b96e26dbde5f6407f417e0c02f54080e7a1268d8994f3c3ec6c5ac0` |
| interrogate `references/code-quality-review.md` | `79162fda183eafd40d51661fbb5e151c7ba250f89e506ba17f5bd135dcbd50a8` |
| interrogate `references/lead-judgment.md`       | `6e5bdf5670eb34017692e9b6c546f36ac7552e6bb9f3f2f3429164fcc46a9361` |
| blast-radius `SKILL.md`                         | `2e10745b97f5862323dcda3b29ca60d56b5c3c98e37020085d26b48efbe0a436` |

[Review and blast radius](../../mstack/playbooks/review.md) restore the complete procedures and all four review references under `references/review/`. Adaptations preserve mstack's established permissions and the user's explicit evidence-led structural-review choice:

- Plain sections and bundle-local references replace standalone discovery metadata. Attribution remains here and in [LICENSE](../../mstack/LICENSE). The ordinary review route remains available; callers select review or blast-radius scope rather than automatically running both.
- Host-owned models, actual schema discovery, and selective delegation replace fixed models, Cursor model rules, compulsory fanout, and the automatic model-default repair PR. Requested diversity must be real or reported unmet. Attribution distinguishes actual known models from reviewer labels or direct lead findings; agreement is supporting signal, not proof.
- Reviewers remain report-only. Structural suggestions and rubric recommendations propose changes rather than authorizing them. The lead verifies and deduplicates findings, preserves all four verdict buckets, and treats the source's five-item calibration as a noise check rather than a cap on valid findings.
- All structural dimensions and examples remain, including the 1,000-line threshold. The user rejected presumptive blockers based on size or preferred design alone: these prompt investigation, and blockers need concrete maintainability or behavioral evidence tied to the actual goals and cost of change.
- Blast radius retains all five proof levels, dependency/version/local-patch checks, timing/cross-language examples, confirmed/cleared risk separation, and runnable-proof deliverables. Existing scope/approval rules govern execution: new experiment code needs an approved sketch and an isolated disposable target; the lead or an authorized tester executes it, not a report-only reviewer. Missing execution or approval leaves the deciding fact explicitly unproven at the attained level, not silently upgraded from source inspection.
- Mandatory arena dispatch becomes selective authorized independent research; relevant How/Why and prose-cleanup links are local. Findings do not authorize product fixes, external comments, publication, or merging.

## Benchmarking and hillclimbing source fidelity

[D21](DECISIONS.md#d21-restore-benchmarking-and-hillclimbing), accepted 2026-10-15, restores the benchmark checklist and Hillclimb procedure from workflow-tools `pstack/upstream/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. The inspected sources below match that snapshot byte-for-byte. This remains a comparison with the pinned host-adapted snapshot, not raw Cursor upstream identity.

| Source path under `pstack/upstream/`         | SHA-256                                                            |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `skills/benchmark-checklist/SKILL.md`        | `ba109e96c8f6c1c391baccf19e5d11e14370df7b3f2605e1572cd565a6c0fca0` |
| `skills/poteto-mode/playbooks/hillclimb.md`  | `5dd57a846582818b04ed729d20e691dd417e03fbf7bd12f14c5a02c93844309c` |
| `skills/poteto-mode/playbooks/perf-issue.md` | `f511391cb86ce44a29aa426c13c6eaafddaf99321f47eb8a4da2e756ee8682d4` |

The [benchmark checklist](../../mstack/references/performance/benchmark-checklist.md) retains all seven questions, preflight, requested-ballpark exception, tuning/adoption caveat, physical-limit arithmetic, independent profiling, repeated interleaved comparisons, errors/work/output checks, end-to-end context, verdict rules, and the reporting example. [Hillclimb](../../mstack/playbooks/performance.md#hillclimb) restores the complete workload/harness/log/hypothesis/loop/plateau/stop/delivery sequence and final report. Its seven ordered performance mantras come from Perf issue step 2; this dependency is retained verbatim. The exact source log schema has **nine** fields: `id, hypothesis, change, before, after, delta, tests, verdict, note`.

Adaptations:

- Standalone discovery metadata becomes plain Markdown with conditional local links. Attribution remains here and in [LICENSE](../../mstack/LICENSE). The main route explicitly includes measurement requests; the measurement principle's existing prose is preserved with only a checklist pointer added.
- One-off performance and measurement-only routes retain their existing authority. New harness/experimental/product code requires approval, and an approved bounded series covers its in-scope iterations. Actual available tools replace assumed capabilities; neither profiling nor load checks authorize installs, unrelated process termination, or environment changes.
- The source's target/attempt-floor example is labeled an example. Agreed budget, scope, correctness, prerequisite failures, and user stops override the attempt floor; incomplete runs do not become success by relaxing the predicate. Invalidated harnesses pause comparison until an approved revision and comparable baseline are established.
- Selective direct/delegated implementation and host-owned models replace compulsory `poteto-agent`, model-sheet setup, and automatic fanout. Concurrent writers remain isolated and shared measurements control contention. Actual scheduling is required for unattended/restart-surviving work, not ordinary active-session iteration.
- The missing decision-log helper is replaced by the full local TSV contract. Use existing ignored storage or an outside-tree path without silently editing ignore/config files. Read the log before each attempt. Revert only owned attempt changes; preserve accepted wins and unrelated work.
- Keep/revert explicitly reconciles the source's two rules: genuine improvements must exceed noise and pass correctness gates; a correctness-preserving simplification may hold the metric without measurable regression and is labeled simplification, not speedup. Raw errors/work/output evidence matters, not merely printed counters.
- Approved production improvements finish as one ordinary unmerged PR with scoped required-CI repair, replacing automatic stacked PRs. Measurement-only work ends with evidence; the one-primary-number PR rule preserves detailed run receipts in an authorized artifact.

## Refactoring and visual-parity source fidelity

[D22](DECISIONS.md#d22-restore-refactoring-proof-and-visual-parity-baselines), accepted 2026-10-15, restores both complete procedures from workflow-tools `pstack/upstream/skills/poteto-mode/playbooks/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. Both inspected files match that pinned host-adapted snapshot byte-for-byte, without claiming raw Cursor upstream identity.

| Source file        | SHA-256                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `refactoring.md`   | `3fc77b34b37818b3a5ffcfb31892ba0bff5ca39755e98532cbfbe72ebb1a7ce7` |
| `visual-parity.md` | `a97395f76e6e23e737b144747697fc5d2916436ac568b5bff48105db9e47bd6f` |

[Refactoring](../../mstack/playbooks/refactoring.md) retains all eight stages, the focused-to-medium scope, feature/bug separation, characterization/snapshot/equivalence choices, original-code pin, target layout/types/call graph, subtraction examples, every-caller migration, rename/string/prose/back-reference checks, real-artifact proof, reader-load acceptance/reversion, ordered green slices, and final report. [Visual parity](../../mstack/playbooks/prototype.md#visual-parity) retains all five stages, pre-migration state baselines, immutable harness/evidence, suspicious-baseline stop, shared-primitives-first order, component ownership, matching-surface image comparison, active-session iteration/scheduler limits, delivery, and report. No separate supporting resource files belong to these two source bodies.

Adaptations:

- Use existing plain playbooks and conditional bundle-local links. Source skill/principle names route to the relevant integrated procedures and consolidated principles. Attribution stays here and in [LICENSE](../../mstack/LICENSE). The original prototype paragraph remains byte-for-byte unchanged under its own heading.
- Require sketch/spec approval before writing new pins, harnesses, or product changes; reuse existing approval and adequate executable coverage. The pin must run on the original before structure moves. Typecheck/lint remain insufficient proof; missing tools or unexecuted checks remain explicit gaps.
- Preserve genuine supported external contracts while migrating all internal callers and deleting superseded internal paths in the same wave. Concrete reader-load reduction replaces a literal branch-deletion quota, consistent with D20; branch/invalid-state and subtraction diagnostics remain. Existing caller tracing and show-complexity routing remain available.
- Local planning/exploration and selective host-configured delegation replace `figure-it-out`, mandatory `architect` fanout at every function boundary, fixed `poteto-agent`, and model-sheet setup. Scoped reverts protect unrelated work; ordered commits do not automatically rewrite published or user history.
- The user explicitly selected an agreed visual contract instead of the source's unconditional zero-pixel requirement. Pixel-exact is the default; approved exceptions must be predefined before comparison and reported separately with raw differences. Zero unexplained pixels is required; nonzero raw evidence is never labeled pixel-exact. Post-hoc masks, tolerance changes, and baseline overwrites cannot manufacture a pass.
- Frozen-baseline/harness protection remains. Legitimate approved migration reshaping is distinguished from unrelated restructuring to force a diff pass. A bad baseline or missing comparable driver stops the claim and requires clarification; an approved correction or materially revised contract begins a newly identified comparison with old evidence preserved.
- State-matched real screenshots and interaction checks preserve the existing mstack visual contract. Actual browser/terminal/project drivers replace assumed host tooling. Shared primitives have an accepted owner-controlled phase before components; parallel worktrees are selective. Unattended/restart-surviving continuation still requires real scheduling.
- Approved production work follows one ordinary unmerged PR with scoped CI repair and per-component evidence, replacing automatic PRs per component/batch. Baseline-only investigation and disposable prototypes do not authorize production implementation or publication.

## Teach, Catch-up, and Recall source fidelity

[D23](DECISIONS.md#d23-restore-teach-catch-up-and-recall), accepted 2026-10-15, restores the complete bodies from workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All four inspected files below match that snapshot byte-for-byte. The comparison is against the host-adapted snapshot, not asserted raw Cursor upstream identity. The three restored source directories contain no supporting reference subtree.

| Source file        | SHA-256                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `teach/SKILL.md`   | `bd286e5a6290673be2cd28aef7af2ec7f1fb138e6bce156ea657368c7e7fc8a4` |
| `ketchup/SKILL.md` | `3b00c552fdb236ecfce85184000814bf62d7c518aac3acd1ba7ea8e02d8f2196` |
| `recall/SKILL.md`  | `d265b0e5b6dc5b89c0407f3387d24462c988e1990a37d5359735137908128c5a` |
| `bro/SKILL.md`     | `aa329d0ceeeecb6822a7174ad76bb07a7826a3c52ceb6a588dec4138815084bb` |

[Teach](../../mstack/playbooks/explanation.md#teach) restores all five steps, conversational/one-shot pacing, the A→B→C progressive-redraw example, spatial whiteboard-image recipe, virtualization density example, sentence-level style, and explanation-only reply. [Catch up](../../mstack/playbooks/continuity.md#catch-up) restores the real-user cutoff, live-state checks, older unresolved decisions, exact action count, self-owned work distinction, executive summaries with consequences, and before/after or options visuals. [Recall](../../mstack/playbooks/continuity.md#recall) restores scope/default window, timestamp-based retrieval, per-chat evidence schema, named-target shared-record sweep, live/full-transcript verification, capsule/thread/problem limits, source citations, and one next move. How/Why, Pickup/Pause, and both file preambles remain byte-identical to the prior bundle.

Adaptations:

- Keep the existing named sections and anchors behind one entry. Local How/Why and prose-cleanup procedures replace standalone skill invocation; Bro supplies Catch-up's plain-language voice with its restating step explicitly excluded, not a newly vendored workflow. Attribution remains here and in [LICENSE](../../mstack/LICENSE).
- Actual host history tools/paths and update timestamps replace Cursor transcript directories and `ls -t` assumptions. Explicit seven-day/project/topic scoping, no silent truncation of “all,” exclusion of current/child/test noise, user-versus-assistant evidence, and privacy remain mandatory. Supplied capsules skip transcript mining while relevant state and evidence gaps are reconciled.
- Selective direct or bounded delegated investigation with host-owned models replaces compulsory parallel How/Why invocation, cheap-model transcript fanout, and one investigator per source. Narrow Why coverage and adequate evidence reuse preserve confidence, source categories, and inaccessible/empty/unsearched distinctions. Named targets still require shared-record investigation, including “my work on X.”
- Teaching remains read-only. Available authorized drawing/image tools retain the spatial recipe; unavailable generation is disclosed with inline-diagram or authorized show-me fallback. New code/HTML artifacts follow approval rules. Filler-hedge cleanup explicitly preserves evidence-based uncertainty; the source's concrete examples and sentence rules remain.
- Catch-up uses the actual last human message or requested checkpoint. Current PR/CI/agent checks use available read-only capabilities, with last-known state and unverified liveness distinguished. Existing evidence can produce inline reply visuals; absent screenshots cannot be invented or captured by starting an app/job, and project/executable artifacts need separate authority.
- Recall preserves all six source status tags and adds honest unverified/actual-state alternatives where the original list cannot describe the evidence. Recorded tool failures outrank assistant success summaries. A recalled plan, command, or preference does not grant implementation, publication, or workflow-editing authority.

## Prose cleanup and reflection source fidelity

[D24](DECISIONS.md#d24-restore-prose-cleanup-and-reflection), accepted 2026-10-15, restores prose cleanup and Reflection from workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All six inspected files match that pinned host-adapted snapshot. This does not assert identity with raw Cursor upstream.

| Source file                                | SHA-256                                                            |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `unslop/SKILL.md`                          | `ccab208e315ce05e2fab8eeee2f7879f1289b5c6844840b2d307adf31c79144f` |
| `reflect/SKILL.md`                         | `f5e9200f37e2a4567c0eeb0ba244fde66c1b3f35e3b7a883de2f85b3bda7365a` |
| `reflect/references/judgment-reviewer.md`  | `89725b1a9ca1b9f94cd111f923f00ef3e03a182fc860206878b39f27bc6feca0` |
| `reflect/references/tooling-reviewer.md`   | `6931ebc536c4bf9e459a2e9cf08d41c273836bb1ae995f4b16d78425383896a6` |
| `reflect/references/divergent-reviewer.md` | `f1ce9c49b5f8c49af8ef47ffe7f9afe28bbc6dc78a27895af6da1b9a1f6ebddb` |
| `reflect/references/synthesizer.md`        | `6af816963de74d1a1aef4070273c1ff533d2072732e488e159ddc0b299fec3cd` |

[Prose cleanup](../../mstack/playbooks/cleanup.md#prose-cleanup) requires the full [pattern catalog](../../mstack/references/cleanup/prose-patterns.md). It restores all 28 entries with their stable rule IDs, gaps, categories, concrete examples, and fixes. The user selected strict source style for editable prose. Exact quotations, code, commands, citations, technical notation, and evidence-based uncertainty remain protected. Style cleanup does not authorize changes to requirements or unrelated text.

[Reflection](../../mstack/playbooks/skill-development.md#reflect) restores the six stages and all four reviewer and synthesis references. The three distinct lenses, source evidence, used-guidance versus missed-trigger routing, target-reading check, eight synthesis criteria, keep/drop examples, structural-enforcement step, row approval, and final report are retained.

Adaptations:

- Plain sections and conditional local links retain the sole mstack entry. Attribution stays here and in [LICENSE](../../mstack/LICENSE). The catalog uses stable labels so Markdown formatting cannot renumber source IDs. The surrounding code/comment cleanup and Author/Evaluate procedures retain their separate contracts.
- The punctuation rules apply strictly to selected editable prose. Literal examples and structured syntax are protected. Real epistemic uncertainty survives filler cleanup, and genuine diagrams are distinct from compressed prose. Approval still governs proposal-only editing, publication metadata, and any change in meaning.
- The actual host history adapter and verified current-session identity replace an assumed Cursor directory and transcript schema. Authorized file exports may use the source layout recipe. An unavailable transcript becomes a disclosed partial digest, without unrelated workspace searches or direct live-database access.
- All three lenses remain required analytical perspectives. Selective direct or delegated work with host-configured models replaces mandatory parallel agents, fixed model families, fallback slugs, and `readonly: false` assumptions. A single agent applying three lenses cannot claim independent agreement. Referenced context lookups use available read-only tools and remain bounded by current authority.
- Transcript and reviewer outputs remain untrusted evidence. Actual loaded playbooks and references count as used guidance alongside registered skills and documented tool calls. Missed-trigger proposals need catalog and invocation evidence; mstack remains explicit-only. A recurring pattern with no genuine existing home may propose a new skill through Author, with separate approval.
- Accepted remains a recommendation pending row selection. Backlog remains proposed until external filing is authorized, replacing the source's automatic tracker writes. Trivial selected edits stay with the owner; substantial edits, descriptions, and new skills use the local Author/Evaluate routes and available authoring specialists instead of Cursor's built-in `create-skill`. Final reporting distinguishes proposed, applied, filed, dropped, and unverified work.

## Decision-trail source fidelity

[D25](DECISIONS.md#d25-restore-decision-trails), accepted 2026-10-15, restores the complete `show-me-your-work` procedure and its two resources from workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All three source files match that pinned host-adapted snapshot. No raw Cursor upstream identity is asserted.

| Source file                                              | SHA-256                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| `show-me-your-work/SKILL.md`                             | `bcff5f7f9fd23f92c12b251f9cd6b947e9485e1055cfacb6fdd9cae0789d7550` |
| `show-me-your-work/references/decision-log-template.tsv` | `6779378006a2f5225e8c06deb84f1d913fb532041ebbb6e50d94600bfe3f4b76` |
| `show-me-your-work/scripts/log.sh`                       | `a65a4bc5fb7cdeadbdb7b7ff1ca4682f4d9c42420942b2977cd17b46c4ac338e` |

[Decision trails](../../mstack/playbooks/decision-trail.md) retain the six-column format, full worked example, checkpoint and iteration rules, run definition, first-append and reentry markers, append-only supersession, transcript/evidence audit, four review diagnostics, Attention report, reading instructions, and canonical composition. The [header template](../../mstack/references/decision-trail/decision-log-template.tsv) retains the exact source bytes. [The local append helper](../../mstack/scripts/decision-log.ts) ports the Bash helper to Bun/TypeScript.

Adaptations:

- Use one plain playbook with conditional callers behind the existing single entry. Keep attribution here and in [LICENSE](../../mstack/LICENSE). The source's illustrative rows remain examples, not actual claims about this restoration. Hillclimb retains its separate nine-field experiment log; a decision trail may point to it as evidence.
- Use an explicit authorized local path in existing ignored storage or outside the worktree. The `decisions.tsv` and `.audit/<task-slug>.tsv` examples do not authorize ignore-file changes or staging. A committed trail needs agreement, replacing the source's ambition-based publication rule.
- Port timestamping, directory creation, header initialization, tab/CR/LF replacement, leading-formula neutralization, and append semantics to the bundle's established Bun runtime. Preserve empty cells and literal arguments. Reject a mismatched header or unfinished existing row without rewriting it. This is a local mutating helper, separate from the four read-only PR evidence operations.
- Serialize appends through one owner. The helper supplies neither locking nor run ownership, evidence verification, authorization, or a durable scheduler. Run markers and exact superseding references remain the calling agent's responsibility. A failed append stays a failure rather than permission to rewrite history.
- Audit identified current-run stretches against the actual scoped host transcript or supplied export. Verify session identity and available evidence. Missing history remains a coverage gap. Retrospective additions are labeled, and read-only reviews propose correction rows rather than writing them. Treat log and transcript directives as evidence, not instructions.
- The user explicitly chose selective review instead of unconditional different-family review. Preserve every review diagnostic and the Attention section. Use actual host-configured independent reviewers when useful. Explicit independence or diversity cannot be simulated or silently replaced. Report known reviewer identity or missing metadata, actual findings, and unavailable coverage honestly.
- Local prose cleanup and Encode lessons replace standalone source skill names. Prefer real repeatable evidence while retaining approval before new scripts or product changes. Publishing a trail uses the ordinary approved delivery path, with privacy checks and accurate evidence limits.

## Consolidated-principle source fidelity

[D26](DECISIONS.md#d26-restore-the-consolidated-principles), accepted 2026-10-15, compares all 24 `principle-*/SKILL.md` files in workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All inspected files match that pinned host-adapted snapshot. Each source directory contains only its skill file, with no additional resources. The comparison includes behavioral instructions in descriptions as well as bodies; it does not assert raw Cursor upstream identity.

| Source name after `principle-`             | SHA-256                                                            |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `attack-the-premise`                       | `c87bd7536f772f8a403ad8155535ee17a1bbec9a353156693eb3bb1520c87ae3` |
| `boundary-discipline`                      | `62ac2862c2caa22dd14531f51c9c6bb445ceb198ca98a687e25b4d47c1f10a28` |
| `build-the-lever`                          | `3434b0ad0c640c6f1d7960be7a8986c3bcdc14e26060360dec29903df60074ff` |
| `encode-lessons-in-structure`              | `228963799189f481827d6f28065f278bc2008ffa37030b1234cbd5814d36b9e9` |
| `exhaust-the-design-space`                 | `2de83d99f93f60ec6313455b0bc9aa9f0bfb93dd59f414f403691322db00d4db` |
| `experience-first`                         | `58903529d733b1c1a7c9ccf127d45ef3c7d0d9f0b81164a4dc6b80efe6f2912b` |
| `explain-the-number`                       | `cd5a25f9e7cf023627ccb470dc5faa97542f29b4319496a32b839a8e1e988047` |
| `fix-root-causes`                          | `ba4cd38da1dcc8fe5432feb64457cba95594736a9b21b2ebf8f8c52aee068707` |
| `foundational-thinking`                    | `864b827e8199d946ce58beca0f89c4ed4099ed6e426fb698a3aaa45de2a9eea2` |
| `guard-the-context-window`                 | `af0b9dd70b43628ce4a59a4d332e9d9ad055084e460f430e7a757495c627e81a` |
| `laziness-protocol`                        | `1be6e7a435f26a75a76eb848b9c3d611b9977d0f5822361753244da25ca3ca45` |
| `make-operations-idempotent`               | `540738217c3da7bf513b9886924ad6a2bc77e58be867f5bd2e1831c74bf2ce70` |
| `migrate-callers-then-delete-legacy-apis`  | `09978915a4a11990cf0a9a02d9c08cc59e0b7a04c5c24b83aa560fbe4146f75b` |
| `minimize-reader-load`                     | `1ea2b7fef2391cae5844c4efdbd59031f775e8a52d06b7495d707229a200dcca` |
| `model-the-domain`                         | `52c0d85e0c3827c41c18299b642657d7b47eaf77b7b31609e42e0df42b84c75f` |
| `never-block-on-the-human`                 | `05030a7a083c337676f793881b4e93cd218e8f1dd676529f56e6ac1d3efb8d1f` |
| `outcome-oriented-execution`               | `10eb91633aa570355ba4bb37088fcade2b22e498df7a58edc749e65bc5a78e2d` |
| `prove-it-works`                           | `ec79a15025bac8d33d62011c54f3b612733fd2a024e623b531b3637aa75070e2` |
| `redesign-from-first-principles`           | `170e0a658783e43fee8ec5a8c2422a4abb8f69cef621dd1819a95910b8207034` |
| `separate-before-serializing-shared-state` | `05294b40448e927c5da1c7b6f5c6b9fed3744637e3833d2d948b9154a9dd00bb` |
| `sequence-verifiable-units`                | `2ccbbacc56ace5afdfb8670cef19d7bd009fb2a0033b9a741cbdf2b6baf72187` |
| `subtract-before-you-add`                  | `8c93bb9d1a7f38e2ef37655d93f0e790fa59903105af3d500cc8a663ebe45f3f` |
| `test-behavior-not-implementation`         | `b2b73ba42920f9c3174ecdf808ec6e4591b3a9266ada9a05814f386004266d3a` |
| `type-system-discipline`                   | `2e492cef34bb25a20b9115df61f9ef3a9837e3fda144ffda8079e5f45a1b72e8` |

The existing [14-principle index](../../mstack/SKILL.md#principles) remains the route. [The per-source inventory](SOURCE-AUDIT.md#principles-all-24-source-leaves) maps restored details to their consolidated homes. Plain headings and local cross-links replace standalone discovery metadata and source names. Existing mstack-specific guidance remains. Source attribution stays here and in [LICENSE](../../mstack/LICENSE).

Adaptations:

- The user selected evidence-driven tool creation rather than the source's compulsory new artifact for every nontrivial task. Preserve hand-unit equivalence, safe reruns, concrete tool choices, deterministic processing before manual fan-out, and a protected delegate recipe. Existing tools can satisfy the need. New tools and enduring artifacts require the applicable scope and delivery authority; audit-trail publication remains D25's explicit agreement.
- The user selected risk-based semantic types rather than branding every differently named primitive. Preserve the concrete illegal-state, sum-type, nonempty-list, time-range, exhaustive-match, authoritative-schema, and total-function examples. A valid duration must satisfy its contract. Brand identifiers when they prevent plausible confusion, and retain plain types where functions are already total. Language-specific examples remain examples, with external specialists used only when available and relevant.
- The user selected declared migration phases. Planned, scoped, reversible breakage may occur inside an explicitly approved isolated phase, with checks retained and a green boundary/final gate. This reconciles the source's outcome-oriented rule with sequential verification. Ordinary delivery remains one PR. Verify the actual baseline rather than automatically rebasing or rewriting history; a red-test/fix story is not permission to publish accidentally failing commits.
- The proceed-first principle remains explicitly rejected under D04. Source diagnostics, code examples, census work, prototypes, instrumentation, sibling fixes, structural enforcement, and artifact publication do not enlarge the selected task's authority. Reuse existing approval where it covers the work.
- Restore the written premise and actor census before another shared-premise fix. Reuse or propose an appropriate census tool under the evidence-driven rule. An even census rules out the observed actor-concentration explanation, not every possible cause. Missing evidence remains a stop before another speculative fix. New-requirement redesign stays distinct from questioning an existing factual premise.
- Root-cause guidance retains restart-state, sibling-pattern, and instrumentation examples. A long comment or defensive check prompts investigation; useful rationale and genuine boundary validation remain. Clearing persistent state requires ownership, preserved evidence, and authority rather than following a heuristic destructively.
- Restore subtraction, time-boxed adapters, obsolete implementation-test removal, interface compression, state-scope hierarchy, and the 30-second reader diagnostic. Existing callers, real compatibility, behavior pins, exact examples, and substantive guidance must be inspected and preserved. File size, line count, and reader time alone do not create blockers. Prompt/reference cleanup follows scoped authority, not implicit permission to delete restored source material.
- Concurrency and idempotency retain the per-actor state-file example, locks, sequential phases, single-writer control, compare-and-swap, live-session adoption, content-equivalent cleanup, PID-based stale-lock checks, scheduling, and crash-point questions. These describe systems being designed, not facilities provided by mstack. Verify actual identity and liveness, including PID-reuse limitations, before recovery; equivalent content alone does not authorize deletion.
- Novel architecture and feel-sensitive product design retain the competing-prototype example without mandatory fan-out or candidate counts. Experience-first retains its concrete UI and core-loop checks. Budgets bound context and active work, without implying a scheduler. Measurement and evaluation guidance retains alternative explanations and trial questions without claiming unavailable model or runtime coverage.
- Restore all weak-test examples, literal/mock-payload repairs, absence/presence pairing, and relation/type-test exceptions as fault-detection diagnostics. Legitimate negative tests and invariant/property checks remain valid. Structural lesson fixes replace redundant instructions only when they enforce the same constraint; judgment-dependent lessons retain prominent guidance and a concrete failure example.

## Architecture and Swarm source fidelity

[D27](DECISIONS.md#d27-restore-architecture-and-swarm-defer-arena), accepted 2026-10-15, restores Architecture and Swarm from workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All five inspected files match that pinned host-adapted snapshot. Architecture has the three references below; Swarm has no additional resource files. No raw Cursor identity is asserted. Arena was read as a dependency, but the user explicitly deferred its restoration.

| Source file                                  | SHA-256                                                            |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `architect/SKILL.md`                         | `31f8e97a52bfa5432edd61f68ade2a8632ef0bacbc2d2a6802d7a0e6821944ac` |
| `architect/references/design-red-flags.md`   | `d0e639e4cc588ec865f930d3a4111faad60987ae36925917e319d7ceca7c69ce` |
| `architect/references/rationale-template.md` | `0cedfccdc7b47fc881febd5a8293eecbc542c20f8df825639904a8102d2eb5d3` |
| `architect/references/runner-prompt.md`      | `21dd5314aab778c5007228027a4591d97693fbec6ab86524037772b63f40948e` |
| `swarm/SKILL.md`                             | `1a4552ebe7de0f58fd6af927b096c21170f2758125710f4318b43cc3102d6f37` |

[Architecture](../../mstack/playbooks/exploration.md#architecture) retains Ground, Sketch, Agree, Implement, and Scrap, with caller usage before types, concrete subsystem grounding, ownership rationale, interface-depth comparison, every repeated-friction signal, and the redesign loop. The [runner prompt](../../mstack/references/exploration/runner-prompt.md), [rationale template](../../mstack/references/exploration/rationale-template.md), and [eight design diagnostics](../../mstack/references/exploration/design-red-flags.md) retain their full substantive content. [Swarm](../../mstack/playbooks/exploration.md#swarm) retains all four phases, partition/race/mixed forms, declared selection rules, exact-SHA and method receipts, `PASS`/`ISSUES`/`BLOCKED`, one replacement for an invalid receipt, explicit gaps, and the consolidated result contract.

Adaptations:

- Keep named sections in the existing playbook, plain references, local links, and one entry. Attribution remains here and in [LICENSE](../../mstack/LICENSE). Arena's existing instruction body stays byte-identical; restoring Architecture does not import Arena's deferred cross-judge or synthesis procedure.
- Use actual host roles and configured models. Direct architecture work and selective independent candidates replace compulsory two-model dispatch, fixed model families, rejected-slug repair, and model-rule files. Requested independence or model diversity remains a real requirement. One direct proposal cannot be relabeled a completed Arena or diverse-model consensus.
- Ground the affected existing system with How and, when ownership or layering changes, Why. Reuse sufficient evidence rather than repeating the investigation. Only genuine greenfield work with no integration context skips grounding. A candidate runner produces its assigned design; reading the parent workflow does not authorize recursive orchestration or implementation.
- Keep concrete usage, types, signatures, module maps, `not implemented` bodies, `// TODO` logic, and rationale. Proposed call sites remain proposed examples rather than invented production observations. Write artifacts only to an authorized target. Product scaffolding, implementation, and publication retain their separate approval and delivery authority.
- Replace optional sign-off and default implementation with mandatory sketch/spec approval. Reuse approval that actually covers the shape. Human pushback and material implementation deviations trigger renewed grounding and a revised proposal. D26 governs approved isolated temporary breakage; a design commit is not permission to publish a broken shared state.
- Preserve all eight red flags and runner checks, including more-than-three-file tracing, as evidence-led diagnostics. Concrete burden and invariants determine a rejection. Preserve supported compatibility and meaningful forwarding boundaries. Enforce private imports and derived-list agreement when actual language/build tools support them; report enforcement gaps rather than treating a naming convention as a compiler guarantee.
- Treat repeated friction as a pattern, not a single difficult edge case. Re-ground what exists, revise around the new constraints, subtract unsupported complexity, and return to Sketch. Scrapping a design means revising the proposal and planning scoped replacement, not deleting unrelated work or resetting history. Smaller size alone is not proof of improvement.
- Swarm uses discovered local or remote capabilities and actual branch/SHA targeting. Unsupported source parameters such as `cloud_base_branch` are not copied into tool calls. Total workers, launch concurrency, remote placement, and model identities remain distinct. Independent write targets and a common immutable brief preserve ownership.
- Declare coverage and race rules before dispatch. Validate the actual terminal receipts against named SHAs and measurement methods. A replacement reruns the bounded assignment rather than editing an invalid receipt into compliance. Retry limits, budgets, prerequisites, and authority govern replacement; a second miss or unavailable replacement is a gap, not a pass.
- Preserve worker completion and liveness evidence. Early race selection does not establish that other workers stopped. Use actual cancellation controls when available and authorized, otherwise collect terminal results or report unresolved workers and incomplete work. Aggregate all supported issues and explicit gaps without pasting raw reports or inventing successful coverage.

## Testing, forensics, and one-off performance source fidelity

[D28](DECISIONS.md#d28-restore-testing-forensics-and-one-off-performance-detail), accepted 2026-10-15, restores five complete sources from workflow-tools `pstack/upstream/skills/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All inspected bytes match that pinned host-adapted snapshot. TDD contains only its skill file; the four nested playbooks have no additional dedicated resources. This comparison includes TDD's description and does not assert raw Cursor identity.

| Source file                                  | SHA-256                                                            |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                               | `eeb868e2dfebee528d730a67d7b17498fac4bb85dec2e38bc5c5176aca4d5d2f` |
| `poteto-mode/playbooks/bug-fix.md`           | `fd3560e77e1ae72d04d5c3df88bd92cdbdffc950d50256b55564cf7893d2c1c9` |
| `poteto-mode/playbooks/runtime-forensics.md` | `594f02c40c243a346e1f57b688ecf2ed5e882f21b3d24ed2204d1ac6f1c24a8a` |
| `poteto-mode/playbooks/trace-forensics.md`   | `e8a671fd5511a894f90c933bca75815e7a1d730cb53333075a80b0927e81acfc` |
| `poteto-mode/playbooks/perf-issue.md`        | `f511391cb86ce44a29aa426c13c6eaafddaf99321f47eb8a4da2e756ee8682d4` |

[Bug fix](../../mstack/playbooks/bug-fix.md) restores reproduction, competing hypotheses, instrumentation-first evidence, runtime mechanism proof, same-boundary verification, and ordered receipts. [Focused regression testing](../../mstack/references/verification.md#focused-regression-testing) restores TDD's activation conditions, six steps, impractical-test alternatives, expectation and flakiness rules, and evidence report. [Runtime and trace forensics](../../mstack/playbooks/forensics.md) restore their distinct complete procedures and concrete CPU, heap, CDP, SQLite, retainer, hot-path, and spindump guidance. [One-off performance](../../mstack/playbooks/performance.md#one-off-performance-issue) restores trace-backed baseline, hypothesis, attempt, comparison, and delivery evidence. The existing performance preamble and entire mantras/Hillclimb/measurement suffix remain byte-identical. Shared verification remains an exact prefix, with regression guidance appended.

Adaptations:

- Use existing plain playbooks and a shared reference behind the sole entry. Attribution remains here and in [LICENSE](../../mstack/LICENSE). Local routes replace standalone skill invocations. No new entry, bundled executable helper, technical specialist, model sheet, or runtime facility is introduced.
- Preserve lead ownership and use direct or selectively delegated execution through actual host tools and models. Cross-function changes prompt ownership and coupling analysis; consequential uncertainty determines Architecture use. Fixed implementation agents, setup requirements, compulsory panels, and unconditional parsing delegates are not restored.
- Drive the matching boundary as far as authorized tools allow before asking the user to reproduce. Trigger synthesis and instrumentation remain real techniques, with approval before new code or stateful experiments. Missing runtime proof leaves an explicit hypothesis or completion gap rather than authorizing speculative fixes or unlimited investigation.
- Retain all TDD conditions, impractical-test reasons, alternatives, and guardrails. New tests require current implementation authority. Explicit TDD requests are not silently waived. Deterministic checks establish the flaky signal where possible; retrying until green does not establish a fix. Broader sibling coverage remains a proposal rather than automatic expansion.
- Preserve failing-before and passing-after commands, revisions, and bounded verbatim output. Rejected hypotheses justify reverting only owned edits. Separate red/green commits are optional within approved isolated phases, not a mandate to publish broken state or rewrite history. Privacy-scoped redaction is disclosed and does not fabricate evidence.
- Retain CDP instrumentation and live code hotfixes as possible mechanism-confirmation experiments. Both require specific bounded, reversible authority. Passive diagnosis does not authorize production changes, persistent logging, installations, process termination, or state deletion. The exact read-only throughput checkpoint applies only to actual read-only work; approved stateful activity receives an honest activity line.
- Preserve fixed original captures and write permitted derivations only to agreed outputs. Query before detailed large-artifact analysis. Existing adequate query representations and tiny artifacts do not require SQLite conversion. New parsers and databases follow D26's evidence-driven tooling and existing analysis-write authority. Preserve timestamps, units, symbols, node/frame identities, and edges through conversion.
- Preserve source attribution and incomplete-symbol gaps. Comparable paired captures can support confirmation, but workload, build, capture settings, intervention, and confounders still matter. An unpaired capture remains the strongest supported hypothesis rather than proof of a product fix.
- Preserve the seven ordered mantras through the existing shared section, the one-off target stop, and per-attempt verification. The complete benchmark checklist governs numbers and comparable repeated runs. Original trace artifacts remain visible, and inconclusive or wrong-boundary results cannot become a winner. PR and final reports cite actual baseline/post-fix values, deltas, identities, and artifact paths.
- Ordinary approved fixes retain one unmerged PR and scoped required-CI repair. Diagnosis and measurement-only work stop with evidence; a referenced fix or Hillclimb route does not authorize starting it. Other source omissions, including Arena, remain separately scoped.

## Integrated-source audit

The [2026-10-15 audit](SOURCE-AUDIT.md) maps all selected vendor sources, all 52 pstack skill entries and 23 nested playbooks, the 24-to-14 principle consolidation, supporting resources, and workflow-tools' instruction contracts. Many initial adaptations were substantive summaries rather than faithful copies. The report distinguishes those losses from accepted policy changes and records the D18 through D28 restorations. Arena is explicitly deferred, and the remaining proposed order is not implementation approval. Pstack comparisons use the pinned workflow-tools snapshot, which includes host adaptations, rather than claiming byte identity to raw Cursor upstream.

## Deliberate changes

- D30 makes runtime reading flow downward from entry to playbooks to supporting material, while retaining useful peer links. Host pointers now reach the adapters directly. Shared rules and task-specific constraints stay in force without parent backlinks. Delegated briefs supply applicable governing instructions, and the Architecture runner reports missing context to its parent. PR visual-format routing moves to the PR playbook; verification-skill routing remains in the entry and skill-development playbook. The original rules, examples, and approval boundaries remain, with the link and caller adaptations recorded in [D30](DECISIONS.md#d30-keep-runtime-reading-flow-downward-and-retain-peer-composition).
- D29 separates the installable `mstack/` runtime from repository-only `docs/mstack/` maintenance records and `tooling/mstack/` development tooling. Historical sources, hashes, and inventories are preserved, with links rebased to their current targets. Help carries the usage and dependency guidance needed without the repository guide. Runtime helper source and bundled license bytes are unchanged.
- Two planning paths, each requiring implementation approval; full specs remain first-class.
- Selective delegation and one writer for coupled implementation, with separate OpenCode/Pi adapters and host-owned models.
- Normal coding delivery publishes one PR and fixes required CI. Stacks and merging are explicit advanced workflows.
- Independently selectable PR intents, agreed-feedback fixes, visual metadata plus verification, and bounded read-only publication watchers.
- Explicit principle citations retained; heavyweight design/delegation triggers made contextual.
- Mandatory code/prose/comment cleanup retained as distinct passes in one playbook. Comment review preserves useful non-obvious rationale and investigates uncertainty instead of defaulting to deletion.
- Verification-skill creation and maintenance share one playbook and retain pstack's worked feature maps, live proof, health checks, owned cleanup, and evidence retention. Generated skills use a shared OpenCode/Pi project path; implementation/corrections require approval, source-reading delegation is selective, and product repairs stay outside maintenance scope.
- One explicit-only `mstack` entry point in a layout both hosts can discover. Requests route to plain Markdown playbooks; former shortcut wrappers are removed. No plugin registration, Cursor mode, model sheet, Graphite dependency, or implied scheduler.
- Bun scripts preserve useful deterministic mechanics with explicit targets and structured evidence. Plugin lifecycle, prompt injection machinery, and strict slash-command spec-path parsing are omitted.

The durable record of these choices is [DECISIONS.md](DECISIONS.md), reconstructed from the user's original approvals and checked against the published bundle. It includes rationale, superseded approaches, validation gaps, and source message references. Earlier September/October 2026 sessions supplied evidence to discuss, not authority to override current choices. Personal transcripts are not shipped with the bundle. Follow [AGENTS.md](AGENTS.md) when maintaining it.
