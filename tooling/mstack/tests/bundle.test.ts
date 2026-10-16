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
  await skill(root, ".", "mstack", "[Review](playbooks/review.md)");
  await mkdir(join(root, "playbooks"));
  await writeFile(join(root, "playbooks/review.md"), "# Review\n\n[Shared](../references/shared.md)\n");
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
  ["playbooks/review.md", "../SKILL.md#scope-and-approval"],
  ["principles/proof.md", "../SKILL.md"],
  ["references/deep/guide.md", "../../SKILL.md"],
  ["scripts/README.md", "../SKILL.md"],
  ["principles/proof.md", "../playbooks/review.md"],
  ["references/deep/guide.md", "../../playbooks/review.md#verdict"],
  ["scripts/README.md", "../playbooks/review.md"],
  ["references/shared.md", "../playbooks/"],
  ["playbooks/review.md", "../"],
])("rejects an upward reading dependency from %s to %s", async (source, target) => {
  const root = await fixture();
  await skill(root, ".", "mstack");
  await mkdir(join(root, "playbooks"));
  await writeFile(join(root, "playbooks/review.md"), "# Review\n");
  const file = join(root, source);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `# Guide\n\n[Parent](${target})\n`);
  expect((await validateBundle(root)).errors).toEqual([`${source}: upward instruction link: ${target}`]);
});

test("allows composed playbooks and shared resources even when relative paths ascend directories", async () => {
  const root = await fixture();
  await skill(root, ".", "mstack", "[Feature](playbooks/feature.md)\n[Proof](principles/proof.md)");
  for (const directory of ["playbooks", "principles", "references/deep", "scripts"]) await mkdir(join(root, directory), { recursive: true });
  await writeFile(join(root, "playbooks/feature.md"), "# Feature\n[Plan](planning.md)\n[Guide](../references/deep/guide.md)\n");
  await writeFile(join(root, "playbooks/planning.md"), "# Planning\n[Feature](feature.md)\n[Proof](../principles/proof.md)\n");
  await writeFile(join(root, "principles/proof.md"), "# Proof\n[Shared](../references/shared.md)\n");
  await writeFile(
    join(root, "references/deep/guide.md"),
    "# Guide\n[Shared](../shared.md)\n[Proof](../../principles/proof.md)\n[Helper](../../scripts/README.md)\n",
  );
  await writeFile(join(root, "scripts/README.md"), "# Helper\n[License](../LICENSE)\n[Local](#helper)\n```md\n[Example](../SKILL.md)\n```\n");
  await writeFile(join(root, "LICENSE"), "Fixture license\n");
  expect(await validateBundle(root)).toEqual({ skills: 1, markdownFiles: 7, errors: [] });
});
