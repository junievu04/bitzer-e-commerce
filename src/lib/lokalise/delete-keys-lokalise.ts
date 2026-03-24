// lib/lokalise.ts

export async function deleteKeysFromLokalise(values?: (string | string[])[]) {
  const keyNames = (values ?? [])
    .flat()
    .map((v) => v.trim())
    .filter(Boolean);

  if (keyNames.length === 0) return;

  // Bước 1: Tìm key IDs theo tên
  const searchRes = await fetch(
    `https://api.lokalise.com/api2/projects/${process.env.LOKALISE_PROJECT_ID}/keys?limit=500`,
    {
      headers: {
        "X-Api-Token": process.env.LOKALISE_API_TOKEN!,
      },
    },
  );

  const searchData = await searchRes.json();
  const allKeys: { key_id: number; key_name: { web: string } }[] =
    searchData.keys ?? [];

  const keyIds = allKeys
    .filter((k) => keyNames.includes(k.key_name.web))
    .map((k) => k.key_id);

  if (keyIds.length === 0) return;

  // Bước 2: Xóa các key đó
  await fetch(
    `https://api.lokalise.com/api2/projects/${process.env.LOKALISE_PROJECT_ID}/keys`,
    {
      method: "DELETE",
      headers: {
        "X-Api-Token": process.env.LOKALISE_API_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keys: keyIds }),
    },
  );
}
