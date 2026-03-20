import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <strong>Admin Panel</strong>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin-login" });
          }}
        >
          <button type="submit">Đăng xuất</button>
        </form>
      </header>
      {children}
    </div>
  );
}
