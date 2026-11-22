import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";

export default function TopStories({ articles }) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Top stories">
      <SectionTitle title="Top Stories" />
      <div className="divide-y divide-line">
        {articles.map((article, index) => (
          <div key={article.id} className="py-3 first:pt-0">
            <NewsCard article={article} variant="text" showSummary={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
