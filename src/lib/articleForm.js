import { nameToSlug } from "@/lib/articleHelpers";
import { filterValidTagIds, findOwnPhoto, isSlugTaken, isValidCategory } from "@/lib/reporterData";

export const MAX_TAGS = 5;
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function readArticleForm(formData) {
  const title = readText(formData, "title");
  const slug = readText(formData, "slug").toLowerCase();

  return {
    title,
    slug: slug || nameToSlug(title),
    categoryId: readText(formData, "categoryId"),
    summary: readText(formData, "summary"),
    body: readText(formData, "body").replace(/\r\n/g, "\n"),
    metaTitle: readText(formData, "metaTitle"),
    photoId: readText(formData, "photoId"),
    tagIds: formData.getAll("tagIds").filter((value) => typeof value === "string"),
    intent: readText(formData, "intent") === "submit" ? "submit" : "draft",
  };
}

export async function checkArticle(userId, values, articleId) {
  const errors = {};

  if (values.title.length < 10) errors.title = "Please write a title of at least 10 letters.";
  else if (values.title.length > 150) errors.title = "Please keep the title under 150 letters.";

  if (!SLUG_PATTERN.test(values.slug)) {
    errors.slug = "Use only small letters, numbers and dashes.";
  } else if (await isSlugTaken(values.slug, articleId)) {
    errors.slug = "Another article already uses this web address.";
  }

  if (values.categoryId && !(await isValidCategory(values.categoryId))) {
    errors.categoryId = "Please choose a section from the list.";
  }

  if (values.summary.length > 300) errors.summary = "Please keep the summary under 300 letters.";
  if (values.metaTitle.length > 70) errors.metaTitle = "Please keep the search title under 70 letters.";

  const tagIds = await filterValidTagIds(values.tagIds);
  if (tagIds.length > MAX_TAGS) errors.tagIds = `Please choose up to ${MAX_TAGS} tags.`;

  const photo = values.photoId ? await findOwnPhoto(userId, values.photoId) : null;
  if (values.photoId && !photo) errors.photoId = "Please choose one of your own photos.";

  if (values.intent === "submit") {
    const wordCount = values.body.split(/\s+/).filter(Boolean).length;

    if (!values.categoryId) errors.categoryId = "Please choose a section.";
    if (values.summary.length < 30) errors.summary = "Please write a summary of at least 30 letters.";
    if (wordCount < 50) errors.body = "The story needs at least 50 words before the editor can review it.";
    if (!photo) errors.photoId = "Please choose a photo for the story.";
  }

  return { errors, photo, tagIds };
}
