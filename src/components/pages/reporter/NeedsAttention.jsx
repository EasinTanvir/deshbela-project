import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { formatDay } from "@/lib/formatDate";

export default function NeedsAttention({ articles }) {
  if (articles.length === 0) return null;

  return (
    <section>
      <SectionTitle title="Needs your attention" />
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="border border-line p-4">
            <p className="font-serif text-lg font-semibold leading-snug text-ink">{article.title}</p>
            {article.feedback && (
              <>
                <blockquote className="mt-1 text-sm leading-relaxed text-ink">{article.feedback.comment}</blockquote>
                <p className="mt-1 text-xs text-muted">
                  {article.feedback.editorName},{" "}
                  <time dateTime={article.feedback.reviewedAt}>{formatDay(article.feedback.reviewedAt)}</time>
                </p>
              </>
            )}
            <Link
              href={`/reporter/articles/${article.id}`}
              className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
            >
              Fix and send again
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
