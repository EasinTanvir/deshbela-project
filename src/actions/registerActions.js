"use server";

import { isEmailTaken } from "@/lib/authData";
import { hashPassword } from "@/lib/passwords";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function registerReader(previousState, formData) {
  const values = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
  };
  const password = typeof formData.get("password") === "string" ? formData.get("password") : "";
  const confirmPassword = typeof formData.get("confirmPassword") === "string" ? formData.get("confirmPassword") : "";
  const agreed = formData.get("terms") === "on";

  if (readText(formData, "website") !== "") {
    return { status: "created", errors: {}, values: {} };
  }

  const errors = {};
  if (values.name.length < 2) errors.name = "Please write your name.";
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please write a valid email address.";
  } else if (await isEmailTaken(values.email)) {
    errors.email = "An account with this email already exists. Try logging in.";
  }
  if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    errors.password = "Use at least 8 characters with at least one letter and one number.";
  }
  if (confirmPassword !== password) errors.confirmPassword = "The two passwords do not match.";
  if (!agreed) errors.terms = "Please accept the Terms and Conditions.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values: { ...values, terms: agreed } };
  }

  const newUser = {
    roleId: "role-reader",
    name: values.name,
    email: values.email.toLowerCase(),
    passwordHash: hashPassword(password),
    twoFactorEnabled: false,
    status: "ACTIVE",
  };

  return { status: "created", errors: {}, values: { name: newUser.name } };
}
