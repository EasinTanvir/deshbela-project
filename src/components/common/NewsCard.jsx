import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/common/CategoryBadge";
import PublishedDate from "@/components/common/PublishedDate";

const titleLink = "text-ink decoration-1 underline-offset-2 hover:underline";

export default function NewsCard({ article, variant = "default", showSummary = false, showCategory = true }) {
  const href = `/news/${article.slug}`;

  if (variant === "text") {
    return (
      <article>
        {showCategory && <CategoryBadge category={article.category} />}
        <h3 className="mt-0.5 font-serif text-base font-semibold leading-snug md:text-lg">
          <Link href={href} className={titleLink}>
            {article.title}
          </Link>
        </h3>
        {showSummary && <p className="mt-1 text-sm leading-relaxed text-muted">{article.metaDescription}</p>}
        <div className="mt-1">
          <PublishedDate date={article.publishedAt} />
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="flex gap-3">
        <Link href={href} className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden bg-surface sm:w-28">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="112px"
            placeholder="blur"
            className="object-cover"
          />
        </Link>
        <div className="min-w-0">
          {showCategory && <CategoryBadge category={article.category} />}
          <h3 className="mt-0.5 line-clamp-3 font-serif text-base font-semibold leading-snug">
            <Link href={href} className={titleLink}>
              {article.title}
            </Link>
          </h3>
          <div className="mt-1">
            <PublishedDate date={article.publishedAt} />
          </div>
        </div>
      </article>
    );
  }

  const isLarge = variant === "large";

  return (
    <article>
      <Link href={href} className="relative block aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={article.image}
          alt={article.title}
          fill
          placeholder="blur"
          sizes={isLarge ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
      </Link>
      <div className="mt-2">
        {showCategory && <CategoryBadge category={article.category} />}
        <h3
          className={
            isLarge
              ? "mt-0.5 font-serif text-2xl font-bold leading-tight md:text-3xl"
              : "mt-0.5 font-serif text-lg font-semibold leading-snug"
          }
        >
          <Link href={href} className={titleLink}>
            {article.title}
          </Link>
        </h3>
        {(isLarge || showSummary) && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted md:text-base">{article.metaDescription}</p>
        )}
        <div className="mt-1.5">
          <PublishedDate date={article.publishedAt} />
        </div>
      </div>
    </article>
  );
}
