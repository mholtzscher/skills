# Idempotent operations

Design retryable work to converge on the intended state after partial success. Resolve identity once, inspect the current target, and distinguish creation from update. Avoid duplicate PRs, reactions, or records.

Report exactly which writes succeeded before a failure. Retry only incomplete authorized actions against the same target. A failed metadata operation does not justify rolling back already-published code or repeating unrelated writes.
