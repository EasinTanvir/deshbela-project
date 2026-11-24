import { removeMedia } from "@/actions/mediaActions";
import MediaImage from "@/components/common/MediaImage";
import formatFileSize from "@/lib/formatFileSize";
import { formatDay } from "@/lib/formatDate";

export default function MediaGrid({ items }) {
  if (items.length === 0) {
    return <p className="border-y border-line py-8 text-center text-muted">You have not uploaded any photos yet.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="border-b border-line pb-4">
          <figure>
            <div className="relative aspect-[3/2] bg-surface">
              <MediaImage file={item.file} alt={item.altText} sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw" />
            </div>
            <figcaption className="mt-2 text-sm leading-snug text-ink">{item.caption || item.altText}</figcaption>
          </figure>
          <p className="mt-1 text-xs text-muted">
            {formatFileSize(item.sizeBytes)} &middot; uploaded{" "}
            <time dateTime={item.createdAt}>{formatDay(item.createdAt)}</time>
          </p>
          <div className="mt-2 text-xs">
            {item.usedIn > 0 ? (
              <span className="text-muted">
                Used in {item.usedIn} {item.usedIn === 1 ? "article" : "articles"}
              </span>
            ) : (
              <form action={removeMedia}>
                <input type="hidden" name="mediaId" value={item.id} />
                <button
                  type="submit"
                  aria-label={`Delete the photo "${item.altText}"`}
                  className="font-semibold text-brand hover:underline"
                >
                  Delete
                </button>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
