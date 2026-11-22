import categories from "@/data/categories";
import {
  getCategoryWithChildrenIds,
  getPublished,
  mostViewedFirst,
  newestFirst,
  withCategory,
} from "@/lib/articleHelpers";

export async function getCategorySlugs() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function getCategoryBySlug(slug) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return null;

  const parentCategory = categories.find((item) => item.id === category.parentId) || null;
  const mainCategory = parentCategory || category;
  const subCategories = categories.filter((item) => item.parentId === mainCategory.id);

  return { ...category, parentCategory, mainCategory, subCategories };
}

export async function getCategoryNews(categoryId) {
  const categoryIds = getCategoryWithChildrenIds(categoryId);

  return getPublished()
    .filter((article) => categoryIds.includes(article.categoryId))
    .sort(newestFirst)
    .map(withCategory);
}

export async function getMostReadInCategory(categoryId, limit = 5) {
  const categoryIds = getCategoryWithChildrenIds(categoryId);

  return getPublished()
    .filter((article) => categoryIds.includes(article.categoryId))
    .sort(mostViewedFirst)
    .slice(0, limit)
    .map(withCategory);
}
