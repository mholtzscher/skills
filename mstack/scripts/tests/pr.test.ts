import { describe, expect, test } from "bun:test";
import { chmod, copyFile, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { classify, type Check, type Read } from "../checks.ts";
import { createGh } from "../gh.ts";
import { summarizeFailedLog } from "../actions-log.ts";
import { actionsSelector } from "../logs.ts";
import { parseArgs, type Target } from "../target.ts";
import cases from "./fixtures/classification.json";

const target: Target = {
  repository: "owner/repo",
  number: 17,
  url: "https://github.com/owner/repo/pull/17",
  hostname: "github.com",
  headSha: "abc123",
  headBranch: "feature",
  baseBranch: "main",
};
const wire = { number: 17, url: target.url, headRefOid: target.headSha, headRefName: target.headBranch, baseRefName: target.baseBranch };
const check = (name: string, overrides: Partial<Check> = {}): Check => ({
  name,
  workflow: "CI",
  event: "pull_request",
  link: `https://checks.example/${name}`,
  bucket: "pass",
  state: "SUCCESS",
  startedAt: "",
  completedAt: "",
  description: "",
  ...overrides,
});
const read = (names: string[] | null): Read =>
  names === null
    ? { kind: "unavailable", message: "denied" }
    : names.length
      ? { kind: "checks", checks: names.map((name) => check(name)) }
      : { kind: "none-reported" };
interface Response {
  includes: string[];
  stdout?: unknown;
  stderr?: string;
  code?: number;
  hang?: boolean;
  bytes?: number;
}
const view = (value: unknown = wire): Response => ({ includes: ["pr", "view"], stdout: value });
const all = (value: unknown, code = 0): Response => ({ includes: ["pr", "checks"], stdout: value, code });
const required = (value: unknown, code = 0): Response => ({ includes: ["checks", "--required"], stdout: value, code });

async function fixture(responses: Response[], run: (env: Record<string, string>, state: string) => Promise<void>) {
  const dir = await mkdtemp(join(existsSync("/tmp/opencode") ? "/tmp/opencode" : tmpdir(), "mstack-test-"));
  const state = join(dir, "state"),
    data = join(dir, "fixture.json"),
    gh = join(dir, "gh");
  await copyFile(new URL("./fake-gh.ts", import.meta.url), gh);
  await chmod(gh, 0o755);
  await writeFile(data, JSON.stringify(responses));
  await writeFile(state, "0");
  const env = { ...process.env, MSTACK_FAKE_FIXTURE: data, MSTACK_FAKE_STATE: state } as Record<string, string>;
  // Include Bun's directory for the fake executable's /usr/bin/env shebang.
  env.PATH = `${dir}${delimiter}${process.execPath.slice(0, process.execPath.lastIndexOf("/"))}${delimiter}${process.env.PATH}`;
  try {
    await run(env, state);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
async function cli(env: Record<string, string>, args: string[]) {
  const child = Bun.spawn([process.execPath, new URL("../pr.ts", import.meta.url).pathname, ...args], { env, stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, code] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  return { stdout, stderr, code, json: stdout ? JSON.parse(stdout) : undefined };
}
const selected = (command: string) => [command, "--repo", "owner/repo", "--pr", "17"];

describe("fixture-driven conservative classifier", () => {
  for (const c of cases)
    test(c.name, () => {
      const observed = c.changed ? { ...target, [c.changed]: c.changed === "number" ? 18 : "changed" } : target;
      const snapshot = classify(target, observed, read(c.all), read(c.required));
      expect(snapshot.checks.map((c) => c.requirement) as string[]).toEqual(c.expected);
      if (c.knowledge) expect(snapshot.requiredKnowledge).toBe(c.knowledge);
      if (!c.all.length) expect(snapshot.limitations.join(" ")).toContain("not successful");
    });
  test("identity includes workflow, event and link; evidence is preserved", () => {
    const first = check("build"),
      second = check("build", { workflow: "Other" }),
      third = check("build", { event: "push" }),
      fourth = check("build", { link: "https://other" });
    const input: Read = { kind: "checks", checks: [first, second, third, fourth] };
    const copy = structuredClone(input);
    const result = classify(target, target, input, { kind: "checks", checks: [first] });
    expect(result.checks.map((c) => c.requirement)).toEqual(["required", "advisory", "advisory", "advisory"]);
    expect(input).toEqual(copy);
  });
  test("skipped required checks preserve skip, never produce gate success", () => {
    const skip = check("build", { bucket: "skipping", state: "SKIPPED" });
    const result = classify(target, target, { kind: "checks", checks: [skip] }, { kind: "checks", checks: [skip] });
    expect(result.checks[0]).toEqual({ check: skip, requirement: "required" });
    expect(result.limitations.join(" ")).toContain("Skipped checks are not passes");
  });
});

describe("real fake-gh CLI boundary", () => {
  test("default current repo and PR resolve once", async () =>
    fixture([view()], async (env, state) => {
      const result = await cli(env, ["target"]);
      expect(result.code).toBe(0);
      expect(result.json).toEqual(target);
      expect(await readFile(state, "utf8")).toBe("1");
      const calls = (await readFile(`${state}.calls`, "utf8"))
        .trim()
        .split("\n")
        .map((v) => JSON.parse(v));
      expect(calls[0]).toEqual(["pr", "view", "--json", "number,url,headRefOid,headRefName,baseRefName"]);
    }));
  test("repo-only selector validates the current branch PR without invalid gh flags", async () =>
    fixture([view()], async (env, state) => {
      const result = await cli(env, ["target", "--repo", "OWNER/REPO"]);
      expect(result.code).toBe(0);
      const calls = (await readFile(`${state}.calls`, "utf8")).trim();
      expect(JSON.parse(calls)).not.toContain("--repo");
    }));
  test("repo-only selector does not silently switch to a different repository", async () =>
    fixture([view()], async (env) => {
      const result = await cli(env, ["target", "--repo", "other/repo"]);
      expect(result.code).toBe(1);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain("supply an explicit --pr");
    }));
  test("default checks pin subsequent reads to the resolved current PR", async () =>
    fixture([view(), all([check("build")]), required([check("build")]), view()], async (env, state) => {
      const result = await cli(env, ["checks"]);
      expect(result.code).toBe(0);
      const calls: string[][] = (await readFile(`${state}.calls`, "utf8"))
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));
      expect(calls[0]).not.toContain("--repo");
      expect(calls.slice(1).every((args) => args.includes("17") && args.includes("github.com/owner/repo"))).toBe(true);
    }));
  test("PR URL resolves without current-repo lookup and canonical casing survives", async () =>
    fixture([view()], async (env, state) => {
      const result = await cli(env, ["target", "--repo", "OWNER/REPO", "--pr", target.url]);
      expect(result.code).toBe(0);
      expect(result.json.repository).toBe("owner/repo");
      expect(await readFile(state, "utf8")).toBe("1");
    }));
  test("enterprise target pins the selected host in every read", async () =>
    fixture(
      [
        { includes: ["--repo", "git.example.com/owner/repo"], stdout: { ...wire, url: "https://git.example.com/owner/repo/pull/17" } },
        { includes: ["--hostname", "git.example.com", "graphql"], stdout: threadPage([]) },
      ],
      async (env) => {
        const result = await cli(env, ["threads", "--pr", "https://git.example.com/owner/repo/pull/17"]);
        expect(result.code).toBe(0);
        expect(result.json.target.hostname).toBe("git.example.com");
      },
    ));
  test("conflicting selectors spawn no gh", async () =>
    fixture([], async (env, state) => {
      const result = await cli(env, ["logs", "--repo", "other/repo", "--pr", target.url]);
      expect(result.code).toBe(1);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain("Conflicting");
      expect(await readFile(state, "utf8")).toBe("0");
    }));
  test.each(["0", "-2", "1.5", "https://github.com/owner/repo/issues/17"])("invalid PR %s spawns no gh", async (pr) =>
    fixture([], async (env, state) => {
      expect((await cli(env, ["target", "--pr", pr])).code).toBe(1);
      expect(await readFile(state, "utf8")).toBe("0");
    }),
  );
  test("returned wrong target fails closed", async () =>
    fixture([view({ ...wire, number: 18, url: "https://github.com/owner/repo/pull/18" })], async (env) => {
      const result = await cli(env, selected("target"));
      expect(result.code).toBe(1);
      expect(result.stderr).toContain("target-mismatch");
    }));
  test("checks read all then required then explicit head, retaining accepted failure/pending codes", async () =>
    fixture([view(), all([check("build")], 1), required([check("build")], 8), view()], async (env, state) => {
      const result = await cli(env, selected("checks"));
      expect(result.code).toBe(0);
      expect(result.json.checks[0].requirement).toBe("required");
      const calls = (await readFile(`${state}.calls`, "utf8"))
        .trim()
        .split("\n")
        .map((v) => JSON.parse(v));
      expect(calls[3]).toContain("17");
      expect(calls[3]).toContain("--repo");
      expect(calls).toHaveLength(4);
    }));
  test.each([0, 1, 8])("verified no-check stderr accepts exit %s without claiming passes", async (code) =>
    fixture(
      [
        view(),
        { includes: ["checks"], stderr: "no checks reported on the 'feature' branch", code },
        { includes: ["--required"], stderr: "no required checks reported", code },
        view(),
      ],
      async (env) => {
        const result = await cli(env, selected("checks"));
        expect(result.code).toBe(0);
        expect(result.json.checks).toEqual([]);
        expect(result.json.requiredKnowledge).toBe("none-reported");
      },
    ),
  );
  test.each([2, 4, 9])("no-check message cannot mask unaccepted exit %s", async (code) =>
    fixture([view(), { includes: ["checks"], stderr: "no checks reported", code }], async (env) => {
      const result = await cli(env, selected("checks"));
      expect(result.code).toBe(1);
      expect(result.stdout).toBe("");
    }),
  );
  test("an accepted exit with unrelated empty output is still an error", async () =>
    fixture([view(), { includes: ["checks"], stderr: "permission denied", code: 1 }], async (env) => {
      const result = await cli(env, selected("checks"));
      expect(result.code).toBe(1);
      expect(result.stderr).toContain("permission denied");
    }));
  test("unavailable required read keeps all evidence unknown", async () =>
    fixture([view(), all([check("build")]), { includes: ["--required"], stderr: "denied", code: 4 }, view()], async (env) => {
      const result = await cli(env, selected("checks"));
      expect(result.code).toBe(0);
      expect(result.json.checks[0].requirement).toBe("unknown");
      expect(result.json.limitations.join(" ")).toContain("denied");
    }));
  test("changed head invalidates snapshot", async () =>
    fixture([view(), all([check("build")]), required([check("build")]), view({ ...wire, headRefOid: "new-sha" })], async (env) => {
      const result = await cli(env, selected("checks"));
      expect(result.json.stable).toBe(false);
      expect(result.json.checks[0].requirement).toBe("unknown");
    }));
  test.each(["{broken", [{ name: "missing-fields" }], { checks: [] }])("malformed check shape fails with no JSON report", async (value) =>
    fixture([view(), all(value)], async (env) => {
      const result = await cli(env, selected("checks"));
      expect(result.code).toBe(1);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain("invalid-data");
    }),
  );
});

const pageInfo = (next: boolean, cursor: string | null = null) => ({ hasNextPage: next, endCursor: cursor });
const comment = (id: string) => ({
  id,
  databaseId: Number(id.slice(1)),
  author: { login: "reviewer" },
  body: `body ${id}`,
  url: `${target.url}#discussion_${id}`,
});
const connection = (nodes: unknown[], next = false, cursor: string | null = null) => ({ nodes, pageInfo: pageInfo(next, cursor) });
const thread = (id: string, comments: unknown, resolved = false) => ({ id, isResolved: resolved, path: "src/file.ts", line: 10, originalLine: 9, comments });
const threadPage = (nodes: unknown[], next = false, cursor: string | null = null) => ({
  data: { repository: { pullRequest: { reviewThreads: connection(nodes, next, cursor) } } },
});

describe("nested review pagination through CLI", () => {
  test("paginates both connections, preserves comment IDs and skips resolved threads", async () =>
    fixture(
      [
        view(),
        {
          includes: ["graphql", "reviewThreads(first:100"],
          stdout: threadPage(
            [thread("t1", connection([comment("c1")], true, "comments-next")), thread("resolved", connection([]), true)],
            true,
            "threads-next",
          ),
        },
        { includes: ["node(id:$id)", "id=t1", "cursor=comments-next"], stdout: { data: { node: { id: "t1", comments: connection([comment("c2")]) } } } },
        {
          includes: ["reviewThreads(first:100", "cursor=threads-next"],
          stdout: threadPage([thread("t2", connection([{ ...comment("c3"), author: null, databaseId: null }]))]),
        },
      ],
      async (env, state) => {
        const result = await cli(env, selected("threads"));
        expect(result.code).toBe(0);
        expect(result.json.threads.map((t: { id: string }) => t.id)).toEqual(["t1", "t2"]);
        expect(result.json.threads[0].comments.map((c: { id: string }) => c.id)).toEqual(["c1", "c2"]);
        expect(result.json.threads[1].comments[0].author).toBeNull();
        expect(result.json.threads[0].path).toBe("src/file.ts");
        expect(await readFile(state, "utf8")).toBe("4");
      },
    ));
  test("nested comment lookup failure emits no incomplete report", async () =>
    fixture(
      [
        view(),
        { includes: ["graphql"], stdout: threadPage([thread("t1", connection([comment("c1")], true, "next"))]) },
        { includes: ["id=t1"], stderr: "access denied", code: 1 },
      ],
      async (env) => {
        const result = await cli(env, selected("threads"));
        expect(result.code).toBe(1);
        expect(result.stdout).toBe("");
        expect(result.stderr).toContain("access denied");
      },
    ));
  test("GraphQL partial errors are rejected", async () =>
    fixture([view(), { includes: ["graphql"], stdout: { ...threadPage([]), errors: [{ message: "denied" }] } }], async (env) => {
      const result = await cli(env, selected("threads"));
      expect(result.code).toBe(1);
      expect(result.stderr).toContain("graphql");
    }));
  test("invalid pageInfo cannot silently truncate", async () =>
    fixture([view(), { includes: ["graphql"], stdout: threadPage([], true) }], async (env) => {
      const result = await cli(env, selected("threads"));
      expect(result.code).toBe(1);
      expect(result.stderr).toContain("without a cursor");
    }));
  test("duplicate nested comments fail as unstable pagination", async () =>
    fixture(
      [
        view(),
        { includes: ["graphql"], stdout: threadPage([thread("t1", connection([comment("c1")], true, "next"))]) },
        { includes: ["id=t1"], stdout: { data: { node: { id: "t1", comments: connection([comment("c1")]) } } } },
      ],
      async (env) => {
        const result = await cli(env, selected("threads"));
        expect(result.code).toBe(1);
        expect(result.stderr).toContain("Duplicate comment");
      },
    ));
});

const failed = check("build", { bucket: "fail", state: "FAILURE", link: "https://github.com/owner/repo/actions/runs/123/job/456" });
const run = {
  databaseId: 123,
  headSha: target.headSha,
  url: "https://github.com/owner/repo/actions/runs/123",
  name: "CI",
  status: "completed",
  conclusion: "failure",
  jobs: [{ databaseId: 456, name: "build", status: "completed", conclusion: "failure" }],
};
const logStart = [view(), all([failed], 1), required([failed], 1), view()];
describe("bounded Actions evidence", () => {
  test("selected failure is head-verified before argv-only failed-log read", async () =>
    fixture(
      [
        ...logStart,
        { includes: ["run", "123", "--json"], stdout: run },
        { includes: ["--log-failed", "--job", "456"], stdout: "build\tstep\terror: compilation failed\n" },
        view(),
      ],
      async (env, state) => {
        const result = await cli(env, selected("logs"));
        expect(result.code).toBe(0);
        expect(result.json.partial).toBe(false);
        expect(result.json.evidence[0].failedLog).toContain("compilation failed");
        const calls = (await readFile(`${state}.calls`, "utf8"))
          .trim()
          .split("\n")
          .map((v) => JSON.parse(v));
        expect(calls.every((args: string[]) => !args.some((a) => a.startsWith("https://")))).toBe(true);
      },
    ));
  test("log read failure has partial JSON and nonzero status", async () =>
    fixture([...logStart, { includes: ["--json"], stdout: run }, { includes: ["--log-failed"], stderr: "log unavailable", code: 1 }, view()], async (env) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(2);
      expect(result.json.evidence[0].summary.headSha).toBe(target.headSha);
      expect(result.json.failures[0].section).toBe("failed-log");
      expect(result.stderr).toContain("partial");
    }));
  test("stale run cannot trigger a log read", async () =>
    fixture([...logStart, { includes: ["--json"], stdout: { ...run, headSha: "wrong" } }, view()], async (env, state) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(2);
      expect(result.json.failures[0].message).toContain("head SHA");
      expect(await readFile(state, "utf8")).toBe("6");
    }));
  test("a link pairing a verified run with another run's job cannot trigger a log read", async () =>
    fixture([...logStart, { includes: ["--json"], stdout: { ...run, jobs: [{ ...run.jobs[0], databaseId: 999 }] } }, view()], async (env, state) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(2);
      expect(result.json.failures[0].message).toContain("does not belong");
      expect(result.json.evidence[0].failedLog).toBeUndefined();
      const calls: string[][] = (await readFile(`${state}.calls`, "utf8"))
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));
      expect(calls.some((args) => args.includes("--log-failed"))).toBe(false);
    }));
  test("untrusted external URLs are not executed or fetched", async () =>
    fixture(
      [view(), all([{ ...failed, link: "https://evil.example/owner/repo/actions/runs/123" }]), required([failed]), view(), view()],
      async (env, state) => {
        const result = await cli(env, selected("logs"));
        expect(result.code).toBe(2);
        expect(result.json.evidence).toEqual([]);
        expect(result.json.limitations.join(" ")).toContain("external URLs are not followed");
        expect(await readFile(state, "utf8")).toBe("5");
      },
    ));
  test("head change after evidence is visible as partial", async () =>
    fixture(
      [...logStart, { includes: ["--json"], stdout: run }, { includes: ["--log-failed"], stdout: "error: fail" }, view({ ...wire, headRefOid: "new" })],
      async (env) => {
        const result = await cli(env, selected("logs"));
        expect(result.code).toBe(2);
        expect(result.json.failures[0].section).toBe("after-logs");
      },
    ));
  test("no checks yields no log reads and does not claim successful CI", async () =>
    fixture([view(), all([]), required([]), view(), view()], async (env, state) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(0);
      expect(result.json.evidence).toEqual([]);
      expect(result.json.limitations.join(" ")).toContain("does not establish passing");
      expect(await readFile(state, "utf8")).toBe("5");
    }));
  test("unstable initial snapshot blocks run reads", async () =>
    fixture([...logStart.slice(0, 3), view({ ...wire, headRefOid: "changed" })], async (env, state) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(2);
      expect(result.json.evidence).toEqual([]);
      expect(await readFile(state, "utf8")).toBe("4");
    }));
  test("malformed run summary is visible and prevents log reads", async () =>
    fixture([...logStart, { includes: ["--json"], stdout: { ...run, jobs: "invalid" } }, view()], async (env, state) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(2);
      expect(result.json.failures[0].section).toBe("run-summary");
      expect(await readFile(state, "utf8")).toBe("6");
    }));
  test("run limit explicitly reports omitted failures", async () => {
    const failures = Array.from({ length: 6 }, (_, i) => ({ ...failed, name: `job${i}`, link: `https://github.com/owner/repo/actions/runs/${123 + i}` }));
    const reads: Response[] = [];
    for (let i = 0; i < 5; i++)
      reads.push(
        { includes: ["--json", String(123 + i)], stdout: { ...run, databaseId: 123 + i, url: `https://github.com/owner/repo/actions/runs/${123 + i}` } },
        { includes: ["--log-failed"], stdout: "error: fail" },
      );
    await fixture([view(), all(failures), required(failures), view(), ...reads, view()], async (env, state) => {
      const result = await cli(env, selected("logs"));
      expect(result.code).toBe(2);
      expect(result.json.evidence).toHaveLength(5);
      expect(result.json.limitations.join(" ")).toContain("1 additional failed Actions targets omitted");
      expect(await readFile(state, "utf8")).toBe("15");
    });
  });
  test("summarizer strips ANSI, focuses errors, falls back to tail and bounds output", () => {
    const lines = Array.from({ length: 1000 }, (_, i) => `job\tstep\t${i === 100 ? "\u001b[31merror: crash\u001b[0m" : `line ${i}`}`).join("\n");
    const result = summarizeFailedLog(lines);
    expect(result).toContain("Error-focused excerpts");
    expect(result).toContain("error: crash");
    expect(result).toContain("line 999");
    expect(result).not.toContain("\u001b");
    expect(summarizeFailedLog("plain output")).toContain("No obvious error markers");
    expect(summarizeFailedLog("")).toContain("No failed-step logs");
    expect(summarizeFailedLog("error: " + "a".repeat(40_000)).length).toBeLessThanOrEqual(22_000);
  });
  test.each([
    "https://github.com/other/repo/actions/runs/123",
    "http://github.com/owner/repo/actions/runs/123",
    "https://github.com@evil.example/owner/repo/actions/runs/123",
    "https://github.com/owner/repo/actions/runs/123/anything",
    "https://github.com/owner/repo/actions/runs/0",
  ])("rejects unsafe Actions target %s", (value) => expect(actionsSelector(value, target)).toBeUndefined());
});

