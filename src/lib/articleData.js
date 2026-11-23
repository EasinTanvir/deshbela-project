import articleAuthors from "@/data/articleAuthors";
import articleTags from "@/data/articleTags";
import categories from "@/data/categories";
import comments from "@/data/comments";
import reactions from "@/data/reactions";
import reporterProfiles from "@/data/reporterProfiles";
import sponsoredContent from "@/data/sponsoredContent";
import tags from "@/data/tags";
import users from "@/data/users";
import {
  getCategoryWithChildrenIds,
  getPublished,
  mostViewedFirst,
  nameToSlug,
  newestFirst,
  withCategory,
} from "@/lib/articleHelpers";

const REACTION_TYPES = [
  { type: "LIKE", label: "Like" },
  { type: "LOVE", label: "Love" },
  { type: "SAD", label: "Sad" },
  { type: "ANGRY", label: "Angry" },
];

function getAuthors(articleId) {
  return articleAuthors
    .filter((link) => link.articleId === articleId)
    .sort((a, b) => a.position - b.position)
    .map((link) => {
      const user = users.find((item) => item.id === link.userId);
      const profile = reporterProfiles.find((item) => item.userId === link.userId);
      return { id: user.id, name: user.name, slug: nameToSlug(user.name), designation: profile ? profile.designation : "" };
    });
}

function getTags(articleId) {
  return articleTags
    .filter((link) => link.articleId === articleId)
    .map((link) => tags.find((tag) => tag.id === link.tagId));
}

export async function getArticleSlugs() {
  return getPublished().map((article) => ({ slug: article.slug }));
}

export async function getArticleBySlug(slug) {
  const article = getPublished().find((item) => item.slug === slug);
  if (!article) return null;

  const withCat = withCategory(article);
  const parentCategory = categories.find((item) => item.id === withCat.category.parentId) || null;
  const sponsor = sponsoredContent.find((item) => item.articleId === article.id);

  return {
    ...withCat,
    parentCategory,
    authors: getAuthors(article.id),
    tags: getTags(article.id),
    sponsorName: sponsor ? sponsor.sponsorName : null,
    paragraphs: article.body.split("\n\n"),
  };
}

export async function getReactionCounts(articleId) {
  return REACTION_TYPES.map((item) => ({
    ...item,
    count: reactions.filter((reaction) => reaction.articleId === articleId && reaction.type === item.type).length,
  }));
}

export async function getComments(articleId) {
  const approved = comments
    .filter((comment) => comment.articleId === articleId && comment.status === "APPROVED")
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((comment) => {
      const user = users.find((item) => item.id === comment.userId);
      return { ...comment, userName: user ? user.name : "Reader" };
    });

  const threads = approved
    .filter((comment) => comment.parentId === null)
    .map((comment) => ({ ...comment, replies: approved.filter((reply) => reply.parentId === comment.id) }));

  return { total: approved.length, threads };
}

export async function getRelatedNews(article, limit = 4) {
  const tagIds = article.tags.map((tag) => tag.id);
  const mainCategoryId = article.parentCategory ? article.parentCategory.id : article.category.id;
  const categoryIds = getCategoryWithChildrenIds(mainCategoryId);

  const others = getPublished().filter((item) => item.id !== article.id);

  const related = others
    .map((item) => {
      const sharedTags = articleTags.filter((link) => link.articleId === item.id && tagIds.includes(link.tagId)).length;
      const sameCategory = categoryIds.includes(item.categoryId) ? 1 : 0;
      return { item, score: sharedTags * 2 + sameCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || newestFirst(a.item, b.item))
    .map((entry) => entry.item);

  const latest = others.filter((item) => !related.includes(item)).sort(newestFirst);

  return [...related, ...latest].slice(0, limit).map(withCategory);
}

export async function getLatestNews(excludeId, limit = 5) {
  return getPublished()
    .filter((article) => article.id !== excludeId)
    .sort(newestFirst)
    .slice(0, limit)
    .map(withCategory);
}

export async function getMostRead(excludeId, limit = 5) {
  return getPublished()
    .filter((article) => article.id !== excludeId)
    .sort(mostViewedFirst)
    .slice(0, limit)
    .map(withCategory);
}
