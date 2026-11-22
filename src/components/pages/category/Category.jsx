import { notFound } from "next/navigation";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import RankedNewsList from "@/components/common/RankedNewsList";
import CategoryHeader from "@/components/pages/category/CategoryHeader";
import CategoryLead from "@/components/pages/category/CategoryLead";
import CategoryNewsList from "@/components/pages/category/CategoryNewsList";
import { getCategoryBySlug, getCategoryNews, getMostReadInCategory } from "@/lib/categoryData";

export default async function Category({ slug }) {
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [news, mostRead] = await Promise.all([getCategoryNews(category.id), getMostReadInCategory(category.id)]);

  const leadArticle = news[0];
  const sideArticles = news.slice(1, 4);
  const moreArticles = news.slice(4);

  const breadcrumbItems = [];
  if (category.parentCategory) {
    breadcrumbItems.push({ label: category.parentCategory.name, href: `/category/${category.parentCategory.slug}` });
  }
  breadcrumbItems.push({ label: category.name, href: `/category/${category.slug}` });

  return (
    <Container className="mt-6">
      <Breadcrumb items={breadcrumbItems} />
      <CategoryHeader category={category} />

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          {leadArticle ? (
            <>
              <CategoryLead leadArticle={leadArticle} sideArticles={sideArticles} />
              <CategoryNewsList articles={moreArticles} />
            </>
          ) : (
            <p className="border-y border-line py-10 text-center text-muted">No news in this section yet.</p>
          )}
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <RankedNewsList title={`Most Read in ${category.name}`} articles={mostRead} />
          <div className="flex justify-center">
            <AdSlot size="rectangle" />
          </div>
        </aside>
      </div>
    </Container>
  );
}
