import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classify, report } from "../../../mstack/scripts/docs.ts";

const script = fileURLToPath(new URL("../../../mstack/scripts/docs.ts", import.meta.url));
const temporary: string[] = [];
afterEach(async () => {
  for (const dir of temporary.splice(0)) await rm(dir, { recursive: true, force: true });
});

function git(cwd: string, args: string[], date = "2026-01-01T00:00:00Z") {
  const env = { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null" };
  const child = Bun.spawnSync(["git", "-c", "user.name=Test", "-c", "user.email=test@example.invalid", "-c", "commit.gpgsign=false", ...args], { cwd, env });
  if (child.exitCode !== 0) throw new Error(child.stderr.toString());
  return child.stdout.toString().trim();
}
async function repository(files: Record<string, string>) {
  const root = await mkdtemp(fileURLToPath(new URL("../.docs-test-", import.meta.url)));
  temporary.push(root);
  git(root, ["init", "--quiet"]);
  await write(root, files);
  return root;
}
async function write(root: string, files: Record<string, string>) {
  for (const [path, text] of Object.entries(files)) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), text);
  }
}
function commit(root: string, date: string) {
  git(root, ["add", "--all"]);
  git(root, ["commit", "--quiet", "--message", "snapshot"], date);
  return git(root, ["rev-parse", "HEAD"]);
}
function cli(cwd: string, args: string[]) {
  const child = Bun.spawnSync([process.execPath, script, ...args], { cwd });
  return { code: child.exitCode, stdout: child.stdout.toString(), stderr: child.stderr.toString() };
}

test("classifies indexes, records, living docs, and files outside the layout", () => {
  expect(classify(["README.md", "adr/0001-queue.md", "guides/deploy.md", "notes.md", "plans/q3.md", "reference/README.md"])).toEqual({
    indexes: ["README.md"],
    records: ["adr/0001-queue.md"],
    living: ["guides/deploy.md", "notes.md", "plans/q3.md", "reference/README.md"],
    outsideLayout: ["notes.md", "plans/q3.md"],
  });
});

test("a folder with its own README is a product that repeats the layout", () => {
  expect(classify(["README.md", "api/README.md", "api/adr/0001-auth.md", "api/guides/rotate-keys.md", "api/SUMMARY.md"])).toEqual({
    indexes: ["README.md", "api/README.md"],
    records: ["api/adr/0001-auth.md"],
    living: ["api/SUMMARY.md", "api/guides/rotate-keys.md"],
    outsideLayout: ["api/SUMMARY.md"],
  });
});

test("a conforming repository reports no findings", async () => {
  const root = await repository({
    "README.md": "# App\n\nSee [the docs](docs/README.md) and `src/server.ts`.\n",
    "src/server.ts": "",
    "docs/README.md": "# Docs\n\n- [Deploy](guides/deploy.md): for operators.\n- [Queue decision](adr/0001-queue.md)\n",
    "docs/guides/deploy.md": "# How to deploy\n\nRun `src/server.ts`. Return to the [index](../README.md#docs).\n",
    "docs/adr/0001-queue.md": "# Use a queue\n",
  });
  const result = await report(root);
  expect(result).toMatchObject({
    indexes: ["docs/README.md"],
    records: ["docs/adr/0001-queue.md"],
    living: ["docs/guides/deploy.md"],
    unlisted: [],
    outsideLayout: [],
    brokenLinks: [],
    pathCandidates: [],
    specs: [],
    counts: { docs: 2, records: 1, specs: 0 },
  });
  expect(result).not.toHaveProperty("baseline");
});

test("reports unlisted docs, files outside the layout, broken links, and missing paths with line numbers", async () => {
  const root = await repository({
    "README.md": "# App\n\nRead [setup](docs/guides/setup.md).\n",
    "src/server.ts": "",
    "docs/README.md": "# Docs\n\n- [Deploy](guides/deploy.md)\n- [Gone](guides/gone.md)\n",
    "docs/guides/deploy.md": [
      "# How to deploy",
      "",
      "```sh",
      "cat `src/missing-in-fence.ts` [fenced](nowhere.md)",
      "```",
      "",
      "Edit `src/worker.ts:12` and `src/server.ts`, import `./worker.ts`, then send `application/json` to [the site](https://example.com).",
      "",
    ].join("\n"),
    "docs/guides/orphan.md": "# Orphan\n",
    "docs/IMPLEMENTATION_SUMMARY.md": "# Summary\n",
    "docs/api/README.md": "# API docs\n",
  });
  const result = await report(root);
  expect(result.unlisted).toEqual(["docs/IMPLEMENTATION_SUMMARY.md", "docs/api/README.md", "docs/guides/orphan.md"]);
  expect(result.outsideLayout).toEqual(["docs/IMPLEMENTATION_SUMMARY.md"]);
  expect(result.brokenLinks).toEqual([
    { file: "docs/README.md", line: 4, target: "guides/gone.md" },
    { file: "README.md", line: 3, target: "docs/guides/setup.md" },
  ]);
  expect(result.pathCandidates).toEqual([{ file: "docs/guides/deploy.md", line: 7, path: "src/worker.ts" }]);
});

