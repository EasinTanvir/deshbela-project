import articleAuthors from "@/data/articleAuthors";
import reporterProfiles from "@/data/reporterProfiles";
import users from "@/data/users";
import { getPublished, nameToSlug, newestFirst, withCategory } from "@/lib/articleHelpers";

function getAuthors() {
  return reporterProfiles
    .map((profile) => {
      const user = users.find((item) => item.id === profile.userId);
      return {
        id: user.id,
        name: user.name,
        slug: nameToSlug(user.name),
        designation: profile.designation,
        bio: profile.bio,
        photoUrl: profile.photoUrl,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAuthorSlugs() {
  return getAuthors().map((author) => ({ slug: author.slug }));
}

export async function getAuthorBySlug(slug) {
  return getAuthors().find((author) => author.slug === slug) || null;
}

export async function getAuthorNews(userId) {
  const articleIds = articleAuthors.filter((link) => link.userId === userId).map((link) => link.articleId);

  return getPublished()
    .filter((article) => articleIds.includes(article.id))
    .sort(newestFirst)
    .map(withCategory);
}

export async function getAllAuthors() {
  return getAuthors();
}

export async function getOtherAuthors(userId) {
  return getAuthors().filter((author) => author.id !== userId);
}
