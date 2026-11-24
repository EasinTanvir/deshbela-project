import articleAuthors from "@/data/articleAuthors";
import articles from "@/data/articles";
import articleTags from "@/data/articleTags";
import categories from "@/data/categories";
import editorialReviews from "@/data/editorialReviews";
import media from "@/data/media";
import reporterProfiles from "@/data/reporterProfiles";
import tags from "@/data/tags";
import users from "@/data/users";
import { ARTICLE_STATUSES } from "@/lib/articleStatus";
import { withCategory } from "@/lib/articleHelpers";

function ownArticleIds(userId) {
  return articleAuthors.filter((link) => link.userId === userId).map((link) => link.articleId);
}

function lastChanged(article) {
  return article.updatedAt || article.publishedAt || article.createdAt;
}

function nextId(items, prefix) {
  const numbers = items.map((item) => Number(item.id.replace(`${prefix}-`, ""))).filter(Boolean);
  return `${prefix}-${Math.max(0, ...numbers) + 1}`;
}

function reviewsFor(articleId) {
  return editorialReviews
    .filter((review) => review.articleId === articleId)
    .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt))
    .map((review) => {
      const editor = users.find((user) => user.id === review.editorId);
      return { ...review, editorName: editor ? editor.name : "Editor" };
    });
}

export async function getReporterArticles(userId) {
  const ids = ownArticleIds(userId);

  return articles
    .filter((article) => ids.includes(article.id))
    .map((article) => ({ ...withCategory(article), lastChangedAt: lastChanged(article) }))
    .sort((a, b) => new Date(b.lastChangedAt) - new Date(a.lastChangedAt));
}

export async function getStatusCounts(userId) {
  const own = await getReporterArticles(userId);

  return ARTICLE_STATUSES.map((status) => ({
    ...status,
    count: own.filter((article) => article.status === status.value).length,
  }));
}

export async function getRejectedWithFeedback(userId) {
  const own = await getReporterArticles(userId);

  return own
    .filter((article) => article.status === "REJECTED")
    .map((article) => ({ ...article, feedback: reviewsFor(article.id)[0] || null }));
}

export async function getAllArticleIds() {
  return articles.map((article) => ({ id: article.id }));
}

export async function getReporterArticle(userId, articleId) {
  if (!ownArticleIds(userId).includes(articleId)) return null;

  const article = articles.find((item) => item.id === articleId);
  if (!article) return null;

  return {
    ...withCategory(article),
    tagIds: articleTags.filter((link) => link.articleId === articleId).map((link) => link.tagId),
    reviews: reviewsFor(articleId),
  };
}

export async function getArticleFormOptions(userId) {
  const sections = categories
    .filter((category) => !category.parentId)
    .map((parent) => ({
      ...parent,
      children: categories.filter((category) => category.parentId === parent.id),
    }));

  const photos = media
    .filter((item) => item.uploadedById === userId && item.type === "IMAGE")
    .map((item) => ({ id: item.id, file: item.file, altText: item.altText }));

  return { sections, tags, photos };
}

export async function isSlugTaken(slug, exceptArticleId) {
  return articles.some((article) => article.slug === slug && article.id !== exceptArticleId);
}

export async function isValidCategory(categoryId) {
  return categories.some((category) => category.id === categoryId);
}

export async function filterValidTagIds(tagIds) {
  return tagIds.filter((tagId) => tags.some((tag) => tag.id === tagId));
}

export async function findOwnPhoto(userId, mediaId) {
  return media.find((item) => item.id === mediaId && item.uploadedById === userId) || null;
}

function setArticleTags(articleId, tagIds) {
  for (let index = articleTags.length - 1; index >= 0; index -= 1) {
    if (articleTags[index].articleId === articleId) articleTags.splice(index, 1);
  }
  tagIds.forEach((tagId) => articleTags.push({ articleId, tagId }));
}

