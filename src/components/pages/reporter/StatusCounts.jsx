import Link from "next/link";

export default function StatusCounts({ counts }) {
  return (
    <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-5">
      {counts.map((status) => (
        <li key={status.value} className="border-b border-r border-line">
          <Link href={`/reporter/articles?status=${status.slug}`} className="block px-4 py-4 hover:bg-surface">
            <span className="block font-serif text-3xl font-bold text-ink">{status.count}</span>
            <span className="text-sm text-muted">{status.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
