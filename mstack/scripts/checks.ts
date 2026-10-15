// Deterministic classification adapted from workflow-tools/pr/check-classification.ts.
import { array, errorMessage, json, object, PrError, text, type Gh } from "./gh.ts";
import { observeTarget, repoArg, sameTarget, type Target } from "./target.ts";

export const CHECK_FIELDS = ["bucket", "completedAt", "description", "event", "link", "name", "startedAt", "state", "workflow"] as const;
export type Check = Record<(typeof CHECK_FIELDS)[number], string>;
export type Read = { kind: "checks"; checks: Check[] } | { kind: "none-reported" } | { kind: "unavailable"; message: string };
export function decodeChecks(value: unknown): Check[] {
  return array(value).map((row) => {
    const v = object(row);
    return Object.fromEntries(CHECK_FIELDS.map((key) => [key, text(v[key], `check.${key}`)])) as Check;
  });
}
export async function readChecks(gh: Gh, target: Target, required = false): Promise<Read> {
  const args = ["pr", "checks", String(target.number), "--repo", repoArg(target), "--json", CHECK_FIELDS.join(",")];
  if (required) args.push("--required");
  const result = await gh(args, [0, 1, 8]);
  if (!result.stdout.trim()) {
    const pattern = required ? /^no required checks reported(?:\s|$)/iu : /^no checks reported(?:\s|$)/iu;
    if (pattern.test(result.stderr.trim())) return { kind: "none-reported" };
    throw new PrError("gh", result.stderr.trim().slice(0, 4000) || "gh pr checks returned no check data");
  }
  const checks = decodeChecks(json(result.stdout));
  return checks.length ? { kind: "checks", checks } : { kind: "none-reported" };
}
const key = (check: Check) => JSON.stringify([check.name, check.workflow, check.event, check.link]);
const counts = (checks: Check[]) => {
  const map = new Map<string, number>();
  for (const check of checks) map.set(key(check), (map.get(key(check)) ?? 0) + 1);
  return map;
};
export function classify(target: Target, observed: Target, all: Read, required: Read) {
  const limitations = [
    "Only reported head-rollup checks are visible; unreported required jobs may be missing. Skipped checks are not passes. This is not branch-protection, ruleset, mergeability, or verified merge-gate evidence.",
  ];
  let requiredKnowledge = required.kind === "checks" ? "reported" : required.kind;
  if (required.kind === "unavailable") limitations.push(`Required-check classification unavailable: ${required.message}`);
  if (required.kind === "none-reported") limitations.push("No required subset reported: this does not prove an empty requirement set or a passing gate.");
  if (all.kind === "none-reported") limitations.push("No checks reported; this is not successful checks.");
  const stable = sameTarget(target, observed);
  if (!stable) limitations.push("Unstable snapshot: PR head or identity changed during collection; classification is unknown. Rerun checks.");
  const values = all.kind === "checks" ? all.checks : [];
  const requiredValues = required.kind === "checks" ? required.checks : [];
  const allCounts = counts(values),
    requiredCounts = counts(requiredValues);
  const consistent = [...requiredCounts.keys()].every((id) => allCounts.has(id));
  if (!consistent) {
    requiredKnowledge = "unavailable";
    limitations.push("Unstable snapshot: non-atomic all/required reads disagree; classification is unknown. Rerun checks.");
  }
  const ambiguous = (c: Check) => allCounts.get(key(c)) !== 1 || (requiredCounts.get(key(c)) ?? 0) > 1;
  if (values.some(ambiguous)) limitations.push("Ambiguous duplicate check keys are classified as unknown.");
  const checks = values.map((check) => ({
    check,
    requirement:
      !stable || !consistent || required.kind !== "checks" || requiredValues.length === 0 || ambiguous(check)
        ? ("unknown" as const)
        : requiredCounts.has(key(check))
          ? ("required" as const)
          : ("advisory" as const),
  }));
  return { target, observed, stable, requiredKnowledge, allKnowledge: all.kind, checks, limitations };
}
export async function snapshot(gh: Gh, target: Target) {
  const all = await readChecks(gh, target);
  let required: Read;
  try {
    required = await readChecks(gh, target, true);
  } catch (error) {
    required = { kind: "unavailable", message: errorMessage(error) };
  }
  return classify(target, await observeTarget(gh, target), all, required);
}
