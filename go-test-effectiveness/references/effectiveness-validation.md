# Effectiveness validation

A green test suite shows that the tests accept the current implementation. Validate whether they reject plausible broken implementations.

## Run basic checks

Start with focused tests, then use repository-standard broad checks.

```bash
go test ./path/to/pkg
go test -shuffle=on -count=10 ./path/to/pkg
go test -race ./path/to/pkg
go test -cover ./...
```

Use formatting, linting, integration, and generated-code checks configured by the repository. Apply race testing when concurrency is relevant. Repeat and shuffle new tests when order dependence or shared state is plausible.

## Interpret coverage correctly

Coverage answers whether tests executed code. It does not answer whether they observed the behavior or would detect a defect.

Use coverage to find unexecuted paths worth investigating. Do not use line or branch percentage as the main quality score.

High coverage with many surviving mutations is suspicious. It often means tests reach the code but make weak, circular, or irrelevant assertions.

## Use mutation testing

Use repository-standard mutation tooling when available. If the repository has no standard, candidate Go tools include [Gremlins](https://gremlins.dev/) and [avito-tech/go-mutesting](https://github.com/avito-tech/go-mutesting). Verify current maintenance, Go-version compatibility, supported mutation operators, and CI cost before adopting either one.

Mutation testing asks:

```text
If this implementation were subtly wrong, would the suite notice?
```

Focus on covered survivors in changed or high-risk behavior. Follow this loop:

```text
inspect the survivor
identify the changed behavior
find the missing requirement or invariant
write or strengthen the test
test against the clean implementation
confirm failure against the mutation
remove the mutation
```

Do not target syntax blindly. If `>` becomes `>=`, first determine the required equality behavior from a requirement, invariant, or contract. Then encode that behavior.

Some mutants are equivalent or irrelevant. Explain why rather than forcing a brittle test.

## Use negative controls

For a critical new test, identify a plausible defect and demonstrate that the test catches it when practical. Options include:

- removing or reversing validation temporarily;
- returning a wrong value;
- applying a state change to the wrong entity;
- reintroducing a historical bug;
- running against a mutation;
- comparing the buggy and fixed revisions.

Run deliberate faults only in an isolated worktree, copied package, mutation tool, or historical revision. Never alter a file that contains unrelated uncommitted changes. If safe isolation is unavailable, skip the negative control and report the limitation. After validation, verify that the user's working tree contains no intentional defect or temporary change.

## Replay historical bugs

Historical defects provide stronger fault evidence than line coverage or arbitrary synthetic mutations. The defect shows behavior to reject; rely on a requirement, incident record, accepted fix, or other independent source for the expected result.

For each relevant past defect, check:

```text
buggy revision plus test equals failure
fixed revision plus test equals success
```

A historical bug corpus can measure how many real defects an AI-generated or revised suite would have caught.

## Avoid mutation overfitting

Mutation score can be gamed like coverage. Tests can memorize visible mutation operators without protecting the domain.

When formally evaluating test-generation systems, separate:

- visible mutants used during authoring;
- held-out mutants used only for evaluation.

Combine syntactic mutants with semantic domain faults and historical bugs. Freeze the tests before exposing held-out faults.

Avoid universal thresholds such as a required 95 percent score for every package. Equivalent and low-value mutants make absolute thresholds misleading. Prefer a ratchet:

- do not add high-risk surviving mutants;
- do not regress meaningful fault detection;
- require stronger evidence for changed critical logic.

Use stricter review for authorization, finance, data-loss paths, security boundaries, and irreversible workflows.

## Review an existing suite

For each meaningful test, answer:

1. What externally visible behavior does it protect?
2. What plausible defect would make it fail?
3. Where does the expected result come from?
4. Is the assertion strong enough?
5. Does the test type fit the risk?
6. Does it depend on private structure without a contractual reason?
7. Is there sensitivity evidence from mutation, a negative control, or a historical bug?

Flag tests that cannot answer these questions.

Common warning signs include:

- many repetitive table cases;
- expected values copied from production code;
- mocks for every dependency;
- assertions about private structure or incidental call order;
- large fixtures with tiny assertions;
- snapshots regenerated after failures without independent review;
- fuzz targets that only check for panics;
- properties with weak, tautological, or vacuous invariants;
- generators that discard most inputs;
- tests added only for coverage;
- tests that pass when major logic is deleted;
- generic names such as `TestFoo2`;
- arbitrary sleeps in concurrent tests.

## Place checks in CI by cost

For pull requests, prefer focused feedback:

- relevant package tests;
- shuffle and repetition for new tests;
- race checks when relevant;
- changed-code mutation testing;
- relevant integration tests.

Use scheduled runs for expensive checks:

- broader mutation testing;
- full race and integration suites;
- extended fuzzing;
- historical bug replay;
- stress and concurrency runs;
- benchmark tracking;
- held-out mutation evaluation.

Coverage may be reported at either level, but it should not be the sole gate.

## Completion standard

Do not finish with only `go test passes`. Report:

- behavior protected;
- chosen test type and why;
- oracle provenance;
- plausible defects detected;
- sensitivity evidence gathered;
- stability checks run;
- remaining gaps.
