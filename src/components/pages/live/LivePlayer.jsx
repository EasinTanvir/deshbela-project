import LiveBadge from "@/components/pages/live/LiveBadge";
import { formatDay, formatTime } from "@/lib/formatDate";

export default function LivePlayer({ stream }) {
  if (!stream) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center border border-line bg-surface px-6 text-center">
        <p className="font-serif text-2xl font-bold text-ink">We are not live right now</p>
        <p className="mt-2 text-muted">See the schedule for our next live stream.</p>
      </div>
    );
  }

  return (
    <section aria-label="Live stream">
      <div className="flex aspect-video flex-col items-center justify-center border border-line bg-surface px-6 text-center">
        <LiveBadge />
        <p className="mt-4 max-w-md text-muted">The stream opens on our YouTube channel.</p>
        <a
          href={stream.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          &#9654; Watch the live stream
        </a>
      </div>
      <div className="mt-4 border-b border-line pb-5">
        <h2 className="font-serif text-3xl font-bold leading-tight text-ink">{stream.title}</h2>
        <p className="mt-2 text-sm text-muted">
          Started at{" "}
          <time dateTime={stream.startsAt}>
            {formatTime(stream.startsAt)}, {formatDay(stream.startsAt)}
          </time>
        </p>
      </div>
    </section>
  );
}
