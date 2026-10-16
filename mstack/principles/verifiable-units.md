# Verifiable units

## Sequence work around checks

Order sweeps, migrations, and other multi-step work into small units that each end in an observable check. Give deliverables stable identities, owners, dependencies, and acceptance criteria in the existing plan. Include shared infrastructure and integration checks so required work does not remain unowned.

Establish the actual branch and comparison baseline. Verify its relevant known-good state before changes. An existing failure remains a baseline failure, not evidence the new work passes. Do not automatically rebase onto trunk or rewrite published or user history. Agree any required baseline repair or branch change.

The ordinary unit is a known-good state, one coherent change, and the deciding check before the next dependent change. A break caught where it starts is easier to localize than one found after further work accumulates. Use [real checks](prove-it-works.md) even when an [existing tool](encode-lessons.md#make-work-rerunnable) makes the per-unit check cheap.

## Put shared foundations in the right order

Structural decisions preserve future choices; code-level decisions preserve simplicity. Ask, "does every subsequent phase benefit from this existing?" Approved CI, lint, test infrastructure, or shared types can belong first when the task actually needs them. This is a reason for sequencing, not permission to build unrelated infrastructure.

Subtract dead code before adding foundations where that removal is within scope and its role is understood. Then sequence setup before dependent features and tests before fixes. Each increment should introduce a coherent abstraction or deepen one already present. Avoid distributing a new capability across callers as special-case coordination.

## Tell a verifiable delivery story

Use small, single-purpose commits that show why the work holds. Useful orders include a failing regression test before its fix, subtraction before a reshape, baseline capture before treatment, and shared foundations before the feature. A deliberately red test is an expected observation inside an approved unit; it does not authorize publishing an accidentally broken shared branch or declaring a failing delivery green. Keep the final delivered contract and required gates satisfied.

A single ordinary PR can contain these coherent commits. Stacked PRs are a separate, explicitly requested delivery choice. Prefer the right order while working rather than automatically rewriting history afterward.

## Declare migration phases when temporary breakage is necessary

For an approved planned rewrite or migration, optimize for the intended, verifiable end state rather than building throwaway compatibility solely to make every edit look stable. Planned temporary breakage is allowed only inside a declared isolated phase. The approved plan must specify its scope, isolation, reversibility, and exit checks before that breakage begins.

Keep high-signal checks running for the actively touched areas during the phase. Do not advance across its verification boundary while the boundary gate is wrong. Each boundary must be green before dependent work proceeds. At completion, run the full static and runtime verification required by the plan and affected contracts before delivery. Missing tools, unknown commands, or unexecuted checks remain explicit gaps and cannot count as passing.

This exception does not authorize implicit deletion, unrelated disruption, or publishing broken shared state. Preserve genuine external compatibility requirements. A necessary temporary adapter is exceptional and time-boxed, as described in [Minimize reader load](minimize-reader-load.md#migrate-internal-callers-and-remove-the-old-path).
