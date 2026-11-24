"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerReader } from "@/actions/registerActions";
import FormField from "@/components/common/FormField";

const initialState = { status: "idle", errors: {}, values: {} };

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerReader, initialState);
  const { errors, values } = state;

  if (state.status === "created") {
    return (
      <div role="status">
        <h2 className="font-serif text-2xl font-bold text-ink">Welcome to DESHBELA{values.name ? `, ${values.name}` : ""}</h2>
        <p className="mt-2 text-muted">Your account has been created. You can now log in.</p>
        <Link
          href="/login"
          className="mt-5 inline-block bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Log in
        </Link>
      </div>
    );
  }

  function fieldProps(name, keepValue = true) {
    return {
      id: `register-${name}`,
      name,
      defaultValue: keepValue ? values[name] || "" : undefined,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `register-${name}-error` : undefined,
      className: `${fieldClass} ${errors[name] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <FormField id="register-name" label="Full name" error={errors.name}>
        <input type="text" autoComplete="name" {...fieldProps("name")} />
      </FormField>

      <FormField id="register-email" label="Email address" error={errors.email}>
        <input type="email" autoComplete="email" {...fieldProps("email")} />
      </FormField>

      <FormField id="register-password" label="Password" error={errors.password}>
        <input type="password" autoComplete="new-password" {...fieldProps("password", false)} />
      </FormField>
      {!errors.password && (
        <p className="-mt-3 text-xs text-muted">At least 8 characters, with a letter and a number.</p>
      )}

      <FormField id="register-confirmPassword" label="Confirm password" error={errors.confirmPassword}>
        <input type="password" autoComplete="new-password" {...fieldProps("confirmPassword", false)} />
      </FormField>

      <div>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="terms"
            defaultChecked={values.terms === true}
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "register-terms-error" : undefined}
            className="mt-1 accent-brand"
          />
          <span>
            I accept the{" "}
            <Link href="/terms" className="font-semibold underline hover:text-brand">
              Terms and Conditions
            </Link>{" "}
            and the{" "}
            <Link href="/privacy-policy" className="font-semibold underline hover:text-brand">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.terms && (
          <p id="register-terms-error" className="mt-1 text-sm text-brand">
            {errors.terms}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="register-website">Leave this field empty</label>
        <input id="register-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
