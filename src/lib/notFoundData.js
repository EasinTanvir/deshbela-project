import { getPublished, newestFirst, withCategory } from "@/lib/articleHelpers";

export async function getLatestForNotFound(limit = 4) {
  return getPublished().sort(newestFirst).slice(0, limit).map(withCategory);
}
