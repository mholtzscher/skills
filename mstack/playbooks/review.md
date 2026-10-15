# Review and blast radius

Review is report-only unless fixes are requested and approved.

1. Establish intent, the exact base/target revisions, and whether local edits belong in scope. Inventory changed paths, including new/deleted/renamed files. Review the full relevant diff, not just classifier output or a summary.
2. For ordinary review, inspect correctness, contracts, failure cases, compatibility, and meaningful test protection. Use independent reviewers when useful. A requested multi-model review uses discovered host-configured models and must report unavailable diversity.
3. For blast radius, trace consumers, registrations, shared state, external contracts, and deployment/migration dependencies. Identify the assumption that makes the change safe and test or source-check it. A list of touched files is not a blast-radius analysis.
4. Give reviewers the original intent and snapshot. Ask for concrete triggering conditions, consequences, and evidence. The lead verifies every proposed finding and consolidates duplicates; model agreement raises a lead, not a proof.
5. Classify findings as act, consider, or dismiss with reasons. Prioritize real defects over preference and speculative churn. A clean scoped review is a valid result.

Report findings with narrow locations, mechanism, consequence, and correction. Include the reviewed snapshot, actual checks, and material gaps. Do not auto-apply findings, post GitHub comments, or resolve threads. Use [PR triage](pull-requests.md#triage-feedback) for existing inline feedback.
