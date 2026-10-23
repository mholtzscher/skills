# Coding standards

A project's **standards** are its documented rules for how code is written: judgment calls a reviewer can cite against a hunk. Mechanical rules belong in deterministic **checks** instead: a linter rule, a pre-commit hook, or a CI job. Select the requested section:

- [Find](#find) the standards sources before implementation, review, or cleanup.
- [Apply](#apply) them to new and changed code.
- [Capture](#capture) lessons from a session, review, or reflection as proposed rules or checks.
- [Survey](#survey) an existing codebase and interview the user to draft standards that were never written down.

Every rule and check starts as a proposal. Edit a standards file only for rows the user selected. A new or changed check is code: it needs implementation approval and the ordinary delivery path.

## Find

Search the repository for every file that documents how code should be written. When `CODING_STANDARDS.md` or `CONTRIBUTING.md` exists, it must be on the list. Include the style guides, ADRs, and package-level standards files that they or the repository instructions point to. Record each source's scope: the directory a package-level file sits in, narrowed by any paths a rule declares in **Applies to**. Read the linter, formatter, type-checker, and CI configuration to learn which rules tooling already enforces.

Done when you have identified tool-enforced rules and either the standards source paths with their scopes or that no standards documentation exists.

## Apply

Apply rules to new and changed code within each rule's scope. When a nearer source contradicts a broader one, the nearer source wins for its paths. Existing violations outside the diff are migration candidates to report, not scope to fix.

- **Implementation.** Run [Find](#find), read the standards sources, and follow them while writing code. Put the paths of the sources whose scope covers a delegated brief's files in that brief. A documented rule that conflicts with the approved design is a question for the user.
- **Review and cleanup.** Check each changed file against the documented rules whose scope covers it, and the whole diff against the [smell baseline](../../references/code-smells.md). Report standards findings in their own **Standards** section. Cite the file and rule for a documented breach; name the smell and quote the hunk for a baseline smell. A documented breach can be a hard finding. A smell is always a judgment call. The repository overrides the baseline, so suppress a smell its standards endorse. Skip anything tooling already enforces.
- **No standards documentation.** Flag clashes with clearly consistent surrounding code as judgment calls that cite the surrounding examples, never as documented rules. Offer a [Survey](#survey) and wait for the user to request it.

## Capture

Inputs are the current session, review findings, or project lessons handed over by Reflection. Capture mistakes that would recur or that a reviewer should catch next time; one-offs are not lessons.

1. Run [Find](#find). Read the repository's actual check commands in package scripts, build-tool tasks, and CI workflows, plus its pre-commit hooks.
2. Classify each lesson. Read [Encode lessons](../../principles/encode-lessons.md) when the choice between a check and a rule is unclear.
   - **Mechanical.** A fixed syntactic pattern, banned API, import shape, or file-location rule. Propose a deterministic check in the cheapest place the repository's language and existing guardrails allow: a custom linter rule, a pre-commit hook, or a CI job. When a check exists but sits unwired or silently broken, that is the finding. A repository with no guardrail, meaning no hook or CI job running its lint, typecheck, or test command, is a finding of its own.
   - **Judgment.** Cross-file consistency, matching surrounding style, or a design preference no check can decide. Propose a rule in the [rule format](references/rule-format.md), using the failing case from the evidence.
   - **Stale or unclear.** A rule the code or the user now contradicts, that a reviewer cannot apply, or that tooling now enforces. Propose clarifying or removing it.
3. Present numbered rows with the class, proposal, target file, and evidence. Wait for the user to select rows.
4. Write the selected rules to the existing standards file. With none, create `CODING_STANDARDS.md` at the repository root unless the repository has an established home for such documents. When the file passes about 1,000 lines, move detail into linked documents and leave navigation pointers. Selected checks follow [planning](../planning/PLAYBOOK.md).

Report applied, proposed, and dropped rows separately.

## Survey

Use when the user asks to discover or bootstrap standards, or to look for rules missing from an existing file. Aim for a short first draft of the best-evidenced rules; Capture grows it from real mistakes.

1. **Explore.** Collect and classify evidence using the [survey sources](references/survey-sources.md). Sample representative modules and bound history by an explicit window. For a large codebase, delegate independent areas through [orchestration](../../references/orchestration.md). Done when every candidate has a class, cited examples, and counterexamples, and every inaccessible source is a named gap.
2. **Interview.** Follow [Grilling](../grilling/PLAYBOOK.md). Ground every question in the exploration evidence and lead with a recommendation. Cover:
   - consistent conventions, confirmed in batches;
   - mixed or in-transition patterns, asking which one is the standard;
   - surprising patterns, asking whether each is deliberate or legacy;
   - what the code cannot show: what the user corrects in review, recurring bug sources, and patterns they dislike that still appear;
   - aspirational rules the current code violates.

   Reuse answers already given. Done when the frontier is empty or the user stops the interview.

3. **Draft.** Build the draft from confirmed answers only, in the [rule format](references/rule-format.md), labelling each rule's source as observed, stated, or both. Aspirational rules apply to new and changed code; list existing violations as migration candidates. Mechanical candidates become proposed checks, as in Capture. Unanswered and skipped questions stay out of the draft. Present the draft as numbered rows, then write the selected rules as in Capture step 4.
