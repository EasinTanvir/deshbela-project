"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/currentUser";
import { readImageUpload } from "@/lib/imageUpload";
import { addMedia, deleteMedia } from "@/lib/reporterData";

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function uploadMedia(previousState, formData) {
  const round = previousState.round + 1;
  const user = await getCurrentUser();
  if (!user || user.roleId !== "role-reporter") {
    return { status: "error", round, errors: { form: "Please log in again as a reporter." }, values: {} };
  }

  const values = { altText: readText(formData, "altText"), caption: readText(formData, "caption") };

  const errors = {};
  if (values.altText.length < 5) errors.altText = "Please describe what the photo shows.";
  else if (values.altText.length > 150) errors.altText = "Please keep this under 150 letters.";
  if (values.caption.length > 200) errors.caption = "Please keep the caption under 200 letters.";

  const upload = await readImageUpload(formData.get("file"));
  if (upload.error) errors.file = upload.error;

  if (Object.keys(errors).length > 0) {
    return { status: "error", round, errors, values };
  }

  await addMedia(
    user.id,
    { file: upload.dataUrl, altText: values.altText, caption: values.caption, sizeBytes: upload.sizeBytes },
    new Date().toISOString(),
  );
  revalidatePath("/reporter/media");

  return { status: "saved", round, errors: {}, values: { altText: "", caption: "" } };
}

export async function removeMedia(formData) {
  const user = await getCurrentUser();
  if (!user || user.roleId !== "role-reporter") return;

  const mediaId = formData.get("mediaId");
  if (typeof mediaId !== "string" || mediaId === "") return;

  await deleteMedia(user.id, mediaId);
  revalidatePath("/reporter/media");
}
