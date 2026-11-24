"use client";

import { useActionState } from "react";
import { changePassword } from "@/actions/passwordActions";
import FormField from "@/components/common/FormField";

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, { status: "idle", errors: {} });
  const { errors } = state;

  function fieldProps(field, autoComplete) {
    return {
      id: `password-${field}`,
      name: field,
      type: "password",
      autoComplete,
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `password-${field}-error` : undefined,
      className: `${fieldClass} ${errors[field] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "saved" && (
        <p role="status" className="border border-line bg-surface px-3 py-2 text-sm text-ink">
          Your password has been changed.
        </p>
      )}
      {errors.form && (
        <p role="alert" className="border border-brand px-3 py-2 text-sm text-brand">
          {errors.form}
        </p>
      )}

      <FormField id="password-currentPassword" label="Current password" error={errors.currentPassword}>
        <input {...fieldProps("currentPassword", "current-password")} />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="password-newPassword" label="New password" error={errors.newPassword}>
          <input {...fieldProps("newPassword", "new-password")} />
        </FormField>
        <FormField id="password-confirmPassword" label="Confirm new password" error={errors.confirmPassword}>
          <input {...fieldProps("confirmPassword", "new-password")} />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="border border-ink px-6 py-2.5 text-sm font-semibold text-ink hover:bg-surface disabled:opacity-60"
      >
        {pending ? "Changing..." : "Change password"}
      </button>
    </form>
  );
}
