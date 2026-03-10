// Sync translation keys from t("key") usages into languages/en.json and languages/vi.json
// Detects unused keys (not in code) - report only, never removes
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";
import { join } from "path";

const ROOT = process.cwd();
const LANG_DIR = join(ROOT, "languages");
const EN_PATH = join(LANG_DIR, "en.json");
const VI_PATH = join(LANG_DIR, "vi.json");

// t("key") or t('key') - chỉ match useIntl().t hoặc t(, không match get(, request(, etc.
function collectKeysFromSource(): Set<string> {
  const files = globSync("src/**/*.{ts,tsx,js,jsx}", {
    cwd: ROOT,
    absolute: true,
    ignore: ["**/*.spec.{ts,tsx}", "**/*.test.{ts,tsx}", "**/vendors/**"],
  });

  const keys = new Set<string>();

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    // (?<![a-zA-Z0-9_]) = t không đứng sau chữ/số (tránh match get("x-secret"))
    const regex = /(?<![a-zA-Z0-9_])t\(\s*["']([^"']+)["']/g;
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

function syncLanguage(
  lang: string,
  path: string,
  sourceKeys: Set<string>,
  removeUnused: boolean,
) {
  const json = readJson(path);

  let added = 0;

  for (const key of sourceKeys) {
    if (!(key in json)) {
      json[key] = key;
      added++;
    }
  }

  const unused = findUnusedKeys(json, sourceKeys);

  if (removeUnused) {
    for (const key of unused) {
      delete json[key];
    }
  }

  writeJson(path, json);

  return {
    added,
    removed: removeUnused ? unused.length : 0,
    unused,
    total: Object.keys(json).length,
  };
}

function main() {
  const removeUnused = process.argv.includes("--cleanup");
  const sourceKeys = collectKeysFromSource();

  console.log("🔍 Scanning source files...");
  console.log(`Found ${sourceKeys.size} translation keys in code`);
  if (removeUnused) console.log("🧹 --cleanup: removing unused keys\n");
  else console.log("");

  const report: Record<
    string,
    { added: number; removed: number; total: number; unused: string[] }
  > = {};

  for (const lang of ["en", "vi"]) {
    report[lang] = syncLanguage(
      lang,
      lang === "en" ? EN_PATH : VI_PATH,
      sourceKeys,
      removeUnused,
    );
  }

  console.log("✅ Sync completed\n");

  for (const lang of Object.keys(report)) {
    const r = report[lang];

    console.log(`Language: ${lang}`);
    console.log(`  Added keys: ${r.added}`);
    if (removeUnused && r.removed > 0) {
      console.log(`  Removed keys: ${r.removed}`);
    }
    console.log(`  Total keys: ${r.total}`);

    if (r.unused.length > 0 && !removeUnused) {
      console.log(
        `  🏷️  [unused] Detected ${r.unused.length} keys not in code:`,
      );

      r.unused.slice(0, 10).forEach((k: string) => {
        console.log(`     - ${k}`);
      });

      if (r.unused.length > 10) {
        console.log(`     ...and ${r.unused.length - 10} more`);
      }
      console.log(`     Run with --cleanup to remove them.`);
    }

    console.log("");
  }
}

main();
