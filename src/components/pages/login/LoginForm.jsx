"use client";

import Link from "next/link";
import { useActionState } from "react";
import { logIn } from "@/actions/loginActions";
import FormField from "@/components/common/FormField";

const initialState = { status: "idle", errors: {}, values: {} };

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(logIn, initialState);
  const { errors, values } = state;

  if (state.status === "success") {
    return (
      <div role="status">
        <h2 className="font-serif text-2xl font-bold text-ink">Welcome back, {values.name}</h2>
        <p className="mt-2 text-muted">You are logged in.</p>
        <Link
          href="/"
          className="mt-5 inline-block bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Go to the front page
        </Link>
      </div>
    );
  }

  function fieldProps(name, keepValue = true) {
    return {
      id: `login-${name}`,
      name,
      defaultValue: keepValue ? values[name] || "" : undefined,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `login-${name}-error` : undefined,
      className: `${fieldClass} ${errors[name] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {errors.form && (
        <p role="alert" className="border border-brand px-3 py-2 text-sm text-brand">
          {errors.form}
        </p>
      )}

      <FormField id="login-email" label="Email address" error={errors.email}>
        <input type="email" autoComplete="email" {...fieldProps("email")} />
      </FormField>

      <FormField id="login-password" label="Password" error={errors.password}>
        <input type="password" autoComplete="current-password" {...fieldProps("password", false)} />
      </FormField>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="login-website">Leave this field empty</label>
        <input id="login-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
