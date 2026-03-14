import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_TOKEN = "ok";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "demo-admin";
}

export function isValidAdminPassword(password: string): boolean {
  return password === getAdminPassword();
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return token === ADMIN_SESSION_TOKEN;
}