test("reference-style links list docs and are checked, and footnotes are not links", async () => {
  const root = await repository({
    "docs/README.md":
      "# Docs\n\n- [Deploy][deploy]\n- [Gone][gone]\n- A note.[^1]\n\n[deploy]: guides/deploy.md\n[gone]: <guides/gone.md>\n[site]: https://example.com\n[^1]: not/a-link.md\n",
    "docs/guides/deploy.md": "# How to deploy\n",
  });
  const result = await report(root);
  expect(result.unlisted).toEqual([]);
  expect(result.brokenLinks).toEqual([{ file: "docs/README.md", line: 8, target: "guides/gone.md" }]);
});

test("fenced blocks indented inside a list are ignored", async () => {
  const root = await repository({
    "src/server.ts": "",
    "docs/README.md": "# Docs\n\n- [Deploy](guides/deploy.md)\n",
    "docs/guides/deploy.md":
      "# How to deploy\n\n- Step:\n\n  ```md\n  [Example](not-a-real-file.md) and `src/absent.ts`\n  ```\n\n  Then read [the missing page](missing.md).\n",
  });
  const result = await report(root);
  expect(result.brokenLinks).toEqual([{ file: "docs/guides/deploy.md", line: 9, target: "missing.md" }]);
  expect(result.pathCandidates).toEqual([]);
});

test("without a root index every doc is unlisted and the limitation is named", async () => {
  const root = await repository({ "docs/guides/deploy.md": "# How to deploy\n" });
  const result = await report(root);
  expect(result.unlisted).toEqual(["docs/guides/deploy.md"]);
  expect(result.limitations).toEqual(["docs/README.md is missing, so no doc can be listed in the root index"]);
});

test("specs are ordered oldest first with ages, and an uncommitted spec has no date", async () => {
  const root = await repository({ "specs/old.md": "# Old\n" });
  commit(root, "2026-01-01T00:00:00Z");
  await write(root, { "specs/recent.md": "# Recent\n" });
  commit(root, "2026-03-01T00:00:00Z");
  await write(root, { "specs/draft.md": "# Draft\n" });
  const result = await report(root, { now: new Date("2026-03-11T00:00:00Z") });
  expect(result.specs.map((spec) => [spec.path, spec.ageDays])).toEqual([
    ["specs/old.md", 69],
    ["specs/recent.md", 10],
    ["specs/draft.md", null],
  ]);
  expect(result.specs[2].lastCommit).toBeNull();
  expect(result.counts.specs).toBe(3);
});

test("--since compares counts with an earlier revision", async () => {
  const root = await repository({ "docs/README.md": "# Docs\n", "docs/guides/deploy.md": "# Deploy\n", "specs/a.md": "# A\n", "specs/b.md": "# B\n" });
  const first = commit(root, "2026-01-01T00:00:00Z");
  await rm(join(root, "specs/a.md"));
  await write(root, { "docs/adr/0001-queue.md": "# Queue\n", "docs/architecture/queue.md": "# About the queue\n" });
  commit(root, "2026-02-01T00:00:00Z");
  const result = await report(root, { since: first });
  expect(result.baseline).toEqual({ revision: first, docs: 1, records: 0, specs: 2 });
  expect(result.counts).toEqual({ docs: 3, records: 1, specs: 1 });
  await expect(report(root, { since: "no-such-revision" })).rejects.toThrow("cannot resolve revision no-such-revision");
});

test("the CLI finds the repository root, prints one JSON document, and exits 2 only for --check findings", async () => {
  const root = await repository({ "docs/README.md": "# Docs\n", "docs/notes.md": "# Notes\n" });
  const plain = cli(join(root, "docs"), []);
  expect(plain.code).toBe(0);
  expect(JSON.parse(plain.stdout).outsideLayout).toEqual(["docs/notes.md"]);
  expect(cli(root, ["--check"]).code).toBe(2);
  await rm(join(root, "docs/notes.md"));
  expect(cli(root, ["--check"]).code).toBe(0);
});

test("the CLI rejects invalid arguments without output on stdout", async () => {
  const root = await repository({});
  for (const args of [["--unknown"], ["--since"], ["--root", root, "--root", root], ["--since", "no-such-revision"], ["--root", join(root, "absent")]]) {
    const result = cli(root, args);
    expect(result.code).toBe(1);
    expect(result.stdout).toBe("");
    expect(result.stderr).toStartWith("mstack docs: ");
  }
});
