# Tour

Use a tour when the reader needs more depth than one in-chat answer, or will read the result later or somewhere else. A tour is read-only and presents the code. It does not review it, research its history, or propose changes.

Select the subject:

- [Change](#change) for a diff, branch, or PR.
- [Data model](#data-model) for types, interfaces, data objects, tables, and the data flow between them at one revision.

## Shared structure

1. Pin the subject. Record the exact base and head revisions for a change, or the single revision for a data model, in the tour itself.
2. Name the audience and what they should be able to do afterwards: approve, extend, debug, or onboard. Put depth where that goal needs it.
3. Order the stops data first: **Map**, **Shapes**, **Flow**, **Behavior**, then **Glue**. The Map is one overview visual with a sentence or two. Shapes covers types, interfaces, payloads, and tables. Flow shows how data moves between them. Behavior covers logic and state. Glue gathers wiring, config, and generated files. Drop parts that do not apply.
4. Open every stop with a visual chosen from [views](references/views.md). Follow it with a short caption that says what changed or exists, why, and what it implies for behavior, contracts, data, or operations. Leave the details to the diff or code.
5. Anchor every stop to its source: `file:line` references, or the changed paths it covers. Put each gotcha at the stop where it applies, not in a closing list.
6. State the scope and what the tour leaves out.
7. Apply the accuracy rules in views before delivery. Fix or remove any view that fails them.

## Change

1. Establish intent from the request, commit messages, and PR description when one exists. Include local edits only when the user agrees. Inventory the changed paths, including new, deleted, and renamed files. Untracked files join the diff only when they are in scope.
2. Read the full diff once. Keep lookups targeted: each one answers a question a specific stop needs answered. Do not explore the repository for general context.
3. Split the change into chapters by logical unit, not by file or folder. A small change can be one chapter with one stop. Three files changed for one reason form one chapter; one file with two unrelated changes splits across two. Unrelated work never shares a chapter. Put the most important chapter first, so a reader who stops early has already seen what matters.
4. Every changed path has exactly one owning chapter or appears in an explicit **Not covered** list with a reason. A chapter that shows part of a file another chapter owns cites those lines instead of claiming the path. Check ownership against the inventory before delivery.
5. Use the change-specific views where they apply: the contract delta for changed types and payloads, the deploy compatibility matrix for schema or wire changes, and interface conformance for changed interfaces. Say plainly which chapter carries most of the risk.
6. Explain the change rather than reviewing it. If you notice a likely defect while reading, mention it briefly at its stop and offer [Review](../review/PLAYBOOK.md) separately. Most stops mention none.

## Data model

1. Bound the model: the entities, tables, and boundaries in scope, and the question the reader brings to them.
2. Shapes first. Show the central types and tables, then how each entity maps across memory, wire, and storage. Call out naming drift, lossy conversions, and fields that exist on only one side.
3. Flow next. Follow the model's main paths with arrows labeled by the type they carry. Mark where data is validated, transformed, persisted, and emitted.
4. Behavior last. Show the lifecycle and state transitions of the central entities, and which module owns each step.

## Delivery

Write one Markdown file with Mermaid diagrams at the path the user names. Otherwise use a task-specific temporary path outside the repository. Open it with the host's Plannotator annotate tool when that tool is available. If Plannotator is unavailable, give the file path and say it was not opened.

Produce a Plannotator Inbox guide, an HTML page, or a PR body only when the user asks for one. Writing to a PR or any other remote is publication and needs explicit authority.

Report the path, the pinned revision or range, and the coverage result for a change tour.