describe("process resource limits", () => {
  test("CLI kills a gh process that ignores SIGTERM after timeout", async () =>
    fixture([{ includes: ["pr", "view"], hang: true }], async (env) => {
      const started = performance.now(),
        result = await cli(env, [...selected("target"), "--timeout-ms", "150"]);
      expect(result.code).toBe(1);
      expect(result.stderr).toContain("timeout");
      expect(performance.now() - started).toBeLessThan(2500);
    }));
  test("large subprocess output is an error, not truncated JSON", async () =>
    fixture([{ includes: ["pr", "view"], bytes: 9 * 1024 * 1024 }], async (env) => {
      const result = await cli(env, selected("target"));
      expect(result.code).toBe(1);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain("output-limit");
    }));
  test("missing gh provides a useful spawn error", async () => {
    const old = process.env.PATH;
    process.env.PATH = "/nonexistent";
    try {
      await expect(createGh(100)(["pr", "view"])).rejects.toThrow("Cannot execute gh");
    } finally {
      process.env.PATH = old;
    }
  });
});

test("argument parser accepts matching case-insensitive selectors and enterprise URLs", () => {
  expect(parseArgs(["target", "--repo", "OWNER/REPO", "--pr", target.url]).repo).toBe("OWNER/REPO");
  expect(parseArgs(["target", "--pr", "https://git.example.com/owner/repo/pull/17"]).pr).toContain("git.example.com");
});
