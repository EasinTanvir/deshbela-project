import { notFound } from "next/navigation";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import VideoListItem from "@/components/common/VideoListItem";
import VideoInfo from "@/components/pages/videoDetails/VideoInfo";
import VideoPlayer from "@/components/pages/videoDetails/VideoPlayer";
import VideoGrid from "@/components/common/VideoGrid";
import { getLatestVideos, getMoreVideos, getVideoBySlug } from "@/lib/videoData";
import { getSiteConfig } from "@/lib/siteData";

export default async function VideoDetails({ slug }) {
  const video = await getVideoBySlug(slug);
  if (!video) notFound();

  const [moreVideos, latestVideos] = await Promise.all([getMoreVideos(video), getLatestVideos(video.id)]);
  const site = getSiteConfig();
  const videoUrl = `${site.siteUrl}/videos/${video.slug}`;

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Video", href: "/videos" }]} />

      <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <article className="min-w-0 lg:col-span-8 lg:pr-8">
          <VideoPlayer video={video} />
          <VideoInfo video={video} videoUrl={videoUrl} />
        </article>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <section>
            <SectionTitle title="Latest Videos" href="/videos" />
            <ul className="divide-y divide-line">
              {latestVideos.map((item) => (
                <li key={item.id} className="py-3 first:pt-0">
                  <VideoListItem video={item} />
                </li>
              ))}
            </ul>
          </section>
          <AdSlot size="rectangle" />
        </aside>
      </div>

      <div className="mt-12">
        <VideoGrid title="More Videos" videos={moreVideos} />
      </div>
    </Container>
  );
}
