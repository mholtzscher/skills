# Prove it works

After completing work and before declaring it done, check every task output against the requested behavior on the real artifact. Run the feature, read the published metadata, exercise the changed interaction, inspect the diff or stored value, and observe actual process state as appropriate to the claim.

Fresh-looking output, file modification times, cached screenshots, derived state, and agent self-reports do not prove that the current artifact works.

- Check process liveness directly instead of inferring it from a state file or recent output.
- Read the actual value instead of a cached or derived representation when the value itself is the requirement.
- When verification fails, examine the observation method before changing the system. Establish whether it measured the intended target, state, and moment. This is a diagnostic priority, not evidence that production is correct or that the observer must be wrong.

Use a deterministic rerunnable comparison when it materially improves reliability, following [Encode lessons](encode-lessons.md#make-work-rerunnable). Reuse an adequate existing check before writing another. Run the new script and retain its actual output so the human can inspect both the method and the result.

Keep raw outputs and evidence artifacts visible to the human through resolving paths or links. A local artifact is not automatically a committed deliverable. Publishing an audit trail requires explicit agreement, not merely a large or complex task.

Report what was observed, what the check establishes, and what remains unverified. An unavailable tool or an unexecuted check remains a gap rather than a pass.
