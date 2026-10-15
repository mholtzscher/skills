# Provenance and adaptations

Mstack is an independently maintained adaptation, not an upstream compatibility layer. Source material was inspected and personalized on 2026-10-14. All included source licenses are MIT; notices are preserved in [LICENSE](LICENSE).

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

[The playbook](playbooks/show-me.md) retains all ten worked examples, view-selection guidance, and HTML styling/responsiveness instructions. Differences from the source are limited to replacing skill frontmatter with a playbook title, adapting `Bash(open …)` to available host preview/file-opening tools with an unavailable-tool fallback, and formatter-added semicolons in the TypeScript example. Source attribution lives here and in [LICENSE](LICENSE), outside the agent-facing procedure. See [D16](DECISIONS.md#d16-restore-show-me-source-fidelity).

## Spec-planner source fidelity

On 2026-10-15, the condensed full-spec section was replaced with the complete workflow from this repository's `spec-planner/SKILL.md` at `57f95bb94e4abaf6206f97188497958a7e81a1bc` (latest source-specific commit `f06103f0dca1dbe5bdc3001ca2e5af53f40d9d34`). The inspected source body and all four references are byte-identical to that baseline. Source body SHA-256: `8bfc676527065fc74e1fc29344a7f4ea4afc5ff6851a1aa896824cbeacf3f148`.

[Full-spec planning](playbooks/planning.md#full-spec) retains the philosophy, phase diagram/reporting, clarification example and rules, discovery, concrete implementation contract, completeness checks, effort estimates, scope-control examples, and handoff. [Templates](references/planning/templates.md), [decision frameworks](references/planning/decision-frameworks.md), [estimation](references/planning/estimation.md), and [technical debt](references/planning/technical-debt.md) are restored in full, with Markdown formatting only. The former condensed `spec-format.md` and `decisions.md` are retired. The distinct domain-record summary was preserved here and subsequently replaced by the full domain-modeling formats under D18.

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

- All three use plain playbook titles instead of skill frontmatter, bundle-relative links, and Markdown formatting. Attribution stays here and in [LICENSE](LICENSE).
- [Show complexity](playbooks/show-complexity.md) retains the complete source body, including the five-view table and worked “Save order” comparison. Its only content additions are the local show-me link and an explicit link to mstack's sketch/spec approval before implementation.
- [Grilling](playbooks/grilling.md) preserves the entire design-tree, whole-frontier, recommendation, recomputation, fact/decision distinction, and completion contract. Host questions are primary; the original numbered text example is the conversational fallback. Tool-sized batches cover one logical frontier. Direct lookup or selective bounded delegation replaces compulsory sub-agent research. Existing context/answer reuse, edge-case probing, confirmation summary, pause reporting, and the non-implementing full-spec handoff remain mstack additions.
- [Domain modeling](playbooks/domain-modeling.md) retains the full body with `skill` changed to `playbook`, relocated format links, and the existing mstack guidance for host questions, prior answers, reading the context map/glossary, read-only scope, repository conventions, and accurate decision status.
- [Glossary format](references/planning/GLOSSARY-FORMAT.md) and [ADR format](references/planning/ADR-FORMAT.md) retain their full content. Changes are Markdown formatting and `skill` → `playbook` in the glossary reference. The condensed `domain-records.md` is retired; planning now routes to domain modeling. The richer spec-planner ADR template remains a separate planning resource.

## Orchestration and explanation source fidelity

[D19](DECISIONS.md#d19-restore-orchestration-and-explanation-evidence), accepted 2026-10-15, restores orchestration, How/Why evidence workflows, and the explicit PR incomplete-review stop rule.

### Orchestration

The source is `agent-orchestrator/SKILL.md` at repository revision `57f95bb94e4abaf6206f97188497958a7e81a1bc`, SHA-256 `e51311bd135792636543350e49c8363573f6653da3ddc17df3cc5ff5e32f8da5`. [Orchestration](references/orchestration.md) restores all five logical roles, the full invoice-explorer brief, milestone/dependency ownership, shared-state intermediate-failure guidance, public-boundary verification examples, handoff acceptance, escalation, and completion criteria.

Adaptations replace skill discovery and fixed OpenCode syntax with a plain reference and the existing host adapters. Delegation, independent testing, and review remain selective; one writer owns coupled implementation. Optional unavailable delegation permits disclosed sound direct work, while explicitly required independence, diversity, parallel execution, or runtime capabilities remain unmet until satisfied or revised. Existing mstack guidance retains host-owned models, actual schema discovery, approved sketch/spec scope, parent-owned publication, richer dispatch/handoff evidence, isolated writers, and unknown-child-liveness handling. Attribution stays in maintenance/license files. All other substantive source guidance and the complete worked example are retained.

### How and Why

The source bodies and all fourteen reference files come from workflow-tools `pstack/upstream/skills/{how,why}/` at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. All sixteen inspected files match that snapshot. Source-body SHA-256 values: How `47cfe3e6fe55c49c3bdf8ad1b645dcd5fece8f0c36fd22d2e7221f9faa71f648`; Why `24e6ce55ed4a1cbc18f78ab87e10fcede635949f3b60a2a9a4002e3fe00f890b`. This is the pinned host-adapted pstack snapshot, not asserted byte-identical to raw Cursor upstream.

[How](playbooks/explanation.md#how) and [Why](playbooks/explanation.md#why) retain their complete research, handoff, synthesis, and presentation guidance. The How explorer/explainer references and all twelve Why references are restored under `references/explanation/`, including the eight source-specific playbooks. Teach remains unchanged.

Adaptations:

- Skill metadata and headings become named sections behind mstack's single entry. Links point into the installed bundle; reference routing is conditional on the current investigation stage and relevant evidence source. Attribution stays in maintenance/license files.
- Fixed model rules, named agents, mandatory explainer/synthesizer dispatch, and exhaustive per-category fanout become selective direct/delegated work through actual host capabilities. Narrow supported questions can finish directly. The same evidence/handoff and output requirements apply to direct research.
- Source discovery does not presume Git, authenticated `gh`, a specific MCP, or an access mode is available. Relevant-source coverage distinguishes searched-empty, inaccessible, intentionally unsearched, and contradictory evidence. Existing history guidance, dates/supersession, citation checks, and read-only scope remain explicit.
- Tool names and calls in source-specific recipes are examples to translate to discovered schemas. Search order, query strategies, evidence fields, and all fifteen fenced query/tool examples are retained. Warehouse table/column conventions require confirmation. Slack authentication changes are outside read-only investigation; Sentry Seer guidance permits reading existing analysis, with separate authority needed to launch a new stateful analysis.
- Epistemics changes are formatting-only. Other reference changes adapt host/source access and selective research, repair local links and the synthesizer's placeholder citation URL, and apply Markdown formatting. The complete confidence, contradiction, negative-result, handoff, and answer structures remain.

### PR incomplete-review stop

The source rule is `PR_DIFF_REVIEW_INSTRUCTIONS` in workflow-tools `pr/metadata-prompts.ts`, shared by `pr/publication-prompts.ts`, at `3f83b1d5b6b7e82adf7639148403083b4ccb4a8d`. Inspected files are byte-identical to that revision; their SHA-256 values are `cacadec01280ea859b98f9192264da57d9f2e9a4647dcd31618e766b22fd25a9` and `6e44d96100af64beb629bfc85b2b4d0383d125ab0fef9e24a29e158066f679cb`, respectively.

[Publication](playbooks/pull-requests.md#publish) now explicitly stops before commits, pushes, or PR writes if scoped diff review is incomplete. [Metadata rewriting](playbooks/pull-requests.md#rewrite-metadata) stops before title/body edits if its PR diff review is incomplete. Each reports the unreviewed scope. This translates the source's “stop before publishing” into each selected operation's mutation boundary; other PR permissions and behavior are preserved.

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

[Review and blast radius](playbooks/review.md) restore the complete procedures and all four review references under `references/review/`. Adaptations preserve mstack's established permissions and the user's explicit evidence-led structural-review choice:

- Plain sections and bundle-local references replace standalone discovery metadata. Attribution remains here and in [LICENSE](LICENSE). The ordinary review route remains available; callers select review or blast-radius scope rather than automatically running both.
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

The [benchmark checklist](references/performance/benchmark-checklist.md) retains all seven questions, preflight, requested-ballpark exception, tuning/adoption caveat, physical-limit arithmetic, independent profiling, repeated interleaved comparisons, errors/work/output checks, end-to-end context, verdict rules, and the reporting example. [Hillclimb](playbooks/performance.md#hillclimb) restores the complete workload/harness/log/hypothesis/loop/plateau/stop/delivery sequence and final report. Its seven ordered performance mantras come from Perf issue step 2; this dependency is retained verbatim. The exact source log schema has **nine** fields: `id, hypothesis, change, before, after, delta, tests, verdict, note`.

Adaptations:

- Standalone discovery metadata becomes plain Markdown with conditional local links. Attribution remains here and in [LICENSE](LICENSE). The main route explicitly includes measurement requests; the measurement principle's existing prose is preserved with only a checklist pointer added.
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

[Refactoring](playbooks/refactoring.md) retains all eight stages, the focused-to-medium scope, feature/bug separation, characterization/snapshot/equivalence choices, original-code pin, target layout/types/call graph, subtraction examples, every-caller migration, rename/string/prose/back-reference checks, real-artifact proof, reader-load acceptance/reversion, ordered green slices, and final report. [Visual parity](playbooks/prototype.md#visual-parity) retains all five stages, pre-migration state baselines, immutable harness/evidence, suspicious-baseline stop, shared-primitives-first order, component ownership, matching-surface image comparison, active-session iteration/scheduler limits, delivery, and report. No separate supporting resource files belong to these two source bodies.

Adaptations:

- Use existing plain playbooks and conditional bundle-local links. Source skill/principle names route to the relevant integrated procedures and consolidated principles. Attribution stays here and in [LICENSE](LICENSE). The original prototype paragraph remains byte-for-byte unchanged under its own heading.
- Require sketch/spec approval before writing new pins, harnesses, or product changes; reuse existing approval and adequate executable coverage. The pin must run on the original before structure moves. Typecheck/lint remain insufficient proof; missing tools or unexecuted checks remain explicit gaps.
- Preserve genuine supported external contracts while migrating all internal callers and deleting superseded internal paths in the same wave. Concrete reader-load reduction replaces a literal branch-deletion quota, consistent with D20; branch/invalid-state and subtraction diagnostics remain. Existing caller tracing and show-complexity routing remain available.
- Local planning/exploration and selective host-configured delegation replace `figure-it-out`, mandatory `architect` fanout at every function boundary, fixed `poteto-agent`, and model-sheet setup. Scoped reverts protect unrelated work; ordered commits do not automatically rewrite published or user history.
- The user explicitly selected an agreed visual contract instead of the source's unconditional zero-pixel requirement. Pixel-exact is the default; approved exceptions must be predefined before comparison and reported separately with raw differences. Zero unexplained pixels is required; nonzero raw evidence is never labeled pixel-exact. Post-hoc masks, tolerance changes, and baseline overwrites cannot manufacture a pass.
- Frozen-baseline/harness protection remains. Legitimate approved migration reshaping is distinguished from unrelated restructuring to force a diff pass. A bad baseline or missing comparable driver stops the claim and requires clarification; an approved correction or materially revised contract begins a newly identified comparison with old evidence preserved.
- State-matched real screenshots and interaction checks preserve the existing mstack visual contract. Actual browser/terminal/project drivers replace assumed host tooling. Shared primitives have an accepted owner-controlled phase before components; parallel worktrees are selective. Unattended/restart-surviving continuation still requires real scheduling.
- Approved production work follows one ordinary unmerged PR with scoped CI repair and per-component evidence, replacing automatic PRs per component/batch. Baseline-only investigation and disposable prototypes do not authorize production implementation or publication.

## Integrated-source audit

The [2026-10-15 audit](SOURCE-AUDIT.md) maps all selected vendor sources, all 52 pstack skill entries and 23 nested playbooks, the 24-to-14 principle consolidation, supporting resources, and workflow-tools' instruction contracts. Many initial adaptations are substantive summaries rather than faithful copies. The report distinguishes those losses from accepted policy changes and records the D18–D22 restorations; its remaining proposed order is not implementation approval. Pstack comparisons use the pinned workflow-tools snapshot, which includes host adaptations, rather than claiming byte identity to raw Cursor upstream.

## Deliberate changes

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
