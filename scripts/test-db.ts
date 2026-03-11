// scripts/test-db.ts
import "dotenv/config";

console.log("junie test", process.env.MONGODB_URI);

async function main() {
  const { connectDB } = await import("@/lib/mongodb"); // dynamic import, sau khi env đã load
  const conn = await connectDB();
  console.log("Connected to Mongo at:", conn.connection.host);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
