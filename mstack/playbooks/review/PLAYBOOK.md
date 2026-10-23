# Review and blast radius

Review is report-only unless fixes are requested and approved.

Select the requested procedure locally:

- [Ordinary review](#ordinary-review) for a direct or independent scoped review.
- [Interrogate](#interrogate) for an adversarial review, challenge, stress test, or explicitly requested multi-model review.
- [Blast radius](#blast-radius) for what a change could break elsewhere and proof of its deciding safety fact.

These are distinct procedures, not automatic stages. Use [PR triage](../pull-requests/PLAYBOOK.md#triage-feedback) for existing inline feedback.

## Shared scope and authority

Establish intent, exact base/target revisions, and whether local edits belong in scope. Inventory changed paths, including new/deleted/renamed files. Review the full relevant diff, not just classifier output or a summary. Preserve unrelated files and external state. Run [Coding standards: Find](../coding-standards/PLAYBOOK.md#find) and review the diff against those standards as its [Apply](../coding-standards/PLAYBOOK.md#apply) section describes.

When delegating, use [orchestration](../../references/orchestration.md) and the adapter for the actual host, [OpenCode](../../references/hosts/opencode.md) or [Pi](../../references/hosts/pi.md). Give reviewers the original intent and immutable snapshot, absolute cwd and base revision, bounded scope, standards source paths with their scopes and the [smell baseline](../../references/code-smells.md), evidence requirements, and report-only stopping point. Reviewers do not edit files, run builds, install dependencies, commit, or post comments. A reviewer needing execution returns the precise proposed check; the lead may perform it only within allowed scope or assign an authorized tester contract. Reviewer status does not silently become tester authority.

The lead verifies every proposed finding and consolidates duplicates. Ask for concrete triggering conditions, consequences, and evidence. Model agreement raises a lead, not proof. Missing tests or speculative risks alone are not validated defects.

Stop at the report. Do not auto-apply findings, post GitHub comments, resolve threads, or launch delivery. Agreed fixes require implementation approval; reuse existing agreement only when it actually covers those fixes.

## Ordinary review

Inspect correctness, contracts, failure cases, compatibility, and meaningful test protection. Work directly when that meets the request; use independent reviewers when useful and supported.

Report findings with narrow locations, mechanism, consequence, and correction. Classify them as **Act on**, **Consider**, **Noted**, or **Dismissed**, with reasons; prioritize real defects over preference and speculative churn. Report standards findings in a separate **Standards** section, each with its bucket and citing its file and rule or naming its smell. A standards finding that is also a correctness or security defect stays in its main bucket with the citation, and its Standards entry refers to it. Include the reviewed snapshot, actual checks, and material gaps. Load the [rubric](references/rubric.md) for detailed review lenses or the [lead framework](references/lead-judgment.md) when adjudicating findings; ordinary review does not require the entire interrogate panel or report shape.

## Interrogate

Challenge code changes from independent angles and deliver a synthesized verdict. When multi-model review is requested or explicitly authorized, the adversarial diversity comes from different real models, not assigned personas.

### Step 1, Scope

Identify what to review from context:

- If the user points at specific files or a diff, use that.
- If on a feature branch, confirm the actual base and inspect the full changeset against it.
- If the user's message references recent work, gather the relevant files.

Package the diff or file contents with any surrounding context files the reviewers need to understand the code. Include scoped local/new files when agreed; label the snapshot precisely so every reviewer sees the same change.

### Step 2, Intent

Before spawning reviewers, state the intent in one clear paragraph from the user's message, commit messages, the PR description if one exists, and the code. If you're unsure about the intent, ask the user before proceeding.

### Step 3, Reviewers

A narrow adversarial review can be direct; disclose the lack of independence. Explicit independent review or diversity cannot be silently replaced with direct work.

For an authorized multi-model panel, launch one reviewer per selected available host-configured model, labeled Reviewer A, B, and so on. Launch independent reviewers together where the host supports it. Use actual discovered agents and schemas, not fixed agent names, model defaults, a model sheet, or a model-setup PR. Omit model overrides unless the user requests a model or explicitly authorizes diversity. Record only identities confirmed by tool calls or returned metadata.

If a requested model or diversity is unavailable, report the exact gap. A same-model second reviewer may provide independent context, but is not model diversity. Do not silently substitute rejected models or change host configuration.

Read the [reviewer prompt](references/reviewer-prompt.md), [rubric](references/rubric.md), and [code-quality lens](references/code-quality-review.md). Fill in the same template for every reviewer with the stated intent, diff or file contents, rubric, code-quality lens, standards source paths with their scopes, and smell baseline. For direct work apply the same evidence requirements. Structural concerns require a concrete maintainability problem to block; file size alone prompts inspection.

### Step 4, Synthesize

Parse every reviewer's findings. Merge findings that describe the same issue differently, and note which reviewers and confirmed models raised each one. Findings two or more models raised independently are a high-signal lead to verify, not a substitute for evidence. Read a lone model's finding and verify it too. Note disagreements. If one model flags something and another explicitly says the opposite, that is context for the verdict. Silence is not agreement or an explicit rejection.

### Step 5, Lead judgment

Read the [lead judgment framework](references/lead-judgment.md). Verify every finding against the actual code and goals. Put every finding in one of four buckets, with the reviewer/model attribution and a one-line rationale:

- **Act on**. Real issues affecting correctness, security, or maintainability given the actual goals. They would block a real PR; explain the concrete problem.
- **Consider**. Legitimate, but you're not sure they outweigh the cost of addressing them now. Worth the user's attention.
- **Noted**. Technically valid but not actionable. Context-dependent, premature optimization, or low-impact at this stage.
- **Dismissed**. Wrong, nitpicky, or missing context, with a brief reason.

Verify standards findings the same way and give each a bucket. Report them in the separate **Standards** section, marked as a documented breach or a judgment call, with their bucket. A standards finding that is also a correctness or security defect stays in its main bucket with the standards citation; its Standards entry refers to it.

More than five Act on items is a calibration signal to recheck filtering and duplicates, not a cap that hides validated findings. No findings is a valid outcome.

### Output format

When preparing the Interrogate verdict, read and use the [report template](references/interrogate-report.md), carrying forward the stated intent from Step 2.

## Blast radius

Find what a change breaks somewhere else. Use for "blast radius of X", "what could this break", or reviewing a small diff you don't trust yet.

### Don't trust your own writeup

A blast-radius writeup that sounds right is not evidence that it is true. Do not hand back only a convincing narrative. Find the one or two facts the whole thing depends on and prove them by running code within the authority below; otherwise explicitly mark them unproven.

### How sure are you

For each fact the change's safety depends on, get it as far down this list as is cheap and authorized, and say where it stopped:

1. You said so. Worthless on its own.
2. You pointed at the line. A real `file:line`, or the library's own source.
3. You showed the bad case can't happen. You walked the failure step by step and it doesn't reach.
4. You ran it. A script or test that calls the real code and fails loud if you're wrong.
5. You reproduced it in the running app.

Step 4 is usually one small script that imports the same library the app ships and calls the exact function you're worried about. A source citation or reasoned failure-path trace is not equivalent to executing it. Record the highest attained level for each fact and the proof's actual limits; a narrow script need not establish running-app behavior.

### Proof authority

Existing authorized read-only checks may run within their actual side-effect limits. Writing a new script or test is a code experiment: it needs an already-approved or newly approved sketch and an isolated, explicitly disposable target. State what will run, what it can write or affect, and the observation that would falsify the safety claim. Keep product files, unrelated files, dependencies, and external state unchanged unless separately authorized; this analysis does not authorize installations or app/environment mutations. A worktree is not a security sandbox.

Reviewer delegates remain report-only. Assign execution separately to a tester with an explicit authorized contract or have the lead run it within allowed scope. Do not infer execution permission from a request for read-only review.

If execution, tools, data, or approval are missing, mark the safety fact **unproven**, state the highest attained proof level and exact gap, and propose the smallest reproducible check. Include the proposed script/check in the report when useful, clearly labeled unrun; obtain approval before writing code to disk.

### Steps

1. Read the change. The diff, the symbols it adds, changes, and deletes, and what it now does differently, including the part the diff doesn't spell out. Use [Why's code anchor](../explanation/PLAYBOOK.md#step-2-establish-the-code-anchor) to pull relevant PRs and commits when available. Trace consumers, registrations, shared state, external contracts, and deployment/migration dependencies, not only touched files.
2. Find the one fact it's safe because of. Most changes that look risky are safe because of a single fact, like "this call only drops already-dead cache entries and does nothing else". Find that fact. If it holds, most risky cases are cleared at once. Spend your time here, not on a long list of maybes.
3. Look where grep stops. Read the source of the library you call, and check its pinned version and any local patch. Work out when things run: microtasks, unmount and teardown, Solid versus React. Follow what a symbol search misses: the JSON an API returns, a DB column, a wire format, another language reading the same bytes, a feature flag, code three hops downstream. Do not infer behavior from an unpatched or different library version.
4. Be honest about each risk. Give it a real chance of happening and a real cost if it does. Keep the risks you confirmed. List the ones you checked and cleared separately. Follow [Why's epistemics](../../references/explanation/why/epistemics.md): cite a real `file:line`, a search that finds nothing is still an answer, and never make up a caller or an API. Distinguish confirmed risks, cleared risks, and unresolved hypotheses; a scoped negative search is not global proof of absence.
5. Prove the one fact. Within proof authority, write a script or test that runs the real code, run it, and paste what happened. Use the exact shipped dependency/function and fail loudly on the bad behavior. If blocked, report unproven with attained level, exact gap, and smallest proposed reproducible check instead of claiming completion of execution.
6. For a big or wide change, consider independent evidence gathering or an explicitly authorized diverse-model comparison of the same question. Different models can catch different real bugs; ask the same question and merge verified answers.

### What to hand back

- **What it does.** What changed, including the part that isn't obvious.
- **The one fact it's safe because of.** State it, say which proof level you got it to, and show the proof. If you couldn't prove it by execution, write **unproven**, with the exact gap and next check. Separate source-established reasoning from observed runtime evidence.
- **Risks.** Each names how it breaks, the `file:line`, how likely and how bad, and how to check. Paste the proof for the ones that matter. Label unresolved hypotheses separately from confirmed risks.
- **Cleared.** What you checked and why it's fine, bounded by the evidence actually obtained.
- **Before you merge.** The cheapest test or repro that catches the real bug, including the script you wrote under approval or the smallest proposed unrun check if blocked. Give reproducible commands, expected failure/success signal, actual output, and any missing environment/data/approval. This is a recommendation, not merge authority.

Apply the relevant [prose cleanup](../cleanup/PLAYBOOK.md#prose-cleanup), cite real code, and strip anything private before it goes anywhere public. Keep reproducible evidence without exposing private inputs or credentials. The report itself is not permission to publish it.
