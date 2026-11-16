# Feature Plan (Implementation-Ready)

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
| Deliverable | Outcome | Effort | Owning Paths | Depends On | Acceptance |
|-------------|---------|--------|--------------|------------|------------|
| [D1] | [Concrete outcome] | S/M/L/XL | [file/package paths] | - | A1 |
| [D2] | [Concrete outcome] | S/M/L/XL | [file/package paths] | D1 | A2 |

### Non-Goals (Explicit Exclusions)
- [Thing people might assume is in scope but isn't]

### Types
[Define new and changed domain, API, persistence, event, and configuration
shapes in the implementation language when known. Include fields, value types,
constraints, and owning module.]

```diff
diff --git a/path/to/types.ext b/path/to/types.ext
@@
 existing context
+new or changed type definition
```

[Use a `[language]` block instead when this is a wholly new definition.]

### Interfaces
[Define component boundaries: function or method signatures, endpoints, events,
inputs, outputs, errors, side effects, and compatibility requirements.]

```diff
diff --git a/path/to/interface.ext b/path/to/interface.ext
@@
 existing context
+new or changed interface definition
```

[Use a `[language]` block instead when this is a wholly new definition.]

### Project Layout
```text
path/
├── to/
│   └── file.ext             # new|modify|move — responsibility
└── package/
    └── module.ext           # new|modify|move — responsibility
```

[Explain package ownership and how each new type and interface maps to a path.]

### Acceptance Criteria
- [ ] **A1:** [Testable statement 1]
- [ ] **A2:** [Testable statement 2]

### Validation plan
| Acceptance | Check | Expected result | How to run | Prerequisites |
|------------|-------|-----------------|------------|---------------|
| A1 | [Behavior or public boundary exercised] | [Observable pass/fail result] | [Command or manual procedure; if unknown, identify what to discover during implementation] | [None, or required access/environment] |

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
