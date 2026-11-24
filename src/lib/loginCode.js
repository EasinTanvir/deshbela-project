import { createHmac, timingSafeEqual } from "node:crypto";

export const LOGIN_CODE_COOKIE = "deshbela_login_code";

export const LOGIN_CODE_MINUTES = 10;

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

export function packLoginCode(userId, codeHash) {
  const text = `${userId}|${codeHash}`;
  return `${text}|${sign(text)}`;
}

export function unpackLoginCode(value) {
  const parts = (value || "").split("|");
  if (parts.length !== 3) return null;

  const [userId, codeHash, signature] = parts;
  const expected = Buffer.from(sign(`${userId}|${codeHash}`), "hex");
  const actual = Buffer.from(signature, "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  return { userId, codeHash };
}
