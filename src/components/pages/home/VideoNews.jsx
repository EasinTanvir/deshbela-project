import SectionTitle from "@/components/common/SectionTitle";
import VideoCard from "@/components/common/VideoCard";

export default function VideoNews({ videos }) {
  if (videos.length === 0) return null;

  return (
    <section aria-label="Video news">
      <SectionTitle title="Video" href="/videos" />
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
        {videos.map((video) => (
          <div key={video.id} className="w-4/5 shrink-0 snap-start sm:w-auto">
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </section>
  );
}
