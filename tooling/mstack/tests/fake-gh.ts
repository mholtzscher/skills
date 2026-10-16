#!/usr/bin/env bun
// Offline subprocess fixture. Its only writes are the test's temporary call journal.
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
const file = process.env.MSTACK_FAKE_FIXTURE!;
const state = process.env.MSTACK_FAKE_STATE!;
const index = Number(readFileSync(state, "utf8"));
const responses = JSON.parse(readFileSync(file, "utf8"));
const response = responses[index];
const args = process.argv.slice(2);
appendFileSync(`${state}.calls`, `${JSON.stringify(args)}\n`);
writeFileSync(state, String(index + 1));
if (!response || !response.includes.every((part: string) => args.some((arg) => arg.includes(part)))) {
  console.error(`Unexpected gh call ${index}: ${JSON.stringify(args)}`);
  process.exit(70);
}
if (response.hang) {
  process.on("SIGTERM", () => {});
  setInterval(() => {}, 1000);
  await new Promise(() => {});
}
if (response.bytes) await new Promise<void>((resolve) => process.stdout.write("x".repeat(response.bytes), () => resolve()));
else if (response.stdout !== undefined)
  await new Promise<void>((resolve) =>
    process.stdout.write(typeof response.stdout === "string" ? response.stdout : JSON.stringify(response.stdout), () => resolve()),
  );
if (response.stderr) process.stderr.write(response.stderr);
process.exit(response.code ?? 0);
