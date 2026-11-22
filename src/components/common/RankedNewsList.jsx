import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

export default function RankedNewsList({ title, articles }) {
  if (articles.length === 0) return null;

  return (
    <section aria-label={title}>
      <SectionTitle title={title} />
      <ol className="divide-y divide-line">
        {articles.map((article, index) => (
          <li key={article.id} className="flex gap-3 py-3 first:pt-0">
            <span className="w-6 shrink-0 font-serif text-2xl font-bold leading-none text-muted/50">{index + 1}</span>
            <Link
              href={`/news/${article.slug}`}
              className="font-serif text-base font-semibold leading-snug text-ink decoration-1 underline-offset-2 hover:underline"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
