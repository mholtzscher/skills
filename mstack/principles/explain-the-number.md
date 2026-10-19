# Explain the number

Before trusting, reporting, or acting on a speedup, regression, throughput, latency, or eval score, establish what was measured. Name the workload, environment, baseline, units, warmup, and the user's actual path.

Ask "why not double?" Identify the resource or code path that bounds the result, such as a core, a lock, the disk, the network, or the load generator itself. Obtain a profile or system counters during a run, then map the evidence to source. Reading code and guessing a limiter is not a measured explanation.

List alternative explanations and rule them out with evidence. Check errors, skipped or cached work, code that never ran, an untuned comparison side left at defaults, noise, and a measured component too small to matter end to end. A microbenchmark can establish a component result without establishing user-visible impact.

Keep the evidence with the number in the notes or a linked artifact. Include the run count, spread, and limiter. Distinguish noise from improvement and report uncertainty. A claimed time saving larger than the changed component's original time is a reason to investigate what else changed or what the timer captured. Missing run counts, spread, or limiter evidence are gaps, not details to infer.

For an eval result, ask whether every run actually did the task, whether the gap holds across trials and models, and whether the scenario matters to the intended use. Inspect what behavior changed rather than treating the score as its explanation. Report actual trial, scenario, and model coverage.

Do not invent percentages for conceptual simplification. [Prove it works](prove-it-works.md) establishes that an output is real; this principle establishes what its measured number means.

When producing or acting on a measured performance claim, use the [benchmark checklist](../references/performance/benchmark-checklist.md).
