import CategoryBadge from "@/components/common/CategoryBadge";
import PublishedDate from "@/components/common/PublishedDate";
import BookmarkButton from "@/components/pages/article/BookmarkButton";
import ShareLinks from "@/components/pages/article/ShareLinks";

export default function ArticleHeader({ article, articleUrl }) {
  return (
    <header>
      {article.sponsorName && (
        <p className="mb-3 inline-block bg-article-sponsored-bg px-2 py-1 text-xs font-semibold uppercase tracking-wider text-article-sponsored">
          Sponsored by {article.sponsorName}
        </p>
      )}

      <div>
        <CategoryBadge category={article.category} />
        {article.isMembersOnly && (
          <span className="ml-2 border-l border-line pl-2 text-xs font-semibold uppercase tracking-wider text-muted">
            Members only
          </span>
        )}
      </div>

      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-[2.6rem]">
        {article.title}
      </h1>
      <p className="mt-3 font-serif text-lg leading-relaxed text-muted md:text-xl">{article.metaDescription}</p>

      <div className="mt-5 flex flex-col gap-4 border-y border-line py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-ink">
            By{" "}
            {article.authors.map((author, index) => (
              <span key={author.id}>
                {index > 0 && " and "}
                <span className="font-semibold">{author.name}</span>
              </span>
            ))}
          </p>
          {article.authors.length === 1 && article.authors[0].designation && (
            <p className="text-xs text-muted">{article.authors[0].designation}</p>
          )}
          <div className="mt-0.5">
            <PublishedDate date={article.publishedAt} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ShareLinks url={articleUrl} title={article.title} />
          <BookmarkButton />
        </div>
      </div>
    </header>
  );
}
