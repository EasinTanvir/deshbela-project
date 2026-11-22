import AdSlot from "@/components/common/AdSlot";
import Container from "@/components/common/Container";
import BreakingSlider from "@/components/pages/home/BreakingSlider";
import CategorySection from "@/components/pages/home/CategorySection";
import FeaturedNews from "@/components/pages/home/FeaturedNews";
import NewsTicker from "@/components/pages/home/NewsTicker";
import PopularLatest from "@/components/pages/home/PopularLatest";
import TopStories from "@/components/pages/home/TopStories";
import TrendingNews from "@/components/pages/home/TrendingNews";
import VideoNews from "@/components/pages/home/VideoNews";
import {
  getBreakingNews,
  getCategorySections,
  getFeatured,
  getLatest,
  getPopular,
  getTickerHeadlines,
  getTopStories,
  getTrending,
  getVideos,
} from "@/lib/homeData";

export default async function Home() {
  const [headlines, breaking, trending, topStories, featured, categorySections, videos, popular, latest] =
    await Promise.all([
      getTickerHeadlines(),
      getBreakingNews(),
      getTrending(),
      getTopStories(),
      getFeatured(),
      getCategorySections(),
      getVideos(),
      getPopular(),
      getLatest(),
    ]);

  return (
    <>
      <h1 className="sr-only">DESHBELA - Latest news from Bangladesh and the world</h1>

      <NewsTicker headlines={headlines} />

      <Container className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="lg:order-2 lg:col-span-6 lg:border-x lg:border-line lg:px-6">
          <BreakingSlider items={breaking} />
        </div>
        <div className="lg:order-1 lg:col-span-3 lg:pr-6">
          <TopStories articles={topStories} />
        </div>
        <div className="lg:order-3 lg:col-span-3 lg:pl-6">
          <TrendingNews articles={trending} />
        </div>
      </Container>

      <Container className="mt-10">
        <AdSlot />
      </Container>

      <Container className="mt-10">
        <FeaturedNews articles={featured} />
      </Container>

      <Container className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {categorySections.map(({ category, articles }) => (
          <CategorySection key={category.id} category={category} articles={articles} />
        ))}
        <div className="flex justify-center sm:pt-10">
          <AdSlot size="rectangle" />
        </div>
      </Container>

      <Container className="mt-10">
        <VideoNews videos={videos} />
      </Container>

      <Container className="mt-10">
        <PopularLatest popular={popular} latest={latest} />
      </Container>
    </>
  );
}
