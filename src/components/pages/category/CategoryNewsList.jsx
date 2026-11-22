import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";

export default function CategoryNewsList({ articles }) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="More news" className="mt-10">
      <SectionTitle title="More News" />
      <ul className="divide-y divide-line">
        {articles.map((article) => (
          <li key={article.id} className="py-4 first:pt-0">
            <NewsCard article={article} variant="horizontal" showSummary />
          </li>
        ))}
      </ul>
    </section>
  );
}
