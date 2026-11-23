import articles from "@/data/articles";
import categories from "@/data/categories";

export function getPublished() {
  return articles.filter((article) => article.status === "PUBLISHED");
}

export function withCategory(article) {
  const category = categories.find((item) => item.id === article.categoryId);
  return { ...article, category };
}

export function newestFirst(a, b) {
  return new Date(b.publishedAt) - new Date(a.publishedAt);
}

export function mostViewedFirst(a, b) {
  return b.viewCount - a.viewCount;
}

export function getCategoryWithChildrenIds(categoryId) {
  const childIds = categories.filter((item) => item.parentId === categoryId).map((item) => item.id);
  return [categoryId, ...childIds];
}

export function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
