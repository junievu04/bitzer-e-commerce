// Sync translation keys from t("key") usages into languages/en.json and languages/vi.json
// Detects unused keys (not in code) - report only, never removes
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";
import { join } from "path";

const ROOT = process.cwd();
const LANG_DIR = join(ROOT, "languages");
const EN_PATH = join(LANG_DIR, "en.json");
const VI_PATH = join(LANG_DIR, "vi.json");

// t("key") or t('key') - new regex per file to avoid lastIndex bug across files
function collectKeysFromSource(): Set<string> {
  const files = globSync("src/**/*.{ts,tsx,js,jsx}", {
    cwd: ROOT,
    absolute: true,
  });

  const keys = new Set<string>();

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const regex = /t\(\s*["']([^"']+)["']/g;
    for (const match of content.matchAll(regex)) {
      keys.add(match[1]);
    }
  }

  return keys;
}

function readJson(path: string): Record<string, string> {
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf-8") || "{}");
}

function writeJson(path: string, data: Record<string, string>) {
  const sorted: Record<string, string> = {};
  Object.keys(data)
    .sort()
    .forEach((k) => {
      sorted[k] = data[k];
    });
  mkdirSync(LANG_DIR, { recursive: true });
  writeFileSync(path, JSON.stringify(sorted, null, 2), "utf-8");
}

function findUnusedKeys(
  json: Record<string, string>,
  sourceKeys: Set<string>,
): string[] {
  const unused: string[] = [];

  for (const key of Object.keys(json)) {
    if (!sourceKeys.has(key)) {
      unused.push(key);
    }
  }

  return unused;
}

function syncLanguage(lang: string, path: string, sourceKeys: Set<string>) {
  const json = readJson(path);

  let added = 0;

  for (const key of sourceKeys) {
    if (!(key in json)) {
      json[key] = key;
      added++;
    }
  }

  const unused = findUnusedKeys(json, sourceKeys);

  writeJson(path, json);

  return {
    added,
    unused,
    total: Object.keys(json).length,
  };
}

function main() {
  const sourceKeys = collectKeysFromSource();

  console.log("🔍 Scanning source files...");
  console.log(`Found ${sourceKeys.size} translation keys in code\n`);

  const report: Record<
    string,
    { added: number; total: number; unused: string[] }
  > = {};

  for (const lang of ["en", "vi"]) {
    report[lang] = syncLanguage(
      lang,
      lang === "en" ? EN_PATH : VI_PATH,
      sourceKeys,
    );
  }

  console.log("✅ Sync completed\n");

  for (const lang of Object.keys(report)) {
    const r = report[lang];

    console.log(`Language: ${lang}`);
    console.log(`  Added keys: ${r.added}`);
    console.log(`  Total keys: ${r.total}`);

    if (r.unused.length > 0) {
      console.log(
        `  🏷️  [unused] Detected ${r.unused.length} keys not in code:`,
      );

      r.unused.slice(0, 10).forEach((k: string) => {
        console.log(`     - ${k}`);
      });

      if (r.unused.length > 10) {
        console.log(`     ...and ${r.unused.length - 10} more`);
      }
    }

    console.log("");
  }
}

main();
