import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/common/CategoryBadge";
import PublishedDate from "@/components/common/PublishedDate";

export default function LeadVideo({ video }) {
  const href = `/videos/${video.slug}`;

  return (
    <article>
      <Link href={href} className="relative block aspect-video overflow-hidden bg-surface">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <span className="absolute bottom-0 left-0 bg-ink/85 px-3 py-1.5 text-sm font-semibold text-paper">
          &#9654; Watch &middot; {video.duration}
        </span>
      </Link>
      <div className="mt-3">
        <CategoryBadge category={video.category} />
      </div>
      <h2 className="mt-1 font-serif text-2xl font-bold leading-tight md:text-3xl">
        <Link href={href} className="text-ink decoration-2 underline-offset-4 hover:underline">
          {video.title}
        </Link>
      </h2>
      <div className="mt-2">
        <PublishedDate date={video.publishedAt} />
      </div>
    </article>
  );
}
