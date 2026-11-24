import Image from "next/image";

function getYoutubeId(url) {
  if (!url) return null;
  const parsed = new URL(url);
  if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
  return parsed.searchParams.get("v");
}

export default function VideoPlayer({ video }) {
  const youtubeId = getYoutubeId(video.youtubeUrl);

  if (youtubeId) {
    return (
      <div className="relative aspect-video bg-surface">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={video.title}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden bg-surface">
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        preload
        placeholder="blur"
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-paper/90 px-4 py-3 text-sm text-ink">
        This video will play here once it is uploaded to our YouTube channel.
      </div>
    </div>
  );
}
