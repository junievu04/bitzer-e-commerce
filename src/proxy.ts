import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user && session.user.role === "admin";
  const isLoginPage = nextUrl.pathname === "/admin-login";
  const isAdminRoute =
    nextUrl.pathname === "/admin" || nextUrl.pathname.startsWith("/admin/");

  // Đã đăng nhập mà vào trang login → redirect vào dashboard
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  // Chưa đăng nhập mà vào route admin → redirect về login
  if (!isLoggedIn && isAdminRoute) {
    const loginUrl = new URL("/admin-login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
