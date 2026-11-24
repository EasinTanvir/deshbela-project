"use server";

import { updateUserPassword } from "@/lib/authData";
import { getCurrentUser } from "@/lib/currentUser";
import { hashPassword, verifyPassword } from "@/lib/passwords";

function readPassword(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function changePassword(previousState, formData) {
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", errors: { form: "Please log in again." } };
  }

  const currentPassword = readPassword(formData, "currentPassword");
  const newPassword = readPassword(formData, "newPassword");
  const confirmPassword = readPassword(formData, "confirmPassword");

  const errors = {};
  if (!verifyPassword(currentPassword, user.passwordHash)) {
    errors.currentPassword = "Your current password is not correct.";
  }
  if (newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
    errors.newPassword = "Use at least 8 characters with at least one letter and one number.";
  } else if (newPassword === currentPassword) {
    errors.newPassword = "The new password must be different from the current one.";
  }
  if (confirmPassword !== newPassword) errors.confirmPassword = "The two passwords do not match.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  await updateUserPassword(user.id, hashPassword(newPassword));

  return { status: "saved", errors: {} };
}
