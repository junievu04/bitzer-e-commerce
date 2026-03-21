import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Server-side guard for server actions.
 * Throws redirect if not authenticated as admin.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/admin-login");
  }
}
