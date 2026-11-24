"use client";

import { useActionState } from "react";
import { saveReporterProfile } from "@/actions/reporterProfileActions";
import FormField from "@/components/common/FormField";

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function ReporterProfileForm({ bio }) {
  const [state, formAction, pending] = useActionState(saveReporterProfile, {
    status: "idle",
    round: 0,
    errors: {},
    values: { bio },
  });
  const { errors, values } = state;

  return (
    <form key={state.round} action={formAction} noValidate className="space-y-5">
      {state.status === "saved" && (
        <p role="status" className="border border-line bg-surface px-3 py-2 text-sm text-ink">
          Your profile has been saved. Readers see it on your reporter page.
        </p>
      )}
      {errors.form && (
        <p role="alert" className="border border-brand px-3 py-2 text-sm text-brand">
          {errors.form}
        </p>
      )}

      <FormField id="profile-bio" label="About you" error={errors.bio}>
        <textarea
          id="profile-bio"
          name="bio"
          rows={5}
          defaultValue={values.bio}
          aria-invalid={errors.bio ? true : undefined}
          aria-describedby={errors.bio ? "profile-bio-error" : "profile-bio-hint"}
          className={`${fieldClass} ${errors.bio ? "border-brand" : "border-line"}`}
        />
        <p id="profile-bio-hint" className="mt-1 text-xs text-muted">
          A few lines about what you cover. Between 30 and 400 letters.
        </p>
      </FormField>

      <FormField id="profile-photo" label="New photo (optional)" error={errors.photo}>
        <input
          id="profile-photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-invalid={errors.photo ? true : undefined}
          aria-describedby={errors.photo ? "profile-photo-error" : "profile-photo-hint"}
          className={`${fieldClass} ${errors.photo ? "border-brand" : "border-line"} file:mr-3 file:border-0 file:bg-surface file:px-3 file:py-1 file:text-sm file:font-semibold file:text-ink`}
        />
        <p id="profile-photo-hint" className="mt-1 text-xs text-muted">
          A clear photo of your face. JPG, PNG or WebP, up to 2 MB.
        </p>
      </FormField>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
