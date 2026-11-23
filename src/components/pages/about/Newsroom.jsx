import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

export default function Newsroom({ authors }) {
  return (
    <section aria-label="Our newsroom" className="mt-12">
      <SectionTitle title="Our Newsroom" />
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {authors.map((author) => (
          <li key={author.id} className="border-b border-line py-3">
            <Link
              href={`/author/${author.slug}`}
              className="font-serif text-lg font-semibold text-ink decoration-1 underline-offset-2 hover:underline"
            >
              {author.name}
            </Link>
            <p className="text-sm text-muted">{author.designation}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
