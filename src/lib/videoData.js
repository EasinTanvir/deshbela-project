import videos from "@/data/videos";
import { newestFirst, withCategory } from "@/lib/articleHelpers";

function getSortedVideos() {
  return [...videos].sort(newestFirst).map(withCategory);
}

export async function getAllVideos() {
  return getSortedVideos();
}

export async function getVideoSlugs() {
  return videos.map((video) => video.slug);
}

export async function getVideoBySlug(slug) {
  return getSortedVideos().find((video) => video.slug === slug) || null;
}

export async function getMoreVideos(video, limit = 4) {
  const others = getSortedVideos().filter((item) => item.id !== video.id);
  const sameCategory = others.filter((item) => item.categoryId === video.categoryId);
  const rest = others.filter((item) => item.categoryId !== video.categoryId);

  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getLatestVideos(excludeId, limit = 5) {
  return getSortedVideos()
    .filter((video) => video.id !== excludeId)
    .slice(0, limit);
}
