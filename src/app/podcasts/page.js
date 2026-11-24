import Podcasts from "@/components/pages/podcasts/Podcasts";

export const metadata = {
  title: "Podcasts",
  description: "Listen to DESHBELA podcasts: weekly news talk, explainers and interviews from our newsroom.",
  alternates: { canonical: "/podcasts" },
};

export default function PodcastsPage() {
  return <Podcasts />;
}
