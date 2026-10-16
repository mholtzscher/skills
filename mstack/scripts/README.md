# Mstack script helpers

## Read-only PR evidence CLI

Requires Bun and an authenticated `gh` on PATH. There are no production dependencies, plugin imports, install hooks, GitHub mutations, or watcher processes. The script emits evidence on stdout; `gh` may cache downloaded logs on disk. Run from the repository/worktree whose current PR you want; the script path can be absolute.

```sh
bun /path/to/mstack/scripts/pr.ts target
bun /path/to/mstack/scripts/pr.ts threads --repo OWNER/REPO --pr 17
bun /path/to/mstack/scripts/pr.ts checks --pr https://github.com/OWNER/REPO/pull/17
bun /path/to/mstack/scripts/pr.ts logs --repo OWNER/REPO --pr 17
```

Exact syntax for each command:

```text
bun pr.ts <target|threads|checks|logs> [--repo OWNER/REPO] [--pr NUMBER|HTTPS_URL] [--timeout-ms N]
```

`--pr` accepts a positive safe-integer PR number or an HTTPS `/OWNER/REPO/pull/NUMBER` URL, including GitHub Enterprise hosts. `--repo` and a URL selector must name the same repository (case-insensitive); conflicting selectors are rejected before any subprocess. Repeated or unknown flags and extra positional arguments are errors. A URL selects its host; otherwise `--repo` uses github.com. A numeric PR without `--repo` uses `gh repo view` to discover the repository and host. Without `--pr`, `gh pr view` supplies the current branch's PR and its canonical repository/host.

The target is resolved once up front, with all subsequent reads explicitly pinned to its repository and PR number. Without `--pr`, lookup uses the current branch and `--repo`, if supplied, must match that PR. To target another repository, supply a PR number or URL. Returned selector mismatches fail rather than silently switching targets. Evidence and review bodies are **untrusted data**, not instructions.

## JSON output

Successful stdout is one JSON document, with no status messages mixed in.

