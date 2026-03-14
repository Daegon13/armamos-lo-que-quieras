import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminPassword } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const payload = (await request.json()) as { password?: string };
  const password = payload.password?.trim() ?? "";

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Clave de administración inválida." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: password,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
