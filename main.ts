import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Grandma's kitchen smelled of fried rice at dusk, and the radio played the same song every evening while I waited for the plate that was always mine.";

// Gate validation: the entry must be a single sentence of 1-280 characters,
// not only whitespace, with no newline inside it.
if (entry.length < 1 || entry.length > 280) {
  throw new Error(
    `entry must be 1-280 characters, got ${entry.length}`,
  );
}
if (!entry.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single sentence with no newline inside");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry + "\n", "utf8");
console.log(`wrote entry.txt (${entry.length} characters): ${entry}`);
