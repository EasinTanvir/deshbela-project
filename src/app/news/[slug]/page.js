import Article from "@/components/pages/article/Article";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articleData";

export async function generateStaticParams() {
  return getArticleSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "News not found" };

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      publishedTime: article.publishedAt,
      images: [{ url: article.image.src, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  return <Article slug={slug} />;
}
