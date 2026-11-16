# Finish a coding task

This is the shared completion path for approved coding tasks.

1. Complete relevant local [verification](../../references/verification.md).
2. Run [docs upkeep](../docs/PLAYBOOK.md#upkeep) for the change.
3. Run the mandatory [cleanup passes](../cleanup/PLAYBOOK.md#before-publication), inspect accepted changes, and rerun affected checks.
4. Follow [PR publication](../pull-requests/PLAYBOOK.md#publish) for the prepared snapshot. Preserve existing PR metadata unless creating it or an update is needed to accurately describe this task's changes; explicit metadata-preservation instructions win.
5. Confirm the published head. Inspect required CI for that exact head using [checks](../pull-requests/PLAYBOOK.md#inspect-checks) and the [helpers](../../scripts/README.md). Wait with available background/wait tools; track the target head and stop an obsolete watcher through supported controls if work moves to a newer head. If stopping is unavailable, report its state as unknown and exclude its result from the new head's evidence.
6. Investigate completed failures, fix in-scope causes, rerun affected verification and cleanup, and push. Refresh and publish affected visual evidence when the demonstrated behavior changes, using the same publication rules as step 4. When the PR has conflicts or must be up to date with its base, [sync with base](../pull-requests/PLAYBOOK.md#sync-with-base). Required CI repair is authorized within the approved design. A materially different solution returns to approval. Repeated failure under the same premise invokes [Question the premise](../../principles/question-the-premise.md), not an unbounded retry loop.
7. Finish only when required checks and acceptance are established. Missing required-check knowledge, access, external infrastructure, or an unresolvable failure is a reported blocker. Do not disable checks, bypass protections, or label skipped/pending jobs as passes.

The report includes the PR URL, published revision, behavior delivered, actual validation, material principle citations, and any unresolved work.
