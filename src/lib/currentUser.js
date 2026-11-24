import { redirect } from "next/navigation";
import { findUserById } from "@/lib/authData";
import { getSessionUserId } from "@/lib/session";

export function homePathFor(user) {
  return user.roleId === "role-reporter" ? "/reporter" : "/account";
}

export async function getCurrentUser() {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const user = await findUserById(userId);
  if (!user || user.status !== "ACTIVE") return null;

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireReporter() {
  const user = await requireUser();
  if (user.roleId !== "role-reporter") redirect("/account");
  return user;
}
