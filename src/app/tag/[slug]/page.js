import Tag from "@/components/pages/tag/Tag";
import { getTagBySlug, getTagSlugs } from "@/lib/tagData";

export async function generateStaticParams() {
  return getTagSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return { title: "Topic not found" };

  return {
    title: `${tag.name} News`,
    description: `All DESHBELA news about ${tag.name.toLowerCase()}.`,
    alternates: { canonical: `/tag/${tag.slug}` },
  };
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  return <Tag slug={slug} />;
}
