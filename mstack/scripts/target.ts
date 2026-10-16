import { PrError, json, object, positive, text, type Gh } from "./gh.ts";

export interface Options {
  command: "target" | "threads" | "checks" | "logs";
  repo?: string;
  pr?: string;
  timeoutMs: number;
}
export interface Target {
  repository: string;
  number: number;
  url: string;
  headSha: string;
  headBranch: string;
  baseBranch: string;
  hostname: string;
}
const REPO = /^[^/\s]+\/[^/\s]+$/u;
export function repository(value: string): string {
  if (!REPO.test(value) || value.includes(":") || value.includes("?") || value.includes("#")) throw new PrError("arguments", "--repo must be OWNER/REPO");
  return value;
}
export function prUrl(value: string): { repository: string; number: number; hostname: string } {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new PrError("arguments", "--pr must be a positive number or HTTPS PR URL");
  }
  const match = /^\/([^/]+)\/([^/]+)\/pull\/([0-9]+)\/?$/u.exec(url.pathname);
  if (url.protocol !== "https:" || url.username || url.password || url.port || !match)
    throw new PrError("arguments", "--pr must be a positive number or HTTPS PR URL");
  return { repository: repository(`${match[1]}/${match[2]}`), number: positive(Number(match[3]), "PR number"), hostname: url.hostname };
}
export function parseArgs(args: string[]): Options {
  const command = args.shift();
  if (!["target", "threads", "checks", "logs"].includes(command ?? ""))
    throw new PrError("arguments", "Usage: bun pr.ts <target|threads|checks|logs> [--repo OWNER/REPO] [--pr NUMBER|HTTPS_URL] [--timeout-ms N]");
  const options: Options = { command: command as Options["command"], timeoutMs: 30_000 };
  const seen = new Set<string>();
  while (args.length) {
    const flag = args.shift()!;
    if (!["--repo", "--pr", "--timeout-ms"].includes(flag) || seen.has(flag)) throw new PrError("arguments", `Unknown or repeated option: ${flag}`);
    seen.add(flag);
    const value = args.shift();
    if (!value) throw new PrError("arguments", `Missing value for ${flag}`);
    if (flag === "--repo") options.repo = repository(value);
    else if (flag === "--pr") options.pr = value;
    else options.timeoutMs = positive(Number(value), "timeout milliseconds");
  }
  if (options.pr && !/^[0-9]+$/u.test(options.pr)) {
    const selector = prUrl(options.pr);
    if (options.repo && options.repo.toLowerCase() !== selector.repository.toLowerCase())
      throw new PrError("arguments", "Conflicting --repo and PR URL repositories");
  } else if (options.pr) positive(Number(options.pr), "PR number");
  return options;
}
export function repoArg(target: Pick<Target, "repository" | "hostname">): string {
  // gh accepts [HOST/]OWNER/REPO. Pin even github.com rather than inheriting GH_HOST.
  return `${target.hostname}/${target.repository}`;
}
export const TARGET_FIELDS = "number,url,headRefOid,headRefName,baseRefName";
export function decodeTarget(value: unknown): Target {
  const v = object(value);
  const url = text(v.url, "PR URL", true),
    parsed = prUrl(url);
  const number = positive(v.number, "PR number");
  if (number !== parsed.number) throw new PrError("invalid-data", "PR URL and number disagree");
  return {
    ...parsed,
    number,
    url,
    headSha: text(v.headRefOid, "head SHA", true),
    headBranch: text(v.headRefName, "head branch", true),
    baseBranch: text(v.baseRefName, "base branch", true),
  };
}
export async function resolveTarget(gh: Gh, options: Options): Promise<Target> {
  if (!options.pr) {
    // gh rejects --repo without a PR/branch selector. Resolve the local branch first.
    const current = decodeTarget(json((await gh(["pr", "view", "--json", TARGET_FIELDS])).stdout));
    if (options.repo && (current.repository.toLowerCase() !== options.repo.toLowerCase() || current.hostname !== "github.com"))
      throw new PrError("target-mismatch", "Current branch PR is outside --repo; supply an explicit --pr number or URL");
    return current;
  }
  const fromUrl = options.pr && !/^[0-9]+$/u.test(options.pr) ? prUrl(options.pr) : undefined;
  let repo = options.repo ?? fromUrl?.repository;
  let hostname = fromUrl?.hostname ?? "github.com";
  if (!repo) {
    const v = object(json((await gh(["repo", "view", "--json", "nameWithOwner,url"])).stdout));
    repo = repository(text(v.nameWithOwner, "repository", true));
    const url = new URL(text(v.url, "repository URL", true));
    if (url.protocol !== "https:") throw new PrError("invalid-data", "Invalid repository URL");
    hostname = url.hostname;
  }
  const args = ["pr", "view"];
  if (options.pr) args.push(String(fromUrl?.number ?? options.pr));
  args.push("--repo", repoArg({ repository: repo, hostname }), "--json", TARGET_FIELDS);
  const target = decodeTarget(json((await gh(args)).stdout));
  if (
    target.repository.toLowerCase() !== repo.toLowerCase() ||
    target.hostname !== hostname ||
    (options.pr && target.number !== Number(fromUrl?.number ?? options.pr))
  )
    throw new PrError("target-mismatch", "gh returned a different PR than the selected target");
  return target;
}
export async function observeTarget(gh: Gh, target: Target): Promise<Target> {
  return decodeTarget(json((await gh(["pr", "view", String(target.number), "--repo", repoArg(target), "--json", TARGET_FIELDS])).stdout));
}
export const sameTarget = (a: Target, b: Target) =>
  a.number === b.number && a.url === b.url && a.headSha === b.headSha && a.repository === b.repository && a.hostname === b.hostname;
