"use client";

import { useActionState } from "react";
import { saveFavouriteCategories } from "@/actions/feedActions";

export default function FavouriteSections({ categories, selectedIds }) {
  const [state, formAction, pending] = useActionState(saveFavouriteCategories, { status: "idle", message: "" });

  return (
    <form action={formAction} className="border border-line p-4">
      <fieldset>
        <legend className="font-semibold text-ink">Choose the sections you like</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2 border border-line px-3 py-1.5 text-sm text-ink has-[:checked]:border-ink has-[:checked]:bg-surface"
            >
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                defaultChecked={selectedIds.includes(category.id)}
                className="accent-brand"
              />
              {category.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-brand px-5 py-2 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Saving..." : "Update my feed"}
        </button>
        {state.message && (
          <p role="status" className={`text-sm ${state.status === "error" ? "text-brand" : "text-muted"}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
