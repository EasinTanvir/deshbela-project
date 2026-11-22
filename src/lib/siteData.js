import siteConfig from "@/data/siteConfig";
import categories from "@/data/categories";

export function getSiteConfig() {
  return siteConfig;
}

export function getMainCategories() {
  return categories.filter((category) => category.parentId === null);
}
