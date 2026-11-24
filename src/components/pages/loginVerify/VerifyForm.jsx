"use client";

import Link from "next/link";
import { useActionState } from "react";
import { verifyLoginCode } from "@/actions/verifyActions";

const initialState = { status: "idle", errors: {} };

export default function VerifyForm() {
  const [state, formAction, pending] = useActionState(verifyLoginCode, initialState);
  const error = state.errors.code;

  if (state.status === "expired") {
    return (
      <div role="alert">
        <h2 className="font-serif text-2xl font-bold text-ink">This code has expired</h2>
        <p className="mt-2 text-muted">Codes work for 10 minutes. Please log in again to get a new code.</p>
        <Link
          href="/login"
          className="mt-5 inline-block bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Log in again
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="verify-code" className="mb-1 block text-sm font-semibold text-ink">
          6-digit code
        </label>
        <input
          id="verify-code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={7}
          placeholder="123456"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "verify-code-error" : undefined}
          className={`w-full border bg-paper px-3 py-3 text-center font-serif text-2xl tracking-[0.4em] text-ink outline-none focus:border-ink ${
            error ? "border-brand" : "border-line"
          }`}
        />
        {error && (
          <p id="verify-code-error" className="mt-1 text-sm text-brand">
            {error}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="verify-website">Leave this field empty</label>
        <input id="verify-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Checking..." : "Check code"}
      </button>
    </form>
  );
}
