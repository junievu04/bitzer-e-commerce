import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/admin-login";

  // Không xử lý login page — để NextAuth tự lo
  if (isLoginPage) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const isLoggedIn = !!token && token.role === "admin";

    // Đã login rồi thì đẩy vào dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    // Chưa login → vào login page bình thường, KHÔNG set callbackUrl
    return NextResponse.next();
  }

  if (!isAdminRoute) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isLoggedIn = !!token && token.role === "admin";

  if (!isLoggedIn) {
    const loginUrl = new URL("/admin-login", nextUrl);
    // ✅ Chỉ set callbackUrl nếu đích đến KHÔNG phải login page
    const callback = nextUrl.pathname.startsWith("/admin")
      ? nextUrl.pathname
      : "/admin";
    loginUrl.searchParams.set("callbackUrl", callback);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
