import Image from "next/image";
import Link from "next/link";
import PublishedDate from "@/components/common/PublishedDate";

export default function VideoCard({ video }) {
  const href = `/videos/${video.slug}`;

  return (
    <article>
      <Link href={href} className="relative block aspect-video overflow-hidden bg-surface">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
          className="object-cover"
        />
        <span className="absolute bottom-0 left-0 bg-ink/85 px-2 py-1 text-xs font-semibold text-paper">
          &#9654; {video.duration}
        </span>
      </Link>
      <h3 className="mt-2 line-clamp-2 font-serif text-base font-semibold leading-snug">
        <Link href={href} className="text-ink decoration-1 underline-offset-2 hover:underline">
          {video.title}
        </Link>
      </h3>
      <div className="mt-1">
        <PublishedDate date={video.publishedAt} />
      </div>
    </article>
  );
}
