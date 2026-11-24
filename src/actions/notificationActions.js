"use server";

import { setNewsletterSubscription } from "@/lib/accountData";
import { getCurrentUser } from "@/lib/currentUser";

export async function saveNotificationSettings(previousState, formData) {
  const user = await getCurrentUser();
  if (!user) {
    return { status: "error", message: "Please log in again." };
  }

  const wantsNewsletter = formData.get("newsletter") === "on";
  await setNewsletterSubscription(user, wantsNewsletter);

  return {
    status: "saved",
    newsletter: wantsNewsletter,
    message: wantsNewsletter
      ? "Saved. You will get the morning newsletter by email."
      : "Saved. You will not get the newsletter any more.",
  };
}
