import SectionTitle from "@/components/common/SectionTitle";
import { formatDay } from "@/lib/formatDate";

export default function PastStreams({ streams }) {
  if (streams.length === 0) return null;

  return (
    <section>
      <SectionTitle title="Past Live Streams" />
      <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {streams.map((stream) => (
          <li key={stream.id} className="border-b border-line py-4">
            <time dateTime={stream.startsAt} className="text-xs text-muted">
              {formatDay(stream.startsAt)}
            </time>
            <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-ink">{stream.title}</h3>
            <a
              href={stream.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
            >
              Watch the recording
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
