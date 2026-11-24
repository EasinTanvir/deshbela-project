"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById } from "@/lib/authData";
import { LOGIN_CODE_COOKIE, unpackLoginCode } from "@/lib/loginCode";
import { verifyPassword } from "@/lib/passwords";
import { createSession } from "@/lib/session";

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function verifyLoginCode(previousState, formData) {
  const code = readText(formData, "code").replace(/\s/g, "");

  if (readText(formData, "website") !== "") {
    return { status: "error", errors: { code: "The code is not correct." } };
  }

  if (!/^\d{6}$/.test(code)) {
    return { status: "error", errors: { code: "The code has 6 numbers." } };
  }

  const cookieStore = await cookies();
  const saved = unpackLoginCode(cookieStore.get(LOGIN_CODE_COOKIE)?.value);
  if (!saved) {
    return { status: "expired", errors: {} };
  }

  if (!verifyPassword(code, saved.codeHash)) {
    return { status: "error", errors: { code: "The code is not correct. Please check the email and try again." } };
  }

  cookieStore.delete({ name: LOGIN_CODE_COOKIE, path: "/login" });
  const user = await findUserById(saved.userId);
  if (!user) {
    return { status: "expired", errors: {} };
  }

  await createSession(user.id);
  redirect("/account");
}
