import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8").replace(/\n$/, "");
if (line.length === 0) { console.error("FAIL: empty line"); process.exit(1); }
if (line.length > 200) { console.error(`FAIL: ${line.length}/200 characters`); process.exit(1); }
if (line.includes("\n") || line.includes("\r")) { console.error("FAIL: not a single line"); process.exit(1); }
if (/ $/.test(line)) { console.error("FAIL: trailing space"); process.exit(1); }
if (!/[.!?]$/.test(line)) { console.error("FAIL: line must end with terminal punctuation"); process.exit(1); }

// The harness grades /output/entry.txt, so write the line there as well as
// printing it: stdout is the log, the file is the artifact.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
if (existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, line, "utf8");
  console.error(`OK: wrote ${line.length}/200 characters to ${outDir}/entry.txt`);
}
console.log(line);
