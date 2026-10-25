# Workspace

## Prepare

Run once per approved coding task, after approval and before the first repository write. Read-only work stays in place, and a disposable experiment needs only its own isolated target. Delegated writers receive worktrees through [orchestration](../../references/orchestration.md); this section prepares the task's own workspace.

1. Inspect the current checkout's status and branch, and `wt list --format json`. Fetch the remote and find the default branch. Edits already in the current checkout stay there. If they belong to this task, ask before moving them.
2. Reuse the workspace of a task that continues: a resumption, CI repair, or agreed feedback on an existing PR. Use the worktree already on its branch, or create one for the existing branch with `wt switch <branch> --no-cd --format json`. An existing PR keeps its head branch. A worktree another session or child may still own stays untouched until its owner is confirmed.
3. For new work, name the branch `<type>/<scope>-<slug>`: the expected Conventional Commit type, the main component, and a short kebab-case summary. A repository naming convention takes precedence. Confirm the name is unused locally and on the remote.
4. Create the worktree with `wt switch --create <branch> --base origin/<default> --no-cd --format json` and read `path` from the output. Project hooks that need approval stop creation before anything is made. Show their commands and let the user either pre-approve them or choose `--no-hooks` with the documented setup instead. Approval belongs to the user, so leave `--yes` out. Without Worktrunk, use OpenCode `worktree_create` with the full branch name. It starts from the invoking checkout's HEAD, so run `git reset --keep origin/<default>` in the new worktree when they differ. If neither tool works, report the failure and ask before creating a worktree elsewhere.
5. Move the session into the worktree with `session_move`, then confirm the new working directory before running anything that depends on it.
6. Set up the worktree. Check the output of any Worktrunk hooks that ran. Otherwise run the setup the repository documents in its instructions, README, contributing guide, or verification skill. Copy ignored files such as `.env` only with the user's agreement. Report missing setup instructions rather than inventing steps.
7. Verify the relevant baseline in the worktree, following [Verifiable units](../../principles/verifiable-units.md).

Done means the session works in a set-up worktree on the task's branch at a verified base. Report the worktree path, branch, and base revision with the task's results and in any handoff.
