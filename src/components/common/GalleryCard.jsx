import Image from "next/image";
import Link from "next/link";
import { formatDay } from "@/lib/formatDate";

export default function GalleryCard({ gallery, large = false }) {
  const href = `/gallery/${gallery.slug}`;

  return (
    <article>
      <Link href={href} className="relative block aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={gallery.cover.file}
          alt={gallery.cover.altText}
          fill
          preload={large}
          placeholder="blur"
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <span className="absolute bottom-0 left-0 bg-ink/85 px-2 py-1 text-xs font-semibold text-paper">
          {gallery.photos.length} photos
        </span>
      </Link>
      <h3
        className={`mt-2 font-serif font-bold leading-snug ${large ? "text-2xl md:text-3xl" : "text-lg"}`}
      >
        <Link href={href} className="text-ink decoration-1 underline-offset-2 hover:underline">
          {gallery.title}
        </Link>
      </h3>
      <time dateTime={gallery.createdAt} className="mt-1 block text-xs text-muted">
        {formatDay(gallery.createdAt)}
      </time>
    </article>
  );
}
