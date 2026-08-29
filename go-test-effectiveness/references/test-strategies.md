# Test strategies

Choose a test style because it exposes the identified failure mode. Combining styles is often appropriate, but every added test should protect distinct behavior.

## Example and table-driven tests

Use examples when behavior has a finite set of meaningful cases, business examples communicate the requirement, boundaries have explicit expected values, or a known bug has a small reproducer.

```go
func TestCalculateFee(t *testing.T) {
	tests := []struct {
		name string
		in   Input
		want Output
	}{
		// Cases derived from requirements and boundaries.
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := CalculateFee(tt.in)
			if diff := cmp.Diff(tt.want, got); diff != "" {
				t.Fatalf("mismatch (-want +got):\n%s", diff)
			}
		})
	}
}
```

Do not add near-duplicate cases solely to execute more lines. Name cases after behavior or boundaries, not sequence numbers.

## Regression tests

Reproduce a known defect through externally meaningful behavior. Avoid assertions tied to the implementation of the fix. The defect identifies behavior to reject; use the incident record, requirement, or accepted fix to establish the expected result.

When practical, prove both sides:

```text
new test fails on the buggy behavior
new test passes on the fixed behavior
```

A historical buggy revision is a strong negative control. Record the bug or requirement the test protects if the repository's conventions allow a concise reference.

## Characterization tests

Use characterization tests when a legacy refactor must preserve current observable behavior but no independent source establishes whether that behavior is correct. Capture only the behavior needed to make the change safely. Label the test's purpose and treat its oracle as observed behavior, not a validated requirement.

Ask for agreement before making uncertain behavior a lasting public contract. Replace or strengthen characterization tests when requirements, invariants, or another independent oracle become available.

## Native Go fuzzing

Use `testing.F` when unusual or malformed input could cause crashes, hangs, acceptance of invalid data, or semantic violations. Parsers, decoders, protocol handlers, file formats, and security-sensitive validation are common targets.

A target that only invokes `Parse(input)` checks little beyond panic freedom. Add semantic assertions when the parser succeeds:

```go
f.Fuzz(func(t *testing.T, input []byte) {
	value, err := Parse(input)
	if err != nil {
		return
	}

	encoded, err := Encode(value)
	if err != nil {
		t.Fatalf("encode parsed value: %v", err)
	}
	reparsed, err := Parse(encoded)
	if err != nil {
		t.Fatalf("parse valid encoding: %v", err)
	}

	if diff := cmp.Diff(value, reparsed); diff != "" {
		t.Fatalf("round trip mismatch (-want +got):\n%s", diff)
	}
})
```

Seed fuzz targets with meaningful valid, invalid, empty, and boundary examples. Persist useful failures as ordinary regression cases when that makes the protection clearer and faster.

## Integration tests

Use a real boundary when correctness depends on its semantics. Examples include SQL queries, transactions, Redis behavior, filesystems, HTTP middleware, network protocols, and serialization compatibility.

Prefer Testcontainers-Go or the repository's disposable dependency setup when mocks would hide the behavior. Use `net/http/httptest` for HTTP clients, handlers, and middleware where an in-process server represents the relevant boundary.

Mocks can isolate code when isolation matters. Do not replace every dependency by default. Avoid tests whose only claim is that a mock received a call unless that interaction is the contract.

For database work, test the semantics that are easy to lose in a mock:

- constraints and null handling;
- transaction commit and rollback;
- concurrent updates and isolation;
- query ordering and database-specific types;
- generated query and scan behavior.

## Contract tests

Use contract tests when independently deployed consumers and providers must remain compatible. HTTP schemas, event payloads, and message formats are common examples.

Use repository-standard tooling or a provider and consumer tool such as Pact when justified. Unit mocks do not prove deployed compatibility.

## Concurrency tests

Consider concurrency-specific tests when changed code uses goroutines, channels, mutexes, wait groups, timers, tickers, or context cancellation.

Prefer:

- `testing/synctest` for deterministic time and goroutine coordination when supported by the repository's Go version;
- channels, barriers, or explicit signals instead of arbitrary sleeps;
- `go test -race` for exercised concurrent paths;
- `go.uber.org/goleak` when goroutine lifetime is part of the risk;
- repeated or stress execution for schedule-sensitive failures.

A race-free run does not prove race freedom in paths the test never executes. Assert completion, cancellation, result consistency, and cleanup as the contract requires.

Do not use `time.Sleep` as the primary synchronization mechanism. A longer sleep hides timing assumptions rather than removing them.

## Golden and snapshot tests

Use golden files for stable generated output, CLI output, serialization, formatted documents, or protocol fixtures.

A changed output does not prove that a new golden file is correct. Update fixtures only with independent provenance, such as a specification, a trusted external reference, or explicit human review. Never regenerate snapshots merely to make a failure disappear.

Keep fixtures small enough to review when possible. Add focused assertions for critical semantics that are hard to notice in a large diff.

## Benchmarks

Use `func BenchmarkThing(b *testing.B)` when performance is part of required behavior. Compare before and after with `benchstat` or repository-standard statistical tooling.

Do not turn noisy microbenchmark thresholds into ordinary pass or fail tests without a stable environment and a concrete performance requirement.

## Tool selection

Use repository-standard tools first. Common choices include:

| Purpose | Tool |
|---|---|
| Unit and example tests | `testing` |
| Structural comparison | `github.com/google/go-cmp/cmp` |
| Property testing | `pgregory.net/rapid` |
| Fuzzing | `testing.F` |
| Deterministic concurrency and time | `testing/synctest` |
| Race detection | `go test -race` |
| Goroutine leaks | `go.uber.org/goleak` |
| Disposable real dependencies | Testcontainers-Go |
| HTTP boundaries | `net/http/httptest` |
| Mutation testing | Repository standard; otherwise evaluate [Gremlins](https://gremlins.dev/) or [avito-tech/go-mutesting](https://github.com/avito-tech/go-mutesting) |
| Test reporting and reruns | gotestsum |
| Benchmark comparison | benchstat |

Check the Go version and existing dependencies before selecting a tool. Do not add a library merely because it appears here.
