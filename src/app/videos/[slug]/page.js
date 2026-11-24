import VideoDetails from "@/components/pages/videoDetails/VideoDetails";
import { getVideoBySlug, getVideoSlugs } from "@/lib/videoData";

export async function generateStaticParams() {
  const slugs = await getVideoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) return { title: "Video not found" };

  return {
    title: video.title,
    description: `Watch: ${video.title}. ${video.category.name} video news from DESHBELA.`,
    alternates: { canonical: `/videos/${video.slug}` },
    openGraph: { title: video.title, type: "video.other" },
  };
}

export default async function VideoDetailsPage({ params }) {
  const { slug } = await params;
  return <VideoDetails slug={slug} />;
}
