import AdSlot from "@/components/common/AdSlot";
import NewsCard from "@/components/common/NewsCard";
import RankedNewsList from "@/components/common/RankedNewsList";
import SectionTitle from "@/components/common/SectionTitle";

export default function ArticleSidebar({ latest, mostRead }) {
  return (
    <div className="space-y-10">
      <section aria-label="Latest news">
        <SectionTitle title="Latest" />
        <ul className="divide-y divide-line">
          {latest.map((article) => (
            <li key={article.id} className="py-3 first:pt-0">
              <NewsCard article={article} variant="horizontal" />
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-center">
        <AdSlot size="rectangle" />
      </div>

      <RankedNewsList title="Most Read" articles={mostRead} />
    </div>
  );
}
