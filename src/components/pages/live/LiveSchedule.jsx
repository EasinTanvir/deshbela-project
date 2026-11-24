import SectionTitle from "@/components/common/SectionTitle";
import { formatDay, formatTime } from "@/lib/formatDate";

export default function LiveSchedule({ streams }) {
  return (
    <section>
      <SectionTitle title="Coming Up" />
      {streams.length === 0 ? (
        <p className="text-muted">No live streams are planned yet.</p>
      ) : (
        <ul className="divide-y divide-line">
          {streams.map((stream) => (
            <li key={stream.id} className="flex gap-4 py-3 first:pt-0">
              <time dateTime={stream.startsAt} className="w-20 shrink-0 text-sm">
                <span className="block font-semibold text-brand">{formatTime(stream.startsAt)}</span>
                <span className="block text-xs text-muted">{formatDay(stream.startsAt)}</span>
              </time>
              <p className="font-serif font-semibold leading-snug text-ink">{stream.title}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
