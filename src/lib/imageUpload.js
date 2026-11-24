export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const imageTypes = [
  { type: "image/jpeg", signature: [0xff, 0xd8, 0xff] },
  { type: "image/png", signature: [0x89, 0x50, 0x4e, 0x47] },
  { type: "image/webp", signature: [0x52, 0x49, 0x46, 0x46] },
];

export async function readImageUpload(file) {
  if (!file || typeof file === "string" || file.size === 0) {
    return { error: "Please choose a photo to upload." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "The photo is too big. Please choose one under 2 MB." };
  }

  const imageType = imageTypes.find((item) => item.type === file.type);
  if (!imageType) {
    return { error: "Please upload a JPG, PNG or WebP photo." };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const matches = imageType.signature.every((byte, index) => bytes[index] === byte);
  const isWebp = imageType.type !== "image/webp" || bytes.toString("ascii", 8, 12) === "WEBP";
  if (!matches || !isWebp) {
    return { error: "This file is not a real photo. Please choose another one." };
  }

  return {
    dataUrl: `data:${imageType.type};base64,${bytes.toString("base64")}`,
    sizeBytes: file.size,
  };
}