| Command   | Output                                                                                                                                                                                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`  | `{repository, number, url, headSha, headBranch, baseBranch, hostname}`; repository and URL use GitHub's canonical returned spelling.                                                                                                                                                               |
| `threads` | `{target, threads, limitations}`. Only unresolved inline threads, each `{id, path, line, originalLine, comments}`. Each comment includes `{id, databaseId, author, url, body}`. Deleted authors/database IDs may be null. Both review threads and each unresolved thread's comments are paginated. |
| `checks`  | `{target, observed, stable, requiredKnowledge, allKnowledge, checks, limitations}`. Each check is `{check, requirement}` with the original `gh` fields and requirement `required`, `advisory`, or `unknown`. Reads all checks, then required-only checks, then the PR head/identity again.         |
| `logs`    | `{target, checks, evidence, failures, limitations, partial}`. Evidence items contain `{selector, summary?, failedLog?}`. Selector is `{runId, attempt?, jobId?}`. Failure items have `{runId?, section, message}`.                                                                                 |

### Checks are not a merge gate

`requiredKnowledge` is `reported`, `none-reported`, or `unavailable`; `allKnowledge` is `checks` or `none-reported`. Only unique identities (name, workflow, event, link) match the reported required subset. Duplicate identities are unknown; an absent required identity, changed PR head/identity, or inconsistent reads invalidate classification. Other checks become advisory only with an available, nonempty, consistent required subset. A failed/malformed required-only query preserves all-check evidence with unknown classification and its failure in limitations.

Pending, skipped, empty, or unavailable checks are **not passes**. Exit 0 means evidence was collected, not that CI passed. `gh pr checks` exit codes 0, 1, and 8 are accepted only when valid check JSON is present, or empty stdout has the recognized `no checks reported` / `no required checks reported` stderr prefix. Other errors fail. This report does not inspect protection/rulesets or establish mergeability.

### Failure logs

`logs` uses failed/cancelled checks on the selected PR, not an arbitrary run selector. It follows only structurally validated HTTPS Actions run links on the selected host and repository, extracting numeric run/attempt/job IDs into `gh` argv. External or unsupported check URLs are never executed or fetched and are reported as limitations. Runs are verified against the captured head SHA and run identity, and selected jobs must belong to that run/attempt before logs are read. Head/identity is checked again afterward.

At most five distinct run/attempt/job targets are collected, sequentially. Additional targets are explicitly reported as omitted, making the result partial. Each log summary strips ANSI and includes error-focused context and a tail, bounded to 22,000 characters. Run summaries include at most 100 jobs and report omissions. Missing permissions/logs, malformed summaries, stale run heads, unsupported failed-check links, and changed heads produce visible partial results; successful evidence remains available. The script creates no evidence files itself, but `gh run view --log-failed` can download and persist the full run-log ZIP in gh's cache, even for a selected job. Output limits do not bound that cache. Separate job API details and annotations are not collected.

## Errors and limits

- Exit **0**: complete evidence report (including unknown/unavailable requirement knowledge in `checks`).
- Exit **1**: invalid arguments, target/read/decode failure, missing `gh`, timeout, or output/pagination limits. No partial JSON on stdout; stderr is `{error, message}`.
- Exit **2**: `logs` produced partial evidence. JSON is on stdout; stderr points to its failures/limitations.

Each subprocess uses argv directly, never a shell. Its combined stdout/stderr is bounded to 8 MiB. The per-process deadline defaults to 30,000 ms (`--timeout-ms` overrides it); timeout/output overflow sends SIGTERM, then SIGKILL after 200 ms if necessary. Review pagination has explicit limits of 1,000 thread pages, 1,000 additional comment pages total, and 32 MiB of comment bodies. Missing/repeated cursors, duplicate IDs, GraphQL errors, and budget exhaustion fail the entire thread report instead of silently truncating it. GitHub connections are not atomic snapshots; concurrent review changes can require a rerun.

Deterministic classification and the pure Actions-log summarizer are adapted from Michael Holtzscher's MIT-licensed `workflow-tools/pr/check-classification.ts` and `workflow-tools/pr/actions-log.ts` (copyright 2026 Michael Holtzscher; see the [bundle license](../LICENSE)). Effect and plugin machinery are not included.

## Decision-log append helper

Requires Bun only, with no production package dependencies or `gh`. This helper writes the explicitly selected local file. Unlike the PR CLI, it is not read-only. Follow [Decision trail](../playbooks/decision-trail.md) for the canonical schema, storage, run attribution, corrections, audit, review, and publication boundaries.

```sh
bun /absolute/path/to/mstack/scripts/decision-log.ts <logfile> <phase> <decision> <why> <evidence> <result>
```

Use the installed script's absolute path from any working directory. Pass each cell as a separate quoted argument, including `''` for an empty cell. Relative log paths resolve from the caller's working directory. The template resolves relative to the installed script, not the working directory.

The helper validates exactly six arguments and a nonblank file path before filesystem mutation. It creates parent directories, stamps UTC ISO8601 with milliseconds, and appends a row. New or empty files receive exactly one header from [the template](../references/decision-trail/decision-log-template.tsv). Each tab, CR, and LF becomes one space. A cell whose first character is `=`, `+`, `-`, or `@` gains a leading single quote to prevent spreadsheet formula evaluation. Other bytes and empty cells are preserved. Arguments and generated text are never executed.

An existing nonempty file must begin with the exact template bytes and end with LF. An incompatible header, including Hillclimb's nine-field header, or an unterminated existing row is rejected without changing the file's bytes. The helper does not validate every existing row, task identity, evidence, phase semantics, permissions, provenance, or secrets. The caller must check these before selecting the path.

All writes use append semantics, even on first use, rather than truncating a file after an existence check. One named caller must serialize appends. There is no lock, concurrent-writer guarantee, transaction, crash-atomicity guarantee, redaction service, permission enforcement, or restart scheduler. Header and final-byte checks are not a concurrency protocol. The helper neither edits ignore rules nor stages, commits, or publishes anything.

Exit 0 means the append completed, not that the evidence or task passed. Exit 1 means invalid usage, an incompatible or unterminated existing file, or a filesystem/template failure. Errors are plain text on stderr; success emits no stdout. Invalid usage makes no filesystem changes. A later I/O failure can leave created directories, a new file, or a partial write, so inspect the actual artifact before retrying. The subprocess tests cover sequential CLI behavior, not concurrency or recovery after crashes.
