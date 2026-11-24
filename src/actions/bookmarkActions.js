"use server";

import { revalidatePath } from "next/cache";
import { removeBookmark } from "@/lib/accountData";
import { getCurrentUser } from "@/lib/currentUser";

export async function removeSavedNews(formData) {
  const user = await getCurrentUser();
  if (!user) return;

  const articleId = formData.get("articleId");
  if (typeof articleId !== "string" || articleId === "") return;

  await removeBookmark(user.id, articleId);
  revalidatePath("/account/bookmarks");
}
