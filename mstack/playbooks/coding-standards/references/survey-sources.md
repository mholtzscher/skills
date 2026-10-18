# Survey sources

Collect evidence from these sources, strongest first. Record each inaccessible source as a named gap.

| Source           | What it shows                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Documented rules | README, `CONTRIBUTING.md`, ADRs, `AGENTS.md` or `CLAUDE.md`, and code comments that state a rule                                               |
| Tooling          | Linter, formatter, type-checker, and CI configuration: what is already enforced, plus disabled rules and suppressions as deliberate exceptions |
| Review history   | Repeated corrections in PR review comments, the strongest evidence of an unwritten rule                                                        |
| Commit history   | Direction of travel: migrations, codemods, and renames. When old and new patterns conflict, the newer one shows the intended direction         |
| Code patterns    | What the code does consistently across modules and authors                                                                                     |

## History

Use authenticated read-only `gh` within an explicit window, such as the last six months or the last 100 merged PRs. State the window in the evidence. For example:

```bash
gh api "repos/<owner>/<repo>/pulls/comments?since=<ISO-8601 date>&per_page=100" --paginate --jq '.[] | {path, body, html_url, created_at}'
git log --since=<date> --oneline --stat -- <path>
```

Look for the same correction recurring across PRs, reviewers, or authors. A single comment is a hint, not a convention. When `gh` or remote access is unavailable, report review history as a gap and continue with the other sources.

## Code patterns

Sample representative modules across the codebase, not one directory. Look at:

- error handling and propagation;
- validation and trust boundaries;
- module layout, ownership, and dependency direction;
- naming of types, functions, and files;
- dependency and framework-primitive use;
- async, concurrency, and resource cleanup;
- logging and observability;
- test structure, fixtures, and mocking.

## Classify each candidate

| Class                  | Evidence                                                  | Outcome                                                            |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| Consistent             | Holds across modules and authors with few counterexamples | Confirm in the interview, then propose a rule                      |
| Mixed or in transition | Competing patterns coexist; history may show a direction  | Interview question, recommending the newer direction if one exists |
| Tool-enforced          | Configuration already enforces it                         | No rule; note the enforcing check                                  |
| Mechanical, unenforced | A fixed pattern a deterministic check could decide        | Propose a check                                                    |
| Incidental             | Few examples, one author or module, or copy-paste         | Drop                                                               |

For each candidate, keep two or three `file:line` examples, counterexamples with an approximate count, the spread across modules and authors, and links to supporting review comments or commits.
