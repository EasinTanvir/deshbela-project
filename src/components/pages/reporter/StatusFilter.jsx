import Link from "next/link";

export default function StatusFilter({ counts, activeSlug, total }) {
  const options = [{ slug: null, label: "All", count: total }, ...counts];

  return (
    <nav aria-label="Filter by status">
      <ul className="flex gap-1 overflow-x-auto border-b border-line">
        {options.map((option) => {
          const isActive = option.slug === activeSlug;
          const href = option.slug ? `/reporter/articles?status=${option.slug}` : "/reporter/articles";

          return (
            <li key={option.label} className="shrink-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`block whitespace-nowrap px-3 py-2 text-sm ${
                  isActive ? "border-b-2 border-brand font-semibold text-brand" : "text-ink hover:underline"
                }`}
              >
                {option.label} ({option.count})
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
