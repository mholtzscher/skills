# Verification

Derive checks from the approved behavior and plausible failures. Read [prove it works](../principles/prove-it-works.md) and [test behavior](../principles/test-behavior.md).

1. Inventory the changed paths and affected consumers. Read the relevant repository instructions and actual commands before running them.
2. Use existing checks first. Add tests when they protect meaningful behavior, not to mirror the implementation or inflate coverage.
3. Exercise the changed public boundary. Browser/UI work needs the corresponding interaction; terminal work needs a real terminal interaction when behavior depends on a PTY; service changes need request/response or integration evidence where relevant.
4. For a bug, establish a failing reproduction or explain why it cannot be run. After the fix, verify that same path and material regression paths.
5. After cleanup or integration changes, rerun affected checks. Once the relevant checks pass, repeat them only for a new change or unresolved concern.
6. Record the tested revision, commands, observed outcomes, and material coverage gaps. Distinguish passed, failed, pending, skipped, unavailable, and not run.

Use available external specialists when their task fits: go-test-effectiveness, service-design, agent-browser, terminal-control, or the project's own verification skill. Skill availability alone is not a reason to launch a broad audit.

For PR checks, use the bundled [PR helpers](../scripts/README.md). Their rollup is evidence about reported jobs, not a complete branch-protection/ruleset/mergeability proof. Missing or ambiguous required-check knowledge cannot support a claim that required CI is green.
