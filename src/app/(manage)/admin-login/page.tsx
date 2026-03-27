import { auth } from "@/auth";
import AdminLoginClient from "@/modules/admin/auth/login-client";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session?.user?.role === "admin") redirect("/admin");

  return <AdminLoginClient />;
};

export default page;
