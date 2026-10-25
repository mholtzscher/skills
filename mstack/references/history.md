# History as evidence

Read the current [OpenCode API guide](https://opencode.ai/v2/docs/api). Use `opencode api` through its normal authentication/discovery path and inspect the actual API contract before querying sessions. Do not query or edit the live database directly.

Scope retrieval to the relevant project/topic and a useful recent period, or the period explicitly requested. Expand across projects only when the request calls for that scope. Do not retrieve secrets or unrelated conversations to build a general profile. Return concise evidence with session IDs and dates.

Delegate large transcript searches with a concrete question and request concise findings: date, session/entry ID, a short user quote, relevant outcome, and confidence. Exclude the current research session and its children when mining historical preferences.

Distinguish user-authored requests and recorded question answers from assistant suggestions, system instructions, and generated slash-command expansions. Invoking a command does not prove the user personally chose every clause in its expansion. Repeated preferences are stronger than isolated examples. More recent explicit corrections supersede earlier choices.

For a pickup, reconcile history with current files, branches, PRs, and actual child/process state. For rationale, keep facts and inference separate. For personal workflow changes, present inferred preferences for confirmation before encoding them as policy. Report inaccessible history instead of inventing a transcript or claiming exhaustive coverage.
