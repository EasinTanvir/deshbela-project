import { notFound } from "next/navigation";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import RankedNewsList from "@/components/common/RankedNewsList";
import TagList from "@/components/common/TagList";
import TagHeader from "@/components/pages/tag/TagHeader";
import TagNewsList from "@/components/pages/tag/TagNewsList";
import { getMostReadNews, getPopularTags, getTagBySlug, getTagNews } from "@/lib/tagData";

export default async function Tag({ slug }) {
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const news = await getTagNews(tag.id);
  const [mostRead, otherTags] = await Promise.all([
    getMostReadNews(news.map((article) => article.id)),
    getPopularTags(tag.id),
  ]);

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: tag.name, href: `/tag/${tag.slug}` }]} />
      <TagHeader tag={tag} total={news.length} />

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          {news.length > 0 ? (
            <TagNewsList articles={news} />
          ) : (
            <p className="border-y border-line py-10 text-center text-muted">No news with this topic yet.</p>
          )}
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <TagList title="Other Topics" tags={otherTags} />
          <RankedNewsList title="Most Read" articles={mostRead} />
          <div className="flex justify-center">
            <AdSlot size="rectangle" />
          </div>
        </aside>
      </div>
    </Container>
  );
}
