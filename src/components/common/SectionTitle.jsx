import Link from "next/link";

export default function SectionTitle({ title, href }) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-2 border-ink pt-2">
      <h2 className="font-serif text-xl font-bold text-ink">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-muted hover:text-brand hover:underline">
          More
        </Link>
      )}
    </div>
  );
}
