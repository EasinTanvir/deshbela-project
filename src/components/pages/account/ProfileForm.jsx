"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/profileActions";
import FormField from "@/components/common/FormField";

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function ProfileForm({ name, email }) {
  const [state, formAction, pending] = useActionState(updateProfile, {
    status: "idle",
    errors: {},
    values: { name, email },
  });
  const { errors, values } = state;

  function fieldProps(field) {
    return {
      id: `profile-${field}`,
      name: field,
      defaultValue: values[field] || "",
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `profile-${field}-error` : undefined,
      className: `${fieldClass} ${errors[field] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "saved" && (
        <p role="status" className="border border-line bg-surface px-3 py-2 text-sm text-ink">
          Your details have been saved.
        </p>
      )}
      {errors.form && (
        <p role="alert" className="border border-brand px-3 py-2 text-sm text-brand">
          {errors.form}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="profile-name" label="Full name" error={errors.name}>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
        </FormField>
        <FormField id="profile-email" label="Email address" error={errors.email}>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save details"}
      </button>
    </form>
  );
}
