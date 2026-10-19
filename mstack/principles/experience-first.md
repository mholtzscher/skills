# Experience first

Judge product, UX, and feature-scope choices by what the user can understand and accomplish. When implementation convenience conflicts with the agreed user experience, choose the experience. Compare actual interaction, error recovery, and feedback rather than treating implementation ease as the deciding criterion.

The user is whoever consumes the work. For a UI, that is the end user. For a library or internal API, it is the colleague who imports it. The next maintainer is a user too. Weigh their experience and explain what the consumer gains and what the maintainer inherits.

- Justify every feature, control, and option by the work it helps the user do. Extra choices also impose comprehension and maintenance costs.
- Ship fewer polished features rather than more rough ones.
- Prototype before committing to an uncertain design when observation can settle it at lower cost. Throwaway HTML can be cheaper than production implementation. A prototype is not mandatory for an already-understood change.
- Get transitions, alignment, spacing, feedback, and error states right. These details are part of the experience rather than optional polish after the feature count is complete.
- Tighten the core loop. Every feature should serve the central workflow or stay out of its way.

[Verifiable units](verifiable-units.md#put-shared-foundations-in-the-right-order) governs the sequence of foundational work.
