import { afterEach, expect, test } from "bun:test";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const header = "ts\tphase\tdecision\twhy\tevidence\tresult\n";
const script = fileURLToPath(new URL("../../../mstack/scripts/decision-log.ts", import.meta.url));
const temporary: string[] = [];
afterEach(async () => {
  for (const dir of temporary.splice(0)) await rm(dir, { recursive: true, force: true });
});
async function fixture() {
  const dir = await mkdtemp(fileURLToPath(new URL("../.decision-log-test-", import.meta.url)));
  temporary.push(dir);
  return dir;
}
function cli(cwd: string, args: string[]) {
  const child = Bun.spawnSync([process.execPath, script, ...args], { cwd });
  return { code: child.exitCode, stdout: child.stdout.toString(), stderr: child.stderr.toString() };
}

test("template is the exact six-column source header", async () => {
  expect(await readFile(new URL("../../../mstack/playbooks/decision-trail/references/decision-log-template.tsv", import.meta.url), "utf8")).toBe(header);
});

test("new nested path with spaces, UTC timestamp, then sequential append preserves bytes", async () => {
  const dir = await fixture();
  const log = join(dir, "nested folder", "decisions with spaces.tsv");
  const before = Date.now();
  expect(cli(dir, [log, "frame", "chose A", "smaller", "file:12", "open"]).code).toBe(0);
  const first = await readFile(log, "utf8");
  expect(first.startsWith(header)).toBe(true);
  const row = first.slice(header.length).trimEnd().split("\t");
  expect(row.slice(1)).toEqual(["frame", "chose A", "smaller", "file:12", "open"]);
  expect(row[0]).toMatch(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/);
  expect(Date.parse(row[0])).toBeGreaterThanOrEqual(before);
  expect(Date.parse(row[0])).toBeLessThanOrEqual(Date.now());
  expect(cli(dir, [log, "verify", "kept A", "passed", "test:4", "tests green"]).code).toBe(0);
  const second = await readFile(log, "utf8");
  expect(second.startsWith(first)).toBe(true);
  expect(second.split(header)).toHaveLength(2);
  expect(second.split("\n")).toHaveLength(4);
  expect(second.slice(first.length).split("\t").slice(1).join("\t")).toBe("verify\tkept A\tpassed\ttest:4\ttests green\n");
});

test("empty existing file receives one header and empty cells survive", async () => {
  const dir = await fixture();
  const log = join(dir, "empty.tsv");
  await writeFile(log, "");
  expect(cli(dir, [log, "", "", "", "", ""]).code).toBe(0);
  const text = await readFile(log, "utf8");
  expect(text.startsWith(header)).toBe(true);
  expect(text.slice(header.length).split("\t").slice(1).join("\t")).toBe("\t\t\t\t\n");
});

test("each tab, CR and LF becomes a space and all formula prefixes are quoted", async () => {
  const dir = await fixture();
  const log = join(dir, "safe.tsv");
  expect(cli(dir, [log, "=p\t\r\n", "+d\n\n", "-why\r\r", "@e\t\t", "=r\r\n"]).code).toBe(0);
  const row = (await readFile(log, "utf8")).slice(header.length);
  expect(row.split("\t").slice(1).join("\t")).toBe("'=p   \t'+d  \t'-why  \t'@e  \t'=r  \n");
});

test("shell metacharacters are literal data, not commands", async () => {
  const dir = await fixture();
  const log = join(dir, "literal.tsv");
  const text = "$(touch owned); `touch owned` & > owned | cat 'quote' \"double\" \\ end";
  expect(cli(dir, [log, "phase", text, "why", "evidence", "result"]).code).toBe(0);
  expect((await readFile(log, "utf8")).split("\t")[7]).toBe(text);
  expect(existsSync(join(dir, "owned"))).toBe(false);
});

test("invalid arity or empty path fails before filesystem mutation", async () => {
  const dir = await fixture();
  const log = join(dir, "absent", "log.tsv");
  for (const args of [
    [],
    [log],
    [log, "p", "d", "w", "e"],
    [log, "p", "d", "w", "e", "r", "extra"],
    ["", "p", "d", "w", "e", "r"],
    ["   ", "p", "d", "w", "e", "r"],
  ]) {
    const result = cli(dir, args);
    expect(result.code).toBe(1);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain("usage:");
    expect(await readdir(dir)).toEqual([]);
  }
});

test("wrong headers and unterminated rows fail without changing any bytes", async () => {
  const dir = await fixture();
  const log = join(dir, "existing.tsv");
  for (const bytes of [
    "id\thypothesis\tchange\tbefore\tafter\tdelta\ttests\tverdict\tnote\n",
    "other\n",
    header.trimEnd(),
    `${header}2026-01-01T00:00:00Z\tp\td\tw\te\tr`,
  ]) {
    await writeFile(log, bytes);
    const result = cli(dir, [log, "p", "d", "w", "e", "r"]);
    expect(result.code).toBe(1);
    expect(result.stdout).toBe("");
    expect(result.stderr).toMatch(/incompatible.*header|unterminated existing row/);
    expect(await readFile(log)).toEqual(Buffer.from(bytes));
  }
});
