# Verification

Derive checks from the approved behavior and plausible failures. Read [prove it works](../principles/prove-it-works.md) and [test behavior](../principles/test-behavior.md).

1. Inventory the changed paths and affected consumers. Read the relevant repository instructions and actual commands before running them.
2. Use existing checks first. Add tests when they protect meaningful behavior, not to mirror the implementation or inflate coverage.
3. Exercise the changed public boundary. Use the project's existing verification skill and feature map for covered paths. Browser/UI work needs the corresponding interaction; terminal work needs a real terminal interaction when behavior depends on a PTY; service changes need request/response or integration evidence where relevant.
4. For a bug, establish a failing reproduction or explain why it cannot be run. After the fix, verify that same path and material regression paths.
5. After cleanup or integration changes, rerun affected checks. Once the relevant checks pass, repeat them only for a new change or unresolved concern.
6. Record the tested revision, commands, observed outcomes, and material coverage gaps. Distinguish passed, failed, pending, skipped, unavailable, and not run.

Use available external specialists when their task fits: go-test-effectiveness, service-design, agent-browser, terminal-control, or the project's own verification skill. Skill availability alone is not a reason to launch a broad audit.

When asked to create or maintain a project verification skill, follow the [verification-skill playbook](../playbooks/verification-skill.md).

For PR checks, use the bundled [PR helpers](../scripts/README.md). Their rollup is evidence about reported jobs, not a complete branch-protection/ruleset/mergeability proof. Missing or ambiguous required-check knowledge cannot support a claim that required CI is green.

## Focused regression testing

Use this sequence when the user explicitly asks for TDD, a failing test, or a regression test, or when the bug has an obvious cheap local test target. Otherwise, skip adding a new test when the path is unclear, expensive, integration-heavy, or not requested. Make broken behavior executable before changing production code when a clear, cheap test path exists. The goal is a focused check that fails before the fix and passes after it, not universal test-first implementation.

1. **Understand the bug.** Identify intended behavior, actual behavior, the affected path, and the smallest observable reproduction.
2. **Choose the narrowest executable check.** Prefer the closest unit, component, integration, or regression test already used for that path. Do not build test infrastructure merely to satisfy this sequence. New tests and analysis helpers remain within the current task's [implementation approval](../SKILL.md#scope-and-approval).
3. **Write the failing test first.** Add the smallest focused test that would have caught the bug. Encode correct behavior rather than copying the implementation.
4. **Run RED before fixing.** Confirm the test fails for the intended reason and retain that failure. If it passes or fails for an unrelated reason, repair the test or reproduction before changing implementation.
5. **Fix the bug.** Make the smallest production change that satisfies the intended behavior while preserving nearby contracts.
6. **Run GREEN.** Rerun the regression test and confirm it passes. Run nearby checks required by the affected contracts.

Adding a failing test may be impractical when it needs broad setup, brittle mocks, slow end-to-end infrastructure, production-only state, vague reproduction steps, or large unrelated fixture churn. Use the closest useful executable regression check instead, such as a targeted script, manual reproduction command, browser automation, snapshot comparison, log assertion, or focused integration check. These alternatives use actual available tools and the same authority boundaries. New executable artifacts need approval and an isolated disposable target where applicable. Explicitly requested TDD that cannot be performed remains unmet, not silently skipped.

Prefer no new test over a bad test that mostly tests mocks, encodes current implementation details, depends on timing or unrelated global state, needs excessive infrastructure for a small fix, or would be deleted immediately after proving the fix. An authorized disposable reproduction can still provide useful evidence without becoming a shipped test. Retain existing meaningful tests.

Preserve correct expectations. Do not change tests to match a wrong implementation or weaken assertions unless the expected behavior genuinely changed under an approved contract. For flaky failures, make the check deterministic where possible and document the signal it protects. Retrying until green does not establish a fix. Keep the regression focused on the reported bug. If it exposes sibling failures, establish the focused regression first, then propose additional coverage within scope rather than expanding the fix automatically.

Report the failing-before test or executable check, its command and actual failure, the passing-after run, and nearby validation. If failing-before evidence could not be demonstrated, explain why and name the closest regression check used instead. Report unavailable passing-after evidence too. Preserve ordered evidence without treating a deliberately red check as permission to publish broken state.
