import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import CategoryBadge from "@/components/common/CategoryBadge";

export default function TrendingNews({ articles }) {
  return (
    <aside aria-label="Trending news">
      <SectionTitle title="Trending" />
      <ol className="divide-y divide-line">
        {articles.map((article, index) => (
          <li key={article.id} className="flex gap-3 py-3 first:pt-0">
            <span className="w-7 shrink-0 font-serif text-3xl font-bold leading-none text-home-trending-num">
              {index + 1}
            </span>
            <div className="min-w-0">
              <CategoryBadge category={article.category} />
              <Link
                href={`/news/${article.slug}`}
                className="mt-0.5 block font-serif text-base font-semibold leading-snug text-ink decoration-1 underline-offset-2 hover:underline"
              >
                {article.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
