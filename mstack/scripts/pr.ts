#!/usr/bin/env bun
import { snapshot } from "./checks.ts";
import { createGh, errorMessage, PrError } from "./gh.ts";
import { logs } from "./logs.ts";
import { parseArgs, resolveTarget } from "./target.ts";
import { threads } from "./threads.ts";

export async function main(args: string[]): Promise<number> {
  try {
    // Parse and reject selector conflicts before spawning even a read-only process.
    const options = parseArgs([...args]),
      gh = createGh(options.timeoutMs);
    const target = await resolveTarget(gh, options);
    const result =
      options.command === "target"
        ? target
        : options.command === "threads"
          ? await threads(gh, target)
          : options.command === "checks"
            ? await snapshot(gh, target)
            : await logs(gh, target);
    console.log(JSON.stringify(result, null, 2));
    if ("partial" in result && result.partial) {
      console.error("mstack pr: partial failure evidence; see JSON failures and limitations");
      return 2;
    }
    return 0;
  } catch (error) {
    console.error(JSON.stringify({ error: error instanceof PrError ? error.code : "unexpected", message: errorMessage(error) }));
    return 1;
  }
}
if (import.meta.main) process.exitCode = await main(process.argv.slice(2));
