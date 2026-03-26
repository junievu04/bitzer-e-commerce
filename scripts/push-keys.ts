// scripts/sync-services-to-lokalise.ts

import { pushKeysToLokalise } from "@/lib/lokalise/push-key-lokalise";
import { Service } from "@/models/Service";
import "dotenv/config";

async function main() {
  const { connectDB } = await import("@/lib/mongodb");
  await connectDB();

  const services = await Service.find({ isActive: true }).lean();
  console.log(`📦 Found ${services.length} services`);

  for (const service of services) {
    console.log(`🔄 Pushing keys for: ${service.name}`);

    await pushKeysToLokalise([
      { value: service.name },
      { value: service.brief },
      { value: service.description },
      { value: service.features },
    ]);

    console.log(`✅ Done: ${service.name}`);
  }

  console.log("🎉 All services synced to Lokalise");
}

main()
  .catch((err) => {
    console.error("❌ Error:", err);
  })
  .finally(() => {
    process.exit(0);
  });
