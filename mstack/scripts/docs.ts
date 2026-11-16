#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";

const FOLDERS = ["adr", "architecture", "guides", "reference", "tutorials"];
const USAGE = "usage: bun docs.ts [--root DIR] [--since REVISION] [--check]";
// Inline links, then reference definitions such as "[deploy]: guides/deploy.md". Footnote definitions are not links.
const LINKS = [/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/gu, /^ {0,3}\[(?!\^)[^\]]+\]:\s*<?([^\s>]+)>?/gu];

export class DocsError extends Error {}

type Located = { file: string; line: number };
type Counts = { docs: number; records: number; specs: number };

/** Sorts Markdown paths relative to `docs/` into indexes, records, living docs, and files outside the layout. */
export function classify(paths: string[]) {
  const products = new Set(paths.filter((path) => /^[^/]+\/README\.md$/u.test(path)).map((path) => path.split("/")[0]));
  for (const folder of FOLDERS) products.delete(folder);
  const result = { indexes: [] as string[], records: [] as string[], living: [] as string[], outsideLayout: [] as string[] };
  for (const path of [...paths].sort()) {
    const parts = path.split("/");
    const rest = products.has(parts[0]) ? parts.slice(1) : parts;
    if (rest.length === 1 && rest[0] === "README.md") result.indexes.push(path);
    else if (rest.length > 1 && rest[0] === "adr") result.records.push(path);
    else {
      result.living.push(path);
      if (rest.length < 2 || !FOLDERS.includes(rest[0])) result.outsideLayout.push(path);
    }
  }
  return result;
}

function git(root: string, args: string[]) {
  const child = Bun.spawnSync(["git", "-C", root, ...args], { stdout: "pipe", stderr: "pipe" });
  return child.exitCode === 0 ? child.stdout.toString().trim() : null;
}

async function markdownFiles(directory: string): Promise<string[]> {
  if (!existsSync(directory)) return [];
  const found: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await markdownFiles(path)));
    else if (entry.isFile() && entry.name.endsWith(".md")) found.push(path);
  }
  return found;
}

/** Yields each regex match outside fenced code blocks with its 1-based line number. */
function* matches(text: string, pattern: RegExp) {
  // Blank fenced blocks but keep their newlines, so reported line numbers match the file.
  const prose = text.replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gmu, (block) => block.replace(/[^\n]/gu, ""));
  for (const [index, line] of prose.split("\n").entries()) for (const match of line.matchAll(pattern)) yield { line: index + 1, value: match[1] };
}

function counts(docs: string[], specs: string[]): Counts {
  const sorted = classify(docs);
  return { docs: sorted.records.length + sorted.living.length, records: sorted.records.length, specs: specs.length };
}

