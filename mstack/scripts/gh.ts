import { spawn } from "node:child_process";

export class PrError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}
export interface Result {
  stdout: string;
  stderr: string;
  exitCode: number;
}
export type Gh = (args: string[], accepted?: number[]) => Promise<Result>;

/** No shell, bounded buffers, and a forced-kill deadline for stuck processes. */
export function createGh(timeoutMs = 30_000, maxBytes = 8 * 1024 * 1024): Gh {
  return (args, accepted = [0]) =>
    new Promise((resolve, reject) => {
      const child = spawn("gh", args, { stdio: ["ignore", "pipe", "pipe"] });
      const stdout: Buffer[] = [],
        stderr: Buffer[] = [];
      let bytes = 0,
        failure: PrError | undefined;
      let force: ReturnType<typeof setTimeout> | undefined;
      const stop = (error: PrError) => {
        if (failure) return;
        failure = error;
        child.kill("SIGTERM");
        force = setTimeout(() => child.kill("SIGKILL"), 200);
      };
      const timer = setTimeout(() => stop(new PrError("timeout", `gh timed out after ${timeoutMs}ms (${args.slice(0, 2).join(" ")})`)), timeoutMs);
      const collect = (chunks: Buffer[], chunk: Buffer) => {
        bytes += chunk.length;
        if (bytes > maxBytes) stop(new PrError("output-limit", `gh output exceeded ${maxBytes} bytes`));
        else if (!failure) chunks.push(chunk);
      };
      child.stdout.on("data", (chunk: Buffer) => collect(stdout, chunk));
      child.stderr.on("data", (chunk: Buffer) => collect(stderr, chunk));
      child.on("error", (error) => {
        clearTimeout(timer);
        if (force) clearTimeout(force);
        reject(new PrError("spawn", `Cannot execute gh: ${error.message}`));
      });
      child.on("close", (code, signal) => {
        clearTimeout(timer);
        if (force) clearTimeout(force);
        if (failure) return reject(failure);
        const result = { stdout: Buffer.concat(stdout).toString("utf8"), stderr: Buffer.concat(stderr).toString("utf8"), exitCode: code ?? -1 };
        if (!accepted.includes(result.exitCode))
          return reject(
            new PrError("gh", `gh ${args.slice(0, 2).join(" ")} failed (${code ?? signal}): ${result.stderr.trim().slice(0, 4000) || "no error details"}`),
          );
        resolve(result);
      });
    });
}

export function json(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    throw new PrError("invalid-data", "gh returned invalid JSON");
  }
}
export function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new PrError("invalid-data", "Expected a JSON object from gh");
  return value as Record<string, unknown>;
}
export function text(value: unknown, field: string, nonempty = false): string {
  if (typeof value !== "string" || (nonempty && !value)) throw new PrError("invalid-data", `Invalid ${field} from gh`);
  return value;
}
export function positive(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) throw new PrError("invalid-data", `Invalid ${field} from gh`);
  return value;
}
export function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new PrError("invalid-data", "Expected a JSON array from gh");
  return value;
}
export function boolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new PrError("invalid-data", `Invalid ${field} from gh`);
  return value;
}
export const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));
