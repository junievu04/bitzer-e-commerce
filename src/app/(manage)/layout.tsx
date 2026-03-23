import { auth } from "@/auth";
import AdminLayout from "@/modules/admin/layout/admin-layout";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin-login");
  return (
    <SessionProvider session={session}>
      <AdminLayout>{children}</AdminLayout>
    </SessionProvider>
  );
}
