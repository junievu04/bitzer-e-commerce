// scripts/sync-layouts-to-lokalise.ts

import { pushKeysToLokalise } from "@/lib/lokalise/push-key-lokalise";
import { Layout } from "@/models/Layout";
import "./load-env";

// ─── Config ───────────────────────────────────────────────────────────────────

/** Keys to skip entirely — never translated */
const SKIP_KEYS = new Set([
  "id",
  "slug",
  "tag",
  "link",
  "position",
  "variant",
  "number",
  "theme",
  "type",
  "imagePosition",
  "image",
  "accent",
  "icon",
  "minWidthCard",
  "numberOfColumns",
  "numberOfItems",
  "displayInRow",
  "ctaLink",
]);

// ─── Extractor ────────────────────────────────────────────────────────────────

/**
 * Recursively walks any JSON value and collects translatable strings.
 * Rules:
 *  - Skip if the key is in SKIP_KEYS
 *  - Skip if value is not a non-empty string (after trimming)
 *  - Recurse into arrays and plain objects
 */
function extractTranslatableStrings(
  value: unknown,
  parentKey?: string,
): string[] {
  const results: string[] = [];

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      results.push(trimmed);
    }
    return results;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      results.push(...extractTranslatableStrings(item));
    }
    return results;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      // Skip non-translatable keys
      if (SKIP_KEYS.has(key)) continue;

      results.push(...extractTranslatableStrings(val, key));
    }
    return results;
  }

  // number, boolean, null, undefined → skip
  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

  const layouts = await Layout.find({}).lean();
  console.log(`📦 Found ${layouts.length} layouts`);

  for (const layout of layouts) {
    console.log(`\n🔄 Processing layout: ${layout.layoutKey} (${layout.name})`);

    const translatableStrings = extractTranslatableStrings(layout.data);

    // Deduplicate within the same layout to avoid redundant pushes
    const unique = [...new Set(translatableStrings)];

    console.log(`   📝 ${unique.length} unique translatable strings found`);

    if (unique.length === 0) continue;

    await pushKeysToLokalise(unique.map((value) => ({ value })));

    console.log(`   ✅ Done: ${layout.layoutKey}`);
  }

  console.log("\n🎉 All layouts synced to Lokalise");
}

main()
  .catch((err) => {
    console.error("❌ Error:", err);
  })
  .finally(() => {
    process.exit(0);
  });
