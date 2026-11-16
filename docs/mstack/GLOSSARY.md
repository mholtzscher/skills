# Mstack

Mstack organizes engineering work through a single requested workflow.

## Language

**Playbook:** The procedure for a kind of work the user can request, such as explaining a subsystem, planning a change, or reviewing a PR. A playbook can compose other playbooks for focused parts of the work.

**Principle:** Decision guidance that applies across playbooks.

**Role:** A bounded responsibility assigned to a delegated agent, such as explorer, implementer, or reviewer.

**Tour:** An ordered walkthrough of a change or data model for a reader outside the current chat or needing more depth, with each stop led by a visual and anchored to source. A single in-chat view is Show me, not a tour.

**Prepared workspace:** The worktree an approved coding task works in. It holds the task's own topic branch from a fresh base and is set up and baseline-verified before the first write.

**Record:** A dated doc that states what was decided at that time, such as an ADR. It is superseded, never edited to follow the code.

**Living doc:** A doc that describes the system as it is, and so becomes false when the code changes.

**Standards:** A project's documented judgment rules for how code is written, citable in review. Mechanical rules belong in **checks**: linter rules, hooks, or CI jobs.
