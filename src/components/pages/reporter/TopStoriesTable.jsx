import Link from "next/link";

export default function TopStoriesTable({ articles, totalViews }) {
  if (articles.length === 0) {
    return <p className="text-muted">None of your stories have been published yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-y border-line text-left text-sm">
        <thead>
          <tr className="border-b border-ink text-xs uppercase tracking-wide text-muted">
            <th scope="col" className="py-2 pr-3 font-semibold">#</th>
            <th scope="col" className="py-2 pr-3 font-semibold">Story</th>
            <th scope="col" className="py-2 pr-3 font-semibold">Section</th>
            <th scope="col" className="py-2 pr-3 text-right font-semibold">Views</th>
            <th scope="col" className="py-2 text-right font-semibold">Share</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {articles.map((article, index) => (
            <tr key={article.id}>
              <td className="py-2.5 pr-3 font-serif text-lg font-bold text-muted">{index + 1}</td>
              <td className="py-2.5 pr-3">
                <Link href={`/news/${article.slug}`} className="font-serif font-semibold text-ink hover:underline">
                  {article.title}
                </Link>
              </td>
              <td className="py-2.5 pr-3 text-muted">{article.category ? article.category.name : "-"}</td>
              <td className="py-2.5 pr-3 text-right tabular-nums text-ink">{article.viewCount.toLocaleString("en-US")}</td>
              <td className="py-2.5 text-right tabular-nums text-muted">
                {totalViews > 0 ? `${Math.round((article.viewCount / totalViews) * 100)}%` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
