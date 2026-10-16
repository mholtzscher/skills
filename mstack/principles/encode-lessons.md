# Encode lessons

## Encode a recurring constraint

When the same correction recurs or you catch yourself writing the same instruction a second time, fix its cause at the strongest useful level. Prefer architecture, types, validation, lint, or tests over another reminder. A metadata flag, runtime check, or script may enforce the rule more reliably than prose.

If the lesson needs judgment that cannot be encoded, make the instruction prominent where that judgment happens and add an example of the failure mode. A general warning without the failing case is easy to misapply.

When structural enforcement demonstrably covers the same constraint, let it replace the duplicate operational instruction. Keep useful rationale, exceptions, and migration guidance. Prove what the structural fix enforces before removing text; its existence alone does not show that every instruction is redundant.

## Make work rerunnable

For edits, migrations, analyses, and checks, consider whether a tool would materially improve throughput or reviewability. Reuse an adequate existing tool before writing another. A one-off can justify a tool when it is what makes the result checkable, even without repetition. Trivial visible edits may need no tool at all. The criterion is the benefit, not an artifact quota.

A deterministic script applies the same recipe to every unit and lets a reviewer rerun the proof instead of repeating the hand work. Build the smallest useful script, not a framework.

1. When learning a new transformation, do the first unit by hand within approved scope to establish the recipe.
2. Make or adapt the tool, rerun it on that unit, and diff its result against the hand-done version. Investigate discrepancies before applying it broadly.
3. Make it safe to rerun. Account for already-completed units and partial runs rather than duplicating work.

Choose the tool for the job. A codemod or script can make edits, a generator can produce repetitive files, a dump-to-SQLite query can analyze data, and a rerunnable check can verify a contract. Existing tools and tool files are valid results of this decision; a new file is not mandatory.

A deterministic tool beats fan-out when it can process every unit in one pass. Run it directly instead of dispatching delegates to hand-apply the same recipe. When delegation genuinely helps, give all workers one shared recipe, verification contract, and do-not-touch boundaries. Keep that contract outside their write ownership so a worker cannot change its own acceptance criteria. Use an existing approved brief or reference when adequate. A new or shared skill needs separate scoped authority.

If you claim to have created a tool, point to the actual artifact and its executed proof. A recommendation to create one is not an applied change. Keep useful persistent tooling with approved code delivery when it belongs to that work. Local proof artifacts do not automatically belong in the diff, and neither complexity nor ambition authorizes committing an audit trail. Decision trails require explicit publication agreement.

This section makes current work rerunnable. The preceding section makes a recurring constraint durable. Both retain implementation approval. Discovering a workflow defect does not authorize changing shared skills or the user's global installation.
