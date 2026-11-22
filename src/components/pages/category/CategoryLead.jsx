import NewsCard from "@/components/common/NewsCard";

export default function CategoryLead({ leadArticle, sideArticles }) {
  return (
    <section aria-label="Top news" className="grid gap-6 md:grid-cols-3 md:gap-0">
      <div className={sideArticles.length > 0 ? "md:col-span-2 md:pr-6" : "md:col-span-3"}>
        <NewsCard article={leadArticle} variant="large" />
      </div>

      {sideArticles.length > 0 && (
        <ul className="divide-y divide-line border-t border-line pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          {sideArticles.map((article) => (
            <li key={article.id} className="py-3 first:pt-0">
              <NewsCard article={article} variant="text" showSummary />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
