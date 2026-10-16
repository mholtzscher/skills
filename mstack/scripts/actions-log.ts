// Pure summarizer adapted from workflow-tools/pr/actions-log.ts; no storage or plugin runtime.
const ERROR_LINE_PATTERN =
  /(?<prefix>^|[\s›])(?<marker>✘|error|failed|failure|exception|traceback|panic|fatal|GH\d{3}|exit code|remote:|rejected|denied|timed out|segmentation fault|core dumped)/iu;
export const stripAnsi = (text: string): string => text.replaceAll(/\u001B\[[0-9;?]*[ -/]*[@-~]/gu, "").replaceAll("\uFEFF", "");
export function truncate(text: string, limit: number): string {
  const marker = "\n[truncated]";
  return text.length <= limit ? text : text.slice(0, limit - marker.length) + marker;
}
const mergeWindows = (windows: [number, number][]): [number, number][] => {
  const merged: [number, number][] = [];
  for (const window of windows.toSorted((a, b) => a[0] - b[0])) {
    const previous = merged.at(-1);
    if (!previous || window[0] > previous[1] + 2) merged.push(window);
    else previous[1] = Math.max(previous[1], window[1]);
  }
  return merged;
};
export function summarizeFailedLog(rawLog: string): string {
  const lines = stripAnsi(rawLog)
    .split(/\r?\n/u)
    .map((line) => {
      const parts = line.split("\t");
      return parts.length >= 3 ? `${parts[1]} | ${parts.slice(2).join("\t")}` : line;
    })
    .filter((line) => line.trim().length > 0);
  if (!lines.length) return "No failed-step logs returned by gh.";
  const windows: [number, number][] = [];
  for (const [index, line] of lines.entries()) {
    const separator = line.indexOf(" | ");
    if (ERROR_LINE_PATTERN.test(separator === -1 ? line : line.slice(separator + 3)))
      windows.push([Math.max(0, index - 8), Math.min(lines.length, index + 15)]);
  }
  const errors = mergeWindows(windows),
    sections = [`Full failed-step log lines: ${lines.length}`];
  if (errors.length) {
    sections.push("### Error-focused excerpts");
    for (const [start, end] of mergeWindows([...errors.slice(0, 3), ...errors.slice(-3)]))
      sections.push(`--- lines ${start + 1}-${end} ---\n${lines.slice(start, end).join("\n")}`);
  } else sections.push("No obvious error markers found; including tail of failed-step log.");
  const tailStart = Math.max(0, lines.length - (errors.length ? 120 : 180));
  sections.push(`### Tail (${lines.length - tailStart} lines)\n${lines.slice(tailStart).join("\n")}`);
  return truncate(sections.join("\n\n"), 22_000);
}
