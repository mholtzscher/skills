# Refactoring

Read [Minimize reader load](../principles/minimize-reader-load.md).

1. Identify the behavior that must remain stable and the concrete burden the restructuring removes. Trace production callers and supported external contracts before labeling code obsolete.
2. Use [show-complexity](show-complexity.md) when the benefit or retained responsibility is unclear. Keeping the current structure is a valid conclusion.
3. Propose the target shape and migration through [planning](planning.md). Wait for approval.
4. Move callers in dependency order, remove superseded internal paths, and preserve genuine compatibility requirements. Use [Verifiable units](../principles/verifiable-units.md).
5. Verify behavior across the affected consumers and [finish delivery](finish-delivery.md). Describe the actual reduction in rules, indirection, ownership, or operating work, not a line-count score.
