import { notFound } from "next/navigation";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import ArticleActions from "@/components/pages/article/ArticleActions";
import ArticleBody from "@/components/pages/article/ArticleBody";
import ArticleHeader from "@/components/pages/article/ArticleHeader";
import ArticleImage from "@/components/pages/article/ArticleImage";
import ArticleSchema from "@/components/pages/article/ArticleSchema";
import ArticleSidebar from "@/components/pages/article/ArticleSidebar";
import ArticleTags from "@/components/pages/article/ArticleTags";
import CommentSection from "@/components/pages/article/CommentSection";
import RelatedNews from "@/components/pages/article/RelatedNews";
import {
  getArticleBySlug,
  getComments,
  getLatestNews,
  getMostRead,
  getReactionCounts,
  getRelatedNews,
} from "@/lib/articleData";
import { getSiteConfig } from "@/lib/siteData";

export default async function Article({ slug }) {
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [reactions, comments, related, latest, mostRead] = await Promise.all([
    getReactionCounts(article.id),
    getComments(article.id),
    getRelatedNews(article),
    getLatestNews(article.id),
    getMostRead(article.id),
  ]);

  const site = getSiteConfig();
  const articleUrl = `${site.siteUrl}/news/${article.slug}`;

  const breadcrumbItems = [];
  if (article.parentCategory) {
    breadcrumbItems.push({ label: article.parentCategory.name, href: `/category/${article.parentCategory.slug}` });
  }
  breadcrumbItems.push({ label: article.category.name, href: `/category/${article.category.slug}` });

  return (
    <>
      <ArticleSchema article={article} articleUrl={articleUrl} site={site} />

      <Container className="mt-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <article className="min-w-0 lg:col-span-8 lg:pr-8">
            <ArticleHeader article={article} articleUrl={articleUrl} />
            <ArticleImage image={article.image} caption={article.imageAlt} />
            <ArticleBody paragraphs={article.paragraphs} isMembersOnly={article.isMembersOnly} />
            <ArticleTags tags={article.tags} />
            <ArticleActions reactions={reactions} />
          </article>

          <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            <ArticleSidebar latest={latest} mostRead={mostRead} />
          </aside>
        </div>
      </Container>

      <Container className="mt-10">
        <AdSlot />
      </Container>

      <Container className="mt-10 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8 lg:pr-8">
          <CommentSection comments={comments} />
        </div>
      </Container>

      <Container className="mt-10">
        <RelatedNews articles={related} />
      </Container>
    </>
  );
}
