import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import VideoListItem from "@/components/common/VideoListItem";
import LeadVideo from "@/components/pages/videos/LeadVideo";
import VideoGrid from "@/components/common/VideoGrid";
import { getAllVideos } from "@/lib/videoData";

export default async function Videos() {
  const videos = await getAllVideos();
  const [lead, ...rest] = videos;
  const upNext = rest.slice(0, 4);
  const moreVideos = rest.slice(4);

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Video", href: "/videos" }]} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Video News</h1>
        <p className="mt-2 text-muted">The day&apos;s news in short videos from our reporters.</p>
      </header>

      {lead ? (
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="min-w-0 lg:col-span-8 lg:pr-8">
            <LeadVideo video={lead} />
          </div>
          <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            <SectionTitle title="Up Next" />
            <ul className="divide-y divide-line">
              {upNext.map((video) => (
                <li key={video.id} className="py-3 first:pt-0">
                  <VideoListItem video={video} />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      ) : (
        <p className="mt-8 text-muted">No videos have been published yet.</p>
      )}

      <div className="my-10">
        <AdSlot />
      </div>

      <VideoGrid title="More Videos" videos={moreVideos} />
    </Container>
  );
}
