# Create and maintain a verification skill

Select **Create** for a project that needs a repeatable way to drive its real app, or **Maintain** to audit an existing verification skill and feature map.

## Create

The deliverable is a project-local skill that another agent can read cold, use to exercise the real user path, and obtain observable proof. Use installed skill-creator and writing-for-agents for authoring mechanics when available.

### Discover and approve

Inspect existing skills first; use [Maintain](#maintain) for an existing target rather than overwriting it. Answer these from source, repository scripts, docs, and existing harnesses. Ask the user only what cannot be observed:

- **Surface:** what does the user touch: web UI, CLI/TUI, desktop app, API, mobile app, or library? Identify the primary surface and other supported entry points.
- **Run:** exact local build/start commands, readiness signals, ports, configuration, seed data, migrations, and authentication.
- **Drive:** existing browser tests, PTY helpers, control CLIs, HTTP clients, or other harnesses. Reuse them before introducing browser/CDP, terminal, or HTTP machinery. Use available agent-browser or terminal-control skills for the relevant surface.
- **Observe:** screenshots, terminal transcripts, response bodies, exit codes, logs, persisted state, and other evidence that establishes behavior.
- **Isolate:** instance ownership and whether ports, data directories, profiles, and sessions allow independent runs. Establish a disposable test target rather than driving an unrelated running instance.

Propose the skill path, harness/helper changes, initial feature coverage, proof target, evidence location, and cleanup in a sketch; use a spec when uncertainty warrants it. Obtain implementation approval before writing the skill or helpers.

If the checkout cannot build or reach a usable state, report the exact blocker. Product-code repairs require their own approved scope. Minimal missing assets or sample configuration may be created as explicitly approved verification scaffolding only when irrelevant to the behavior being proved; name them and remove them in cleanup.

### Write the skill

Default to `<project>/.agents/skills/verify-<app>/SKILL.md`, a project-local source supported by OpenCode V2. Honor an explicit destination or established project layout and verify its discovery in OpenCode. Keep a unique lowercase kebab-case directory/name of at most 64 characters. Include YAML `name` and a `description` naming the app, surface, and when to use it. Leave the generated skill discoverable unless the user requests explicit-only invocation; mstack itself remains explicit-only.

Keep owned helpers and the feature map beside the generated `SKILL.md`, using relative links. Show invocation as `@verify-<app>`. Ground each section in observed repository behavior, with no placeholder commands:

- **Launch:** exact commands and a usable-state readiness check, including migrations, seed data, and auth from an empty data directory. A responding database or process is not necessarily ready. For short-lived CLIs/TUIs, build once and launch each drive in its own isolated session. Name teardown and instance ownership.
- **Doctor:** a read-only check of process health, expected build/version, owned port/session, data location, and valid auth. State when to rerun it after surprising behavior.
- **Drive:** real selectors and commands from this app. Prefer stable handles such as accessible names, data attributes, prompt strings, or route paths over coordinates and tab order. Link the feature-map index and applicable recipes.
- **Evidence:** name artifact locations outside disposable state. Capture the user action and resulting state, including side effects such as stored values or emitted messages. Exercise actual user paths rather than internal setters or test-only endpoints; use mocks only behind an existing isolated production boundary. Verify what a dry-run/test mode skips through observed files, network activity, or refs rather than trusting its name.
- **Cleanup:** stop only instances the run created, using recorded identities rather than process names. Remove owned scratch state and scaffolding after failed attempts as well as successful runs. Preserve proof artifacts and verify they survive teardown.
- **Helpers:** document each shipped helper's invocation and make executable scripts executable. Keep setup reproducible; do not leave the next agent to reverse-engineer the harness.

### Seed the feature map

Create `features/README.md` with baseline preconditions, driving conventions, proof/skip reporting, and an index. Seed one file per identified user-facing feature, starting with a useful bounded set such as the top three to five; disclose omitted coverage. Use the [worked feature-map example](references/feature-map-example/README.md) for the format, replacing its illustrative app and commands with evidence from the target repository.

Each feature file describes the user-visible behavior and uses four H2s: `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, and `Gotchas`. Record user entry points, real preconditions, exact actions/commands, and observable results. Missing seed prerequisites are failures with explanations in `Gotchas`; preserve the intended journey. A proof through one convenient route does not cover other entry points listed in the map.

### Prove and deliver

Validate the generated frontmatter, relative links, helper invocations/permissions, and actual discovery in OpenCode. Then follow the generated instructions end to end: launch, doctor, drive one mapped feature, capture proof, clean up, and confirm the evidence still exists at its named location. One feature proves this initial path, not the entire map.

Fix in-scope failures and run cleanup after every failed iteration so attempts do not strand processes, ports, or state. A generated skill that has not completed this proof is a draft, not a verified deliverable. If a stand-in differs from the real target, list the setup steps it supplied and the checks still unverified on the target.

For proven, approved creation, [finish delivery](../finish-delivery/PLAYBOOK.md) within the agreed skill/helper scope. Report the skill path, OpenCode discovery, feature actually exercised, surviving evidence, and coverage gaps. Point to [Maintain](#maintain) for later upkeep; suggest a cadence only if asked.

## Maintain

Audit the verification skill and its feature map against source and live behavior. The unit of coverage is a user-facing feature. Edits are confined to the target skill directory: its `SKILL.md`, feature map, and owned harness scripts. Product regressions are findings to report, not permission to change product code or weaken expected behavior.

### Locate and inspect

1. Locate the explicitly supplied verification skill, or discover the project's skill with launch/drive instructions and a feature map. Ask if several candidates are plausible. If none exists, stop and recommend [Create](#create).
2. Reconcile the feature index with its files. Identify missing, duplicate, dead, or unindexed entries. Record proposed corrections before editing; a read-only audit remains read-only.
3. Establish source coverage for every feature file. Use bounded read-only explorers through [orchestration](../../references/orchestration.md) when separate context helps, grouping independent features sensibly. They return a feature summary, source entry points, likely drift or none, and a live recipe; they neither edit nor drive the app.
4. Reconcile the evidence and merge overlapping recipes into as few app states as practical. Spot-check cited drift and inspect recent source changes for unmapped user-facing surfaces; require concrete source paths. Propose a bounded correction sketch and obtain approval before changing docs, maps, or helpers. Reuse approved scope, and reopen it for materially different corrections discovered live.

### Drive and reconcile

The live pass is required even when source looks clean. The coordinator owns all driving. Follow the skill's launch model: a serially driven long-lived instance for a server/UI, or fresh isolated sessions for short-lived CLIs. Exercise every mapped feature with its documented entry points and required observable results; group overlapping journeys without claiming an unexercised route passed.

Maintain these invariants throughout the pass:

- Doctor before the first drive, on each fresh session, and after surprising behavior or a failed drive. When health checks cannot expose a wedged UI state, reset to a known state or relaunch. For a doctor failure caused by approved skill drift, correct it and retry once, restarting only what the correction invalidated; otherwise report the blocker.
- Keep captured evidence through every cleanup and check that it still exists at the named location.
- Clean failed-iteration residue promptly. Stop instances when their drives finish; for a shared run-owned instance, clean the failed drive's residue without destroying the instance needed by later recipes. Perform final teardown after the last drive, including re-proofs of harness corrections.

An unreachable feature needs the concrete prerequisite (auth, entitlement, OS, external state) and the route attempted. A missing prerequisite in the map is documentation drift. A `verified-unreachable` diagnosis is not a passing behavior check; report incomplete live coverage as blocked.

Triage findings with evidence:

- **Documentation drift:** wrong or missing user-facing instructions; apply approved map/skill corrections.
- **Harness gap:** working behavior that the harness cannot drive; apply approved helper corrections, document invocations, check executable permissions, and re-drive the affected journeys live before shipping.
- **Product gap:** actual broken behavior; report it without changing product code or rewriting the map to bless the regression.

### Outcome

Keep concise run notes in scratch storage, including source/live coverage, attempted routes, prerequisites, evidence locations, confirmed drift, and remaining gaps. Keep these notes out of the delivery commit; proof artifacts survive cleanup at their named location.

- **Clean:** every feature received source and live coverage, with no unresolved product gaps and nothing worth shipping. Report the evidence; create no branch or PR.
- **Changed:** complete coverage and re-proofs support approved corrections confined to the verification skill directory. Re-read every changed file, then [finish delivery](../finish-delivery/PLAYBOOK.md) as one PR. Delivery and CI repair stay within that directory; an outside-scope repair is a blocker.
- **Blocked:** coverage, proof, or safe delivery could not complete, or a product gap remains. Name the exact blocker and preserve resumable work; create no PR for an incomplete maintenance pass. If publication already succeeded before a delivery blocker appeared, report that PR and its actual state rather than claiming no publication occurred.
