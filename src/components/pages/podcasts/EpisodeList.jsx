import SectionTitle from "@/components/common/SectionTitle";
import { formatDay } from "@/lib/formatDate";
import formatDuration from "@/lib/formatDuration";

export default function EpisodeList({ episodes, currentId, onSelect }) {
  return (
    <section className="mt-10">
      <SectionTitle title="All Episodes" />
      <ol className="divide-y divide-line">
        {episodes.map((episode, index) => {
          const isCurrent = episode.id === currentId;

          return (
            <li key={episode.id} className="flex items-center gap-4 py-4">
              <span className="w-8 shrink-0 font-serif text-2xl font-bold text-line">{episodes.length - index}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg font-semibold leading-snug text-ink">{episode.title}</h3>
                <p className="mt-1 text-xs text-muted">
                  <time dateTime={episode.publishedAt}>{formatDay(episode.publishedAt)}</time> &middot;{" "}
                  {formatDuration(episode.duration)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelect(episode.id)}
                aria-pressed={isCurrent}
                className={`shrink-0 px-3 py-1.5 text-sm font-semibold ${
                  isCurrent ? "bg-ink text-paper" : "border border-ink text-ink hover:bg-surface"
                }`}
              >
                {isCurrent ? "Playing" : "Listen"}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
