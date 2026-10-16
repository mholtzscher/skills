# Spec implementation

Resolve the supplied spec path relative to the user's working directory, or honor an explicit absolute path. Read the complete file and repository instructions.

1. Confirm approval of the implementation contract. An explicit request to implement this named, complete spec counts as approval of that contract; unresolved consequential choices still require answers.
2. Map each deliverable to owned paths, dependencies, and checks. Resolve missing shared infrastructure rather than assigning it to nobody. Use [orchestration](../../references/orchestration.md) for independent work, retaining one writer for coupled changes.
3. Implement every agreed deliverable. Track assumptions concisely and reopen only materially changed decisions. Reuse the spec as the progress record when useful instead of creating a parallel task database.
4. Verify each acceptance criterion and the integrated result. Account for checks requiring external access separately.
5. [Finish delivery](../finish-delivery/PLAYBOOK.md) as one PR unless a stack was explicitly requested. Update the existing unambiguous PR rather than creating a duplicate.

Report deliverable coverage, actual verification, the PR URL, required-check status, and remaining gaps. An unavailable acceptance check or unknown required-CI state is incomplete evidence, not success.
