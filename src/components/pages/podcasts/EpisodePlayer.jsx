import formatDate from "@/lib/formatDate";
import formatDuration from "@/lib/formatDuration";

export default function EpisodePlayer({ episode, number }) {
  return (
    <section aria-label="Now playing" className="border-2 border-ink p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">Episode {number}</p>
      <h2 className="mt-1 font-serif text-2xl font-bold leading-tight text-ink md:text-3xl">{episode.title}</h2>
      <p className="mt-2 text-xs text-muted">
        <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt)}</time> &middot;{" "}
        {formatDuration(episode.duration)}
      </p>

      {episode.audioUrl ? (
        <audio key={episode.id} controls preload="none" src={episode.audioUrl} className="mt-5 w-full">
          Your browser cannot play this audio.
        </audio>
      ) : (
        <div className="mt-5 flex items-center gap-3 bg-surface px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-muted" aria-hidden="true">
            &#9654;
          </span>
          <div className="h-1 flex-1 bg-line" aria-hidden="true" />
          <span className="text-sm text-muted">Audio coming soon</span>
        </div>
      )}
    </section>
  );
}
