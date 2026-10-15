# Model the domain

Name the data shape before the logic. Represent meaningful states and transitions explicitly rather than scattering booleans and shape assumptions. Choose the smallest appropriate structure: a union, state machine, table, collection, reducer, or module boundary.

Make illegal states unrepresentable where the language permits it. Parse external values at boundaries, preserve semantic distinctions in types, and derive schemas from their authoritative source. A type cast that conceals a mismatch does not establish correctness.

Map each important type and interface to its owner. Do not add branded types, registries, or layers unless they remove a real ambiguity or repeated decision.
