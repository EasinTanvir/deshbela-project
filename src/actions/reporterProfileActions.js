"use server";

import { revalidatePath } from "next/cache";
import { nameToSlug } from "@/lib/articleHelpers";
import { getCurrentUser } from "@/lib/currentUser";
import { readImageUpload } from "@/lib/imageUpload";
import { updateReporterProfile } from "@/lib/reporterData";

export async function saveReporterProfile(previousState, formData) {
  const round = previousState.round + 1;
  const user = await getCurrentUser();
  if (!user || user.roleId !== "role-reporter") {
    return { status: "error", round, errors: { form: "Please log in again as a reporter." }, values: previousState.values };
  }

  const bioValue = formData.get("bio");
  const values = { bio: typeof bioValue === "string" ? bioValue.trim() : "" };

  const errors = {};
  if (values.bio.length < 30) errors.bio = "Please write at least 30 letters about yourself.";
  else if (values.bio.length > 400) errors.bio = "Please keep your bio under 400 letters.";

  const photo = formData.get("photo");
  let photoUrl = null;
  if (photo && typeof photo !== "string" && photo.size > 0) {
    const upload = await readImageUpload(photo);
    if (upload.error) errors.photo = upload.error;
    else photoUrl = upload.dataUrl;
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", round, errors, values };
  }

  await updateReporterProfile(user.id, { bio: values.bio, photoUrl });
  revalidatePath("/reporter/profile");
  revalidatePath(`/author/${nameToSlug(user.name)}`);

  return { status: "saved", round, errors: {}, values };
}
