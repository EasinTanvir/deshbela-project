import Videos from "@/components/pages/videos/Videos";

export const metadata = {
  title: "Video News",
  description: "Watch the latest news videos from DESHBELA: national, politics, economy, sports and more.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return <Videos />;
}
