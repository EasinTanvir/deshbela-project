import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is missing. Add it to the .env file.");
  }
  return "local-development-secret";
}

function sign(text) {
  return createHmac("sha256", getSecret()).update(text).digest("hex");
}

export function signValue(text) {
  return `${text}|${sign(text)}`;
}

export function readSignedValue(value) {
  const parts = (value || "").split("|");
  if (parts.length < 2) return null;

  const signature = parts.pop();
  const text = parts.join("|");
  const expected = Buffer.from(sign(text), "hex");
  const actual = Buffer.from(signature, "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  return text;
}
