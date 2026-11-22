import Link from "next/link";
import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";
import { formatTime } from "@/lib/formatDate";

export default function PopularLatest({ popular, latest }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-8">
      <section aria-label="Popular articles">
        <SectionTitle title="Popular" />
        <div className="divide-y divide-line">
          {popular.map((article) => (
            <div key={article.id} className="py-3 first:pt-0">
              <NewsCard article={article} variant="horizontal" />
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Latest updates">
        <SectionTitle title="Latest Updates" />
        <ol className="divide-y divide-line">
          {latest.map((article) => (
            <li key={article.id} className="flex gap-4 py-2.5 first:pt-0">
              <time dateTime={article.publishedAt} className="w-16 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-brand">
                {formatTime(article.publishedAt)}
              </time>
              <div className="min-w-0">
                <Link
                  href={`/news/${article.slug}`}
                  className="font-serif text-base font-semibold leading-snug text-ink decoration-1 underline-offset-2 hover:underline"
                >
                  {article.title}
                </Link>
                {article.category && <p className="mt-0.5 text-xs text-muted">{article.category.name}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
