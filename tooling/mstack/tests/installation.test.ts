import { afterEach, expect, test } from "bun:test";
import { chmod, copyFile, cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join, resolve } from "node:path";
import { validateBundle } from "../validate.ts";

const source = resolve(import.meta.dir, "../../../mstack");
const validator = resolve(import.meta.dir, "../validate.ts");
const temporary: string[] = [];
afterEach(async () => {
  for (const path of temporary.splice(0)) await rm(path, { recursive: true, force: true });
});

async function workspace() {
  const root = await mkdtemp(join(existsSync("/tmp/opencode") ? "/tmp/opencode" : tmpdir(), "mstack-install-"));
  temporary.push(root);
  return root;
}

test("copied runtime is self-contained and its helpers work from an unrelated directory", async () => {
  const root = await workspace();
  const installed = join(root, "skills", "mstack");
  const project = join(root, "project");
  const bin = join(root, "bin");
  await mkdir(project);
  await mkdir(bin);
  await cp(source, installed, { recursive: true });

  expect((await readdir(installed)).sort()).toEqual(["LICENSE", "README.md", "SKILL.md", "playbooks", "principles", "references", "scripts"]);
  const playbooks = await readdir(join(installed, "playbooks"), { withFileTypes: true });
  expect(playbooks.map((entry) => entry.name).sort()).toEqual((await readdir(join(source, "playbooks"))).sort());
  for (const playbook of playbooks) {
    expect(playbook.isDirectory()).toBe(true);
    expect(await readFile(join(installed, "playbooks", playbook.name, "PLAYBOOK.md"), "utf8")).toMatch(/^# /);
  }
  expect((await readdir(join(installed, "scripts"))).every((name) => name.endsWith(".ts") || name === "README.md")).toBe(true);
  expect(await validateBundle(installed)).toMatchObject({ skills: 1, errors: [] });
  expect(await readFile(join(installed, "LICENSE"))).toEqual(await readFile(join(source, "LICENSE")));

  const log = Bun.spawnSync(
    [process.execPath, join(installed, "scripts/decision-log.ts"), "decisions.tsv", "verify", "copied bundle", "isolated", "fixture", "pass"],
    { cwd: project },
  );
  expect(log.exitCode).toBe(0);
  expect(log.stderr.toString()).toBe("");
  const rows = (await readFile(join(project, "decisions.tsv"), "utf8")).trimEnd().split("\n");
  expect(rows).toHaveLength(2);
  expect(rows[0]).toBe("ts\tphase\tdecision\twhy\tevidence\tresult");
  expect(rows[1].split("\t").slice(1)).toEqual(["verify", "copied bundle", "isolated", "fixture", "pass"]);

  const gh = join(bin, "gh");
  const data = join(root, "responses.json");
  const state = join(root, "calls");
  await copyFile(new URL("./fake-gh.ts", import.meta.url), gh);
  await chmod(gh, 0o755);
  await writeFile(state, "0");
  await writeFile(
    data,
    JSON.stringify([
      {
        includes: ["pr", "view"],
        stdout: { number: 17, url: "https://github.com/owner/repo/pull/17", headRefOid: "fixture-sha", headRefName: "feature", baseRefName: "main" },
      },
    ]),
  );
  const pr = Bun.spawnSync([process.execPath, join(installed, "scripts/pr.ts"), "target", "--repo", "owner/repo", "--pr", "17"], {
    cwd: project,
    env: { ...process.env, PATH: `${bin}${delimiter}${dirname(process.execPath)}`, MSTACK_FAKE_FIXTURE: data, MSTACK_FAKE_STATE: state },
  });
  expect(pr.exitCode).toBe(0);
  expect(pr.stderr.toString()).toBe("");
  expect(JSON.parse(pr.stdout.toString())).toEqual({
    repository: "owner/repo",
    number: 17,
    hostname: "github.com",
    url: "https://github.com/owner/repo/pull/17",
    headSha: "fixture-sha",
    headBranch: "feature",
    baseBranch: "main",
  });
  expect(await readFile(state, "utf8")).toBe("1");
});

test("relocated validator resolves its default bundle independently of cwd", async () => {
  const root = await workspace();
  const result = Bun.spawnSync([process.execPath, validator], { cwd: root });
  expect(result.exitCode).toBe(0);
  expect(result.stderr.toString()).toBe("");
  expect(JSON.parse(result.stdout.toString())).toMatchObject({ skills: 1, errors: [] });
});
