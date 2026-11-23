import NewsCard from "@/components/common/NewsCard";

export default function TagNewsList({ articles }) {
  const [leadArticle, ...otherArticles] = articles;

  return (
    <div>
      <NewsCard article={leadArticle} variant="large" />

      {otherArticles.length > 0 && (
        <ul className="mt-8 divide-y divide-line border-t border-line">
          {otherArticles.map((article) => (
            <li key={article.id} className="py-4">
              <NewsCard article={article} variant="horizontal" showSummary />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
