# Spec implementation

Resolve the supplied spec path relative to the user's working directory, or honor an explicit absolute path. Read the complete file.

1. Confirm approval of the implementation contract. An explicit request to implement this named, complete spec counts as approval of that contract; unresolved consequential choices still require answers.
2. Map each deliverable to owned paths, dependencies, and checks. Resolve missing shared infrastructure rather than assigning it to nobody. Use [orchestration](../../references/orchestration.md) for independent work, retaining one writer for coupled changes.
3. Implement every agreed deliverable. Track assumptions concisely. Reuse the spec as the progress record when useful instead of creating a parallel task database.
4. Verify each acceptance criterion and the integrated result. Account for checks requiring external access separately.
5. Decide the doc changes now that the code is written, following [Docs admission](../docs/PLAYBOOK.md#admission). Edit the existing docs whose readers need the new behavior. Create a doc file only with the approval that admission requires. Describe the behavior as implemented, in the present tense, and check each claim against the code.
6. Delete the spec file in the PR that completes its last deliverable, when the repository tracks it. Name the deleted path in the PR description so that readers can find it in history.
7. [Finish delivery](../finish-delivery/PLAYBOOK.md) as one PR unless a stack was explicitly requested.

Report deliverable coverage, the docs changed, the deleted spec path, actual verification, the PR URL, required-check status, and remaining gaps. An unavailable acceptance check or unknown required-CI state is incomplete evidence, not success.
