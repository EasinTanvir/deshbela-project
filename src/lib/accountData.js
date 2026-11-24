import bookmarks from "@/data/bookmarks";
import categories from "@/data/categories";
import categoryPreferences from "@/data/categoryPreferences";
import membershipPlans from "@/data/membershipPlans";
import memberships from "@/data/memberships";
import newsletterSubscribers from "@/data/newsletterSubscribers";
import payments from "@/data/payments";
import pushSubscriptions from "@/data/pushSubscriptions";
import { getCategoryWithChildrenIds, getPublished, newestFirst, withCategory } from "@/lib/articleHelpers";

export async function getBookmarkedNews(userId) {
  const published = getPublished();

  return bookmarks
    .filter((bookmark) => bookmark.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((bookmark) => {
      const article = published.find((item) => item.id === bookmark.articleId);
      return article ? { ...withCategory(article), savedAt: bookmark.createdAt } : null;
    })
    .filter(Boolean);
}

export async function getNotificationSettings(user) {
  const subscriber = newsletterSubscribers.find(
    (item) => item.userId === user.id || item.email.toLowerCase() === user.email.toLowerCase()
  );

  return {
    newsletter: subscriber ? subscriber.status === "SUBSCRIBED" : false,
    pushDevices: pushSubscriptions.filter((item) => item.userId === user.id).length,
  };
}

export async function getMembershipSummary(userId) {
  const userMemberships = memberships
    .filter((item) => item.userId === userId)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map((membership) => ({
      ...membership,
      plan: membershipPlans.find((plan) => plan.id === membership.planId),
    }));

  const membershipIds = userMemberships.map((item) => item.id);
  const userPayments = payments
    .filter((payment) => membershipIds.includes(payment.membershipId))
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
    .map((payment) => ({
      ...payment,
      planName: userMemberships.find((item) => item.id === payment.membershipId).plan.name,
    }));

  return {
    current: userMemberships.find((item) => item.status === "ACTIVE") || null,
    last: userMemberships[0] || null,
    payments: userPayments,
  };
}

export async function getFavouriteCategoryIds(userId) {
  return categoryPreferences.filter((item) => item.userId === userId).map((item) => item.categoryId);
}

export async function getMainCategoryOptions() {
  return categories.filter((category) => category.parentId === null);
}

export async function getFeedNews(categoryIds, limit = 12) {
  const allowedIds = categoryIds.flatMap((id) => getCategoryWithChildrenIds(id));

  return getPublished()
    .filter((article) => allowedIds.includes(article.categoryId))
    .sort(newestFirst)
    .slice(0, limit)
    .map(withCategory);
}

export async function removeBookmark(userId, articleId) {
  const index = bookmarks.findIndex((item) => item.userId === userId && item.articleId === articleId);
  if (index !== -1) bookmarks.splice(index, 1);
}
