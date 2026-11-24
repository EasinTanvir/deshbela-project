"use client";

import { useActionState } from "react";
import { sendAdvertiserInquiry } from "@/actions/advertiseActions";
import FormField from "@/components/common/FormField";

const initialState = { status: "idle", errors: {}, values: {} };

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function AdvertiseForm() {
  const [state, formAction, pending] = useActionState(sendAdvertiserInquiry, initialState);
  const { errors, values } = state;

  if (state.status === "sent") {
    return (
      <div role="status" className="border-y border-line py-8">
        <h2 className="font-serif text-2xl font-bold text-ink">Thank you for your interest</h2>
        <p className="mt-2 text-muted">Our advertising team will contact you within two working days.</p>
      </div>
    );
  }

  function fieldProps(name) {
    return {
      id: `advertise-${name}`,
      name,
      defaultValue: values[name] || "",
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `advertise-${name}-error` : undefined,
      className: `${fieldClass} ${errors[name] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <FormField id="advertise-name" label="Your name or company" error={errors.name}>
        <input type="text" autoComplete="organization" {...fieldProps("name")} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="advertise-email" label="Email address" error={errors.email}>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
        </FormField>
        <FormField id="advertise-phone" label="Phone number" error={errors.phone}>
          <input type="tel" autoComplete="tel" {...fieldProps("phone")} />
        </FormField>
      </div>

      <FormField id="advertise-message" label="What would you like to promote?" error={errors.message}>
        <textarea rows={6} {...fieldProps("message")} />
      </FormField>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="advertise-website">Leave this field empty</label>
        <input id="advertise-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
