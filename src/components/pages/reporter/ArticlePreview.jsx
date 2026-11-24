import Link from "next/link";
import MediaImage from "@/components/common/MediaImage";
import formatDate from "@/lib/formatDate";

function statusNote(article) {
  if (article.status === "IN_REVIEW") {
    return "This article is with the editor. You can change it again if the editor sends it back.";
  }
  if (article.status === "SCHEDULED") {
    return `The editor has approved this article. It will be published on ${formatDate(article.scheduledAt)}.`;
  }
  return `Published on ${formatDate(article.publishedAt)}. Read ${article.viewCount.toLocaleString("en-US")} times so far.`;
}

export default function ArticlePreview({ article }) {
  const paragraphs = article.body.split("\n\n").filter(Boolean);

  return (
    <div className="max-w-3xl">
      <p className="border border-line bg-surface px-3 py-2 text-sm text-ink">
        {statusNote(article)}{" "}
        {article.status === "PUBLISHED" && (
          <Link href={`/news/${article.slug}`} className="font-semibold text-brand hover:underline">
            View it on the site
          </Link>
        )}
      </p>

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {article.category ? article.category.name : "No section"}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-bold leading-tight text-ink">{article.title}</h2>
        <p className="mt-2 text-lg leading-relaxed text-muted">{article.metaDescription}</p>
        {article.image && (
          <figure className="mt-4">
            <div className="relative aspect-[3/2] bg-surface">
              <MediaImage file={article.image} alt={article.imageAlt} sizes="(min-width: 1024px) 700px, 100vw" />
            </div>
            <figcaption className="mt-1 text-xs text-muted">{article.imageAlt}</figcaption>
          </figure>
        )}
        <div className="mt-4 space-y-4 leading-relaxed text-ink">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
