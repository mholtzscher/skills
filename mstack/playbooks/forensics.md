# Runtime and trace forensics

The default deliverable is a diagnosis, not a fix.

For a live symptom, establish the process/revision, reproduction, baseline, and instrumentation that can distinguish competing causes. Use minimally invasive observation and account for observer overhead. Permission to diagnose is not permission to alter production data or restart an unrelated service.

For a captured trace/profile/heap artifact, establish capture conditions, time window, workload, symbols, and missing context. Inspect the artifact with appropriate tooling; distinguish what it records from what would require a new capture.

Build a causal account with source and measurement evidence, competing hypotheses, and specific gaps. Use [Explain the number](../principles/explain-the-number.md). End when the diagnosis is supported or the next discriminating observation is named. Route a requested fix through [bug fix](bug-fix.md) or [performance](performance.md), retaining the approval boundary.
