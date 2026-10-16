#!/usr/bin/env bun
import { mkdir, open, readFile } from "node:fs/promises";
import { dirname } from "node:path";

const args = process.argv.slice(2);
if (args.length !== 6 || args[0].trim() === "") {
  console.error("usage: bun decision-log.ts <logfile> <phase> <decision> <why> <evidence> <result>");
  process.exit(1);
}

try {
  const [logfile, ...cells] = args;
  const header = await readFile(new URL("../playbooks/decision-trail/references/decision-log-template.tsv", import.meta.url));
  await mkdir(dirname(logfile), { recursive: true });
  // Append even on first use. A mistaken existence/size observation must not
  // truncate prior rows, especially on a network mount. Callers serialize writes.
  const file = await open(logfile, "a+");
  try {
    const { size } = await file.stat();
    if (size > 0) {
      const beginning = Buffer.alloc(header.length);
      const { bytesRead } = await file.read(beginning, 0, beginning.length, 0);
      if (bytesRead !== header.length || !beginning.equals(header)) {
        throw new Error("incompatible decision-log header; existing file left unchanged");
      }
      const last = Buffer.alloc(1);
      await file.read(last, 0, 1, size - 1);
      if (last[0] !== 10) {
        throw new Error("unterminated existing row; existing file left unchanged");
      }
    }
    // Keep spreadsheet formula syntax inert and every TSV cell on one line.
    const clean = cells.map((cell) => {
      const singleLine = cell.replace(/[\t\r\n]/g, " ");
      return /^[=+\-@]/.test(singleLine) ? `'${singleLine}` : singleLine;
    });
    const row = `${new Date().toISOString()}\t${clean.join("\t")}\n`;
    await file.appendFile(size === 0 ? Buffer.concat([header, Buffer.from(row)]) : row);
  } finally {
    await file.close();
  }
} catch (error) {
  console.error(`decision-log: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
