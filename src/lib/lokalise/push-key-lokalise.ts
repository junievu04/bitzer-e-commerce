// lib/lokalise.ts

type LokaliseKeyInput = {
  value?: string | string[];
};

export async function pushKeysToLokalise(inputs: LokaliseKeyInput[]) {
  const keysPayload: object[] = [];

  for (const { value } of inputs) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue;

    const lines = Array.isArray(value) ? value : [value];

    for (const line of lines) {
      if (!line.trim()) continue;

      keysPayload.push({
        key_name: line.trim(),
        platforms: ["web"],
        filenames: {
          web: "%LANG_ISO%.json",
        },
        translations: [{ language_iso: "vi", translation: line.trim() }],
      });
    }
  }

  if (keysPayload.length === 0) return;

  await fetch(
    `https://api.lokalise.com/api2/projects/${process.env.LOKALISE_PROJECT_ID}/keys`,
    {
      method: "POST",
      headers: {
        "X-Api-Token": process.env.LOKALISE_API_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keys: keysPayload }),
    },
  );
}
