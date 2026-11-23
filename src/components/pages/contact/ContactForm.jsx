"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/actions/contactActions";
import FormField from "@/components/pages/contact/FormField";

const initialState = { status: "idle", errors: {}, values: {} };

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const { errors, values } = state;

  if (state.status === "sent") {
    return (
      <div role="status" className="border-y border-line py-8">
        <h2 className="font-serif text-2xl font-bold text-ink">Thank you for writing to us</h2>
        <p className="mt-2 text-muted">We have received your message. Our team will reply within two working days.</p>
      </div>
    );
  }

  function fieldProps(name) {
    return {
      id: `contact-${name}`,
      name,
      defaultValue: values[name] || "",
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
      className: `${fieldClass} ${errors[name] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-name" label="Your name" error={errors.name}>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
        </FormField>
        <FormField id="contact-email" label="Email address" error={errors.email}>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
        </FormField>
      </div>

      <FormField id="contact-subject" label="Subject" error={errors.subject}>
        <input type="text" {...fieldProps("subject")} />
      </FormField>

      <FormField id="contact-message" label="Message" error={errors.message}>
        <textarea rows={7} {...fieldProps("message")} />
      </FormField>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
