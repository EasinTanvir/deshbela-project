import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";

export default function CategorySection({ category, articles }) {
  if (articles.length === 0) return null;
  const [lead, ...others] = articles;

  return (
    <section aria-label={`${category.name} news`}>
      <SectionTitle title={category.name} href={`/category/${category.slug}`} />
      <NewsCard article={lead} showCategory={false} />
      <div className="mt-3 divide-y divide-line border-t border-line">
        {others.map((article) => (
          <div key={article.id} className="py-2.5">
            <NewsCard article={article} variant="text" showCategory={false} />
          </div>
        ))}
      </div>
    </section>
  );
}
