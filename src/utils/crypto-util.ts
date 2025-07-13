import crypto from "crypto";

export const encrypt = (text: string) => {
  const algorithm = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM;
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const iv = process.env.NEXT_PUBLIC_ENCRYPTION_IV;
  if (!algorithm || !key || !iv) {
    throw new Error("Encryption configuration is missing");
  }
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};
