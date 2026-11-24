import Link from "next/link";
import { readPaymentResult } from "@/lib/membershipData";

const messages = {
  success: {
    label: "Payment successful",
    title: "Welcome, you are now a member",
    text: "Thank you for supporting DESHBELA. You can now read members-only stories, save news and join the conversation.",
    action: { label: "Start reading", href: "/" },
  },
  failed: {
    label: "Payment failed",
    title: "Your payment did not go through",
    text: "No money was taken from your account. Please check your payment details and try again.",
    action: { label: "Try again", href: "/membership" },
  },
  cancelled: {
    label: "Payment cancelled",
    title: "You cancelled the payment",
    text: "Your membership was not started. You can choose a plan again at any time.",
    action: { label: "Back to plans", href: "/membership" },
  },
  unknown: {
    label: "No payment found",
    title: "We could not find a payment",
    text: "This page shows the result after you pay for a membership. Choose a plan to become a member.",
    action: { label: "See membership plans", href: "/membership" },
  },
};

export default async function PaymentResult({ searchParams }) {
  const { status, plan } = await readPaymentResult(searchParams);
  const message = messages[status];
  const isSuccess = status === "success";

  return (
    <div role="status" className="border-y border-line py-10 text-center">
      <p className={`text-xs font-semibold uppercase tracking-wider ${isSuccess ? "text-ink" : "text-brand"}`}>
        {message.label}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">{message.title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-lg text-muted">{message.text}</p>

      {plan && status !== "unknown" && (
        <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-y-2 border border-line p-4 text-left text-sm">
          <dt className="text-muted">Plan</dt>
          <dd className="font-semibold text-ink">{plan.name}</dd>
          <dt className="text-muted">Price</dt>
          <dd className="font-semibold text-ink">Tk {plan.price}</dd>
          <dt className="text-muted">Length</dt>
          <dd className="font-semibold text-ink">{plan.durationDays} days</dd>
        </dl>
      )}

      <Link
        href={message.action.href}
        className="mt-8 inline-block bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
      >
        {message.action.label}
      </Link>
    </div>
  );
}
