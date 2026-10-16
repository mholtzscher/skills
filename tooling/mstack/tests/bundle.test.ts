import { afterEach, expect, test } from "bun:test";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { validateBundle } from "../validate.ts";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function fixture() {
  const parent = await mkdtemp(join(tmpdir(), "mstack-bundle-"));
  roots.push(parent);
  const root = join(parent, "mstack");
  await mkdir(join(root, "references"), { recursive: true });
  await writeFile(join(root, "references", "shared.md"), "# Shared\n");
  return root;
}

async function skill(root: string, path: string, name: string, body = "") {
  await mkdir(join(root, path), { recursive: true });
  await writeFile(join(root, path, "SKILL.md"), `---\nname: ${name}\ndescription: A fixture workflow.\ndisable-model-invocation: true\n---\n${body}\n`);
}

test("one root entry point resolves composed playbooks from its installed location", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack", "[Review](playbooks/review/PLAYBOOK.md)");
  await mkdir(join(root, "playbooks/review"), { recursive: true });
  await writeFile(join(root, "playbooks/review/PLAYBOOK.md"), "# Review\n\n[Shared](../../references/shared.md)\n");
  expect(await validateBundle(root)).toEqual({ skills: 1, markdownFiles: 3, errors: [] });
});

test("rejects extra entry points that hosts would discover differently", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack");
  await skill(root, "skills/mstack-review", "mstack-review");
  expect((await validateBundle(root)).errors).toEqual(["Bundle must have exactly one entry point at SKILL.md"]);
});

test("rejects the former nested layout even with only one skill", async () => {
  const root = await fixture();
  await skill(root, "skills/mstack", "mstack");
  expect((await validateBundle(root)).errors).toEqual(["Bundle must have exactly one entry point at SKILL.md"]);
});

test("detects missing shared files instead of shipping a broken skill", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack", "[Missing](references/missing.md)");
  expect((await validateBundle(root)).errors).toEqual(["SKILL.md: broken link references/missing.md"]);
});

test("rejects a root name that would resolve differently across hosts", async () => {
  const root = await fixture();
  await skill(root, ".", "another-name");
  expect((await validateBundle(root)).errors).toEqual(["SKILL.md: name must match directory for both hosts"]);
});

test.each([
  ["playbooks/review/PLAYBOOK.md", "../../SKILL.md#scope-and-approval"],
  ["principles/proof.md", "../SKILL.md"],
  ["references/deep/guide.md", "../../SKILL.md"],
  ["scripts/README.md", "../SKILL.md"],
  ["principles/proof.md", "../playbooks/review/PLAYBOOK.md"],
  ["references/deep/guide.md", "../../playbooks/review/PLAYBOOK.md#verdict"],
  ["scripts/README.md", "../playbooks/review/PLAYBOOK.md"],
  ["references/shared.md", "../playbooks/"],
  ["playbooks/review/PLAYBOOK.md", "../../"],
  ["playbooks/review/references/guide.md", "../PLAYBOOK.md"],
  ["playbooks/review/references/guide.md", "../../planning/PLAYBOOK.md"],
  ["playbooks/review/references/guide.md", "../../../SKILL.md"],
  ["playbooks/review/references/guide.md", "../"],
])("rejects an upward reading dependency from %s to %s", async (source, target) => {
  const root = await fixture();
  await skill(root, ".", "mstack");
  for (const name of ["review", "planning"]) {
    await mkdir(join(root, "playbooks", name), { recursive: true });
    await writeFile(join(root, "playbooks", name, "PLAYBOOK.md"), `# ${name}\n`);
  }
  const file = join(root, source);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `# Guide\n\n[Parent](${target})\n`);
  expect((await validateBundle(root)).errors).toEqual([`${source}: upward instruction link: ${target}`]);
});

test("allows composed playbooks and shared resources even when relative paths ascend directories", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack", "[Feature](playbooks/feature/PLAYBOOK.md)\n[Proof](principles/proof.md)");
  for (const directory of ["playbooks/feature/references", "playbooks/planning", "principles", "references/deep", "scripts"])
    await mkdir(join(root, directory), { recursive: true });
  await writeFile(join(root, "playbooks/feature/PLAYBOOK.md"), "# Feature\n[Plan](../planning/PLAYBOOK.md)\n[Guide](references/guide.md)\n");
  await writeFile(join(root, "playbooks/planning/PLAYBOOK.md"), "# Planning\n[Feature](../feature/PLAYBOOK.md)\n[Proof](../../principles/proof.md)\n");
  await writeFile(
    join(root, "playbooks/feature/references/guide.md"),
    "# Guide\n[Shared](../../../references/shared.md)\n[Deep](../../../references/deep/guide.md)\n",
  );
  await writeFile(join(root, "principles/proof.md"), "# Proof\n[Shared](../references/shared.md)\n");
  await writeFile(
    join(root, "references/deep/guide.md"),
    "# Guide\n[Shared](../shared.md)\n[Proof](../../principles/proof.md)\n[Helper](../../scripts/README.md)\n[Owned](../../playbooks/feature/references/guide.md)\n",
  );
  await writeFile(join(root, "scripts/README.md"), "# Helper\n[License](../LICENSE)\n[Local](#helper)\n```md\n[Example](../SKILL.md)\n```\n");
  await writeFile(join(root, "LICENSE"), "Fixture license\n");
  expect(await validateBundle(root)).toEqual({ skills: 1, markdownFiles: 8, errors: [] });
});

test("rejects the old flat playbook layout", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack");
  await mkdir(join(root, "playbooks"));
  await writeFile(join(root, "playbooks/review.md"), "# Review\n");
  expect((await validateBundle(root)).errors).toEqual(["playbooks/review.md: use a playbook folder with PLAYBOOK.md"]);
});

test("rejects a playbook folder containing only references", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack");
  await mkdir(join(root, "playbooks/review/references"), { recursive: true });
  await writeFile(join(root, "playbooks/review/references/rubric.md"), "# Rubric\n");
  expect((await validateBundle(root)).errors).toEqual(["playbooks/review: missing PLAYBOOK.md"]);
});
