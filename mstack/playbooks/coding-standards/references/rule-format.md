# Rule format

Write each rule so a reviewer can cite it and decide a hunk against it. Group rules under area headings such as Errors, Modules, or Tests, one rule per subheading. Leave out what tooling enforces.

````markdown
### <Short imperative rule name>

<One-sentence rule.>

**Why:** <the failure or cost it prevents>
**Applies to:** <paths, layers, or kinds of change; exceptions>
**Source:** observed | stated | observed + stated

Bad:

```<lang>
<the failing case, from real evidence where possible>
```

Good:

```<lang>
<the corrected shape>
```
````

- **Source** records where the rule came from: observed in the code, stated by the user, or both.
- Keep the rule sentence decidable. "Return `Result` from domain services; throw only at the HTTP adapter" can be checked against a hunk; "handle errors well" cannot.
- Name exceptions in **Applies to** rather than in a second rule.
- When a rule is aspirational and existing code violates it, say so in **Applies to**: "new and changed code; existing violations are migration candidates."
