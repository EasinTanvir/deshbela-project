import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import PodcastPlayer from "@/components/pages/podcasts/PodcastPlayer";
import { getPodcastEpisodes } from "@/lib/podcastData";

export default async function Podcasts() {
  const episodes = await getPodcastEpisodes();

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Podcasts", href: "/podcasts" }]} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Podcasts</h1>
        <p className="mt-2 text-muted">Listen to the news. A new episode every week from the DESHBELA newsroom.</p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          {episodes.length > 0 ? (
            <PodcastPlayer episodes={episodes} />
          ) : (
            <p className="text-muted">No episodes have been published yet.</p>
          )}
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <section>
            <SectionTitle title="About the show" />
            <p className="text-ink">
              Every week our reporters talk about the biggest stories, explain what they mean for you and answer
              questions from listeners. Each episode is about 20 to 35 minutes long.
            </p>
          </section>
          <AdSlot size="rectangle" />
        </aside>
      </div>
    </Container>
  );
}
