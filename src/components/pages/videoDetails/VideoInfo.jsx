import CategoryBadge from "@/components/common/CategoryBadge";
import PublishedDate from "@/components/common/PublishedDate";
import ShareLinks from "@/components/common/ShareLinks";

export default function VideoInfo({ video, videoUrl }) {
  return (
    <div className="mt-4 border-b border-line pb-5">
      <CategoryBadge category={video.category} />
      <h1 className="mt-1 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">{video.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 text-xs text-muted">
        <PublishedDate date={video.publishedAt} />
        <span aria-hidden="true">|</span>
        <span>Length {video.duration}</span>
      </div>
      <div className="mt-4">
        <ShareLinks url={videoUrl} title={video.title} />
      </div>
    </div>
  );
}
