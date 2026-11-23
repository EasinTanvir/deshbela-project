import NewsCard from "@/components/common/NewsCard";

export default function SearchResultList({ filters, articles }) {
  const countText = articles.length === 1 ? "1 result" : `${articles.length} results`;

  return (
    <section aria-label="Search results" className="mt-6">
      <p className="text-sm text-muted">
        {countText}
        {filters.q && (
          <>
            {" "}
            for <span className="font-semibold text-ink">&ldquo;{filters.q}&rdquo;</span>
          </>
        )}
      </p>

      {articles.length > 0 ? (
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {articles.map((article) => (
            <li key={article.id} className="py-4">
              <NewsCard article={article} variant="horizontal" showSummary />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 border-y border-line py-10 text-center text-muted">
          No news matched your search. Try another word or remove a filter.
        </p>
      )}
    </section>
  );
}
