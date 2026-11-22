import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";

export default function RelatedNews({ articles }) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Related news">
      <SectionTitle title="Related News" />
      <div className="grid gap-6 sm:grid-cols-2 lg:-mx-5 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
        {articles.map((article) => (
          <div key={article.id} className="lg:px-5">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
