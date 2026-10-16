import { summarizeFailedLog, truncate } from "./actions-log.ts";
import { snapshot } from "./checks.ts";
import { array, errorMessage, json, object, positive, PrError, text, type Gh } from "./gh.ts";
import { observeTarget, repoArg, sameTarget, type Target } from "./target.ts";

interface RunSelector {
  runId: string;
  attempt?: string;
  jobId?: string;
}
const nullableText = (value: unknown, field: string) => (value === null ? null : text(value, field));
export function actionsSelector(link: string, target: Target): RunSelector | undefined {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return;
  }
  if (url.protocol !== "https:" || url.hostname !== target.hostname || url.port || url.username || url.password) return;
  const match = /^\/([^/]+)\/([^/]+)\/actions\/runs\/([0-9]+)(?:\/attempts\/([0-9]+))?(?:\/job\/([0-9]+))?\/?$/u.exec(url.pathname);
  if (
    !match ||
    `${match[1]}/${match[2]}`.toLowerCase() !== target.repository.toLowerCase() ||
    [match[3], match[4], match[5]].some((id) => id !== undefined && !/^[1-9][0-9]*$/u.test(id))
  )
    return;
  return { runId: match[3], ...(match[4] ? { attempt: match[4] } : {}), ...(match[5] ? { jobId: match[5] } : {}) };
}
export async function logs(gh: Gh, target: Target) {
  const checks = await snapshot(gh, target);
  const limitations = [...checks.limitations];
  const failures: { runId?: string; section: string; message: string }[] = [];
  const evidence: { selector: RunSelector; summary?: unknown; failedLog?: string }[] = [];
  if (!checks.stable)
    return {
      target,
      checks,
      evidence,
      failures: [{ section: "snapshot", message: "PR changed before log collection; rerun logs" }],
      limitations,
      partial: true,
    };
  const selected = new Map<string, RunSelector>();
  const failed = checks.checks.filter(
    ({ check }) =>
      ["fail", "cancel"].includes(check.bucket.toLowerCase()) ||
      ["failure", "timed_out", "action_required", "cancelled", "startup_failure"].includes(check.state.toLowerCase()),
  );
  for (const { check } of failed) {
    const selector = actionsSelector(check.link, target);
    if (!selector) {
      limitations.push(`No trusted Actions run link for failed check ${truncate(check.name, 200)}; external URLs are not followed.`);
      continue;
    }
    selected.set(JSON.stringify(selector), selector);
  }
  if (selected.size > 5) limitations.push(`Bounded collection: ${selected.size - 5} additional failed Actions targets omitted.`);
  for (const selector of [...selected.values()].slice(0, 5)) {
    const item: (typeof evidence)[number] = { selector };
    evidence.push(item);
    const args = ["run", "view", selector.runId, "--repo", repoArg(target)];
    if (selector.attempt) args.push("--attempt", selector.attempt);
    let verified = false;
    try {
      const run = object(json((await gh([...args, "--json", "databaseId,url,headSha,status,conclusion,name,jobs"])).stdout));
      if (String(run.databaseId) !== selector.runId || text(run.headSha, "run head SHA", true) !== target.headSha)
        throw new PrError("stale-run", "Run ID/head SHA does not match selected PR head; logs not read");
      const url = text(run.url, "run URL", true),
        returned = actionsSelector(url, target);
      if (!returned || returned.runId !== selector.runId) throw new PrError("invalid-data", "Run URL does not match selected Actions target");
      const jobs = array(run.jobs).map((row) => {
        const job = object(row);
        const name = nullableText(job.name, "job name");
        return {
          databaseId: positive(job.databaseId, "job ID"),
          name: name === null ? null : truncate(name, 500),
          status: text(job.status, "job status"),
          conclusion: nullableText(job.conclusion, "job conclusion"),
        };
      });
      // gh --job ignores the positional run ID, so establish membership before reading logs.
      if (selector.jobId && !jobs.some((job) => String(job.databaseId) === selector.jobId))
        throw new PrError("job-mismatch", "Selected job does not belong to the verified run/attempt; logs not read");
      if (jobs.length > 100) limitations.push(`Run ${selector.runId}: job summary limited to 100 of ${jobs.length} jobs.`);
      const name = nullableText(run.name, "run name");
      item.summary = {
        url,
        headSha: run.headSha,
        status: text(run.status, "run status"),
        conclusion: nullableText(run.conclusion, "run conclusion"),
        name: name === null ? null : truncate(name, 500),
        jobs: jobs.slice(0, 100),
      };
      verified = true;
    } catch (error) {
      failures.push({ runId: selector.runId, section: "run-summary", message: errorMessage(error) });
    }
    if (verified) {
      try {
        const logArgs = [...args, "--log-failed"];
        if (selector.jobId) logArgs.push("--job", selector.jobId);
        item.failedLog = summarizeFailedLog((await gh(logArgs)).stdout);
      } catch (error) {
        failures.push({ runId: selector.runId, section: "failed-log", message: errorMessage(error) });
      }
    }
  }
  try {
    const observed = await observeTarget(gh, target);
    if (!sameTarget(target, observed))
      failures.push({
        section: "after-logs",
        message: "PR head or identity changed during log collection; evidence belongs to the captured head, not the current PR",
      });
  } catch (error) {
    failures.push({ section: "after-logs", message: errorMessage(error) });
  }
  if (!failed.length) limitations.push("No completed failed checks reported; no failure logs collected. This does not establish passing checks.");
  return {
    target,
    checks,
    evidence,
    failures,
    limitations,
    partial: failures.length > 0 || selected.size > 5 || failed.some(({ check }) => !actionsSelector(check.link, target)),
  };
}
