import Link from "next/link";
import { formatDay } from "@/lib/formatDate";

export default function CurrentPlan({ current, last }) {
  if (current) {
    return (
      <section className="border-2 border-ink p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">Active membership</p>
        <h2 className="mt-1 font-serif text-3xl font-bold text-ink">{current.plan.name} plan</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">Started</dt>
            <dd className="font-semibold text-ink">
              <time dateTime={current.startDate}>{formatDay(current.startDate)}</time>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Ends</dt>
            <dd className="font-semibold text-ink">
              <time dateTime={current.endDate}>{formatDay(current.endDate)}</time>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Price</dt>
            <dd className="font-semibold text-ink">
              Tk {current.plan.price} / {current.plan.durationDays} days
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          Your membership does not renew by itself. We will email you a few days before it ends.
        </p>
      </section>
    );
  }

  return (
    <section className="border border-line p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">No active membership</p>
      <h2 className="mt-1 font-serif text-2xl font-bold text-ink">
        {last ? "Your membership has ended" : "You are not a member yet"}
      </h2>
      <p className="mt-2 text-muted">
        {last
          ? `Your ${last.plan.name} plan ended on ${formatDay(last.endDate)}. Choose a plan to read members-only stories again.`
          : "Become a member to read members-only stories and support our journalism."}
      </p>
      <Link
        href="/membership"
        className="mt-5 inline-block bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
      >
        See membership plans
      </Link>
    </section>
  );
}
