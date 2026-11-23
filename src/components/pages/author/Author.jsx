import { notFound } from "next/navigation";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";
import AuthorHeader from "@/components/pages/author/AuthorHeader";
import OtherAuthors from "@/components/pages/author/OtherAuthors";
import { getAuthorBySlug, getAuthorNews, getOtherAuthors } from "@/lib/authorData";

export default async function Author({ slug }) {
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const [news, otherAuthors] = await Promise.all([getAuthorNews(author.id), getOtherAuthors(author.id)]);
  const firstName = author.name.split(" ")[0];

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: author.name, href: `/author/${author.slug}` }]} />
      <AuthorHeader author={author} total={news.length} />

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          <SectionTitle title={`News by ${firstName}`} />
          {news.length > 0 ? (
            <ul className="divide-y divide-line">
              {news.map((article) => (
                <li key={article.id} className="py-4 first:pt-0">
                  <NewsCard article={article} variant="horizontal" showSummary />
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-y border-line py-10 text-center text-muted">No news from this reporter yet.</p>
          )}
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <OtherAuthors authors={otherAuthors} />
          <div className="flex justify-center">
            <AdSlot size="rectangle" />
          </div>
        </aside>
      </div>
    </Container>
  );
}
