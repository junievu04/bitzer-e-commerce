import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function requireAdminToken(
  request: NextRequest,
): Promise<NextResponse | null> {
  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing Bearer token in Authorization header" },
      { status: 401 },
    );
  }

  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
