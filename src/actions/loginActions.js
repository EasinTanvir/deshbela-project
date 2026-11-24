"use server";

import { randomInt } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserByEmail } from "@/lib/authData";
import { homePathFor } from "@/lib/currentUser";
import { LOGIN_CODE_COOKIE, LOGIN_CODE_MINUTES, packLoginCode } from "@/lib/loginCode";
import { hashPassword, verifyPassword } from "@/lib/passwords";
import { createSession } from "@/lib/session";

const WRONG_LOGIN = "The email or password is not correct.";

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function logIn(previousState, formData) {
  const values = { email: readText(formData, "email") };
  const password = typeof formData.get("password") === "string" ? formData.get("password") : "";

  if (readText(formData, "website") !== "") {
    return { status: "error", errors: { form: WRONG_LOGIN }, values };
  }

  const errors = {};
  if (values.email === "") errors.email = "Please write your email address.";
  if (password === "") errors.password = "Please write your password.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const user = await findUserByEmail(values.email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { status: "error", errors: { form: WRONG_LOGIN }, values };
  }

  if (user.status !== "ACTIVE") {
    return { status: "error", errors: { form: "This account is blocked. Please contact us." }, values };
  }

  if (user.twoFactorEnabled) {
    const code = String(randomInt(100000, 1000000));
    const cookieStore = await cookies();
    cookieStore.set(LOGIN_CODE_COOKIE, packLoginCode(user.id, hashPassword(code)), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: LOGIN_CODE_MINUTES * 60,
      path: "/login",
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`Login code for ${user.email}: ${code}`);
    }

    redirect("/login/verify");
  }

  await createSession(user.id);
  redirect(homePathFor(user));
}
