import Image from "next/image";

export default function ArticleImage({ image, caption }) {
  return (
    <figure className="mt-6">
      <div className="relative aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={image}
          alt={caption}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1280px) 820px, (min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 border-b border-line pb-2 text-xs text-muted">{caption}. File photo</figcaption>
    </figure>
  );
}
