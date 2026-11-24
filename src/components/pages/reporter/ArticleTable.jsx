import Link from "next/link";
import StatusLabel from "@/components/pages/reporter/StatusLabel";
import { formatDay } from "@/lib/formatDate";

export default function ArticleTable({ articles }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {articles.map((article) => (
        <li key={article.id} className="grid gap-1 py-3 sm:grid-cols-12 sm:items-center sm:gap-4">
          <div className="min-w-0 sm:col-span-7">
            <Link
              href={`/reporter/articles/${article.id}`}
              className="font-serif text-base font-semibold leading-snug text-ink hover:underline"
            >
              {article.title}
            </Link>
            <p className="text-xs text-muted">{article.category ? article.category.name : "No section yet"}</p>
          </div>
          <div className="sm:col-span-2">
            <StatusLabel status={article.status} />
          </div>
          <p className="text-xs text-muted sm:col-span-3 sm:text-right">
            {article.status === "PUBLISHED" ? `${article.viewCount.toLocaleString("en-US")} views · ` : "Updated "}
            <time dateTime={article.lastChangedAt}>{formatDay(article.lastChangedAt)}</time>
          </p>
        </li>
      ))}
    </ul>
  );
}
