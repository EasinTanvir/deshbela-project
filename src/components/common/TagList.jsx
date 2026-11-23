import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

export default function TagList({ title, tags }) {
  if (tags.length === 0) return null;

  return (
    <section aria-label={title}>
      <SectionTitle title={title} />
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link
              href={`/tag/${tag.slug}`}
              className="block border border-line px-2 py-1 text-sm text-ink hover:border-ink hover:underline"
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
