# Property testing

Use property tests when many inputs should obey the same law, boundaries combine in ways examples cannot cover well, or a complex implementation can be checked against a simpler model. Prefer examples when a finite set of cases communicates the requirement better.

For new Go property tests, prefer `pgregory.net/rapid` unless the repository already uses another framework. Use native Go fuzzing instead when malformed or adversarial input exploration is the main goal.

## Discover properties

Inspect requirements, API contracts, types, constructors, call sites, examples, protocol specifications, and historical bugs. Do not infer a property from a function name alone.

Common property classes follow.

### Round trip

Use for encode/decode, marshal/unmarshal, parse/print, compression, or encryption pairs.

```text
Decode(Encode(x)) == x
```

If the domain canonicalizes values, use the actual contract:

```text
Decode(Encode(x)) == Normalize(x)
```

```go
rapid.Check(t, func(t *rapid.T) {
	v := valueGenerator().Draw(t, "value")

	encoded, err := Encode(v)
	if err != nil {
		t.Fatalf("encode: %v", err)
	}
	got, err := Decode(encoded)
	if err != nil {
		t.Fatalf("decode: %v", err)
	}

	if diff := cmp.Diff(v, got); diff != "" {
		t.Fatalf("round trip mismatch (-want +got):\n%s", diff)
	}
})
```

### Idempotence

Use when applying an operation twice should have no further effect. Candidates include normalization, canonicalization, sorting, deduplication, formatting, and sanitization.

```text
f(f(x)) == f(x)
```

### Inverse operations

Use when one operation should undo another, such as push/pop, reserve/release, apply/undo, or encrypt/decrypt.

```text
undo(do(x)) == x
```

Confirm the operations do not intentionally lose information.

### Conservation

Use when quantities must not appear or disappear. Examples include money, inventory, elements, permissions, tokens, and resources.

For a transfer:

```text
balance(A) + balance(B) remains constant
```

Pair conservation with state checks. Conservation alone may miss debiting and crediting the wrong entities by the same amount.

### Bounds

Assert domain ranges such as nonnegative balances, capped retries, or discounts no greater than a subtotal. Weak bounds let many defects survive, so combine them with independent properties.

### Monotonicity

Use when increasing one input cannot reverse the output relation.

```text
a <= b implies f(a) <= f(b)
```

Examples include shipping cost by weight, result count under looser filtering, and final price as a discount grows. Use the domain's actual direction.

### Membership and subset

Useful for filtering, permissions, search, selection, and deduplication.

```text
result is a subset of input
len(result) <= len(input)
every result satisfies the predicate
```

### Permutation invariance

Use when input order has no semantic meaning.

```text
f(xs) == f(shuffle(xs))
```

Do not use it for ranked, stable, or sequence-sensitive behavior.

### Algebraic laws

Use commutativity, associativity, or identity only when the domain promises them.

```text
f(a, b) == f(b, a)
f(f(a, b), c) == f(a, f(b, c))
f(x, identity) == x
```

Floating-point operations often do not satisfy strict associativity.

### Metamorphic relations

Use relations between executions when exact outputs are difficult to calculate. Examples:

- adding a restrictive filter cannot increase result count;
- irrelevant whitespace cannot change normalized meaning;
- adding an unavailable option cannot create more valid schedules.

This style fits search, ranking, compilers, query planners, optimization, and complex transformations.

### Independent reference model

Compare optimized or stateful production code with a simpler implementation written from the domain rules. A slow map, slice, or straightforward algorithm is often enough.

The model must be independent. Moving the production algorithm into a test helper does not create an oracle.

## Test operation sequences

Use model-based tests when correctness depends on a sequence rather than one call. Typical candidates include caches, queues, ledgers, repositories, rate limiters, carts, schedulers, and protocol state machines.

Maintain a simple model beside the real implementation:

```text
MODEL STATE <-> REAL IMPLEMENTATION
```

Generate commands such as `Put`, `Get`, and `Delete`. After every operation, compare returned values, size, empty state, errors, and relevant invariants. Keep the model obvious rather than fast.

## Design generators

### Construct valid values

Generate valid domain objects by construction. Avoid arbitrary values followed by frequent `Skip` or early returns. Excessive rejection creates vacuous tests and harms shrinking.

### Separate valid and invalid domains

Use distinct generators when success and rejection have different properties. For example, valid orders can test conservation while invalid orders can test rejection and unchanged state.

### Generate dependencies in order

Generate dependent values from earlier values:

```go
balance := rapid.Int64Range(0, 1_000_000).Draw(t, "balance")
amount := rapid.Int64Range(0, balance).Draw(t, "amount")
```

Do not generate independent values and discard most combinations afterward.

### Preserve shrinkability

Use direct generator composition. Avoid transformations that obscure the relation between generated values and prevent Rapid from finding a small counterexample.

### Include domain boundaries

Ensure generators reach meaningful values such as empty, one element, duplicates, minimum, maximum, exact thresholds, and values immediately around thresholds. Random generation alone does not emphasize domain-specific boundaries.

## Review a property test

Reject or revise a property when it has any of these problems:

- **Tautological:** expected output invokes or duplicates production logic.
- **Vacuous:** most inputs return early, the meaningful branch is unreachable, or the assertion is always true.
- **Weak:** plausible defects satisfy the property, such as a nonnegative-only check for a complex calculation.
- **Narrow:** generators omit important valid, invalid, Unicode, duplicate, empty, threshold, or large cases.
- **Over-filtered:** most generated cases are rejected.
- **Hard to shrink:** failures remain too large to understand.

Prefer several independent properties when one law is incomplete. A sort test can check ordering, preserved membership, preserved length, and idempotence. Ordering alone would accept an implementation that returns an empty slice.
