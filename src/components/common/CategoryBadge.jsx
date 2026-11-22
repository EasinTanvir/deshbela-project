import Link from "next/link";

export default function CategoryBadge({ category }) {
  if (!category) return null;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
    >
      {category.name}
    </Link>
  );
}
