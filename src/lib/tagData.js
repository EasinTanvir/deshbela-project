import articleTags from "@/data/articleTags";
import tags from "@/data/tags";
import { getPublished, mostViewedFirst, newestFirst, withCategory } from "@/lib/articleHelpers";

function getPublishedIdsForTag(tagId) {
  const publishedIds = getPublished().map((article) => article.id);
  return articleTags
    .filter((link) => link.tagId === tagId && publishedIds.includes(link.articleId))
    .map((link) => link.articleId);
}

export async function getTagSlugs() {
  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function getTagBySlug(slug) {
  return tags.find((tag) => tag.slug === slug) || null;
}

export async function getTagNews(tagId) {
  const articleIds = getPublishedIdsForTag(tagId);

  return getPublished()
    .filter((article) => articleIds.includes(article.id))
    .sort(newestFirst)
    .map(withCategory);
}

export async function getPopularTags(excludeId = null, limit = 12) {
  return tags
    .filter((tag) => tag.id !== excludeId)
    .map((tag) => ({ ...tag, count: getPublishedIdsForTag(tag.id).length }))
    .filter((tag) => tag.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export async function getMostReadNews(excludeIds = [], limit = 5) {
  return getPublished()
    .filter((article) => !excludeIds.includes(article.id))
    .sort(mostViewedFirst)
    .slice(0, limit)
    .map(withCategory);
}
