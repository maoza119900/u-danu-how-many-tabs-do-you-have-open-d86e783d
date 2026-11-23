// How Many Tabs Do You Have Open?
// Writes a single number — the honest count of open browser tabs —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default ./out).
//
// The count is a fixed constant: the program performs no I/O beyond
// writing the file, uses no network, no clock and no randomness, so
// every run produces byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tab count chosen in SPEC.md: a believable-but-surprising
// heavy-user load (several windows of docs, issues and articles),
// specific enough to read as a real counted total, not a round
// number picked for effect.
const TAB_COUNT = 137;

// The gate requires 1 to 5 characters of digits-only text. Validate
// the constant up front so a bad value fails loudly instead of
// producing an invalid entry.
const text = String(TAB_COUNT);
if (!/^[0-9]{1,5}$/.test(text)) {
  throw new Error(`tab count ${JSON.stringify(text)} fails the entry gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, text, "utf8");

// Read back what was written and confirm it is exactly the entry:
// a mismatch means the output is not what the gate will see.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error(
    `entry.txt mismatch: wrote ${JSON.stringify(text)}, read back ${JSON.stringify(written)}`,
  );
}
