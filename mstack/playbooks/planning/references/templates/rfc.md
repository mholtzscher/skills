# RFC (Request for Comments)

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

```diff
diff --git a/path/to/types.ext b/path/to/types.ext
@@
 existing context
+new or changed type definition
```

[Use a `[language]` block instead when this is a wholly new definition.]

### Interfaces
[Define concrete signatures/protocols, inputs, outputs, errors, side effects,
and compatibility requirements.]

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

[Map each new type and interface to its owning path and deliverable.]

### Alternatives Considered
| Option | Pros | Cons | Why Not |
|--------|------|------|---------|

### Migration/Rollout
[How we get from here to there]

### Open Questions
- [ ] [Question]
````
