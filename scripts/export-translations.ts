/**
 * Exports flattened translation JSON for Lokalise (and CI push).
 * Run: npm run export-translations  or  npx tsx scripts/export-translations.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { en } from "../src/constants/i18n/en";
import { vi } from "../src/constants/i18n/vi";
import flattenMessages from "../src/utils/intl/flatten-messages";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "languages");

mkdirSync(outDir, { recursive: true });

const enFlat = flattenMessages(en as Record<string, unknown>);
const viFlat = flattenMessages(vi as Record<string, unknown>);

writeFileSync(
  join(outDir, "en.json"),
  JSON.stringify(enFlat, null, 2),
  "utf-8",
);
writeFileSync(
  join(outDir, "vi.json"),
  JSON.stringify(viFlat, null, 2),
  "utf-8",
);

console.log("Exported languages/en.json and languages/vi.json");
