import Category from "@/components/pages/category/Category";
import { getCategoryBySlug, getCategorySlugs } from "@/lib/categoryData";

export async function generateStaticParams() {
  return getCategorySlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Section not found" };

  return {
    title: `${category.name} News`,
    description: `Latest ${category.name.toLowerCase()} news from DESHBELA.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  return <Category slug={slug} />;
}
