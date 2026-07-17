# Output Templates

## Quick Decision

For scoped technical choices with clear options.

```
## Decision: [choice]

**Why:** [1-2 sentences]
**Trade-off:** [what we're giving up]
**Revisit if:** [trigger conditions]

### Implementation Impact
- **Types:** [changes, or "No change" with reason]
- **Interfaces:** [changes, or "No change" with reason]
- **Project layout:** [changes, or "No change" with reason]
```

## Feature Plan (Implementation-Ready)

For new feature development. **Complete enough for task decomposition.**

````
## Feature: [name]

### Problem Statement
**Who:** [specific user/persona]
**What:** [the problem they face]
**Why it matters:** [business/user impact]
**Evidence:** [how we know this is real]

### Proposed Solution
[High-level approach in 2-3 paragraphs]

### Scope & Deliverables
| Deliverable | Effort | Depends On |
|-------------|--------|------------|
| [D1]        | S/M/L  | -          |
| [D2]        | S/M/L  | D1         |

### Non-Goals (Explicit Exclusions)
- [Thing people might assume is in scope but isn't]

### Types
[Define new and changed domain, API, persistence, event, and configuration
shapes in the implementation language when known. Include fields, value types,
constraints, and owning module.]

```[language]
[Concrete type definitions]
```

### Interfaces
[Define component boundaries: function or method signatures, endpoints, events,
inputs, outputs, errors, side effects, and compatibility requirements.]

```[language]
[Concrete interface definitions]
```

### Project Layout
```text
path/to/file.ext       # new|modify|move — responsibility
path/to/package/       # new|modify|move — responsibility
```

[Explain package ownership and how each new type and interface maps to a path.]

### Acceptance Criteria
- [ ] [Testable statement 1]
- [ ] [Testable statement 2]

### Test Strategy
| Layer | What | How |
|-------|------|-----|
| Unit | [specific logic] | [approach] |
| Integration | [boundaries] | [approach] |

### Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|

### Trade-offs Made
| Chose | Over | Because |
|-------|------|---------|

### Open Questions
- [ ] [Question] → Owner: [who decides]

### Success Metrics
- [Measurable outcome]
````

## Architecture Decision Record (ADR)

For significant architecture decisions that need documentation.

```
## ADR: [title]

**Status:** Proposed | Accepted | Deprecated | Superseded
**Date:** [date]

### Context
[What forces are at play]

### Decision
[What we're doing]

### Implementation Contract

#### Types
[Concrete definitions affected by the decision, or "No change" with reason]

#### Interfaces
[Concrete boundaries affected by the decision, or "No change" with reason]

#### Project Layout
[Proposed paths and module responsibilities, or "No change" with reason]

### Consequences
- [+] [Benefit]
- [-] [Drawback]
- [~] [Neutral observation]
```

## RFC (Request for Comments)

For larger proposals needing broader review.

````
## RFC: [title]

**Author:** [name]
**Status:** Draft | In Review | Accepted | Rejected
**Created:** [date]

### Summary
[1-2 paragraph overview]

### Motivation
[Why are we doing this?]

### Detailed Design
[Technical details]

### Types
[Define concrete new and changed type definitions, constraints, and owning
modules.]

```[language]
[Concrete type definitions]
```

### Interfaces
[Define concrete signatures/protocols, inputs, outputs, errors, side effects,
and compatibility requirements.]

```[language]
[Concrete interface definitions]
```

### Project Layout
```text
path/to/file.ext       # new|modify|move — responsibility
path/to/package/       # new|modify|move — responsibility
```

[Map each new type and interface to its owning path and deliverable.]

### Alternatives Considered
| Option | Pros | Cons | Why Not |
|--------|------|------|---------|

### Migration/Rollout
[How we get from here to there]

### Open Questions
- [ ] [Question]
````

## Handoff Artifact

When spec is complete, produce final summary for task decomposition:

```
# [Feature Name] — Implementation Spec

**Status:** Ready for task breakdown
**Effort:** [total estimate]
**Approved by:** [human who approved]
**Date:** [date]

## Deliverables (Ordered)

1. **[D1]** (S) — [one-line description]
   - Depends on: -
   - Files likely touched: [paths]

2. **[D2]** (M) — [one-line description]
   - Depends on: D1
   - Files likely touched: [paths]

## Key Technical Decisions
- [Decision]: [choice] because [reason]

## Types
[Copy concrete type definitions and ownership from spec]

## Interfaces
[Copy concrete boundary definitions from spec]

## Project Layout
[Copy proposed file/package tree and responsibilities from spec]

## Acceptance Criteria
1. [Criterion 1]
2. [Criterion 2]

## Open Items (Non-Blocking)
- [Item] → Owner: [who]

---
*Spec approved for task decomposition.*
```
