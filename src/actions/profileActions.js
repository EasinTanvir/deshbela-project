"use server";

import { findUserByEmail, updateUserProfile } from "@/lib/authData";
import { getCurrentUser } from "@/lib/currentUser";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateProfile(previousState, formData) {
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", errors: { form: "Please log in again." }, values: {} };
  }

  const values = { name: readText(formData, "name"), email: readText(formData, "email") };

  const errors = {};
  if (values.name.length < 2) errors.name = "Please write your name.";
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please write a valid email address.";
  } else {
    const owner = await findUserByEmail(values.email);
    if (owner && owner.id !== user.id) errors.email = "Another account already uses this email.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  await updateUserProfile(user.id, values);

  return { status: "saved", errors: {}, values };
}
