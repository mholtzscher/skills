# Bug fix

Read [Question the premise](../principles/question-the-premise.md).

1. Establish the symptom and affected revision. Reproduce it on the real boundary when possible. Inspect existing tests, logs, traces, and relevant consumers. If reproduction is unavailable, state the missing evidence and limit causal claims.
2. Trace the cause rather than treating the first suspicious line as proof. Explain the mechanism with a focused example or failing case.
3. Follow [planning](planning.md) and obtain approval of the fix sketch/spec. An approved issue description alone is not an approved implementation shape unless the conversation settled that shape.
4. Add a regression test when it meaningfully detects this defect. Establish its failing behavior before the fix when feasible; preserve evidence when a pre-fix run is expensive or external.
5. Fix the cause within scope. Rerun the reproduction and material regression checks, using [verification](../references/verification.md).
6. [Finish delivery](finish-delivery.md). Explain what caused the failure, what changed, and what evidence closes it.
