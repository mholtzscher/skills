import { readdir, readFile, realpath } from "node:fs/promises";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

export async function validateBundle(root: string) {
  root = await realpath(root);
  const files: string[] = [];
  const errors: string[] = [];
  const playbookDirectories: string[] = [];
  async function walk(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      const path = join(directory, entry.name);
      if (directory === join(root, "playbooks")) {
        if (entry.isDirectory()) playbookDirectories.push(path);
        else errors.push(`${relative(root, path)}: use a playbook folder with PLAYBOOK.md`);
      }
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile() && entry.name.endsWith(".md")) files.push(path);
    }
  }
  await walk(root);
  for (const directory of playbookDirectories) {
    if (!files.includes(join(directory, "PLAYBOOK.md"))) errors.push(`${relative(root, directory)}: missing PLAYBOOK.md`);
  }
  const skillFiles = files.filter((path) => basename(path) === "SKILL.md");
  const inside = (path: string) => {
    const rel = relative(root, path);
    return rel !== ".." && !rel.startsWith(`..${sep}`) && !rel.startsWith(sep);
  };
  const layer = (path: string) => {
    const rel = relative(root, path);
    if (rel === "" || rel === "SKILL.md") return 0;
    const parts = rel.split(sep);
    if (parts[0] === "playbooks" && (parts.length <= 2 || (parts.length === 3 && parts[2] === "PLAYBOOK.md"))) return 1;
    return 2;
  };
  if (skillFiles.length !== 1 || skillFiles[0] !== join(root, "SKILL.md")) errors.push("Bundle must have exactly one entry point at SKILL.md");
  for (const path of skillFiles) {
    const label = relative(root, path);
    const text = await readFile(path, "utf8");
    const front = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(text);
    if (!front) {
      errors.push(`${label}: missing frontmatter`);
      continue;
    }
    try {
      const parsed = Bun.YAML.parse(front[1]);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("frontmatter must be a mapping");
      const data = parsed as Record<string, unknown>;
      const name = data.name;
      if (typeof name !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(name) || name.length > 64) throw new Error("invalid skill name");
      if (name !== basename(dirname(path))) errors.push(`${label}: name must match directory for both hosts`);
      if (typeof data.description !== "string" || !data.description.trim() || data.description.length > 1024) errors.push(`${label}: invalid description`);
      if (data["disable-model-invocation"] !== true) errors.push(`${label}: must be explicit-only`);
    } catch (error) {
      errors.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  for (const path of files) {
    const text = (await readFile(path, "utf8")).replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gmu, "");
    for (const match of text.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/gu)) {
      const target = match[1];
      if (/^(?:[a-z][a-z0-9+.-]*:|#)/iu.test(target)) continue;
      const location = resolve(dirname(path), decodeURIComponent(target.split("#")[0]));
      try {
        const actual = await realpath(location);
        if (!inside(actual)) errors.push(`${relative(root, path)}: link leaves the installed bundle: ${target}`);
        else if (layer(actual) < layer(path)) errors.push(`${relative(root, path)}: upward instruction link: ${target}`);
      } catch {
        errors.push(`${relative(root, path)}: broken link ${target}`);
      }
    }
  }
  return { skills: skillFiles.length, markdownFiles: files.length, errors: [...new Set(errors)] };
}

if (import.meta.main) {
  const result = await validateBundle(process.argv[2] ?? resolve(import.meta.dir, "../../mstack"));
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.errors.length ? 1 : 0;
}
