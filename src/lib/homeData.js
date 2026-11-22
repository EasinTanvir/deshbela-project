import categories from "@/data/categories";
import videos from "@/data/videos";
import {
  getCategoryWithChildrenIds,
  getPublished,
  mostViewedFirst,
  newestFirst,
  withCategory,
} from "@/lib/articleHelpers";

const HOURS_48 = 48 * 60 * 60 * 1000;

export async function getBreakingNews(limit = 5) {
  return getPublished()
    .filter((article) => article.isBreaking)
    .sort((a, b) => a.breakingPriority - b.breakingPriority)
    .slice(0, limit)
    .map(withCategory);
}

export async function getTickerHeadlines(limit = 10) {
  const breaking = await getBreakingNews();
  const breakingIds = breaking.map((article) => article.id);
  const latest = getPublished()
    .filter((article) => !breakingIds.includes(article.id))
    .sort(newestFirst)
    .map(withCategory);

  return [...breaking, ...latest].slice(0, limit);
}

export async function getTopStories(limit = 4) {
  return getPublished()
    .filter((article) => !article.isBreaking && !article.isFeatured)
    .sort(newestFirst)
    .slice(0, limit)
    .map(withCategory);
}

export async function getTrending(limit = 5) {
  const published = getPublished().sort(newestFirst);
  if (published.length === 0) return [];

  const newestTime = new Date(published[0].publishedAt).getTime();
  return published
    .filter((article) => newestTime - new Date(article.publishedAt).getTime() <= HOURS_48)
    .sort(mostViewedFirst)
    .slice(0, limit)
    .map(withCategory);
}

export async function getFeatured(limit = 4) {
  return getPublished()
    .filter((article) => article.isFeatured)
    .sort(newestFirst)
    .slice(0, limit)
    .map(withCategory);
}

export async function getCategorySections(perCategory = 4) {
  const published = getPublished().sort(newestFirst);

  return categories
    .filter((category) => category.parentId === null)
    .map((category) => {
      const categoryIds = getCategoryWithChildrenIds(category.id);
      return {
        category,
        articles: published
          .filter((article) => categoryIds.includes(article.categoryId))
          .slice(0, perCategory)
          .map(withCategory),
      };
    });
}

export async function getPopular(limit = 5) {
  return getPublished().sort(mostViewedFirst).slice(0, limit).map(withCategory);
}

export async function getLatest(limit = 8) {
  return getPublished().sort(newestFirst).slice(0, limit).map(withCategory);
}

export async function getVideos(limit = 4) {
  return [...videos].sort(newestFirst).slice(0, limit);
}
