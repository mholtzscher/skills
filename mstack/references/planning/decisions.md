# Decision guidance

Adapted from spec-planner's decision frameworks.

Invest more discovery in hard-to-reverse decisions. For reversible choices, identify the cheapest useful experiment and the evidence that would cause reconsideration. Even a small implementation sketch still needs approval under mstack.

Compare the simplest viable solution with more capable alternatives. Name the maintenance owner, integration cost, dependencies, and what each option gives up. Use numbers only when their inputs have evidence; do not manufacture effort estimates or complexity scores.

Order deliverables by dependencies and consequential unknowns. Prefer thin end-to-end slices when they can demonstrate behavior independently. A necessary shared foundation is still a deliverable with its own owner and check.

For technical debt, identify the concrete burden, who pays it, a behavior-preserving alternative, migration cost, and a completion check. Keeping the present design is valid when change costs more than the burden it removes.