function articleFields(values, photo) {
  return {
    categoryId: values.categoryId || null,
    title: values.title,
    slug: values.slug,
    metaTitle: values.metaTitle || values.title,
    metaDescription: values.summary,
    body: values.body,
    featuredImageId: photo ? photo.id : null,
    image: photo ? photo.file : null,
    imageAlt: photo ? photo.altText : "",
  };
}

export async function createArticle(userId, values, photo, status, now) {
  const article = {
    id: nextId(articles, "art"),
    submittedById: userId,
    ...articleFields(values, photo),
    status,
    isBreaking: false,
    breakingPriority: 0,
    isFeatured: false,
    isMembersOnly: false,
    viewCount: 0,
    scheduledAt: null,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  articles.push(article);
  articleAuthors.push({ articleId: article.id, userId, position: 1 });
  setArticleTags(article.id, values.tagIds);

  return article.id;
}

export async function updateArticle(articleId, values, photo, status, now) {
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;

  Object.assign(article, articleFields(values, photo), { status, updatedAt: now });
  setArticleTags(articleId, values.tagIds);
}

export async function deleteArticle(articleId) {
  const index = articles.findIndex((item) => item.id === articleId);
  if (index !== -1) articles.splice(index, 1);

  for (let i = articleAuthors.length - 1; i >= 0; i -= 1) {
    if (articleAuthors[i].articleId === articleId) articleAuthors.splice(i, 1);
  }
  setArticleTags(articleId, []);
}

export async function getReporterMedia(userId) {
  return media
    .filter((item) => item.uploadedById === userId)
    .map((item) => ({
      ...item,
      usedIn: articles.filter((article) => article.featuredImageId === item.id).length,
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addMedia(userId, { file, altText, caption, sizeBytes }, now) {
  media.push({
    id: nextId(media, "media"),
    uploadedById: userId,
    type: "IMAGE",
    file,
    altText,
    caption,
    sizeBytes,
    createdAt: now,
  });
}

export async function deleteMedia(userId, mediaId) {
  const isUsed = articles.some((article) => article.featuredImageId === mediaId);
  const index = media.findIndex((item) => item.id === mediaId && item.uploadedById === userId);
  if (isUsed || index === -1) return false;

  media.splice(index, 1);
  return true;
}

export async function getReporterProfile(userId) {
  const user = users.find((item) => item.id === userId);
  const profile = reporterProfiles.find((item) => item.userId === userId);
  if (!user || !profile) return null;

  return {
    name: user.name,
    email: user.email,
    designation: profile.designation,
    bio: profile.bio,
    photoUrl: profile.photoUrl,
  };
}

export async function updateReporterProfile(userId, { bio, photoUrl }) {
  const profile = reporterProfiles.find((item) => item.userId === userId);
  if (!profile) return;

  profile.bio = bio;
  if (photoUrl) profile.photoUrl = photoUrl;
}

export async function getPerformance(userId) {
  const own = await getReporterArticles(userId);
  const published = own.filter((article) => article.status === "PUBLISHED");
  const totalViews = published.reduce((sum, article) => sum + article.viewCount, 0);

  const reviews = editorialReviews.filter((review) => own.some((article) => article.id === review.articleId));
  const approved = reviews.filter((review) => review.decision === "APPROVED").length;

  const sectionMap = new Map();
  published.forEach((article) => {
    const name = article.category ? article.category.name : "Other";
    const current = sectionMap.get(name) || { name, stories: 0, views: 0 };
    current.stories += 1;
    current.views += article.viewCount;
    sectionMap.set(name, current);
  });

  return {
    publishedCount: published.length,
    totalViews,
    averageViews: published.length > 0 ? Math.round(totalViews / published.length) : 0,
    reviewCount: reviews.length,
    approvedCount: approved,
    approvalRate: reviews.length > 0 ? Math.round((approved / reviews.length) * 100) : null,
    topArticles: [...published].sort((a, b) => b.viewCount - a.viewCount),
    sections: [...sectionMap.values()].sort((a, b) => b.views - a.views),
  };
}
