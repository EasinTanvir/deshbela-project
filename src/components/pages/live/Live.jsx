import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import LivePlayer from "@/components/pages/live/LivePlayer";
import LiveSchedule from "@/components/pages/live/LiveSchedule";
import PastStreams from "@/components/pages/live/PastStreams";
import { getCurrentLiveStream, getPastStreams, getUpcomingStreams } from "@/lib/liveData";

export default async function Live() {
  const [current, upcoming, past] = await Promise.all([
    getCurrentLiveStream(),
    getUpcomingStreams(),
    getPastStreams(),
  ]);

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Live", href: "/live" }]} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Live</h1>
        <p className="mt-2 text-muted">Watch news events, press conferences and talk shows as they happen.</p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          <LivePlayer stream={current} />
        </div>
        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <LiveSchedule streams={upcoming} />
          <AdSlot size="rectangle" />
        </aside>
      </div>

      <div className="mt-12">
        <PastStreams streams={past} />
      </div>
    </Container>
  );
}
