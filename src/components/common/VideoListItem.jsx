import Image from "next/image";
import Link from "next/link";
import PublishedDate from "@/components/common/PublishedDate";

export default function VideoListItem({ video }) {
  const href = `/videos/${video.slug}`;

  return (
    <article className="flex gap-3">
      <Link href={href} className="relative block aspect-video w-32 shrink-0 overflow-hidden bg-surface">
        <Image src={video.thumbnail} alt={video.title} fill placeholder="blur" sizes="128px" className="object-cover" />
        <span className="absolute bottom-0 left-0 bg-ink/85 px-1.5 py-0.5 text-[11px] font-semibold text-paper">
          &#9654; {video.duration}
        </span>
      </Link>
      <div className="min-w-0">
        <h3 className="line-clamp-3 font-serif text-base font-semibold leading-snug">
          <Link href={href} className="text-ink decoration-1 underline-offset-2 hover:underline">
            {video.title}
          </Link>
        </h3>
        <div className="mt-1">
          <PublishedDate date={video.publishedAt} />
        </div>
      </div>
    </article>
  );
}
