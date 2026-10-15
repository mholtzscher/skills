# Test behavior

A useful test protects an observable behavior and fails under a plausible defect. Derive the expected result from a requirement, protocol, invariant, or independent oracle rather than calling or copying the implementation under test.

Choose the smallest meaningful test boundary: a pure function, a real integration, a property, a concurrency scenario, or a UI interaction. Coverage measures reachability, not fault detection. Do not add tests that merely assert the wording or structure of the implementation.
