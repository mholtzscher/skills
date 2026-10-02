---
name: classify-code-review
description: Review local changes, branches, commits, or PRs using the OpenCode classify plugin's SDLC classifiers to route targeted investigation. Use for pre-PR reviews, test-quality checks, compatibility and migration reviews, or checking agent changes for excess scope. Pass file and diff references directly to classify to avoid copying source into the coding model just to classify it; verify flags before reporting findings.
---

# Classify code review

Use bounded classification to choose where deeper reasoning is valuable. Report actionable defects grounded in source and contracts, not model scores. Perform review without modifying the change unless the user asks for fixes.

## 1. Establish the review snapshot

- Read applicable `AGENTS.md` guidance. Identify the requested change, requirements, and review range from the user's request or accessible PR metadata. Do not invent task text from the diff.
- Inspect Git status, changed filenames, and a diff stat before reading source. Include staged, unstaged, untracked, deleted, and renamed paths within the requested scope. Do not stage files just to make evidence work.
- For uncommitted changes, use `HEAD` as the comparison base. For branch review, resolve the merge-base with the intended target branch and use that commit SHA. Discover the target from the request or actual branch/PR metadata; do not assume `main`.
- Honor an explicitly requested commit range. Record the resolved base and target, whether local edits are included, and any excluded changes. Review the snapshot the user requested, not whatever happens to be checked out.

The plugin's `diffs` compares a revision with the **tracked working tree**, including local staged/unstaged edits. It does not support a separate target revision, three-dot semantics, or untracked files. Use that form only when the working tree matches the review target or local edits belong in the review. For another commit/PR snapshot, generate a focused patch file deterministically from the resolved revisions, then pass its path through `files`; use source at that target revision during investigation. Avoid changing the user's checkout. Use temporary materialized files when needed, including for non-Git PR patches, and clean up only files you created.

## 2. Check capabilities and collect bounded evidence

Inspect the available tool description/schema for `classify` and configured classifier names. Do not read the entire config or classifier catalog into context just to discover names. Treat each named classifier as caller-state mode unless its advertised schema says otherwise.

If the tool or a needed classifier is unavailable, state that limitation, skip that classifier, and continue a normal source-based review. Do not silently install plugins, change backend configuration, substitute an ad hoc rubric, or repeatedly retry errors.

Pass paths and revision references to the tool without reading/copying their contents first. Supply task text and material facts in `state.text` only when known. Use actual paths, no globs. Pass untracked new files explicitly through `files`. Keep whole changed test files for `test-file-quality`; skip deleted test files and inspect the removal during ordinary review.

```ts
const output = await tools.classify({
  classifier: "test-file-quality",
  state: {
    type: "evidence",
    files: ["internal/users/service_test.go"],
  },
});
if (!output.ok) {
  return { classifier: "test-file-quality", status: "unavailable", error: output.error };
}
return output.result.answers;
```

Use this structured-object contract; do not `JSON.parse` modern tool output. Check `ok` before accessing answers. Inspect answer discriminants when handling results generically.

## 3. Run the relevant classifiers

Read [classifier-routing.md](references/classifier-routing.md) for exact classifier names, answer IDs, and conditional evidence requirements.

Start with `change-risk` and `review-routing` on the scoped diff, including explicitly referenced new files. Run `scope-discipline` when the original task/requirements are known, and `test-file-quality` once per new or modified test file. Use `change-kind` only when categorizing purpose helps the review. Do not run all 16 classifiers on every change.

Select specialized calls from changed-path metadata, requirements, and routing answers. Obvious migrations, public contract changes, or security-sensitive code deserve relevant inspection even if a routing probability is low. Classify independent evidence independently; batch independent calls only if the host supports it. Make another call for questions depending on earlier answers.

Use these provisional routing rules unless the project supplies calibrated thresholds:

- Treat tool failures, missing/wrong answer types, and incomplete measurements as unavailable assessments, never a clean result. Avoid printing large raw responses; retain pertinent flags and evidence paths.
- Investigate a relevant concern or specialty flag at `noul >= 0.7`. Treat intermediate concern values `0.35 <= noul < 0.7` as uncertain and check focused context. A value below `0.35` suggests no extra classifier-driven investigation, not proven correctness.
- Treat `evidence_sufficient.noul < 0.6` as a material context gap. Add one small, relevant evidence bundle when the missing input is clear; otherwise continue manual review and report the limitation. Do not loop through progressively larger repository dumps.
- Treat `unknown`/`unclear` choices or maximum choice probability below `0.7` as unresolved. Preserve individual risk flags even when an aggregate review flag is low.
- Read `noul` as probability of yes. Read rubric scores on their native 0–4 scale. Do not invent a weighted quality score, treat low scenario variety as a defect by itself, or interpret provider `confidence` as probability of correctness.

Keep thresholds advisory until evaluated on labeled project examples. Never let scores override a concrete defect, failing check, explicit requirement, or security boundary.

## 4. Review the code and investigate flags

Read every changed production hunk at the requested snapshot for a normal baseline review. Expand to nearby contracts, direct callers, and relevant tests only to answer a concrete question. For non-production changes, inspect their relevant diff. Classification prioritizes depth; it does not exempt low-risk changes from review.

For each flagged area, establish the intended behavior, trace the relevant path, and identify a concrete failure condition. Verify whether surrounding conventions, shared instrumentation, legitimate mock contracts, or real requirements explain the flag. Dismiss unsupported flags rather than converting them into findings.

For test concerns, read the flagged test file and targeted implementation or contract only now. Identify the behavior protected, independent expected result, and plausible defect that would escape the assertions. Do not claim production coverage or regression sensitivity from test-only classification. Check materially changed tests as needed for the baseline review even when their classifier is reassuring. Distinguish a weakness introduced by this change from pre-existing debt.

For scope concerns, compare additions against the actual task and established project conventions. Missing rationale alone does not prove an abstraction is unnecessary. Recommend simplification only with a concrete burden and a behavior-preserving alternative.

Run focused, repository-standard checks when they can substantiate a material finding. Use existing CI results when they cover the exact snapshot. Do not add dependencies or launch expensive whole-repo mutation/fuzz campaigns by default. Isolate deliberate faults from the user's working tree. Record checks actually run and material checks unavailable.

## 5. Deliver a grounded review

Lead with findings ordered by severity. For each finding, include a concise title, file and narrow line range, triggering condition, observed consequence, and a practical correction. Cite the code/contract that supports it. Report classifier flags as routing evidence only; probability is neither severity nor proof.

Prefer correctness, data integrity, security, compatibility, concurrency, and meaningful test defects. Omit style preferences already handled by tooling, speculative edge cases, and duplicate findings. Respect the requested review scope; do not redesign the application.

If no actionable defect is found, say so. Follow findings with a short validation/coverage note: reviewed snapshot, relevant checks, and material unresolved evidence gaps. Mention missing classifiers once when they limited the workflow. Avoid dumping every score or implying approval, deployment readiness, or exhaustive safety from a clean classifier result. Post comments, assign reviewers, implement fixes, or publish changes only when that action is requested.
