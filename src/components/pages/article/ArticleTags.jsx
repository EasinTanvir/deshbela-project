import Link from "next/link";

export default function ArticleTags({ tags }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">Tags</span>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/tag/${tag.slug}`}
          className="border border-line px-2 py-1 text-sm text-ink hover:border-ink hover:underline"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
