import Link from "next/link";

export default function PlanCard({ plan, isBestValue }) {
  return (
    <article
      className={`flex flex-col border p-6 ${isBestValue ? "border-2 border-ink" : "border-line"}`}
    >
      <p className={`h-4 text-xs font-semibold uppercase tracking-wider ${isBestValue ? "text-brand" : "text-muted"}`}>
        {isBestValue ? "Best value" : ""}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-bold text-ink">{plan.name}</h3>
      <p className="mt-4">
        <span className="font-serif text-4xl font-bold text-ink">Tk {plan.price}</span>
        <span className="ml-1 text-sm text-muted">/ {plan.durationDays} days</span>
      </p>
      <p className="mt-1 text-sm text-muted">About Tk {plan.pricePerMonth} a month</p>
      <Link
        href={`/login?plan=${plan.id}`}
        className={`mt-6 block px-4 py-2.5 text-center text-sm font-semibold ${
          isBestValue ? "bg-brand text-paper hover:bg-brand-dark" : "border border-ink text-ink hover:bg-surface"
        }`}
      >
        Choose {plan.name}
      </Link>
    </article>
  );
}