export async function report(root: string, options: { since?: string; now?: Date } = {}) {
  root = resolve(root);
  const repoPath = (path: string) => relative(root, path).split(sep).join("/");
  const docsRoot = join(root, "docs");
  const docFiles = await markdownFiles(docsRoot);
  const sorted = classify(docFiles.map((path) => relative(docsRoot, path).split(sep).join("/")));
  const inDocs = (paths: string[]) => paths.map((path) => `docs/${path}`);
  const limitations: string[] = [];

  const checked = [...docFiles, ...["README.md", "GLOSSARY.md"].map((name) => join(root, name)).filter(existsSync)];
  const listed = new Set<string>();
  const brokenLinks: (Located & { target: string })[] = [];
  const pathCandidates: (Located & { path: string })[] = [];
  const indexes = new Set(inDocs(sorted.indexes));
  for (const path of checked) {
    const text = await readFile(path, "utf8");
    const file = repoPath(path);
    for (const pattern of LINKS) {
      for (const { line, value } of matches(text, pattern)) {
        if (/^(?:[a-z][a-z0-9+.-]*:|#)/iu.test(value)) continue;
        const target = resolve(dirname(path), decodeURIComponent(value.split("#")[0]));
        if (!existsSync(target)) brokenLinks.push({ file, line, target: value });
        else if (indexes.has(file)) listed.add(repoPath(target));
      }
    }
    for (const { line, value } of matches(text, /`([^`\n]+)`/gu)) {
      const candidate = value.replace(/(?::\d+(?:-\d+)?|#[\w-]+)$/u, "");
      if (!/^[\w.@-]+(?:\/[\w.@-]+)+\/?$/u.test(candidate)) continue;
      // Only a path whose first segment is a real top-level entry is likely a repository path.
      // "./x" and "../x" are usually import strings, and "." always exists, so skip them.
      const first = candidate.split("/")[0];
      if (first === "." || first === ".." || !existsSync(join(root, first))) continue;
      if (!existsSync(join(root, candidate)) && !existsSync(resolve(dirname(path), candidate))) pathCandidates.push({ file, line, path: candidate });
    }
  }

  const hasRootIndex = indexes.has("docs/README.md");
  if (docFiles.length > 0 && !hasRootIndex) limitations.push("docs/README.md is missing, so no doc can be listed in the root index");
  const mustBeListed = inDocs([...sorted.records, ...sorted.living, ...sorted.indexes.filter((path) => path !== "README.md")]);

  const tracked = git(root, ["rev-parse", "--is-inside-work-tree"]) === "true";
  if (!tracked) limitations.push("not a Git work tree, so spec dates and the baseline are unavailable");
  const now = options.now ?? new Date();
  const specs = (await markdownFiles(join(root, "specs"))).map((path) => {
    const lastCommit = (tracked && git(root, ["log", "-1", "--format=%cI", "--", repoPath(path)])) || null;
    return { path: repoPath(path), lastCommit, ageDays: lastCommit ? Math.floor((now.getTime() - Date.parse(lastCommit)) / 86_400_000) : null };
  });
  specs.sort((a, b) => (b.ageDays ?? -1) - (a.ageDays ?? -1) || a.path.localeCompare(b.path));

  let baseline: (Counts & { revision: string }) | undefined;
  if (options.since !== undefined) {
    const revision = git(root, ["rev-parse", "--verify", "--quiet", `${options.since}^{commit}`]);
    if (!revision) throw new DocsError(`cannot resolve revision ${options.since}`);
    const then = (git(root, ["ls-tree", "-r", "--name-only", revision, "--", "docs", "specs"]) ?? "").split("\n").filter((path) => path.endsWith(".md"));
    const under = (prefix: string) => then.filter((path) => path.startsWith(prefix)).map((path) => path.slice(prefix.length));
    baseline = { revision, ...counts(under("docs/"), under("specs/")) };
  }

  return {
    root,
    indexes: [...indexes],
    records: inDocs(sorted.records),
    living: inDocs(sorted.living),
    unlisted: mustBeListed.filter((path) => !listed.has(path)).sort(),
    outsideLayout: inDocs(sorted.outsideLayout),
    brokenLinks,
    pathCandidates,
    specs,
    counts: counts(
      [...sorted.indexes, ...sorted.records, ...sorted.living],
      specs.map((spec) => spec.path),
    ),
    ...(baseline ? { baseline } : {}),
    limitations,
  };
}

export async function main(args: string[]): Promise<number> {
  try {
    let root: string | undefined, since: string | undefined;
    let check = false;
    const seen = new Set<string>();
    for (let index = 0; index < args.length; index++) {
      const flag = args[index];
      if (seen.has(flag) || !["--root", "--since", "--check"].includes(flag)) throw new DocsError(USAGE);
      seen.add(flag);
      if (flag === "--check") check = true;
      else {
        const value = args[++index];
        if (!value || value.startsWith("--")) throw new DocsError(USAGE);
        if (flag === "--root") root = value;
        else since = value;
      }
    }
    root ??= git(process.cwd(), ["rev-parse", "--show-toplevel"]) ?? undefined;
    if (!root) throw new DocsError("not inside a Git work tree; pass --root DIR");
    if (!existsSync(root)) throw new DocsError(`no such directory: ${root}`);
    const result = await report(root, { since });
    console.log(JSON.stringify(result, null, 2));
    return check && (result.unlisted.length || result.outsideLayout.length || result.brokenLinks.length) ? 2 : 0;
  } catch (error) {
    console.error(`mstack docs: ${error instanceof Error ? error.message : String(error)}`);
    return 1;
  }
}
if (import.meta.main) process.exitCode = await main(process.argv.slice(2));
