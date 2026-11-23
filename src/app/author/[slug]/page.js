import Author from "@/components/pages/author/Author";
import { getAuthorBySlug, getAuthorSlugs } from "@/lib/authorData";

export async function generateStaticParams() {
  return getAuthorSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Reporter not found" };

  return {
    title: `${author.name}, ${author.designation}`,
    description: author.bio,
    alternates: { canonical: `/author/${author.slug}` },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  return <Author slug={slug} />;
}
