import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

export default function OtherAuthors({ authors }) {
  if (authors.length === 0) return null;

  return (
    <section aria-label="Other reporters">
      <SectionTitle title="Other Reporters" />
      <ul className="divide-y divide-line">
        {authors.map((author) => (
          <li key={author.id} className="py-3 first:pt-0">
            <Link
              href={`/author/${author.slug}`}
              className="font-serif text-base font-semibold text-ink decoration-1 underline-offset-2 hover:underline"
            >
              {author.name}
            </Link>
            <p className="text-xs text-muted">{author.designation}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
