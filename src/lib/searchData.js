import articleAuthors from "@/data/articleAuthors";
import articleTags from "@/data/articleTags";
import categories from "@/data/categories";
import tags from "@/data/tags";
import users from "@/data/users";
import { getCategoryWithChildrenIds, getPublished, newestFirst, withCategory } from "@/lib/articleHelpers";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function firstValue(value) {
  const text = Array.isArray(value) ? value[0] : value;
  return typeof text === "string" ? text.trim() : "";
}

function getTagNames(articleId) {
  return articleTags
    .filter((link) => link.articleId === articleId)
    .map((link) => tags.find((tag) => tag.id === link.tagId).name);
}

function getSearchText(article) {
  return [article.title, article.metaDescription, article.body, ...getTagNames(article.id)].join(" ").toLowerCase();
}

export function readSearchFilters(searchParams) {
  const from = firstValue(searchParams.from);
  const to = firstValue(searchParams.to);

  return {
    q: firstValue(searchParams.q),
    category: firstValue(searchParams.category),
    author: firstValue(searchParams.author),
    from: DATE_PATTERN.test(from) ? from : "",
    to: DATE_PATTERN.test(to) ? to : "",
  };
}

export function hasSearchFilters(filters) {
  return Object.values(filters).some((value) => value !== "");
}

export async function getSearchOptions() {
  const mainCategories = categories.filter((category) => category.parentId === null);

  const categoryOptions = mainCategories.flatMap((main) => [
    { value: main.slug, label: main.name },
    ...categories
      .filter((category) => category.parentId === main.id)
      .map((sub) => ({ value: sub.slug, label: `${main.name} / ${sub.name}` })),
  ]);

  const authorIds = [...new Set(articleAuthors.map((link) => link.userId))];
  const authorOptions = users
    .filter((user) => authorIds.includes(user.id))
    .map((user) => ({ value: user.id, label: user.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return { categoryOptions, authorOptions };
}

export async function searchNews(filters) {
  const wordPatterns = filters.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));

  const category = categories.find((item) => item.slug === filters.category);
  const categoryIds = category ? getCategoryWithChildrenIds(category.id) : null;

  const authorArticleIds = filters.author
    ? articleAuthors.filter((link) => link.userId === filters.author).map((link) => link.articleId)
    : null;

  return getPublished()
    .filter((article) => {
      const day = article.publishedAt.slice(0, 10);
      if (filters.from && day < filters.from) return false;
      if (filters.to && day > filters.to) return false;
      if (categoryIds && !categoryIds.includes(article.categoryId)) return false;
      if (authorArticleIds && !authorArticleIds.includes(article.id)) return false;
      if (wordPatterns.length === 0) return true;

      const text = getSearchText(article);
      return wordPatterns.every((pattern) => pattern.test(text));
    })
    .sort(newestFirst)
    .map(withCategory);
}
