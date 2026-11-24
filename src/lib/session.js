import { cookies } from "next/headers";
import { readSignedValue, signValue } from "@/lib/signing";

const SESSION_COOKIE = "deshbela_session";
const SESSION_DAYS = 7;

export async function createSession(userId) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, signValue(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUserId() {
  const cookieStore = await cookies();
  return readSignedValue(cookieStore.get(SESSION_COOKIE)?.value);
}
