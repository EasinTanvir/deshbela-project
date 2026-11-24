import { readSignedValue, signValue } from "@/lib/signing";

export const LOGIN_CODE_COOKIE = "deshbela_login_code";

export const LOGIN_CODE_MINUTES = 10;

export function packLoginCode(userId, codeHash) {
  return signValue(`${userId}|${codeHash}`);
}

export function unpackLoginCode(value) {
  const text = readSignedValue(value);
  if (!text) return null;

  const [userId, codeHash] = text.split("|");
  if (!userId || !codeHash) return null;

  return { userId, codeHash };
}
