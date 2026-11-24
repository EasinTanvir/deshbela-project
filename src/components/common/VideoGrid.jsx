import SectionTitle from "@/components/common/SectionTitle";
import VideoCard from "@/components/common/VideoCard";

export default function VideoGrid({ title, videos }) {
  if (videos.length === 0) return null;

  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
