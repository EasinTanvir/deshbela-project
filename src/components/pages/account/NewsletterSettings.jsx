"use client";

import { useActionState } from "react";
import { saveNotificationSettings } from "@/actions/notificationActions";

export default function NewsletterSettings({ email, isSubscribed }) {
  const [state, formAction, pending] = useActionState(saveNotificationSettings, {
    status: "idle",
    newsletter: isSubscribed,
    message: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      {state.message && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`border px-3 py-2 text-sm ${
            state.status === "error" ? "border-brand text-brand" : "border-line bg-surface text-ink"
          }`}
        >
          {state.message}
        </p>
      )}

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="newsletter"
          defaultChecked={state.newsletter}
          className="mt-1 h-4 w-4 accent-brand"
        />
        <span>
          <span className="block font-semibold text-ink">Morning newsletter</span>
          <span className="block text-sm text-muted">
            The top stories of the day, sent every morning at 7 am to {email}.
          </span>
        </span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
