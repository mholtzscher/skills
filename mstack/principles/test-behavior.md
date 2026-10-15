# Test behavior

A useful test calls code as its users do, protects an observable behavior, and fails under a plausible defect. Derive expected results from a requirement, protocol, invariant, or independent oracle instead of calling or copying the implementation to obtain its own answer.

## Diagnose assertions that cannot detect wrong behavior

Ask whether a test would still pass if every imported function returned `undefined` or a wrong value. Read these weak shapes together with the rest of the test's positive coverage:

- Loose or missing assertions include `toBeDefined`, `toBeTruthy`, `not.toThrow`, and `toBeGreaterThan(0)`.
- Call-only or absence-only assertions include `toHaveBeenCalled`, `not.toHaveBeenCalled`, `toBeUndefined`, and `toEqual([])`.
- An expected result computed by the subject includes `expect(f(a)).toBe(f(a))`.
- A test may merely restate a constant, config default, table row, or prompt string.
- Assertions may inspect only data the test built without calling the subject at all.

Repair the test by calling the subject in its body with a concrete input and asserting the literal output or observable effect. For a mock, assert the payload it received rather than only that it was called. For absence, also assert presence on another input so an implementation that always does nothing fails. For a constant, test the mechanism that reads it with an input rather than repeating its value.

These shapes are diagnostics, not a blanket ban on meaningful negative assertions or relation tests. An empty result or `undefined` can be the exact required result, provided the test suite also distinguishes the relevant positive behavior. Keep relation checks across table rows, such as a key present in two tables or a parent that exists, and `*.test-d.ts` type checks. Their oracle is a relationship or compile-time contract rather than a literal runtime output.

## Choose a meaningful boundary

Use the smallest test boundary that protects the requirement, whether a pure function, real integration, meaningful property, concurrency scenario, or UI interaction. A property needs an independent invariant and inputs that could expose a defect. Coverage measures reachability, not fault detection. Assertions about implementation wording or structure need a real contract to justify them.

Apply this principle when writing, changing, or deciding whether to keep a test. It does not require adding tests for every reversible low-impact edit. Choose verification proportional to the actual behavioral risk and the selected playbook, retaining approval before new test code.
