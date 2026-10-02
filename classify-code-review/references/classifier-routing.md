# Classifier routing

Use the named definitions from the `opencode-plugins` SDLC catalog. The catalog may not yet be merged or enabled in a given session; discover configured names from the tool instead of assuming availability. Every definition below has `evidence_sufficient` as a noul question. Supply real bounded evidence; paths/URLs in ordinary JSON are inert unless wrapped as explicit evidence references.

## Code-review calls

| Classifier | Evidence | Relevant answers and investigation |
| --- | --- | --- |
| `change-risk` | Scoped diff and new files | `behavior_change`, `security_sensitive`, `data_risk`, `concurrency_risk`, `needs_deeper_review`: inspect flagged failure modes. |
| `review-routing` | Same bounded change evidence | `security_review`, `database_review`, `api_review`, `concurrency_review`, `frontend_review`, `billing_review`: add relevant review lenses; do not automatically spawn six agents. |
| `scope-discipline` | Original task/acceptance criteria/constraints plus diff | `scope_expansion`, `premature_abstraction`, `unnecessary_indirection`, `unrelated_cleanup`, `needs_deeper_review`: verify task support and existing conventions. Skip without task evidence. |
| `test-file-quality` | One complete changed test file | Scores: `assertion_strength`, `behavior_focus`, `scenario_variety`. Concerns: `over_mocking`, `redundancy`, `needs_deeper_review`. Inspect concrete weaknesses; valid delegation/ordering contracts can use mocks. |
| `change-kind` | Diff plus stated purpose when available | Choice `kind`; flags `behavior_change`, `mixed_intent`, `needs_deeper_review`. Use only when purpose/routing is unclear. |
| `api-compatibility` | Before/after public schema/interface, supported-client expectations | `breaking_structure`, `semantic_change`, `client_migration_required`, `needs_deeper_review`: check supported consumers and compatibility. Keep deterministic API-diff checks. |
| `migration-risk` | Migration files plus known engine/version, scale, deployment order, recovery plan | `destructive_change`, `execution_hazard`, `backfill_required`, `recovery_difficult`, `needs_deeper_review`: verify engine-specific hazards. Do not invent version, row count, or lock duration. Missing execution context is a gap, not proof of safe execution. |
| `observability-review` | Changed operation/error paths; known shared instrumentation conventions | `important_operation`, `silent_failure`, `instrumentation_gap`, `sensitive_telemetry`, `needs_deeper_review`: verify error context and shared wrappers before claiming missing telemetry. |
| `dependency-update` | Explicit old/new versions, versioning scheme, supplied release notes/advisories, manifest diff | Choice `update_kind`; flags `security_fix`, `runtime_change`, `migration_likely`, `needs_deeper_review`. Obtain relevant notes through authorized tooling if needed; embedded URLs are not fetched. Absence of a security-fix flag says nothing about vulnerability absence. |
| `generated-code-review` | Generator/version/command provenance, changed inputs, generated diff | `source_alignment` is positive; concerns are `manual_edit_signal`, `unexpected_behavior`, `needs_deeper_review`. Prefer deterministic regeneration comparison where available. Generated markers alone do not establish provenance. |

Add expertise to your own investigation by default. Delegate only when the user, project instructions, or host workflow explicitly calls for it; check available agent capabilities rather than inventing reviewer names.

## Other SDLC artifacts

Use these only when the review request includes the corresponding artifact or decision. Do not expand an ordinary code review into incident handling, specification rewriting, or release authorization.

| Classifier | Evidence | Main outputs |
| --- | --- | --- |
| `issue-triage` | Issue title/body, observations, reproduction and expected/actual outcomes | Choice `kind`; `reproduction_gap`, `urgent_impact`, `needs_clarification`. Do not infer duplicates without candidate issues. |
| `spec-readiness` | Supplied spec and acceptance criteria | Score `acceptance_clarity`; `behavior_ambiguity`, `unresolved_decisions`, `failure_behavior_gap`, `needs_clarification`. Clarify material contract gaps; do not demand a heavyweight template. |
| `task-decomposition` | Task and known project constraints | Choice `scope`; `independent_outcomes`, `blocking_unknowns`, `needs_decomposition`. Treat this as planning advice rather than decomposing every review. |
| `release-gating` | Exact candidate summary/diff, required policy, CI/validation and recovery evidence | `validation_gap`, `staged_rollout_value`, `manual_qa_value`, `recovery_gap`, `needs_deeper_review`. Existing policy and failing checks remain authoritative. |
| `incident-triage` | Timestamped observations, current time, supplied signatures/runbooks if available | Choice `status`; score `impact`; `actionable`, `novel_failure`, `needs_deeper_review`. Do not claim current status from stale logs or known/novel classification without comparisons. |
| `postmortem-quality` | Supplied postmortem, causal observations, action items/accountability | Scores `causal_support`, `action_specificity`; `impact_timeline_gap`, `causal_action_gap`, `needs_deeper_review`. Report evidence/remediation gaps without inventing incident facts. |

## Evidence request example

For a branch review whose working tree is the requested target, substitute the resolved merge-base SHA and literal changed paths:

```json
{
  "classifier": "scope-discipline",
  "state": {
    "type": "evidence",
    "text": {
      "task": "Add an endpoint returning the current authenticated user.",
      "constraints": ["Use the existing router and authentication middleware."]
    },
    "diffs": [{ "base": "RESOLVED_MERGE_BASE_SHA", "paths": ["internal/http/current_user.go"] }],
    "files": ["internal/http/current_user_test.go"]
  }
}
```

Include new untracked files through `files`; include tracked modifications through `diffs`. For an exact revision range not matching the working tree, substitute `files: ["/absolute/path/to/generated-review.patch"]` for `diffs`. Keep the patch generation outside the coding model's context; read source at the requested target when investigating. The placeholder above must be replaced by an actual Git SHA before invoking the tool.

Stay within the expanded request budget (1 MiB) and the configured model's tighter context limits. On an oversized request, narrow by coherent file/module groups and preserve a manifest of reviewed groups; do not silently omit hunks or split a test file into misleading fragments. Fall back to source review for a test file that cannot fit. Reclassify only when added evidence can resolve a named uncertainty, not simply to obtain a more reassuring probability.
