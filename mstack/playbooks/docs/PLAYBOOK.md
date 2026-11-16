# Docs

Docs serve the people who build and run the project, and sometimes an agent. A false doc costs more than a missing one, because readers trust it. This playbook limits what enters `docs/`, keeps `specs/` to open work, and removes or repairs what has decayed.

Select the requested section:

- [Admission](#admission) before writing or proposing a doc.
- [Layout](#layout) to place a doc.
- [Quality](#quality) to judge a doc.
- [Upkeep](#upkeep) when a code change may have made a doc false.
- [Audit](#audit) to prune and repair a project's docs and specs.

The playbook covers `docs/`, `specs/`, the root `README.md`, and `GLOSSARY.md`. Agent instruction files and package-level READMEs are out of scope.

## Terms

- A **record** is dated and states what was decided at that time, such as an ADR. It does not go stale. A later record supersedes it; nobody edits it to follow the code.
- A **living doc** describes the system as it is. It becomes false when the code changes.
- A **spec** proposes a change. It lives in `specs/` only while that work is open.

## Admission

Before writing about a change, take the first option that works:

1. Write nothing, when no doc's reader needs the change. The PR description and commit messages record what changed and why.
2. Edit an existing doc, when its reader needs the new behavior to answer the doc's question.
3. Add a record, when the decision passes the [ADR test](../domain-modeling/PLAYBOOK.md#offer-adrs-sparingly).
4. Propose a new living doc. Name its reader, the question it answers, and why no existing doc can hold the answer.

Options 3 and 4 create a file, so they need approval: an approved sketch or spec names the file, or the user agrees when asked. The new file gets its [index](#the-index-lists-every-doc) line in the same change.

These never become docs:

- a summary or narrative of work done
- a plan, status report, task list, or session note
- estimates, risks, and progress tracking
- anything a command can generate from the code

When a proposal is the right home for the content, it belongs in a spec under `specs/`, not in `docs/`.

## Layout

```text
/
├── README.md            entry point: what the project is and how to run it
├── GLOSSARY.md          terms
├── specs/               open proposals
└── docs/
    ├── README.md        index
    ├── architecture/    explanation: how the system is shaped and why
    ├── guides/          how-to: tasks for operators and contributors
    ├── reference/       facts that code cannot generate
    └── adr/             records
```

Each folder holds one mode from the [technical-writing standard](../../references/technical-writing.md). Create a folder when its first doc is written. Add `tutorials/` the same way when the first tutorial exists.

A repository with several products repeats the folders under `docs/<product>/`, each with its own `README.md` index, and `docs/README.md` links every product index. When `GLOSSARY-MAP.md` exists, follow [domain modeling](../domain-modeling/PLAYBOOK.md#file-structure) for where each context keeps its glossary and records.

### The index lists every doc

`docs/README.md` has one line per doc: a link, the reader, and the question the doc answers. A record's line needs only its link and title.

```md
- [How to rotate signing keys](guides/rotate-signing-keys.md): for operators. How do I replace a key without downtime?
```

A doc that the index does not link is a finding. A line that cannot name a reader and a question means the doc fails the first [quality](#quality) test.

### Specs hold open work only

[Spec implementation](../spec-implement/PLAYBOOK.md) updates the docs for the behavior it delivers and deletes the spec in the PR that completes it. Git history keeps the text. `specs/` therefore lists work that is proposed or in progress, and nothing else.

### Existing projects keep their structure until a migration is approved

When a project's `docs/` does not match this layout, place new docs in its existing structure. The [audit](#audit) proposes the move to this layout as one separate change.

## Quality

Judge a doc with four tests, in this order. Stop at the first test it fails, because the test decides the action.

| Test         | The doc passes when                                                                            | When it fails                                      |
| ------------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1. Necessary | It tells its reader something they cannot get quickly from the code, a command, or another doc | Delete it or merge it. Do not improve it.          |
| 2. True      | Every claim about a path, symbol, flag, command, or behavior matches the code today            | Fix the claim                                      |
| 3. Usable    | Its named reader can answer the stated question, or complete the task, from this doc alone     | Rewrite the part that fails                        |
| 4. Durable   | Ordinary commits will not make it false                                                        | Replace the detail with a link or generated output |

A doc that passes all four is then held to the [technical-writing standard](../../references/technical-writing.md) for its mode and prose.

Records are exempt from the tests. Check their links, and leave their content as written.

### Check each test with evidence

**Necessary.** The doc fails when its index line cannot name a reader and a question, or when its content is one of these:

- a file-by-file restatement of the code
- a narrative of a change, such as "we added" or "this PR introduces"
- general advice that would read the same in another project's docs
- a second copy of what another doc or the README says

**True.** Check every named path, symbol, flag, and command against the source. Run a command when running it is safe and read-only. Report a claim you could not check as unchecked, not as true. Unchecked claims do not fail the test: the doc keeps its verdict and the report lists them.

**Usable.** For a guide, give an independent reader only the doc and a disposable worktree, and have it follow the steps and report where it stopped. For explanation and reference, give the reader the doc and its stated question. Use [orchestration](../../references/orchestration.md) for the reader. Without one, judge by reading and report the reader check as not run. The reader check belongs to the [audit](#audit) or an explicit request. In other workflows, judge this test by reading.

**Durable.** The doc fails when it depends on line numbers, counts, version numbers, a list that mirrors the code, status, or future tense about work that has shipped.

## Upkeep

Run this for a code change before it is published.

1. List what the change renamed, removed, or made behave differently: paths, symbols, flags, commands, configuration, and user-visible behavior.
2. Search `docs/`, the root `README.md`, and `GLOSSARY.md` for each item.
3. Fix every claim the change makes false, in the same PR. Delete a doc whose subject the change removed.
4. Leave new docs to [admission](#admission). A change that seems to need a new doc is a question for the user, not a reason to create one.

Report the docs edited, or that the search found none affected.

## Audit

The audit reads and reports. It edits nothing until the user selects findings.

1. **Run the helper.** Run [`docs.ts`](../../scripts/README.md#docs-audit-helper) from the repository. Pass `--since` with the revision of the last audit when known, or the output of `git rev-list -1 --before="90 days ago" HEAD`. Its findings are candidates for the steps below, not verdicts.
2. **Confirm the mechanical findings.** Read each broken link and path candidate in place. Path candidates include examples and deliberate mentions of removed files.
3. **Judge each living doc** against the [quality](#quality) tests, in order. Include docs outside the layout. For the root `README.md` and `GLOSSARY.md`, apply the True test only. For many docs, delegate independent groups through [orchestration](../../references/orchestration.md) and verify each returned verdict.
4. **Run the reader check** on every guide that passed tests 1 and 2. Run it on explanation and reference docs only when the user asks.
5. **Sort each spec.** Read it and compare its deliverables with the code and merged PRs.
   - _Implemented_: the deliverables exist. Propose deleting the spec.
   - _Open_: work is planned or in progress. Keep it.
   - _Quiet_: not implemented, with no recent change. Give it the verdict "ask", with its last commit date, and let the user choose to keep or delete it.
6. **Check the layout.** When docs that passed test 1 sit outside the [layout](#layout), propose one migration that lists every move. Keep it apart from the other findings. A doc that failed test 1 is deleted or merged, not moved.
7. **Report.** Give one row per finding: the path, the verdict (keep, fix, merge, delete, list in the index, or ask), the failed test, and the evidence. Report the doc, record, and spec counts beside the baseline counts. Name every check that did not run.
8. **Ask** which rows to apply, through `question`.
9. **Apply the selected rows** as approved coding work: [prepare a workspace](../workspace/PLAYBOOK.md#prepare), make the edits, update the index, rerun the helper, and [finish delivery](../finish-delivery/PLAYBOOK.md). Remove files with Git so history keeps them.

Done means every living doc and every spec has a verdict with evidence, the user has chosen what to apply, and the selected rows are delivered or reported as blocked.
