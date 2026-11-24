"use server";

import { revalidatePath } from "next/cache";
import { getMainCategoryOptions, setFavouriteCategories } from "@/lib/accountData";
import { getCurrentUser } from "@/lib/currentUser";

export async function saveFavouriteCategories(previousState, formData) {
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", message: "Please log in again." };
  }

  const allowedIds = (await getMainCategoryOptions()).map((category) => category.id);
  const chosenIds = formData
    .getAll("categories")
    .filter((value) => typeof value === "string" && allowedIds.includes(value));

  await setFavouriteCategories(user.id, chosenIds);
  revalidatePath("/account/feed");

  return {
    status: "saved",
    message: chosenIds.length > 0 ? "Your feed has been updated." : "All sections removed. Your feed now shows the latest news.",
  };
}
