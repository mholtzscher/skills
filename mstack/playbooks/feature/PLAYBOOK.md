# Feature

1. Inspect affected behavior, callers, ownership, and the user experience. Use [how](../explanation/PLAYBOOK.md#how) for unfamiliar subsystems. Read [Model the domain](../../principles/model-the-domain.md) and [Experience first](../../principles/experience-first.md).
2. Follow [planning](../planning/PLAYBOOK.md), or locate the approval for an existing sketch/spec.
3. Name deliverables, dependency order, the implementation writer, and validation. Use [orchestration](../../references/orchestration.md) for useful independent work.
4. Implement the smallest complete behavior. Keep a concise account of assumptions and resolve material deviations before changing the agreed design.
5. Run [verification](../../references/verification.md), then [finish delivery](../finish-delivery/PLAYBOOK.md).

Done means accepted behavior is implemented, cleaned up, verified, published to the intended PR, and required CI is verified green. Report remaining gaps as incomplete, not as follow-up polish that hides an unmet requirement.
